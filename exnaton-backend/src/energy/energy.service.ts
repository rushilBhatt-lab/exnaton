import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Energy } from './entity/energy.entity';
import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EnergyDataResponse } from 'src/shared/interface/interface';

@Injectable()
export class EnergyService {
  constructor(
    @InjectRepository(Energy)
    private energyRepository: Repository<Energy>,
  ) {}

  async fetchDataAndStore(): Promise<void> {
    const urls = [
      'https://exnaton-public-s3-bucket20230329123331528000000001.s3.eu-central-1.amazonaws.com/challenge/95ce3367-cbce-4a4d-bbe3-da082831d7bd.json',
      'https://exnaton-public-s3-bucket20230329123331528000000001.s3.eu-central-1.amazonaws.com/challenge/1db7649e-9342-4e04-97c7-f0ebb88ed1f8.json',
    ];

    for (const url of urls) {
      const response = await axios.get(url);
      const data = response.data.data;

      for (const record of data) {
        const energy = new Energy();
        energy.measurement = record.measurement;
        energy.timestamp = new Date(record.timestamp);
        energy.muid = record.tags.muid;
        energy.quality = record.tags.quality;
        energy.meterReading = record['0100011D00FF'] || record['0100021D00FF'];

        await this.energyRepository.save(energy);
      }
    }
  }

  async getEnergyDataByQuery(query: {
    muid?: string;
    interval?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<EnergyDataResponse> {
    const {
      muid,
      interval = '1D',
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = query;

    if (!muid) {
      throw new HttpException(
        'A valid `muid` is required to retrieve data',
        HttpStatus.BAD_REQUEST,
      );
    }

    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    const daysDifference = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (
      (interval === '1W' && daysDifference < 7) ||
      (interval === '1M' && daysDifference < 30)
    ) {
      throw new HttpException(
        'Selected date range is too short for the chosen interval',
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryBuilder = this.energyRepository.createQueryBuilder('energy');
    queryBuilder.andWhere('energy.muid = :muid', { muid });
    queryBuilder.andWhere('energy.timestamp >= :start', { start });
    queryBuilder.andWhere('energy.timestamp <= :end', { end });

    let dateTruncFormat;
    switch (interval) {
      case '15m':
        queryBuilder
          .select('energy.timestamp', 'timestamp')
          .addSelect('energy.meterReading', 'meterReading');
        break;
      case '1H':
        dateTruncFormat = 'hour';
        break;
      case '1D':
        dateTruncFormat = 'day';
        break;
      case '1W':
        dateTruncFormat = 'week';
        break;
      case '1M':
        dateTruncFormat = 'month';
        break;
      default:
        throw new HttpException('Invalid interval', HttpStatus.BAD_REQUEST);
    }

    if (interval !== '15m') {
      queryBuilder
        .select(
          `DATE_TRUNC('${dateTruncFormat}', energy.timestamp AT TIME ZONE 'UTC')`,
          'interval',
        )
        .addSelect('AVG(energy.meterReading)', 'averageReading')
        .groupBy(
          `DATE_TRUNC('${dateTruncFormat}', energy.timestamp AT TIME ZONE 'UTC')`,
        );
    }

    queryBuilder
      .orderBy(interval === '15m' ? 'timestamp' : 'interval', 'ASC')
      .skip((page - 1) * limit)
      .take(limit + 1);

    const data = await queryBuilder.getRawMany();

    const hasMoreData = data.length > limit;

    if (hasMoreData) {
      data.pop();
    }

    const energyConsumptionData = data.map((item) => ({
      meter_reading:
        interval === '15m' ? item.meterReading : item.averageReading,
      timestamp: interval === '15m' ? item.timestamp : item.interval,
    }));

    if (energyConsumptionData.length > 1) {
      const lastValidTimestamp = new Date(
        energyConsumptionData[energyConsumptionData.length - 1].timestamp,
      );
      const endOfDayTimestamp = new Date(endDate);
      endOfDayTimestamp.setUTCHours(23, 59, 59, 999);

      if (lastValidTimestamp.getTime() > endOfDayTimestamp.getTime()) {
        energyConsumptionData.pop();
      }
    }

    return { data: energyConsumptionData, hasMoreData };
  }

  async getDistinctMuids(): Promise<string[]> {
    return await this.energyRepository
      .createQueryBuilder('energy')
      .select('DISTINCT energy.muid')
      .getRawMany();
  }

  async getSummaryStats(muid: string, startDate: string, endDate: string) {
    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);
    const basicStats = await this.energyRepository
      .createQueryBuilder('energy')
      .select('AVG(energy.meterReading)', 'average')
      .addSelect('MIN(energy.meterReading)', 'min')
      .where('energy.muid = :muid', { muid })
      .andWhere('energy.timestamp >= :startOfDay', { startOfDay })
      .andWhere('energy.timestamp <= :endOfDay', { endOfDay })
      .getRawOne();

    const peakData = await this.energyRepository
      .createQueryBuilder('energy')
      .select('energy.meterReading', 'peakReading')
      .addSelect('energy.timestamp', 'peakTime')
      .where('energy.muid = :muid', { muid })
      .andWhere('energy.timestamp >= :startOfDay', { startOfDay })
      .andWhere('energy.timestamp <= :endOfDay', { endOfDay })
      .orderBy('energy.meterReading', 'DESC')
      .limit(1)
      .getRawOne();

    return {
      average: basicStats.average,
      min: basicStats.min,
      peakReading: peakData ? peakData.peakReading : null,
      peakTime: peakData ? peakData.peakTime : null,
    };
  }
}

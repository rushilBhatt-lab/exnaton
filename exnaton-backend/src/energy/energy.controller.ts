import {
  Controller,
  Get,
  Post,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { EnergyService } from './energy.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EnergyDataResponse } from 'src/shared/interface/interface';

@ApiTags('Energy')
@Controller('energy-readings')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}
  @ApiOperation({
    summary:
      'Initially use this endpoint to fetch energy data from external URLs and Populate the database so frontend will work smoothly',
  })
  @ApiResponse({
    status: 201,
    description: 'Data fetched and stored successfully.',
  })
  @Post('fetch')
  async fetchDataAndStore(): Promise<string> {
    await this.energyService.fetchDataAndStore();
    return 'Data fetched and stored successfully';
  }

  @ApiOperation({ summary: 'Get energy records based on query parameters' })
  @ApiResponse({
    status: 200,
    description: 'Energy records have been retrieved successfully.',
    schema: {
      example: [
        {
          id: 1,
          measurement: 'energy',
          timestamp: '2023-02-28T23:45:00.000Z',
          muid: '95ce3367-cbce-4a4d-bbe3-da082831d7bd',
          quality: 'measured',
          meterReading: 0.0117,
        },
      ],
    },
  })
  @Get()
  async findByQuery(
    @Query('muid') muid?: string,
    @Query('interval') interval?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<EnergyDataResponse> {
    if (startDate && !this.validateDate(startDate)) {
      throw new BadRequestException('Invalid startDate format. Use YYYY-MM-DD');
    }
    if (endDate && !this.validateDate(endDate)) {
      throw new BadRequestException('Invalid endDate format. Use YYYY-MM-DD');
    }

    if (interval && !['15m', '1H', '1D', '1W', '1M'].includes(interval)) {
      throw new BadRequestException(
        'Invalid interval. Use 15m, 1H, 1D, 1W, or 1M',
      );
    }
    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Page and limit should be positive integers.',
      );
    }

    return this.energyService.getEnergyDataByQuery({
      muid,
      interval,
      startDate,
      endDate,
      page,
      limit,
    });
  }

  private validateDate(date: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }

  @Get('muid')
  @ApiOperation({
    summary: 'Get Meter Ids',
  })
  @Get('muid')
  @ApiOperation({
    summary: 'Get unique Meter IDs (muids)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of unique muids retrieved successfully.',
    schema: {
      example: [
        { muid: '95ce3367-cbce-4a4d-bbe3-da082831d7bd' },
        { muid: '1db7649e-9342-4e04-97c7-f0ebb88ed1f8' },
      ],
    },
  })
  async getDistinctMuids() {
    return await this.energyService.getDistinctMuids();
  }

  @Get('stats')
  @ApiOperation({
    summary:
      'Fetch summary statistics for a specific meter (muid) over a date range',
  })
  @ApiResponse({
    status: 200,
    description: 'Summary statistics retrieved successfully.',
    schema: {
      example: {
        average: 0.03114468085106385,
        min: 0.0115,
        peakReading: 0.5277,
        peakTime: '2023-02-02T22:45:00.000Z',
      },
    },
  })
  async getSummaryStats(
    @Query('muid') muid: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.energyService.getSummaryStats(muid, startDate, endDate);
  }
}

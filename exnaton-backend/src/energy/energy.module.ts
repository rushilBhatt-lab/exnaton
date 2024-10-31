import { Module } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyController } from './energy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Energy } from './entity/energy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Energy])],
  providers: [EnergyService],
  controllers: [EnergyController],
})
export class EnergyModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './shared/typeorm.config';
import { EnergyModule } from './energy/energy.module';

@Module({
  imports: [TypeOrmModule.forRoot(TYPEORM_CONFIG.moduleConfig), EnergyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

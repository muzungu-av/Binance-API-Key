import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BinanceService } from './binance/binance.service';
import { BinanceModule } from './binance/binance.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [BinanceModule, HttpModule],
  controllers: [AppController],
  providers: [BinanceService],
})
export class AppModule {}

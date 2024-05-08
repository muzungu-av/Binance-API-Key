import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';

@Controller()
export class AppController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('check')
  async getHello(): Promise<any> {
    const secretKey = '...';
    const apiKey = '...';

    try {
      const response = await this.binanceService
        .getApiRestrictions(apiKey, secretKey)
        .toPromise();
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.error('Error during query execution:', error);
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

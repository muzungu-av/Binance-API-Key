import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';

@Controller()
export class AppController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('check')
  async getHello(): Promise<any> {
    const secretKey =
      'vbfZK3FoNoz4O8strPuyaiO9IQfnb7YncrHI7VKW9D0P03PgsLaBdq7bb5l7C6wO';
    const apiKey =
      'JbV51sgQiqIVKmFSnQGOFvr2WmIJwhSHgmeXIo8cBzxbpmEnHUN0U04jw3rOLQDI';

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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class BinanceService {
  constructor(private httpService: HttpService) {}

  private generateSignature(timestamp: string, apiSecret: string): string {
    const query_string = timestamp;
    return crypto
      .createHmac('sha256', apiSecret)
      .update(query_string)
      .digest('hex');
  }

  getApiRestrictions(
    apiKey: string,
    apiSecret: string,
  ): Observable<AxiosResponse<any>> {
    const timestamp = Date.now().toString();
    const queryString = `timestamp=${timestamp}`;
    const signature = this.generateSignature(queryString, apiSecret);

    const url = `https://api.binance.com/sapi/v1/account/apiRestrictions?${queryString}&signature=${signature}`;

    const headers = {
      'X-MBX-APIKEY': apiKey,
    };

    return this.httpService.get<any>(url, { headers }).pipe(
      catchError((error: AxiosError) => {
        if (error.response) {
          const errorResponse = error.response.data;
          throw new HttpException(
            {
              status: error.response.status,
              message: 'Error from Binance server',
              error: errorResponse,
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            'Error during query execution',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }),
    );
  }
}

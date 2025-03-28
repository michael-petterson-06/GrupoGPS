import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CompanyService {
  private readonly apiUrl = 'https://www.receitaws.com.br/v1/cnpj';

  async getCompanyData(cnpj: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/${cnpj}`);
      if (response.data.status === 'ERROR') {
        throw new HttpException(response.data.message, HttpStatus.BAD_REQUEST);
      }
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erro ao consultar CNPJ',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getMultipleCompanyData(cnpjs: string[]) {
    const requests = cnpjs.map(cnpj => this.getCompanyData(cnpj));
    const results = await Promise.all(requests);
    return results;
  }
}

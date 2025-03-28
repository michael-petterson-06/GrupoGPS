// src/company/company.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('search/:cnpj')
  async searchCompany(@Param('cnpj') cnpj: string) {
    return this.companyService.getCompanyData(cnpj);
  }

  @Post('search-multiple-cnpjs')
  async searchMultiple(@Body('cnpjs') cnpjs: string[]) {
    return this.companyService.getMultipleCompanyData(cnpjs);
  }
}

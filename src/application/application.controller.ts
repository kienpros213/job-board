import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from 'src/dto/create.application.dto';
import { UpdateApplicationDto } from 'src/dto/update.application.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/create')
  async createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.createApplication(createApplicationDto);
  }

  @Get('/find/:id')
  async findApplication(@Param('id') id: number) {
    return this.applicationService.findApplication(id);
  }

  @Patch('/update')
  async updateApplication(@Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.updateApplication(updateApplicationDto);
  }

  @Delete('/delete/:id')
  async deleteApplication(@Param('id') id: number) {
    this.applicationService.deleteApplication(id);
  }
}

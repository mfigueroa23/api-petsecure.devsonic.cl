import { Controller, Get, Logger, Res } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Get()
  async getHello(@Res() res: Response): Promise<void> {
    try {
      this.logger.log('Requesting health check of the system');
      const service = await this.appService.getProperty('SERVICE NAME');
      const status = await this.appService.getProperty('SERVICE STATUS');
      this.logger.log('Health check successful');
      res.status(200).json({ service, status });
    } catch (err) {
      const error = new Error(err as string);
      this.logger.error(
        `An error occurred during health check: ${error.message}`,
      );
      res.status(500).json({
        service: 'API PetSecure',
        status: 'INNACTIVE',
      });
    }
  }
}

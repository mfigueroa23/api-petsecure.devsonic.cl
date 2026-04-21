import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(AppService.name);

  async getProperty(key: string): Promise<string> {
    try {
      this.logger.log(`Fetching property with key: ${key}`);
      const property = await this.prisma.property.findUnique({
        where: { key },
      });
      if (!property) throw new Error(`Property with key ${key} not found`);
      return property.value;
    } catch (err) {
      const error = new Error(err as string);
      this.logger.error(
        `An error occurred while fetching property: ${error.message}`,
      );
      throw err;
    }
  }
}

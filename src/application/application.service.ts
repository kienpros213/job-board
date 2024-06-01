import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createApplication(createApplication: any) {
    console.log(createApplication);
    return await this.prismaService.user
      .update({
        where: {
          user_id: createApplication.user_id,
        },
        data: {
          applications: {
            create: {
              cover_letter: createApplication.cover_letter,
              cv_url: createApplication.cv_url,
              status: createApplication.status,
              create_at: createApplication.create_at,
              update_at: createApplication.update_at,
              post_id: createApplication.post_id,
            },
          },
        },
        include: {
          applications: true,
        },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
  async findApplication(user_id: any) {
    const newId = parseInt(user_id);
    const applications = await this.prismaService.application
      .findMany({
        where: {
          user_id: newId,
        },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    console.log(applications);

    if (!applications) {
      throw new NotFoundException('Post Not Exist');
    }

    return applications;
  }
  async updateApplication(updateApplicationData: any) {
    return await this.prismaService.application
      .update({
        where: {
          application_id: updateApplicationData.application_id,
        },
        data: {
          cover_letter: updateApplicationData.cover_letter,
          cv_url: updateApplicationData.cv_url,
          status: updateApplicationData.status,
          update_at: updateApplicationData.update_at,
        },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
  async deleteApplication(applicationId: any) {
    const id = parseInt(applicationId);
    return await this.prismaService.application
      .delete({
        where: {
          application_id: id,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}

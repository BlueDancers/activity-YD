import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { imageEntity } from './act_pro/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(imageEntity)
    private readonly imageDao: Repository<imageEntity>,
  ) {}

  async addImage(imgName, type) {
    await this.imageDao.save({ imageName: imgName, image_type: type });
  }

  async allImage(type) {
    return await this.imageDao.find({
      select: ['imageName'],
      where: { image_type: type },
    });
  }
}

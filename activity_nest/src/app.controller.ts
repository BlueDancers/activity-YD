import { ImageService } from './image.service';
import { Controller, Get, UseInterceptors, Post, UploadedFile, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly imageSer: ImageService) { }
    @Post('try')
    async try(@Body() body){
      console.log(body);
    }
  @Post('upimage')
  @UseInterceptors(FileInterceptor('image')) // file对应HTML表单的name属性
  async UploadedFile(
    @UploadedFile() file,
    @Body() body) {
    let fileName = 'i' + this.ran(13) + `${file.originalname}`;
    const writeImage = createWriteStream(join(__dirname, '..', '/public/image', fileName))
    await writeImage.write(file.buffer)
    this.imageSer.addImage(fileName, 1);
    return {
      data:fileName,
      code:200
    }
  }
  @Post('uptitleimage')
  @UseInterceptors(FileInterceptor('image')) // file对应HTML表单的name属性
  async uptitleimage(
    @UploadedFile() file,
    @Body() body) {
    let fileName = 'aintro' + this.ran(13) + `${file.originalname}`;
    const writeImage = createWriteStream(join(__dirname, '..', '/public/image', fileName))
    await writeImage.write(file.buffer)
    this.imageSer.addImage(fileName, 2);
    return {
      data:fileName,
      code:200
    }
  }
  @Get('getImage')
  async getImage() {
    let result={
      data: await this.imageSer.allImage(1),
      code:200
    }
    return result;
  }
  @Get('getDefaultImg')
  async getDefaultImg() {
    let result={
      data: await this.imageSer.allImage(3),
      code:200
    }
    return result;
  }
  ran(m) {
    m = m > 13 ? 13 : m;
    var num = new Date().getTime();
    return num.toString().substring(13 - m);

  }

}
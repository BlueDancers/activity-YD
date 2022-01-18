
import { Act_proController } from './act_pro.controller';
import { Act_proService } from './act_pro.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act_Data } from './activityData.entity';
import { actPro } from './act_pro.entity';
import { comData } from './comData.entity';
import { imageEntity } from './image.entity';
import { CacheService } from './cache.service';




@Module({
  imports: [
    TypeOrmModule.forFeature([Act_Data, actPro, comData, imageEntity])
  ],
  controllers: [
    Act_proController,],
  providers: [
    CacheService,
    Act_proService,],
})
export class Act_proModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarticleController } from './carticle/carticle.controller';

@Module({
  imports: [],
  controllers: [AppController, CarticleController],
  providers: [AppService],
})
export class AppModule {}

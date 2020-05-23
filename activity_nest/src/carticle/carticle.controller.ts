import { Controller, Get } from '@nestjs/common';

@Controller('carticle')
export class CarticleController {
  @Get()
  index() {
    return 'woshishui';
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CarticleController } from './carticle.controller';

describe('Carticle Controller', () => {
  let controller: CarticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarticleController],
    }).compile();

    controller = module.get<CarticleController>(CarticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

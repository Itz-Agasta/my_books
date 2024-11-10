import { Test, TestingModule } from '@nestjs/testing';
import { DrawerController } from './drawer.controller';
import { DrawerService } from './drawer.service';

describe('DrawerController', () => {
  let controller: DrawerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawerController],
      providers: [DrawerService],
    }).compile();

    controller = module.get<DrawerController>(DrawerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

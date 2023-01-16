import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { Users } from './xata';

describe('DatabaseService', () => {
  let service: DatabaseService<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService<Users>>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

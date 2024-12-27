import { Test, TestingModule } from '@nestjs/testing';
import { TeamJoinRequestService } from './team-join-request.service';

describe('TeamJoinRequestService', () => {
  let service: TeamJoinRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamJoinRequestService],
    }).compile();

    service = module.get<TeamJoinRequestService>(TeamJoinRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { of } from 'rxjs';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: User = { id: 1, name: 'John Doe', email: 'john@example.com', password: '12345' };
      jest.spyOn(service, 'create').mockResolvedValue(user);

      const result = await controller.create(user);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', password: '12345' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: '12345' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user: User = { id: 1, name: 'John Doe', email: 'john@example.com', password: '12345' };

      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(1);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user: User = { id: 1, name: 'John Doe', email: 'john@example.com', password: '12345' };
      
      // Mocking UpdateResult with required properties
      const updateResult = { affected: 1, raw: [], generatedMaps: [] };
      jest.spyOn(service, 'update').mockResolvedValue(updateResult);
  
      const result = await controller.update(1, user);
      expect(result).toEqual(updateResult);
    });
  });
  
  describe('remove', () => {
    it('should remove a user', async () => {
      // Mocking DeleteResult with required properties
      const deleteResult = { affected: 1, raw: [] };
      jest.spyOn(service, 'remove').mockResolvedValue(deleteResult);
  
      const deleteResultReturned = await controller.remove(1);
      expect(deleteResultReturned).toEqual(deleteResult);
    });
  });
  
});

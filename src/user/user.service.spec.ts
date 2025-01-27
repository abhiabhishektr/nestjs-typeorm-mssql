import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = { name: 'John Doe', email: 'john@example.com', password: '12345' };
      const savedUser = { id: 1, ...user };

      jest.spyOn(repository, 'save').mockResolvedValue(savedUser as any);

      const result = await service.create(user);
      expect(result).toEqual(savedUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', password: '12345' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: '12345' },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(users as any);

      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com', password: '12345' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user as any);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com', password: '12345' };

      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);

      const result = await service.update(1, { name: 'Updated Name' });
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = { affected: 1 };
      jest.spyOn(repository, 'delete').mockResolvedValue(result as any);

      const deleteResult = await service.remove(1);
      expect(deleteResult).toEqual(result);
    });
  });
});

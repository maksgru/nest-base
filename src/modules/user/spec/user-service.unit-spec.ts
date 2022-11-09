import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({}).compile();

  });
  afterAll(async () => {
    await testingModule.close();
  });

  test('create', async () => {
    expect(1).toBe(1);
  });
});

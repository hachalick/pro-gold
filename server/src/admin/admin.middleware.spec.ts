import { AdminMiddleware } from './admin.middleware';

describe('AdminMiddleware', () => {
  it('should be defined', () => {
    expect(new AdminMiddleware()).toBeDefined();
  });
});

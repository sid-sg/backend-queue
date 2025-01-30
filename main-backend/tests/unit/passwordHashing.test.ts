import { createHash, validatePassword } from '../../src/util/passwordHashing';

describe('Password Hashing Utility', () => {
  const testPassword = 'TestPassword123!';

  it('should create a hash from password', async () => {
    const hash = await createHash(testPassword);
    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
  });

  it('should validate correct password', async () => {
    const hash = await createHash(testPassword);
    const isValid = await validatePassword(testPassword, hash);
    expect(isValid).toBe(true);
  });

  it('should reject incorrect password', async () => {
    const hash = await createHash(testPassword);
    const isValid = await validatePassword('WrongPassword123!', hash);
    expect(isValid).toBe(false);
  });
});

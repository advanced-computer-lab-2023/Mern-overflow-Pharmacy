import Adminstrator from '../../models/Adminstrator.ts';

describe('admin model', () => {
    test('should throw an error if email is invalid', async () => {
        const admin = new Adminstrator({
            username: 'testuser',
            passwordHash: 'password',
            email: 'invalidemail',
        });
        await expect(admin.save()).rejects.toThrow('invalid email');
    });

    test('should throw an error if username is missing', async () => {
        const admin = new Adminstrator({
            passwordHash: 'password',
            email: 'testadmin@example.com',
        });
        await expect(admin.save()).rejects.toThrow('Adminstrator validation failed: username: Path `username` is required.');
    });

    test('should throw an error if passwordHash is missing', async () => {
        const admin = new Adminstrator({
            username: 'testadmin',
            email: 'testadmin@example.com',
        });
        await expect(admin.save()).rejects.toThrow('Adminstrator validation failed: passwordHash: Path `passwordHash` is required.');
    });

    test('should throw an error if email is missing', async () => {
        const admin = new Adminstrator({
            username: 'testadmin',
            passwordHash: 'password',
        });
        await expect(admin.save()).rejects.toThrow('Adminstrator validation failed: email: Path `email` is required.');
    });

      test('should throw an error if email is not provided', async () => {
        const admin = new Adminstrator({
          username: 'testadmin',
          passwordHash: 'password',
        });
        await expect(admin.save()).rejects.toThrow('Adminstrator validation failed: email: Path `email` is required.');
      });
});

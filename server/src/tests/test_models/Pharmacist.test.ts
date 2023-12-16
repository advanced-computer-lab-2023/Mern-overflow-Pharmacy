import { Types } from 'mongoose';
import Pharmacist from '../../models/pharmacist.ts';

describe('pharmacist model', () => {
    test('should throw an error if name is missing', async () => {
        const pharmacistWithoutName = {
            email: "email@gmail.com",
            passwordHash: "password",
            username: "username",
            dateOfBirth: new Date(),
            hourlyRate: 50,
            affiliation: 'Pharmacy ABC',
            education: 'Pharmacist Degree',
            files: [{ filename: 'file1.txt', path: '/path/to/file1.txt' }],
            status: 'pending',
        };

        const pharmacist = new Pharmacist(pharmacistWithoutName);
        await expect(pharmacist.save()).rejects.toThrow('pharmacist validation failed: name: Path `name` is required.');
    });

    test('should throw an error if dateOfBirth is missing', async () => {
        const pharmacistWithoutDateOfBirth = {
            email: "email@gmail.com",
            passwordHash: "password",
            username: "username",
            name: 'John Doe',
            hourlyRate: 50,
            affiliation: 'Pharmacy ABC',
            education: 'Pharmacist Degree',
            files: [{ filename: 'file1.txt', path: '/path/to/file1.txt' }],
            status: 'pending',
        };

        const pharmacist = new Pharmacist(pharmacistWithoutDateOfBirth);
        await expect(pharmacist.save()).rejects.toThrow('pharmacist validation failed: dateOfBirth: Path `dateOfBirth` is required.');
    });

    test('should throw an error if hourlyRate is missing', async () => {
        const pharmacistWithoutHourlyRate = {
            email: "email@gmail.com",
            passwordHash: "password",
            username: "username",
            name: 'John Doe',
            dateOfBirth: new Date(),
            affiliation: 'Pharmacy ABC',
            education: 'Pharmacist Degree',
            files: [{ filename: 'file1.txt', path: '/path/to/file1.txt' }],
            status: 'pending',
        };

        const pharmacist = new Pharmacist(pharmacistWithoutHourlyRate);
        await expect(pharmacist.save()).rejects.toThrow('pharmacist validation failed: hourlyRate: Path `hourlyRate` is required.');
    });

    test('should throw an error if affiliation is missing', async () => {
        const pharmacistWithoutAffiliation = {
            email: "email@gmail.com",
            passwordHash: "password",
            username: "username",
            name: 'John Doe',
            dateOfBirth: new Date(),
            hourlyRate: 50,
            education: 'Pharmacist Degree',
            files: [{ filename: 'file1.txt', path: '/path/to/file1.txt' }],
            status: 'pending',
        };

        const pharmacist = new Pharmacist(pharmacistWithoutAffiliation);
        await expect(pharmacist.save()).rejects.toThrow('pharmacist validation failed: affiliation: Path `affiliation` is required.');
    });

    test('should throw an error if education is missing', async () => {
        const pharmacistWithoutEducation = {
            email: "email@gmail.com",
            passwordHash: "password",
            username: "username",
            name: 'John Doe',
            dateOfBirth: new Date(),
            hourlyRate: 50,
            affiliation: 'Pharmacy ABC',
            files: [{ filename: 'file1.txt', path: '/path/to/file1.txt' }],
            status: 'pending',
        };

        const pharmacist = new Pharmacist(pharmacistWithoutEducation);
        await expect(pharmacist.save()).rejects.toThrow('pharmacist validation failed: education: Path `education` is required.');
    });
});

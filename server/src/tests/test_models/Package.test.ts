import { Types } from 'mongoose';
import Package from '../../models/Package.ts';

describe('package model', () => {
    it('should throw an error if name is missing', async () => {
        const packageWithoutName = {
            price: 50,
            discountOnDoctorSessions: 10,
            discountOnMedicine: 5,
            discountForFamily: 15,
        };

        const packageItem = new Package(packageWithoutName);
        await expect(packageItem.save()).rejects.toThrow('Package validation failed: name: Path `name` is required.');
    });

    it('should throw an error if price is missing', async () => {
        const packageWithoutPrice = {
            name: 'Basic Package',
            discountOnDoctorSessions: 10,
            discountOnMedicine: 5,
            discountForFamily: 15,
        };

        const packageItem = new Package(packageWithoutPrice);
        await expect(packageItem.save()).rejects.toThrow('Package validation failed: price: Path `price` is required.');
    });

    it('should throw an error if discountOnDoctorSessions is missing', async () => {
        const packageWithoutDiscountOnDoctorSessions = {
            name: 'Basic Package',
            price: 50,
            discountOnMedicine: 5,
            discountForFamily: 15,
        };

        const packageItem = new Package(packageWithoutDiscountOnDoctorSessions);
        await expect(packageItem.save()).rejects.toThrow('Package validation failed: discountOnDoctorSessions: Path `discountOnDoctorSessions` is required.');
    });

    it('should throw an error if discountOnMedicine is missing', async () => {
        const packageWithoutDiscountOnMedicine = {
            name: 'Basic Package',
            price: 50,
            discountOnDoctorSessions: 10,
            discountForFamily: 15,
        };

        const packageItem = new Package(packageWithoutDiscountOnMedicine);
        await expect(packageItem.save()).rejects.toThrow('Package validation failed: discountOnMedicine: Path `discountOnMedicine` is required.');
    });

    it('should throw an error if discountForFamily is missing', async () => {
        const packageWithoutDiscountForFamily = {
            name: 'Basic Package',
            price: 50,
            discountOnDoctorSessions: 10,
            discountOnMedicine: 5,
        };

        const packageItem = new Package(packageWithoutDiscountForFamily);
        await expect(packageItem.save()).rejects.toThrow('Package validation failed: discountForFamily: Path `discountForFamily` is required.');
    });
});

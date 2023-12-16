import { Types } from 'mongoose';
import Order from '../../models/Order.ts';

describe('order model', () => {
    test('should throw an error if patient is missing', async () => {
        const orderWithoutPatient = {
            status: 'pending',
            date: new Date(),
            total: 100,
            address: 'Test address',
            paymentMethod: 'cash on delivery',
            medicines: [{ medName: 'Medicine1', medPrice: 10, medQuantity: 2 }],
        };

        const order = new Order(orderWithoutPatient);
        await expect(order.save()).rejects.toThrow('Order validation failed: patient: Path `patient` is required.');
    });

    test('should throw an error if status is missing', async () => {
        const orderWithoutStatus = {
            patient: new Types.ObjectId(),
            date: new Date(),
            total: 100,
            address: 'Test address',
            paymentMethod: 'cash on delivery',
            medicines: [{ medName: 'Medicine1', medPrice: 10, medQuantity: 2 }],
        };

        const order = new Order(orderWithoutStatus);
        await expect(order.save()).rejects.toThrow('Order validation failed: status: Path `status` is required.');
    });

    test('should throw an error if date is missing', async () => {
        const orderWithoutDate = {
            patient: new Types.ObjectId(),
            status: 'pending',
            total: 100,
            address: 'Test address',
            paymentMethod: 'cash on delivery',
            medicines: [{ medName: 'Medicine1', medPrice: 10, medQuantity: 2 }],
        };

        const order = new Order(orderWithoutDate);
        await expect(order.save()).rejects.toThrow('Order validation failed: date: Path `date` is required.');
    });

    test('should throw an error if total is missing', async () => {
        const orderWithoutTotal = {
            patient: new Types.ObjectId(),
            status: 'pending',
            date: new Date(),
            address: 'Test address',
            paymentMethod: 'cash on delivery',
            medicines: [{ medName: 'Medicine1', medPrice: 10, medQuantity: 2 }],
        };

        const order = new Order(orderWithoutTotal);
        await expect(order.save()).rejects.toThrow('Order validation failed: total: Path `total` is required.');
    });

    test('should throw an error if paymentMethod is missing', async () => {
        const orderWithoutPaymentMethod = {
            patient: new Types.ObjectId(),
            status: 'pending',
            date: new Date(),
            total: 100,
            address: 'Test address',
            medicines: [{ medName: 'Medicine1', medPrice: 10, medQuantity: 2 }],
        };

        const order = new Order(orderWithoutPaymentMethod);
        await expect(order.save()).rejects.toThrow('Order validation failed: paymentMethod: Path `paymentMethod` is required.');
    });
});

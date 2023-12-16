import mongoose from 'mongoose';
import Cart from '../../models/Cart';

describe('cart model', () => {
    test('should throw an error if patient is missing', async () => {
        const cartWithoutPatient = {
            medicines: [
                { medName: 'Medicine1', medPrice: 10, medQuantity: 2 },
                { medName: 'Medicine2', medPrice: 15, medQuantity: 3 },
            ],
        };

        const cart = new Cart(cartWithoutPatient);
        await expect(cart.save()).rejects.toThrow('Cart validation failed: patient: Path `patient` is required.');
    });

    test('should throw an error if medPrice is missing in medicines', async () => {
        const cartWithMissingMedPrice = {
            patient: new mongoose.Types.ObjectId(),
            medicines: [
                { medName: 'Medicine1', medQuantity: 2 },
            ],
        };
        const cart = new Cart(cartWithMissingMedPrice);
        await expect(cart.save()).rejects.toThrow('Cart validation failed: medicines.0.medPrice: Path `medPrice` is required.');
    });

    test('should throw an error if medQuantity is missing in medicines', async () => {
        const cartWithMissingMedQuantity = {
            patient: new mongoose.Types.ObjectId(),
            medicines: [
                { medName: 'Medicine1', medPrice: 10 },
            ],
        };
        const cart = new Cart(cartWithMissingMedQuantity);
        await expect(cart.save()).rejects.toThrow('Cart validation failed: medicines.0.medQuantity: Path `medQuantity` is required.');
    });

    test('should throw an error if medQuantity is missing in medicines', async () => {
        const cartWithMissingMedQuantity = {
          patient: new mongoose.Types.ObjectId(),
          medicines: [
            { medName: 'Medicine1', medPrice: 10 },
          ],
        };
    
        const cart = new Cart(cartWithMissingMedQuantity);
        await expect(cart.save()).rejects.toThrow('Cart validation failed: medicines.0.medQuantity: Path `medQuantity` is required.');
      });

      test('should throw an error if patient is missing', async () => {
        const cartWithMissingPatient = {
          medicines: [
            { medName: 'Medicine1', medPrice: 10, medQuantity: 2 },
          ],
        };
    
        const cart = new Cart(cartWithMissingPatient);
        await expect(cart.save()).rejects.toThrow('Cart validation failed: patient: Path `patient` is required.');
      });
});

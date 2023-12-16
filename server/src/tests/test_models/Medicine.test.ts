import mongoose from 'mongoose';
import Medicine from '../../models/Medicine.ts';

describe('medicine model', () => {
  test('should throw an error if name is missing', async () => {
    const medicineWithoutName = {
      medicinalUse: 'Pain Relief',
      details: { description: 'Test description', activeIngredients: ['Ingredient1', 'Ingredient2'] },
      price: 20,
      availableQuantity: 100,
      sales: 50,
      image: 'test_image.jpg',
      overTheCounter: true,
      isArchived: false,
    };

    const medicine = new Medicine(medicineWithoutName);
    await expect(medicine.save()).rejects.toThrow('Medicine validation failed: name: Path `name` is required.');
  });

  test('should throw an error for invalid price value (non-number)', async () => {
    const medicineWithInvalidPrice = {
      name: 'Test Medicine',
      medicinalUse: 'Pain Relief',
      details: { description: 'Test description', activeIngredients: ['Ingredient1', 'Ingredient2'] },
      price: 'invalidPrice',
      availableQuantity: 100,
      sales: 50,
      image: 'test_image.jpg',
      overTheCounter: true,
      isArchived: false,
    };

    const medicine = new Medicine(medicineWithInvalidPrice);
    await expect(medicine.save()).rejects.toThrow('Medicine validation failed: price: Cast to Number failed for value "invalidPrice" (type string) at path "price"');
  });

  test('should throw an error if overTheCounter is missing', async () => {
    const medicineWithoutOTC = {
      name: 'Test Medicine',
      medicinalUse: 'Pain Relief',
      details: { description: 'Test description', activeIngredients: ['Ingredient1', 'Ingredient2'] },
      price: 20,
      availableQuantity: 100,
      sales: 50,
      image: 'test_image.jpg',
      isArchived: false,
    };

    const medicine = new Medicine(medicineWithoutOTC);
    await expect(medicine.save()).rejects.toThrow('Medicine validation failed: overTheCounter: Path `overTheCounter` is required.');
  });

  test('should throw an error for invalid isArchived value', async () => {
    const medicineWithInvalidArchived = {
      name: 'Test Medicine',
      medicinalUse: 'Pain Relief',
      details: { description: 'Test description', activeIngredients: ['Ingredient1', 'Ingredient2'] },
      price: 20,
      availableQuantity: 100,
      sales: 50,
      image: 'test_image.jpg',
      overTheCounter: true,
      isArchived: 'invalidValue',
    };

    const medicine = new Medicine(medicineWithInvalidArchived);
    await expect(medicine.save()).rejects.toThrow('Medicine validation failed: isArchived: Cast to Boolean failed for value "invalidValue" (type string) at path "isArchived" because of "CastError"');
  });

  test('should throw an error if medicinalUse is missing', async () => {
    const medicineWithoutMedicinalUse = {
      name: 'Test Medicine',
      details: { description: 'Test description', activeIngredients: ['Ingredient1', 'Ingredient2'] },
      price: 20,
      availableQuantity: 100,
      sales: 50,
      image: 'test_image.jpg',
      overTheCounter: true,
      isArchived: false,
    };

    const medicine = new Medicine(medicineWithoutMedicinalUse);
    await expect(medicine.save()).rejects.toThrow('Medicine validation failed: medicinalUse: Path `medicinalUse` is required.');
  });
});

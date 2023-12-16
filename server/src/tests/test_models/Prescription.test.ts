import { Types } from 'mongoose';
import Prescription from '../../models/Prescription.ts';

describe('prescription model', () => {
    test('should throw an error if patient is missing', async () => {
        const prescriptionWithoutPatient = {
            doctor: new Types.ObjectId(),
            medicine: [{ medId: new Types.ObjectId(), dailyDosage: 1 }],
            date: new Date(),
            filled: false,
        };

        const prescription = new Prescription(prescriptionWithoutPatient);
        await expect(prescription.save()).rejects.toThrow('Prescription validation failed: patient: Path `patient` is required.');
    });

    test('should throw an error if doctor is missing', async () => {
        const prescriptionWithoutDoctor = {
            patient: new Types.ObjectId(),
            medicine: [{ medId: new Types.ObjectId(), dailyDosage: 1 }],
            date: new Date(),
            filled: false,
        };

        const prescription = new Prescription(prescriptionWithoutDoctor);
        await expect(prescription.save()).rejects.toThrow('Prescription validation failed: doctor: Path `doctor` is required.');
    });

    test('should throw an error if medicine is invalid', async () => {
        const prescriptionWithoutMedicine = {
            patient: new Types.ObjectId(),
            medicine: "invalidMedicine",
            doctor: new Types.ObjectId(),
            date: new Date(),
            filled: false,
        };

        const prescription = new Prescription(prescriptionWithoutMedicine);
        await expect(prescription.save()).rejects.toThrow('Prescription validation failed: medicine: Cast to embedded failed for value \"invalidMedicine\" (type string) at path \"medicine\" because of \"ObjectParameterError\"');
    });

    test('should throw an error if date is invalid', async () => {
        const prescriptionWithoutDate = {
            patient: new Types.ObjectId(),
            doctor: new Types.ObjectId(),
            medicine: [{ medId: new Types.ObjectId(), dailyDosage: 1 }],
            date: "invalidDate",
            filled: false,
        };

        const prescription = new Prescription(prescriptionWithoutDate);
        await expect(prescription.save()).rejects.toThrow('Prescription validation failed: date: Cast to date failed for value \"invalidDate\" (type string) at path \"date\"');
    });

    test('should throw an error if patient is invalid', async () => {
        const prescriptionWithoutFilled = {
            patient: "someone",
            doctor: new Types.ObjectId(),
            medicine: [{ medId: new Types.ObjectId(), dailyDosage: 1 }],
            date: new Date()
        };

        const prescription = new Prescription(prescriptionWithoutFilled);
        await expect(prescription.save()).rejects.toThrow('Prescription validation failed: patient: Cast to ObjectId failed for value \"someone\" (type string) at path \"patient\" because of \"BSONError\"');
    });
});

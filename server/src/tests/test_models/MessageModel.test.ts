import { Types } from 'mongoose';
import MessageModel from '../../models/MessageModel.ts';

describe('message model', () => {
    test('should throw an error if sender is missing', async () => {
        const messageWithoutSender = {
            content: 'Test message content',
            chat: new Types.ObjectId(),
            readBy: [new Types.ObjectId()],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const message = new MessageModel(messageWithoutSender);
        await expect(message.save()).rejects.toThrow('Message validation failed: sender: Path `sender` is required.');
    });

    test('should throw an error if content is missing', async () => {
        const messageWithoutContent = {
            sender: new Types.ObjectId(),
            chat: new Types.ObjectId(),
            readBy: [new Types.ObjectId()],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const message = new MessageModel(messageWithoutContent);
        await expect(message.save()).rejects.toThrow('Message validation failed: content: Path `content` is required.');
    });

    test('should throw an error if chat is missing', async () => {
        const messageWithoutChat = {
            sender: new Types.ObjectId(),
            content: 'Test message content',
            readBy: [new Types.ObjectId()],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const message = new MessageModel(messageWithoutChat);
        await expect(message.save()).rejects.toThrow('Message validation failed: chat: Path `chat` is required.');
    });

    test('should throw an error for invalid readBy value (non-array)', async () => {
        const messageWithInvalidReadBy = {
            sender: new Types.ObjectId(),
            content: 'Test message content',
            chat: new Types.ObjectId(),
            readBy: 'InvalidReadBy',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const message = new MessageModel(messageWithInvalidReadBy);
        await expect(message.save()).rejects.toThrow('Message validation failed: readBy.0: Cast to [ObjectId] failed for value \"[ \'InvalidReadBy\' ]\" (type string) at path \"readBy.0\" because of \"CastError\"');
    });

    test('should throw an error for invalid createdAt value', async () => {
        const messageWithInvalidCreatedAt = {
            sender: new Types.ObjectId(),
            content: 'Test message content',
            chat: new Types.ObjectId(),
            readBy: [new Types.ObjectId()],
            createdAt: 'invalidDate',
            updatedAt: new Date(),
        };

        const message = new MessageModel(messageWithInvalidCreatedAt);
        await expect(message.save()).rejects.toThrow('Message validation failed: createdAt: Cast to date failed for value \"invalidDate\" (type string) at path \"createdAt\"');
    });
});

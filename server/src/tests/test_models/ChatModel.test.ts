import { Types } from 'mongoose';
import ChatModel from '../../models/chatModel.ts';

describe('chat model', () => {
    test('should throw an error if chatName is missing', async () => {
        const chatWithoutChatName = {
            isGroupChat: false,
            users: [new Types.ObjectId(), new Types.ObjectId()],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const chat = new ChatModel(chatWithoutChatName);
        await expect(chat.save()).rejects.toThrow('Chat validation failed: chatName: Path `chatName` is required.');
    });

    test('should throw an error if chatName is missing', async () => {
        const chatWithoutChatName = {
            isGroupChat: false,
            users: [new Types.ObjectId(), new Types.ObjectId()],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const chat = new ChatModel(chatWithoutChatName);
        await expect(chat.save()).rejects.toThrow('Chat validation failed: chatName: Path `chatName` is required.');
    });

    test('should throw an error for invalid createdAt value', async () => {
        const chatWithInvalidCreatedAt = {
            chatName: 'Test Chat',
            isGroupChat: false,
            users: [new Types.ObjectId(), new Types.ObjectId()],
            createdAt: 'invalidDate',
            updatedAt: new Date(),
        };

        const chat = new ChatModel(chatWithInvalidCreatedAt);
        await expect(chat.save()).rejects.toThrow('Chat validation failed: createdAt: Cast to date failed for value "invalidDate" (type string) at path "createdAt"');
    });

    test('should throw an error for invalid updatedAt value', async () => {
        const chatWithInvalidUpdatedAt = {
            chatName: 'Test Chat',
            isGroupChat: false,
            users: [new Types.ObjectId(), new Types.ObjectId()],
            createdAt: new Date(),
            updatedAt: 'invalidDate',
        };

        const chat = new ChatModel(chatWithInvalidUpdatedAt);
        await expect(chat.save()).rejects.toThrow('Chat validation failed: updatedAt: Cast to date failed for value "invalidDate" (type string) at path "updatedAt"');
    });

    test('should throw an error if users array is invalid', async () => {
        const chatWithEmptyUsersArray = {
            chatName: 'Test Chat',
            isGroupChat: false,
            users: 'invalid',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const chat = new ChatModel(chatWithEmptyUsersArray);
        await expect(chat.save()).rejects.toThrow('Chat validation failed: users.0: Cast to [ObjectId] failed for value "[ \'invalid\' ]" (type string) at path "users.0" because of "CastError"');
    });

});

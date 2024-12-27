import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { UserEntity } from 'src/users/entities/user.entity';
import { In } from 'typeorm';

export const sendPushNotification = async (
  id: string | string[],
  title?: string,
  data?: any,
): Promise<void> => {
  const expo = new Expo();

  const users = await UserEntity.findBy({
    id: Array.isArray(id) ? In(id) : id,
  });

  const tokens = users.map((user) => user.expoToken);

  for (const token of tokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`);
      return;
    }
  }

  const messages: ExpoPushMessage[] = [
    {
      to: tokens,
      sound: 'default',
      body: title || 'Notification',
      data: data || {},
    },
  ];

  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
};

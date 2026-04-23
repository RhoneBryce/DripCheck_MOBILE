/* THIS IS FOR NOTIFEE THAT WONT WORK IN EXPO GO
import { Platform } from 'react-native';

export const scheduleDailyOutfitNotification = async (hours, minutes) => {
  // 1. Exit immediately if on Web
  if (Platform.OS === 'web') {
    console.log('Notifications skipped: Not supported on Web.');
    return;
  }

  try {
    // 2. Load the module
    const notifeeModule = require('@notifee/react-native');

    // 3. SAFETY CHECK: If we are in Expo Go, notifeeModule.default will be undefined.
    // We check this to prevent the "Cannot read property 'default' of undefined" error.
    if (!notifeeModule || !notifeeModule.default) {
      console.warn("⚠️ Notifee Native Module not found. This is normal in Expo Go.");
      console.log(`[SIMULATED] Notification would be set for ${hours}:${minutes}`);
      return; // Exit here so it doesn't crash the app
    }

    const notifee = notifeeModule.default;
    const { TriggerType, RepeatFrequency, AndroidImportance } = notifeeModule;

    // Request permissions
    await notifee.requestPermission();

    // Create Android Channel
    const channelId = await notifee.createChannel({
      id: 'daily-outfit',
      name: 'Daily Outfit Reminders',
      importance: AndroidImportance.HIGH,
    });

    // Calculate the timestamp
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    // If time already passed today, set for tomorrow
    if (date < new Date()) {
      date.setDate(date.getDate() + 1);
    }

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
      alarmManager: true, 
    };

    await notifee.createTriggerNotification(
      {
        title: '👗 Ready for your DripCheck?',
        body: "Tap to see today's weather-perfect outfit!",
        android: { 
          channelId,
          pressAction: { id: 'default' } 
        },
      },
      trigger,
    );
    
    console.log(`✅ Notification scheduled for ${hours}:${minutes}`);
  } catch (error) {
    // This catches the "Native module not found" error specifically
    console.error("Caught Notification Error:", error.message);
  }
};
*/
// EXPO NOTIFICATION
// src/utils/notificationHelper.js
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


// This tells the OS to show the alert even if the user is currently inside the app
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,      // Show the banner
    shouldPlaySound: true,      // Play the "ding"
    shouldSetBadge: false,      // Don't change app icon badge count
  }),
});

export const scheduleDailyOutfitNotification = async (hours, minutes) => {
  if (Platform.OS === 'web') return;

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;

    // 1. Create a Channel (Crucial for Android)
    const channelId = 'daily-outfits';
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(channelId, {
        name: 'Daily Outfit Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    // 2. Use the "type" based trigger structure
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "👗 Ready for your DripCheck?",
        body: "Tap to see today's weather-perfect outfit!",
      },
      trigger: {
        // Explicitly using the calendar type fixes the "invalid trigger" error
        hour: hours,
        minute: minutes,
        repeats: true,
        channelId: channelId, // Required for some Android versions
      },
    });

    console.log(`✅ Success: Scheduled for ${hours}:${minutes}`);
  } catch (error) {
    console.error("Scheduling Error:", error);
    throw error; 
  }
};

export const testInstantNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "DripCheck Test 🚀",
      body: "This is what your daily reminder looks like!",
    },
    trigger: { 
      seconds: 2,
      channelId: 'daily-outfits', // Link it to the channel you created above
    },
  });
};
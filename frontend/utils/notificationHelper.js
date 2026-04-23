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
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// FIXED THE WARNING: Replaced shouldShowAlert with shouldShowBanner
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, 
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const scheduleDailyOutfitNotification = async (hours, minutes) => {
  if (Platform.OS === 'web') return;

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;

    // Force strict numbers
    const safeHours = Number(hours);
    const safeMinutes = Number(minutes);

    if (isNaN(safeHours) || isNaN(safeMinutes)) {
      console.error("❌ ABORTING: Invalid time passed:", hours, minutes);
      return; 
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('daily-outfits', {
        name: 'Daily Outfit Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });
    }

    // Flush old alarms
    await Notifications.cancelAllScheduledNotificationsAsync();
    await new Promise(resolve => setTimeout(resolve, 500)); 
    await Notifications.dismissAllNotificationsAsync(); 

    // THE TRUE FIX: Explicitly define 'type' to satisfy Expo, and keep iOS clean!
    const triggerParams = Platform.OS === 'android'
      ? {
          type: 'calendar',
          hour: safeHours,
          minute: safeMinutes,
          repeats: true,
          channelId: 'daily-outfits', // Android needs this
        }
      : {
          type: 'calendar',
          hour: safeHours,
          minute: safeMinutes,
          repeats: true,
          // iOS gets a perfectly clean calendar object
        };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "👗 DripCheck Reminder",
        body: "Tap to see today's weather-perfect outfit!",
        sound: true,
      },
      trigger: triggerParams,
    });

    console.log(`✅ System Scheduled for exactly ${safeHours}:${safeMinutes < 10 ? '0'+safeMinutes : safeMinutes}`);
  } catch (error) {
    console.error("Scheduling Error:", error);
  }
};

export const testInstantNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "DripCheck Test 🚀",
      body: "This is what your daily reminder looks like!",
    },
    trigger: Platform.OS === 'android' 
      ? { seconds: 2, channelId: 'daily-outfits' }
      : { seconds: 2 },
  });
};
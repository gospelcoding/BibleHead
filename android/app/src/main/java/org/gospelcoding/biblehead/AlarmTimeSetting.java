package org.gospelcoding.biblehead;

import android.content.Context;
import android.content.SharedPreferences;

public abstract class AlarmTimeSetting {
    public static final String sharedPrefsKey = "org.gospelcoding.biblehead.alarmTime";
    public static final String timeKey = "alarmTime";
    public static final String titleKey = "notificationTitle";
    public static final String textKey = "notificationText";

    public static String getAlarmTime(Context context) {
        SharedPreferences values = context.getSharedPreferences(sharedPrefsKey, 0);
        return values.getString(timeKey, "");
    }

    public static String[] getNotificationParams(Context context) {
        SharedPreferences values = context.getSharedPreferences(sharedPrefsKey, 0);
        String[] params = new String[2];
        params[0] = values.getString(titleKey, "Review");
        params[1] = values.getString(textKey, "Review your verses.");
        return params;
    }

    public static void setAlarmTime(Context context, String time) {
        SharedPreferences.Editor valuesEditor = context.getSharedPreferences(sharedPrefsKey, 0).edit();
        valuesEditor.putString(timeKey, time);
        valuesEditor.commit();
    }

    public static void setAll(Context context, String time, String notificationTitle, String notificationText) {
        SharedPreferences.Editor valuesEditor = context.getSharedPreferences(sharedPrefsKey, 0).edit();
        valuesEditor.putString(timeKey, time);
        valuesEditor.putString(titleKey, notificationTitle);
        valuesEditor.putString(textKey, notificationText);
        valuesEditor.commit();
    }

    public static int[] parseTime(String time) {
        int colon = time.indexOf(':');
        int[] hourMinute = new int[2];
        hourMinute[0] = Integer.parseInt(time.substring(0, colon));
        hourMinute[1] = Integer.parseInt(time.substring(colon + 1));
        return hourMinute;
    }
}

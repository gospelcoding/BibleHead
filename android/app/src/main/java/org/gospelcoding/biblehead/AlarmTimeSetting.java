package org.gospelcoding.biblehead;

import android.content.Context;
import android.content.SharedPreferences;

public abstract class AlarmTimeSetting {
    public static final String sharedPrefsKey = "org.gospelcoding.biblehead.alarmTime";
    public static final String valueKey = "alarmTime";

    public static String getAlarmTime(Context context) {
        SharedPreferences values = context.getSharedPreferences(sharedPrefsKey, 0);
        return values.getString(valueKey, "");
    }

    public static void setAlarmTime(Context context, String time) {
        SharedPreferences.Editor valuesEditor = context.getSharedPreferences(sharedPrefsKey, 0).edit();
        valuesEditor.putString(valueKey, time);
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

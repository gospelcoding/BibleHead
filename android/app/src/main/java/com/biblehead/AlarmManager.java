package com.biblehead;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import java.util.Calendar;


public class AlarmManager {
    public static void setAlarm(Context context){
        Intent intent = new Intent(context, ReviewNotifier.class);
        PendingIntent alarmIntent = PendingIntent.getBroadcast(context, 0, intent, 0);
        android.app.AlarmManager alarmManager = (android.app.AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        
        Calendar alarmCal = nextCalendarAtTime(6, 30);
        alarmManager.setInexactRepeating(android.app.AlarmManager.RTC_WAKEUP,
                alarmCal.getTimeInMillis(),
                android.app.AlarmManager.INTERVAL_DAY,
                alarmIntent);
//                alarmIntent);
        Log.d("BH Alarm", "Set Alarm for " + alarmCal.getTime().toString());
//        long time = Calendar.getInstance().getTimeInMillis() + (1000 * 10);
//        alarmManager.setInexactRepeating(android.app.AlarmManager.RTC_WAKEUP,
//                time,
//                android.app.AlarmManager.INTERVAL_FIFTEEN_MINUTES,
//        Log.d("BH Alarm", "Set Alarm for " + time);
    }

    private static Calendar nextCalendarAtTime(int hour, int minute){
        Calendar now = Calendar.getInstance();
        Calendar rVal = Calendar.getInstance();
        rVal.set(Calendar.HOUR_OF_DAY, hour);
        rVal.set(Calendar.MINUTE, minute);
        if(now.getTimeInMillis() > rVal.getTimeInMillis())
            rVal.add(Calendar.DAY_OF_MONTH, 1);
        return rVal;
    }
}

package org.gospelcoding.biblehead;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("BH Alarm", "Received broadcast - BOOT COMPLETED");
        if (intent.getAction().equals("android.intent.action.BOOT_COMPLETED")) {
            String alarmTime = AlarmTimeSetting.getAlarmTime(context);
            if (alarmTime != "") {
                int[] hourMinute = AlarmTimeSetting.parseTime(alarmTime);
                AlarmManager.setAlarm(context, hourMinute[0], hourMinute[1]);
            }
        }
    }
}
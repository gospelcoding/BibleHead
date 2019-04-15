package org.gospelcoding.biblehead;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class AlarmModule extends ReactContextBaseJavaModule {
    private static boolean doReviewNowFlag = false;
    private static AlarmModule alarmModuleInstance;

    private ReactApplicationContext context;

    public AlarmModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "AlarmModule";
    }

    // To be called by MainActivity if we need to launch a review
    public static void setDoReviewFlag() {
        if (alarmModuleInstance != null)
            alarmModuleInstance.doReviewNow();
        else
            doReviewNowFlag = true;
    }

    @ReactMethod
    public void setupNotificationChannel(String description) {
        Log.d("BH Alarm", "Setup Notification Channel called...");
        if (Build.VERSION.SDK_INT < 26)
            return;
        NotificationManager mNotificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        String id = ReviewNotifier.NOTIFICATION_CHANNEL;
        CharSequence name = context.getString(R.string.app_name);
        NotificationChannel mChannel = new NotificationChannel(id, name, NotificationManager.IMPORTANCE_LOW);
        mChannel.setDescription(description);
        mChannel.enableLights(true);
        mChannel.setLightColor(Color.WHITE);
        mNotificationManager.createNotificationChannel(mChannel);
        Log.d("BH Alarm", "Notification Channel set up");
    }

    @ReactMethod
    public void setAlarmTime(String alarmTime, String notificationTitle, String notificationText) {
        int[] hourMinute = AlarmTimeSetting.parseTime(alarmTime);
        AlarmManager.setAlarm(context, hourMinute[0], hourMinute[1]);
        AlarmTimeSetting.setAll(context, alarmTime, notificationTitle, notificationText);
    }

    @ReactMethod
    public void cancelAlarm() {
        AlarmManager.cancelAlarm(context);
        AlarmTimeSetting.setAlarmTime(context, "");
    }

    @ReactMethod
    public void checkIfNeedToReviewNow(Promise promise) {
        if (doReviewNowFlag)
            promise.resolve(true);
        else
            promise.resolve(false);
        doReviewNowFlag = false;
    }

    private void doReviewNow() {
        Log.e("BH Alarm", "Do Review Now!");
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("DoReview", null);
    }
}

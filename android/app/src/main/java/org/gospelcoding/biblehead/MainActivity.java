package org.gospelcoding.biblehead;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    private String SHARED_PREFS_INSTANCE = "org.gospelcoding.biblehead.mainActivity";
    private String LAST_REVIEW_TIME_KEY = "org.gospelcoding.biblehead.lastReviewTime";

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "biblehead";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        processIntent();
        Log.e("BH Alarm", "MainActivity.onCreate!");
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.e("BH Alarm", "MainActivity.onNewIntent");
        processIntent();
    }

     private void processIntent() {
         Intent intent = getIntent();
         long doReviewNow = intent.getLongExtra(ReviewNotifier.DO_REVIEW_FLAG, 0);
         SharedPreferences values = getSharedPreferences(SHARED_PREFS_INSTANCE, 0);
         long lastReviewTime = values.getLong(LAST_REVIEW_TIME_KEY, 0);
         //Log.i("BH Alarm", intent.getExtras().toString());
         Log.e("BH Alarm", "Intent flag: " + doReviewNow + "Last Review Time: " + lastReviewTime);
         if (doReviewNow > 0 && doReviewNow != lastReviewTime) {
             Log.d("BH Alarm", "If satisfied");
             AlarmModule.setDoReviewFlag();
             SharedPreferences.Editor valuesEditor = values.edit();
             valuesEditor.putLong(LAST_REVIEW_TIME_KEY, doReviewNow);
             valuesEditor.apply();
         }
     }
}

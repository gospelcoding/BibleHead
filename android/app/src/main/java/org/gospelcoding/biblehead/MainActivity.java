package org.gospelcoding.biblehead;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

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
        boolean doReviewNow = intent.getBooleanExtra(ReviewNotifier.DO_REVIEW_FLAG, false);
        if (doReviewNow)
            AlarmModule.setDoReviewFlag();
        intent.removeExtra(ReviewNotifier.DO_REVIEW_FLAG);
    }
}

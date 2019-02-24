package org.gospelcoding.biblehead;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

public class ReviewNotifier extends BroadcastReceiver {
    public static final String NOTIFICATION_CHANNEL = "daily_review_reminder";
    public static final String DO_REVIEW_FLAG = "DO_REVIEW_FLAG";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("BH Alarm", "Alarm fired");

        String[] notificationParams = AlarmTimeSetting.getNotificationParams(context);
        String notificationTitle = notificationParams[0];
        String notificationText = notificationParams[1];

        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(context, NOTIFICATION_CHANNEL)
                        .setSmallIcon(R.drawable.ic_stat_biblehead_notification)
                        .setContentTitle(notificationTitle)
                        .setContentText(notificationText)
                        .setAutoCancel(true);

        Intent reviewActivityIntent = new Intent(context, MainActivity.class);
        reviewActivityIntent.putExtra(DO_REVIEW_FLAG, true);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, reviewActivityIntent, 0);

        mBuilder.setContentIntent(pendingIntent);
        NotificationManager mNotificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        mNotificationManager.notify(0, mBuilder.build());
    }
}


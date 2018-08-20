package com.biblehead;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.TaskStackBuilder;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

public class ReviewNotifier extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("BH Alarm", "Alarm fired");

        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(context, MainApplication.NOTIFICATION_CHANNEL)
                        .setSmallIcon(R.drawable.ic_stat_biblehead_notification)
                        .setContentTitle(context.getString(R.string.notification_title))
                        .setContentText(context.getString(R.string.notification_text))
                        .setAutoCancel(true);

        Intent reviewActivityIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("biblehead://biblehead/list/review"));
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, reviewActivityIntent, 0);

        mBuilder.setContentIntent(pendingIntent);
        NotificationManager mNotificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        mNotificationManager.notify(0, mBuilder.build());
    }
}


package org.gospelcoding.biblehead;


import android.content.Context;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverter;
import androidx.room.TypeConverters;
import androidx.room.migration.Migration;
import androidx.sqlite.db.SupportSQLiteDatabase;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Database(entities = {Verse.class}, version = 3)
@TypeConverters({AppDatabase.Converters.class})
public abstract class AppDatabase extends RoomDatabase {

    private static AppDatabase dbInstance;

    public abstract VerseDao verseDao();

    public static synchronized AppDatabase getDatabase(Context context){
        if (dbInstance == null)
            dbInstance = Room.databaseBuilder(context.getApplicationContext(), AppDatabase.class, "biblehead")
                             .addMigrations(MIGRATION_1_2, MIGRATION_2_3)
                             .build();
        return dbInstance;
    }

    public static class Converters {
        @TypeConverter
        public Date fromString(String s){
            try {
                SimpleDateFormat df = getSimpleDateFormat();
                return df.parse(s);
            }
            catch (ParseException e){
                Log.e("BibleHead DB", e.getMessage());
                e.printStackTrace();
                return null;
            }
        }

        @TypeConverter
        public String dateToString(Date d){
            SimpleDateFormat df = getSimpleDateFormat();
            return df.format(d);
        }

        private SimpleDateFormat getSimpleDateFormat(){
            return new SimpleDateFormat("yyyy-MM-dd");
        }
    }

    static final Migration MIGRATION_1_2 = new Migration(1, 2) {
        @Override
        public void migrate(@NonNull SupportSQLiteDatabase database) {
            database.execSQL("ALTER TABLE verse ADD COLUMN bibleBookNumber INTEGER NOT NULL DEFAULT 0");
        }
    };

    static final Migration MIGRATION_2_3 = new Migration(2, 3) {
        @Override
        public void migrate(@NonNull SupportSQLiteDatabase database) {
            database.execSQL("ALTER TABLE verse ADD COLUMN learned INTEGER NOT NULL DEFAULT 0");
        }
    };
}


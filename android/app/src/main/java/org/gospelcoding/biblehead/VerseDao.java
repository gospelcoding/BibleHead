package org.gospelcoding.biblehead;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Query;

import java.util.List;

@Dao
public interface VerseDao {
    @Query("SELECT * From verse ORDER BY bibleBookNumber, chapterStart, verseStart")
    List<Verse> getAll();

}

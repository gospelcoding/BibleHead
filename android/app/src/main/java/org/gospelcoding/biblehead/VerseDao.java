package org.gospelcoding.biblehead;



import androidx.room.Dao;
import androidx.room.Query;

import java.util.List;

@Dao
public interface VerseDao {
    @Query("SELECT * From verse ORDER BY bibleBookNumber, chapterStart, verseStart")
    List<Verse> getAll();

}

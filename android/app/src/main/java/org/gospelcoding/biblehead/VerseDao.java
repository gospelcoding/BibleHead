package org.gospelcoding.biblehead;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import java.util.List;

@Dao
public interface VerseDao {
    @Query("SELECT * FROM verse WHERE id=:id")
    Verse find(int id);

    @Query("SELECT * FROM verse WHERE id IN (:ids)")
    List<Verse> getById(int... ids);

    @Query("SELECT * From verse ORDER BY bibleBookNumber, chapterStart, verseStart")
    List<Verse> getAll();

    @Query("SELECT * FROM verse WHERE learned ORDER BY (3*(julianday('now') - julianday(lastReview)) - successfulReviews) DESC LIMIT :numberOfVerses")
    List<Verse> getVersesForReview(int numberOfVerses);

    @Insert
    long insert(Verse verse);

    @Update
    void update(Verse verse);

    @Delete
    void deleteVerses(Verse... verses);
}

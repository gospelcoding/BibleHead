package org.gospelcoding.biblehead;

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;
import android.content.Context;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;
import java.util.List;

@Entity
public class Verse {
    @PrimaryKey(autoGenerate = true)
    public int id;

    public String text;

    // Reference
    public String bibleBook;
    public int bibleBookNumber;
    public int chapterStart;
    public int chapterEnd;
    public int verseStart;
    public int verseEnd;

    // Reviews
    public boolean learned;
    public Date lastReview;
    public int successfulReviews;

    @Ignore
    public List<Integer> validationErrors;

    Verse(){
        learned = false;
        lastReview = new Date();
        successfulReviews = 0;
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject verseJSON = new JSONObject();
        //verseJSON.put("id", id); // It would be ignored anyway
        verseJSON.put("text", text);
        verseJSON.put("bookName", bibleBook);
        verseJSON.put("bookId", BibleBook.usfmToIndex(bibleBookNumber));
        verseJSON.put("startChapter", chapterStart);
        verseJSON.put("startVerse", verseStart);
        if (chapterStart != chapterEnd || verseStart != verseEnd) {
            verseJSON.put("endChapter", chapterEnd);
            verseJSON.put("endVerse", verseEnd);
        }
        verseJSON.put("learned", learned);
        verseJSON.put("lastReview", lastReview.getTime());
        verseJSON.put("successfulReviews", successfulReviews);
        verseJSON.put("createdAt", lastReview.getTime()); // Best approx
        return verseJSON;

    }

    public static JSONArray allToJSON(Context context) {
        JSONArray versesJSONArray = new JSONArray();
        List<Verse> verses = AppDatabase.getDatabase(context).verseDao().getAll();
        for(Verse verse : verses) {
            try {
                versesJSONArray.put(verse.toJSON());
            } catch(JSONException e) {
                Log.e("JSON", e.getMessage());
            }
        }
        return versesJSONArray;
    }
}

package org.gospelcoding.biblehead;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;
import android.content.Context;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
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

    public void update(String text, String bibleBook, int bibleBookNumber, int chapterStart, int verseStart){
        update(text, bibleBook, bibleBookNumber, chapterStart, chapterStart, verseStart, verseStart);
    }

    public void update(String text, String bibleBook, int bibleBookNumber, int chapterStart, int chapterEnd, int verseStart, int verseEnd){
        this.text = text;
        this.bibleBook = bibleBook;
        this.bibleBookNumber = bibleBookNumber;
        this.chapterStart = chapterStart;
        this.chapterEnd = chapterEnd;
        this.verseStart = verseStart;
        this.verseEnd = verseEnd;
    }

    public boolean comesAfter(Verse otherVerse){
        if (bibleBookNumber != otherVerse.bibleBookNumber)
            return bibleBookNumber > otherVerse.bibleBookNumber;

        if (chapterStart != otherVerse.chapterStart)
            return chapterStart > otherVerse.chapterStart;

        return verseStart > otherVerse.verseStart;

    }

//    // Does not validate that the book contains the chapters/verses indicated
//    public boolean isValid(){
//        validationErrors = new ArrayList();
//
//        if (text == null || text.length() == 0)
//            validationErrors.add(R.string.verse_text_not_blank);
//
//        if (chapterEnd < chapterStart || (chapterEnd == chapterStart && verseEnd < verseStart))
//            validationErrors.add(R.string.end_verse_after_start_verse);
//
//        if (chapterStart <= 0 || chapterEnd <= 0 || chapterStart > 150 || chapterEnd > 150)
//            validationErrors.add(R.string.valid_chapter_numbers);
//
//        if (verseStart <= 0 || verseEnd <= 0 || verseStart > 200 || verseEnd > 200)
//            validationErrors.add(R.string.valid_verse_numbers);
//
//        return validationErrors.size() == 0;
//    }

//    public String getReference(){
//        String ref = bibleBook
//                + ' ' + String.valueOf(chapterStart)
//                + ':' + String.valueOf(verseStart);
//
//        if(chapterEnd != chapterStart){
//            ref += '-' + String.valueOf(chapterEnd)
//                       + ':' + String.valueOf(verseEnd);
//        }
//        else if(verseEnd != verseStart){
//            ref += '-' + String.valueOf(verseEnd);
//        }
//
//        return ref;
//    }

    public int getProgress(){
        double progress = 100 - (1000 / (successfulReviews + 10.0));
        return (int) Math.round(progress);
    }

    public void markReviewed(boolean success){
        lastReview = new Date();
        if (success)
            ++successfulReviews;
    }

    public void toggleLearned(boolean learned){
        this.learned = learned;
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

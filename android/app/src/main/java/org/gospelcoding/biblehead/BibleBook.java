package org.gospelcoding.biblehead;

import android.content.Context;

import java.util.ArrayList;
import java.util.List;

public class BibleBook {

//    private String name;
//    private int usfmNumber;
//
//    private BibleBook(int usfmNumber, String name){
//        this.usfmNumber = usfmNumber;
//        this.name = name;
//    }
//
//    public int getUsfmNumber(){ return usfmNumber; }
//    public String getName(){ return name; }
//    public String toString(){ return name; }
//
//    public static List<BibleBook> getBibleBooks(Context context){
//        String[] bookNames = context.getResources().getStringArray(R.array.bible_books);
//        List<BibleBook> bibleBooks = new ArrayList(bookNames.length);
//        for(int i=0; i<bookNames.length; ++i){
//            bibleBooks.add(i, new BibleBook(indexToUSFM(i), bookNames[i]));
//        }
//        return bibleBooks;
//    }
//
//    private static int indexToUSFM(int index){
//        // Assumes 66 canonical books with indices from 0 to 65
//        // USFM numbers are 1-39 for Old Testament and 41-67 for New Testament
//
//        ++index;
//        if (index > 39)
//            ++index;
//        return index;
//    }

    public static int usfmToIndex(int usfm) {
        // New Testament
        if (usfm > 40)
            --usfm;

        // Start numbering at 0
        --usfm;
        return usfm;
    }
}

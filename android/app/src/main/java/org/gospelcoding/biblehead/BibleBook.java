package org.gospelcoding.biblehead;

public class BibleBook {
    public static int usfmToIndex(int usfm) {
        // New Testament
        if (usfm > 40)
            --usfm;

        // Start numbering at 0
        --usfm;
        return usfm;
    }
}

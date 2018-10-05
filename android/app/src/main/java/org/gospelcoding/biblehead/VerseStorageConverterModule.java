package org.gospelcoding.biblehead;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class VerseStorageConverterModule extends ReactContextBaseJavaModule {
    Context context;

    public VerseStorageConverterModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "VerseStorageConverterModule";
    }

    @ReactMethod
    public void importExistingVerses(Promise promise) {
        if (!existingDatabase()) {
            promise.resolve("[]");
            return;
        }
        Log.i("VerseImport", "Importing verses...");
        promise.resolve(Verse.allToJSON(context).toString());
    }

    private boolean existingDatabase() {
        String relPath = "databases" + File.separator + "biblehead";
        File dbFile = new File(context.getFilesDir().getParent(), relPath);
        return dbFile.exists();
    }
}

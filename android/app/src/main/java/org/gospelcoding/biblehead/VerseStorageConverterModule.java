package org.gospelcoding.biblehead;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

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
        if (checkForAssetDB()) {
            promise.resolve("[]");
            return;
        }
        if (!existingDatabase()) {
            promise.resolve("[]");
            return;
        }
        Log.i("VerseImport", "Importing verses...");
        promise.resolve(Verse.allToJSON(context).toString());
    }

    private boolean checkForAssetDB() {
        copyAsset(context.getAssets(), "RKStorage", "/data/data/org.gospelcoding.biblehead/databases/RKStorage");
        return true;
    }

    // Shameless stolen from StackOverflow ================
    private static boolean copyAsset(AssetManager assetManager,
                                     String fromAssetPath, String toPath) {
        InputStream in = null;
        OutputStream out = null;
        try {
            in = assetManager.open(fromAssetPath);
            new File(toPath).createNewFile();
            out = new FileOutputStream(toPath);
            copyFile(in, out);
            in.close();
            in = null;
            out.flush();
            out.close();
            out = null;
            return true;
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private static void copyFile(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int read;
        while((read = in.read(buffer)) != -1){
            out.write(buffer, 0, read);
        }
    }
    // ======================================

    private boolean existingDatabase() {
        String relPath = "databases" + File.separator + "biblehead";
        File dbFile = new File(context.getFilesDir().getParent(), relPath);
        return dbFile.exists();
    }
}

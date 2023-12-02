package host.android.triage;

import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class AndroidBeamReactNativeModule extends ReactContextBaseJavaModule {

    AndroidBeamReactNativeModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "AndroidBeamReactNativeModule";
    }
    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    @ReactMethod
    public void send(String jsonData) {
        Log.d("My module", "send event called with name: " + jsonData);
        WritableMap params = Arguments.createMap();
        params.putString("data", jsonData);
        ReactContext reactContext = getReactApplicationContext();
        NdefRecord ndefRecord = NdefRecord.createMime("application/json", jsonData.getBytes());
        NdefMessage ndefMessage = new NdefMessage(ndefRecord);
        nfcAdapter.setNdefPushMessage(ndefMessage, this);

        sendEvent(reactContext, "EventReminder", params);


    }
}
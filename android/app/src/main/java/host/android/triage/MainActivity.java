package host.android.triage;

import android.content.pm.PackageManager;
import android.nfc.NfcAdapter;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {
  NfcAdapter nfcAdapter;
  // Flag to indicate that Android Beam is available
  boolean androidBeamAvailable  = false;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Set the theme to AppTheme BEFORE onCreate to support 
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null);
    Toast.makeText(this, "Activity", Toast.LENGTH_SHORT);
    Log.d("Activity", "Loaded");

    // NFC isn't available on the device
    if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_NFC)) {
      /*
       * Disable NFC features here.
       * For example, disable menu items or buttons that activate
       * NFC-related features
       */

      // Android Beam file transfer isn't supported
    } else if (Build.VERSION.SDK_INT <
            Build.VERSION_CODES.JELLY_BEAN_MR1) {
      // If Android Beam isn't available, don't continue.
      androidBeamAvailable = false;
      /*
       * Disable Android Beam file transfer features here.
       */

      // Android Beam file transfer is available, continue
    } else {
      androidBeamAvailable = true;
      nfcAdapter = NfcAdapter.getDefaultAdapter(this);
      Log.d("Activity", "NFC adapter loaded");
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()));
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }
}

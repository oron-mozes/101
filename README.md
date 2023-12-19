# 101

## Getting started.

Follow guide at: https://docs.expo.dev/workflow/android-studio-emulator/

## Development

https://docs.expo.dev/develop/development-builds/create-a-build/

create a build - paste in to the device and make sure to install it. then you can npx export start --dev-client

1. $npm run start
2. select a for android


## java 16<
brew install openjdk@17 


## Build

Signup to: https://expo.dev/signup
Follow: https://docs.expo.dev/build/setup/

## Create APK

$eas build -p android --profile preview

## issues and resolutions

npx react-native start --reset-cache

## figma:

https://www.figma.com/file/arl3RP1jwbWoE9Fua9bAdp/101?type=design&node-id=49-227306&mode=design&t=c1v6taorHSX8lY8b-0

## Post npm run clean actions:

1. we need to make sure that our AndroidManifest.xml application contains that hardware acceleration
   `<application android:name=".MainApplication" android:label="@string/app_name" android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher_round" android:allowBackup="true" android:theme="@style/AppTheme" android:hardwareAccelerated="true">`
2. make sure that inside the application tag to add:

```<meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode"/>

```

3. add `<uses-feature android:name="android.hardware.nfc" android:required="true" />`

4. we need to make sure that build.gradle includes inside "defaultConfig":
   `missingDimensionStrategy 'react-native-camera', 'general'`
5. setting.gradle `include ':react-native-compressor'
project(':react-native-compressor').projectDir = new File(rootProject.projectDir,'../node_modules/react-native-compressor/android')`
6. MainApplication.java 'import com.reactnativecompressor.CompressorPackage;'

<host-apdu-service xmlns:android="http://schemas.android.com/apk/res/android"
                   android:description="@string/app_name"
                   android:requireDeviceUnlock="false">
<aid-group android:category="other"
             android:description="@string/app_name">

<!-- Create a separate <aid-filer /> node for each NFC application ID, that You intent to emulate/host. -->
<!-- For the NFC Type 4 tag emulation, let's put "D2760000850101" -->
<aid-filter android:name="D2760000850101" />
</aid-group>
</host-apdu-service>

### debugging

$npx react-devtools

If you wish to run from physical device you need to adb reverse tcp:8081 tcp:8097 otherwise adb reverse tcp:8081 tcp:8081

# 101

## Getting started.

Follow guide at: https://docs.expo.dev/workflow/android-studio-emulator/

## Development

https://docs.expo.dev/develop/development-builds/create-a-build/

create a build - paste in to the device and make sure to install it. then you can npx export start --dev-client

1. $npm run start
2. select a for android

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

3. we need to make sure that build.gradle includes inside "defaultConfig":
   `missingDimensionStrategy 'react-native-camera', 'general'`

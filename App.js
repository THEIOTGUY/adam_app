import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      const { status: micStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      const { status: mediaStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

      if (Platform.OS === 'android') {
        const { status: phoneStatus } = await Permissions.askAsync(Permissions.SYSTEM_BRIGHTNESS); // Expo does not support CALL_PHONE directly
        // CALL_PHONE isn't requestable via expo-permissions. You'd need a custom native module or use Intent.
      }

      console.log('Permissions granted:', {
        cameraStatus,
        micStatus,
        mediaStatus,
        locationStatus,
      });
    } catch (err) {
      console.warn('Permission error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://studio-7n7e8bymz-theiotguys-projects.vercel.app' }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

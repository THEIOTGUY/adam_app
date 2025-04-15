import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const permissionsToRequest = Platform.select({
        ios: [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.MICROPHONE,
          PERMISSIONS.IOS.MEDIA_LIBRARY,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        ],
        android: [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ],
      });

      for (const permission of permissionsToRequest) {
        const result = await request(permission);
        console.log(`${permission}: ${result}`);
      }
    } catch (error) {
      console.warn('Permission request error:', error);
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

import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import VideoPackage from './src/Video';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <VideoPackage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

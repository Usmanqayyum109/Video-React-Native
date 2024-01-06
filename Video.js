import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

export default function VideoPackage() {
  const [clicked, setClicked] = useState();
  const [paused, setpaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const videoUrl = require('./Assets/sample-mp4-file.mp4');

  const videoRef = useRef();

  const replay = () => {
    videoRef.current.seek(progress.currentTime - 10);
  };
  const forward = () => {
    videoRef.current.seek(progress.currentTime + 10);
  };

  const format = seconds => {
    let min = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let sec = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    console.log(seconds);
    return `${min}:${sec}`;
  };

  return (
    <SafeAreaView
      style={[styles.container, {height: fullScreen ? '100%' : 200}]}>
      <TouchableOpacity onPress={() => setClicked(true)}>
        <Video
          ref={videoRef}
          // source={require('./Assets/sample-mp4-file-small.mp4')}
          source={videoUrl}
          resizeMode="cover"
          muted
          //   repeat={true}
          onProgress={time => {
            setProgress(time);
          }}
          paused={paused}
          style={[styles.video, {height: fullScreen ? '100%' : 200}]}
        />
        {clicked && (
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => setClicked(!clicked)}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => replay()}>
                <Icon name="replay-10" size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setpaused(!paused)}>
                <Icon
                  name={paused ? 'play-circle-filled' : 'pause-circle'}
                  size={40}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => forward()}>
                <Icon name="forward-10" size={40} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <Text style={{color: 'white'}}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={{width: '80%', height: 40}}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#ffffff"
                onValueChange={x => {
                  videoRef.current.seek(x);
                }}
              />
              <Text style={{color: 'white'}}>
                {format(progress.seekableDuration)}
              </Text>
            </View>
            <View style={[styles.time, {top: 0, bottom: null, padding: 5}]}>
              <TouchableOpacity
                onPress={() => {
                  if (fullScreen) {
                    Orientation.lockToPortrait();
                  } else {
                    Orientation.lockToLandscape;
                  }
                  setFullScreen(!fullScreen);
                }}>
                <Icon
                  name={fullScreen ? 'fullscreen-exit' : 'fullscreen'}
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  video: {
    width: '100%',
  },
  opacity: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  time: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    alignItems: 'center',
  },
});

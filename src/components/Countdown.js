import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';


const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;
export const Countdown = ({
minutes = 20,
isPaused,
onProgress, 
onEnd
}) => {
  const interval = React.useRef(null);
    const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((time) => {
      if(time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeleft = time - 1000;
      return timeleft;
    })
  }

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes))
    if(millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes]) 

  useEffect(() => {
    console.log(millis)
  }, [millis])

  useEffect(() => {
    if(isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current)

  }, [isPaused])
  

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
  <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  }
})
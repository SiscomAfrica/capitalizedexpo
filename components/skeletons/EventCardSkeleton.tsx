/**
 * Skeleton loader for Event Card
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const EventCardSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.dateBox, { opacity }]} />
      <View style={styles.content}>
        <Animated.View style={[styles.timeLine, { opacity }]} />
        <Animated.View style={[styles.titleLine, { opacity }]} />
        <Animated.View style={[styles.titleLineShort, { opacity }]} />
        <Animated.View style={[styles.locationLine, { opacity }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  dateBox: {
    width: 70,
    height: 70,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  timeLine: {
    width: '60%',
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  titleLine: {
    width: '100%',
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  titleLineShort: {
    width: '80%',
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  locationLine: {
    width: '50%',
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
});


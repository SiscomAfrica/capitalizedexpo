/**
 * Skeleton loader for Investment Card
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const InvestmentCardSkeleton = () => {
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
      <Animated.View style={[styles.image, { opacity }]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Animated.View style={[styles.badge, { opacity }]} />
          <Animated.View style={[styles.badgeSmall, { opacity }]} />
        </View>
        <Animated.View style={[styles.titleLine, { opacity }]} />
        <Animated.View style={[styles.titleLineShort, { opacity }]} />
        <Animated.View style={[styles.descLine, { opacity }]} />
        <Animated.View style={[styles.descLine, { opacity }]} />
        <View style={styles.metricsRow}>
          <Animated.View style={[styles.metricBox, { opacity }]} />
          <Animated.View style={[styles.metricBox, { opacity }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#E5E7EB',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    width: 80,
    height: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
  },
  badgeSmall: {
    width: 60,
    height: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
  },
  titleLine: {
    width: '100%',
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  titleLineShort: {
    width: '70%',
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 12,
  },
  descLine: {
    width: '100%',
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 6,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  metricBox: {
    flex: 1,
    height: 60,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
  },
});


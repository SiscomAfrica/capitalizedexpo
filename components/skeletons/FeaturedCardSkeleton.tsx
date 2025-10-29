/**
 * Skeleton loader for Featured Investment Card
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

export const FeaturedCardSkeleton = () => {
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
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <Animated.View style={[styles.background, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#E5E7EB',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#D1D5DB',
  },
});


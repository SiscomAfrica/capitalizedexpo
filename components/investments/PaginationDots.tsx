/**
 * Pagination Dots Component
 * For horizontal scrollable content
 */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({ count, activeIndex }) => {
  if (count <= 1) return null;

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    width: 24,
    backgroundColor: '#190046',
  },
});


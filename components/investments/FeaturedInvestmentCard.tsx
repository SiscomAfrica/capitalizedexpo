/**
 * Featured Investment Card Component
 * Used for horizontal scrolling featured investments
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Investment } from '@/types/investment';
import { Typography } from '@/hooks/use-fonts';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48; // Screen width minus padding

interface FeaturedInvestmentCardProps {
  investment: Investment;
  onPress: (investment: Investment) => void;
}

export const FeaturedInvestmentCard: React.FC<FeaturedInvestmentCardProps> = ({ 
  investment, 
  onPress 
}) => {
  const formatCurrency = (value: number | null) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getRiskColor = (risk: string | null) => {
    switch (risk) {
      case 'low':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH }]}
      onPress={() => onPress(investment)}
      activeOpacity={0.9}
    >
      {/* Background Image with Overlay */}
      {investment.card_image_url ? (
        <>
          <Image
            source={{ uri: investment.card_image_url }}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
        </>
      ) : (
        <View style={styles.placeholderBackground}>
          <Ionicons name="image-outline" size={60} color="#FFFFFF" />
        </View>
      )}

      {/* Content Overlay */}
      <View style={styles.content}>
        {/* Featured Badge */}
        <View style={styles.featuredBadge}>
          <Ionicons name="star" size={14} color="#FFA500" />
          <Text style={styles.featuredText}>Featured</Text>
        </View>

        {/* Category & Risk */}
        <View style={styles.headerRow}>
          {investment.category && (
            <View style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>{investment.category}</Text>
            </View>
          )}
          {investment.risk_level && (
            <View style={[styles.riskChip, { borderColor: getRiskColor(investment.risk_level) }]}>
              <Text style={[styles.riskChipText, { color: getRiskColor(investment.risk_level) }]}>
                {investment.risk_level.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Title & Description */}
        <View style={styles.textContent}>
          <Text style={[Typography.heading, styles.title]} numberOfLines={2}>
            {investment.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {investment.short_description}
          </Text>
        </View>

        {/* Investment Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Min. Investment</Text>
            <Text style={styles.statValue}>{formatCurrency(investment.minimum_investment)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Expected Return</Text>
            <Text style={styles.statValue}>
              {investment.expected_return ? `${investment.expected_return}%` : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Interest Indicator */}
        <View style={styles.footer}>
          <View style={styles.interestRow}>
            <Ionicons name="people" size={16} color="#FFFFFF" />
            <Text style={styles.interestText}>
              {investment.interest_count} interested
            </Text>
          </View>
          <View style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  placeholderBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#190046',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 4,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Poppins_700Bold',
  },
  headerRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  riskChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  riskChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    padding: 12,
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
    fontFamily: 'Poppins_400Regular',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  interestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  interestText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
  },
});


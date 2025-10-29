/**
 * Reusable Investment Card Component
 * Used for displaying investments in a vertical list
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Investment } from '@/types/investment';
import { Typography } from '@/hooks/use-fonts';

interface InvestmentCardProps {
  investment: Investment;
  onPress: (investment: Investment) => void;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, onPress }) => {
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
      style={styles.card}
      onPress={() => onPress(investment)}
      activeOpacity={0.7}
    >
      {/* Card Image */}
      {investment.card_image_url ? (
        <Image
          source={{ uri: investment.card_image_url }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.cardImage, styles.placeholderImage]}>
          <Ionicons name="image-outline" size={40} color="#999999" />
        </View>
      )}

      {/* Card Content */}
      <View style={styles.cardContent}>
        {/* Category & Risk Level */}
        <View style={styles.headerRow}>
          {investment.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{investment.category}</Text>
            </View>
          )}
          {investment.risk_level && (
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(investment.risk_level) + '20' }]}>
              <Text style={[styles.riskText, { color: getRiskColor(investment.risk_level) }]}>
                {investment.risk_level.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text style={[Typography.heading, styles.title]} numberOfLines={2}>
          {investment.title}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {investment.short_description}
        </Text>

        {/* Investment Details */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Min. Investment</Text>
            <Text style={[Typography.body, styles.detailValue]}>
              {formatCurrency(investment.minimum_investment)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Expected Return</Text>
            <Text style={[Typography.body, styles.detailValue]}>
              {investment.expected_return ? `${investment.expected_return}%` : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Interest Count */}
        <View style={styles.footer}>
          <View style={styles.interestRow}>
            <Ionicons name="people" size={16} color="#666666" />
            <Text style={styles.interestText}>
              {investment.interest_count} {investment.interest_count === 1 ? 'person' : 'people'} interested
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F0F0F0',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Poppins_400Regular',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Poppins_700Bold',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  interestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  interestText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
});


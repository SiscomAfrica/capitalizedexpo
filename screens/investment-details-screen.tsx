/**
 * Investment Details Screen
 * Shows comprehensive information about a specific investment
 */

import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInvestmentStore } from '@/stores/investment.store';

const { width } = Dimensions.get('window');

interface InvestmentDetailsScreenProps {
  onNavigate?: (screen: string, params?: any) => void;
  investmentId?: string;
}

export default function InvestmentDetailsScreen({
  onNavigate,
  investmentId,
}: InvestmentDetailsScreenProps) {
  const { fontsLoaded } = useCustomFonts();

  const {
    selectedInvestment,
    selectedInvestmentLoading,
    selectedInvestmentError,
    fetchInvestmentById,
    toggleInterest,
    resetSelectedInvestment,
  } = useInvestmentStore();

  useEffect(() => {
    if (investmentId) {
      fetchInvestmentById(investmentId);
    }
    return () => {
      resetSelectedInvestment();
    };
  }, [investmentId]);

  const handleToggleInterest = async () => {
    if (!selectedInvestment) return;
    try {
      await toggleInterest(selectedInvestment.id, !selectedInvestment.user_interested);
    } catch (error) {
      console.error('Failed to toggle interest:', error);
    }
  };

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

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#190046" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={true} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => onNavigate?.('home')}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={[Typography.heading, styles.headerTitle]}>Investment Details</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={22} color="#FFFFFF" style={{ marginRight: 16 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleInterest}>
            <Ionicons
              name={selectedInvestment?.user_interested ? 'heart' : 'heart-outline'}
              size={22}
              color={selectedInvestment?.user_interested ? '#EF4444' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {selectedInvestmentLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#190046" />
          <Text style={styles.loadingText}>Loading investment details...</Text>
        </View>
      ) : selectedInvestmentError ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#EF4444" />
          <Text style={styles.errorText}>{selectedInvestmentError}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => investmentId && fetchInvestmentById(investmentId)}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : !selectedInvestment ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Investment not found</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Banner Image */}
            <View style={styles.bannerCard}>
              {selectedInvestment.card_image_url ? (
                <Image
                  source={{ uri: selectedInvestment.card_image_url }}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.placeholderBanner}>
                  <Ionicons name="image-outline" size={60} color="#999999" />
                </View>
              )}
            </View>

            {/* Title & Category Card */}
            <View style={styles.titleCard}>
              <View style={styles.headerRow}>
                {selectedInvestment.category && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{selectedInvestment.category}</Text>
                  </View>
                )}
                {selectedInvestment.risk_level && (
                  <View
                    style={[
                      styles.riskBadge,
                      { backgroundColor: getRiskColor(selectedInvestment.risk_level) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.riskText,
                        { color: getRiskColor(selectedInvestment.risk_level) },
                      ]}
                    >
                      {selectedInvestment.risk_level.toUpperCase()} RISK
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[Typography.heading, styles.investmentTitle]}>
                {selectedInvestment.title}
              </Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="people" size={16} color="#666666" />
                  <Text style={styles.metaText}>
                    {selectedInvestment.interest_count} interested
                  </Text>
                </View>
                {selectedInvestment.investment_type && (
                  <View style={styles.metaItem}>
                    <Ionicons name="briefcase" size={16} color="#666666" />
                    <Text style={styles.metaText}>{selectedInvestment.investment_type}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Key Investment Metrics */}
            <View style={styles.metricsCard}>
              <Text style={styles.sectionTitle}>Key Metrics</Text>
              <View style={styles.metricsGrid}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Minimum Investment</Text>
                  <Text style={styles.metricValue}>
                    {formatCurrency(selectedInvestment.minimum_investment)}
                  </Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Expected Return</Text>
                  <Text style={styles.metricValue}>
                    {selectedInvestment.expected_return
                      ? `${selectedInvestment.expected_return}%`
                      : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionCard}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {selectedInvestment.details?.detailed_description ||
                  selectedInvestment.short_description}
              </Text>
            </View>

            {/* Financial Data */}
            {selectedInvestment.details?.financial_data &&
              Object.keys(selectedInvestment.details.financial_data).length > 0 && (
                <View style={styles.financialCard}>
                  <Text style={styles.sectionTitle}>Financial Overview</Text>
                  {Object.entries(selectedInvestment.details.financial_data).map(
                    ([key, value]) => (
                      <View key={key} style={styles.financialRow}>
                        <Text style={styles.financialLabel}>
                          {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Text>
                        <Text style={styles.financialValue}>{String(value)}</Text>
                      </View>
                    )
                  )}
                </View>
              )}

            {/* Team Members */}
            {selectedInvestment.details?.team_members &&
              selectedInvestment.details.team_members.length > 0 && (
                <View style={styles.teamCard}>
                  <Text style={styles.sectionTitle}>Team</Text>
                  {selectedInvestment.details.team_members.map((member, index) => (
                    <View key={index} style={styles.teamMember}>
                      <View style={styles.teamAvatar}>
                        {member.image ? (
                          <Image source={{ uri: member.image }} style={styles.teamAvatarImage} />
                        ) : (
                          <Ionicons name="person" size={24} color="#999999" />
                        )}
                      </View>
                      <View style={styles.teamInfo}>
                        <Text style={styles.teamName}>{member.name}</Text>
                        <Text style={styles.teamRole}>{member.role}</Text>
                        {member.bio && <Text style={styles.teamBio}>{member.bio}</Text>}
                      </View>
                    </View>
                  ))}
                </View>
              )}

            {/* FAQs */}
            {selectedInvestment.details?.faqs && selectedInvestment.details.faqs.length > 0 && (
              <View style={styles.faqCard}>
                <Text style={styles.sectionTitle}>FAQs</Text>
                {selectedInvestment.details.faqs.map((faq, index) => (
                  <View key={index} style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Contact Info */}
            {selectedInvestment.details?.contact_info && (
              <View style={styles.contactCard}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                {selectedInvestment.details.contact_info.email && (
                  <View style={styles.contactRow}>
                    <Ionicons name="mail" size={20} color="#190046" />
                    <Text style={styles.contactText}>
                      {selectedInvestment.details.contact_info.email}
                    </Text>
                  </View>
                )}
                {selectedInvestment.details.contact_info.phone && (
                  <View style={styles.contactRow}>
                    <Ionicons name="call" size={20} color="#190046" />
                    <Text style={styles.contactText}>
                      {selectedInvestment.details.contact_info.phone}
                    </Text>
                  </View>
                )}
                {selectedInvestment.details.contact_info.website && (
                  <View style={styles.contactRow}>
                    <Ionicons name="globe" size={20} color="#190046" />
                    <Text style={styles.contactText}>
                      {selectedInvestment.details.contact_info.website}
                    </Text>
                  </View>
                )}
              </View>
            )}

            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Sticky CTA */}
          <View style={styles.ctaBar}>
            <TouchableOpacity style={styles.ctaButton} onPress={() => {}}>
              <Text style={styles.ctaText}>EXPRESS INTEREST</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#190046',
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    fontFamily: 'Poppins_400Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    fontFamily: 'Poppins_400Regular',
  },
  retryButton: {
    backgroundColor: '#190046',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  bannerCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    backgroundColor: '#F0F0F0',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  placeholderBanner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  titleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Poppins_600SemiBold',
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
  investmentTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'Poppins_700Bold',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  metricsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'Poppins_700Bold',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#190046',
    fontFamily: 'Poppins_700Bold',
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  financialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  financialLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins_400Regular',
  },
  financialValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins_600SemiBold',
  },
  teamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  teamMember: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  teamAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  teamAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  teamRole: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Poppins_400Regular',
  },
  teamBio: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
    fontFamily: 'Poppins_400Regular',
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Poppins_600SemiBold',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Poppins_400Regular',
  },
  ctaBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    padding: 16,
  },
  ctaButton: {
    backgroundColor: '#e6c79d',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaText: {
    color: '#0A0A0A',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});


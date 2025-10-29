import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface EventDetailsScreenProps {
  onNavigate?: (screen: string, params?: any) => void;
  bannerImage?: any | null;
}

export default function EventDetailsScreen({ onNavigate, bannerImage }: EventDetailsScreenProps) {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
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
        <Text style={[Typography.heading, styles.headerTitle]}>Event Details</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="share-outline" size={22} color="#FFFFFF" style={{ marginRight: 16 }} />
          <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <View style={styles.tabButton}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Overview</Text>
          <View style={styles.tabIndicator} />
        </View>
        <View style={styles.tabButton}><Text style={styles.tabText}>Schedule</Text></View>
        <View style={styles.tabButton}><Text style={styles.tabText}>Speakers</Text></View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerCard}>
          <Image source={bannerImage || require('@/assets/images/partial-react-logo.png')} style={styles.bannerImage} resizeMode="cover" />
        </View>

        {/* Title Card */}
        <View style={styles.titleCard}>
          <Text style={[Typography.heading, styles.eventTitle]}>AFROTECH™ Conference 2025</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Mon, Oct. 27th - 10:00 AM</Text>
            <Text style={styles.metaText}>Houston, TX</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          AfroTech Conference returns to Houston, TX, with a future-forward experience designed to fuel growth at every career stage...
          <Text style={styles.readMore}> Read More</Text>
        </Text>

        {/* Featured Sessions header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[Typography.heading, styles.sectionHeaderText]}>Featured sessions</Text>
          <View style={styles.viewAllRow}>
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#666666" />
          </View>
        </View>

        {/* Session Card */}
        <View style={styles.sessionCard}>
          <View style={styles.sessionTagsRow}>
            {['AI', 'All Access', 'Executive', 'Premier'].map((tag) => (
              <View key={tag} style={styles.sessionTagChip}><Text style={styles.sessionTagText}>{tag}</Text></View>
            ))}
          </View>
          <Text style={styles.sessionTitle}>AI & Access: How Small Businesses Can Leverage AI for Growth and Fu...</Text>
          <Text style={styles.sessionSpeaker}>Elizabeth Gore</Text>
          <Text style={styles.sessionTime}>October 30th, 2025 - 9:30 PM to 10:30 PM</Text>
        </View>

        {/* Featured Speakers */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[Typography.heading, styles.sectionHeaderText]}>Featured speakers</Text>
          <View style={styles.viewAllRow}>
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#666666" />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 8 }}>
          {[
            { name: 'Elizabeth Gore', title: 'Co-Founder & President', org: '@Hello Alice' },
            { name: 'Malik Scott', title: 'Chief Content Officer', org: '@Blavity' },
          ].map((s, idx) => (
            <View key={idx} style={styles.speakerCard}>
              <View style={styles.speakerAvatar} />
              <Text style={styles.speakerName}>{s.name}</Text>
              <Text style={styles.speakerTitle}>{s.title}</Text>
              <Text style={styles.speakerOrg}>{s.org}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.ctaBar}>
        <TouchableOpacity style={styles.ctaButton}><Text style={styles.ctaText}>GET TICKET</Text></TouchableOpacity>
      </View>
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
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#000000',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6E6E6',
    justifyContent: 'space-between',
  },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  tabText: { color: '#8A8A8A', fontSize: 16 },
  tabTextActive: { color: '#000000', fontWeight: '600' },
  tabIndicator: { marginTop: 10, height: 2, width: '100%', backgroundColor: '#000000' },
  bannerCard: { borderRadius: 16, overflow: 'hidden', height: 180, backgroundColor: '#F0F0F0', marginTop: 12 },
  bannerImage: { width: '100%', height: '100%' },
  titleCard: { backgroundColor: '#F6F6F6', borderRadius: 12, padding: 16, marginTop: 12 },
  eventTitle: { color: '#000000', fontSize: 20, marginBottom: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { color: '#4D4D4D', fontSize: 14 },
  description: { color: '#4D4D4D', fontSize: 14, marginVertical: 16, lineHeight: 20 },
  readMore: { color: '#000000', fontWeight: '600' },
  sectionHeaderRow: { marginTop: 8, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionHeaderText: { color: '#000000', fontSize: 20 },
  viewAllRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  viewAllText: { color: '#4D4D4D', fontSize: 16 },
  sessionCard: { backgroundColor: '#7D3AED', borderRadius: 16, padding: 16, overflow: 'hidden' },
  sessionTagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  sessionTagChip: { backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6 },
  sessionTagText: { color: '#000000', fontSize: 12 },
  sessionTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  sessionSpeaker: { color: '#FFFFFF' },
  sessionTime: { color: '#FFFFFF', marginTop: 12 },
  speakerCard: { width: 250, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginRight: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, borderWidth: StyleSheet.hairlineWidth, borderColor: '#EEE' },
  speakerAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EEE', alignSelf: 'center', marginBottom: 12 },
  speakerName: { color: '#000000', fontWeight: '700', fontSize: 16, textAlign: 'center' },
  speakerTitle: { color: '#6B7280', textAlign: 'center', marginTop: 6 },
  speakerOrg: { color: '#6B7280', textAlign: 'center' },
  ctaBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', padding: 16 },
  ctaButton: { backgroundColor: '#e6c79d', borderRadius: 12, alignItems: 'center', paddingVertical: 14 },
  ctaText: { color: '#0A0A0A', fontWeight: '700' },
});



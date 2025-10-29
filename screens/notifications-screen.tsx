import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NotificationsScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const { fontsLoaded } = useCustomFonts();
  const [activeTab, setActiveTab] = useState<'new'>('new');

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
        <Text style={[Typography.heading, styles.headerTitle]}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabBtn}>
          <Text style={[styles.tabText, styles.tabTextActive]}>New (8)</Text>
          <View style={styles.tabUnderline} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((n, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.cardLeftIcon}>
              <View style={styles.leftIconSquare} />
              <View style={[styles.leftIconSquare, { marginLeft: 4 }]} />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{n.title}</Text>
                <Text style={styles.cardTime}>{n.time}</Text>
              </View>
              <Text style={styles.cardSubtitle} numberOfLines={2}>{n.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const mockNotifications = [
  { title: '🎶 Blavity House Party!', time: '8 hours ago', subtitle: 'The Blavity House Party Block Party kicks off Sat with Juvenille, OT Genasis & more. 🎟️ Grab your...' },
  { title: '💡 Founders + Future of Work Meetup', time: '10 hours ago', subtitle: 'Whether you’re building a company or in HR shaping inclusive workplaces, head up to 2nd Fl...' },
  { title: 'Expand Your Network', time: '11 hours ago', subtitle: 'Join the AfroTech U Reception Presented by U.S. Army in Grand Ballroom A.' },
  { title: '🤝🏾 Social Impact Meetup', time: '11 hours ago', subtitle: 'Calling all changemakers! The Social Impact Meetup is happening now at Balcony C. Network...' },
  { title: '📝 Cert Workshops Live!', time: '13 hours ago', subtitle: 'Certification workshops are happening now in room 320. Sign up!' },
  { title: '♟️ Checkmate energy.', time: '13 hours ago', subtitle: 'Watch the AfroTech Chess Tournament in Prefunction Hall B. Open to all skill levels for stra...' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  header: {
    backgroundColor: '#190046',
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backText: { color: '#FFFFFF', fontSize: 16 },
  headerTitle: { color: '#FFFFFF', fontSize: 20 },

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6E6E6',
  },
  tabBtn: { alignItems: 'center', justifyContent: 'center', paddingVertical: 12, marginRight: 24 },
  tabText: { color: '#8A8A8A', fontSize: 18 },
  tabTextActive: { color: '#000000', fontWeight: '700' },
  tabUnderline: { marginTop: 10, height: 2, width: '100%', backgroundColor: '#000000' },

  content: { padding: 12 },
  card: { flexDirection: 'row', backgroundColor: '#F6F6F9', padding: 14, borderRadius: 16, marginBottom: 12 },
  cardLeftIcon: { width: 28, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  leftIconSquare: { width: 12, height: 12, borderRadius: 3, backgroundColor: '#20222B' },
  cardBody: { flex: 1 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  cardTitle: { color: '#0A0A0A', fontSize: 18, fontWeight: '700' },
  cardTime: { color: '#7A7A7A', fontSize: 14 },
  cardSubtitle: { color: '#6B7280', fontSize: 16, lineHeight: 22 },

  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#000000' },
});



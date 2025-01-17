import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Notif from '../component/Notif';

const Icon = ({ name, size, color }) => {
  if (Platform.OS === 'web') {
    return <Text style={{ fontSize: size, color: color }}>\u2022</Text>;
  }
  return <Ionicons name={name} size={size} color={color} />;
};

export default function Home() {
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const navigation = useNavigation();

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setDetailModalVisible(true);
  };

  const handleNewAgenda = () => {
    navigation.navigate('NewAgenda');
  };

  const handleMeetingResult = () => {
    navigation.navigate('MeetingResult');
  };

  const handleViewAgenda = () => {
    navigation.navigate('ViewAgenda');
  };

  return (
    <ScrollView style={styles.container}>
      <Notif
        isVisible={isDetailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        meeting={selectedMeeting}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          {/* Removed Bottom Sidebar Icon */}
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuCard} onPress={handleNewAgenda}>
            <View style={styles.menuContent}>
              <View style={styles.titleContainer}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.menuTitle}>New Agenda</Text>
              </View>
              <Text style={styles.menuSubtitle}>Create a new meeting agenda</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard} onPress={handleViewAgenda}>
            <View style={styles.menuContent}>
              <View style={styles.titleContainer}>
                <Ionicons name="calendar" size={24} color="white" />
                <Text style={styles.menuTitle}>View Agenda</Text>
              </View>
              <Text style={styles.menuSubtitle}>View, filter and edit meeting agenda</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard} onPress={handleMeetingResult}>
            <View style={styles.menuContent}>
              <View style={styles.titleContainer}>
                <Ionicons name="list" size={24} color="white" />
                <Text style={styles.menuTitle}>Meeting Results</Text>
              </View>
              <Text style={styles.menuSubtitle}>Record meeting outcomes</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
          <View style={styles.meetingsSection}>
            <View style={styles.meetingCard}>
              <View style={styles.meetingInfo}>
                <View style={styles.meetingHeader}>
                  <Text style={styles.meetingTitle}>Weekly Team Sync</Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() =>
                      handleViewDetails({
                        title: 'Weekly Team Sync',
                        date: '3/25/2024',
                        time: '10:00',
                        location: 'Meeting Room A',
                      })
                    }
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="calendar-outline" size={14} color="#808080" />
                  <Text style={styles.meetingDate}>3/25/2024</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="time-outline" size={14} color="#808080" />
                  <Text style={styles.meetingTime}>10:00</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="location-outline" size={14} color="#808080" />
                  <Text style={styles.meetingLocation}>Meeting Room A</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="people-outline" size={14} color="#808080" />
                  <Text style={styles.meetingParticipants}>3 Participants</Text>
                </View>
              </View>
            </View>

            <View style={styles.meetingCard}>
              <View style={styles.meetingInfo}>
                <View style={styles.meetingHeader}>
                  <Text style={styles.meetingTitle}>Project Review</Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() =>
                      handleViewDetails({
                        title: 'Project Review',
                        date: '3/26/2024',
                        time: '14:30',
                        location: 'Main And Great Room C',
                      })
                    }
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="calendar-outline" size={14} color="#808080" />
                  <Text style={styles.meetingDate}>3/26/2024</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="time-outline" size={14} color="#808080" />
                  <Text style={styles.meetingTime}>14:30</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="location-outline" size={14} color="#808080" />
                  <Text style={styles.meetingLocation}>Main And Great Room C</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="people-outline" size={14} color="#808080" />
                  <Text style={styles.meetingParticipants}>2 Participants</Text>
                </View>
              </View>
            </View>

            <View style={styles.meetingCard}>
              <View style={styles.meetingInfo}>
                <View style={styles.meetingHeader}>
                  <Text style={styles.meetingTitle}>Client Presentation</Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() =>
                      handleViewDetails({
                        title: 'Client Presentation',
                        date: '3/27/2024',
                        time: '11:00',
                        location: 'Conference Room B',
                      })
                    }
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="calendar-outline" size={14} color="#808080" />
                  <Text style={styles.meetingDate}>3/27/2024</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="time-outline" size={14} color="#808080" />
                  <Text style={styles.meetingTime}>11:00</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="location-outline" size={14} color="#808080" />
                  <Text style={styles.meetingLocation}>Conference Room B</Text>
                </View>
                <View style={styles.meetingDetails}>
                  <Ionicons name="people-outline" size={14} color="#808080" />
                  <Text style={styles.meetingParticipants}>3 Participants</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuSection: {
    alignItems: 'center',
  },
  menuCard: {
    backgroundColor: '#2C2C2E',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    maxWidth: 500,
  },
  menuContent: {
    alignItems: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 34,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  upcomingSection: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  meetingsSection: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  meetingCard: {
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
  },
  meetingInfo: {
    flex: 1,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#3A3A3C',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  meetingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  meetingDate: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 8,
  },
  meetingTime: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 8,
  },
  meetingLocation: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 8,
  },
  meetingParticipants: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 8,
  },
});

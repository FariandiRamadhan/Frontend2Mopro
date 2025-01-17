import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Notif from './Notif';
import Search from './components/Search';
import Filter from './components/Filter';

export default function SearchAgenda() {
  const navigation = useNavigation();
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const { filterMeetings } = Filter();

  // Data meeting dalam bentuk array
  const meetings = [
    {
      title: "Weekly Team Sync",
      date: "3/25/2024",
      time: "10:00",
      location: "Meeting Room A",
      participants: 3
    },
    {
      title: "Project Review",
      date: "3/26/2024",
      time: "14:30",
      location: "Main And Great Room C",
      participants: 2
    },
    {
      title: "Client Presentation",
      date: "3/27/2024",
      time: "11:00",
      location: "Conference Room B",
      participants: 3
    }
  ];

  const [filteredMeetings, setFilteredMeetings] = useState(meetings);

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setDetailModalVisible(true);
  };

  const handleSearch = (searchParams) => {
    const filtered = filterMeetings(meetings, searchParams);
    setFilteredMeetings(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meeting Agenda</Text>
      </View>

      <View style={styles.searchSection}>
        <Search onSearch={handleSearch} />
      </View>

      <ScrollView style={styles.meetingList}>
        {filteredMeetings.map((meeting, index) => (
          <View key={index} style={styles.meetingItem}>
            <Text style={styles.meetingTitle}>{meeting.title}</Text>
            <View style={styles.meetingDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color="#0066FF" />
                <Text style={styles.detailText}>{meeting.date} {meeting.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color="#0066FF" />
                <Text style={styles.detailText}>{meeting.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={16} color="#0066FF" />
                <Text style={styles.detailText}>{meeting.participants} participants</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>pending</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => handleViewDetails(meeting)}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>

      <Notif
        isVisible={isDetailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        meeting={selectedMeeting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C2C2E',
    margin: 20,
    padding: 10,
    borderRadius: 8,
  },
  filterButton: {
    padding: 5,
  },
  searchText: {
    color: '#808080',
    fontSize: 16,
  },
  searchButton: {
    padding: 5,
  },
  meetingList: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 20,
  },
  meetingItem: {
    marginBottom: 20,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  meetingDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#808080',
    fontSize: 14,
  },
  statusContainer: {
    backgroundColor: '#423F00',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: {
    color: '#FFD600',
    fontSize: 12,
  },
  viewButton: {
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#2C2C2E',
    marginTop: 20,
  },
  searchSection: {
    zIndex: 1000,
  },
}); 
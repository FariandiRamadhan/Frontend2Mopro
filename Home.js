import { StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Notif from './Notif';

// Buat komponen Icon yang aman untuk web
const Icon = ({ name, size, color }) => {
  if (Platform.OS === 'web') {
    return <Text style={{ fontSize: size, color: color }}>•</Text>;
  }
  return <Ionicons name={name} size={size} color={color} />;
};

const Sidebar = ({ isVisible, onClose }) => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.sidebarOverlay}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Hi Luca's</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.sidebarItem}
            onPress={() => handleNavigation('Home')}
          >
            <Ionicons name="home" size={20} color="#fff" />
            <Text style={styles.sidebarItemText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarItem}>
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.sidebarItemText}>New Agenda</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.sidebarItem}
            onPress={() => handleNavigation('SearchAgenda')}
          >
            <Ionicons name="search" size={20} color="#fff" />
            <Text style={styles.sidebarItemText}>Search Agenda</Text>
          </TouchableOpacity>

          <View style={styles.sidebarFooter}>
            <TouchableOpacity style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function Home() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setDetailModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Sidebar 
        isVisible={isSidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
      />
      <Notif
        isVisible={isDetailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        meeting={selectedMeeting}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Welcome Back Luca's</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuCard}>
            <View style={styles.menuContent}>
              <View style={styles.titleContainer}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.menuTitle}>New Agenda</Text>
              </View>
              <Text style={styles.menuSubtitle}>Create a new meeting agenda</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('SearchAgenda')}
          >
            <View style={styles.menuContent}>
              <View style={styles.titleContainer}>
                <Ionicons name="calendar" size={24} color="white" />
                <Text style={styles.menuTitle}>View Agenda</Text>
              </View>
              <Text style={styles.menuSubtitle}>View, filter and Edit meeting agenda</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('Result')}
          >
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
                    onPress={() => handleViewDetails({
                      title: "Weekly Team Sync",
                      date: "3/25/2024",
                      time: "10:00",
                      location: "Meeting Room A"
                    })}
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
                    onPress={() => handleViewDetails({
                      title: "Project Review",
                      date: "3/26/2024",
                      time: "14:30",
                      location: "Main And Great Room C"
                    })}
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
                    onPress={() => handleViewDetails({
                      title: "Client Presentation",
                      date: "3/27/2024",
                      time: "11:00",
                      location: "Conference Room B"
                    })}
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
    maxWidth: 800, // Maksimum lebar konten
    width: '100%',
    alignSelf: 'center', // Pusatkan konten
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center', // Pusatkan header
  },
  menuButton: {
    position: 'absolute',
    left: 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center', // Pusatkan teks
  },
  menuSection: {
    alignItems: 'center', // Pusatkan menu cards
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
    alignItems: 'flex-start', // Ubah ke flex-start agar konten rata kiri
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
    marginLeft: 34, // Sejajarkan dengan title setelah icon
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center', // Pusatkan teks
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
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: 280,
    height: '100%',
    backgroundColor: '#1C1C1E',
    padding: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 5,
  },
  sidebarItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 15,
  },
  sidebarFooter: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 15,
  },
}); 
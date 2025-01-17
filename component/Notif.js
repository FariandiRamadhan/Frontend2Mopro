import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Delete from './Delete';
import { useState } from 'react';

export default function Notif({ isVisible, onClose, meeting }) {
  const navigation = useNavigation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  const handleEditAgenda = () => {
    navigation.navigate('EditAgenda');
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Ionicons name="document-text-outline" size={24} color="white" />
                <Text style={styles.modalTitle}>Meeting Details</Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMeetingTitle}>{meeting?.title}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Pending</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                Weekly sync to discuss project progress and upcoming milestones.
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#808080" />
              <Text style={styles.detailText}>{meeting?.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={20} color="#808080" />
              <Text style={styles.detailText}>{meeting?.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color="#808080" />
              <Text style={styles.detailText}>{meeting?.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={20} color="#808080" />
              <Text style={styles.detailText}>Organized by Andi Tri Haryono</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Participants</Text>
              <View style={styles.participantsList}>
                <View style={styles.participantBadge}>
                  <Text style={styles.participantText}>Ahmad Fauzi</Text>
                </View>
                <View style={styles.participantBadge}>
                  <Text style={styles.participantText}>Andi Tri Haryono</Text>
                </View>
                <View style={styles.participantBadge}>
                  <Text style={styles.participantText}>Fariandi Ramadhan</Text>
                </View>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={handleEditAgenda}
              >
                <Text style={styles.editButtonText}>Edit Agenda</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => setShowDeleteConfirm(true)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Delete 
        isVisible={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalMeetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: '#423F00',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  statusText: {
    color: '#FFD600',
    fontSize: 14,
  },
  modalSection: {
    marginVertical: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#808080',
    fontSize: 14,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 10,
  },
  detailText: {
    color: '#808080',
    fontSize: 14,
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantBadge: {
    backgroundColor: '#2C2C2E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  participantText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FFB800',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
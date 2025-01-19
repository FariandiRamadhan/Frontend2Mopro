import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Notif from "../component/Notif";

export default function MeetingCards(){
    const [isDetailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const handleViewDetails = (meeting) => {
        setSelectedMeeting(meeting);
        setDetailModalVisible(true);
    };
    return (
    <View style={styles.meetingCard}>
        {/* POP UP Notifikasi */}
        <Notif
            isVisible={isDetailModalVisible}
            onClose={() => setDetailModalVisible(false)}
            meeting={selectedMeeting}
        />

        {/* Informasi Meeting */}
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
)}
const styles = StyleSheet.create({
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
    }
})
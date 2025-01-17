import { useState } from 'react';

export default function Filter() {
  const filterMeetings = (meetings, searchParams) => {
    if (!meetings) return [];
    
    return meetings.filter(meeting => {
      if (searchParams.startDate && searchParams.endDate) {
        const meetingDate = new Date(meeting.date);
        const startDate = new Date(searchParams.startDate);
        const endDate = new Date(searchParams.endDate);
        return meetingDate >= startDate && meetingDate <= endDate;
      }
      
      if (searchParams.title) {
        return meeting.title.toLowerCase().includes(searchParams.title.toLowerCase());
      }

      return true;
    });
  };

  return { filterMeetings };
} 
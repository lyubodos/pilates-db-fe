export interface ReservationSlot {
  id: number;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: string;
  remainingSlots: string;
  capacity: number;
  trainingType: string;
  bookedByMe: boolean;
}

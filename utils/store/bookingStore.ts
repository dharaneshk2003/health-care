// utils/store/bookingStore.ts
import { create } from "zustand"

interface BookingState {
  doctorId: string | null
  date: Date | null
  timeSlot: string
  referralId: string
  notes: string
  appointmentType: string

  setDoctorId: (id: string) => void
  setDate: (date: Date) => void
  setTimeSlot: (slot: string) => void
  setReferralId: (id: string) => void
  setNotes: (note: string) => void
  setAppointmentType: (type: string) => void

  getFormattedData: () => Record<string, any>
}

const useBookingStore = create<BookingState>((set, get) => ({
  doctorId: null,
  date: null,
  timeSlot: "",
  referralId: "",
  notes: "",
  appointmentType: "new",

  setDoctorId: (id) => set({ doctorId: id }),
  setDate: (date) => set({ date }),
  setTimeSlot: (slot) => set({ timeSlot: slot }),
  setReferralId: (id) => set({ referralId: id }),
  setNotes: (note) => set({ notes: note }),
  setAppointmentType: (type) => set({ appointmentType: type }),

  getFormattedData: () => {
    const state = get()
    return {
      doctorId: state.doctorId,
      date: state.date,
      timeSlot: state.timeSlot,
      referralId: state.referralId,
      notes: state.notes,
      appointmentType: state.appointmentType,
    }
  },
}))

export default useBookingStore

import { defineStore } from 'pinia';

export const useAbsenceStore = defineStore('absence', {
    state: () => ({
        photo: null,
        attendanceData: null,
    }),
    actions: {
        setPhoto(photo) {
            this.photo = photo;
        },
        setAttendance(data) {
            this.attendanceData = data;
        },
    },
});

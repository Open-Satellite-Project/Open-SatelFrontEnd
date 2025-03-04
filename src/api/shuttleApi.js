import axios from "axios";
import api from './index';
import { Header } from "antd/es/layout/layout";

const BASE_URL = "http://localhost:8080/ROOT/api";

export const shuttleApi = {

    // 시간표 조회
    getTimeTable: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/timetable`);
            return response.data;
        } catch (error) {
            console.error('시간표 조회 실패:', error);
            throw error;
        }
    },

    // 시간표 추가 (Administrator)
    addTimetable: async (timeslot) => {
        try {
            const response = await axios.post(`${BASE_URL}/timetable`, timeslot);
            return response.data;
        } catch (error) {
            console.error('시간표 추가 실패:', error);
            throw error;
        }
    },

    // 시간표 수정 (Administrator)
    updateTimetable: async (slotid, timeslot) => {
        try {
            console.log("API PUT 요청:", `${BASE_URL}/timetable/${slotid}`, timeslot);

            const response = await axios.put(`${BASE_URL}/timetable/${slotid}`, timeslot, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("API 응답:", response.data);
            return response.data;

        } catch (error) {
            console.error("API 시간표 수정 실패:", error);
            throw error;
        }
    },

    // 시간표 삭제 (Administrator)
    deleteTimetable: async (slotid) => {
        try {

            console.log("API DELETE 요청:", `${BASE_URL}/timetable/${slotid}`);
            
            const response = await axios.delete(`${BASE_URL}/timetable/${slotid}`, {
                headers: {
                    "Content-Type": "application/json"  
                }
            });
            console.log("API 응답:",response.data);
            return response.data;
            
        } catch (error) {
            console.error('시간표 삭제 실패', error);
            throw error;
        }
    }
};
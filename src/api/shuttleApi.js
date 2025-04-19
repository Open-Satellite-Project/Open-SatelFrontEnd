import axios from "axios";
import api from './index';

const BASE_URL = "http://localhost:8080/ROOT/api";

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
    }
    return { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

export const shuttleApi = {
    // 시간표 조회
    getTimeTable: async () => {
        try {
            const headers = getAuthHeader();
            const response = await axios.get(`${BASE_URL}/admin/timetable`, { headers });
            return response.data;
        } catch (error) {
            console.error('시간표 조회 실패:', error);
            throw error;
        }
    },

    // 시간표 추가
    addTimetable: async (timeslot) => {
        try {
            const headers = getAuthHeader();
            const response = await axios.post(`${BASE_URL}/admin/timetable`, timeslot, { headers });
            return response.data;
        } catch (error) {
            console.error('시간표 추가 실패:', error);
            throw error;
        }
    },

    // 시간표 수정
    updateTimetable: async (slotid, timeslot) => {
        try {
            const headers = getAuthHeader();
            const response = await axios.put(`${BASE_URL}/admin/timetable/${slotid}`, timeslot, { headers });
            return response.data;
        } catch (error) {
            console.error('시간표 수정 실패:', error);
            throw error;
        }
    },

    // 시간표 삭제
    deleteTimetable: async (slotid) => {
        try {
            const headers = getAuthHeader();
            const response = await axios.delete(`${BASE_URL}/admin/timetable/${slotid}`, { headers });
            return response.data;
        } catch (error) {
            console.error('시간표 삭제 실패:', error);
            throw error;
        }
    }
};

console.log(localStorage.getItem('token'));
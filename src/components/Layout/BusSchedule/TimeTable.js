import { useEffect, useState } from "react"
import { shuttleApi } from "../../api/shuttleApi";
import '../../styles/components/TimeTable.css';

const TimeTable = () => {

    const [timetableData, setTimetableData] = useState([]);

    useEffect(() => {
        // Data Load 
        const fetchTimetable  = async () => {
            try {
                const response = await shuttleApi.getTimeTable();
                setTimetableData(response.data);
            } catch (error) {
                console.error('시간표 로딩 실패', error);
            }
        };
        fetchTimetable();
    }, []);

    return (
        <div className="timetable-container">
            <div className="timetable-header">
                <h2>순환버스 시간표</h2>
            </div>
            <div className="timetable-content">
                <div className="route-info">
                    <div className="route-container left">
                        <div className="route-from">병원</div>
                        <div className="route-arrow">→</div>
                        <div className="route-to">xxxxx캠퍼스</div>
                    </div>
                    <div className="time-label">시간</div>
                    <div className="route-container right">
                        <div className="route-from">xxxxx캠퍼스</div>
                        <div className="route-arrow">→</div>
                        <div className="route-to">병원</div>
                    </div>
                </div>

                <div className="schedule-grid">
                    {timetableData.map((slot, index) => (
                        <div className="time-row" key={index}>
                            <div className="to-station">
                                {slot.toStationMinutes}
                            </div>
                            <div className="hour">
                                {slot.hour}
                            </div>
                            <div className="to-hospital">
                                {slot.toHospitalMinutes}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimeTable;
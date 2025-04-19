import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { shuttleApi } from "../api/shuttleApi";
import "../styles/components/TimeTable.css";
import { PlusCircle, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";

const BusSchedulePage = () => {
    const [departureTimes, setDepartureTimes] = useState([]);
    const [arrivalTimes, setArrivalTimes] = useState([]);
    const [editingSlot, setEditingSlot] = useState(null);
    const [newDepartureHour, setNewDepartureHour] = useState("08");
    const [newDepartureMinute, setNewDepartureMinute] = useState("00");
    const [newArrivalHour, setNewArrivalHour] = useState("08");
    const [newArrivalMinute, setNewArrivalMinute] = useState("00");
    const [editedHour, setEditedHour] = useState("08");
    const [editedMinute, setEditedMinute] = useState("00");

    // API에서의 시간표 
    useEffect(() => {
        fetchTimeTable();
    }, []);

    const fetchTimeTable = async () => {
        try {
            const data = await shuttleApi.getTimeTable();
            console.log('받아온 데이터:', data);
            
            if (data && data.timeSlots) {
                const departureTimes = data.timeSlots.filter(time => time.type === "departure");
                const arrivalTimes = data.timeSlots.filter(time => time.type === "arrival");
                setDepartureTimes(departureTimes);
                setArrivalTimes(arrivalTimes);
            } else {
                console.error('예상치 못한 데이터 구조:', data);
                setDepartureTimes([]);
                setArrivalTimes([]);
            }
        } catch (error) {
            console.error('시간표 로딩 실패', error);
            setDepartureTimes([]);
            setArrivalTimes([]);
        }
    };

    const addDepartureTime = async () => {
        const newTime = {
            hourrange: `${newDepartureHour}:${newDepartureMinute}`,
            type: "departure"
        };

        try {
            console.log('병원 출발 추가 요청:', newTime.hourrange);
            const response = await shuttleApi.addTimetable(newTime);
            // 백엔드에서 받은 실제 slotid를 사용
            setDepartureTimes(prev => [...prev, response.data]);
        } catch (error) {
            console.error('시간표 추가 실패', error);
        }
    };

    const addArrivalTime = async () => {
        const newTime = {
            hourrange: `${newArrivalHour}:${newArrivalMinute}`,
            type: "arrival"
        };

        try {
            console.log('캠퍼스 출발 추가 요청:', newTime.hourrange);
            const response = await shuttleApi.addTimetable(newTime);
            // 백엔드에서 받은 실제 slotid를 사용
            setArrivalTimes(prev => [...prev, response.data]);
        } catch (error) {
            console.error('시간표 추가 실패', error);
        }
    };

    const startEditing = (time) => {
        setEditingSlot(time.slotid);
        if (time.hourrange) {
            const [hour, minute] = time.hourrange.split(':');
            setEditedHour(hour);
            setEditedMinute(minute);
        } else {
            // hourrange가 없는 경우 기본값 설정
            setEditedHour("08");
            setEditedMinute("00");
        }
    };

    const cancelEditing = () => {
        setEditingSlot(null);
    };

    const updateTime = async (slotid, type) => {
        if (!window.confirm('시간을 수정하시겠습니까?')) {
            return;
        }

        const updatedTime = {
            hourrange: `${editedHour}:${editedMinute}`,
            type: type
        };

        try {
            await shuttleApi.updateTimetable(slotid, updatedTime);
            // API 호출 후 바로 화면 업데이트
            if (type === "departure") {
                setDepartureTimes(prev => 
                    prev.map(time => 
                        time.slotid === slotid ? { ...time, ...updatedTime } : time
                    )
                );
            } else {
                setArrivalTimes(prev => 
                    prev.map(time => 
                        time.slotid === slotid ? { ...time, ...updatedTime } : time
                    )
                );
            }
            setEditingSlot(null);
        } catch (error) {
            console.error('시간표 수정 실패:', error);
        }
    };

    const handleDelete = async (slotid, type) => {
        if (!window.confirm('시간을 삭제하시겠습니까?')) {
            return;
        }

        try {
            await shuttleApi.deleteTimetable(slotid);
            // API 호출 후 바로 화면에서 제거
            if (type === "departure") {
                setDepartureTimes(prev => prev.filter(time => time.slotid !== slotid));
            } else {
                setArrivalTimes(prev => prev.filter(time => time.slotid !== slotid));
            }
        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="timetable-header">
                <h2>순환버스 시간표</h2>
            </div>

            <div className="timetable-grid">
                {/* 병원 출발 테이블 */}
                <Card className="timetable-card">
                    <CardContent>
                        <h3>병원 출발 → 캠퍼스 도착</h3>

                        <div className="add-time">
                            <select
                                value={newDepartureHour}
                                onChange={(e) => setNewDepartureHour(e.target.value)}
                            >
                                {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={i.toString().padStart(2, "0")}>
                                        {i.toString().padStart(2, "0")}시
                                    </option>
                                ))}
                            </select>
                            <select
                                value={newDepartureMinute}
                                onChange={(e) => setNewDepartureMinute(e.target.value)}
                            >
                                {Array.from({ length: 60 }, (_, i) => (
                                    <option key={i} value={i.toString().padStart(2, "0")}>
                                        {i.toString().padStart(2, "0")}분
                                    </option>
                                ))}
                            </select>
                            <button className="add-button" onClick={addDepartureTime}>
                                <PlusCircle /> 추가
                            </button>
                        </div>

                        {departureTimes.map((time) => (
                            <div className="time-row" key={`departure-${time.slotid}`}>
                                {editingSlot === time.slotid ? (
                                    <>
                                        <select
                                            value={editedHour}
                                            onChange={(e) => setEditedHour(e.target.value)}
                                        >
                                            {Array.from({ length: 24 }, (_, i) => (
                                                <option key={`departure-hour-${i}`} value={i.toString().padStart(2, "0")}>
                                                    {i.toString().padStart(2, "0")}시
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={editedMinute}
                                            onChange={(e) => setEditedMinute(e.target.value)}
                                        >
                                            {Array.from({ length: 60 }, (_, i) => (
                                                <option key={`departure-minute-${i}`} value={i.toString().padStart(2, "0")}>
                                                    {i.toString().padStart(2, "0")}분
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={() => updateTime(time.slotid, "departure")}>
                                            <CheckCircle />
                                        </button>
                                        <button onClick={cancelEditing}>
                                            <XCircle />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span>{time.hourrange}</span>
                                        <button onClick={() => startEditing(time)}>
                                            <Edit />
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(time.slotid, "departure")}
                                        >
                                            <Trash2 />
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* 캠퍼스 출발 테이블 */}
                <Card className="timetable-card">
                    <CardContent>
                        <h3>캠퍼스 출발 → 병원 도착</h3>

                        <div className="add-time">
                            <select
                                value={newArrivalHour}
                                onChange={(e) => setNewArrivalHour(e.target.value)}
                            >
                                {Array.from({ length: 24 }, (_, i) => (
                                    <option key={`arrival-hour-${i}`} value={i.toString().padStart(2, "0")}>
                                        {i.toString().padStart(2, "0")}시
                                    </option>
                                ))}
                            </select>
                            <select
                                value={newArrivalMinute}
                                onChange={(e) => setNewArrivalMinute(e.target.value)}
                            >
                                {Array.from({ length: 60 }, (_, i) => (
                                    <option key={`arrival-minute-${i}`} value={i.toString().padStart(2, "0")}>
                                        {i.toString().padStart(2, "0")}분
                                    </option>
                                ))}
                            </select>
                            <button className="add-button" onClick={addArrivalTime}>
                                <PlusCircle /> 추가
                            </button>
                        </div>

                        {arrivalTimes.map((time) => (
                            <div className="time-row" key={`arrival-${time.slotid}`}>
                                {editingSlot === time.slotid ? (
                                    <>
                                        <select
                                            value={editedHour}
                                            onChange={(e) => setEditedHour(e.target.value)}
                                        >
                                            {Array.from({ length: 24 }, (_, i) => (
                                                <option key={`arrival-edit-hour-${i}`} value={i.toString().padStart(2, "0")}>
                                                    {i.toString().padStart(2, "0")}시
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={editedMinute}
                                            onChange={(e) => setEditedMinute(e.target.value)}
                                        >
                                            {Array.from({ length: 60 }, (_, i) => (
                                                <option key={`arrival-edit-minute-${i}`} value={i.toString().padStart(2, "0")}>
                                                    {i.toString().padStart(2, "0")}분
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={() => updateTime(time.slotid, "arrival")}>
                                            <CheckCircle />
                                        </button>
                                        <button onClick={cancelEditing}>
                                            <XCircle />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span>{time.hourrange}</span>
                                        <button onClick={() => startEditing(time)}>
                                            <Edit />
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(time.slotid, "arrival")}
                                        >
                                            <Trash2 />
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BusSchedulePage;
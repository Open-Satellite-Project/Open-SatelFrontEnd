import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { shuttleApi } from "../api/shuttleApi";
import "../styles/components/TimeTable.css";
import { PlusCircle, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";

export default function BusScheduleDashboard() {
      // 병원 출발 시간 목록
      const [departureTimes, setDepartureTimes] = useState([]);
      // 캠퍼스 출발 시간 목록
      const [arrivalTimes, setArrivalTimes] = useState([]);
      // 병원 출발 
      const [newDepartureHour, setNewDepartureHour] = useState("08");
      const [newDepartureMinute, setNewDepartureMinute] = useState("00");
      // 캠퍼스 출발 
      const [newArrivalHour, setNewArrivalHour] = useState("08");
      const [newArrivalMinute, setNewArrivalMinute] = useState("00");

      const [editingSlot, setEditingSlot] = useState(null);
      const [editedHour, setEditedHour] = useState("08");
      const [editedMinute, setEditedMinute] = useState("00");

      // API에서의 시간표 
      const fetchTimetable = async () => {
            try {
                  const response = await shuttleApi.getTimeTable();
                  console.log("API Response:", response);

                  if (response && response.timeSlots) {
                        const departures = response.timeSlots.filter(
                              (slot) => slot.type === "departure"
                        );
                        const arrivals = response.timeSlots.filter(
                              (slot) => slot.type === "arrival"
                        );

                        setDepartureTimes(departures);
                        setArrivalTimes(arrivals);
                  } else {
                        console.error("시간표 데이터가 올바르지 않습니다.", response);
                  }
            } catch (error) {
                  console.error("시간표 로딩 실패", error);
            }
      };

      useEffect(() => {
            fetchTimetable();
      }, []);

      // 병원 출발 시간 추가
      const addDepartureTime = async () => {
            try {
                  const formattedTime = `${newDepartureHour}:${newDepartureMinute}`;
                  console.log("병원 출발 추가 요청:", formattedTime);

                  const response = await shuttleApi.addTimetable({
                        hourrange: formattedTime,
                        isactive: true,
                        type: "departure"
                  });
                  const { data } = response;
                  console.log("추가 완료:", data);
                  // 서버가 slotid를 포함해 반환하도록 되어 있다고 가정
                  setDepartureTimes((prev) => [
                        ...prev,
                        { slotid: data.slotid, hourrange: data.hourrange, type: data.type }
                  ]);
            } catch (error) {
                  console.error("시간표 추가 실패", error);
            }
      };

      // 캠퍼스 출발 시간 추가
      const addArrivalTime = async () => {
            try {
                  const formattedTime = `${newArrivalHour}:${newArrivalMinute}`;
                  console.log("캠퍼스 출발 추가 요청:", formattedTime);

                  const response = await shuttleApi.addTimetable({
                        hourrange: formattedTime,
                        isactive: true,
                        type: "arrival"
                  });
                  const { data } = response;
                  console.log("추가 완료:", data);
                  setArrivalTimes((prev) => [
                        ...prev,
                        { slotid: data.slotid, hourrange: data.hourrange, type: data.type }
                  ]);
            } catch (error) {
                  console.error("시간표 추가 실패", error);
            }
      };

      // 삭제 기능
      const handleDelete = async (slotid, type) => {
            // eslint-disable-next-line no-restricted-globals
            if (!window.confirm("삭제하시겠습니까?")) {
                  return;
            }

            try {
                  await shuttleApi.deleteTimetable(slotid);
                  console.log("삭제 완료:", slotid);

                  if (type === "departure") {
                        setDepartureTimes((prev) =>
                              prev.filter((time) => time.slotid !== slotid)
                        );
                  } else {
                        setArrivalTimes((prev) =>
                              prev.filter((time) => time.slotid !== slotid)
                        );
                  }
            } catch (error) {
                  console.error("삭제 실패:", error);
            }
      };

      // 편집 모드 시작: 해당 항목의 slotid와 현재 시간(분리된 시,분)을 state에 저장
      const startEditing = (slot) => {
            setEditingSlot(slot.slotid);
            const [hour, minute] = slot.hourrange.split(":");
            setEditedHour(hour);
            setEditedMinute(minute);
      };

      const cancelEditing = () => {
            setEditingSlot(null);
      };

      // 업데이트(수정) 기능: 편집 중인 항목의 slotid와 수정된 시간을 서버에 PUT 요청
      const updateTime = async (slotid, type) => {
            try {
                  const formattedTime = `${editedHour}:${editedMinute}`;
                  const response = await shuttleApi.updateTimetable(slotid, {
                        hourrange: formattedTime,
                        isactive: true,
                        // 필요한 경우 type도 포함 (서버에서 업데이트 로직에 추가되어야 함)
                        type: type
                  });
                  console.log("수정 완료:", response);
                  if (type === "departure") {
                        setDepartureTimes((prev) =>
                              prev.map((time) =>
                                    time.slotid === slotid ? { ...time, hourrange: formattedTime } : time
                              )
                        );
                  } else {
                        setArrivalTimes((prev) =>
                              prev.map((time) =>
                                    time.slotid === slotid ? { ...time, hourrange: formattedTime } : time
                              )
                        );
                  }
                  setEditingSlot(null);
            } catch (error) {
                  console.error("수정 실패:", error);
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
                                          <div className="time-row" key={time.slotid}>
                                                {editingSlot === time.slotid ? (
                                                      <>
                                                            <select
                                                                  value={editedHour}
                                                                  onChange={(e) => setEditedHour(e.target.value)}
                                                            >
                                                                  {Array.from({ length: 24 }, (_, i) => (
                                                                        <option key={i} value={i.toString().padStart(2, "0")}>
                                                                              {i.toString().padStart(2, "0")}시
                                                                        </option>
                                                                  ))}
                                                            </select>
                                                            <select
                                                                  value={editedMinute}
                                                                  onChange={(e) => setEditedMinute(e.target.value)}
                                                            >
                                                                  {Array.from({ length: 60 }, (_, i) => (
                                                                        <option key={i} value={i.toString().padStart(2, "0")}>
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
                                                      <option key={i} value={i.toString().padStart(2, "0")}>
                                                            {i.toString().padStart(2, "0")}시
                                                      </option>
                                                ))}
                                          </select>
                                          <select
                                                value={newArrivalMinute}
                                                onChange={(e) => setNewArrivalMinute(e.target.value)}
                                          >
                                                {Array.from({ length: 60 }, (_, i) => (
                                                      <option key={i} value={i.toString().padStart(2, "0")}>
                                                            {i.toString().padStart(2, "0")}분
                                                      </option>
                                                ))}
                                          </select>
                                          <button className="add-button" onClick={addArrivalTime}>
                                                <PlusCircle /> 추가
                                          </button>
                                    </div>

                                    {arrivalTimes.map((time) => (
                                          <div className="time-row" key={time.slotid}>
                                                {editingSlot === time.slotid ? (
                                                      <>
                                                            <select
                                                                  value={editedHour}
                                                                  onChange={(e) => setEditedHour(e.target.value)}
                                                            >
                                                                  {Array.from({ length: 24 }, (_, i) => (
                                                                        <option key={i} value={i.toString().padStart(2, "0")}>
                                                                              {i.toString().padStart(2, "0")}시
                                                                        </option>
                                                                  ))}
                                                            </select>
                                                            <select
                                                                  value={editedMinute}
                                                                  onChange={(e) => setEditedMinute(e.target.value)}
                                                            >
                                                                  {Array.from({ length: 60 }, (_, i) => (
                                                                        <option key={i} value={i.toString().padStart(2, "0")}>
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
}
import React from "react";

export default function TimePicker({ startHour, setStartHour, startMinute, setStartMinute, endHour, setEndHour, endMinute, setEndMinute, onAdd }) {
    return (
        <div className="time-range-selector">
            <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                        {hour.toString().padStart(2, '0')}시
                    </option>
                ))}
            </select>
            :
            <select value={startMinute} onChange={(e) => setStartMinute(e.target.value)}>
                {[...Array(60).keys()].map((minute) => (
                    <option key={minute} value={minute.toString().padStart(2, '0')}>
                        {minute.toString().padStart(2, '0')}분
                    </option>
                ))}
            </select>
            ~
            <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                        {hour.toString().padStart(2, '0')}시
                    </option>
                ))}
            </select>
            :
            <select value={endMinute} onChange={(e) => setEndMinute(e.target.value)}>
                {[...Array(60).keys()].map((minute) => (
                    <option key={minute} value={minute.toString().padStart(2, '0')}>
                        {minute.toString().padStart(2, '0')}분
                    </option>
                ))}
            </select>

            <button onClick={onAdd} className="add-button">
                추가
            </button>
        </div>
    );
}

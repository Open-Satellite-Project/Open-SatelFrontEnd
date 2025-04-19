import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../styles/components/ApprovalLog.css";

const ApprovalLog = () => {

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8080/ROOT/api/admin/approval-log', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("서버 응답",res.data);
            setLogs(res.data);
        };
        fetchData();
    }, []);

    return (
        <div className="approval-log-container">
            <h1>승인 이력</h1>
            <table>
                <thead>
                    <tr>
                        <th>사원 이름</th>
                        <th>직원 번호</th>
                        <th>승인일</th>
                        <th>승인자</th>
                        <th>승인자 코드</th>
                        <th>승인코드</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.employeeNumber}</td>
                            <td>
                                {user.approvedAt
                                    ? new Date(user.approvedAt).toLocaleString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })
                                    : '정보 없음'}</td>
                            <td>{user.approvedByName || '미확인'}</td>
                            <td>{user.approvedBy}</td>
                            <td>{user.approvedCode}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovalLog;
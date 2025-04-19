import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/components/RegisterManager.css';

const RegisterManagement = () => {

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    


    //회원 목록 조회
    const fetchMembers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError(' 인증 토큰이 없습니다 ');
                setLoading(false);
                return;
            }
            // CUSTOMER 역할만 조회
            const response = await axios.get('http://localhost:8080/ROOT/api/admin/members?role=CUSTOMER', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('회원 목록 응답 원본:', response.data);

            // 필요한 경우 데이터 구조 매핑
            const formattedMembers = response.data.map(member => {
                // 날짜 포맷팅 함수
                const formatDateTime = (dateValue) => {
                    if (!dateValue) return '정보 없음';

                    try {
                        return new Date(dateValue).toLocaleString('ko-KR', {
                            timeZone: 'Asia/Seoul',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false // 24시간 형식 사용
                        });
                    } catch (e) {
                        console.error('날짜 변환 오류:', e);
                        return '정보 없음';
                    }
                };

                // 날짜 표시 계산
                let dateDisplay;
                if (member.createdAt) {
                    dateDisplay = formatDateTime(member.createdAt);
                } else if (member.joinDate) {
                    dateDisplay = formatDateTime(member.joinDate);
                } else {
                    dateDisplay = '정보 없음';
                }

                // 회원 객체 반환
                return {
                    id: member.id || member.userId || member.adminId,
                    email: member.email || member.adminEmail,
                    name: member.name,
                    password: member.password,
                    employeeNumber: member.employeeNumber,
                    joinDate: dateDisplay,
                    authority: member.authority || member.role,
                    approved: member.approved
                };
            });

            setMembers(formattedMembers);
            setError(null);
            setLoading(false);
        } catch (error) {
            console.error('회원 목록 조회 실패', error);
            setError('회원 목록을 불러오는데 실패했습니다.');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    // 회원 승인 거절
    const handleDelete = async (memberId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/ROOT/api/admin/members/${memberId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                fetchMembers();
            } catch (error) {
                console.error('회원 삭제 실패', error);
                alert('회원 삭제에 실패했습니다.');
            }
        }
    }

    // 회원 승인
    const handleApprove = async (memberId) => {
        if (!window.confirm('해당 회원을 승인하시겠습니까.')) {
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/ROOT/api/admin/members/${memberId}/approve`,
                { approved: true },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            //승인 후 목록 업데이트
            setMembers(prev => prev.map(member => member.id === memberId ? { ...member, approved: true, authority: 'EMP' } : member));

            fetchMembers();
            alert('회원 승인 처리가 완료되었습니다.');
        } catch (error) {
            console.error('회원 승인 실패', error);
            alert('회원 승인에 실패했습니다.');
        }
    }

    if (loading)
        return <div>Loading...</div>;

    if (error)
        return <div>error</div>

    return (
        <div className='register-management-container'>
            <div className='register-management-header'>
                <h2>회원가입 관리</h2>
            </div>
            <table className='register-management-table'>
                <thead className='register-management-thead'>
                    <tr>
                        <th>이메일</th>
                        <th>이름</th>
                        <th>직원번호</th>
                        <th>가입 요청일</th>
                        <th>권한</th>
                        <th>상태</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length > 0 ? members.map((member, index) => {
                        console.log(`회원 ${index} 정보:`, member);
                        // ID 값을 명확히 확인 (어떤 필드명인지 체크)
                        const memberId = member.id;
                        console.log(`회원 ${index} ID:`, memberId);

                        return (
                            <tr className='register-management-tr' key={memberId || `member-${index}`}>
                                <td>{member.email}</td>
                                <td>{member.name}</td>
                                <td>{member.employeeNumber}</td>
                                <td>{member.joinDate}</td>
                                <td>{member.authority}</td>
                                <td>
                                    {member.isApproved ? '승인됨' : '대기 중'}
                                </td>
                                <td>
                                    {memberId && !member.isApproved && (
                                        <button onClick={() => handleApprove(memberId)}>승인</button>
                                    )}
                                    {memberId && (
                                        <button onClick={() => handleDelete(memberId)}>거절</button>
                                    )}
                                </td>
                            </tr>
                        );
                    }) : (
                        <tr>
                            <td colSpan="7">회원 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}
export default RegisterManagement;  
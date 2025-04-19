import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RootUserControl = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8080/ROOT/api/admin/members', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(res.data);
        } catch (error) {
            console.error('회원목록 조회 실패', error)
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        const confirm = window.confirm(`이 유저의 권한을 ${newRole}으로 변경하시겠습니까?`);
        if (!confirm) return;
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/ROOT/api/admin/users/${userId}/role`,
                { role: newRole },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert("권한 변경 완료");
            fetchAllUsers();
        } catch (error) {
            console.error("권한 변경 실패", error);
        }
    }

    const RoleSelector = ({ currentRole, userId, onChange }) => {

        const handleChange = (e) => {
            const selectedRole = e.target.value;
            onChange(userId, selectedRole);
        };

        return (
            <select value={currentRole} onChange={handleChange}>
                <option value="EMP">EMP</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            </select>
        );
    };

    const handleDeactivate = async (userId) => {
        if (!window.confirm("해당 계정을 비활성화 하시겠습니까?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/ROOT/api/admin/users/${userId}/deactivate`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("계정 비활성화 완료")
        } catch (error) {
            console.log("비활성화 실패:", error);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("탈퇴 처리 하시겠습니까?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/ROOT/api/admin/users/${userId}/delete`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("계정 비활성화 완료")
        } catch (error) {
            console.log("탈퇴 처리 실패", error);
        }
    };



    return (
        <div>
            <h1>회원관리</h1>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>직원번호</th>
                        <th>권한</th>
                        <th>상태</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user.userId}>{users.name}
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.employeeNumber || '-'}</td>
                            <td>
                                <RoleSelector
                                    currentRole={user.role}
                                    userId={user.userId}
                                    onChange={handleRoleChange}
                                />
                                
                            </td>

                            <td>{user.isActive ? '활성화' : '비활성화'}</td>
                            <td>
                               
                                <button onClick={() => handleDeactivate(user.userId)}>비활성화</button>
                                <button onClick={() => handleDelete(user.userId)}>탈퇴처리</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RootUserControl;


// ROOT_ADMIN이 최고 관리자
// ROOT_ADMIN이 SUPER_ADMIN, EMP 등 직급 수정 가능
// 직원이 휴가, 복직 및 퇴사한 경우 is_active 로 로그인 상태 제어
// 3~5년 이상 비활성 상태 유지 시 스케줄러 통해 자동 삭제

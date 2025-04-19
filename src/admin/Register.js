import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

    // String email = (String) registerData.get("adminEmail");
    // String password = (String) registerData.get("adminPassword");
    // String name = (String) registerData.get("name");
    // String role = (String) registerData.get("role");

    const navigate = useNavigate();
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/ROOT/api/admin/register',
                {
                    adminEmail: adminEmail,
                    adminPassword: adminPassword,
                    name: name,
                    employeeNumber
                },
                {
                    withCredentials: true
                }
            );
            console.log('Registration success', response.data);
            navigate('/admin/login');
        } catch (error) {
            console.log('Registration error', error);
            setError('회원가입 중 오류 발생')
        }
    };

    return (
        <div>
            <h2>관리자・직원 계정등록</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>이메일</label>
                    <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>이름</label>
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>직원번호</label>
                    <input
                        type="employeeNumber"
                        value={employeeNumber}
                        onChange={(e) => setEmployeeNumber(e.target.value)}
                    />
                </div>

                <button type="submit">회원가입</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Register;
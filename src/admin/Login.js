import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/actions';
import "../styles/components/Login.css";


const Login = ({ setAuth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/ROOT/api/admin/login', {
                adminEmail: email,
                adminPassword: password
            });

            if (res.data.status === 'success') {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('role', res.data.user.role);
                console.log('로컬스토리지에 저장된 role:', localStorage.getItem('role'));
                console.log('로그인 성공,저장된 토큰:', localStorage.getItem('token'));
                console.log('로그인 성공,저장된 사용자:', localStorage.getItem('user'));

                dispatch(loginSuccess(res.data.user));
                setAuth(true);
                setError('');
                navigate('/admin/dashboard');
            } else {
                setError(res.data.message);
            }
        } catch (error) {
            console.error(error)
            setError('로그인 오류 발생')
        }
    };

    return (
        <div className='login-container'>
            <h2 className='login-tittle'>직원 여러분 환영합니다</h2>
            <form className='login-form' onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">로그인</button>
                <button type="button" onClick={() => navigate('/admin/register')} >회원가입</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
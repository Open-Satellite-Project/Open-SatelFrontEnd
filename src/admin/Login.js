import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions';

function AdminLogin({ setAuth }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/admin/login', {
                adminEmail: email, 
                password: password
            });

            if (res.data.status === 'success') {
                dispatch(loginSuccess(res.data.user));
                setAuth(true);
                setError('');
            } else {
                setError('로그인 실패');
            }
        } catch (error) {
            console.error(error)
            setError('로그인 오류 발생')
        }
    };

    return (
        <div>
            <h2>관리자・직원 로그인</h2>
            <form onSubmit={handleLogin}>
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
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}



const Login = () => {
    return (
        <div>
            <AdminLogin setAuth={(isAuth) => console.log('로그인 상태', isAuth)} />
        </div>
    );
};

export default Login;
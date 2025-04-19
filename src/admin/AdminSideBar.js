import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import hospitalLogo from '../pnuyhGround.png';
import { LOGOUT } from '../redux/actions';
import "../styles/components/AdminSideBar.css";

function AdminSideBar({ setAuth, setActiveComponent }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = (localStorage.getItem('role') || '').trim().toUpperCase();
    console.log(role);

    const clearLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        console.log('localStorage 클리어 완료', localStorage.getItem('token'));
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            clearLocalStorage();
            dispatch({ type: LOGOUT });
            setAuth(false);
            navigate('/admin/login');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/ROOT/api/admin/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token.trim()}`
                }
            });

            if (res.data.status === 'success') {
                dispatch({ type: LOGOUT });
                clearLocalStorage();
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error('로그아웃 오류', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        } finally {
            navigate('/admin/login');
            setAuth(false);
        }
    };

    // 셔틀버스 관리
    const handleShowBusSchedule = () => {
        setActiveComponent('busSchedule');
    }
    // 회원가입 관리
    const handleShowMembers = () => {
        setActiveComponent('members');
    }
    // 승인 이력 관리
    const handleShowApprovalLog = () => {
        setActiveComponent('approvalLog');
    }
    // 회원관리
    const handleShowRootUserControl = () => {
        setActiveComponent('rootUserControl');
    }

    return (
        <div>
            <aside className="admin-sidebar">
                <div className="sidebar-top">
                    <div className="logo-wrapper">
                        <Link to="/admin/dashboard">
                            <img src={hospitalLogo} alt=" xxxx대학교병원" />
                        </Link>
                    </div>
                </div>

                <div className='sidebar-menu'>
                    {(role === 'SUPER_ADMIN' || role === 'ROOT_ADMIN') && (
                        <>  <button onClick={handleShowMembers}>회원가입 관리</button>
                            <button onClick={handleShowApprovalLog}>승인 이력</button>
                            <button onClick={handleShowRootUserControl}>회원관리</button>
                        </>
                    )}
                    <button onClick={handleShowBusSchedule}>셔틀버스 관리</button>
                </div>

                <div className="sidebar-bottom">
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            </aside>
        </div>
    );
}

export default AdminSideBar;

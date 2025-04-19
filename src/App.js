import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminSideBar from './admin/AdminSideBar';
import ApprovalLog from './admin/ApprovalLog';
import BusSchedulePage from './admin/BusSchedulePage';
import AdminLogin from './admin/Login';
import Register from './admin/Register';
import RegisterManagement from './admin/RegisterManagement';
import { loginSuccess } from './redux/actions';
import RootUserControl from './admin/RootUserControl';
import "./styles/components/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const dispatch = useDispatch();

  // 새로고침 시 로그인 상태 유지
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);

      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const userData = JSON.parse(userStr);
          dispatch(loginSuccess(userData));
        }
      } catch (error) {
        console.error('사용자 정보 파싱 오류', error);
      }
    }
  }, [dispatch])

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/admin/login" element={
            <AdminLogin setAuth={setIsAuthenticated} />
          } />
          <Route path="/admin/*" element={
            isAuthenticated ? (
              <div className="admin-layout">
                <AdminSideBar setAuth={setIsAuthenticated} setActiveComponent={setActiveComponent} />
                <main className="admin-main">
                  {activeComponent === 'busSchedule' && <BusSchedulePage />}
                  {activeComponent === 'members' && <RegisterManagement />}
                  {activeComponent === 'approvalLog' && <ApprovalLog />}
                  {activeComponent === 'rootUserControl' && <RootUserControl />}
                </main>
              </div>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } />
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/members" element={<RegisterManagement />} />
          <Route path="/admin/RootUserControl" element={<RootUserControl />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
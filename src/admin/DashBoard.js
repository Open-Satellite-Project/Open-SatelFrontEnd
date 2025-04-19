import axios from 'axios';
import React, { useEffect } from 'react';
import AdminSideBar from './AdminSideBar';

const DashBoard = ({ setAuth }) => {

    const token = localStorage.getItem('token');

    useEffect(() => {

        axios.get('http://localhost:8080/ROOT/api/admin/dashboard', {

            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, [token]);



    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar setAuth={setAuth} />
            <div>
                
            </div>
        </div>
    );
};

export default DashBoard;
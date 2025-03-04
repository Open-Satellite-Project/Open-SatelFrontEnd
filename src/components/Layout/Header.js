import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img src="/pnuyh.png" alt="양산부산대학교병원"></img>
                    </Link>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/">병원안내</Link></li>
                        <li><Link to="/hospital/maps-directions">오시는길</Link></li>
                        <li><Link to="/hospital/bus">순환버스</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )

}

export default Header;
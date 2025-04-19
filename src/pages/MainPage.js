import React from "react";
import Footer from "../components/Layout/Footer";
import "../styles/pages/MainPage.css";
import { Link } from "react-router-dom";
import pnuyhLogo from "../pnuyh.png";

const MainPage = () => {
  return (
    <div>
      <main className="main-page">
        <section className="reservation-section">
          <h2>진료 예약</h2>
          <p>홈페이지에서 개인의 일정에 맞춰 빠르고 쉽게 진료 예약을 할 수 있습니다.</p>
          <div className="reservation-buttons">
            <button>첫진료상담</button>
            <button>온라인예약</button>
          </div>

          <ul className="additional-links">
            <li>
              <a className="app" href="https://www.pnuyh.or.kr/pnuyh/hospital/mobileapp.do" target="self">
                <div className="icon-text">
                  <span> 앱</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-phone icon" viewBox="0 0 16 16">
                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                </div>
              </a>
            </li>

            <li>
              <a className="youtube" href="https://www.youtube.com/channel/UCo6xAaulkLgHzmrbd_IUUrg" target="self">
                <div className="icon-text">
                  <span>유튜브</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-youtube icon" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                  </svg>
                </div>
              </a>
            </li>

            <li>
              <a className="blog" href="https://blog.naver.com/pnuyhpr" target="self">
                <div className="icon-text">
                  <span>블로그</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-substack icon" viewBox="0 0 16 16">
                    <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
                  </svg>
                </div>
              </a>
            </li>
            <li>
              <a className="instargram" href="https://www.instagram.com/pnuyh/" target="self">
                <div className="icon-text">
                  <span>인스타그램</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-instagram icon" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </div>
              </a>
            </li>
          </ul>
        </section>

        {/* 의료진 찾기 섹션 */}
        <section className="find-doctor-section">
          <h2 className="easy_tit">의료진 찾기</h2>
          <p className="easy_txt">
            xxxxx병원의 의료진은 <br />
            환자를 위해 항상 노력하고 있습니다.
          </p>

          <fieldset>
            <legend className="blind">의료진 찾기</legend>
            <label className="blind" htmlFor="treat_search">
            </label>
            <input
              type="text"
              id="treat_search"
              className="inp_t"
              placeholder="진료과/질병명/의료진으로 검색하세요"
              title="진료과/질병명/의료진으로 검색하세요"
            />
            <button className="btn btn-primary btn-search" id="treat_btn" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </fieldset>

          <a
            className="btnC whiteLine"
            href="#"
            target="_self"
          >
            <span>의료진소개 바로가기</span>
          </a>

          {/* 진료과, 진료센터, 클리닉 */}
          <ul className="info_btn">
            <li>
              <a
                href="#"
                style={{
                  backgroundImage:
                    "#",
                }}
                target="_self"
              >
                진료과
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  backgroundImage:
                    "#",
                }}
                target="_self"
              >
                진료센터
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  backgroundImage:
                    "#",
                }}
                target="_self"
              >
                클리닉
              </a>
            </li>
          </ul>
        </section>

        <section className="quick-service-section">
          <h1>대표전화 </h1>
          <h1>xxxx-xxxx</h1>
          <div className="quick-links">
            <div><Link to="/hospital/maps-directions">오시는 길</Link></div>
            <div><a href="#">병원안내도</a></div>
            <div><a href="#">주차 안내</a></div>
            <div><a href="#">병문안 안내</a></div>
          </div>
          <p>후원회 안내</p>
          <p>나눔과 기부는 오래도록 가슴이 뜨겁습니다.</p>
        </section>
      </main>

      <header className="navbar">
        <div className="navbar-logo">
          <a href="https://www.pnuyh.or.kr/pnuyh/index.do">
            <img src={pnuyhLogo} alt="xxxx대학교병원" /></a>
        </div>
        <nav className="navbar-menu">
          <ul>
            <li><a href="#">나의진료정보</a></li>
            <li><a href="#">진료안내</a></li>
            <li><a href="#">병원안내</a></li>
            <li><a href="#">고객참여</a></li>
            <li><a href="#">건강정보</a></li>
            <li><a href="#">정보공개</a></li>
          </ul>
        </nav>
        <div className="navbar-icons">
          <a href="#">로그인</a>
          <a href="#">KOR</a>
          <a href="#">🔍</a>
        </div>
      </header>


      <Footer />
    </div>
  );
};

export default MainPage;

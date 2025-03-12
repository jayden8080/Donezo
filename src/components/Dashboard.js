import React from "react";
import "./Dashboard.css"; // 새로 만든 CSS 파일 불러오기

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Dashboard</h2>

      {/* 일정 및 할 일 개요 */}
      <div className="dashboard-summary">
        <div className="dashboard-card">
          <h3>📅 전체 일정 개요</h3>
          <p>이번 주 5개의 일정이 있습니다.</p>
        </div>

        <div className="dashboard-card">
          <h3>✅ 할 일 목록 요약</h3>
          <p>오늘 3개의 할 일이 남았습니다.</p>
        </div>
      </div>

      {/* 빠른 추가 버튼 */}
      <button className="quick-add-btn">+ 빠른 추가</button>
    </div>
  );
}

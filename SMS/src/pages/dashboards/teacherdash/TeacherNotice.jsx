import React, { useEffect, useState } from "react";
import TeacherLayout from "../../layout/teacherlayout/TeacherLayout";
import "./TeacherNotice.css"; // Import CSS file

const TeacherNotice = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
        try {
            const response = await fetch("http://localhost:3002/notice/teacher");
            const data = await response.json();
            console.log("Fetched notices:", data); // Debugging
            if (response.ok) {
                setNotices(data);
            } else {
                setError(data.error || "Failed to fetch notices.");
            }
        } catch (err) {
            setError("Error fetching notices.");
        }
    };

    fetchNotices();
}, []);

  return (
    <TeacherLayout>
      <div className="notice-container">
        <h2 className="notice-title"> Teacher Notices</h2>
        {error && <p className="error-message">{error}</p>}
        {notices.length === 0 ? (
          <p className="no-notices">No notices available.</p>
        ) : (
          <ul className="notice-list">
              {notices.map((notice) => (
                  <li key={notice._id} className="notice-item">
                      <h3 className="notice-heading">{notice.title}</h3>

                      {notice.fileUrl && (
                          <p>
                              📄 <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer">View</a>
                          </p>
                      )}
                  </li>
              ))}
          </ul>
        )}
      </div>
    </TeacherLayout>
  );
};

export default TeacherNotice;

import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layout/adminlayout/AdminLayout";
import "./AdminStudentNotice.css";

const AdminPublicNotice = () => {
    const [notices, setNotices] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await fetch("http://localhost:3002/notice/public");
            const data = await response.json();

            if (response.ok) {
                setNotices(data);
            } else {
                setError(data.error || "Failed to fetch notices.");
            }
        } catch (err) {
            setError("Error fetching notices.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3002/notice/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchNotices();
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to delete notice.");
            }
        } catch (err) {
            setError("Error deleting notice.");
        }
    };

    return (
        <AdminLayout>
            <div className="admin-notice-container">
                <h2>Manage Public Notices</h2>
                {error && <p className="error-message">{error}</p>}
                {notices.length === 0 ? (
                    <p>No notices available.</p>
                ) : (
                    <ul className="admin-notice-list">
                        {notices.map((notice) => (
                            <li key={notice._id} className="admin-notice-item">
                                <h3>{notice.title}</h3>
                                <p>{notice.content}</p>
                                <p>📅 {notice.date ? new Date(notice.date).toLocaleDateString("en-GB") : "No Date Available"}</p>
                                <button onClick={() => handleDelete(notice._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminPublicNotice;

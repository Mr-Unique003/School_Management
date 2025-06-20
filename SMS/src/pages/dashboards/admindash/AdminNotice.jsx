import React, { useState } from "react";
import AdminLayout from "../../layout/adminlayout/AdminLayout";
import './AdminNotice.css';

const AdminNotice = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [audience, setAudience] = useState("student"); // Default to student

    const handleSubmit = async (e) => {
        e.preventDefault();
        let endpoint = `http://localhost:3002/notice/${audience}`;

        const formData = new FormData();
        formData.append("title", title);
        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData, // Send as FormData
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Notice added successfully!");
                setTitle("");
                setFile(null);

                // Hide message after 3 seconds
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } else {
                setMessage(data.error || "Failed to add notice");
            }
        } catch (error) {
            setMessage("Error adding notice");
        }
    };

    return (
        <AdminLayout>
            <div className="ANotice">
                <h2>Add Notice</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter notice title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile && selectedFile.type !== "application/pdf") {
                                alert("Please upload a valid PDF file.");
                                return;
                            }
                            setFile(selectedFile);
                        }}
                    />
                    <select value={audience} onChange={(e) => setAudience(e.target.value)} required>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="public">Public</option>
                    </select>
                    <button type="submit">Add Notice</button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminNotice;

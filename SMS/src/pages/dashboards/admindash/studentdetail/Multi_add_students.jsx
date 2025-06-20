import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';


const Multi_add_students = () => {
    
    const [studentData, setStudentData] = useState([]);
  
    // Handle File Upload
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const binaryStr = event.target.result;
          const workbook = XLSX.read(binaryStr, { type: "binary" });
  
          // Convert first sheet to JSON
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet);
  
          setStudentData(data);
        };
  
        reader.readAsBinaryString(file);
      }
    };
    
  
    const handleUpload = async () => {
      if (studentData.length === 0) {
          alert("Please upload an Excel file first!");
          return;
      }
      try {
        await axios.post("http://localhost:3002/students/api/stud/upload", { data: studentData });
        alert("Data uploaded to students collection successfully!");
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };
  
    return (
      <div>
          <div>
        <h2>Upload Excel File to "students"Collection</h2>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <button onClick={handleUpload}>Upload to students</button>
      </div>
      </div>
    )
  }

export default Multi_add_students
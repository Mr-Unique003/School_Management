const express = require("express");
const multer = require("multer");
const StudentNotice = require("./studentNotice");
const TeacherNotice = require("./teacherNotice");
const PublicNotice = require("./publicNotice");
const router = express.Router();

// Multer Storage Configuration (Store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Common function to create notice
async function createNotice(req, res, NoticeModel) {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required." });
        }

        if (!req.file) {
            return res.status(400).json({ error: "PDF file is required." });
        }

        const notice = new NoticeModel({
            title,
            content: req.file.buffer, // Store file as Buffer
            contentType: "application/pdf", // Store file type (PDF)
        });

        await notice.save();
        res.status(201).json({ message: "Notice added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Routes for adding notices (Store file in MongoDB)
router.post("/student", upload.single("file"), async (req, res) => {
    await createNotice(req, res, StudentNotice);
});

router.post("/teacher", upload.single("file"), async (req, res) => {
    await createNotice(req, res, TeacherNotice);
});

router.post("/public", upload.single("file"), async (req, res) => {
    await createNotice(req, res, PublicNotice);
});

// Fetch Notices (Without Files)
async function fetchNotices(res, NoticeModel) {
    try {
        const notices = await NoticeModel.find().select("title createdAt");
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Fetch notices without files
router.get("/student", async (req, res) => {
    try {
        const notices = await StudentNotice.find();

        const noticesWithFiles = notices.map(notice => ({
            _id: notice._id,
            title: notice.title,
            createdAt: notice.createdAt,
            fileUrl: `http://localhost:3002/notice/file/${notice._id}` // Add file URL
        }));

        res.status(200).json(noticesWithFiles);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/teacher", async (req,res) => {
    try{
        const notices = await TeacherNotice.find();

        const noticesWithFiles = notices.map(notice =>({
            _id: notice._id,
            title: notice.title,
            createdAt: notice.createdAt,
            fileUrl: `http://localhost:3002/notice/file/${notice._id}`  // Add file URL
        }))

        res.status(200).json(noticesWithFiles);
    }catch (error){
        res.status(500).json ({error: "Internal Server Error"});
    }
})

// router.get("/teacher", async (req, res) => {
//     try {
//         const notices = await TeacherNotice.find();

//         const noticesWithFiles = notices.map(notice => ({
//             _id: notice._id,
//             title: notice.title,
//             createdAt: notice.createdAt,
//             fileUrl: `http://localhost:3002/notice/file/${notice._id}` // Add file URL
//         }));

//         res.status(200).json(noticesWithFiles);
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

router.get("/public", async (req, res) => {
    await fetchNotices(res, PublicNotice);
});

// Fetch Notice PDF File
router.get("/file/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching file for notice ID:", id);

        let notice = await StudentNotice.findById(id);
        if (!notice) notice = await TeacherNotice.findById(id);
        if (!notice) notice = await PublicNotice.findById(id);

        if (!notice || !notice.content) {
            console.error("Notice not found for ID:", id);
            return res.status(404).json({ error: "File not found" });
        }

        res.set("Content-Type", "application/pdf");
        res.send(notice.content); // Corrected to send the actual content
    } catch (error) {
        console.error("Error fetching file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Notice
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        let deletedNotice = await StudentNotice.findByIdAndDelete(id) ||
                            await TeacherNotice.findByIdAndDelete(id) ||
                            await PublicNotice.findByIdAndDelete(id);

        if (!deletedNotice) {
            return res.status(404).json({ error: "Notice not found" });
        }

        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

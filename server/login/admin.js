// const express = require('express');
// const Admin = require('../models/Admin');
// const router = express.Router();

// router.post("/admin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(400).send("Admin not found");
//     }

//     if (admin.password !== password) {
//       return res.status(400).send("Invalid password");
//     }

//     res.status(200).send("Admin login successful");
//   } catch (error) {
//     res.status(500).send("Error logging in admin");
//   }
// });

// module.exports = router;
const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

router.post("/", async (req, res) => { // Use root path instead of "/admin"
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).send("Admin not found");
    }

    if (admin.password !== password) {
      return res.status(400).send("Invalid password");
    }

    res.status(200).send("Admin login successful");
  } catch (error) {
    res.status(500).send("Error logging in admin");
  }
});

module.exports = router;

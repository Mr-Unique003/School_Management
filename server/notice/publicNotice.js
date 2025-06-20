const mongoose = require("mongoose");

const publicNoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filePath: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PublicNotice", publicNoticeSchema);

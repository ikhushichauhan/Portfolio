import { Router } from "express";
import Message from "../models/Message.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact  -> saves a message from the portfolio contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body ?? {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Name, email and message are all required." });
    }
    if (!EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const saved = await Message.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return res.status(201).json({ message: "Message received.", id: saved._id });
  } catch (err) {
    console.error("Contact route error:", err);
    return res.status(500).json({ message: "Server error. Please try again shortly." });
  }
});

// GET /api/contact -> lists saved messages (protect this in production!)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    return res.json(messages);
  } catch (err) {
    console.error("Contact list error:", err);
    return res.status(500).json({ message: "Server error. Please try again shortly." });
  }
});

export default router;

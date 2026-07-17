import { Router } from "express";
import Message from "../models/Message.js";
import nodemailer from "nodemailer";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email configuration - UPDATE THESE WITH YOUR EMAIL SETTINGS
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your email provider
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // SET THIS IN .env file
    pass: process.env.EMAIL_PASS || 'your-app-password' // USE APP PASSWORD, NOT REGULAR PASSWORD
  }
});

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

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: 'khushichauhan9850@gmail.com', // YOUR EMAIL WHERE YOU WANT TO RECEIVE MESSAGES
        subject: `New Portfolio Message from ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}\n\n---\nSent from your portfolio contact form`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>New Portfolio Message</h2>
            <p><strong>Name:</strong> ${name.trim()}</p>
            <p><strong>Email:</strong> ${email.trim()}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${message.trim().replace(/\n/g, '<br>')}
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              ---<br>
              Sent from your portfolio contact form
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails, just log it
    }

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

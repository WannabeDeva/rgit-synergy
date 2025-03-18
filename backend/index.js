import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// API to store user data
app.post("/register", async (req, res) => {
  try {
    const { userId, phoneNumber, bloodGroup, medicalConditions, emergencyContact, aadhaar } = req.body;

    // Store in Firestore
    await db.collection("users").doc(userId).set({
      phoneNumber,
      bloodGroup,
      medicalConditions,
      emergencyContact,
      aadhaar,
    });

    res.status(201).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "Failed to save user data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

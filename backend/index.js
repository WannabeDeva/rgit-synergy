import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

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
app.use(ClerkExpressWithAuth());

app.post('/api/profile', async (req, res) => {
  try {
    // After Clerk middleware, req.auth contains the authenticated user info.
    const { userId: clerkUserId } = req.auth;
    
    if (!clerkUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Extract data from the request body using destructuring
    const { email, phone, bloodGroup, diseases, emergencyContacts, aadharDetails } = req.body;
    
    // Optionally, add further verification that the email from Clerk matches the one provided.
    
    // Save the user data to Firestore using the Clerk user ID as the document ID.
    await db.collection('users').doc(clerkUserId).set({
      email,
      phone,
      bloodGroup,
      diseases,
      emergencyContacts,
      aadharDetails,
      createdAt: new Date().toISOString(),
    });
    
    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

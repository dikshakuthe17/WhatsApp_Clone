require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const messageRoutes = require('./routes/messages');
const processPayload = require('./utils/processPayload');

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS configuration (localhost + production frontend allowed)
app.use(cors({
    origin: [
        'http://localhost:5173', // Local dev
        'https://whats-app-clone-flame-zeta.vercel.app' // Your deployed frontend URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// ✅ Connect to MongoDB
connectDB();

// ✅ API Routes
app.use('/api', messageRoutes);

// ✅ For testing payloads from local JSON
app.post('/api/process-payload', async (req, res) => {
    try {
        await processPayload(req.body);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// ✅ Test root endpoint (optional)
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

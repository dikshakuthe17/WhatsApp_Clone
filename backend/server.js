require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


const messageRoutes = require('./routes/messages');
const processPayload = require('./utils/processPayload');

const app = express();
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Test Route for root "/"
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// Routes
app.use('/api', messageRoutes);

// For testing payloads from local JSON
app.post('/api/process-payload', async (req, res) => {
    try {
        await processPayload(req.body);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
const generateRoutes = require('./routes/generate');

app.use(express.json());

// Routes
app.use('/api/generate', generateRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

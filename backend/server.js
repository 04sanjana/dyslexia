const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dyslexia_friendly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define Schema
const ConversionSchema = new mongoose.Schema({
    url: String,
    font: String,
    bgColor: String,
    textSize: Number,
    timestamp: { type: Date, default: Date.now }
});

const Conversion = mongoose.model('Conversion', ConversionSchema);

app.use(cors());
app.use(express.json());

app.post('/convert', async (req, res) => {
    const { url, font, bgColor, textSize } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Fetch the website content
        const response = await axios.get(url);
        const html = response.data;

        // Parse and modify the HTML
        const $ = cheerio.load(html);
        $('body').css({
            'font-family': font || 'OpenDyslexic',
            'background-color': bgColor || '#f3f3f3',
            'font-size': `${textSize || 16}px`,
            'line-height': '1.6',
        });

        // Save to database
        const newConversion = new Conversion({ url, font, bgColor, textSize });
        await newConversion.save();

        // Return the modified HTML
        res.status(200).send($.html());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch or process the website content' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

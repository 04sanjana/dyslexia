const axios = require('axios');
const cheerio = require('cheerio');
const Conversion = require('../models/conversion');

exports.convertWebsite = async (req, res) => {
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
};

exports.getConversions = async (req, res) => {
    try {
        const conversions = await Conversion.find().sort({ timestamp: -1 }).limit(10);
        res.status(200).json(conversions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve conversions' });
    }
};

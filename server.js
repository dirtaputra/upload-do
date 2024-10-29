const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 3000;

// Configure AWS SDK for DigitalOcean using v3
const s3Client = new S3Client({
    endpoint: 'https://sgp1.digitaloceanspaces.com', // Singapore region endpoint
    region: 'sgp1', // Singapore region for DigitalOcean
    credentials: {
        accessKeyId: process.env.DO_ACCESS_KEY,
        secretAccessKey: process.env.DO_SECRET_KEY,
    },
});

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const fileContent = fs.readFileSync(file.path);

    const params = {
        Bucket: 'astrodistribusi', // Replace with your Space name
        Key: file.originalname,
        Body: fileContent,
        ACL: 'public-read', // Makes the file public; adjust if needed
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Clean up local file
        fs.unlinkSync(file.path);

        const fileUrl = `https://${params.Bucket}.sgp1.digitaloceanspaces.com/${file.originalname}`;
        res.status(200).send(`File uploaded successfully. File URL: ${fileUrl}`);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

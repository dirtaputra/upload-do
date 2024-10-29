
---

# DigitalOcean File Upload API

This is an Express.js backend server that allows file uploads to a DigitalOcean Space. The server uses AWS SDK v3 for uploading files, with Multer handling file uploads on the Express side.

## Features

- **File Upload**: Upload files to your DigitalOcean Space.
- **File Access**: Returns a public URL to access the uploaded file.

## Prerequisites

- Node.js (v14 or later)
- A DigitalOcean Space with API access keys

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/digitalocean-upload-server.git
cd digitalocean-upload-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your DigitalOcean Space credentials:

```plaintext
DO_ACCESS_KEY=your-access-key
DO_SECRET_KEY=your-secret-key
```

### 4. Update Server Configuration

Make sure your server code has the correct endpoint and Space name:
- In `server.js`, update the endpoint and Space name if needed.

### 5. Start the Server

```bash
node server.js
```

The server will run on `http://localhost:3000`.

## API Endpoints

- **POST /upload**: Uploads a file to DigitalOcean Space and returns the file's public URL.

## Testing the API with Postman

You can test this API using Postman by following these steps:

### 1. Open Postman and Create a New Request

1. Set the request method to **POST**.
2. Use the following URL for the request: `http://localhost:3000/upload`.

### 2. Configure the Body for File Upload

1. Select the **Body** tab.
2. Choose **form-data**.
3. Add a new field with:
   - **Key**: `file`
   - **Type**: Select **File** from the dropdown menu.
   - **Value**: Click on **Select Files** and choose a file to upload from your local system.

### 3. Send the Request

- Click **Send** to submit the file upload request.
- On success, you’ll get a response with the file's public URL.

### Example Response

On a successful upload, you should receive a JSON response:

```json
{
    "message": "File uploaded successfully.",
    "fileUrl": "https://astrodistribusi.sgp1.digitaloceanspaces.com/your-filename.ext"
}
```

## Project Structure

- **server.js**: Main server file that sets up the Express server and handles file uploads.
- **uploads/**: Temporary folder for storing files before uploading them to DigitalOcean.
- **.env**: Environment variables for securely storing credentials.

## Dependencies

- **express**: Node.js web application framework.
- **multer**: Middleware for handling file uploads.
- **@aws-sdk/client-s3**: AWS SDK v3 for uploading files to DigitalOcean.
- **dotenv**: Loads environment variables from a `.env` file.

## Notes

- Make sure your DigitalOcean Space has public-read permissions if you want the uploaded files to be accessible via a public URL.
- Clean up the `uploads/` folder regularly as it temporarily stores files before uploading.

---
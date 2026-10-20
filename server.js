import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Serve static files from dist
app.use(express.static(distPath));

// Route /admin and /admin/ to admin.html
app.get(['/admin', '/admin/'], (req, res) => {
  res.sendFile(path.join(distPath, 'admin.html'));
});

// Fallback to index.html for any other routes (SPA support)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

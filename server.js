import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');
const dataDir = process.env.DATA_DIR || path.join(__dirname, 'data');
const configFile = path.join(dataDir, 'custom-config.json');

// Pastikan folder data ada
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Parse JSON body (limit 50MB untuk base64 foto)
app.use(express.json({ limit: '50mb' }));

// Serve static files from dist
app.use(express.static(distPath));

// API: Get saved config
app.get('/api/config', (req, res) => {
  try {
    if (fs.existsSync(configFile)) {
      const data = fs.readFileSync(configFile, 'utf-8');
      res.json(JSON.parse(data));
    } else {
      res.json(null);
    }
  } catch (err) {
    console.error('Error reading config:', err);
    res.json(null);
  }
});

// API: Save config
app.post('/api/config', (req, res) => {
  try {
    fs.writeFileSync(configFile, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving config:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Reset config
app.delete('/api/config', (req, res) => {
  try {
    if (fs.existsSync(configFile)) {
      fs.unlinkSync(configFile);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error resetting config:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

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

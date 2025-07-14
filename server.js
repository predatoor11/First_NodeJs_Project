const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require("./routes/postRoutes");
require('dotenv').config();

const app = express();
// JSON verisini okuyabilmek için:
app.use(express.json());

// MongoDB bağlantısını başlat
connectDB();

// Tüm /api/posts yollarını postRoutes dosyasına yönlendir
app.use("/api/posts", postRoutes);

app.use(express.static("public"));

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
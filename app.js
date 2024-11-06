const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const donorRoutes = require("./routes/donorRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const adminRoutes = require("./routes/adminRoutes");  
const path = require("path"); // Import path module

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "frontend"))); // Serve static files

// API routes
app.use("/api/donors", donorRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/admin", adminRoutes);

// Catch-all route to serve the front-end index.html for any other request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

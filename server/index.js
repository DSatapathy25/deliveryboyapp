const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
const authRoutes = require('./routes/authRouter');
const userRoute= require('./routes/userRoute')
const taskRoute = require('./routes/taskRoute')

const app = express();
const PORT = 3001;
require("dotenv").config();
// Connect to the database
connectDB()
  .then(() => {
    // Once the database is connected, start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if unable to connect to the database
  });

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
console.log("Middleware Setup Complete");
// Routes
app.use('/auth', authRoutes);
app.use('/api',userRoute)

app.use('/api', taskRoute)
console.log("Routing Setup Complete");
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// app.get("/logout", (req,res)=>{
    
//   res.clearCookie('token');
//   console.log('logged-out');
//   res.status(200).send('User Loggedout')
// })


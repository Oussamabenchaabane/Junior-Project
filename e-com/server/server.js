const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sync database
// sequelize.sync({ alter:true }) // Use { alter: true } to update tables without dropping them
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);
//   });

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});



const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect to MongoDB
connectDB();

// init middleware - allows application to accept JSON data
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to NUS ModReg!' }));

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/search-modules', require('./routes/search-modules'));
app.use('/api/user-modules', require('./routes/user-modules'));
app.use('/api/venues', require('./routes/venues'));
app.use('/api/bus-stops', require('./routes/bus-stops'));

// look for an environment variable called PORT first, if not then use port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

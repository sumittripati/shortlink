require('dotenv').config()
const { connectDB } = require('./config/db');
let app = require('./app')

let PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
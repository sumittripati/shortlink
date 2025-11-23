let express = require('express');
let logger = require('./middleware/loger');
let cors = require('cors');
let notFoundMiddleware = require('./middleware/notFoundMiddleware');
let errorMiddleware = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
dotenv.config();

const urlRoutes = require('./routes/url')
let redirectController = require('./routes/url');
let app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE"],
}));

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', urlRoutes);
app.get('/:code', redirectController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

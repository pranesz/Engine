const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const authRoutes = require('./routes/auth');
const dataRoutes = require("./routes/data")
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
dotenv.config();
connectDB();
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', authRoutes);
app.use("/api", dataRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const houseRoutes = require('./routes/houseRoutes')
const cementRoutes = require('./routes/cementRoutes')
const sandRoutes = require('./routes/sandRoutes')
const steelRoutes = require('./routes/steelRoutes')
const stoneRoutes = require('./routes/stoneRoutes')
const woodRoutes = require('./routes/woodRoutes')
const pipeWireRoutes = require('./routes/pipeWireRoutes')
const cateringRoutes = require('./routes/cateringRoutes')
const interiorRoutes = require('./routes/interiorRoutes')
const pgHostelRoutes = require('./routes/pgHostelRoutes')
const agentRoutes = require('./routes/agentRoute')
const loanRoutes = require('./routes/loanRoute')
const landRoutes = require("./routes/landRoutes")
const favouritesRouter = require('./routes/favouriteRoute');
const BoreWellRoute = require('./routes/borewellRoute');
const CivilRoute = require('./routes/civilRoute');
const FeedbackRoute = require('./routes/feedbackRoute');
const razorpayRoutes = require('./routes/paymentRoute');
const mailVerify= require('./routes/mailVerifyRoute');
const hotelRoute =require('./routes/HotelRoute');
const RegisterRoute =require('./routes/registerRoute')
const ResortRoute =require('./routes/resortRoutes');
const ContactRoute = require('./routes/contactRoute')

app.use('/houseRoute', houseRoutes)
app.use('/cementRoutes', cementRoutes);
app.use('/sandRoute', sandRoutes)
app.use('/steelRoute', steelRoutes)
app.use('/stoneRoute', stoneRoutes)
app.use('/woodRoute', woodRoutes)
app.use('/pipeWiresRoute', pipeWireRoutes)
app.use('/cateringRoute', cateringRoutes)
app.use('/interiorRoute', interiorRoutes)
app.use('/pgHostelRoute', pgHostelRoutes)
app.use('/agentRoute', agentRoutes)
app.use('/loanRoute', loanRoutes)
app.use('/landRoute', landRoutes)
app.use('/favourites', favouritesRouter);
app.use('/borewell',BoreWellRoute);
app.use('/razorpay', razorpayRoutes);
app.use('/feedback', FeedbackRoute);
app.use('/civil', CivilRoute);
app.use('/mailverify',mailVerify)
app.use('/hotelRoute',hotelRoute);
app.use('/registerpage',RegisterRoute)
app.use('/resortRoute', ResortRoute);
app.use('/contactRoute',ContactRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

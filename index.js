import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser'
// routes
import auth from './routes/auth.js'
import owner from './routes/owner.js'
import property from './routes/property.js'
import agent from './routes/agent.js'
import user from './routes/user.js'
import dashboard from './routes/dashboard.js'
import admin from './routes/admin.js'
import propertyAd from './routes/propertyAd.js'
import companyRequest from './routes/companyRequest.js'
import soldProperties from './routes/soldProperties.js'
import agentCompany from './routes/agentCompany.js'
import favorite from './routes/favorite.js'
import notification from './routes/notification.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
//   process.env.MONGO_URL
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('db connection successful'))
.catch((e)=>{console.log(e)})
app.get('/',(req,res)=>{
    res.send("successful")
})

app.use('/api/auth',auth)
app.use('/api/owner',owner)
app.use('/api/property',property)
app.use('/api/agent',agent)
app.use('/api/agent-company',agentCompany)
app.use('/api/user',user)
app.use('/api/dashboard',dashboard)
app.use('/api/admin',admin)
app.use('/api/ads',propertyAd)
app.use('/api/company',companyRequest)
app.use('/api/sold',soldProperties)
app.use('/api/favorite',favorite)
app.use('/api/notification',notification)
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{console.log("server is running")})
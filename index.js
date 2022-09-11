import express from 'express'
import mongoose  from 'mongoose'
import dotenv  from 'dotenv'
import cors from 'cors'
import property from './routes/property.js'
import agent from './routes/agent.js'
// import auth from './routes/auth.js'
dotenv.config()
const app=express()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('db connecdtion successful'))
.catch((e)=>{console.log(e)})
app.get('/',(req,res)=>{
    res.send("successful")
})


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// app.use('/api/auth',auth)
app.use('/api/property',property)
app.use('/api/agent',agent)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{console.log("server is running")})


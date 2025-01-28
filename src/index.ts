import express from 'express';
const cors = require('cors');
const mainRouter = require('./routes/index')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/api/v1',mainRouter);


app.listen(port, ()=>{
    console.log("app is running on port 3000");
    
})
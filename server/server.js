const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const mongoose=require('mongoose');


//configure the express
const app=express();

//configure the dotenv
dotenv.config();

//configure the cors

app.use(cors());

//configure the express to receive the form data

app.use(express.json());

//host name and port

const hostname=process.env.HOST_NAME;
const port=process.env.PORT;

//configure the router

app.use('/api',require('./router/productRouter'));


//connect to mono db database

mongoose.connect(process.env.MONGO_DB_LOCAL_URL,

    
).then(response=>{

    console.log('Connect to mongodb database successfully');
}).catch((error)=>{

    console.error(error);
    process.exit(1);//stop the node js process if unable to connect db
});

//empty url
app.get('/',(request,response)=>{

    response.send(`<h2>Welcome to Big Basket Application </h2>`);
});

app.listen(port,hostname,()=>{

    console.log(`Express Server is Started at http://${hostname}:${port}`);
});
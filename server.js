// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');

// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port=8000;

// Setup Server
const server=app.listen(port,listening); // we can use arrow function as ()=>console.log(`running on localhost port:${port}`)

function listening()
{
    console.log(`running on localhost port:${port}`);
}
//Route 

//Get Route
app.get('/getWeather', callback); // we can simplify using arrow functions expression
function callback(req,res){
    res.send(projectData)
}
//Post Route
//The POST route in the server side should setup which will map the data sent via the API from the client side and save it in the projectData variable.
app.post('/add',(req,res)=>{    
    projectData.temp=req.body.temp;
    projectData.date=req.body.date;
    projectData['user response']=req.body.content;
    res.send(projectData);
});




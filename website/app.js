/* Global Variables */
const baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=f49291787972e33f1bbd43edfb4b3c9e&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//Adds an event listener to an existing HTML button from DOM using Vanilla JS.
document.getElementById('generate').addEventListener('click',handleGenerateBtn);
function handleGenerateBtn(){
    const zip=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    console.log(`Get Wearther Data Object from base Url ${baseURL}`);
    GetWeatherData(baseURL,zip,apiKey)
    .then(data=>{
        PostData('/add',{temp:data.main.temp,date:newDate,content:feelings});
        UpdateUI('/getWeather');
    });
}

const GetWeatherData=async(baseURL,zip,apiKey)=>{
    console.log(`${baseURL}${zip}${apiKey}`);
  const request= await fetch(`${baseURL}${zip}${apiKey}`);
  try{
    const data=await request.json();
    console.log('Return Endpoint Data and  Check data retrieved from  getWeather  ',data);  
    return data;
  }
  catch(error){
      console.log(`exisiting an error :${error}`);
  }
};

//async Post 
//The client side function should take two arguments, the URL to make a POST to, and an object holding the data to POST.
const PostData= async (url='',data={}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
        try {
      const dataObj = await response.json();
      console.log('save data to the server');
      return dataObj;
    }catch(error) {
    console.log('error', error);
    }      
     
  };


//Update UI
const UpdateUI = async (url='') => {
    const request = await fetch(url);    
      try {
        weatherData = await request.json();   
        console.log(`get weather data and updating Ui  and Sets the properties of existing HTML elements from the DOM using Vanilla JavaScript.`);   
        document.getElementById('temp').innerHTML = `Temperature :${Math.round(weatherData.temp)+ 'degrees'}`;
        document.getElementById('content').innerHTML = `user response :${weatherData["user response"]}`;
        document.getElementById('date').innerHTML =`Date :${weatherData.date}`;       
      } catch (error) {
        console.log(`there is an errro : ${error}`);
      }
   
  };
 


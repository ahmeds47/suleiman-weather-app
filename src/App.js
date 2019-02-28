import React from 'react';
import Title from './panels/Title';
import Form from './panels/Form';
import Weather from './panels/Weather';

//api key generated from https://home.openweathermap.org/api_keys
const Api_Key = "485c4a0747189164e23a829b7f4924c8";

class App extends React.Component{

  state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
    initialCity: "",
    initialCountry: ""
  }

  setWeatherData(response)
  {
    //check if the correct data is returned
    //set the error param with the message from the response 
    //and set the states of the other params to nothing.
    if(response.cod === '404')
    {
      this.setState({
        error: response.message,
        temperature: "",
        city: "",
        country: "",
        humidity: "",
        description: ""
      })
    }
    else
    {
      //set all params with the correct values
      //and set error to nothing
      this.setState({
        //the temperature should be a whole number.
        //"\xB0 Celsius" is for the Celsius symbol.
        temperature: Math.round(response.main.temp) + "\xB0 Celsius",
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }
  }

  getCurrentLocation = async (e) => {
  //ip lookup to get current location
    const ipLookUp = await fetch('http://ip-api.com/json');
    const lookUpResponse = await ipLookUp.json();

    this.loadWeatherData(lookUpResponse.city, lookUpResponse.country);
  }

  loadWeatherData = async (city, country) => {
    
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${Api_Key}`);
    const response = await api_call.json();
    
    this.setWeatherData(response);
  }

  getWeather= async (e) => {
    
    e.preventDefault();

    const city    =  e.target.elements.city.value;
    const country =  e.target.elements.country.value;
    
    if(city === "" || country === "")
    {
      this.setState({
        error: "Please, complete both fields",
        temperature: "",
        city: "",
        country: "",
        humidity: "",
        description: ""
      })
      return;
    }
    else{
      this.loadWeatherData(city, country);
    }
  }

  render(){
    return(
      <div>
      <div className="wrapper">
        <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-xs-5 title-container">
              <Title />
            </div>
            <div className="col-xs-7 form-container">
              <Form 
                  loadWeather={this.getWeather} 
                  loadCurrentLocation={this.getCurrentLocation}
                  />
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
   )
  }
}
export default App;
import React from "react";
import Geocode from "react-geocode";

class Form extends React.Component{
  
  constructor(props) {
    super(props);

    this.initialState = {
        city: '',
        country: ''
    };

    this.state = this.initialState;
  }

  handleChange = event => {
      const {name, value} = event.target;

      this.setState({
          [name] : value
      });
  }

  showPosition(position) {
    //var lat = position.coords.latitude;
    //var lon =  position.coords.longitude;

    //console.log(position.coords);
  }

  loadCurrentLoc(){
    Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    Geocode.enableDebug();

    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  componentDidMount(){
    this.props.loadCurrentLocation();
  }

    render(){

        return(
                <form onSubmit = {this.props.loadWeather}>
                    <input 
                      type="text" 
                      name="city" 
                      placeholder="City"
                      onChange={this.handleChange}
                      value={this.state.city}/>
                    
                    <input 
                        type="text" 
                        name="country" 
                        placeholder="Country"
                        onChange={this.handleChange}
                        value={this.state.country}/>

                    <button>Get Weather</button>
                </form>
           
        )
    }
}

export default Form;
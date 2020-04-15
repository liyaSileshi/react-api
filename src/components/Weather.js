import React, {Component} from 'react'
import Temperature from './Temperature'
import Description from './WeatherDescription'
import Atmosphere from './Atmosphere'
import './Weather.css'

class Weather extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',     // Used to hold value entered in the input field
      weatherData: null,  // Used to hold data loaded from the weather API
      isLoading: false, // to check if data is still being loaded or already loaded
      errorMessage: ''
    }
  }

  handleSubmit(e) {
    this.setState({isLoading : true})
    e.preventDefault()
    const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
    // Get the zip from the input
    const zip = this.state.inputValue
    // Form an API request URL with the apikey and zip
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}`
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${zip},us&appid=${apikey}`

    // Get data from the API with fetch
    fetch(url).then(res => {
      console.log(res.status)
      //method to check status
      this.checkStatus(res.status)
      // Handle the response stream as JSON
      return res.json()
    }).then((json) => {
      // If the request was successful assign the data to component state
      this.setState({ weatherData: json , isLoading: false})
      console.log(this.state.weatherData)
      // ! This needs better error checking here or at renderWeather() 
      // It's possible to get a valid JSON response that is not weather 
      // data, for example when a bad zip code entered.
    }).catch((err) => {
      // If there is no data 
      this.setState({ weatherData: null, errorMessage: err.message }) // Clear the weather data we don't have any to display
      // Print an error to the console. 
      console.log('-- Error fetching --')
      console.log(err.message)
      // You may want to display an error to the screen here. 
    })

  if(this.state.errorMessage !== ''){
    return <h3 className="error"> { this.state.errorMessage } </h3>
  }
  
}

  //checks if data is obtained from API
  //if not, returns an error message
  checkStatus(status) {
    if (status !== 200) {
      return <p>oops</p>

    }
  }

  renderWeather() {
    // This method returns undefined or a JSX component
    if (this.state.weatherData === null) { //
      // If there is no data return undefined
      console.log('no data')
      return <p>no data</p>
    }

    /* 
    This next step needs another level of error checking. It's 
    possible to get a JSON response for an invalid zip in which 
    case the step below fails. 
    */ 
    //check if json is valid
    console.log(typeof this.state.weatherData.cod)
    if (this.state.weatherData.cod === 200){  // if json status is valid, show data
      const { main, description, icon } = this.state.weatherData.weather[0]
      const { temp, pressure, humidity, temp_min, temp_max } = this.state.weatherData.main 
    
      return (
        <div>
          <img src= {`http://openweathermap.org/img/w/${icon}.png`} alt='weather-icon' height='100' width='auto'></img>
          <Description title={main} desc={description}/> 
          <Temperature temp = {temp} min={temp_min} max={temp_max} /> 
          <Atmosphere pressure = {pressure} humidity = {humidity}/>
        </div>
      )
    }
    else{
      return <p>no valid data</p>
    }
  }
    // Take the weather data apart to more easily populate the component

    

  checkRender() {
    if (this.state.inputValue === ''){
      return <p>Please enter zip</p>
    } else if (this.state.isLoading === true){
      console.log('loading')
      return <p>Loading...</p>
    }

    if (this.state.errorMessage !== '' || this.state.weatherData === null) {
      return <p>data not found</p>
    }else{
      return this.renderWeather()
    }
    
  }

  render() {
    return (
      <div className="weather">

        {/** This input uses the controlled component pattern */}
        <form onSubmit={e => this.handleSubmit(e)}>

          {/** 
          This pattern is used for input and other form elements 
          Set the value of the input to a value held in component state
          Set the value held in component state when a change occurs at the input 
          */}
          <input 
            value={this.state.inputValue} 
            onChange={e => this.setState({ inputValue: e.target.value })}
            type="text" 
            pattern="(\d{5}([\-]\d{4})?)"
            placeholder="enter zip"
          />

          <button className='submit-btn' type="submit">Submit</button>

        </form>

        {/** Conditionally render this component */}
        
        {/* {this.renderWeather()} */}
        {this.checkRender()}

      </div>
    );
  }
}

export default Weather;
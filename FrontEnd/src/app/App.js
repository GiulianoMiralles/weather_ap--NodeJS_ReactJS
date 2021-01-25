import React, { Component } from 'react';

import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import WeatherCurrentCity from './components/WeatherCurrentCity';

import { WEATHER_KEY } from './keys';

class App extends Component {

    state = {            //Initial state
        temperature: '',
        description: '',
        humidity: '',
        wind_speed: 0,
        city: '',
        country: '',
        error: null,
        cityCurrent: '',
        countryCurrent: '',
        today: '',
        tomorrow: '',
        twoDays: '',
        threeDays: '',
        fourDays: '',
        fiveDays: ''
    };

    getWeatherCurrentCity = async (e) => {                      // Function that returns the 5-day forecast of my current location
        e.preventDefault();                                     // I prevent the page from refreshing

        const API_URL1 = `http://localhost:3000/api/forecast`; // I assign the url to a constant so that I can fetch later
        const response1 = await fetch(API_URL1);              // I fetch and save the response in a constant
        const data1 = await response1.json();                 // I convert my response to JSON format

        this.setState({                                      // I set values to my state
            cityCurrent: data1.city,
            countryCurrent: data1.country,
            today: data1.today,
            tomorrow: data1.tomorrow,
            twoDays: data1.two,
            threeDays: data1.three,
            fourDays: data1.four,
            fiveDays: data1.five
        });
    }

    getWeather = async (e) => {
        e.preventDefault();                          // I prevent the page from refreshing
        const { city, country } = e.target.elements; // Get the inputs of my form (Weather Form.js)
        const cityValue = city.value;               // I keep in a constant in city value
        const countryValue = country.value;         // I keep the country code in a constant

        if (cityValue && countryValue) {           // I make a conditional so that both inputs are complete to perform a fetch with the placed values
            // metric parameter is for Celcius Unit
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;

            const response = await fetch(API_URL);
            const data = await response.json();

            this.setState({
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
                error: null,
            });
        } else {
            this.setState({
                error: 'Please enter a City and a Country.'
            });
        }

    }

    render() {                                          // rendering of my components
        return <div className="container p-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <WeatherCurrentCity
                        getWeatherCurrentCity={this.getWeatherCurrentCity}
                        {...this.state} />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <WeatherForm
                        getWeather={this.getWeather}
                    />
                    <WeatherInfo {...this.state} />
                </div>
            </div>
        </div>
    }
}

export default App;
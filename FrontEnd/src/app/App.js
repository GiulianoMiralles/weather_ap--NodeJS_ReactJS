import React, { Component } from 'react';

import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import WeatherCurrentCity from './components/WeatherCurrentCity';

import { WEATHER_KEY } from './keys';

class App extends Component {

    state = {
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

    getWeatherCurrentCity = async (e) => {
        e.preventDefault();

        const API_URL1 = `http://localhost:3000/api/forecast`;
        const response1 = await fetch(API_URL1);
        const data1 = await response1.json();
        console.log("Este es mi fuckng fetch", data1)

        this.setState({
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
        e.preventDefault();                          //Evito que se me refresque la pagina
        const { city, country } = e.target.elements; //Obtengo los inpunts
        const cityValue = city.value;               //Guardo en una constante en valor de la ciudad
        const countryValue = country.value;         //Guardo en una constante el codigo del pais

        if (cityValue && countryValue) {
            // metric parameter is for Celcius Unit
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;
            console.log(API_URL);

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

    render() {
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
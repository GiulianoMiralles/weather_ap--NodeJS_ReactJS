import React from 'react';

const WeatherCurrentCity = props => {
    return (
        <div>
            <div className="card card-body mt-2 animated fadeInUp" >
                <div>
                    {
                        props.cityCurrent && props.countryCurrent &&
                        <h3><i className="fas fa-location-arrow"></i> Location current: {props.cityCurrent}, {props.countryCurrent}</h3>
                    }
                </div>

                {
                    props.today &&
                    <p><i class="fas fa-angle-right"></i> Forecast for today: {props.today}</p>
                }

                {
                    props.tomorrow &&
                    <p><i className="fas fa-angle-right"></i> Forecast for tomorrow: {props.tomorrow}</p>
                }
                {
                    props.twoDays &&
                    <p><i className="fas fa-angle-right"></i> Forecast for two days: {props.twoDays}</p>
                }
                {
                    props.threeDays &&
                    <p><i className="fas fa-angle-right"></i> Forecast for three days: {props.threeDays}</p>
                }
                {
                    props.fourDays &&
                    <p><i className="fas fa-angle-right"></i> Forecast for four days: {props.fourDays}</p>
                }
                {
                    props.fiveDays &&
                    <p><i className="fas fa-angle-right"></i> Forecast for five days: {props.fiveDays}</p>
                }
            </div>
            <form onSubmit={props.getWeatherCurrentCity} >
                <div>
                    <button onSubmit={props.getWeatherCurrentCity} className="btn btn-success btn-block">
                        Get Weather Current city
                    </button>
                </div>
            </form>

        </div>

    )
}

export default WeatherCurrentCity;
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData: Weather = new Weather(null, null, null, null, null);
    currentSpeedUnit = "kph";
    currentTempUnit = "celsius";
    currentLocation = "";
    icons = new Skycons({ "color": "#FFF" });

    constructor(private weather: WeatherService) { }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.weather.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.error(err));
    }

    getCurrentWeather() {
        this.weather.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"];
                this.weatherData.summary = weather["currently"]["summary"];
                this.weatherData.wind = weather["currently"]["windSpeed"];
                this.weatherData.humidity = weather["currently"]["humidity"];
                this.weatherData.icon = weather["currently"]["icon"];
            },
            err => console.error(err));
    }

    getLocationName() {
        this.weather.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                this.currentLocation = location["results"][2]["formatted_address"];
            });
    }

    toggleUnits() {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    }

    toggleTempUnits() {
        if (this.currentTempUnit == "fahrenheit") {
            this.currentTempUnit = "celsius";
        }
        else {
            this.currentTempUnit = "fahrenheit";
        }
    }

    toggleSpeedUnits() {
        if (this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        }
        else {
            this.currentSpeedUnit = "kph";
        }
    }
}
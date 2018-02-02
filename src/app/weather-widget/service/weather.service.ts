import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {
    getCurrentLocation(): [number, number] {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log("Position: ", position.coords.latitude, ", ", position.coords.longitude); //TODO: remove
                return [position.coords.latitude, position.coords.longitude];
            }, err => {
                console.error("Unable to get the position - ", err);
            })
        } else {
            console.error("Geolocation is not available");
            return [0,0];
        }
    }
}
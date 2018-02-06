import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string) {
        switch (unitType) {
            case "mph":
                const miles = speed * 1.6;
                return Number(miles).toFixed(0) + " mph";
            default:
                return Number(speed).toFixed(0) + " kph";
        }
    }
}
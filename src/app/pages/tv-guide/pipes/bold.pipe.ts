import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'boldPipe'
})

export class BoldPipe implements PipeTransform {
    transform(value: string): string {
        const dateArray = value.split('-');
        const boldText = `<b>${dateArray[0]}</b> - ${dateArray[1]}`;
        return boldText;
    }
}

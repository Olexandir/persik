import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/models/tariff';

@Component({
  selector: 'app-option',
  templateUrl: 'option.component.html',
  styleUrls: ['option.component.scss']
})

export class OptionComponent {

  public static selectedOption: Option;

  @Input() option: Option;
  @Output() selectEvent = new EventEmitter<Option>();
  @Output() borderEvent = new EventEmitter<string>();

  constructor() { }

  public get isOptionSelect(): boolean {
    if (OptionComponent.selectedOption) {
      return this.option.product_option_id === OptionComponent.selectedOption.product_option_id;
    }
    return false;
  }

  public selectOption(): void {
    OptionComponent.selectedOption = this.option;
    this.selectEvent.emit(this.option);
  }

}

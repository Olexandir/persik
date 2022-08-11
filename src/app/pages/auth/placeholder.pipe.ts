import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholderPipe'
})

export class PlaceholderPipe implements PipeTransform {
  transform(value: string, type: string) {
    if (value && value.length > 0) {
      if (type === 'email') {
        return value;
      }
      let mask = '';
      for (const _ of value) {
        mask += '*';
      }
      return mask;
    }
    return this.getPlaceholder(type);
  }

  private getPlaceholder(type: string): string {
    switch (type) {
      case 'email':
        return 'Введите Ваш email';
      case 'password':
        return 'Введите пароль';
      case 'regpass':
        return 'Пароль для регистрации';
      case 'regconfirm':
        return 'Подтверждение пароля';
      default:
        return '';
    }
  }
}

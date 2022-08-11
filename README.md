# PersikTvApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Development server

Для компиляции и запуска проекта с автоматическим открытием браузера `npm run start`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
-- Для сборки под webos необходимо установить ares и прописать его в глобальные переменные.
-- Для сборки андроид нужна cordova, gradle, android studio, команда build-android
получаем app-release.apk (автоматическая подпись не срабатывает) необходимо переименовать apk в zip открыть и удалить папку meta. Переименовать назад в apk и сделать подпись ключем android-sign (persik.keystore). Далее android-sign-final
-- Для сборки tizen необходимо один раз подключить сертификат командой npm run samsung-add-cert

## Build Android




## Backend troubles
1. Избранное прилетает массивом айдишек, а купленные массивом книг
2. Необходимо переделать запрос на рекомендованый контент из массива айдишек в нормальный человеческий вид


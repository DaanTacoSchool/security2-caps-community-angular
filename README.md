# Capscommunity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## Docker
note: requires composer

This app is dockerized. To use this with docker (without having to install node or npm etc.) run the following commands:
on linux:

Run `docker-compose build` in project root to build.
Then run `docker-compose run --rm client npm install` to install npm in container. 
Lastly to start the container run `docker-compose up` by default this displays debug info. to hide debug info append ` -d `.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

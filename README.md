# Inventory Management Angular Application

The current application use Angular(v12) UI framework as the frontend. 

## Description

This inventory management application is used to manage inventory and stock across multiple locations with two levels of administration and user management. The UI of the applications is built using angular and uses JWT token based authentication to verify the users. The angular app communicates with the API server present here https://github.com/gsam1999/inv-mgmt-api. The app can be installed on both windows and Linux.

## Installation

npm v7 is used to install the necessary dependencies. Use the following command to install the dependencies once inside the folder.

```bash
npm install

```
After the node modules are installed run 

```bash
ng serve
```
This starts the angular server on http://localhost:4200, if all the dependencies are installed properly.

The URI of the API server is defined at src/environments/environment.ts for localhost and src/environments/environment.prod.ts when building for production. Make sure the apiURL is pointing to the proper instance of API.

## Deployment to Production

refer to `https://angular.io/guide/deployment` to deploy the application to a server . To deploy the app to an existing website as a sub page use `ng build --base-href /sub-page/`.





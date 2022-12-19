# Facebook login mobile app:

### 🔴 App was recreated using GraphQL on 2020-04-01

## Stacks Used

- [x] Initial Screen containing one button that calls FB API
- [x] After clicking the button, the user should be able to login/signup with FB, if the user is already registered in the system, the user should be able to login, if the user is not registered, the user should be able to signup
- [x] After login/signup, the user should be redirected to the Dashboard screen

## Stacks Used

- [x] React Native
- [x] MongoDB
- [x] Express
- [x] NodeJS
- [x] GraphQL

## How to run the app

- [x] Clone the repo
- [x] Run `npm install` in the frontend directory
- [x] Run `npm install` in the backend directory
- [x] Start the backend server by running `npm start` in the backend directory
- [x] In the Backend Server, create a `.env` file and add the following variables:
  - [x] `PORT=3000`
  - [x] `DATABASE_URL=mongodb+srv://yasser:yasser@cluster0.oeahidh.mongodb.net/test?retryWrites=true&w=majority`
  - [x] `JWT_SECRET_KEY=secret`
- [x] Start the frontend server by running `npx expo start --clear` in the frontend directory, note that you will need an emulator to run the app
  - [x] Head to App.js and change the `uri` variable to your local IP address
- [x] Enjoy the app :)

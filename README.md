# Fuzzy Garbanzo - Food Recipe App

Fuzzy Garbanzo is a food recipe app that allows you to search for recipes, save your favorite recipes, and view your profile.

## Frontend Routes

- **Signup Page**: /
- **Login Page**: /login
- **Homepage Page**: /home
- **Favorite Page**: /fav
- **Details Page**: /details/:id
- **Search Page**: /search
- **Profile Page**: /profile

## Backend Routes

- **Register User**: POST /users/
- **Login User**: POST /users/login
- **Search for Recipes**: GET /recipe/search
- **Favorite Recipes**: 
  - Get Favorite Recipes: GET /recipe/saved
  - Save a Recipe: POST /recipe/saved

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v16.20.1 recommended)
- MongoDB installed and running

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ankits-svg/fuzzygarbanzo.git

2. Navigate to the project directory:
    ```bash
    cd fuzzygarbanzo

3. Install frontend dependencies:
    ```bash
    cd client
    npm install


4. Install backend dependencies:
    ```bash
    cd server
    npm install

5. Start the backend server (ensure MongoDB is running):
    ```bash
    npm run server

6. Start the frontend development server:
    ```bash
    cd client
    cd fuzzy_garbanzo
    npm start

7. The app should now be running. Open your web browser and go to http://localhost:3000/ to access the Fuzzy Garbanzo app.

## Screenshots

Here are some screenshots of the Fuzzy Garbanzo app:

### Register Page
<img src="https://github.com/masai-course/Ankit_fw19_0178/assets/103572350/b99acf4f-61a0-4def-a999-aafaa2f1bfc2" alt="Homepage Screenshot" width="500">

### Login Page
<img src="https://github.com/masai-course/Ankit_fw19_0178/assets/103572350/d9d15679-0678-4151-9bf4-7376e6a5fb54" alt="Register Page Screenshot" width="500">

### Home Page
<img src="https://github.com/masai-course/Ankit_fw19_0178/assets/103572350/404e2c45-d9f9-4b17-b6c3-0f02f2e2e8b3" alt="Homepage Screenshot" width="500">

### Favorite Page
<img src="https://github.com/masai-course/Ankit_fw19_0178/assets/103572350/e730a4cd-36d0-4e41-8859-25722a411ab2" alt="Search Page Screenshot" width="500">

### Details Page
<img src="https://github.com/masai-course/Ankit_fw19_0178/assets/103572350/425c5325-9a07-4bc4-bf3f-6e256f00eef0" alt="Homepage Screenshot" width="500">

### Without Search Page
<img src="https://github.com/masai-course/Ankit_fw19_0178/assets/103572350/cbc25665-5d0a-402d-b275-716671f647b3" alt="Search Page Screenshot" width="500">

### With Search Page
<img src="https://github.com/masai-course/Ankit_fw19_0178/assets/103572350/4ee198f3-c3ef-481b-a3d9-0b8af32189f1" alt="Search Page Screenshot" width="500">

### Profile Page
<img src="https://github.com/masai-course/Ankit_fw19_0178/assets/103572350/aa3785cd-5eb4-46a5-ac2c-b321522922a4" alt="Homepage Screenshot" width="500">


Frontend deployed link:

    


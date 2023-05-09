# homeostasis

Homeostasis is a web application that aims to replicate Airbnb, allowing users to browse properties available for rent. Homeostasis is built with a Express/Sequelize backend and a React/Redux frontend for responsiveness.

[Click here to view homeostasis' Live Site](https://homeostasis.onrender.com/)

<img width="700" alt="Screen Shot 2023-05-08 at 1 38 56 PM" src="https://user-images.githubusercontent.com/108374623/236904924-f25944f8-44a8-424d-8e96-f53b5fc0575c.png">


## Navigate to:

[User Stories](https://github.com/zmare/homeostasis/wiki/User-Stories)\
[Feature List](https://github.com/zmare/homeostasis/wiki/Features)\
[Database Schema](https://github.com/zmare/homeostasis/wiki/Database-Schema)\
[Backend Routes](https://github.com/zmare/homeostasis/wiki/API-Routes)\
[Frontend Store Shape](https://github.com/zmare/homeostasis/wiki/Redux-Store-State-Shape)\
[Wireframe](https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-16/AirBnB+MVP+Wireframes.pdf)

## Technologies/Frameworks Used:

### Frontend:
![JavaScript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-676E77?style=for-the-badge&logo=react&logoColor=#61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend:
![JavaScript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/-Sequelize-D71F00?style=for-the-badge&logo=sequelize)
![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

### Deployment:
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)



# Features:

## Demo User Implementation:

* Feel free to test the site features through clicking the "Demo User" button which will directly log you in

<img width="700" alt="Screen Shot 2023-05-08 at 1 49 08 PM" src="https://user-images.githubusercontent.com/108374623/236907150-0c64f46a-a059-46f0-a7f5-d49101727059.png">

## Sign up a User:

* You will be able to sign up and automatically be redirected to the logged in page
* There are validations for signing up such as username length requirements, valid email address, password length, etc
* Passwords must be matching when entered twice or the signup button will be disabled
* Friendly reminders will display and signup will be blocked if fields are not properly filled out

<img width="700" alt="Screen Shot 2023-05-08 at 1 50 10 PM" src="https://user-images.githubusercontent.com/108374623/236907372-8a09b87e-197d-40df-a162-2d25c5f74bb1.png">

## User Login, Authentication, and Authorization:

* You are able to login as long as your credentials are stored within the database (hashed)
  * Authorization is handled using JWT 
* If there are no matching credentials an error message is displayed
* Login button is disabled if there are null fields or if the amount of characters entered is not within the acceptable range

<img width="700" alt="Screen Shot 2023-05-08 at 1 51 29 PM" src="https://user-images.githubusercontent.com/108374623/236907671-aed669a0-b725-47e1-bdae-e04e9b85e3c4.png">


## Create a Spot
* Users are able to create a spot and add images that show off this spot's features
<img width="700" alt="Screen Shot 2023-05-08 at 1 53 12 PM" src="https://user-images.githubusercontent.com/108374623/236908021-1936202c-9560-42f2-b465-4cd1412dc3f0.png">

## Mark Spot as a Favorite
* Users can either add or remove a spot from their favorites list. These can be reviewed and managed under their "My Favorites" list
<img width="700" alt="Screen Shot 2023-05-08 at 1 55 45 PM" src="https://user-images.githubusercontent.com/108374623/236908551-8a8b8b49-789a-4508-a0a1-07b7784a5615.png">

## Write a review 
* Users can write, edit, and delete a review they leave for a spot
<img width="700" alt="Screen Shot 2023-05-08 at 1 56 40 PM" src="https://user-images.githubusercontent.com/108374623/236908737-f9bfaa65-63de-4012-bdc5-6c4f642ea2a1.png">


## Features Coming Soon:
* AWS for Image Uploads


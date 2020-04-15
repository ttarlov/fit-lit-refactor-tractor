# Fit-Lit-Refactor-Tractor

As a team, we were tasked to refactor a pre-existing repo called, Fit-Lit. Fit-Lit is an app that tracks a user's hydration, activity, and sleep. The app also includes user information such days active, daily step goal, friends list, and more!

#### So what did we refactor? Good question! 
- Leveraged Sass to DRY up the CSS, including utilizing partials, variables, a mixin and an extends
- Used inheritance to create a parent class, (the Calculator class) to DRY up our code even further
- Improved our accessibility score from a 57 to a 92
- Updated all DOM manipulation to be done with jQuery
- Implemented testing with spies
- Implemented the fetch API for accessing data from a server
- While refactoring, we added 3 buttons at the top of the screen called, 'Update Activity', 'Update Sleep', and 'Update Hydration'. Upon clicking these buttons, the user can fill in their updated information for each activity and submit. Upon submitting, this information is posting the new information to the API. Otherwise, they can click the back button to return to the home screen.

## GIF of working application
![fit-lit-refactor-tractor-gif](https://media.giphy.com/media/kfdjmEhG8DEMfk1tsI/giphy.gif)

## Setup

1. Clone down this repo
2. Install the library dependencies. Run: 
```
npm install
```
3. Then, run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see the page there! Then, you can enter `control + c` in your terminal to stop the server at any time.

## Technologies Used
This project had a lot of moving pieces and parts and was the FIRST time we had ever used the following:
- jQuery
- Sass
- Chai Spies
- Mocha
- the fetch API
- webpack
- chart.js
- moment.js

## Contributors
- Taras Tarlov
- Carlos Flores
- Michelle Kaplan

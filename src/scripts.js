import './css/base.scss';
import $ from 'jquery'
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import moment from "moment";
import domUpdates from './dom-updates.js'
import Chart from 'chart.js';
import Calculator from './Calculator';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import ApiController from './api-controller';

let api = new ApiController();
let userNowId;

const fetchData = () => {
  let userData = api.getUsersData()
  let hydrationData = api.getHydrationData();
  let sleepData = api.getSleepData();
  let activityData = api.getActivityData();

  Promise.all([userData, hydrationData, sleepData, activityData])
    .then(finalValues => {
      let userData = finalValues[0];
      let hydrationData = finalValues[1];
      let sleepData = finalValues[2];
      let activityData = finalValues[3];
      startApp(userData.userData, hydrationData.hydrationData, sleepData.sleepData, activityData.activityData);
    }).catch(error => console.log(error.message))
}

const updateChart = (daysOftheWeek, data, chartId, chartLabel, units) => {
  var ctx = document.getElementById(`${chartId}`).getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: daysOftheWeek,
      datasets: [{
        label: `${chartLabel}`,
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: units
          }
        }]
      }
    }
  });
}

const makeChartData = (dataArry, chartId, chartLabel, units) => {
  let dataForAWeek = dataArry;
  let data = [];
  let daysOftheWeek = []
  dataForAWeek.forEach(day => {
    data.push(day.split(":").pop())
  })
  dataForAWeek.forEach(day => {
    daysOftheWeek.push(day.split(":").shift())
  })
  updateChart(daysOftheWeek, data, chartId, chartLabel, units)
};

function startApp(userData, hydrationData, sleepData, activityData) {
  let userList = [];
  makeUsers(userData, userList);
  let calc = new Calculator()
  let userRepo = new UserRepo(userList, domUpdates);
  let hydrationRepo = new Hydration(hydrationData);
  let sleepRepo = new Sleep(sleepData);
  userNowId = pickUser();
  let activityRepo = new Activity(activityData);
  let userNow = getUserById(userNowId, userRepo);
  let today = moment().format("YYYY-MM-DD").split('-').join('/');
  let randomHistory = calc.makeRandomDate(userRepo, userNowId, hydrationData)
  let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);

  userRepo.calculateAverageStepGoal();
  domUpdates.addInfoToSidebar(userNow, userRepo, randomHistory)
  hydrationRepo.calculateAverageData("hydrationData", userNowId, "numOunces").toFixed(1)
  domUpdates.addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory)
  // hydration translations
  makeChartData(hydrationRepo.calculateRandomWeekData(randomHistory, userNowId, userRepo, "hydrationData", "numOunces"), "randomWeekHydrationChart", "OZs of Water", "Ounces");
  makeChartData(hydrationRepo.calculateWeeklyData(userRepo, userNowId, "hydrationData", "numOunces"), "thisWeekHydrationChart", "OZs of Water", "Ounces");
  domUpdates.addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory)
  // sleep random translation
  makeChartData(sleepRepo.calculateRandomWeekData(randomHistory, userNowId, userRepo, "sleepData", "hoursSlept"), "sleepEarlierWeekChart", "Hours of Sleep", "Hours");
  // sleep translation
  makeChartData(sleepRepo.calculateWeeklyData(userRepo, userNowId, "sleepData", "hoursSlept"), "sleepThisWeekChart", "Hours of Sleep", "Hours");
  sleepRepo.calculateAverageSleepQuality(userNowId)
  domUpdates.addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow)
  makeChartData(activityRepo.calculateWeeklyData(userRepo, userNowId, "activityData", "numSteps"), "stepsThisWeekChart", "Number of Steps", "Steps");
  makeChartData(activityRepo.calculateWeeklyData(userRepo, userNowId, "activityData", "flightsOfStairs"), "stairsThisWeekChart", "Flights Of Stairs", "Number of Stairs");
  makeChartData(activityRepo.calculateWeeklyData(userRepo, userNowId, "activityData", "minutesActive"), "minutesThisWeekChart", "Minutes of Activity", "Minutes");
  makeChartData(activityRepo.calculateWeeklyData(userRepo, winnerNow, "activityData", "numSteps"), "bestUserStepsChart", "Steps", "Steps")

  domUpdates.addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow)
}

function makeUsers(userData, array) {
  userData.forEach(function(dataItem) {
    let user = new User(dataItem);
    array.push(user);
  })
}

function pickUser() {
  // return 2;
  // return 9;
  return Math.floor(1 + Math.random() * 50)
}

function getUserById(id, listRepo) {
  return listRepo.getDataFromID(id);
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

const eventHandler = (event) => {
  if (event.target.classList.contains('activity-button')) {
    domUpdates.showActivityForm();
  } else if (event.target.classList.contains('sleep-button')) {
    domUpdates.showSleepForm();
  } else if (event.target.classList.contains('back-button')) {
    $('.pop-up-card').hide();
    $('.main-column-hydration, .main-column-activity, .main-column-sleep').removeClass('blur');
  } else if (event.target.classList.contains('activity-submit-button')) {
    api.postActivityData(userNowId, $('#date').val().split('-').join('/'), $('#numSteps').val(), $('#minutesActive').val(), $('#flightsOfStairs').val())
    $('.pop-up-card').hide();
    $('.main-column-hydration, .main-column-activity, .main-column-sleep').removeClass('blur');
  } else if (event.target.classList.contains('sleep-submit-button')) {
    api.postSleepData(userNowId, $('#date').val().split('-').join('/'), $('#hours-slept').val(), $('#sleep-quality').val())
    $('.pop-up-card').hide();
    $('.main-column-hydration, .main-column-activity, .main-column-sleep').removeClass('blur');
  } else if (event.target.classList.contains('hydration-button')) {
    domUpdates.showHydrationForm()
  } else if (event.target.classList.contains("hydration-submit-button")) {
    api.postHydrationData(userNowId, $('#date').val().split('-').join('/'), $("#numOunces").val())
    $('.pop-up-card').hide();
    $('.main-column-hydration, .main-column-activity, .main-column-sleep').removeClass('blur');
  }
}

fetchData();
$('body').click(eventHandler);

import $ from 'jquery'
import ApiController from './api-controller';
import moment from "moment";
import Chart from 'chart.js';

let domUpdates = {



  displayAverageStepGoal(averageStepGoal) {
    $('#avStepGoalCard').text(`The average daily step goal is ${averageStepGoal}`);
  },

  addInfoToSidebar(user, userStorage,randomHistory) {

    $('.historicalWeek').prepend(`Week of ${randomHistory}`);

    $('#sidebarName').text(user.name);
    $('#headerText').text(`${user.getFirstName()}'s Activity Tracker`);
    $('#stepGoalCard').text(`Your daily step goal is ${user.dailyStepGoal}.`);
    $('#avStepGoalCard').text(`The average daily step goal is ${userStorage.calculateAverageStepGoal()}`);
    $('#userAddress').text(user.address);
    $('#userEmail').text(user.email);
    $('#userStridelength').text(`Your stridelength is ${user.strideLength} meters.`);
    $('#friendList').prepend(this.makeFriendHTML(user, userStorage));

  },

  makeFriendHTML(user, userStorage) {
    return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
  },

  makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
    return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  },

  makeStepStreakHTML(id, activityInfo, userStorage, method) {
    return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  },

  addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
    $('#hydrationToday').prepend(`<p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyData("hydrationData", id, dateString, "numOunces")}</span></p><p>oz water today.</p>`);
    $('#hydrationAverage').prepend(`<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageData("hydrationData", id, "numOunces").toFixed(1)}</span></p> <p>oz per day.</p>`);
    $('#hydrationEarlierWeek').prepend(`<canvas id="randomWeekHydrationChart" style="display: block;height: 206px; width: 251px;"></canvas>`);
    $('#hydrationThisWeek').prepend(`<canvas id="thisWeekHydrationChart" style="display: block;height: 206px;width: 251px;"></canvas>`);
  },

  addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
    $('#sleepToday').prepend(`<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailyData("sleepData", id, dateString, "hoursSlept")}</span></p> <p>hours today.</p>`);
    $('#sleepQualityToday').prepend(`<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`);
    $('#sleepThisWeek').prepend(`<canvas id="sleepThisWeekChart" style="display: block;height: 261px;width: 316px;"></canvas>`);
    $('#sleepEarlierWeek').prepend(`<canvas id="sleepEarlierWeekChart" style="display: block;height: 261px;width: 316px;"></canvas>`);

  },

  displayAverageUserSleepQuality(averageSleepQuality) {
    $('#avUserSleepQuality').prepend(`<p>The average user's sleep quality is</p> <p><span class="number">${averageSleepQuality}</span></p><p>out of 5.</p>`);

  },

  addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
    $('#friendChallengeListToday').prepend(this.makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
    $('#streakList').prepend(this.makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
    $('#streakListMinutes').prepend(this.makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
    $('#friendChallengeListHistory').prepend(this.makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
    $('#bigWinner').prepend(`THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`);

  },

  addActivityInfo(userNowId, activityRepo, today, userRepo) {
    $('#userStairsToday').prepend(`<p>Stair Count:</p><p>You</><p><span class="number">${activityRepo.userDataForToday(userNowId, today, userRepo, 'flightsOfStairs')}</span></p>`)
    $('#avgStairsToday').prepend(`<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(today, userRepo, 'flightsOfStairs')}</span></p>`)
    $('#userStepsToday').prepend(`<p>Step Count:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(userNowId, today, userRepo, 'numSteps')}</span></p>`)
    $('#avgStepsToday').prepend(`<p>Step Count Today:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(today, userRepo, 'numSteps')}</span></p>`)
    $('#userMinutesToday').prepend(`<p>Active Minutes:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(userNowId, today, userRepo, 'minutesActive')}</span></p>`)
    $('#avgMinutesToday').prepend(`<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(today, userRepo, 'minutesActive')}</span></p>`)
    $('#userStepsThisWeek').prepend(`<canvas id="stepsThisWeekChart" style="display: block;height: 261px;width: 316px;"></canvas>`)
    $('#userStairsThisWeek').prepend(`<canvas id="stairsThisWeekChart" style="display: block;height: 261px;width: 316px;"></canvas>`)
    $('#userMinutesThisWeek').prepend(`<canvas id="minutesThisWeekChart" style="display: block;height: 261px;width: 316px;"></canvas>`)
    $('#bestUserSteps').prepend(`<canvas id="bestUserStepsChart" style="display: block;height: 261px;width: 316px;"></canvas>`)
  },

  showHydrationForm() {
    $('.body-main-infoContainter').prepend(
      `<section class="pop-up-card">
      <form method="post">
        <h3>Log your hydration</h3>
        <div class="container">
        <label for="date">Date</label>
        <input id="date" type="date" name="date" value="${moment().format("YYYY-MM-DD")}"></input>
        </div>
        <div class="container">
        <label for="number-of-oz">Number of Oz</label>
        <input id="numOunces" type="number" name="number-of-ozs"></input>
        </div>
        <div class="container">
        <button class="hydration-submit-button" type="button" name="submit">Submit</button>
        <button class="back-button" type="button" name="button">Back</button>
        </div>
      </form>
    </section>`)
    $('.main-column-hydration, .main-column-activity, .main-column-sleep').addClass('blur')
  },

  showActivityForm() {
    $('.body-main-infoContainter').prepend(
      `<section class="pop-up-card">
      <form method="post">
        <h3>Log your activity</h3>
        <div class="container">
        <label for="date">Date</label>
        <input id="date" type="date" name="date" value="${moment().format("YYYY-MM-DD")}"></input>
        </div>
        <div class="container">
        <label for="step-count">Step Count</label>
        <input id="numSteps" type="number" name="step-count"></input>
        </div>
        <div class="container">
        <label for="minutes-active">Minutes Active</label>
        <input id="minutesActive" type="number" name="minutes-active"></input>
        </div>
        <div class="container">
        <label for="flights-of-stairs">Flights of Stairs</label>
        <input id="flightsOfStairs" type="number" name="flights-of-stairs"></input>
        </div>
        <div class="container">
        <button class="activity-submit-button" type="button" name="submit">Submit</button>
        <button class="back-button" type="button" name="button">Back</button>
        </div>
      </form>
    </section>`)
    $('.main-column-hydration, .main-column-activity, .main-column-sleep').addClass('blur')
  },

  showSleepForm() {
    $('.body-main-infoContainter').prepend(
      `<section class="pop-up-card">
      <form method="post">
        <h3>Log your sleep</h3>
        <div class="container">
        <label for="date">Date</label>
        <input id="date" type="date" name="date" value="${moment().format("YYYY-MM-DD")}"></input>
        </div>
        <div class="container">
        <label for="hours-slept">Hours Slept</label>
        <input id="hours-slept" type="number" name="hours-slept"></input>
        </div>
        <div class="container">
        <label for="sleep-quality">Sleep Quality</label>
        <input id="sleep-quality" type="number" name="sleep-quality"></input>
        </div>
        <div class="container">
        <button class="sleep-submit-button" type="button" name="submit">Submit</button>
        <button class="back-button" type="button" name="button">Back</button>
        </div>
      </form>
    </section>`)
    $('.main-column-hydration, .main-column-activity, .main-column-sleep').addClass('blur')
  }



}


export default domUpdates

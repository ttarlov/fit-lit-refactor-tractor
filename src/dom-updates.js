import $ from 'jquery'
import ApiController from './api-controller';
import moment from "moment";
import Chart from 'chart.js';

let domUpdates = {


  addInfoToSidebar(user, userStorage,randomHistory) {
    $('.historicalWeek').prepend(`Week of ${randomHistory}`)
    $('#sidebarName').text(user.name)
    $('#headerText').text(`${user.getFirstName()}'s Activity Tracker`)
    $('#stepGoalCard').text(`Your daily step goal is ${user.dailyStepGoal}.`)
    avStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`;
    $('#userAddress').text(user.address)
    $('#userEmail').text(user.email)
    $('#userStridelength').text(`Your stridelength is ${user.strideLength} meters.`)
    $('#friendList').prepend(this.makeFriendHTML(user, userStorage))

  },

  makeFriendHTML(user, userStorage) {
    return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
  },

  addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
    $('#hydrationToday').prepend(`<p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyData("hydrationData", id, dateString, "numOunces")}</span></p><p>oz water today.</p>`);
    $('#hydrationAverage').prepend(`<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageData("hydrationData", id, "numOunces").toFixed(1)}</span></p> <p>oz per day.</p>`)
    $('#hydrationEarlierWeek').prepend(`<canvas id="randomWeekHydrationChart" style="display: block;height: 206px; width: 251px;"></canvas>`);
    $('#hydrationThisWeek').prepend(`<canvas id="thisWeekHydrationChart" style="display: block;height: 206px;width: 251px;"></canvas>`);
  },




}


export default domUpdates

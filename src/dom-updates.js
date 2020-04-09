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
  }









}


export default domUpdates

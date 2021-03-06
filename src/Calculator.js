import domUpdates from './dom-updates.js'

class Calculator {
  constructor() {
  }

  calculateAverageData(fullData, id, property) {
    let perDayUserData = this[fullData].filter((data) => id === data.userID);
    let averagePerDayUserData = perDayUserData.reduce((sumSoFar, data) => {
      return sumSoFar += data[property];
    }, 0) / perDayUserData.length;
    return averagePerDayUserData;
  }

  calculateDailyData(fullData, id, date, property) {
    let findDataByDate = this[fullData].find((data) => id === data.userID && date === data.date);
    if (findDataByDate === undefined) {
      return "0"
    } else {
      return findDataByDate[property];
    }
  }

  makeRandomDate(userStorage, id, dataSet) {
    let sortedArray = userStorage.makeSortedUserArray(id, dataSet);
    let calculatedSortedArray = sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
    return calculatedSortedArray;
  }

  calculateWeeklyData(userRepo, id, dataSet, property) {
    let firstweekData = userRepo.getFirstWeek(id, this[dataSet])
    let newDataObj = firstweekData.map((data) => `${data.date}: ${data[property]}`)
    return newDataObj
  }

  calculateRandomWeekData(date, id, userRepo, dataSet, property) {
    if (dataSet === undefined) {
      return "0"
    } else {
      return userRepo.getWeekFromDate(date, id, this[dataSet]).map((data) => `${data.date}: ${data[property]}`);
    }
  }
}

export default Calculator

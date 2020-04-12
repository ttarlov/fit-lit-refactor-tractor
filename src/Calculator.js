import domUpdates from './dom-updates.js'

class Calculator {
  constructor() {
  }

  calculateAverageData(fullData, id, property) {
    let perDayUserData = this[fullData].filter((data) => id === data.userID);
    return perDayUserData.reduce((sumSoFar, data) => {
      return sumSoFar += data[property];
    }, 0) / perDayUserData.length;
  }

  calculateDailyData(fullData, id, date, property) {
    let findDataByDate = this[fullData].find((data) => id === data.userID && date === data.date);
    if(findDataByDate === undefined) {
      return "0"
    } else {
      return findDataByDate[property];
    }
  }

  makeRandomDate(userStorage, id, dataSet) {
    let sortedArray = userStorage.makeSortedUserArray(id, dataSet);
    let calculatedSortedArray = sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
    return calculatedSortedArray
  }


  // new abstraction
  calculateWeeklyData(date, id, userStorage, dataSet, property) {
    return userStorage.getFirstWeek(id, this[dataSet]).map((data) => {
      `${data[date]}: ${data[property]}`
    });
  }

  calculateRandomWeekData(date, id, userStorage, dataSet, property) {
    console.log('date', date)
    console.log('id', id)
    console.log('userRepo', userStorage)
    console.log('data', dataSet)
    console.log('ounces', property)
    return userStorage.getWeekFromDate(date, id, this[dataSet]).map((data) => `${data[date]}: ${data[property]}`);
  }
}

export default Calculator

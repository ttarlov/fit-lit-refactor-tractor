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
    return findDataByDate[property];
  }


}


export default Calculator

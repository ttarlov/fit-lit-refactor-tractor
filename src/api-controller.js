class ApiController {
  constructor() {
    this.rootUrl = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908"
  }

  getUsersData() {
    let url = `${this.rootUrl}/users/userData`
    return fetch(url).then(response => response.json());
  }

  getActivityData() {
    let url = `${this.rootUrl}/activity/activityData`
    return fetch(url).then(response => response.json());
  }

  getSleepData() {
    let url = `${this.rootUrl}/sleep/sleepData`
    return fetch(url).then(response => response.json());
  }

  getHydrationData() {
    let url = `${this.rootUrl}/hydration/hydrationData`
    return fetch(url).then(response => response.json());
  }

  postActivityData(id, date, numSteps, minutesActive, flightsOfStairs) {
    let activityObject = {
      "userID": Number(id),
      "date": date,
      "numSteps": Number(numSteps),
      "minutesActive": Number(minutesActive),
      "flightsOfStairs": Number(flightsOfStairs)
    }
    let url = `${this.rootUrl}/activity/activityData`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activityObject),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

  postSleepData(id, date, hoursSlept, sleepQuality) {
    let sleepObj = {
      "userID": Number(id),
      "date": date,
      "hoursSlept": Number(hoursSlept),
      "sleepQuality": Number(sleepQuality),
    }

    let url = `${this.rootUrl}/sleep/sleepData`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sleepObj),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

  postHydrationData(id, date, numOunces) {
    let hydrationObj = {
      "userID": Number(id),
      "date": date,
      "numOunces": Number(numOunces)
    }

    let url = `${this.rootUrl}/hydration/hydrationData`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hydrationObj),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }
}


export default ApiController;

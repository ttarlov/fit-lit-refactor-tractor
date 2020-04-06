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

  postActivityData(activityObject) {
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

  postSleepData(sleepObject) {
    let url = `${this.rootUrl}/sleep/sleepData`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sleepObject),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

}


module.exports = ApiController;

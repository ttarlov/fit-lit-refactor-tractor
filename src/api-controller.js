class ApiController {
  constructor() {
    this.rootUrl = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908"
  }


  getUsersData() {
    let url = `${this.rootUrl}/users/userData`
    return fetch(url).then(response => response.json());
  }

  getActivityData() {

  }


 getSleepData() {
   let url = `${this.rootUrl}/sleep/sleepData`
   return fetch(url).then(response => response.json());
 }


 getHydrationData() {
   let url = `${this.rootUrl}/hydration/hydrationData`
   return fetch(url).then(response => response.json());
 }

}


module.exports = ApiController;

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

 }


 getHydrationData() {

 }

}


module.exports = ApiController;

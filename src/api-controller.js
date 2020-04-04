class ApiController {
  constructor() {
    this.rootUrl = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908"
  }


  getUsers() {
    let url = `${this.rootUrl}/users/userData`
    return fetch(url).then(response => response.json());
  }

  


}

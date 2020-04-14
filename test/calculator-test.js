import Calculator from '../src/Calculator'

import chai from 'chai';
const expect = chai.expect;

const spies = require("chai-spies");
chai.use(spies);

import $ from 'jquery'
import moment from "moment";
import domUpdates from "../src/dom-updates.js"
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Calculator Class', function(){
  let hydrationData;
  let sleepData;
  let activityData;
  let calc;
  let users;
  let user1;
  let user2;
  let user3;
  let user4;
  let user5;
  let userRepo


beforeEach(function(){

  user1 = new User({
    id: 1,
    name: "Alex Roth",
    address: "1234 Turing Street, Denver CO 80301-1697",
    email: "alex.roth1@hotmail.com",
    strideLength: 4.3,
    dailyStepGoal: 10000,
    friends: [2, 3, 4]
  });
  user2 = new User({
    id: 2,
    name: "Allie McCarthy",
    address: "1235 Turing Street, Denver CO 80301-1697",
    email: "allie.mcc1@hotmail.com",
    strideLength: 3.3,
    dailyStepGoal: 9000,
    friends: [1, 3, 4]
  });
  user3 = new User({
    id: 3,
    name: "The Rock",
    address: "1236 Awesome Street, Denver CO 80301-1697",
    email: "therock@hotmail.com",
    strideLength: 10,
    dailyStepGoal: 60000,
    friends: [1, 2, 4]
  });

  user4 = new User({
    id: 4,
    name: "Rainbow Dash",
    address: "1237 Equestria Street, Denver CO 80301-1697",
    email: "rainbowD1@hotmail.com",
    strideLength: 3.8,
    dailyStepGoal: 7000,
    friends: [1, 2, 3]
  });

  user5 = new User({
    id: 5,
    name: "Bugs Bunny",
    address: "1234 Looney Street, Denver CO 80301-1697",
    email: "BugsB1@hotmail.com",
    strideLength: 3.8,
    dailyStepGoal: 7000,
    friends: [1, 2, 3]
  });

  users = [user1, user2, user3, user4, user5];
  userRepo = new UserRepo(users);

  hydrationData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 38
    },
    {
      "userID": 1,
      "date": "2019/05/09",
      "numOunces": 1
    },
    {
      "userID": 2,
      "date": "2019/04/15",
      "numOunces": 36
    },
    {
      "userID": 1,
      "date": "2018/10/23",
      "numOunces": 34
    },
    {
      "userID": 2,
      "date": "2018/06/16",
      "numOunces": 39
    },
    {
      "userID": 1,
      "date": "2018/03/30",
      "numOunces": 2
    },
    {
      "userID": 2,
      "date": "2018/02/01",
      "numOunces": 28
    },
    {
      "userID": 1,
      "date": "2016/08/22",
      "numOunces": 30
    },
    {
      "userID": 2,
      "date": "2016/05/14",
      "numOunces": 3
    },
 ];

 sleepData = [{
     "userID": 1,
     "date": "2017/06/15",
     "hoursSlept": 6.1,
     "sleepQuality": 2.2
   },
   {
     "userID": 2,
     "date": "2017/06/15",
     "hoursSlept": 7,
     "sleepQuality": 4.7
   },
   {
     "userID": 1,
     "date": "2017/06/16",
     "hoursSlept": 2,
     "sleepQuality": 3
   },
   {
     "userID": 2,
     "date": "2017/06/16",
     "hoursSlept": 5.4,
     "sleepQuality": 3
   },
   {
     "userID": 1,
     "date": "2018/07/17",
     "hoursSlept": 4.1,
     "sleepQuality": 3.6
   },
   {
     "userID": 2,
     "date": "2018/07/17",
     "hoursSlept": 9.6,
     "sleepQuality": 2.9
   },
   {
     "userID": 1,
     "date": "2018/07/18",
     "hoursSlept": 2,
     "sleepQuality": 3
   },
   {
     "userID": 2,
     "date": "2018/07/18",
     "hoursSlept": 8.1,
     "sleepQuality": 3.5
   },
   {
     "userID": 1,
     "date": "2019/05/19",
     "hoursSlept": 8.9,
     "sleepQuality": 2.2
   },
   {
     "userID": 2,
     "date": "2019/05/19",
     "hoursSlept": 4.4,
     "sleepQuality": 1.6
   },
 ];

 activityData = [{
     "userID": 1,
     "date": "2019/06/15",
     "numSteps": 1000,
     "minutesActive": 90,
     "flightsOfStairs": 70
   },
   {
     "userID": 2,
     "date": "2019/06/15",
     "numSteps": 50000,
     "minutesActive": 120,
     "flightsOfStairs": 200
   },
   {
     "userID": 1,
     "date": "2019/06/16",
     "numSteps": 11374,
     "minutesActive": 213,
     "flightsOfStairs": 13
   },
   {
     "userID": 2,
     "date": "2019/06/16",
     "numSteps": 14810,
     "minutesActive": 287,
     "flightsOfStairs": 18
   },
   {
     "userID": 1,
     "date": "2019/06/17",
     "numSteps": 2634,
     "minutesActive": 107,
     "flightsOfStairs": 5
   },
   {
     "userID": 2,
     "date": "2019/06/17",
     "numSteps": 10333,
     "minutesActive": 114,
     "flightsOfStairs": 31
   },
   {
     "userID": 1,
     "date": "2019/06/18",
     "numSteps": 6389,
     "minutesActive": 41,
     "flightsOfStairs": 33
   },
   {
     "userID": 2,
     "date": "2019/06/18",
     "numSteps": 8015,
     "minutesActive": 106,
     "flightsOfStairs": 37
   },
   {
     "userID": 1,
     "date": "2019/06/19",
     "numSteps": 11652,
     "minutesActive": 20,
     "flightsOfStairs": 24
   },
   {
     "userID": 2,
     "date": "2019/06/19",
     "numSteps": 9256,
     "minutesActive": 108,
     "flightsOfStairs": 2
   }
];


}); //Before Each close here


it('should be an instance of Calculator Class', function(){
  calc= new Calculator()
  expect(calc).to.be.an.instanceof(Calculator)

});

describe('calculateAverageData Method', function(){

  it('should be able to calculate average average number of steps for a given user', function(){
    calc = new Calculator()
    calc.activityData = activityData;
    expect(calc.calculateAverageData("activityData", 1, "numSteps")).to.eq(6609.8)
  });

  it('should be able to calculate average flight of stairs for a given user', function(){
    calc = new Calculator()
    calc.activityData = activityData;
    expect(calc.calculateAverageData("activityData", 2, "flightsOfStairs")).to.eq(57.6)
  });

  it('should be able to calculate average minutesActive for a given user', function(){
    calc = new Calculator()
    calc.activityData = activityData;
    expect(calc.calculateAverageData("activityData", 1, "minutesActive")).to.eq(94.2)
  });

  it('should be able to calculate average hoursSlept for a given user', function(){
    calc = new Calculator()
    calc.sleepData = sleepData;
    expect(calc.calculateAverageData("sleepData", 1, "hoursSlept")).to.eq(4.62)
  });

  it('should be able to calculate average sleepQuality for a given user', function(){
    calc = new Calculator()
    calc.sleepData = sleepData;
    expect(calc.calculateAverageData("sleepData", 1, "sleepQuality")).to.eq(2.8)
  });

  it('should be able to calculate average number of Ozs consumed for a given user', function(){
    calc = new Calculator()
    calc.hydrationData = hydrationData;
    expect(calc.calculateAverageData("hydrationData", 2, "numOunces")).to.eq(28.8)
  });
});

  describe('calculateDailyData Method', function(){

    it('HAPPY PATH: should be able to calculate hydration for a specific day for a specific user', function(){
      calc = new Calculator()
      calc.hydrationData = hydrationData;
      expect(calc.calculateDailyData("hydrationData", 2, "2019/04/15", "numOunces")).to.eq(36)
    });
    it('SAD PATH: should return "0" if no data is found', function(){
      calc = new Calculator()
      calc.hydrationData = hydrationData;
      expect(calc.calculateDailyData("hydrationData", 2, "2017/04/15", "numOunces")).to.eq("0")
    });

    it('HAPPY PATH: should be able to calculate sleep for a specific day for a specific user', function(){
      calc = new Calculator()
      calc.sleepData = sleepData;
      expect(calc.calculateDailyData("sleepData", 2, "2018/07/17", "hoursSlept")).to.eq(9.6)
    });

    it('SAD PATH: should return "0" if no data is found', function(){
      calc = new Calculator()
      calc.sleepData = sleepData;
      expect(calc.calculateDailyData("sleepData", 2, "2017/04/15", "hoursSlept")).to.eq("0")
    });

  });


  describe('makeRandomDate Method', function(){

    it.skip('should make a random date', function(){
      calc = new Calculator()
      expect(calc.makeRandomDate(userRepo, 2, hydrationData)).match.typeOf("string")
    });


  });





}); // Main Describe Closes here

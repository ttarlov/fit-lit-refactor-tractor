import Calculator from '../src/Calculator'

import chai from 'chai';
const expect = chai.expect;

const spies = require("chai-spies");
chai.use(spies);

import $ from 'jquery'
import moment from "moment";
import domUpdates from "../src/dom-updates.js"

describe('Calculator Class', function(){

  let hydrationData;
  let sleepData;
  let activityData;
  let calc;

beforeEach(function(){

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


it.skip('should be an instance of Calculator Class', function(){
  expect(calc).to.be.an.instanceof(Calculator)

});

describe('calculateAverageData Method', function(){

  it('should be able to calculate average average number of steps for a given user', function(){
    calc = new Calculator()
    calc.activityData = activityData;
    expect(calc.calculateAverageData("activityData", 1, "numSteps")).to.eq(6609.8)
  });

  it.only('should be able to calculate average flight of stairs for a given user', function(){
    calc = new Calculator()
    calc.activityData = activityData;
    expect(calc.calculateAverageData("activityData", 2, "flightsOfStairs")).to.eq(57.6)
  });

  it('', function(){

  });


});





}); // Main Describe Closes here

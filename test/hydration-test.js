import { expect } from 'chai';

import chai from 'chai';

const spies = require('chai-spies')
chai.use(spies)

import Hydration from '../src/Hydration';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import moment from "moment";
import domUpdates from '../src/dom-updates.js'

describe('Hydration', function() {
  let hydrationData;
  let hydration;
  let today;
  let userRepo;
  let users;
  let user3;
  let user4;

  afterEach(() => {
    chai.spy.restore(domUpdates);
  })

  beforeEach(function() {
    chai.spy.on(domUpdates, "calculateDailyData", () => {});
    today = moment().format("YYYY-MM-DD")

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
      "userID": 3,
      "date": "2019/05/09",
      "numOunces": 1
    },
    {
      "userID": 4,
      "date": "2019/04/15",
      "numOunces": 36
    },
    {
      "userID": 2,
      "date": "2018/10/23",
      "numOunces": 34
    },
    {
      "userID": 1,
      "date": "2018/06/16",
      "numOunces": 39
    },
    {
      "userID": 3,
      "date": "2018/03/30",
      "numOunces": 2
    },
    {
      "userID": 4,
      "date": "2018/02/01",
      "numOunces": 28
    },
    {
      "userID": 1,
      "date": "2016/08/22",
      "numOunces": 30
    },
    {
      "userID": 3,
      "date": "2016/05/14",
      "numOunces": 3
    },
    {
      "userID": 2,
      "date": "2016/04/27",
      "numOunces": 40
    },
    {
      "userID": 4,
      "date": today,
      "numOunces": 35
    },
    {
      "userID": 4,
      "date": `${moment().subtract(1, 'days').format("YYYY-MM-DD")}`,
      "numOunces": 40
    },
    {
      "userID": 4,
      "date": `${moment().subtract(2, 'days').format("YYYY-MM-DD")}`,
      "numOunces": 30
    },
    {
      "userID": 4,
      "date": "2019/09/18",
      "numOunces": 40
    },
    {
      "userID": 4,
      "date": "2019/09/17",
      "numOunces": 40
    },
    {
      "userID": 4,
      "date": "2019/09/16",
      "numOunces": 30
    },
    {
      "userID": 4,
      "date": "2019/09/15",
      "numOunces": 30
    },
    ];

    hydration = new Hydration(hydrationData);

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

    users = [user3, user4];
    userRepo = new UserRepo(users);
  });

  it('should take in a list of data', function() {
    expect(hydration.hydrationData[0].userID).to.equal(1);
    expect(hydration.hydrationData[2].numOunces).to.equal(1);
    expect(hydration.hydrationData[4].date).to.equal('2018/10/23');
  });
});

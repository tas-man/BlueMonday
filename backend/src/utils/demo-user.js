/*
 * Create user account for demontrational purposes
 *
 */
const bcrypt = require('bcryptjs');
const dbConn = require('./db-connector');

const User = dbConn.User;

const createDemoUser = async () => {
  try {
    const demoUser = {
      username: 'demoUser123',
      hash: bcrypt.hashSync('demoUser123', 10),
      firstName: 'John',
      lastName: 'Doe',
      email: 'demouser123@ijustmadethisup.com',
      admin: false,
    };
    if (await User.findOne({ username: demoUser.username })) {
      throw new Error('Demo user already exists');
    }
    const user = new User(demoUser);
    await user.save();
    console.log('Created demo user!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = createDemoUser;

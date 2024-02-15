const sequelize = require('../config/connection');
const seedEvents = require('./eventData');
// const seedVendor = require('./vendorData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedEvents();
//   await seedVendor();
  process.exit(0);
};

seedAll();
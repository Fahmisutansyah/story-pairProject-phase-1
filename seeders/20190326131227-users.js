'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      
    */
   return queryInterface.bulkInsert('Users', [
    {
      name: 'John Doe',
      username: 'johnyBoy123',
      password: 'johnn',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Fahmi Sut',
      username: 'fahmis',
      password: 'sutansutan',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Rico',
      username: 'ricoboy21',
      password: 'ricarica',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Hansel',
      username: 'hanselboy21',
      password: 'gretel',
      createdAt: new Date,
      updatedAt: new Date
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};

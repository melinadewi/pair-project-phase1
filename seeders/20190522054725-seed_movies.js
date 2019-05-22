'use strict';
const fs = require('fs')
let data = fs.readFileSync('movie_sample.csv','utf8').split('\n').slice(1)
let seed = []
let dataDetail
for(let i = 0; i < data.length - 1; i++){
    dataDetail = data[i].split(',')
    seed[i] = {
        title: dataDetail[0].slice(0,dataDetail[0].length - 2),
        link: dataDetail[1].split('?')[0],
        year: Number(dataDetail[2]),
        imdb_score: Number(dataDetail[3]),
        createdAt: new Date(),
        updatedAt: new Date()
    }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Movies', seed, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Movies', null, {});
  }
};

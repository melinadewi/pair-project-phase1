'use strict';
// const fs = require('fs')
// let data = fs.readFileSync('movie_sample.csv','utf8').split('\n').slice(1)
// let seed = []
// let dataDetail
// for(let i = 0; i < data.length - 1; i++){
//     dataDetail = data[i].split(',')
//     seed[i] = {
//         title: dataDetail[0].slice(0,dataDetail[0].length - 2),
//         link: dataDetail[1].split('?')[0],
//         year: Number(dataDetail[2]),
//         imdb_score: Number(dataDetail[3]),
//         createdAt: new Date(),
//         updatedAt: new Date()
//     }
// }

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Movies', [{
        title: "Avengers: Endgame",
        link: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        year: 2019,
        director: "Anthony Russo, Joe Russo",
        actor: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
        synopsis: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos' actions and restore order to the universe.",
        genre: "Action, Adventure, Sci-Fi",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: "Pokémon Detective Pikachu",
        link: "https://m.media-amazon.com/images/M/MV5BNDU4Mzc3NzE5NV5BMl5BanBnXkFtZTgwMzE1NzI1NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        year: 2019,
        director: "Rob Letterman",
        actor: "Ryan Reynolds, Justice Smith, Kathryn Newton",
        synopsis: "In a world where people collect Pokémon to do battle, a boy comes across an intelligent talking Pikachu who seeks to be a detective.",
        genre: "Action, Adventure, Comedy",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Movies', null, {});
  }
};

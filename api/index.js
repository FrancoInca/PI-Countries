//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const server = require('./src/app.js');
const { addCountries } = require('./src/functions/loadCountries.js');
const { sequelize } = require('./src/db.js');
const { DB_PORT } = process.env;

// Syncing all the models at once.
server.listen(DB_PORT, async () => {
  await sequelize.sync({ force: true }); //Solo para pruebas, descomentar el de abajo para el deploy y evitar la perdida de datos de la DB
  //await sequelize.sync()
  console.log(`Server listening at ${DB_PORT}`);
  await addCountries(); //Comentar al momento del deploy, funcion para cargar los datos sin el Bulk
});

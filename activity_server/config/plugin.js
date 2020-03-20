'use strict';

// /** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
/** @type Egg.EggPlugin */
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.static = true;

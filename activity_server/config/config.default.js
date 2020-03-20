/* eslint valid-jsdoc: "off" */
'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1569044743364_2123';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {};
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:8080'],
  };
  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/activityData',
      options: {},
    },
  };
  config.static = {
    prefix: '/static/',
    dir: path.join(appInfo.baseDir, 'app/static'),
    dynamic: true,
    preload: false,
    maxAge: 31536000,
    buffer: false,
  };
  return {
    ...config,
    ...userConfig,
  };
};

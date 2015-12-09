/*
 * This file/module contains all configuration for the build process.
 *
 * This is a collection of patterns. These paths are used in the configuration of build tasks.
 */
var objectAssign = require('lodash.assign');
var appRootDir = require('app-root-dir');

function buildConfig(customConfig) {
  var cfg = {};
  var customCfg = customConfig || {};

  cfg.env = {};

  // When set to true all files in the 'dist' folder are copied to the 'target' folder
  cfg.env.maven = false;
  /*
   Karma currently starts up very slow in windows. Disabling running unittests after scripts
   have changed on windows is the workaround.
   TODO: check for fix for karma on windows
   */
  cfg.env.windows = false;

  cfg.projectName = require(appRootDir.get() + '/package.json').name;
  cfg.bowerDir = customCfg.bowerDir || 'bower_components/';
  cfg.bowerComponents = cfg.bowerDir + '**';
  cfg.npmDir = customCfg.npmDir || 'node_modules/';
  cfg.targetBowerDir = customCfg.targetBowerDir || 'target/classes/angular/' + cfg.projectName + '/bower_components/';

  cfg.srcDir = customCfg.srcDir || 'src/';
  cfg.src = {};
  cfg.src.styles = cfg.srcDir + 'styles/**/*.scss';
  cfg.src.indexStyles = cfg.srcDir + 'styles/' + cfg.projectName + '.scss';
  cfg.src.images = cfg.srcDir + 'images/**/*.{png,jpg,gif,ico}';
  cfg.src.fonts = cfg.srcDir + 'fonts/**/*';
  cfg.src.indexScript = cfg.srcDir + 'angularjs/' + cfg.projectName + '.js';
  cfg.src.unitTests = cfg.srcDir + 'angularjs/**/*.spec.js';
  cfg.src.scripts = cfg.srcDir + 'angularjs/**/!(*.spec).js';
  cfg.src.templates = cfg.srcDir + 'angularjs/**/*.html';
  cfg.src.i18n = cfg.srcDir + 'i18n/**';
  cfg.src.indexHtml = cfg.srcDir + 'index.html';

  cfg.distDir = customCfg.distDir || 'dist/';
  cfg.dist = {};
  cfg.dist.indexHtml = cfg.distDir + 'index.html';
  cfg.dist.styles = cfg.distDir + 'styles/';
  cfg.dist.fonts = cfg.distDir + 'fonts/';
  cfg.dist.scripts = cfg.distDir + 'scripts/';
  cfg.dist.indexScript = cfg.distDir + 'scripts/' + cfg.projectName + '.js';
  cfg.dist.images = cfg.distDir + 'images/';
  cfg.dist.i18n = cfg.distDir + 'i18n/';

  cfg.karmaConf = appRootDir.get() + '/karma.conf.js';
  cfg.bowerAssets = [cfg.bowerDir + 'hippo-theme/dist/**/*.{svg,woff,woff2,ttf,eot,png}'];
  cfg.bowerLinks = [cfg.bowerDir + 'hippo-theme/dist/**'];
  cfg.supportedBrowsers = ['last 1 Chrome versions', 'last 1 Firefox versions', 'Safari >= 7', 'Explorer >= 10'];
  cfg.serverMiddlewares = [];
  cfg.sassLintRules = {
    'force-element-nesting': 0
  };
  cfg.esLintRules = {
    "ecmaFeatures": {
      "modules": true
    },
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    }
  };
  cfg.systemjsOptions = {
    transpiler: 'babel',
    defaultJSExtensions: true
  };

  return objectAssign(cfg, customCfg);
}

module.exports = buildConfig;

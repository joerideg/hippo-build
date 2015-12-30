/*
 * Copyright 2015 Hippo B.V. (http://www.onehippo.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var objectAssign = require('lodash.assign');
var appRootDir = require('app-root-dir');

function buildConfig(customConfig) {
  var cfg = {};
  var customCfg = customConfig || {};

  cfg.env = {};
  cfg.env.maven = false;

  cfg.appRoot = appRootDir.get() + '/';
  cfg.srcDir = customCfg.srcDir || cfg.appRoot + 'src/';
  cfg.distDir = customCfg.distDir || cfg.appRoot + 'dist/';
  cfg.bowerDir = customCfg.bowerDir || 'bower_components/';
  cfg.npmDir = customCfg.npmDir || 'node_modules/';
  cfg.targetBowerDir = customCfg.targetBowerDir || cfg.distDir + cfg.projectName + cfg.bowerDir;
  cfg.targetNpmDir = customCfg.npmDir || cfg.npmDir + cfg.projectName + +cfg.npmDir;

  cfg.projectName = require(cfg.appRoot + 'package.json').name;

  cfg.src = {};
  cfg.src.styles = cfg.srcDir + 'styles/**/*.scss';
  cfg.src.indexStyles = cfg.srcDir + 'styles/' + cfg.projectName + '.scss';
  cfg.src.images = cfg.srcDir + 'images/**/*.{png,jpg,gif,ico,svg}';
  cfg.src.fonts = cfg.srcDir + 'fonts/**/*';
  cfg.src.indexScript = cfg.srcDir + 'angularjs/' + cfg.projectName + '.js';
  cfg.src.unitTests = cfg.srcDir + '**/*.spec.js';
  cfg.src.scripts = cfg.srcDir + '**/!(*.spec).js';
  cfg.src.templates = cfg.srcDir + '**/!(index).html';
  cfg.src.i18n = cfg.srcDir + 'i18n/**';
  cfg.src.indexHtml = cfg.srcDir + 'index.html';

  cfg.dist = {};
  cfg.dist.indexHtml = cfg.distDir + 'index.html';
  cfg.dist.styles = cfg.distDir + 'styles/';
  cfg.dist.fonts = cfg.distDir + 'fonts/';
  cfg.dist.scripts = cfg.distDir + 'scripts/';
  cfg.dist.indexScript = cfg.distDir + 'scripts/' + cfg.projectName + '.js';
  cfg.dist.images = cfg.distDir + 'images/';
  cfg.dist.i18n = cfg.distDir + 'i18n/';

  cfg.karmaConfig = cfg.appRoot + 'karma.conf.js';
  cfg.bowerAssets = [cfg.bowerDir + 'hippo-theme/dist/**/*.{svg,woff,woff2,ttf,eot,png}'];
  cfg.bowerLinks = [cfg.bowerDir + 'hippo-theme/dist/**'];
  cfg.supportedBrowsers = ['last 1 Chrome versions', 'last 1 Firefox versions', 'Safari >= 7', 'Explorer >= 10'];
  cfg.serverMiddlewares = [];
  cfg.sassLintRules = {
    'force-element-nesting': 0
  };
  cfg.esLintConfig = {
    parser: 'babel-eslint',
    ecmaFeatures: {
      modules: true
    },
    env: {
      browser: true,
      node: true,
      es6: true
    }
  };

  return objectAssign(cfg, customCfg);
}

module.exports = buildConfig;

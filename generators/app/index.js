'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var packagejs = require(__dirname + '/../../package.json');
var shelljs = require('shelljs');
var fs = require('fs');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'elasticsearch-reindexer'};
jhipsterVar.jhipsterConfigDirectory = '.jhipster';

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({
  initializing: {
    compose: function (args) {
      this.composeWith('jhipster:modules', {
        options: {
          jhipsterVar: jhipsterVar,
          jhipsterFunc: jhipsterFunc
        }
      });
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to the ' + chalk.red('JHipster elasticsearch-reindexer') + ' generator! ' + chalk.yellow('v' + packagejs.version + '\n'));
    }
  },

  _getConfig: function () {
    var fromPath = '.yo-rc.json';

    if (shelljs.test('-f', fromPath)) {
      var fileData = this.fs.readJSON(fromPath);
      if (fileData && fileData['generator-jhipster']) {
        return fileData['generator-jhipster'];
      } else return false;
    } else {
      return false;
    }
  },

  writing: {
    setUpVars: function () {
      var config = this._getConfig();
      this.applicationType = config.applicationType;
      this.nativeLanguage = config.nativeLanguage;
      this.searchEngine = config.searchEngine;
      this.enableTranslation = config.enableTranslation;
      this.clientFramework = config.clientFramework;
      this.entityFiles = shelljs.ls(jhipsterVar.jhipsterConfigDirectory).filter(function (file) {
        return file.match(/\.json$/);
      });
      this.packageName = jhipsterVar.packageName;
      this.angularAppName = jhipsterVar.angularAppName;
      this.versionTwo = shelljs.test('-e', jhipsterVar.webappDir + 'scripts');
      if (!this.versionTwo) {
        this.appFolder = 'app/admin/elasticsearch-reindex/';
        this.serviceFolder = this.appFolder;
      } else {
        this.appFolder = 'scripts/app/admin/elasticsearch-reindex/';
        this.serviceFolder = 'scripts/components/admin/';
      }
    },
    validateVars: function () {
      if (!this.applicationType) {
        this.log(chalk.yellow('WARNING applicationType is missing in JHipster configuration, using monolith as fallback'));
        this.applicationType = 'monolith';
      }
      if (!this.entityFiles || !this.entityFiles.length) {
        this.log(chalk.yellow('WARNING no entities found'));
      }
      if (this.searchEngine !== 'elasticsearch') {
        this.log(chalk.yellow('WARNING search engine is not set to Elasticsearch in JHipster configuration, ' +
          'generated service may fail to compile'));
      }
      if (!this.nativeLanguage) {
        this.log(chalk.yellow('WARNING nativeLanguage is missing in JHipster configuration, using english as fallback'));
        this.nativeLanguage = 'en';
      }
      if (!this.clientFramework) {
        this.log(chalk.yellow('WARNING clientFramework is missing in JHipster configuration, using angular1 as fallback'));
        this.clientFramework = 'angular1';
      }
    },
    writeTemplates: function () {
      this.template('src/main/java/package/web/rest/_ElasticsearchIndexResource.java', jhipsterVar.javaDir + 'web/rest/ElasticsearchIndexResource.java', this, {});
      this.template('src/main/java/package/service/_ElasticsearchIndexService.java', jhipsterVar.javaDir + 'service/ElasticsearchIndexService.java', this, {});
      if (this.clientFramework === 'angular1') {
        this.template('src/main/webapp/js/elasticsearch-reindex.controller.js', jhipsterVar.webappDir + this.appFolder + '/elasticsearch-reindex.controller.js', this, {});
        this.template('src/main/webapp/js/elasticsearch-reindex-dialog.controller.js', jhipsterVar.webappDir + this.appFolder + '/elasticsearch-reindex-dialog.controller.js', this, {});
        this.template('src/main/webapp/i18n/elasticsearch-reindex.json', jhipsterVar.webappDir + 'i18n/' + this.nativeLanguage + '/elasticsearch-reindex.json', this, {});
        this.template('src/main/webapp/js/elasticsearch-reindex.service.js', jhipsterVar.webappDir + this.serviceFolder + '/elasticsearch-reindex.service.js', this, {});
        this.template('src/main/webapp/html/elasticsearch-reindex.html', jhipsterVar.webappDir + this.appFolder + '/elasticsearch-reindex.html', this, {});
        this.template('src/main/webapp/html/elasticsearch-reindex-dialog.html', jhipsterVar.webappDir + this.appFolder + '/elasticsearch-reindex-dialog.html', this, {});

        if (!this.versionTwo) {
          this.template('src/main/webapp/js/elasticsearch-reindex.state.js', jhipsterVar.webappDir + this.appFolder + '/elasticsearch-reindex.state.js', this, {});
        } else {
          this.template('src/main/webapp/js/elasticsearch-reindex.state.js', jhipsterVar.webappDir + this.appFolder + '/elasticsearch-reindex.js', this, {});
        }

        if (jhipsterFunc.addJavaScriptToIndex) {
          jhipsterFunc.addJavaScriptToIndex('app/admin/elasticsearch-reindex/elasticsearch-reindex.controller.js');
          jhipsterFunc.addJavaScriptToIndex('app/admin/elasticsearch-reindex/elasticsearch-reindex-dialog.controller.js');
          if (!this.versionTwo) {
            jhipsterFunc.addJavaScriptToIndex('app/admin/elasticsearch-reindex/elasticsearch-reindex.state.js');
            jhipsterFunc.addJavaScriptToIndex('app/admin/elasticsearch-reindex.service.js');
          } else {
            jhipsterFunc.addJavaScriptToIndex('app/admin/elasticsearch-reindex/elasticsearch-reindex.js');
            jhipsterFunc.addJavaScriptToIndex('components/admin/elasticsearch-reindex.service.js');
          }
        }

        if (jhipsterFunc.addElementToAdminMenu) {
          jhipsterFunc.addElementToAdminMenu('elasticsearch-reindex', 'exclamation-sign', this.enableTranslation);
          if (this.enableTranslation) {
            jhipsterFunc.addAdminElementTranslationKey('elasticsearch-reindex', 'Reindex Elasticsearch', this.nativeLanguage);
          }
        }
      }
    },

    registering: function () {
      try {
        jhipsterFunc.registerModule("generator-jhipster-elasticsearch-reindexer", "entity", "post", "app", "Generate a service for reindexing all database rows for each of your entities");
      } catch (err) {
        this.log(chalk.red.bold('WARN!') + ' Could not register as a jhipster entity post creation hook...\n');
      }
    }
  },

  end: function () {
    this.log('End of elasticsearch-reindexer generator');
  }
});

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
    },
    setUpVars: function () {
      var config = this._getConfig();
      this.applicationType = config.applicationType;
      this.searchEngine = config.searchEngine;
      this.entityFiles = shelljs.ls(jhipsterVar.jhipsterConfigDirectory).filter(function (file) {
        return file.match(/\.json$/);
      });
      this.packageName = jhipsterVar.packageName;
    },
    validateVars: function () {
      if (!this.applicationType) {
        this.log(chalk.yellow('WARNING applicationType is missing in JHipster configuration, ' +
            'using monolithic as fallback'));
        this.applicationType = 'monolithic';
      }
      if (!this.entityFiles || !this.entityFiles.length) {
        this.log(chalk.yellow('WARNING no entities found'));
      }
      if (this.searchEngine !== 'elasticsearch') {
        this.log(chalk.yellow('WARNING search engine is not set to Elasticsearch in JHipster configuration, ' +
            'generated service may fail to compile'));
      }
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

  prompting: function () {
    var done = this.async();
    var prompts = [];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    writeTemplates : function () {
      var javaDir = jhipsterVar.javaDir;

      this.template('src/main/java/package/web/rest/_ElasticsearchIndexResource.java', javaDir + 'web/rest/ElasticsearchIndexResource.java', this, {});
      this.template('src/main/java/package/service/_ElasticsearchIndexService.java', javaDir + 'service/ElasticsearchIndexService.java', this, {});
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

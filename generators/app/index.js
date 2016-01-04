'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var packagejs = require(__dirname + '/../../package.json');
var shelljs = require('shelljs');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'elasticsearch-reindexer'};
jhipsterVar.jhipsterConfigDirectory = '.jhipster';

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.generators.Base.extend({

  initializing: {
    templates: function (args) {
      this.composeWith('jhipster:modules', {
        options: {
          jhipsterVar: jhipsterVar,
          jhipsterFunc: jhipsterFunc
        }
      });
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ' + chalk.red('JHipster elasticsearch-reindexer') + ' generator! ' + chalk.yellow('v' + packagejs.version)
      ));
    }
  },

  prompting: function () {
    var done = this.async();

/*    if (jhipsterVar.searchEngine !== 'elasticsearch') {
      this.log(chalk.red('Error!') + ' The JHipster Elasticsearch Indexer module only works with Elasticsearch');
      process.exit(1);
    }*/

    jhipsterVar.entityFiles = shelljs.ls(jhipsterVar.jhipsterConfigDirectory).filter(function (file) {
      return file.match(/\.json$/);
    });

    var prompts = [];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var done = this.async();

    this.baseName = jhipsterVar.baseName;
    this.packageName = jhipsterVar.packageName;
    this.angularAppName = jhipsterVar.angularAppName;
    var javaDir = jhipsterVar.javaDir;
    var resourceDir = jhipsterVar.resourceDir;
    var webappDir = jhipsterVar.webappDir;

    this.entityFiles = jhipsterVar.entityFiles;

    console.log('baseName=' + this.baseName);
    console.log('packageName=' + this.packageName);
    console.log('angularAppName=' + this.angularAppName);

    this.template('src/main/java/package/web/rest/_ElasticsearchIndexResource.java', javaDir + 'web/rest/ElasticsearchIndexResource.java', this, {});
    this.template('src/main/java/package/service/_ElasticsearchIndexService.java', javaDir + 'service/ElasticsearchIndexService.java', this, {});

    done();
  },

  install: function () {
    var done = this.async();
    this.installDependencies();
    done();
  },

  end: function () {
    console.log('End');
  }
});

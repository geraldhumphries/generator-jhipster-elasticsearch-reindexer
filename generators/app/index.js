'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var packagejs = require(__dirname + '/../../package.json');
var shelljs = require('shelljs');

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

  writing: {
    writeTemplates : function () {
      this.baseName = jhipsterVar.baseName;
      this.packageName = jhipsterVar.packageName;
      this.angularAppName = jhipsterVar.angularAppName;
      var javaDir = jhipsterVar.javaDir;
      var resourceDir = jhipsterVar.resourceDir;
      var webappDir = jhipsterVar.webappDir;

      this.message = this.props.message;

      this.entityFiles = jhipsterVar.entityFiles;

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

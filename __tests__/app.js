'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var generatedFiles = {
  client: {
    ng1: [],
    ngX: [],
    i18n: []
  },
  server: ['web/rest/ElasticsearchIndexResource.java', 'service/ElasticsearchIndexService.java']
};

describe('JHipster Elasticsearch Reindexer', () => {

  describe('AngularJS 1 app', () => {
    describe('without i18n', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates AngularJS 1 files', () => {
        assert.file(generatedFiles.client.ng1);
      });

      it('skips creating Angular 2+ files', () => {
        assert.noFile(generatedFiles.client.ngX);
      });

      it('skips creating i18n files', () => {
        assert.noFile(generatedFiles.client.i18n);
      });
    });
    describe('with i18n', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates AngularJS 1 files', () => {
        assert.file(generatedFiles.client.ng1);
      });

      it('skips creating Angular 2+ files', () => {
        assert.noFile(generatedFiles.client.ngX);
      });

      it('creates i18n files', () => {
        assert.file(generatedFiles.client.i18n);
      });
    });
  });

  describe('Angular 2+ app', () => {
    describe('without i18n', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates Angular 2+ files', () => {
        assert.file(generatedFiles.client.ngX);
      });

      it('skips creating AngularJS 1 files', () => {
        assert.noFile(generatedFiles.client.ng1);
      });

      it('skips creating i18n files', () => {
        assert.noFile(generatedFiles.client.i18n);
      });
    });
    describe('with i18n', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates Angular 2+ files', () => {
        assert.file(generatedFiles.client.ngX);
      });

      it('skips creating AngularJS 1 files', () => {
        assert.noFile(generatedFiles.client.ng1);
      });

      it('creates i18n files', () => {
        assert.file(generatedFiles.client.i18n);
      });
    });
  });

  describe('Monolith', () => {
    describe('with user management', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without user management', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('with constructor injection', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without constructor injection', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
  });

  describe('Gateway', () => {
    describe('with user management', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without user management', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('with constructor injection', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without constructor injection', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
  });

  describe('Microservice', () => {
    describe('with constructor injection', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without constructor injection', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
  });

  describe('Server-only app', () => {
    it('skips adding client files', () => {
      assert.noFile(generatedFiles.client.i18n);
      assert.noFile(generatedFiles.client.ng1);
      assert.noFile(generatedFiles.client.ngX);
    });
  });

  describe('Client-only app', () => {
    beforeAll((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true, skipChecks: true})
        .withPrompts()
        .on('end', done);
    });

    it('skips adding server files', () => {
      assert.noFile(generatedFiles.server);
    });
  });

});

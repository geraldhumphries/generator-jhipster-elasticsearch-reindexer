'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('JHipster Elasticsearch Reindexer', () => {

  describe('AngularJS 1 app', () => {
    describe('without i18n', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file([
          'dummyfile.txt'
        ]);
      });

      it('skips adding i18n files', () => {
        assert.noFile([
          'dummyfile.txt'
        ]);
      });

      it('')
    });
    describe('with i18n', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file([
          'dummyfile.txt'
        ]);
      });

      it('skips adding i18n files', () => {
        assert.noFile([
          'dummyfile.txt'
        ]);
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

      it('creates files', () => {
        assert.file([
          'dummyfile.txt'
        ]);
      });

      it('skips adding i18n files', () => {
        assert.noFile([
          'dummyfile.txt'
        ]);
      });

      it('skips adding i18n injection', () => {
        assert.noFile([
          'dummyfile.txt'
        ]);
      });
    });
    describe('with i18n', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file([
          'dummyfile.txt'
        ]);
      });

      it('adds i18n injection', () => {

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
        assert.file([
          'dummyfile.txt'
        ]);
      });

      it('skips adding i18n files', () => {
        assert.noFile([
          'dummyfile.txt'
        ]);
      });

      it('')
    });
    describe('without user management', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file([
          'dummyfile.txt'
        ]);
      });

      it('skips adding i18n files', () => {
        assert.noFile([
          'dummyfile.txt'
        ]);
      });

      it('')
    });
    describe('with constructor injection', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file([
          'dummyfile.txt'
        ]);
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
        assert.file([
          'dummyfile.txt'
        ]);
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
        assert.file([
          'dummyfile.txt'
        ]);
      });

      it('skips adding i18n files', () => {
        assert.noFile([
          'dummyfile.txt'
        ]);
      });

      it('')
    });
    describe('without user management', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file([
          'dummyfile.txt'
        ]);
      });

      it('skips adding i18n files', () => {
        assert.noFile([
          'dummyfile.txt'
        ]);
      });

      it('')
    });
    describe('with constructor injection', () => {
      beforeAll((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .withPrompts()
          .on('end', done);
      });

      it('creates files', () => {
        assert.file([
          'dummyfile.txt'
        ]);
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
        assert.file([
          'dummyfile.txt'
        ]);
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
        assert.file([
          'dummyfile.txt'
        ]);
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
        assert.file([
          'dummyfile.txt'
        ]);
      });
    });
  });

  describe('Server-only app', () => {
    it('skips adding client files', () => {
      assert.noFile([
        'dummyfile.txt'
      ]);
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
      assert.noFile([
        'dummyfile.txt'
      ]);
    });
  });

});

'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

// FIXME: doesn't work with older JH versions
const jhipsterModules = require('../node_modules/generator-jhipster/generators/modules/index.js');

const JAVA_PATH = 'src/main/java/com/mycompany/myapp/';
const WEBAPP_PATH = 'src/main/webapp/';
// FIXME: jhipster:modules can't see config
const deps = [
  [jhipsterModules, 'jhipster:modules']
];
const generatedFiles = {
  client: {
    ng1: [
    ],
    ngX: [
      WEBAPP_PATH + 'app/'
    ],
    i18n: [
      WEBAPP_PATH + 'i18n/en/elasticsearch-reindex.json'
    ]
  },
  server: [
    JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java',
    JAVA_PATH + 'service/ElasticsearchIndexService.java'
  ]
};

describe('JHipster Elasticsearch Reindexer', () => {

  describe('AngularJS 1 app', () => {
    describe('without i18n', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/client-only'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
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
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/ng1-i18n'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
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
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/client-only'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
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
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            console.log('temp dir name: ', dir);
            fse.copySync(path.join(__dirname, 'templates/client-only'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
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
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/monolith'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without user management', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/monolith'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('with constructor injection', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/monolith'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without constructor injection', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/monolith'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
  });

  describe('Gateway', () => {
    describe('with user management', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/gateway'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without user management', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/gateway'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('with constructor injection', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/gateway'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without constructor injection', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/gateway'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
  });

  describe('Microservice', () => {
    describe('with constructor injection', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/microservice'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
    describe('without constructor injection', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withGenerators(deps)
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/microservice'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });
    });
  });

  describe('Server-only app', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withGenerators(deps)
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/server-only'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('skips adding client files', () => {
      assert.noFile(generatedFiles.client.i18n);
      assert.noFile(generatedFiles.client.ng1);
      assert.noFile(generatedFiles.client.ngX);
    });
  });

  describe('Client-only app', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withGenerators(deps)
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/client-only'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('skips adding server files', () => {
      assert.noFile(generatedFiles.server);
    });
  });

});

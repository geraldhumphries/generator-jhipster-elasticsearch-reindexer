'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

const JAVA_PATH = 'src/main/java/com/mycompany/myapp/';
const WEBAPP_PATH = 'src/main/webapp/';

const generatedFiles = {
  client: {
    ng1: [
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.controller.js',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.html',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.service.js',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.state.js',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex-dialog.controller.js',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex-dialog.html',
    ],
    ngX: [
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.component.html',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.component.ts',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.module.ts',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.route.ts',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.service.ts',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex-modal.component.html',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex-modal.component.ts',
      WEBAPP_PATH + 'app/admin/elasticsearch-reindex/index.ts',
    ],
    i18n: [
      WEBAPP_PATH + 'i18n/en/elasticsearch-reindex.json',
      WEBAPP_PATH + 'i18n/fr/elasticsearch-reindex.json'
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
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/ng1-noi18n'), dir);
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
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/ng2-noi18n'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });
g
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
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/ng2-i18n'), dir);
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
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/server-only'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('creates server files', () => {
      assert.file(generatedFiles.server);
    });

    it('skips creating client files', () => {
      assert.noFile(generatedFiles.client.i18n);
      assert.noFile(generatedFiles.client.ng1);
      assert.noFile(generatedFiles.client.ngX);
    });
  });

  describe('Client-only app', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/client-only'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('skips creating server files', () => {
      assert.noFile(generatedFiles.server);
    });
  });

});

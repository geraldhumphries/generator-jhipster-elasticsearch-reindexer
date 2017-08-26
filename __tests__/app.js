'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

const JAVA_PATH = 'src/main/java/com/mycompany/myapp/';
const WEBAPP_PATH = 'src/main/webapp/';
const JHV2_APP_PATH = 'scripts/app/admin/elasticsearch-reindex/';
const JHV2_SERVICE_PATH = 'scripts/components/admin/';

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
    jhv2: [
      WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex.controller.js',
      WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex.html',
      WEBAPP_PATH + JHV2_SERVICE_PATH + 'elasticsearch-reindex.service.js',
      WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex.js',
      WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex-dialog.controller.js',
      WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex-dialog.html',
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

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('JHipster Elasticsearch Reindexer', () => {
  describe('AngularJS 1 app', () => {
    describe('before JHipster version 3', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/jhv2'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates AngularJS 1 files for JHipster V2', () => {
        assert.file(generatedFiles.client.jhv2);
      });

      it('uses jh-alert directive', () => {
        assert.fileContent(WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex.html', '<jh-alert></jh-alert>');
      });

      it('uses jh-alert-error directive', () => {
        assert.fileContent(WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex-dialog.html', '<jh-alert-error></jh-alert-error>');
      });

      it('does not use uses jhi-alert directive', () => {
        assert.noFileContent(WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex.html', '<jhi-alert></jhi-alert>');
      });

      it('does not use jhi-alert-error directive', () => {
        assert.noFileContent(WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex-dialog.html', '<jhi-alert-error></jhi-alert-error>');
      });
    });

    describe('after JHipster version 3', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/jhv3'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('uses jhi-alert directive', () => {
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.html', '<jhi-alert></jhi-alert>');
      });

      it('uses jhi-alert-error directive', () => {
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex-dialog.html', '<jhi-alert-error></jhi-alert-error>');
      });

      it('does not use uses jh-alert directive', () => {
        assert.noFileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.html', '<jh-alert></jh-alert>');
      });

      it('does not use jh-alert-error directive', () => {
        assert.noFileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex-dialog.html', '<jh-alert-error></jh-alert-error>');
      });
    });

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

      it('does not use tabs anywhere', () => {
        generatedFiles.client.ng1.forEach((filePath) => {
          assert.noFileContent(filePath, '\t');
        });
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


      it('does not use tabs anywhere', () => {
        generatedFiles.client.ng1.forEach((filePath) => {
          assert.noFileContent(filePath, '\t');
        });
        generatedFiles.client.i18n.forEach((filePath) => {
          assert.noFileContent(filePath, '\t');
        });
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

      it('creates Angular 2+ files', () => {
        assert.file(generatedFiles.client.ngX);
      });

      it('skips creating AngularJS 1 files', () => {
        assert.noFile(generatedFiles.client.ng1);
      });

      it('skips creating i18n files', () => {
        assert.noFile(generatedFiles.client.i18n);
      });

      it('does not use tabs anywhere', () => {
        generatedFiles.client.ngX.forEach((filePath) => {
          assert.noFileContent(filePath, '\t');
        });
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

      it('does not use tabs anywhere', () => {
        generatedFiles.client.ngX.forEach((filePath) => {
          assert.noFileContent(filePath, '\t');
        });
        generatedFiles.client.i18n.forEach((filePath) => {
          assert.noFileContent(filePath, '\t');
        });
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
  });

  describe('Microservice', () => {
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

  describe('App with constructor injection', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true, skipChecks: true})
        .inTmpDir((dir) => {
          // JHipster major version >= 4
          fse.copySync(path.join(__dirname, 'templates/constructor-injection'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('creates files', () => {
      assert.file(generatedFiles.server);
    });

    it('does not use tabs anywhere', () => {
      generatedFiles.server.forEach((filePath) => {
        assert.noFileContent(filePath, '\t');
      });
    });

    it('resource does not import Inject annotation', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import javax.inject.Inject;');
    });

    it('resource does not use Inject annotation', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@Inject');
    });

    it('resource has constructor', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'ElasticsearchIndexResource(');
    });

    it('resource uses constructor injection', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'private final ElasticsearchIndexService elasticsearchIndexService;');
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'this.elasticsearchIndexService = elasticsearchIndexService;');
    });

    it('service does not import Inject annotation', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import javax.inject.Inject;');
    });

    it('service does not use Inject annotation', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', '@Inject');
    });

    it('service has constructor', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'ElasticsearchIndexService(');
    });

    it('service uses constructor injection', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'private final TestRepository testRepository;');
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'this.testRepository = testRepository;');
    });
  });

  describe('App with field injection', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true, skipChecks: true})
        .inTmpDir((dir) => {
          // JHipster major version < 4
          fse.copySync(path.join(__dirname, 'templates/field-injection'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('creates files', () => {
      assert.file(generatedFiles.server);
    });

    it('does not use tabs anywhere', () => {
      generatedFiles.server.forEach((filePath) => {
        assert.noFileContent(filePath, '\t');
      });
    });

    it('resource imports Inject annotation', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import javax.inject.Inject;');
    });

    it('resource uses field injection', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@Inject');
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'private ElasticsearchIndexService elasticsearchIndexService;');
    });

    it('resource does not have constructor', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'ElasticsearchIndexResource(');
    });

    it('service imports Inject annotation', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import javax.inject.Inject;');
    });

    it('service uses field injection', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', '@Inject');
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'private TestRepository testRepository;');
    });

    it('service does not have constructor', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'ElasticsearchIndexService(');
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

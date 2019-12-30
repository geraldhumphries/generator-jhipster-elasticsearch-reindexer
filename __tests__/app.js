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

      it('adds App suffix to AngularJS module name', () => {
        assert.fileContent(WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex.js', '.module(\'testApp\')');
        assert.fileContent(WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex.controller.js', '.module(\'testApp\')');
        assert.fileContent(WEBAPP_PATH + JHV2_SERVICE_PATH + 'elasticsearch-reindex.service.js', '.module(\'testApp\')');
        assert.fileContent(WEBAPP_PATH + JHV2_APP_PATH + 'elasticsearch-reindex-dialog.controller.js', '.module(\'testApp\')');
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

      it('adds App suffix to AngularJS module name', () => {
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.state.js', '.module(\'testApp\')');
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.controller.js', '.module(\'testApp\')');
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.service.js', '.module(\'testApp\')');
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex-dialog.controller.js', '.module(\'testApp\')');
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

  describe('Angular 2-4 app', () => {
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

      it('uses the @angular/http API', () => {
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.service.ts',
          'import { Http, Response } from \'@angular/http\'');
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.service.ts',
          'private http: Http');
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

      it('uses the @angular/http API', () => {
        assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.service.ts',
          'from \'@angular/http\'');
      });
    });
  });

  describe('Angular 5 app', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true, skipChecks: true})
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/ng5'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('creates Angular 2+ files', () => {
      assert.file(generatedFiles.client.ngX);
    });

    it('skips creating AngularJS 1 files', () => {
      assert.noFile(generatedFiles.client.ng1);
    });

    it('uses the @angular/common/http API', () => {
      assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.service.ts',
        'import { HttpClient, HttpResponse } from \'@angular/common/http\'');
      assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.service.ts',
        'private http: HttpClient');
    });

    it('does not use tabs anywhere', () => {
      generatedFiles.client.ngX.forEach((filePath) => {
        assert.noFileContent(filePath, '\t');
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

      it('generates entity reindexing', () => {
        assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(Test.class, testRepository, testSearchRepository);');
      });

      it('generates user reindexing', () => {
        assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(User.class, userRepository, userSearchRepository);');
      });
    });

    describe('without user management', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/monolith-skipusermanagement'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });

      it('generates entity reindexing', () => {
        assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(Test.class, testRepository, testSearchRepository);');
      });

      it('does not generate user reindexing', () => {
        assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(User.class, userRepository, userSearchRepository);');
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

      it('does not generate entity reindexing', () => {
        assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(Test.class, testRepository, testSearchRepository);');
      });

      it('generates user reindexing', () => {
        assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(User.class, userRepository, userSearchRepository);');
      });
    });

    describe('without user management', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/gateway-skipusermanagement'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });

      it('does not generate entity reindexing', () => {
        assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(Test.class, testRepository, testSearchRepository);');
      });

      it('does not generate user reindexing', () => {
        assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(User.class, userRepository, userSearchRepository);');
      });
    });

    describe('with UAA auth type', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/gateway-uaa'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });

      it('does not generate entity reindexing', () => {
        assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(Test.class, testRepository, testSearchRepository);');
      });

      it('does not generate user reindexing', () => {
        assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(User.class, userRepository, userSearchRepository);');
      });
    });
  });

  describe('Microservice', () => {
    describe('with user management', () => {
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

      it('generates entity reindexing', () => {
        assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(Test.class, testRepository, testSearchRepository);');
      });

      it('does not generate user reindexing', () => {
        assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(User.class, userRepository, userSearchRepository);');
      });
    });

    describe('without user management', () => {
      beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({skipInstall: true, skipChecks: true})
          .inTmpDir((dir) => {
            fse.copySync(path.join(__dirname, 'templates/microservice-skipusermanagement'), dir);
            fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
          });
      });

      it('creates files', () => {
        assert.file(generatedFiles.server);
      });

      it('generates entity reindexing', () => {
        assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(Test.class, testRepository, testSearchRepository);');
      });

      it('does not generate user reindexing', () => {
        assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'reindexForClass(User.class, userRepository, userSearchRepository);');
      });
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

  describe('App with PostMapping', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true, skipChecks: true})
        .inTmpDir((dir) => {
          // JHipster version >= 3.10.0
          fse.copySync(path.join(__dirname, 'templates/postmapping'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('imports PostMapping', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import org.springframework.web.bind.annotation.PostMapping;');
    });

    it('does not import RequestMethod or MediaType', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import org.springframework.http.MediaType;');
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import org.springframework.web.bind.annotation.RequestMethod;');
    });

    it('uses PostMapping', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@PostMapping("/elasticsearch/index")');
    });

    it('does not use RequestMapping', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@RequestMapping(value = "/elasticsearch/index",');
    });
  });

  describe('App with RequestMapping', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true, skipChecks: true})
        .inTmpDir((dir) => {
          // JHipster version < 3.10.0
          fse.copySync(path.join(__dirname, 'templates/requestmapping'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('does not import PostMapping', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import org.springframework.web.bind.annotation.PostMapping;');
    });

    it('imports RequestMethod and MediaType', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import org.springframework.http.MediaType;');
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import org.springframework.web.bind.annotation.RequestMethod;');
    });

    it('does not use PostMapping', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@PostMapping("/elasticsearch/index")');
    });

    it('uses RequestMapping', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@RequestMapping(value = "/elasticsearch/index",');
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

  describe('App with Spring Data 1.x', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/spring-data-1'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('uses ElasticsearchRepository.save()', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'elasticsearchRepository.save(');
    });

    it('does not use ElasticsearchRepository.saveAll()', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'elasticsearchRepository.saveAll(');
    });

    it('uses PageRequest constructor', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'new PageRequest(');
    });

    it('does not use PageRequest.of()', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'PageRequest.of(');
    });

    it('does not use ResourceAlreadyExistsException', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import org.elasticsearch.ResourceAlreadyExistsException;');
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', '} catch (ResourceAlreadyExistsException e) {');
    });

    it('uses IndexAlreadyExistsException', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import org.elasticsearch.indices.IndexAlreadyExistsException;');
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', '} catch (IndexAlreadyExistsException e) {');
    });
  });

  describe('App with Spring Data 2.x', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/spring-data-2'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('uses ElasticsearchRepository.saveAll()', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'elasticsearchRepository.saveAll(');
    });

    it('does not use ElasticsearchRepository.save()', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'elasticsearchRepository.save(');
    });

    it('does not use PageRequest constructor', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'new PageRequest(');
    });

    it('uses PageRequest.of()', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'PageRequest.of(');
    });

    it('uses ResourceAlreadyExistsException', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import org.elasticsearch.ResourceAlreadyExistsException;');
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', '} catch (ResourceAlreadyExistsException e) {');
    });

    it('does not use IndexAlreadyExistsException', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import org.elasticsearch.indices.IndexAlreadyExistsException;');
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', '} catch (IndexAlreadyExistsException e) {');
    });
  });

  describe('App with Elasticsearch Jest', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/es-jest'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('uses JestElasticsearchTemplate', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import com.github.vanroy.springdata.jest.JestElasticsearchTemplate;');
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'private final JestElasticsearchTemplate elasticsearchTemplate;');
    });

    it('does not use ElasticsearchTemplate', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;');
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'private final ElasticsearchTemplate elasticsearchTemplate;');
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'private ElasticsearchTemplate elasticsearchTemplate;');
    });
  });

  describe('App without Elasticsearch Jest', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/es-no-jest'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('does not use JestElasticsearchTemplate', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import com.github.vanroy.springdata.jest.JestElasticsearchTemplate;');
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'private final JestElasticsearchTemplate elasticsearchTemplate;');
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'private JestElasticsearchTemplate elasticsearchTemplate;');
    });

    it('uses ElasticsearchTemplate', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;');
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'private final ElasticsearchTemplate elasticsearchTemplate;');
    });
  });

  describe('App with HeaderUtil from JHipster library', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/headerutil-from-library'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('uses HeaderUtil from JHipster library', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import io.github.jhipster.web.util.HeaderUtil;');
    });

    it('injects applicationName', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@Value("${jhipster.clientApp.name}")');
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'private String applicationName;');
    });

    it('calls createAlert with applicationName', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'HeaderUtil.createAlert(applicationName, "elasticsearch.reindex.accepted", null)');
    });

    it('does not use HeaderUtil from code', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '.web.rest.util.HeaderUtil;');
    });

    it('does not call createAlert without applicationName', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'HeaderUtil.createAlert("elasticsearch.reindex.accepted", null)');
    });
  });

  describe('App with HeaderUtil from code', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/headerutil-from-code'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('does not use HeaderUtil from JHipster library', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import io.github.jhipster.web.util.HeaderUtil;');
    });

    it('does not inject applicationName', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@Value("${jhipster.clientApp.name}")');
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'private String applicationName;');
    });

    it('does not call createAlert with applicationName', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'HeaderUtil.createAlert(applicationName, "elasticsearch.reindex.accepted", null)');
    });

    it('uses HeaderUtil from code', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '.web.rest.util.HeaderUtil;');
    });

    it('calls createAlert without applicationName', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'HeaderUtil.createAlert("elasticsearch.reindex.accepted", null)');
    });
  });

  describe('App that uses Timed annotation', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/timed'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('uses Timed annotation in Resource', () => {
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import com.codahale.metrics.annotation.Timed;');
      assert.fileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@Timed');
    });

    it('uses Timed annotation in Service', () => {
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import com.codahale.metrics.annotation.Timed;');
      assert.fileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', '@Timed');
    });
  });

  describe('App that does not use Timed annotation', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/timed-removed'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('does not use Timed annotation in Resource', () => {
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', 'import com.codahale.metrics.annotation.Timed;');
      assert.noFileContent(JAVA_PATH + 'web/rest/ElasticsearchIndexResource.java', '@Timed');
    });

    it('does not use Timed annotation in Service', () => {
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', 'import com.codahale.metrics.annotation.Timed;');
      assert.noFileContent(JAVA_PATH + 'service/ElasticsearchIndexService.java', '@Timed');
    });
  });

  describe('App with absolute TypeScript imports', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true, skipChecks: true})
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/ts-imports-absolute'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('uses absolute imports', () => {
      assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.module.ts', 'from \'app/shared\';');
    });

    it('does not use relative imports', () => {
      assert.noFileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.module.ts', 'from \'../../shared\';');
    });

    it('imports UserRouteAccessService from core', () => {
      assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.route.ts', 'import { UserRouteAccessService } from \'app/core\';');
    });

    it('does not import UserRouteAccessService from shared', () => {
      assert.noFileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.route.ts', 'import { UserRouteAccessService } from \'../../shared\';');
    });
  });

  describe('App with relative TypeScript imports', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true, skipChecks: true})
        .inTmpDir((dir) => {
          fse.copySync(path.join(__dirname, 'templates/ts-imports-relative'), dir);
          fse.copySync(path.join(__dirname, 'templates/.jhipster'), dir + '/.jhipster');
        });
    });

    it('does not use absolute imports', () => {
      assert.noFileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.module.ts', 'from \'app/shared\';');
    });

    it('uses relative imports', () => {
      assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.module.ts', 'from \'../../shared\';');
    });

    it('does not import UserRouteAccessService from core', () => {
      assert.noFileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.route.ts', 'import { UserRouteAccessService } from \'app/core\';');
    });

    it('imports UserRouteAccessService from shared', () => {
      assert.fileContent(WEBAPP_PATH + 'app/admin/elasticsearch-reindex/elasticsearch-reindex.route.ts', 'import { UserRouteAccessService } from \'../../shared\';');
    });
  });

});

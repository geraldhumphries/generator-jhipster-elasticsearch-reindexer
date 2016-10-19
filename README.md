# generator-jhipster-elasticsearch-reindexer
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module, Generate a service for reindexing all database rows for each of your entities

# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application.

This module will generate a service using your JHipster entities that allows you to delete and recreate your entity indexes in Elasticsearch, then reinsert all data into the newly created indexes from your main datastore.

This is useful if any changes have been made to the main database outside of the application, like inserting rows using liquibase or migrating data from another database. This can also be used to solve Elasticsearch mapping errors that can be caused by changing a field's type or adding/removing fields.

# Prerequisites

This is a [JHipster](http://jhipster.github.io/) module, so you will need to have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

The generator will run if you haven't created any entities, but only the User entity will be added to the generated service. When creating a new project, it is recommended that you run this generator immediately and allow the post-entity generation hook rerun it automatically as you build your application.

# Installation

To install this module:

```bash
npm install -g generator-jhipster-elasticsearch-reindexer
```

To update this module:
```bash
npm update -g generator-jhipster-elasticsearch-reindexer
```

# Usage

For **monolithic** applications or applications from before microservices were introduced, you only need to follow the instructions below once.

For **microservices and gateways**, you need to follow the directions below for each of your services and gateways. When generating the service for gateways, only reindexing for the `User` entity will be generated. For microservices, reindexing for every entity except the `User` entity will be generated.

```bash
yo jhipster-elasticsearch-reindexer
```

This will write all JHipster entities to a service that can be called through your API. This needs to be run any time you add or remove an entity to your project.

If you are using **JHipster 2.27.0** and above, a post-entity generation hook will be set that will automatically rerun `jhipster-elasticsearch-reindexer`. For **JHipster 2.26.2** and below, `jhipster-elasticsearch-reindexer` needs to be rerun manually.

A new admin menu link will be added that will allow you to call the service. You will need to be logged in as an admin user to see it.

If you don't see the link, that probably means you are using an older version of JHipster that does not have support for adding admin menu links from modules. You will need to manually add the link:

```html
<li ui-sref-active="active">
    <a ui-sref="elasticsearch-reindex" data-toggle="collapse" data-target=".navbar-collapse.in">
        <span class="glyphicon glyphicon-exclamation-sign"></span>&#xA0;
        <span translate="global.menu.admin.elasticsearch">Reindex Elasticsearch</span>
    </a>
</li>
```

Alternatively, you can call the API directly by sending a POST request to `api/elasticsearch/index`. The request requires valid authentication details for an admin user. Here is an example using the default HTTP session authentication mechanism:

```bash
curl -X POST --header "X-CSRF-TOKEN: 00000000-0000-0000-0000-000000000000" --cookie "JSESSIONID=00000000000000000000000000000000;" "http://localhost:8080/api/elasticsearch/index"
```

This request can also be sent through Swagger.

# License

Apache-2.0 © [Gerald Humphries](mailto:geraldhumphries@gmail.com)

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-elasticsearch-reindexer.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-elasticsearch-reindexer
[travis-image]: https://travis-ci.org/geraldhumphries/generator-jhipster-elasticsearch-reindexer.svg?branch=master
[travis-url]: https://travis-ci.org/geraldhumphries/generator-jhipster-elasticsearch-reindexer
[daviddm-image]: https://david-dm.org/geraldhumphries/generator-jhipster-elasticsearch-reindexer.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/geraldhumphries/generator-jhipster-module

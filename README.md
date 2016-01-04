# generator-jhipster-elasticsearch-reindexer
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module, Generate a service for reindexing all database rows for each of your entities

# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application.

# Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

You also need to have created entities using JHipster.

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

```bash
yo jhipster-elasticsearch-reindexer
```

This will write all JHipster entities to a service that can be called through your API. This needs to be run any time you add or remove an entity to your project.

To call the service, you need to send a POST request to `api/elasticsearch/index`. Ex:

```bash
curl -X POST --header "Content-Type: application/json" --header "Accept: text/plain" --header "X-CSRF-TOKEN: 00000000-0000-0000-0000-000000000000" "http://localhost:8080/api/elasticsearch/index"
```

# License

Apache-2.0 © [Gerald Humphries]

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-elasticsearch-reindexer.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-elasticsearch-reindexer
[travis-image]: https://travis-ci.org/geraldhumphries/generator-jhipster-elasticsearch-reindexer.svg?branch=master
[travis-url]: https://travis-ci.org/geraldhumphries/generator-jhipster-elasticsearch-reindexer
[daviddm-image]: https://david-dm.org/geraldhumphries/generator-jhipster-elasticsearch-reindexer.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/geraldhumphries/generator-jhipster-module

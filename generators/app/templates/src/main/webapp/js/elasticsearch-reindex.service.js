(function () {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .factory('ElasticsearchReindex', ElasticsearchReindex);

    ElasticsearchReindex.$inject = ['$resource'];

    function ElasticsearchReindex($resource) {
        var service = $resource('api/elasticsearch/index', {}, {
            'reindex': {method: 'POST'},
            'reindexSelected': {method: 'POST', url: 'api/elasticsearch/selected'}
        });

        return service;
    }
})();

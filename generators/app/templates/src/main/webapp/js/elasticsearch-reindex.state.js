(function () {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('elasticsearch-reindex', {
            parent: 'admin',
            url: '/elasticsearch-reindex',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'elasticsearch.reindex.title'
            },
            views: {
                'content@': {
                    templateUrl: '<%=appFolder%>elasticsearch-reindex.html',
                    controller: 'ElasticsearchReindexController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('elasticsearch-reindex');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        }).state('elasticsearch-reindex.dialog', {
            parent: 'elasticsearch-reindex',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: '<%=appFolder%>elasticsearch-reindex-dialog.html',
                    controller: 'ElasticsearchReindexDialogController',
                    controllerAs: 'vm',
                    size: 'sm'
                }).result.finally(function () {
                    $state.go('^');
                });
            }]
        });
    }
})();

(function () {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('ElasticsearchReindexController', ElasticsearchReindexController);

    ElasticsearchReindexController.$inject = ['$state', 'AlertService', '$translate'];

    function ElasticsearchReindexController($state, AlertService, $translate) {
        var vm = this;
        vm.reindexType = 'all';
        vm.entities = [
    <%_ if (applicationType === 'monolith' || applicationType === 'microservice') {
            entityFiles.forEach(function (file) {
                var entity = file.split('.json')[0]; _%>
                '<%=entity%>',
    <%_     });
        }
    _%>
                'User'
              ];
        vm.checks = {};
        vm.entities.forEach(
                function(name) {
                    vm.checks[name] = false;
                }
        );
        vm.doReindex = doReindex;
        function doReindex() {
            if (vm.reindexType == 'all') {
                $state.transitionTo('elasticsearch-reindex.dialog');
            } else {
                var reindexList = vm.entities.filter(function (name) {
                    return vm.checks[name];
                });
                if (reindexList.length > 0) {
                    $state.transitionTo('elasticsearch-reindex.selected-dialog', {entities: reindexList});
                } else {
                    AlertService.error($translate.instant('elasticsearch.reindex.selectEntityAlert'));
                }
            }
        }
    }
})();

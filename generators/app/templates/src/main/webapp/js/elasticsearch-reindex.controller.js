(function () {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('ElasticsearchReindexController', ElasticsearchReindexController);

    ElasticsearchReindexController.$inject = ['$state'];

    function ElasticsearchReindexController($state) {
        var vm = this;
        vm.reindexType = 'all';
        vm.entities = [
    <%_ if (applicationType === 'monolith' || applicationType === 'microservice') {
            entityFiles.forEach(function (file) {
                var entity = file.split('.json')[0]; _%>
                <%=entity%>,
    <%_     });
        }
    _%>
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
                console.log('Not implemented yet');
                alert('Not implemented yet');
            }
        }
    }
})();

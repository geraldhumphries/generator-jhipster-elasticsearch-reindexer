(function () {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('ElasticsearchReindexSelectedDialogController', ElasticsearchReindexDialogController);

    ElasticsearchReindexSelectedDialogController.$inject = ['$uibModalInstance', 'ElasticsearchReindex', 'entities'];

    function ElasticsearchReindexSelectedDialogController($uibModalInstance, ElasticsearchReindex, entities) {
        var vm = this;

        vm.clear = clear;
        vm.confirmReindex = confirmReindex;
        vm.entities = entities;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmReindex() {
            var postData = vm.entities;
            if (!Array.isArray(postData)) {
                postData = [postData];
            }
            ElasticsearchReindex.reindexSelected(
                    {}, postData,
                $uibModalInstance.close(true);
            });
        }
    }
})();

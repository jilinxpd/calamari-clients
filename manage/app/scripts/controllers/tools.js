/* global define */
(function() {
    'use strict';
    define(['lodash', 'moment'], function(_, moment) {

        var ToolController = function($q, $timeout, $scope, ClusterService, ToolService) {
            $scope.clusterName = ClusterService.clusterModel.name;
            $scope.logui = 'spinner';
            var promises = [ToolService.log()];
            $q.all(promises).then(function(results) {
                (function(logs) {
                    var lines = logs.lines.split('\n');
                    $scope.logs = _.map(lines, function(log) {
                        var line = log.split(' ');
                        return {
                            timestamp: moment(line[0] + ' ' + line[1]).fromNow(),
                            unit: line[2],
                            address: line[3] + ' ' + line[4],
                            rest: line.slice(6).join(' '),
                        };
                    });
                    $scope.logui = 'logs';
                })(results[0]);
                $scope.up = true;
            });
        };
        return ['$q', '$timeout', '$scope', 'ClusterService', 'ToolService', ToolController];
    });
})();
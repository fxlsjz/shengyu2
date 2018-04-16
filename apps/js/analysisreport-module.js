'use strict';
angular.module('fundApp')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('tabs.analysisreport', {
                url: "/analysisreport", 
                    controller: 'analysisReportCtrl',
                    templateUrl: 'apps/modules/analysisreport/templates/index.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile(['analysisreport','analysisreport','analysisreport','analysisreport','analysisreport','analysis','analysis','analysis'], [ 'analysisreport.css','analysisReportCtrl.js','jquery-2.1.1.min.js','FileSaver.js','jquery.wordexport.js','associat.css','analyComCtrl.js','associatCtrl.js']));
                    }]
                }
            })
             /* 关于胜遇法律声明*/
          .state('tabs.analysisreport.statement', {
                url: "/analysisreport/statement", 
                    controller: 'statementCtrl',
                    templateUrl: 'apps/modules/accountset/templates/statement.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'statement.css','statementCtrl.js']));
                    }]
                }
            })
          .state('tabs.analysisreport.about', {
                url: "/analysisreport/about", 
                    controller: 'aboutCtrl',
                    templateUrl: 'apps/modules/accountset/templates/about.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'about.css','aboutCtrl.js']));
                    }]
                }
            })
        }]);

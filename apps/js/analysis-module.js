'use strict';
angular.module('fundApp')
	.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
		function($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
			$stateProvider.state('tabs.analysis', {
					url: "/analysis",
					controller: 'analysisCtrl',
					templateUrl: 'apps/modules/analysis/templates/index.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('analysis', ['analysis.css', 'analysisCtrl.js']));
						}]
					}
				})
				/* 企业概况*/
				.state('tabs.analysis.enterprise', {
					url: "/analysis/enterprise",
					controller: 'enterpriseCtrl',
					templateUrl: 'apps/modules/analysis/templates/enterprise.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('analysis', ['enterprise.css', 'enterpriseCtrl.js', 'analyComCtrl.js']));
						}]
					}
				})
				/* 财务研究*/
				.state('tabs.analysis.financial', {
					url: "/analysis/financial",
					controller: 'financialCtrl',
					templateUrl: 'apps/modules/analysis/templates/financial.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('analysis', ['financial.css', 'financialCtrl.js', 'analyComCtrl.js']));
						}]
					}
				})
				/* 关联风险研究*/
				.state('tabs.analysis.associat', {
					url: "/analysis/associat",
					controller: 'associatCtrl',
					templateUrl: 'apps/modules/analysis/templates/associat.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('analysis', ['associat.css', 'associatCtrl.js', 'analyComCtrl.js']));
						}]
					}
				})
				/* 事件研究*/
				.state('tabs.analysis.event', {
					url: "/analysis/event",
					controller: 'eventCtrl',
					templateUrl: 'apps/modules/analysis/templates/event.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('analysis', ['event.css', 'eventCtrl.js', 'analyComCtrl.js']));
						}]
					}
				})
				/* 风险模式识别*/
				.state('tabs.analysis.risk', {
					url: "/analysis/risk",
					controller: 'riskCtrl',
					templateUrl: 'apps/modules/analysis/templates/risk.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('analysis', ['risk.css', 'riskCtrl.js', 'analyComCtrl.js']));
						}]
					}
				})
				/* 关于胜遇法律声明*/
				.state('tabs.analysis.statement', {
					url: "/analysis/statement",
					controller: 'statementCtrl',
					templateUrl: 'apps/modules/accountset/templates/statement.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', ['statement.css', 'statementCtrl.js']));
						}]
					}
				})
				.state('tabs.analysis.about', {
					url: "/analysis/about",
					controller: 'aboutCtrl',
					templateUrl: 'apps/modules/accountset/templates/about.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', ['about.css', 'aboutCtrl.js']));
						}]
					}
				})
				//分析模块公共的部分
				.state('tabs.analysis.analysiscom', {
					url: "/analysis/analysiscom",
					controller: 'analyComCtrl',
					templateUrl: 'apps/modules/analysis/templates/analysis-common.html',
					resolve: {
						loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(helperProvider.loadModuleFile('analysis', ['about.css', 'analyComCtrl.js']));
						}]
					}
				})

		}
	]);
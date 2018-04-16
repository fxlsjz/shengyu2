'use strict';
//
app.controller('associatCtrl', function($rootScope, $scope, $state, $stateParams, $location, $cookies, userInfo, getInterface, pageData, $anchorScroll, $http, $timeout) {
	
//	var _hmt = _hmt || [];
	var analysisreportA = 'tabAnalysisreport';//分析报告
	var analysisreportB = 'click';
	var analysisreportC = 'analysisreport';
	
	//关联风险研究
	var riskResearchA = 'riskResearch';//分析报告
	var riskResearchB = 'click';
	var riskResearchC = 'riskResearchS';
	_hmt.push(['_trackEvent', riskResearchA, riskResearchB, riskResearchC]);
	console.log(riskResearchA);
	//担保风险
	var guaranteeRiskA = 'guaranteeRisk';
	var guaranteeRiskB = 'click';
	var guaranteeRiskC = 'guaranteeRiskS';
	//担保分析的“查看关联图谱”
	var viewMapA = 'viewMap';
	var viewMapB = 'click';
	var viewMapC = 'viewMapS';
	//对标分析
	var benchmarkingA = 'benchmarking';
	var benchmarkingB = 'click';
	var benchmarkingC = 'benchmarkingS';
	//对标分析的对企业查询
	var queryA = 'companyQuery';
	var queryB = 'click';
	var queryC = 'companyQueryS';
	//查询的弹框
	var bombBoxA = 'bombBox';
	var bombBoxB = 'click';
	var bombBoxC = 'bombBoxS';
	//对标分析的对文件夹的查询
	var folderQueryA = 'folderQuery';
	var folderQueryB = 'click';
	var folderQueryC = 'folderQueryS';
	
	
	
	$scope.fenXi = $state.current.name;
	if($scope.fenXi == 'tabs.analysisreport'){
		_hmt.push(['_trackEvent', analysisreportA, analysisreportB, analysisreportC]);
		console.log(analysisreportA);
	}
	
	
	
	/****************************投保风险开始****************************/
	//页面参数
	$scope.label = 'tbfx'; //内容显示分类
	$scope.isShowGuaranteeNoData = false; //是否显示担保列表无数据图片
	$scope.isShowfgldbNoData = false; //是否显示非关联担保关系列表无数据图片
	$scope.isShowgldbNoData = false; //是否显示关联担保关系列表无数据图片
	$scope.isShowxhdbNoData = false; //是否显示循环担保明细无数据图片
	$scope.isShowdbgsNoData = false; //是否显示担保公司列表无数据图片
	$scope.isShowdbblNoData = false; //是否显示担保比例列表无数据图片
	//数据
	$scope.guaranteeList = undefined; //投保风险列表
	$scope.fgldbList = undefined; //非关联担保关系列表
	$scope.gldbList = undefined; //关联担保关系列表
	$scope.xhdbData = undefined; //循环担保明细数据
	$scope.dbgsList = undefined; //担保公司列表
	$scope.dbblData = undefined; //担保比例数据
	//
	var creditCode; //统一社会信用代码
	var companyCode; //企业注册号

	init(); //初始化

	/**
	 * 17.1投保风险-担保列表
	 */
	function loadWinmetList(searchKey) {
		var options = {
			service_code: 'WINMET_APP_GUARANTEE_RISK_LIST',
			params: {
				service_code: 'WINMET_APP_GUARANTEE_RISK_LIST',
				company_code: companyCode,
				credit_code: creditCode
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(results.status == 'Y' && results.results && results.results.data_list && results.results.data_list.length > 0) {
				$scope.guaranteeList = results.results.data_list;
				$scope.isShowGuaranteeNoData = false;
			} else {
				$scope.isShowGuaranteeNoData = true;
			}
		});
	};
	/**
	 * 17.2投保风险-担保关系top3
	 * @param {Object} type OUT  非关联对外担保 IN 关联对外担保
	 */
	function loadDbgxList(type, searchKey) {
		var options = {
			service_code: 'WINMET_APP_GUARANTEE_RISK_TOP_LIST',
			params: {
				service_code: 'WINMET_APP_GUARANTEE_RISK_TOP_LIST',
				company_code: companyCode,
				credit_code: creditCode,
				type: type
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			var item = undefined;
			var isShowNoData = false;
			if(results.status == 'Y' && results.results && results.results.data_list && results.results.data_list.length > 0) {
				item = results.results.data_list;
				isShowNoData = false;
			} else {
				isShowNoData = true;
			}
			if(type == "OUT") {
				$scope.fgldbList = item;
				$scope.isShowfgldbNoData = isShowNoData;
			} else if(type == 'IN') {
				$scope.gldbList = item;
				$scope.isShowgldbNoData = isShowNoData;
			}
		});

	}
	/**
	 * 17.3投保风险-循环担保明细
	 */
	function loadxhdbList(searchKey) {
		var options = {
			service_code: 'WINMET_APP_GUARANTEE_RISK_LOOP_INFO',
			params: {
				service_code: 'WINMET_APP_GUARANTEE_RISK_LOOP_INFO',
				company_code: companyCode,
				credit_code: creditCode
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(results.status == 'Y' && results.results) {
				$scope.xhdbData = results.results;
				$scope.isShowxhdbNoData = false;
			} else {
				$scope.isShowxhdbNoData = true;
			}
		});
	};
	/**
	 * 17.4投保风险-关联的担保公司top3
	 */
	function loaddbgsList(searchKey) {
		var options = {
			service_code: 'WINMET_APP_GUARANTEE_GET_COM_TOP_LIST',
			params: {
				service_code: 'WINMET_APP_GUARANTEE_GET_COM_TOP_LIST',
				company_code: companyCode,
				credit_code: creditCode
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(results.status == 'Y' && results.results && results.results.data_list && results.results.data_list.length > 0) {
				$scope.dbgsList = results.results.data_list;
				$scope.isShowdbgsNoData = false;
			} else {
				$scope.isShowdbgsNoData = true;
			}
		});
	};
	/**
	 * 17.5投保风险-获得担保比例
	 */
	function loaddbblList(searchKey) {
		var options = {
			service_code: 'WINMET_APP_GUARANTEE_GET_PROP_LIST',
			params: {
				service_code: 'WINMET_APP_GUARANTEE_GET_PROP_LIST',
				company_code: companyCode,
				credit_code: creditCode
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(results.status == 'Y' && results.results && results.results.data_list && results.results.data_list.length > 0) {
				$scope.dbblData = results.results;
				$scope.isShowdbblNoData = false;
			} else {
				$scope.isShowdbblNoData = true;
			}
		});
	};
	/****************************投保风险结束****************************/
	/************************对标分析-企业对企业开始****************************/
	//对标分析搜索框文字
	$scope.dbfxSearchKey = {
		text: ''
	};
	//页面参数
	$scope.isShowDbfxNoData = false;
	//数据
	$scope.companyNameList = undefined; //企业对企业公司名称搜索
	$scope.companyName = ''; //当前正在搜索的企业对企业公司名称
	$scope.companyInfo = undefined; //企业对企业选中的公司信息
	$scope.dbfxList = undefined; //对标分析列表

	//企业对企业公司搜索监听
	$scope.onChangeListener = function() {
		$scope.companyNameList = undefined;
		if($scope.dbfxSearchKey.text == '') return;
		if(!$rootScope.$_userSearchData) return;
		if(!$rootScope.$_userSearchData.searchKey) return;
		companyNameSearch($rootScope.$_userSearchData.searchKey, $scope.dbfxSearchKey.text);
	};
	//企业对企业选择公司
	$scope.selectCompany = function(companyName) {
		if($scope.dbfxSearchKey.text == '') return;
		if(!$rootScope.$_userSearchData) return;
		if(!$rootScope.$_userSearchData.searchKey) return;
		companyBrief($rootScope.$_userSearchData.searchKey, companyName);
	};

	//企业对企业查询
	$scope.query = function() {
		
		_hmt.push(['_trackEvent', queryA, queryB, queryC]);
		console.log(queryC)
		if(!$rootScope.$_userSearchData) {
			showNoCompany('请搜索或选择企业');
			return;
		}
		if(!$scope.companyInfo) {
			showNoCompany('请搜索企业');
			return;
		}
		if($scope.companyInfo.isNew != 2) {
			showNoCompany('请勿重复点击');
			return;
		}
		$scope.companyInfo.isNew = 3;
		companydbfx($rootScope.$_userSearchData.searchKey, $scope.companyInfo.company_code, $scope.companyInfo.credit_code);
	};
	//企业对企业查询
	$rootScope.dbfxKeyup = function(e) {
		e = window.event || e;
		var keycode = e.keyCode || e.which || e.charCode;
		if(keycode == 13) {
			$scope.query();
		}
	};
	/************************17.9对标分析-企业对企业结束****************************/
	/************************17.10对标分析-企业对黑名单检测开始****************************/
	var isLoadingBlackList = false; //判断是否正在加载黑名单列表
	//页面参数
	$scope.isShowHmdNoData = false; //是否显示企业对黑名单检测列表无数据提示
	//数据
	$scope.blackList = undefined; //黑名单列表
	$scope.blackItem = undefined; //当前选中的黑名单
	$scope.hmdList = undefined; //企业对黑名单检测列表
	//企业对黑名单检测选择黑名单列表
	$scope.selectBlackList = function() {
		for(var i = 0; i < $scope.blackList.length; i++) {
			if($scope.blackItem.display_name == $scope.blackList[i].display_name) {
				$scope.blackItem = angular.copy($scope.blackList[i]);
				$scope.blackItem.isLoad = 2;
				return;
			}
		}
	};
	//点击黑名单列表 若没有数据则重新加载数据
	$scope.onSelectClick = function() {
		if(!$scope.blackList && $rootScope.$_userSearchData && !isLoadingBlackList) {
			getBlacklist($rootScope.$_userSearchData.searchKey);
		}
	};
	//企业对黑名单检测查询按钮
	$scope.queryHmd = function() {
		_hmt.push(['_trackEvent', folderQueryA, folderQueryB, folderQueryC]);
		console.log(folderQueryC);
		if(!$rootScope.$_userSearchData) {
			showNoCompany('请搜索或选择企业');
			return;
		}
		if(!$scope.blackItem) {
			showNoCompany('请选择黑名单');
			return;
		}
		if($scope.blackItem.isLoad != 2) {
			showNoCompany('请勿重复点击');
			return;
		}
		$scope.blackItem.isLoad = 3;
		companyHmd($rootScope.$_userSearchData.searchKey, $scope.blackItem.set_id);
	};
	/************************17.10对标分析-企业对黑名单检测结束****************************/
	/**
	 * 4.6对标企业SUG搜索
	 * @param {Object} searchKey 企业名称
	 * @param {Object} search_str 搜索关键字
	 */
	function companyNameSearch(searchKey, search_str) {
		var options = {
			service_code: 'WINMET_APP_LONG_COMPANY_SEARCH_RESULT',
			params: {
				service_code: 'WINMET_APP_LONG_COMPANY_SEARCH_RESULT',
				company_code: companyCode,
				credit_code: creditCode,
				search_str: search_str
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(search_str != $scope.dbfxSearchKey.text) return;
			if(results.status == 'Y' && results.results && results.results.company_name && results.results.company_name.length > 0) {
				$scope.companyNameList = results.results.company_name;
			}
		});
	};

	/**
	 * 4.3企业工商简况
	 * @param {Object} searchKey 企业名称
	 * @param {Object} search_str 搜索关键字
	 */
	function companyBrief(searchKey, companyName) {
		var options = {
			service_code: 'WINMET_APP_COMPANY_BRIEF',
			params: {
				service_code: 'WINMET_APP_COMPANY_BRIEF',
				company_code: companyCode,
				credit_code: creditCode,
				company_name: companyName
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(results.status == 'Y' && results.results) {
				$scope.dbfxSearchKey.text = companyName;
				$scope.companyName = companyName;
				$scope.companyInfo = results.results;
				$scope.companyInfo.isNew = 2;
				$scope.companyNameList = undefined;
			}
		});
	};
	/**company_code_selected
	 * 17.9对标分析-企业对企业
	 * @param {Object} searchKey 企业名称
	 * @param {Object} company_code_select 
	 * @param {Object} credit_code_select
	 */
	function companydbfx(searchKey, company_code_select, credit_code_select) {
		var options = {
			service_code: 'WINMET_APP_BENCHMARKING_ANALYSIS',
			params: {
				service_code: 'WINMET_APP_BENCHMARKING_ANALYSIS',
				company_code_selected: companyCode,
				credit_code_selected: creditCode,
				company_code_select: company_code_select,
				credit_code_select: credit_code_select
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(!$scope.companyInfo || $scope.companyInfo.company_code != company_code_select) return;
			if(!$scope.companyInfo || $scope.companyInfo.credit_code != credit_code_select) return;
			if(results.status == 'Y' && results.results && results.results.length > 0) {
				$scope.isShowDbfxNoData = false;
				$scope.dbfxList = results.results;
			} else {
				$scope.dbfxList = undefined;
				$scope.isShowDbfxNoData = true;
			}
		});
	};
	/**
	 * 8.4获取黑名单文件夹列表
	 * @param {Object} searchKey 企业名称
	 * @param {Object} company_code_select 
	 * @param {Object} credit_code_select
	 */
	function getBlacklist(searchKey) {
		isLoadingBlackList = true;
		var options = {
			service_code: 'WINMET_APP_BLACK_SET_LIST',
			params: {
				service_code: 'WINMET_APP_BLACK_SET_LIST',
				type: 2
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(results.status == 'Y' && results.results && results.results.length > 0) {
				$scope.blackList = results.results;
				$scope.blackItem = angular.copy($scope.blackList[0]);
				$scope.blackItem.isLoad = 2;
			}
			isLoadingBlackList = false;
		});
	};
	/**
	 * 17.10对标分析-企业对黑名单检测
	 * @param {Object} searchKey 企业名称
	 * @param {Object} company_code_select 
	 * @param {Object} credit_code_select
	 */
	function companyHmd(searchKey, set_id) {
		var options = {
			service_code: 'WINMET_APP_BENCHMARKING_BLACK_ANALYSIS',
			params: {
				service_code: 'WINMET_APP_BENCHMARKING_BLACK_ANALYSIS',
				company_code_selected: companyCode,
				credit_code_selected: creditCode,
				set_id: set_id
			}
		};
		getInterface.jsonp(options, function(results) {
			if(searchKey != $rootScope.$_userSearchData.searchKey) return;
			if(!$scope.blackItem || $scope.blackItem.set_id != set_id) return;
			if(results.status == 'Y' && results.results && results.results.length > 0) {
				$scope.isShowHmdNoData = false;
				$scope.hmdList = results.results;
			} else {
				$scope.hmdList = undefined;
				$scope.isShowHmdNoData = true;
			}
		});
	};
	/***************对标分析结束****************/
	/***************公用开始****************/

	//切换标签
	$scope.tab = function(label) {
		
	
		if(label == 'tbfx'){
			_hmt.push(['_trackEvent', guaranteeRiskA, guaranteeRiskB, guaranteeRiskC]);
			console.log(guaranteeRiskC);
		}else if(label == 'dbfx'){
			_hmt.push(['_trackEvent', benchmarkingA, benchmarkingB, benchmarkingC]);
			console.log(benchmarkingC);
		}
		if($scope.label == label) return;
		$scope.label = label;
		init();
	};
	/*关闭弹出框*/
	$scope.noBomb = function() {
		_hmt.push(['_trackEvent', bombBoxA, bombBoxB, bombBoxC]);
		console.log(bombBoxC);
		$scope.errcodeBomb = false;
	};
	$scope.okBomb = function() {
		_hmt.push(['_trackEvent', bombBoxA, bombBoxB, bombBoxC]);
		console.log(bombBoxC);
		$scope.errcodeBomb = false;
	};

	/**
	 * 初始化
	 */
	function init() {
		if($rootScope.$_userSearchData) { //如果有搜索的关键字
			if($rootScope.$_userSearchData.searchKey) {
				creditCode = $rootScope.$_userSearchData.creditCode; //统一社会信用代码
				companyCode = $rootScope.$_userSearchData.companyCode; //企业注册号
				if($scope.label == 'tbfx') {
					loadWinmetList($rootScope.$_userSearchData.searchKey); //17.1
					setTimeout(function() {
						//17.2 投保风险 - 担保关系top3 非关联对外担保
						loadDbgxList('OUT', $rootScope.$_userSearchData.searchKey);
						setTimeout(function() {
							//17.2 投保风险 - 担保关系top3 关联对外担保
							loadDbgxList('IN', $rootScope.$_userSearchData.searchKey);
							setTimeout(function() {
								//17.3 投保风险 - 循环担保明细
								loadxhdbList($rootScope.$_userSearchData.searchKey);
								setTimeout(function() {
									//17.4投保风险-关联的担保公司top3
									loaddbgsList($rootScope.$_userSearchData.searchKey);
									setTimeout(function() {
										//17.5投保风险-获得担保比例
										loaddbblList($rootScope.$_userSearchData.searchKey);
									}, 100);
								}, 100);
							}, 100);
						}, 100);
					}, 100);
				} else if($scope.label == 'dbfx') {
					getBlacklist($rootScope.$_userSearchData.searchKey);
				}
			}
		}
	}
	/**
	 * 显示请搜索或选择企业弹出框
	 */
	function showNoCompany(str) {
		$scope.errcodeBomb = true;
		$scope.errcodeText = str;
	}
	/**
	 * 清除投保风险数据
	 */
	function clearTbfx() {
		$scope.isShowGuaranteeNoData = false; //是否显示担保列表无数据图片
		$scope.isShowfgldbNoData = false; //是否显示非关联担保关系列表无数据图片
		$scope.isShowgldbNoData = false; //是否显示关联担保关系列表无数据图片
		$scope.isShowxhdbNoData = false; //是否显示循环担保明细无数据图片
		$scope.isShowdbgsNoData = false; //是否显示担保公司列表无数据图片
		$scope.isShowdbblNoData = false; //是否显示担保比例列表无数据图片
		$scope.guaranteeList = undefined; //投保风险列表
		$scope.fgldbList = undefined; //非关联担保关系列表
		$scope.gldbList = undefined; //关联担保关系列表
		$scope.xhdbData = undefined; //循环担保明细数据
		$scope.dbgsList = undefined; //担保公司列表
		$scope.dbblData = undefined; //担保比例数据
	}
	/**
	 * 清除对标分析数据
	 */
	function clearDbfx() {
		//页面参数
		$scope.isShowDbfxNoData = false;//是否显示企业对企业对标分析
		//数据
		$scope.companyNameList = undefined; //企业对企业公司名称搜索
		$scope.companyName = ''; //当前正在搜索的企业对企业公司名称
		$scope.companyInfo = undefined; //企业对企业选中的公司信息
		$scope.dbfxList = undefined; //对标分析列表

		$scope.isShowHmdNoData = false; //是否显示企业对黑名单检测列表无数据提示
		//数据
		$scope.blackList = undefined; //黑名单列表
		$scope.blackItem = undefined; //当前选中的黑名单
		$scope.hmdList = undefined; //企业对黑名单检测列表
		
		$scope.dbfxSearchKey.text = '';//对标分析搜索框文字
	}
	var $watch = $rootScope.$watch('$_userSearchData.searchKey', function(val1, val2) {
		if($rootScope.$_userSearchData) {
			if(val1 != val2) {
				clearTbfx();
				clearDbfx();
				init();
			}
		}

	}, true);

	/***************公用结束****************/
	/***************关系图谱start**************/
	$rootScope.show = false;
	$rootScope.metadata = false;
	var atlasDatas = {};
	var drawImg = function(atlasDatas, width, height) {
		var myChart = echarts.init(document.getElementById('diagram_echart'), {}, {
			width: width,
			height: height
		});
		if(parseInt(width) == 800 && $rootScope.toLarger && $rootScope.isProcessing) { //如果数据正在加载中点击放大按钮，重新初始化echarts
			var width = document.documentElement.clientWidth + 'px';
			var diagHeight = document.documentElement.clientHeight - 40 + 'px';
			var myChart = echarts.init(document.getElementById('diagram_echart'), {}, {
				width: width,
				height: diagHeight
			});
		}
		var option = {};
		var rnd = function(n, m) {
			return Math.floor(Math.random() * (m - n) + n);
		}
		var myRandomNum = function(m, n) {
			return rnd(m, n);
		}
		if(atlasDatas.nodes.length == 0) {
			$rootScope.isProcessing = false;
			$rootScope.metadata = true;
			return;
		};
		$rootScope.isProcessing = false;
		if(atlasDatas.nodes.length > 0 && atlasDatas.edges.length > 0) {

			angular.forEach(atlasDatas.nodes, function(value, index) {
				value.x = rnd(-1000000, 1000000) * Math.random();
				value.y = rnd(-1000000, 1000000) * Math.random();
				value.color = 'rgb(' + rnd(0, 255) + ',' + rnd(0, 255) + ',' + rnd(0, 255) + ')';
			});
			var sumSize = function(node) {
				var sum = 0;
				var num = 0;
				angular.forEach(atlasDatas.edges, function(value, index) {
					if(node.id == value.sourceID && value.size !== '--') {
						sum += parseFloat(value.size);
						num++;
					}
				});
				return Math.log(Math.sqrt(sum)) * 10 < 10 ? 10 : Math.log(Math.sqrt(sum)) * 10;
			}
			myChart.setOption(option = {
				tooltip: {
					trigger: 'item',
					hideDelay: 3000,
					enterable: true,
					show: true,
					formatter: function(params) {
						for(var i = 0; i < atlasDatas.nodes.length; i++) {
							if(params.data.source === atlasDatas.nodes[i].id) {
								var sourceName = atlasDatas.nodes[i].label;
							}
							if(params.data.target === atlasDatas.nodes[i].id) {
								var targetName = atlasDatas.nodes[i].label;
							}
						}

						if(params.dataType == 'edge') {
							return sourceName + ' > ' + targetName + '</br>' +
								'担保金额 : ' + params.value;
						}
					}
				},
				series: [{
					type: 'graph',
					layout: 'none',
					data: atlasDatas.nodes.map(function(node) {
						return {
							x: node.x,
							y: node.y,
							id: node.id,
							name: node.label,
							symbolSize: sumSize(node),
							itemStyle: {
								normal: {
									color: node.color
								}
							}
						};
					}),
					edges: atlasDatas.edges.map(function(edge) {
						return {
							source: edge.sourceID,
							target: edge.targetID,
							value: edge.size,
						};
					}),
					label: {
						emphasis: {
							position: 'left',
							show: true
						}
					},
					edgeSymbol: ['circle', 'arrow'],
					edgeSymbolSize: [2, 8],
					edgeLabel: {
						position: 'middle',
						normal: {
							textStyle: {
								fontSize: 20
							}
						}
					},
					roam: true,
					focusNodeAdjacency: true,
					lineStyle: {
						normal: {
							width: 0.5,
							curveness: 0.1,
							opacity: 0.7
						}
					}
				}]
			}, true);
		}
	}
	$rootScope.clickdiagram = function() {
			_hmt.push(['_trackEvent', viewMapA, viewMapB, viewMapC]);
			console.log(viewMapC);
			$scope.$emit("$setWindowOverflowIsAuto", false);
			atlasDatas = {};
			$rootScope.diagram = true;
			$rootScope.show = true;
			$rootScope.toLarger = false; //放大窗口
			$rootScope.metadata = true; //暂无数据

			var loadConcernList = function() {
				$rootScope.metadata = false; //暂无数据
				$rootScope.isProcessing = true; //正在加载。。。
				var options = {
					service_code: 'WINMET_APP_ASSURE_RISK_SLOBON',
					params: {
						service_code: 'WINMET_APP_ASSURE_RISK_SLOBON',
						company_code: companyCode, //企业注册号
						credit_code: creditCode //统一社会信用代码
					}
				};
				getInterface.jsonp(options, function(results) {
					if(results.status == 'Y') {
						atlasDatas = results.results;
						drawImg(atlasDatas, '600px', '536px');
					} else if(results.status == 'N') {
						$rootScope.show = false;
						$rootScope.diagram = false;
						$rootScope.metadata = true;
						$rootScope.errcodeBomb = true;
						$rootScope.errcodeText = results.error_msg;
					}
				});

			};
			if(companyCode || creditCode) {
				loadConcernList();
			}
		}
		/*关闭弹框按钮*/
	$rootScope.closediagram = function() {
		$rootScope.diagram = false;
		$rootScope.show = false;
		$rootScope.toLarge = false;
		$rootScope.largerdiagramCss = {};
		$scope.$emit("$setWindowOverflowIsAuto", true);
	};
	//窗口放大效果
	$rootScope.show = false;
	$rootScope.toLarger = false;
	$rootScope.largerdiagram = function() {
			$scope.$emit("$setWindowOverflowIsAuto", false);
			$rootScope.toLarger = true; //放大窗口
			var width = document.documentElement.clientWidth + 'px';
			var height = document.documentElement.clientHeight + 'px';
			$rootScope.largerdiagramCss = {
				width: width,
				height: height,
			}
			var diagHeight = document.documentElement.clientHeight - 40 + 'px';
			if(atlasDatas.nodes && atlasDatas.nodes.length > 0) {
				drawImg(atlasDatas, width, diagHeight);
			}

		}
		//窗口变小
	$rootScope.smalldiagram = function() {
			$rootScope.toLarger = false; //放大窗口
			$scope.$emit("$setWindowOverflowIsAuto", false);
			$rootScope.largerdiagramCss = {
				width: '600px',
				height: '600px',
			}
			if(atlasDatas.nodes && atlasDatas.nodes.length > 0) {
				drawImg(atlasDatas, '600px', '536px');
			}

		}
		/***************关系图谱end**************/
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if(fromState.name == 'tabs.analysis.associat') { //退出当前页面
			$watch = {};
			$scope.$emit("$setWindowOverflowIsAuto", true);
		}
	});
});
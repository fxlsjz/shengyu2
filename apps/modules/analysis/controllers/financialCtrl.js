'use strict';
//
app.controller('financialCtrl', function($rootScope, $scope, $state, $stateParams, $location, $cookies, userInfo, getInterface, pageData, $anchorScroll) {
	//风险研究
	var riskStudyA = 'riskStudy';
	var riskStudyB = 'click';
	var riskStudyC = 'riskStudyS';
	_hmt.push(['_trackEvent', riskStudyA, riskStudyB, riskStudyC]);
	console.log(riskStudyC);
	
//	var myChartb = echarts.init(document.getElementById('cwfx_chartb'), 'macarons', {
//		width: 'auto',
//		height: '330px'
//	});
//	var myChartc = echarts.init(document.getElementById('cwfx_chartc'), 'macarons', {
//		width: 'auto',
//		height: '330px'
//	});
//	var option = {
//		tooltip: {
//			trigger: 'axis',
//			axisPointer: { // 坐标轴指示器，坐标轴触发有效
//				type: 'line', // 默认为直线，可选为：'line' | 'shadow'
//				lineStyle: { // 直线指示器样式设置
//					color: '#48b',
//					width: 2,
//					type: 'solid'
//				},
//				shadowStyle: { // 阴影指示器样式设置
//					width: 'auto', // 阴影大小
//					color: 'rgba(150,150,150,0.3)' // 阴影颜色
//				}
//			},
//		},
//		legend: {
//			orient: 'horizontal', // 'vertical'
//			x: 'left', // 'center' | 'left' | {number},
//			y: 'top', // 'center' | 'bottom' | {number}
////			data: ['主体信用总评分', '行业信用总评分']
//			data: ['企业财务状况', '行业财务状况']
//		},
//		toolbox: {
//			show: true,
//			color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
//			feature: {
//				mark: {
//					show: true
//				}, //辅助线开关
//				markUndo: {
//					show: true
//				}, //删除辅助线
//				markClear: {
//					show: true
//				}, //清空辅助线
//				dataZoom: {
//					show: true
//				}, //区域缩放
//				dataView: {
//					show: false
//				}, //数据视图
//				magicType: {
//					show: true,
//					type: ['line']
//				},
//				restore: {
//					show: true
//				},
//				saveAsImage: {
//					show: false
//				},
//			}
//		},
//		calculable: true,
//		dataZoom: {
//			show: true,
//			realtime: true,
//			start: 50,
//			end: 100,
//			fillerColor: '#d4cde4',
//			backgroundColor: '#f7f7f7',
//			handleColor: '#008acd',
//			dataBackgroundColor: '#efefff',
//		},
//		grid: {
//			left: '3%',
//			right: '10%',
//			bottom: '20%',
//			containLabel: true
//		},
//		xAxis: [{
//			type: 'category',
//			boundaryGap: false,
//			data: function() {
//				var list = [];
//				for(var i = 1; i <= 30; i++) {
//					list.push('2013-03-' + i);
//				}
//				return list;
//			}(),
//			axisLabel: {
//				show: true,
//				textStyle: {
//					color: '#6a7883',
//					//						                fondside:"36px"
//					fontSize: 14
//				}
//			},
//			axisLine: {
//				lineStyle: {
//					color: '#000',
//					width: 1, //这里是为了突出显示加上的
//				}
//			},
//			splitLine: {
//				show: true,
//				lineStyle: {
//					color: ['#ccc'],
//					width: 1,
//					type: 'solid'
//				}
//			}, //网格线
//		}],
//		yAxis: [{
//			type: 'value',
//			axisLabel: {
//				show: true,
//				textStyle: {
//					color: '#6a7883',
//					//						                fondside:"36px"
//					fontSize: 14
//				}
//			},
//			axisLine: {
//				lineStyle: {
//					color: '#000',
//					width: 1, //这里是为了突出显示加上的
//				}
//			},
//			splitArea: { // 分隔区域
//				show: true, // 默认不显示，属性show控制显示与否
//				// onGap: null,
//				areaStyle: { // 属性areaStyle（详见areaStyle）控制区域样式
//					color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.2)']
//				}
//			},
//		}],
//		series: [{
////			name: '主体信用总评分',
//			name: '企业财务状况',
//			type: 'line',
//			itemStyle: {
//				normal: {
//					color: '#2ec7c9',
//				}
//			},
//			lineStyle: {
//				normal: {
//					width: 2, //连线粗细
//					color: "#2ec7c9" //连线颜色
//				}
//			},
//			data: function() {
//				var list = [];
//				for(var i = 1; i <= 30; i++) {
//					list.push(Math.round(Math.random() * 30));
//				}
//				return list;
//			}(),
//			smooth: true, //设置线是否平滑
//		}, {
////			name: '行业信用总评分',
//			name: '行业财务状况',
//			type: 'line',
//			itemStyle: {
//				normal: {
//					color: '#b6a2de',
//				}
//			},
//			lineStyle: {
//				normal: {
//					width: 2, //连线粗细
//					color: "#b6a2de" //连线颜色
//				}
//			},
//			data: function() {
//				var list = [];
//				for(var i = 1; i <= 30; i++) {
//					list.push(Math.round(Math.random() * 10));
//				}
//				return list;
//			}()
//		}]
//	};

//	myChartb.setOption(option);
//	myChartc.setOption(option);

	var companyName;
	var creditCode; //统一社会信用代码
	var companyCode; //企业注册号

	//10.1.	财务风险预测
	//		company_name: '河北信息产业投资集团有限公司'//企业名称
	$scope.loadFinanceData = function() {
		$scope.isShowState = true;
		var options = {
			service_code: 'WINMET_APP_FINANCIAL_RISK',
			params: {
				service_code: 'WINMET_APP_FINANCIAL_RISK',
				company_name: companyName //企业名称
			}
		};
		getInterface.jsonp(options, function(results) {
			if(results.status == 'Y') {
				$scope.bonddetail = results.results;
				$scope.isShowState = false;
				if(($scope.bonddetail.main_score_card && $scope.bonddetail.main_score_card.score_card_titile) || ($scope.bonddetail.little_grade && $scope.bonddetail.little_grade.length > 0)) {
					//图表
					//标题	 
					if($scope.isShowState == false && document.getElementById('chartMon')) {
						document.getElementById('chartMon').style.display = 'block';
					}
					$scope.tuTitleB = $scope.bonddetail.main_score_card.line_charge.line_charge_dataset;
					//	            	alert("$scope.tuTitleB::"+JSON.stringify($scope.tuTitleB));
					$scope.oneB = $scope.tuTitleB[0].value_title;
					$scope.twoB = $scope.tuTitleB[1].value_title;
					//将内容中含br 替换成 空

					if($scope.bonddetail.main_score_card.score_card_brief.indexOf('/br')) {

						$scope.bonddetail.main_score_card.score_card_brief = $scope.bonddetail.main_score_card.score_card_brief.replace(/\/br/g, '');
					}

					if($scope.bonddetail.little_grade.length > 0) {
						angular.forEach($scope.bonddetail.little_grade, function(value, index) {
							if(value.score_card_brief.indexOf('/br')) {
								value.score_card_brief = value.score_card_brief.replace('/br', '');
							}

						})
					}

					//横轴数据

					$scope.listsB = $scope.bonddetail.little_grade[0].line_charge.line_charge_x;
					//				alert("x轴：："+JSON.stringify($scope.listsB));
					$scope.listB = [];
					$scope.axisXB = [];
					angular.forEach($scope.listsB, function(data, index, array) {
						$scope.listB.push(data.x_name);
						var a = data.x_name * 1000
						var oDate = new Date();
						oDate.setTime(a);
						$scope.sDate = oDate.getFullYear() + '/' + (oDate.getMonth() + 1) + '/' + oDate.getDate();
						$scope.axisXB.push($scope.sDate);
					});
					//纵坐标
					//第一组
					$scope.oneYlistB = $scope.bonddetail.main_score_card.line_charge.line_charge_dataset[0].value_list;
					$scope.YlistB = [];
					angular.forEach($scope.oneYlistB, function(data, index, array) {
						$scope.YlistB.push(data.y_value);
					});
					//第二组
					$scope.twoYlistB = $scope.bonddetail.main_score_card.line_charge.line_charge_dataset[1].value_list;
					$scope.twoYlistsB = [];
					angular.forEach($scope.twoYlistB, function(data, index, array) {
						$scope.twoYlistsB.push(data.y_value);
					});
					var option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'line', // 默认为直线，可选为：'line' | 'shadow'
								lineStyle: { // 直线指示器样式设置
									color: '#48b',
									width: 2,
									type: 'solid'
								},
								shadowStyle: { // 阴影指示器样式设置
									width: 'auto', // 阴影大小
									color: 'rgba(150,150,150,0.3)' // 阴影颜色
								}
							},
						},
						legend: {
							orient: 'horizontal', // 'vertical'
							x: 'left', // 'center' | 'left' | {number},
							y: 'top', // 'center' | 'bottom' | {number}
							data: ['企业财务状况','行业财务状况']
						},
						toolbox: {
							show: true,
							color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
							feature: {
								mark: {
									show: true
								},
								dataZoom: {
									show: true
								},
								dataView: {
									show: false
								},
								magicType: {
									show: true,
									type: ['line']
								},
								restore: {
									show: true
								},
								saveAsImage: {
									show: false
								},
							}
						},
						calculable: true,
						dataZoom: {
							show: true,
							realtime: true,
							start: 50,
							end: 100,
							fillerColor: '#d4cde4',
							backgroundColor: '#f7f7f7',
							handleColor: '#008acd',
							dataBackgroundColor: '#efefff',
						},
						grid: {
							left: '3%',
							right: '10%',
							bottom: '20%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							data: $scope.listB,
							axisLabel: {
								show: true,
								textStyle: {
									color: '#6a7883',
									//						                fondside:"36px"
									fontSize: 14
								}
							},
							axisLine: {
								lineStyle: {
									color: '#000',
									width: 1, //这里是为了突出显示加上的
								}
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: ['#ccc'],
									width: 1,
									type: 'solid'
								}
							}, //网格线
						}],
						yAxis: [{
							type: 'value',
							axisLabel: {
								show: true,
								textStyle: {
									color: '#6a7883',
									//						                fondside:"36px"
									fontSize: 14
								}
							},
							axisLine: {
								lineStyle: {
									color: '#000',
									width: 1, //这里是为了突出显示加上的
								}
							},
							splitArea: { // 分隔区域
								show: true, // 默认不显示，属性show控制显示与否
								// onGap: null,
								areaStyle: { // 属性areaStyle（详见areaStyle）控制区域样式
									color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.2)']
								}
							},
						}],
						series: [{
//							name: $scope.oneB,
							name: '企业财务状况',
							type: 'line',
							data: $scope.YlistB,
							itemStyle: {
								normal: {
									color: "#2ec7c9" //图标颜色
								}
							},
							smooth: true,
							lineStyle: {
								normal: {
									width: 2, //连线粗细
									color: "#2ec7c9" //连线颜色
								}
							}

						}, {
//							name: $scope.twoB,
							name: '行业财务状况',
							type: 'line',
							data: $scope.twoYlistsB,
							itemStyle: {
								normal: {
									color: '#b6a2de',
								}
							},
							lineStyle: {
								normal: {
									width: 2, //连线粗细
									color: "#b6a2de" //连线颜色
								}
							},
						}]
					};

					if(document.getElementById('cwfx_chart')) {
						var echartBond = echarts.init(document.getElementById('cwfx_chart'), 'macarons', {
							width: 'auto',
							height: '330px'
						});
						echartBond.setOption(option);
					}

				} else {
					$scope.isNoData = !$scope.isShowState;
				}
			} else {
				$scope.errcodeBomb = true;
				$scope.errcodeText = results.error_msg;
			}

		});
	};

	var init = function() {
			if($rootScope.$_userSearchData) { //如果有搜索的关键字，调用4.4接口
				if($rootScope.$_userSearchData.searchKey) {
					$scope.isShowTip = false; //是否显示提示语
					companyName = $rootScope.$_userSearchData.companyName;
					creditCode = $rootScope.$_userSearchData.creditCode; //统一社会信用代码
					companyCode = $rootScope.$_userSearchData.companyCode; //企业注册号
					//16.2说明或指标说明
					$scope.analysiisReportInfomation();
//					setTimeout(function() {
//						//16.19.信用数据 - 普通折线图
//						$scope.xyfxfx();
//						setTimeout(function() {
//							//10.1.	财务风险预测
//							$scope.loadFinanceData();
//						}, 100);
//					}, 100);
						setTimeout(function() {
							$scope.xyfxfx();
							setTimeout(function() {
								$scope.loadFinanceData();
								setTimeout(function() {
									analysiisReportInfomation('RISK_FINANCE_ABNORMAMAL_GRID', "rishHighRun");
									setTimeout(function() {
										financeAbnormamalGrid();
										setTimeout(function() {
											riskHighRunList();
										}, 100);
									}, 100);
								}, 100);
							}, 100);
						}, 100);
				}
			} else {
				$scope.isShowTip = true;
			}
		}
		/*******************信用风险分析开始***********************/
		//信用风险分析说明文字
	$scope.riskAnalysisInfo = undefined;
	$scope.cridrLineListTitle0 = ''; //信用风险分析左侧标题
	$scope.cridrLineListTitle1 = ''; //信用风险分析右侧标题
	$scope.xyfxfxInfo = undefined; //信用风险分析数据
	//是否显示信用风险无数据提示
	$scope.isShowriskAnalysis = false; //是否显示信用分析文字说明
	$scope.isShowXyfxfxNoData = false;
	/*
	 * 16.2说明或指标说明
	 */
	$scope.analysiisReportInfomation = function() {
		var options = {
			service_code: 'INMET_APP_ANALYSIS_REPORT_INFOMATION',
			params: {
				service_code: 'WINMET_APP_ANALYSIS_REPORT_INFOMATION',
				company_code: companyCode,
				credit_code: creditCode,
				type: 'RISK_ANALYSIS_INFO'
			}
		};
		getInterface.jsonp(options, function(results) {
			if(results.status == 'Y' && results.results && results.results.info && results.results.info != null && results.results.info != '') {
				$scope.isShowriskAnalysis = true;
				$scope.riskAnalysisInfo = results.results.info;
			} else {
				$scope.isShowriskAnalysis = false;
			}
		})
	};

	/**
	 * 16.19.信用数据-普通折线图
	 */
	$scope.xyfxfx = function() {
		var options = {
			service_code: 'WINMET_APP_CRIDT_LINE_LIST',
			params: {
				service_code: 'WINMET_APP_CRIDT_LINE_LIST',
				company_code: companyCode,
				credit_code: creditCode
			}
		};
		getInterface.jsonp(options, function(results) {
			if(results.status == 'Y' && results.results) {
				cridrLineListRequestSetting(results.results);
			} else {
				$scope.isShowXyfxfxNoData = true;
			}
		})
	};
	/**
	 * 检测信用风险分析折线图是否有数据
	 * @param {Object} json
	 */
	var cridrLineListRequestSetting = function(json) {
		var unDataTemp = true;
		if(json.picture_list && json.picture_list.length > 0) {
			for(var i = 0; i < json.picture_list.length; i++) {
				if(json.picture_list[i].series && 　json.picture_list[i].series.length > 0) {
					for(var j = 0; j < json.picture_list[i].series.length; j++) {
						if(json.picture_list[i].series[j].data && json.picture_list[i].series[j].data.length > 0) {
							for(var k = 0; k < json.picture_list[i].series[j].data.length; k++) {
								if(json.picture_list[i].series[j].data[k] != '') {
									unDataTemp = false; //有数据正常显示
									break;
								}
							}
						}
						break;
					}
				}
				break;
			}
		}
		if(json && !json.picture_list || unDataTemp) {
			$scope.isShowXyfxfxNoData = true;
		} else {
			$scope.xyfxfxInfo = json;
			$scope.isShowXyfxfxNoData = false;
			var json0 = json.picture_list[0];
			var json1 = json.picture_list[1];

			$scope.cridrLineListTitle0 = json0.title;
			$scope.cridrLineListTitle1 = json1.title;

			comCridtLineChartSetting(json, 'cr_main');
		}

	};
	/*
	 * 绘制信用风险分析折线图
	 */
	var comCridtLineChartSetting = function(json, idName) {

		if(json && 　document.getElementById(idName)) {
			var width = (document.getElementById('xyfxfx_view').offsetWidth - 40) / 2 + 'px';
			var json0 = json.picture_list[0];
			var json1 = json.picture_list[1];
			
			var MaxsArr = [];
			if(json1.series.length > 0 && json1.series[0].data){
            	for(var i = 0; i < json1.series.length; i++){
            		var temp = Math.max.apply(null, json1.series[i].data);
            		MaxsArr.push(temp);
            	}
            }
			var splitNumberTemp =  Math.max.apply(null, MaxsArr) ;
            splitNumberTemp > 0  ? splitNumberTemp = splitNumberTemp : splitNumberTemp = 10;
            var splitNumber = splitNumberTemp == 19 ?  splitNumberTemp  :  splitNumberTemp + 1;
            console.log('测试最大值',splitNumber);
            
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器,坐标轴触发有效
						type: 'line', // 默认为直线,可选为：'line' | 'shadow'
						lineStyle: { // 直线指示器样式设置
							color: '#48b',
							width: 2,
							type: 'solid',
						},
						shadowStyle: { // 阴影指示器样式设置
							width: 'auto', // 阴影大小
							color: 'rgba(150,150,150,0.3)' // 阴影颜色
						}
					},
				},
				legend: {
					orient: 'horizontal', // 'vertical'
					x: 'left', // 'center' | 'left' | {number},
					y: 'top', // 'center' | 'bottom' | {number}
					data: json0.legend,
					show: true
				},
				toolbox: {
					show: true,
					color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
					feature: {
						mark: {
							show: true
						}, //辅助线开关
						markUndo: {
							show: true
						}, //删除辅助线
						markClear: {
							show: true
						}, //清空辅助线
						dataZoom: {
							show: true
						}, //区域缩放
						dataView: {
							show: false
						}, //数据视图
						magicType: {
							show: true,
							type: ['line']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: false
						},
					},
				},
				calculable: true,
				dataZoom: {
					show: true,
					realtime: true,
					start: 40,
					end: 100,
					fillerColor: '#d4cde4',
					backgroundColor: '#f7f7f7',
					handleColor: '#008acd',
					dataBackgroundColor: '#efefff',
				},
				grid: {
					left: '3%',
					right: '10%',
					bottom: '20%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: json0.xAxis,
					name: json0.x_coordinate_name,
					axisLabel: {
						show: true,
						textStyle: {
							color: '#6a7883',
							//						                fondside:"36px"
							fontSize: 14
						}
					},
					axisLine: {
						lineStyle: {
							color: '#000',
							width: 1, //这里是为了突出显示加上的
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['#ccc'],
							width: 1,
							type: 'solid'
						}
					}, //网格线
				}],
				yAxis: [{
					type: 'value',
					name: json0.y_coordinate_name,
					axisLabel: {
						show: true,
						textStyle: {
							color: '#6a7883',
							//						                fondside:"36px"
							fontSize: 14
						}
					},
					axisLine: {
						lineStyle: {
							color: '#000',
							width: 1, //这里是为了突出显示加上的
						}
					},
					splitArea: { // 分隔区域
						show: true, // 默认不显示,属性show控制显示与否
						// onGap: null,
						areaStyle: { // 属性areaStyle（详见areaStyle）控制区域样式
							color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.2)']
						}
					},
				}],
				series: function() {
					var serie = [];
					var colorArr = [
						'#b39b77',
						'#3165ae',
						'#594599',
						'#103180',
						'#daa46a',
						'#dd6544',
						'#38383a',
						'#921e6a',
						'#905f21',
						'#e84c4c'
					];
					for(var i = 0; i < json0.series.length; i++) {
						var random = rnd(0, colorArr.length);
						var item = {
							name: json0.series[i].name,
							type: 'line',
							itemStyle: {
								normal: {
									color: colorArr[random],
								}
							},
							//                          smooth: true,
							data: json0.series && json0.series[i].data
						};
						colorArr.splice(random, 1);
						serie.push(item);

					}
					return serie;
				}()
			};
			var option1 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器,坐标轴触发有效
                        type: 'line',         // 默认为直线,可选为：'line' | 'shadow'
                        lineStyle: {          // 直线指示器样式设置
                            color: '#48b',
                            width: 2,
                            type: 'solid'
                        },
                        shadowStyle: {                       // 阴影指示器样式设置
                            width: 'auto',                   // 阴影大小
                            color: 'rgba(150,150,150,0.3)'  // 阴影颜色
                        },
                    },
                    formatter: function (params, ticket, callback) {
             			var dataArr = ['D','C','CC','CCC','B-','B','B+','BB-','BB','BB+','BBB-','BBB','BBB+','A-','A','A+','AA-','AA','AA+','AAA'];
             			var findItem = function(str){
             					if(str == '0'){
             						return dataArr[0];
             					}else if(str == '1'){
             						return dataArr[1];
             					}else if(str == '2'){
             						return dataArr[2];
             					}else if(str == '3'){
             						return dataArr[3];
             					}else if(str == '4'){
             						return dataArr[4];
             					}else if(str == '5'){
             						return dataArr[5];
             					}else if(str == '6'){
             						return dataArr[6];
             					}else if(str == '7'){
             						return dataArr[7];
             					}else if(str == '8'){
             						return dataArr[8];
             					}else if(str == '9'){
             						return dataArr[9];
             					}else if(str == '10'){
             						return dataArr[10];
             					}else if(str == '11'){
             						return dataArr[13];
             					}else if(str == '12'){
             						return dataArr[13];
             					}else if(str == '13'){
             						return dataArr[13];
             					}else if(str == '14'){
             						return dataArr[14];
             					}else if(str == '15'){
             						return dataArr[15];
             					}else if(str == '16'){
             						return dataArr[16];
             					}else if(str == '17'){
             						return dataArr[17];
             					}else if(str == '18'){
             						return dataArr[18];
             					}else if(str == '19'){
             						return dataArr[19];
             					}
             			}
             			var temp = '';
             			angular.forEach(params,function(value,index){
             				temp += value.seriesName + ' : '  + findItem(value.data) + '</br>';
             			})
             			
	             		return	 params[0].name +'</br>' + temp;
	             			
		            }
                },
                legend: {
                    orient: 'horizontal', // 'vertical'
                    x: 'left', // 'center' | 'left' | {number},
                    y: 'top', // 'center' | 'bottom' | {number}
                    data: json1.legend,
                    show: true
                },
                toolbox: {
                    show: false,
                    color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
                    feature: {
                        mark: {show: true},//辅助线开关
                        markUndo: {show: true},//删除辅助线
                        markClear: {show: true},//清空辅助线
                        dataZoom: {show: true},//区域缩放
                        dataView: {show: false},//数据视图
                        magicType: {show: true, type: ['line']},
                        restore: {show: true},
                        saveAsImage: {show: false},
                    }
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
                },
                calculable: true,
                dataZoom: {
                    show: false,
                    realtime: true,
                    start: 40,
                    end: 100,
                    fillerColor: '#d4cde4',
                    backgroundColor: '#f7f7f7',
                    handleColor: '#008acd',
                    dataBackgroundColor: '#efefff',
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: json1.xAxis,
                        name : json1.x_coordinate_name,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#6a7883',
                                //						                fondside:"36px"
                                fontSize: 14
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#000',
                                width: 1,//这里是为了突出显示加上的
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#ccc'],
                                width: 1,
                                type: 'solid'
                            }
                        },//网格线
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
//                      min : 0,
//                      max : 9,
                        name : json1.y_coordinate_name,
                        splitNumber : splitNumber,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#6a7883',
                                fontSize: 14
                            },
                     		formatter: function (num) {
                     			
                     			if(json1.series.length > 0){
                     				for(var i = 0 ; i < json1.series.length; i++){
	                     				if(json1.series[i].data.length > 0){
	                     					for(var j = 0; j < json1.series[i].data.length; j++ ){
	                     						if(json1.series[i].data[j] != ''){
	                     							var dataArr = ['D','C','CC','CCC','B-','B','B+','BB-','BB','BB+','BBB-','BBB','BBB+','A-','A','A+','AA-','AA','AA+','AAA'];
													for(var k = 0 ; k < dataArr.length; k++){
														if(k == num){
															return dataArr[k];
														}
													}
	                     						}
	                     						
	                     					}
	                     				}
	                     			}
                     			}else{
                     				num = null;
                     			}
								
				            }
                        },
                        
                        axisLine: {
                            lineStyle: {
                                color: '#000',
                                width: 1,//这里是为了突出显示加上的
                            }
                        },
                        splitArea: {           // 分隔区域
                            show: true,       // 默认不显示,属性show控制显示与否
                            // onGap: null,
                            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.2)']
                            }
                        },
                    }
                ],
                series: function () {
                    var serie = [];
                   	var colorArr = [
						'#b39b77',
						'#3165ae',
						'#594599',
						'#103180',
						'#daa46a',
						'#dd6544',
						'#38383a',
						'#921e6a',
						'#905f21',
						'#e84c4c'
					];
                    for (var i = 0; i < json1.series.length; i++) {
                    	var random = rnd(0, colorArr.length);
                        var item = {
                            name: json1.series[i].name,
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: colorArr[random],
                                }
                            },
//                          smooth: true,
                            data: json1.series && json1.series[i].data
                        };
                         colorArr.splice(random, 1);
                        serie.push(item);

                    }
                    return serie;
                }()
            };
			// 基于准备好的dom，初始化echarts图表

			var myChart = echarts.init(document.getElementById(idName), 'macarons', {
				width: width,
				height: '330px'
			});
			var myChart1 = echarts.init(document.getElementById(idName + '1'), 'macarons', {
				width: width,
				height: '330px'
			});

			// 为echarts对象加载数据
			myChart.setOption(option);
			myChart1.setOption(option1);
			echarts.connect([myChart, myChart1]);
		}

	};
	
	
	/*
	* 财务异常分析 - 说明或指标说明16.2.
	*/
   	var analysiisReportInfomation = function(type, pramName){
   		$scope['isShowNoData' + pramName] = false;//显示无数据提示语
   		$scope['isShowLoading' +pramName] = true;//显示正在加载图标
   		$scope[pramName] = '';
		var options = {
	        service_code: 'INMET_APP_ANALYSIS_REPORT_INFOMATION',
	        params:{
	        	service_code: 'WINMET_APP_ANALYSIS_REPORT_INFOMATION',
		        company_code: companyCode,
		        credit_code: creditCode,
		        type:type
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
        		$scope['isShowLoading' +pramName] = false;//隐藏正在加载图标
        		var info = results.results.info;
            	if(info){
            		$scope[pramName] = info;
            	}else{
            		$scope['isShowNoData' + pramName] = true;//显示无数据提示语
            	}	
            }else{
            	$scope['isShowLoading' +pramName] = false;//隐藏正在加载图标
            	$scope['isShowNoData' + pramName] = true;//显示无数据提示语
            }
        })
    };
	/*
	* 财务异常分析 - 表格
	*/
	
	$scope.getColor = function(index,num){
		if(index > 0 && !isNaN(num)){
			var abs = Math.abs(num)
			if(abs > 0 && abs < 10){
				return '#24b25d';
			}else if(abs >= 10 && abs < 30){
				return '#eb9633';
			}else if(abs > 30 && abs <= 50){
				return '#d9424d';
			}
		}
	};
	var financeAbnormamalGridRequestSetting = function(json){
		$scope.isShowDefauleFinanceAbnormamalGrid = false;//隐藏占位图(中间态)
    	$scope.financeAbnormamalGrid = json;
    	if($scope.financeAbnormamalGrid && !$scope.financeAbnormamalGrid.data_list || ($scope.financeAbnormamalGrid && $scope.financeAbnormamalGrid.data_list.length == 0) ){
    		$scope.isShowNoDataIconFinanceAbnormamalGrid = true;//显示无数据
    	}else{
    		$scope.isShowNoDataIconFinanceAbnormamalGrid = false;//隐藏无数据
    		$scope.financeAbnormamalGridDataList = $scope.financeAbnormamalGrid.data_list;
    		$scope.financeAbnormamalGridDataListTitle = $scope.financeAbnormamalGrid.title;
    	}
	};
	var financeAbnormamalGrid = function(){
		var startTime = new Date().getTime();	
		$scope.isShowNoDataIconFinanceAbnormamalGrid = false;//隐藏无数据
		$scope.isShowDefauleFinanceAbnormamalGrid = true;//显示占位图(中间态)
		$scope.financeAbnormamalGridDataList = [];
		var options = {
	        service_code: 'WINMET_APP_RISK_FINANCE_ABNORMAMAL_GRID',
	        params:{
	        	service_code: 'WINMET_APP_RISK_FINANCE_ABNORMAMAL_GRID',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			financeAbnormamalGridRequestSetting(results.results);
            		},1000);
            	}else{
            		financeAbnormamalGridRequestSetting(results.results);
            	}
        		
            }else{
            	$scope.isShowDefauleFinanceAbnormamalGrid = false;//隐藏占位图（中间态）
            	$scope.isShowNoDataIconFinanceAbnormamalGrid = true;//显示无数据
            }
        })
	}
	
	 /*
	* 16.22.	风险分析-财务异常分析-柱状图
	* 
	* 
	*/
	
	var riskHighRunListRequestSetting = function(json){
		$scope.isShowDefaultRiskHighRunList = false;//隐藏正在加载图标
    	if(json && !json.series || json && json.series.length == 0){
    		$scope.isShowNoDataIconRiskHighRunList = true;
    		$scope.isShowHaveDataIconRiskHighRunList = false;
    	}else{
    		$scope.isShowNoDataIconRiskHighRunList = false;
    		$scope.isShowHaveDataIconRiskHighRunList = true;
    		$scope.riskHighRunListTitle = json.title;
//  		$scope.comHighRunChartDeffer.resolve(json);
			var rnd = function(n, m){
		       return Math.floor(Math.random()*(m-n)+n);
		            
		   	};
		   	var eachPage = 30;//一页多少条数据
		   	var pageConts = Math.ceil(json.series.length / eachPage);
		   	var pageArr = [];
		   	for(var i = 0; i < pageConts; i++){
		   		pageArr.push(i+1);
		   	}
			if(json.series && document.getElementById('risk_high_run')){
        		var width = document.getElementById('risk_high_run').parentNode.offsetWidth - 40 + 'px'; 
        		var index = 0;
	     			var option = {
					    baseOption: {
					        timeline: {
//					            y: 0,
					            axisType: 'category',
//					             realtime: false,
					            // loop: false,
					            autoPlay: true,
					            // currentIndex: 2,
					            playInterval:3000,
					            controlStyle: {
					                 position: 'left'
					             },
					            data: pageArr,
					            label: {
					                formatter : function(s) {
					                    return  s ;
					                }
					            },
					            bottom : '0',
					        },
					        color : ['#2ec8c9'],
					        toolbox: {
					        	show : true,
					        	color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
					        	feature : {
						            mark : {show: true},
						            dataZoom : {show: true},
						            dataView : {show: true},
						            magicType : {show: true, type: ['line']},
						            restore : {show: true},
						            saveAsImage : {show: false},
						        }
						   	},
					        legend: {
					            x: 'left',
					            data: json.legend,
					        },
					        calculable : true,
					        grid: {
					            top: 20,
					            bottom: 320,
					            tooltip: {
					                trigger: 'axis',
					                axisPointer: {
					                    type: 'shadow',
					                    label: {
					                        show: true,
					                        formatter: function (params) {
					                            return params.value.replace('\n', '');
					                        }
					                    }
					                }
					            }
					        },
					        xAxis: [
					            {
					                'type':'category',
					                'axisLabel':{'interval':0},
					                x: 40,
						            x2: 100,
						            y2: 180,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
					                name: json.x_coordinate_name
					            }
					        ],
					        yAxis: [
					            {
					                type: 'value',
					                name: json.y_coordinate_name
					            }
					        ],
					        series: [
					            {name: json.legend[0], type: 'bar'},
					        ]
					    },
					    options: function(){
					    	var seriesDatas = [];
					    	var pageTemp = pageArr.length; //几页
					    	for(var i = 0 ; i < pageArr.length; i++){
					    		var temp = {
//						            title: {text: '第' + i + 1},
						            xAxis: [{
						                        data: json.xAxis.slice(i * eachPage, i * eachPage + eachPage),
						                        axisLabel :{
									                formatter:function(val){
													    return val &&  val.split("").join("\n");
													}
									            },
						                    }],
						            series: [
						                {
						                	data: json.series.slice(i * eachPage, i * eachPage + eachPage),
						                	barWidth : 10,
						                },
						            ]
						        }
					    		seriesDatas.push(temp);
					    	}
					    	return seriesDatas;
					    }()
					};
	                // 基于准备好的dom，初始化echarts图表
                var myChart = echarts.init(document.getElementById('risk_high_run'), 'macarons', { width: width, height:'600px'});

                // 为echarts对象加载数据
                myChart.setOption(option);
	           　}
    	}
	};
	
	var riskHighRunList = function(){
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconRiskHighRunList = false;
		$scope.isShowHaveDataIconRiskHighRunList = false;
		$scope.isShowDefaultRiskHighRunList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_RISK_FINANCE_ABNORMAMAL_COLUMN',
	        params:{
	        	service_code: 'WINMET_APP_RISK_FINANCE_ABNORMAMAL_COLUMN',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			riskHighRunListRequestSetting(results.results);
            		},1000)
        		}else{
        			riskHighRunListRequestSetting(results.results);
        		}
				
			}else{
				$scope.isShowDefaultRiskHighRunList = false;//隐藏正在加载图标
				$scope.isShowHaveDataIconRiskHighRunList = false;
				$scope.isShowNoDataIconRiskHighRunList = true;
            }
        })
	};
	//随机数
	var rnd = function(n, m) {
		return Math.floor(Math.random() * (m - n) + n);
	};
	/**
	 * 切换公司清除信用风险分析数据
	 */
	var clearXyfxfx = function() {
		//信用风险分析说明文字
		$scope.riskAnalysisInfo = undefined;
		$scope.cridrLineListTitle0 = ''; //信用风险分析左侧标题
		$scope.cridrLineListTitle1 = ''; //信用风险分析右侧标题
		$scope.xyfxfxInfo = undefined; //信用风险分析数据
		//是否显示信用风险无数据提示
		$scope.isShowXyfxfxNoData = false;
		$scope.isShowriskAnalysis = false;
	};
	/*******************信用风险分析结束***********************/
	$rootScope.$watch('$_userSearchData.searchKey', function(val1, val2) {
		if($rootScope.$_userSearchData) {
			if(val1 != val2) {
				companyName = $rootScope.$_userSearchData.companyName;
				creditCode = $rootScope.$_userSearchData.creditCode; //统一社会信用代码
				companyCode = $rootScope.$_userSearchData.companyCode; //企业注册号
				//切换公司后初始化信用分析数据
				clearXyfxfx();
				//信用风险分析说明文字
				$scope.riskAnalysisInfo = undefined;
				//是否显示信用风险无数据提示
				$scope.isShowRiskAnalysisNoData = false;
				$scope.rishHighRun = '';
				$scope.analysiisReportInfomation();
				setTimeout(function() {
					$scope.xyfxfx();
					setTimeout(function() {
						$scope.loadFinanceData();
						setTimeout(function() {
							analysiisReportInfomation('RISK_FINANCE_ABNORMAMAL_GRID', "rishHighRun");
							setTimeout(function() {
								financeAbnormamalGrid();
								setTimeout(function() {
									riskHighRunList();
								}, 100);
							}, 100);
						}, 100);
					}, 100);
				}, 100);
			}
		}
		//搜索的关键字变化时初始化数据
		$scope.isNoData = false;
		if(document.getElementById('chartMon')) {
			document.getElementById('chartMon').style.display = 'none';
		}
	}, true);

	init();
	

	
	
	
	
	
	
	
	
	
	
	
	
	
});
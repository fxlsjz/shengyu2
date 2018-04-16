'use strict';
//
app.controller('analysisReportCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll,$timeout,$http,$window , $q) {
	
	//风险分析
    var riskAnalysisA = 'riskAnalysis';
	var riskAnalysisB = 'click';
	var riskAnalysisC = 'riskAnalysisS';
	//担保分析
    var securityAnalysisA = 'securityAnalysis';
	var securityAnalysisB = 'click';
	var securityAnalysisC = 'securityAnalysisS';
	//财务状况
    var financialConditionA = 'financialCondition';
	var financialConditionB = 'click';
	var financialConditionC = 'financialConditionS';
	//工商信息
    var businessInformationA = 'businessInformation';
	var businessInformationB = 'click';
	var businessInformationC = 'businessInformationS';
	//信用风险分析
    var creditRiskA = 'creditRisk';
	var creditRiskB = 'click';
	var creditRiskC = 'creditRiskS';
	//主体财务状况评分
	var mainFinancialA = 'mainFinancial';
	var mainFinancialB = 'click';
	var mainFinancialC = 'mainFinancialS';
	//高风险经营概率
	var highRiskA = 'highRisk';
	var highRiskB = 'click';
	var highRiskC = 'highRiskS';
	//资本结构
	var capitalStructureA = 'capitalStructure';
	var capitalStructureB = 'click';
	var capitalStructureC = 'capitalStructureS';
	//盈利能力
	var ProfitabilityA = 'Profitability';
	var ProfitabilityB = 'click';
	var ProfitabilityC = 'ProfitabilityS';
	//运营能力
	var operationAbilityA = 'operationAbility';
	var operationAbilityB = 'click';
	var operationAbilityC = 'operationAbilityS';
	//偿债能力
	var solvencyA = 'solvency';
	var solvencyB = 'click';
	var solvencyC = 'solvencyS';
	//杜邦分析
	var duPontA = 'duPont';
	var duPontB = 'click';
	var duPontC = 'duPontS';
	
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.analysisName = '/'+url[2];
	  	$scope.yijiulshwo = true;
	  	if($scope.analysisName == "/statement" || $scope.analysisName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
	});
	$scope.changeActiveul = 'analysis_m';
    $scope.changeul=function(id){
    	$scope.changeActiveul=id;
    	$location.hash(id);
    	if(id == 'analysis_f'){
    		_hmt.push(['_trackEvent', financialConditionA, financialConditionB, financialConditionC]);
			console.log(financialConditionC);
    		$scope.tabFina = true;
    		$scope.tabDanger = false;	
    	}else if(id == 'analysis_m'){
			_hmt.push(['_trackEvent', riskAnalysisA, riskAnalysisB, riskAnalysisC]);
			console.log(riskAnalysisC);
    		$scope.tabFina = false;
    		$scope.tabDanger = true;
    	}else if(id == 'analysis_d'){
    		_hmt.push(['_trackEvent', securityAnalysisA, securityAnalysisB, securityAnalysisC]);
			console.log(securityAnalysisC);
    		$scope.tabFina = false;
    		$scope.tabDanger = false;
    	}else if(id == 'analysis_b'){
    		_hmt.push(['_trackEvent', businessInformationA, businessInformationB, businessInformationC]);
			console.log(businessInformationC);
    		$scope.tabFina = false;
    		$scope.tabDanger = false;
    	}else if(id == 'analysis_m_a'){//信用风险分析
    		_hmt.push(['_trackEvent', creditRiskA, creditRiskB, creditRiskC]);
			console.log(creditRiskC);
    	}else if(id == 'analysis_m_b'){//主体财务状况评分
    		_hmt.push(['_trackEvent', mainFinancialA, mainFinancialB, mainFinancialC]);
			console.log(mainFinancialC);
    	}else if(id == 'analysis_m_c'){//高风险经营概率
    		_hmt.push(['_trackEvent', highRiskA, highRiskB, highRiskC]);
			console.log(highRiskC);
    	}else if(id == 'analysis_f_a'){//资本结构
    		_hmt.push(['_trackEvent', capitalStructureA, capitalStructureB, capitalStructureC]);
			console.log(capitalStructureC);
    	}else if(id == 'analysis_f_b'){//盈利能力
    		_hmt.push(['_trackEvent', ProfitabilityA, ProfitabilityB, ProfitabilityC]);
			console.log(ProfitabilityC);
    	}else if(id == 'analysis_f_c'){//运营能力
    		_hmt.push(['_trackEvent', operationAbilityA, operationAbilityB, operationAbilityC]);
			console.log(operationAbilityC);
    	}else if(id == 'analysis_f_e'){//偿债能力
    		_hmt.push(['_trackEvent', solvencyA, solvencyB, solvencyC]);
			console.log(solvencyC);
    	}else if(id == 'analysis_f_f'){//杜邦分析
    		_hmt.push(['_trackEvent', duPontA, duPontB, duPontC]);
			console.log(duPontC);
    	}
    	$anchorScroll.yOffset = 100;
		$anchorScroll();
		//3.7点击锚点调用一次3.7接口,这样就可以实现会话时间（10分钟）重新开始往后延长至10分钟。
		var threeSeven = function(){
			var options = {
		        service_code: 'WINMET_APP_KEEP_ALIVE',
		        params:{
		        	service_code: 'WINMET_APP_KEEP_ALIVE'
		        }
			};
		    getInterface.jsonp(options, function (results) {
		    });
		}
		threeSeven();
    }
    
     /*
      *
      *sug搜索
      * 
      */
 
 	$scope.noBomb = $scope.okBomb = function(){
		$scope.errcodeBomb = false;
	};
    /*搜索出来的列表点击某一项*/
	var bFlag = false;
	var numLimt = 0;
	var tampCompanyName;
	$scope.searchKey = {
		text:''
	}
	$scope.sousuoname = function(data){
		tampCompanyName = data;
		$scope.searchKey.text = data;
		bFlag = true;
		numLimt = 0;
		angular.forEach($scope.datas,function(value,index){
			if($scope.searchKey.text == value){
				document.getElementById('sousuocon').style.display = 'none';
			}
		})
	}
    // 4.7接口
	$scope.sousukeyup = function(searchKey,e){
    	if(searchKey){
    		bFlag = false;
			var options = {
				service_code: 'WINMET_APP_ANALY_COMPANY_SEARCH_RESULT',
				params: {
					service_code:'WINMET_APP_ANALY_COMPANY_SEARCH_RESULT',
					search_str:searchKey
				}
			};
            getInterface.jsonp(options, function (results) {
				if(results.status == 'Y'){
					if(results.results.company_name){
						$scope.datas = results.results.company_name;
						document.getElementById('sousuocon').style.display = 'block';
					}
				}else{
//					$scope.errcodeBomb = true;
//					$scope.errcodeText = results.error_msg;
				}
           });
		}else{
			document.getElementById('sousuocon').style.display = 'none';
		}

	}
	//4.4工商详情
	var messPresent = function() {
        var startTime = new Date().getTime();
        $scope.isLoadingPer = true; //正在加载。。。
        $scope.datailConIcon = false; //内容隐藏
        $scope.NodatailConIcon = false;   //无数据
        $scope.$_colCompanyDatails = {};
    	var options = {
	        service_code: 'WINMET_APP_COMPANY_DETAILS',
	        params:{
	        	service_code: 'WINMET_APP_COMPANY_DETAILS',
		        company_code: companyCode,//企业注册号
				credit_code:creditCode//统一社会信用代码
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
                var loadTimes = new Date().getTime() - startTime;//毫秒
                if(loadTimes < $rootScope.loadingTimeLimt){
                    $timeout(function(){
                        $scope.isLoadingPer = false;
                        $scope.$_colCompanyDatails = results.results;
                        var $_colCompanyDatails = false;
                        for(var name in $scope.$_colCompanyDatails){
                        	if(name){
                        		$_colCompanyDatails = true;//有数据
                        		break;
                        	}
                        }
                        if($scope.$_colCompanyDatails && !$_colCompanyDatails){//没有数据
                            $scope.noDataIcon = true;//（请搜索图标提示语）
                            $scope.datailConIcon = false;
                            $scope.NodatailConIcon = true;   //无数据
                        }else{//有数据
                            $scope.noDataIcon = false;//（请搜索图标提示语）
                            $scope.datailConIcon = true;
                            $scope.NodatailConIcon = false;   //无数据
                        }
                    },1000);
                }else{
                    $scope.isLoadingPer = false;
                    $scope.$_colCompanyDatails = results.results;
                    var $_colCompanyDatails = false;
                    for(var name in $scope.$_colCompanyDatails){
                    	if(name){
                    		$_colCompanyDatails = true;//有数据
                    		break;
                    	}
                    }
                    if($scope.$_colCompanyDatails && !$_colCompanyDatails){//没有数据
                        $scope.noDataIcon = true;
                        $scope.datailConIcon = false;
                        $scope.NodatailConIcon = true;   //无数据
                    }else{//有数据
                        $scope.noDataIcon = false;
                        $scope.datailConIcon = true;
                        $scope.NodatailConIcon = false;   //无数据
                    }
                }

			}else{
				$scope.noDataIcon = true;//接口报错无数据
                $scope.datailConIcon = false;////接口报错内容隐藏
                $scope.NodatailConIcon = true;   //无数据
                $scope.isLoadingPer = false; //正在加载。。。
				//没有权限
				$scope.$_colCompanyDatails = {};
//				$cookies.remove('colCompanyDatails');
//				$rootScope.$_colCompanyDatails = {};
				
			}
        });
	} 
	//企业工商简况4.3
	var fourThreePresent = function() {
    	var options = {
	        service_code: 'WINMET_APP_COMPANY_BRIEF',
	        params:{
	        	service_code: 'WINMET_APP_COMPANY_BRIEF',
		        company_name:$scope.searchKey.text
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
				$scope.collectionPresent = results.results;
				if(!$scope.collectionPresent.company_name){
            		$scope.errcodeBomb = true;
					$scope.errcodeText = '暂无相关数据';
					$scope.noDataIcon = true; //请搜索或选择企业
					$scope.datailConIcon = false;//工商详情内容隐藏
					$scope.unWaring = false;//接口报错，灯为灰色
					$cookies.remove('userSearch');
					$rootScope.$_userSearchData = {};
		
				
					
					$cookies.remove('collection');
					$rootScope.$_collection = {};
					$rootScope.$_collection.company_id = undefined;
		

					
//					$cookies.remove('colCompanyDatails');
					$scope.$_colCompanyDatails = {};
					$scope.$_colCompanyDatails.company_name = undefined;

					$scope.isShowTip = true;
		
					return;
            }
//				companyId = $scope.collectionPresent.company_id;
				companyName = $scope.collectionPresent.company_name;
				creditCode = $scope.collectionPresent.credit_code;
				companyCode = $scope.collectionPresent.company_code;//企业注册号
				
//				$cookies.remove('userSearch', {'path': '/'});
				var expireDate = new Date();
		        expireDate.setDate(expireDate.getDate() + 1);
		        //companyId:companyId,//公司id
		        var data = {
		        	searchKey:$scope.searchKey.text,
		        	companyName:companyName,//公司名称
		        	creditCode:creditCode,//统一社会信用代码
		        	companyCode:companyCode//企业注册号
		        }
		        $cookies.putObject('userSearch', data, {'path': '/', 'expires': expireDate});
		        $rootScope.$_userSearchData = $cookies.getObject('userSearch');
		       	$rootScope.$broadcast('tampSearch',search);
		       	init();
			}else{
//				$scope.errcodeBomb = true;
//				$scope.errcodeText = results.error_msg;
				if($rootScope.$_userSearchData){
					$cookies.remove('userSearch');
					$rootScope.$_userSearchData = {};
				}
				
			}
        });
	} 
   	/*搜索查询的按钮*/
	$scope.sousuobutton = function(){
		numLimt++;
		if(numLimt == 1){
			if(bFlag){
				//第一次有数据，第二次无数据
				$scope.unWaring = false;
				$scope.isShowTip = false;//是否显示搜索提示语
				fourThreePresent();
			}
		}else{
			$scope.errcodeBomb = true;
			$scope.errcodeText = '请勿重复点击';	
		}
		
		
	}
	
	// 回车
    $scope.myKeyup = function(e){
		e = window.event || e;
		var keycode = e.keyCode || e.which || e.charCode;  
        if(keycode == 13){
        	$scope.sousuobutton();
          
        }
    };
   
    var companyCode;
    var creditCode;
    var companyName;
    var init = function(){
    	$scope.analysisReportInfo = '';
		$scope.riskAnalysisInfo = '';
		$scope.rishHighRun = '';
		$scope.assureRisk = '';
		$scope.reportInformation = '';
		$scope.capitalindex = '';
		$scope.profitCaptionMao = '';
		$scope.opretionCaptio = '';
		$scope.payDebtProfile = '';
    	if($rootScope.$_userSearchData){
			if($rootScope.$_userSearchData.searchKey){
				if(document.getElementById('sousuocon')){
					document.getElementById('sousuocon').style.display = 'none';
				}
				companyName = $rootScope.$_userSearchData.companyName;
				companyCode = $rootScope.$_userSearchData.companyCode;
				creditCode = $rootScope.$_userSearchData.creditCode;
				if(companyCode ||　creditCode){
					//分析报告尽调支持说明
					analysiisReportInfomation('ANALYSIS_REPORT_INFO', "analysisReportInfo");
					
					
					//风险分析模块
					analysiisReportInfomation('RISK_ANALYSIS_INFO', "riskAnalysisInfo");//信用风险分析说明文字
					cridrLineList();//信用风险分析
					//riskFinanceArdarList()//雷达16.21
					loadFinanceData();//主体财务状况评分
					
					analysiisReportInfomation('RISK_FINANCE_ABNORMAMAL_GRID', "rishHighRun");//财务异常分析-说明
					financeAbnormamalGrid();//财务异常分析-表格
					riskHighRunList()//财务异常分析16.22
					
					//担保模块
//					loadConcernList()//图谱
					analysiisReportInfomation('ASSURE_RISK', "assureRisk");//担保风险分析说明
						
						
					//财政状况模块
					analysiisReportInfomation('REPORT_INFORMATION', "reportInformation");//财务状况说明
					
					//资本结构子类
					analysiisReportInfomation('CAPITAL_INDEX', "capitalindex");//资本结构指标说明
					capilatTotDebt();   //柱状图
	            	capilatCompanyTotDebt();    //折线图   
            		apilatCompanyPielist();	//饼图
	            	capitalDebtPielist();	//饼图
            		capilatCompanyMoneyList(); //表格  
	            	capitalAbilityArdarList();//表格 
            		
            		//盈利能力子类
            		profitRateArdarList();  //(毛利率雷达图)
            		analysiisReportInfomation('PROFIT_CAPTION_MAO', "profitCaptionMao");//盈利能力毛利率指标说明
            		profitTareLineList(); 	//16.10(多个图)
					profitTareMoneyLineList(); //(现金流多个图)
	    
	            	//运营能力子类
	            	analysiisReportInfomation('OPRETION_CAPTION', "opretionCaptio");//运营能力指标说明
	            	opretionLineList();
	            	
	            	//偿债能力子类
	            	analysiisReportInfomation('PAY_DEBT_PROFILE', "payDebtProfile");//偿债能力利息保障倍数指标说明
	    			debtProfileIomesList();
	    			debtFlowProfileIomesList()
	    			
	    			//杜邦分类
	    			$timeout(function(){
	    				payDubangList();
	    			},500);
	    			
	    			
	    			//勾稽关系分类
//	    			crossList();
//	    			crossLineList();
	    			
					//工商信息模块
					messPresent();//4.4
       			}
			}
		}else{
			$scope.isShowTip = true;
		}
    };

   	
 
   	$scope.exportPdf = function(){
		html2canvas(document.getElementById("content"), {
			background : '#fff',
	        onrendered: function(canvas) {
			// 渲染完成时调用，获得 canvas
	          /*
	          Here are the numbers (paper width and height) that I found to work. 
	          It still creates a little overlap part between the pages, but good enough for me.
	          if you can find an official number from jsPDF, use them.
	          */
	         var imgData = canvas.toDataURL('image/jpeg');
	          var imgWidth = 210; 
	          var pageHeight = 295;  
	          var imgHeight = canvas.height * imgWidth / canvas.width;
	          var heightLeft = imgHeight;
	
	          var doc = new jsPDF('p', 'mm');
	          var position = 0;
	
	          doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
	          heightLeft -= pageHeight;
	
	          while (heightLeft >= 0) {
	            position = heightLeft - imgHeight;
	            doc.addPage();
	            doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
	            heightLeft -= pageHeight;
	            console.log(heightLeft,imgWidth,imgHeight);
	           
	          }
	          doc.save($rootScope.$_userSearchData.companyName + '.pdf');
	            
	    }        
	            

    	});
	};
	$scope.exportWord = function(){
		
		$("#content").wordExport();
	}

   	var rnd = function(n, m){
      return Math.floor(Math.random()*(m-n)+n);
            
   	};
   	
   	
    /*
	* 16.2.	说明或指标说明
	* 
	* 
	*/
   	var analysiisReportInfomation = function(type, pramName){
   		$scope['isShowNoData' + pramName] = false;//显示无数据提示语
   		$scope['isShowLoading' +pramName] = true;//显示正在加载图标
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
  /***************************************资本结构 start**********************************************/

    /*
	 * 16.3.	资本结构-总资产负债
	 * 堆积柱状图
	 * debtChart
	 */
	var capilatTotDebtRequestSetting = function(json){
		$scope.isShowDefauleCapilatTotDebt = false; //关闭显示占位图（中间态）
		var unDataTemp = true;
		if(json.series && json.series.length > 0){
			for(var i = 0; i < json.series.length; i++){
				if(json.series[i].data && json.series[i].data.length > 0){
					for(var j = 0; j < json.series[i].data.length ; j++){
						if(json.series[i].data[j] != ""){
						   unDataTemp = false;
						   break;
						}
					}
				}
			}
			
		}
        //没有数据
        if(json && !json.xAxis ||  (json && json.series.length == 0) || unDataTemp){
            $scope.isShowNoDataICoCapilatTotDebt = true;//无数据
            $scope.isShowHaveDataICoCapilatTotDebt = false;//没有内容
        }else{
        	$scope.isShowNoDataICoCapilatTotDebt = false; //
        	$scope.isShowHaveDataICoCapilatTotDebt = true;//有内容
        	$scope.capilatTotDebtTitle = json.title;
        	var rnd = function(n, m){
		       return Math.floor(Math.random()*(m-n)+n);
		            
		   	};
        	var option = {
	            tooltip : {
	                trigger: 'axis',
	                axisPointer : {            // 坐标轴指示器,坐标轴触发有效
	                    type : 'shadow'        // 默认为直线,可选为：'line' | 'shadow'
	                }
	            },
	            color:function(){
	            	var arr = [];
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
		            for(var i = 0; i < json.legend.length; i++ ){
		            	var random = rnd(0, colorArr.length);
	                    var temp = colorArr[random];
	                    colorArr.splice(random, 1);
	                    arr.push(temp);
		            }
		            return arr;	
	            }(),
	            legend: {
	                //			    	orient : 'vertical',
	                //			    	x : 'right',
	                data:json.legend,
	                backgroundColor: 'rgba(0,0,0,0)',
	                borderColor: '#ccc',       // 图例边框颜色
	                borderWidth: 0,            // 图例边框线宽,单位px,默认为0（无边框）
	                padding: 2,                // 图例内边距,单位px,默认各方向内边距为5,
	                                           // 接受数组分别设定上右下左边距,同css
	                itemGap: 5,               // 各个item之间的间隔,单位px,默认为10,
	                // 横向布局时为水平间隔,纵向布局时为纵向间隔
	                itemWidth:10,             // 图例图形宽度
	                itemHeight: 10,            // 图例图形高度
	                textStyle: {
	                    color: '#333',        // 图例文字颜色
	                    fontSize:'12px',
	                    fontFamily : '微软雅黑',
	                }
	            },
	            toolbox: {
			        show : true,
			        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
			        feature : {
			            mark : {show: true},//辅助线开关
			            markUndo : {show: true},//删除辅助线
			            markClear : {show: true},//清空辅助线
			            dataZoom : {show: true},//区域缩放
			            dataView : {show: false},//数据视图
			            magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: false},
			        }
			    },
	            grid: {
	                left: '3%',
	                right: '8%',
	                bottom: '3%',
	                containLabel: true
	            },
	            xAxis : [
	                {
	                    type : 'category',
	                    data : json.xAxis,
	                    name : json.x_coordinate_name
	                }
	            ],
	            yAxis : [
	                {
	                    type : 'value',
	                    name : json.y_coordinate_name
	                }
	            ],
	            series :
	                function() {
	                    var series = [];
	                    if(json.series){
		                    for (var i = 0; i < json.series.length ; i++) {
		                        var item = {
		                            name: json.series[i].name,
		                            type: 'bar',
		                            stack: '广告',
		                            barWidth : 30,
		                            data: json.series && json.series[i].data
		                        };
		                        series.push(item);
		
		                    }
		                    return series;
		                }
	                } ()
	        };
	        $scope.debtChartDeffer.resolve(option);
        }
	}
	$scope.debtChartDeffer = $q.defer();
	var capilatTotDebt = function(){
		$scope.debtChartDeffer = $q.defer();
		var startTime = new Date().getTime();
		$scope.isShowNoDataICoCapilatTotDebt = false; //无数据
		$scope.isShowHaveDataICoCapilatTotDebt = false;//内容默认值
		$scope.isShowDefauleCapilatTotDebt = true;//显示占位图（中间态）
		var options = {
	        service_code: 'WINMET_APP_CAPITAL_TOTAL_DEBT',
	        params:{
	        	service_code: 'WINMET_APP_CAPITAL_TOTAL_DEBT',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
						capilatTotDebtRequestSetting(results.results);
					},1000);

            	}else{
            		capilatTotDebtRequestSetting(results.results);
            	}
            	
			}else{
				$scope.isShowDefauleCapilatTotDebt = false; //关闭中间态
				$scope.isShowNoDataICoCapilatTotDebt = true;//显示无数据
            }
        })
	}


    
    /*
	 * 16.4.	资本结构-本企业总资产负债
	 * 堆积折线图
	 * 中间态，无数据，接口不错都显示占位图
	 */
	var capilatCompanyTotDebtRequestSetting = function(json){
		$scope.isShowCapilatCompanyTotDebt = false//隐藏占位图(中间态)
		var unDataTemp = true;
		if(json.series && json.series.length > 0){
			for(var i = 0; i < json.series.length; i++){
				if(json.series[i].data && json.series[i].data.length > 0){
					for(var j = 0; j < json.series[i].data.length ; j++){
						if(json.series[i].data[j] != ""){
						   unDataTemp = false;
						   break;
						}
					}
				}
			}
			
		}
		
		if(json && !json.xAxis || json && !json.series ||  (json && json.series.length == 0) || unDataTemp){
			$scope.isShowNoDataIconCapilatCompanyTotDebt = true//没有数据显示占位图
			$scope.isShowHaveDataIconCapilatCompanyTotDebt = false;
		}else{
			$scope.isShowNoDataIconCapilatCompanyTotDebt = false;
			$scope.isShowHaveDataIconCapilatCompanyTotDebt = true;
			$scope.capilatCompanyTotDebtTitle = json.title;
			$scope.comDeffer.resolve(json);
		}
	}
	$scope.comDeffer = $q.defer();
	var capilatCompanyTotDebt = function(){
		$scope.comDeffer = $q.defer();
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconCapilatCompanyTotDebt = false
		$scope.isShowHaveDataIconCapilatCompanyTotDebt = false;
		$scope.isShowCapilatCompanyTotDebt = true//显示占位图(中间态)
		var options = {
	        service_code: 'WINMET_APP_CAPITAL_COMPANY_TOTAL_BEDT',
	        params:{
	        	service_code: 'WINMET_APP_CAPITAL_COMPANY_TOTAL_BEDT',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			capilatCompanyTotDebtRequestSetting(results.results);
            		},1000);
            	}else{
            		capilatCompanyTotDebtRequestSetting(results.results);
            	}
            	
			}else{
				$scope.isShowCapilatCompanyTotDebt = false;
				$scope.isShowHaveDataIconCapilatCompanyTotDebt = false;
				$scope.isShowNoDataIconCapilatCompanyTotDebt = true
            }
        })
	};

	/*
	* 16.5.	资本结构-资产排名表格
	* 
	*/
	var capilatCompanyMoneyListRequestSetting = function(json){
		$scope.isShowDefauleCapilatCompanyMoneyList = false;//隐藏占位图(中间态)
    	$scope.capilatCompanyMoneyList = json;
    	if($scope.capilatCompanyMoneyList && !$scope.capilatCompanyMoneyList.data_list || ($scope.capilatCompanyMoneyList && $scope.capilatCompanyMoneyList.data_list.length == 0) ){
    		$scope.isShowNoDataIconCapilatCompanyMoneyList = true;//显示无数据
    	}else{
    		$scope.isShowNoDataIconCapilatCompanyMoneyList = false;//隐藏无数据
    		$scope.dataList = $scope.capilatCompanyMoneyList.data_list;
    		$scope.dataListTitle = $scope.capilatCompanyMoneyList.title;
    	}
	}
	var capilatCompanyMoneyList = function(){
		var startTime = new Date().getTime();	
		$scope.isShowNoDataIconCapilatCompanyMoneyList = false;//隐藏无数据
		$scope.isShowDefauleCapilatCompanyMoneyList = true;//显示占位图(中间态)
		$scope.dataList = [];
		var options = {
	        service_code: 'WINMET_APP_CAPITAL_COMPANY_MONEY_LIST',
	        params:{
	        	service_code: 'WINMET_APP_CAPITAL_COMPANY_MONEY_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			capilatCompanyMoneyListRequestSetting(results.results);
            		},1000);
            	}else{
            		capilatCompanyMoneyListRequestSetting(results.results);
            	}
        		
            }else{
            	$scope.isShowDefauleCapilatCompanyMoneyList = false;//隐藏占位图（中间态）
            	$scope.isShowNoDataIconCapilatCompanyMoneyList = true;//显示无数据
            }
        })
	}
	
	
    /*
	 * 16.6.资本结构-资产饼状图
	 * 
	 * 
	 */
	var apilatCompanyPielistRequestSetting = function(json){
		$scope.isShowDefauleApilatCompanyPielist = false;//隐藏正在加载图标
		var unDataTemp = true;
		if(json.series && json.series.length > 0){
			for(var i = 0; i < json.series.length; i++){
				if(json.series[i].value != ''){
					unDataTemp = false;
					break;
				}
			}
		}
		if(json && !json.series || unDataTemp){
			$scope.isShowNoDatIconApilatCompanyPielist = true;
			$scope.isShowHaveDatIconApilatCompanyPielist = false;
		}else{
			$scope.isShowNoDatIconApilatCompanyPielist = false;
			$scope.isShowHaveDatIconApilatCompanyPielist = true;
			$scope.apilatCompanyPielistTitle = json.title;
			$scope.comPieDeffer.resolve(json);
		}
	}
    $scope.comPieDeffer = $q.defer();
	var apilatCompanyPielist = function(){
		$scope.comPieDeffer = $q.defer();
		var startTime = new Date().getTime();
		$scope.isShowNoDatIconApilatCompanyPielist = false;
		$scope.isShowHaveDatIconApilatCompanyPielist = false;
		$scope.isShowDefauleApilatCompanyPielist = true;//显示占位图（中间态）
		var options = {
	        service_code: 'WINMET_APP_CAPITAL_COMPANY_PIE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_CAPITAL_COMPANY_PIE_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			apilatCompanyPielistRequestSetting(results.results);
            		},1000);
            	}else{
            		apilatCompanyPielistRequestSetting(results.results);
	                
            	}
        		
                
			}else{
				$scope.isShowDefauleApilatCompanyPielist = false;
				$scope.isShowHaveDatIconApilatCompanyPielist = false;
				$scope.isShowNoDatIconApilatCompanyPielist = true;
            }
        })
	};
		

	/*
	* 16.7.	资本结构-负债饼状图
	* 
	* 
	*/
	var capitalDebtPielistRequestSetting = function(json){
		$scope.isShowDefauleCapitalDebtPielist = false;//隐藏正在加载图标	;
		var unDataTemp = true;
		if(json.series && json.series.length > 0){
			for(var i = 0; i < json.series.length; i++){
				if(json.series[i].value != ''){
					unDataTemp = false;
					break;
				}
			}
		}
		if(json && !json.series || unDataTemp){
			$scope.isShowNoDataIconCapitalDebtPielist = true;
			$scope.isShowHaveDataIconCapitalDebtPielist = false;
		}else{
			$scope.isShowNoDataIconCapitalDebtPielist = false;
			$scope.isShowHaveDataIconCapitalDebtPielist = true;
			$scope.capitalDebtPielistTitle = json.title;
			$scope.comPieDefferDebt.resolve(json);
		}
	};
	$scope.comPieDefferDebt = $q.defer();
	var capitalDebtPielist = function(){
		$scope.comPieDefferDebt = $q.defer();
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconCapitalDebtPielist = false;
		$scope.isShowHaveDataIconCapitalDebtPielist = false;
		$scope.isShowDefauleCapitalDebtPielist = true;
		var options = {
	        service_code: 'WINMET_APP_CAPITAL_DEBT_PIE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_CAPITAL_DEBT_PIE_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		capitalDebtPielistRequestSetting(results.results);
            	}else{
            		capitalDebtPielistRequestSetting(results.results);
            	}
            	
			}else{
				$scope.isShowDefauleCapitalDebtPielist = false;//隐藏正在加载图标
				$scope.isShowHaveDataIconCapitalDebtPielist = false;
				$scope.isShowNoDataIconCapitalDebtPielist = true;
            }
        })
			
	};
	

    /*
	* 16.8.	资本结构-
	* 更改为表格
	* 
	*/
	var capitalAbilityArdarListRequestSetting = function(json){
		$scope.isShowDefaultCapitalAbilityArdarList = false;//隐藏正在加载图标
    	if(json && !json.data_list || (json && json.data_list.length == 0)){
    		$scope.isShowNoDataIconCapitalAbilityArdarList = true;
    		$scope.isShowHaveDataIconCapitalAbilityArdarList = false;
    	}else{
    		$scope.isShowNoDataIconCapitalAbilityArdarList = false;
    		$scope.isShowHaveDataIconCapitalAbilityArdarList = true;
    		$scope.capitalAbilityArdarList = json;
    	}
	};
    
	var capitalAbilityArdarList = function(){
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconCapitalAbilityArdarList = false;
		$scope.isShowHaveDataIconCapitalAbilityArdarList = false;
		$scope.isShowDefaultCapitalAbilityArdarList = true;//显示占位图
		$scope.capitalAbilityArdarList = [];
		var options = {
	        service_code: 'WINMET_APP_CAPITAL_ABILITY_GRID_LIST',
	        params:{
	        	service_code: 'WINMET_APP_CAPITAL_ABILITY_GRID_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			capitalAbilityArdarListRequestSetting(results.results);
            		},1000);
            	}else{
            		capitalAbilityArdarListRequestSetting(results.results);
	            	
            	}
			}else{
				$scope.isShowDefaultCapitalAbilityArdarList = false;
				$scope.isShowHaveDataIconCapitalAbilityArdarList = false;
				$scope.isShowNoDataIconCapitalAbilityArdarList = true;
            }
        })
			
	};
/***************************************资本结构 end**********************************************/



/***************************************盈利能力 start**********************************************/

    /*
	* 16.9.	盈利能力-毛利率雷达图
	* profit
	* comArdarChart
	*/ 
	var profitRateArdarListSRequestetting = function(json){
		$scope.isShowDefaultProfitRateArdarList = false;//隐藏正在加载图标
		var unDataTemp = true;
		if(json.series && json.series.data.length > 0){
			for(var i = 0; i < json.series.data.length; i++){
				if(json.series.data[i].value && json.series.data[i].value.length > 0){
					for(var j = 0; j < json.series.data[i].value[j].length; j++){
						if(json.series.data[i].value[j] != ''){
							unDataTemp = false;
							break;
						}
					}
				}
			}
		}
    	if((json && !json.series) || unDataTemp){
    		$scope.isShowNoDataIconProfitRateArdarList = true;
    		$scope.isShowHaveDataIconProfitRateArdarList = false;
    	}else{
    		$scope.isShowNoDataIconProfitRateArdarList = false;
    		$scope.isShowHaveDataIconProfitRateArdarList = true;
    		$scope.profitRateArdarListTitle = json.title;
    		$scope.comArdarDefferRate.resolve(json);
    	}
	};
	$scope.comArdarDefferRate = $q.defer();
	var profitRateArdarList = function(){
		$scope.comArdarDefferRate = $q.defer();
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconProfitRateArdarList = false;
		$scope.isShowHaveDataIconProfitRateArdarList = false;
		$scope.isShowDefaultProfitRateArdarList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_PROFIT_RATE_ARDAR_LIST',
	        params:{
	        	service_code: 'WINMET_APP_PROFIT_RATE_ARDAR_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
				var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			profitRateArdarListSRequestetting(results.results);
            		},1000);
            	}else{
            		profitRateArdarListSRequestetting(results.results);
            	}
			}else{
				$scope.isShowDefaultProfitRateArdarList = false;//隐藏正在加载图标
				$scope.isShowHaveDataIconProfitRateArdarList = false;
				$scope.isShowNoDataIconProfitRateArdarList = true;
            }
        })
	};
	
	/*
	* 16.10.	盈利能力-毛利润堆叠折线图
	* 多个图(数据有问题)
	* 
	*/
	var profitTareLineListSetting=function(json,idName){
		if(json.picture_list && document.getElementById(idName)){
			var width = document.getElementById(idName).parentNode.offsetWidth - 40 + 'px'; 
    		var json0 = json.picture_list[0];
    		var json1 = json.picture_list[1]; 
    		
    		
		   	var rnd = function(n, m){
		      return Math.floor(Math.random()*(m-n)+n);
		            
		   	};
    		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    toolbox: {
			        show : true,
			        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
			        feature : {
			            mark : {show: true},
			            dataZoom : {show: true},
			            dataView : {show: false},
			            magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: false},
			        }
			    },
			    legend: {
//			    	orient : 'vertical',
//			    	x : 'right',
			        data:json0.legend,
			        backgroundColor: 'rgba(0,0,0,0)',
			        borderColor: '#ccc',       // 图例边框颜色
			        borderWidth: 0,            // 图例边框线宽,单位px,默认为0（无边框）
			        padding: 2,                // 图例内边距,单位px,默认各方向内边距为5,
			                                   // 接受数组分别设定上右下左边距,同css
			        itemGap: 5,               // 各个item之间的间隔,单位px,默认为10,
			                                   // 横向布局时为水平间隔,纵向布局时为纵向间隔
			        itemWidth:20,             // 图例图形宽度
			        itemHeight: 0,            // 图例图形高度
			        textStyle: {
			            color: '#333',        // 图例文字颜色
			            fontSize:'12px',
			            fontFamily : '微软雅黑',
			        }
			    },
			    calculable : true,
			    dataZoom : {
			    	x : 100,
			    	width : '520x',
			        show : true,
			        realtime : true,
			        start : 40,
			        end : 100,
			        fillerColor:'#d4cde4',
			        backgroundColor:'#f7f7f7',
			        handleColor:'#008acd',
			        dataBackgroundColor:'#efefff',
			    },
			    grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
                },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#6a7883',
                                //						                fondside:"36px"
                                fontSize: 14
                            }
                        },
			            data : json0.xAxis,
			            name : json.x_coordinate_name
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel: {
		                    show: true,
		                    textStyle: {
		                        color: '#6a7883',
		                        //						                fondside:"36px"
		                        fontSize:14
		                    }
		                },
			            axisLine:{
	                        lineStyle:{
	                            color:'#6a7883',
	                            width:1,//这里是为了突出显示加上的
	                        }
	                    },
			            name : json.y_coordinate_name
			        }
			    ],
			    series :function() {
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
                    for (var i = 0; i < json0.series.length ; i++) {
                    	var random = rnd(0, colorArr.length);
                        var item = {
                            name: json0.series[i].name,
                            type: 'line',
                            itemStyle: {
                            	normal: {
                          		color: colorArr[random],
                            	}
                            },
                            data: json0.series && json0.series[i].data
                        };
                        colorArr.splice(random, 1);
                        serie.push(item);
                        
                    }
                    return serie;
                } ()

			};
			var option1 = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    toolbox: {
			        show : false,
			        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
			        feature : {
			            mark : {show: true},
			            dataZoom : {show: true},
			            dataView : {show: false},
			            magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: false},
			        }
			    },
			    grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
                },
			    legend: {
					show : true,
			        data:json1.legend,
			        backgroundColor: 'rgba(0,0,0,0)',
			        borderColor: '#ccc',       // 图例边框颜色
			        borderWidth: 0,            // 图例边框线宽,单位px,默认为0（无边框）
			        padding: 2,                // 图例内边距,单位px,默认各方向内边距为5,
			                                   // 接受数组分别设定上右下左边距,同css
			        itemGap: 5,               // 各个item之间的间隔,单位px,默认为10,
			                                   // 横向布局时为水平间隔,纵向布局时为纵向间隔
			        itemWidth:20,             // 图例图形宽度
			        itemHeight: 0,            // 图例图形高度
			        textStyle: {
			            color: '#333',        // 图例文字颜色
			            fontSize:'12px',
			            fontFamily : '微软雅黑',
			        }
			    },
			    calculable : true,
			    dataZoom : {
			        show : false,
			        realtime : true,
			        start : 40,
			        end : 100,
			        fillerColor:'#d4cde4',
			        backgroundColor:'#f7f7f7',
			        handleColor:'#008acd',
			        dataBackgroundColor:'#efefff',
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#6a7883',
                                //						                fondside:"36px"
                                fontSize: 14
                            }
                        },
			            data : json1.xAxis,
			            name : json.x_coordinate_name
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel: {
		                    show: true,
		                    textStyle: {
		                        color: '#6a7883',
		                        //						                fondside:"36px"
		                        fontSize:14
		                    }
		                },
			            axisLine:{
	                        lineStyle:{
	                            color:'#6a7883',
	                            width:1,//这里是为了突出显示加上的
	                        }
	                    },
			            name : json.y_coordinate_name
			        }
			    ],
			    series :function() {
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
                    for (var i = 0; i < json1.series.length ; i++) {
                    	var random = rnd(0, colorArr.length);
                        var item = {
                            name: json1.series[i].name,
                            type: 'line',
            				itemStyle: {
            					normal: {
            						color: colorArr[random],
            					}
            				},
                            data: json1.series && json1.series[i].data
                        };
                        colorArr.splice(random, 1);
                        serie.push(item);
                        
                    }
                    return serie;
                } ()
			};
				 
            // 基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(idName), 'macarons', { width: width, height:'330px'});
            var myChart1 = echarts.init(document.getElementById(idName+'1'), 'macarons', { width: width, height:'330px'});
            // 为echarts对象加载数据
            myChart.setOption(option);
            myChart1.setOption(option1);
            echarts.connect([myChart,myChart1]);
       }	
	}

    var profitTareLineListRequestSetting = function(json){
    	$scope.isShowDefaultprofitTareLineListIcon = false;//隐藏正在加载图标
//		if(json.picture_list && json.picture_list.length > 0){
//			for(var i = 0; i < json.picture_list.length; i++){
//				//如果没有series字段
//				if(json.picture_list[i].series.length == 0){
//					unDataTemp = true;
//					break;
//				}
//				if(json.picture_list[i].series.length > 0){
//					for(var j = 0; j < json.picture_list[i].series.length ; j++){
//						for(var k = 0; k < json.picture_list[i].series[j].data.length; k++){
//							if(json.picture_list[i].series[j].data[k] != ''){
//								unDataTemp = false;
//								break;
//							}else{
//								unDataTemp = true;
//							}
//						}
//					}
//					
//				}
//				
//			}
//		}

	  	var unDataTemp = true;
	  	if(json.picture_list && json.picture_list.length > 0){
	  		for(var i = 0; i < json.picture_list.length; i++){
				if(json.picture_list[i].series &&　json.picture_list[i].series.length > 0){
					for(var j = 0; j < json.picture_list[i].series.length; j++){
						if(json.picture_list[i].series[j].data && json.picture_list[i].series[j].data.length > 0){
							for(var k = 0; k < json.picture_list[i].series[j].data.length; k++){
								if(json.picture_list[i].series[j].data[k] != ''){
									unDataTemp = false;//有数据正常显示
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
		
    	if(json && !json.picture_list   || unDataTemp){
    		$scope.isShowNoDataIconProfitTareLineList = true;
    		$scope.isShowHaveDataIconProfitTareLineList = false;
    	}else{
    		$scope.isShowNoDataIconProfitTareLineList = false;
    		$scope.isShowHaveDataIconProfitTareLineList = true;
    		var json0 = json.picture_list[0];
    		var json1 = json.picture_list[1]; 
    		$scope.profitTareLineListSmalTitle0 = json0.title;
    		$scope.profitTareLineListSmalTitle1 = json1.title;
    		$scope.profitTareLineListTitle = json.main_title;
			profitTareLineListSetting(json,'y_main');
    	}
    };
    
	var profitTareLineList = function (){
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconProfitTareLineList = false;
		$scope.isShowHaveDataIconProfitTareLineList = false;
		$scope.isShowDefaultprofitTareLineListIcon = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_PROFIT_TARE_LINE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_PROFIT_TARE_LINE_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			profitTareLineListRequestSetting(results.results);
            		},1000)
        		}else{
        			profitTareLineListRequestSetting(results.results);
        		}
            	
			}else{
				$scope.isShowDefaultprofitTareLineListIcon = false;//隐藏正在加载图标
				$scope.isShowHaveDataIconProfitTareLineList = false;
				$scope.isShowNoDataIconProfitTareLineList = true;
            }
        })
			
	};

	/*
	* 16.11.	盈利能力-现金流雷达图(去掉)
	* 
	* 
	*/

	/*
	* 
	* 16.12.	盈利能力-现金流堆叠折线图
	* 多个图
	* 
	*/
	var profitTareMoneyLineListRequestSetting = function(json){
		$scope.isShowDefaultProfitTareMoneyLineList = false;//隐藏正在加载图标
		var unDataTemp = true;
	  	if(json.picture_list && json.picture_list.length > 0){
	  		for(var i = 0; i < json.picture_list.length; i++){
				if(json.picture_list[i].series &&　json.picture_list[i].series.length > 0){
					for(var j = 0; j < json.picture_list[i].series.length; j++){
						if(json.picture_list[i].series[j].data && json.picture_list[i].series[j].data.length > 0){
							for(var k = 0; k < json.picture_list[i].series[j].data.length; k++){
								if(json.picture_list[i].series[j].data[k] != ''){
									unDataTemp = false;//有数据正常显示
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
    	if((json &&　!json.picture_list)  || unDataTemp){
    		$scope.isShowNodataIconProfitTareMoneyLineList = true;
    		$scope.isShowHavedataIconProfitTareMoneyLineList = false;
    	}else{
    		$scope.isShowNodataIconProfitTareMoneyLineList = false;
    		$scope.isShowHavedataIconProfitTareMoneyLineList = true;
    		var json0 = json.picture_list[0];
    		var json1 = json.picture_list[1];
    		var json2 = json.picture_list[2];
    		var json3 = json.picture_list[3]; 
    		$scope.profitTareMoneyLineListSmallTitle0 = json0.title;
    		$scope.profitTareMoneyLineListSmallTitle1 = json1.title;
    		$scope.profitTareMoneyLineListSmallTitle2 = json2.title;
    		$scope.profitTareMoneyLineListSmallTitle3 = json3.title;
    		$scope.profitTareMoneyLineListTolTitle = json.main_title;
    		opretionLineListSetting && opretionLineListSetting(json,'m_main');
    		
    	}  
	}
	var profitTareMoneyLineList = function (){
		var startTime = new Date().getTime();
		$scope.isShowNodataIconProfitTareMoneyLineList = false;
		$scope.isShowHavedataIconProfitTareMoneyLineList = false;
		$scope.isShowDefaultProfitTareMoneyLineList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_PROFIT_FLOW_LINE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_PROFIT_FLOW_LINE_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
 		};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			profitTareMoneyLineListRequestSetting(results.results);
            		},1000)
        		}else{
        			profitTareMoneyLineListRequestSetting(results.results);
        		}

            }else{
            	$scope.isShowDefaultProfitTareMoneyLineList = false;//隐藏正在加载图标
            	$scope.isShowHavedataIconProfitTareMoneyLineList = false;
            	$scope.isShowNodataIconProfitTareMoneyLineList = true;//显示占位图
            }
        })
			
	};

/***************************************盈利能力 end**********************************************/	
	
	
	
	/*
	*16.13.	运营能力-普通折线图
	* 多个图
	*/
	var opretionLineListSetting =function(json,idName){
		if(json.picture_list && document.getElementById(idName)){
			var width = document.getElementById(idName).parentNode.offsetWidth - 40 + 'px'; 
    		var json0 = json.picture_list[0];
    		var json1 = json.picture_list[1];
    		var json2 = json.picture_list[2];
    		var json3 = json.picture_list[3];
    		var option = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器,坐标轴触发有效
			            type : 'line',         // 默认为直线,可选为：'line' | 'shadow'
			            lineStyle : {          // 直线指示器样式设置
			                color: '#48b',
			                width: 2,
			                type: 'solid'
			            },
			            shadowStyle : {                       // 阴影指示器样式设置
			                width: 'auto',                   // 阴影大小
			                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
			            }
			        },
			    },
			    legend: {
			    	orient: 'horizontal', // 'vertical'
			        x: 'left', // 'center' | 'left' | {number},
			        y: 'top', // 'center' | 'bottom' | {number}
			        data:json0.legend,
			        show:true
			    },
			    grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
                },
			    toolbox: {
			        show : true,
			        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
			        feature : {
			            mark : {show: true},//辅助线开关
			            markUndo : {show: true},//删除辅助线
			            markClear : {show: true},//清空辅助线
			            dataZoom : {show: true},//区域缩放
			            dataView : {show: false},//数据视图
			            magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: false},
			        }
			    },
			    calculable : true,
			    dataZoom : {
			        show : false,
			        realtime : true,  
			        start : 40,
			        end : 100,
			        fillerColor:'#d4cde4',
			        backgroundColor:'#f7f7f7',
			        handleColor:'#008acd',
			        dataBackgroundColor:'#efefff',
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : json0.xAxis,
			            name : json.x_coordinate_name,
			            axisLabel: {
				            show: true,
				            textStyle: {
				                color: '#6a7883',
		//						                fondside:"36px"
				                fontSize:14
				            }
				       	},
				       	axisLine:{
			                lineStyle:{
			                    color:'#000',
			                    width:1,//这里是为了突出显示加上的
			                }
			        	},
			        	splitLine: {
			        		show: true,
			        		lineStyle:{
								    color: ['#ccc'],
								    width: 1,
								    type: 'solid'
								}  
			        	},//网格线
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : json.y_coordinate_name,
		                axisLabel: {
		                    show: true,
		                    textStyle: {
		                        color: '#6a7883',
		                        //						                fondside:"36px"
		                        fontSize:14
		                    }
		                },
		                axisLine:{
		                    lineStyle:{
		                        color:'#000',
		                        width:1,//这里是为了突出显示加上的
		                    }
		                },
		                splitArea: {           // 分隔区域
				            show: true,       // 默认不显示,属性show控制显示与否
				            // onGap: null,
				            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
				                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.2)']
				            }
				        },
		            }
			    ],
			    series : function() {
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
                        for (var i = 0; i < json0.series.length ; i++) {
                        	var random = rnd(0, colorArr.length);
                            var item = {
                                name: json0.series[i].name,
                                type: 'line',
                                itemStyle : {
									normal : {
										color: colorArr[random],
									}
								},
//								smooth: true,
                                data: json0.series && json0.series[i].data
                            };
                            colorArr.splice(random, 1);
                            serie.push(item);
                            
                        }
                        return serie;
                    } ()
			};
			var option1 = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器,坐标轴触发有效
			            type : 'line',         // 默认为直线,可选为：'line' | 'shadow'
			            lineStyle : {          // 直线指示器样式设置
			                color: '#48b',
			                width: 2,
			                type: 'solid'
			            },
			            shadowStyle : {                       // 阴影指示器样式设置
			                width: 'auto',                   // 阴影大小
			                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
			            }
			        },
			    },
			    legend: {
			    	orient: 'horizontal', // 'vertical'
			        x: 'left', // 'center' | 'left' | {number},
			        y: 'top', // 'center' | 'bottom' | {number}
			        data:json1.legend,
			        show:true
			    },
			     grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
                },
			    toolbox: {
			        show : false,
			        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
			        feature : {
			            mark : {show: true},//辅助线开关
			            markUndo : {show: true},//删除辅助线
			            markClear : {show: true},//清空辅助线
			            dataZoom : {show: true},//区域缩放
			            dataView : {show: false},//数据视图
			            magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: false},
			        }
			    },
			    calculable : true,
			    dataZoom : {
			        show : false,
			        realtime : true,
			        start : 40,
			        end : 100,
			        fillerColor:'#d4cde4',
			        backgroundColor:'#f7f7f7',
			        handleColor:'#008acd',
			        dataBackgroundColor:'#efefff',
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : json1.xAxis,
			            name : json.x_coordinate_name,
			            axisLabel: {
				            show: true,
				            textStyle: {
				                color: '#6a7883',
		//						                fondside:"36px"
				                fontSize:14
				            }
				       	},
				       	axisLine:{
			                lineStyle:{
			                    color:'#000',
			                    width:1,//这里是为了突出显示加上的
			                }
			        	},
			        	splitLine: {
			        		show: true,
			        		lineStyle:{
								    color: ['#ccc'],
								    width: 1,
								    type: 'solid'
								}  
			        	},//网格线
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : json.y_coordinate_name,
		                axisLabel: {
		                    show: true,
		                    textStyle: {
		                        color: '#6a7883',
		                        //						                fondside:"36px"
		                        fontSize:14
		                    }
		                },
		                axisLine:{
		                    lineStyle:{
		                        color:'#000',
		                        width:1,//这里是为了突出显示加上的
		                    }
		                },
		                splitArea: {           // 分隔区域
				            show: true,       // 默认不显示,属性show控制显示与否
				            // onGap: null,
				            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
				                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.2)']
				            }
				        },
		            }
			    ],
			    series : function() {
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
                        for (var i = 0; i < json1.series.length ; i++) {
                        	var random = rnd(0, colorArr.length);
                            var item = {
                                name: json1.series[i].name,
                                type: 'line',
                                itemStyle : {
									normal : {										
										color: colorArr[random],
									}
								},
//								smooth: true,
                                data: json1.series && json1.series[i].data
                            };
                            colorArr.splice(random, 1);
                            serie.push(item);
                            
                        }
                        return serie;
                    } ()
			};
			var option2 = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器,坐标轴触发有效
			            type : 'line',         // 默认为直线,可选为：'line' | 'shadow'
			            lineStyle : {          // 直线指示器样式设置
			                color: '#48b',
			                width: 2,
			                type: 'solid'
			            },
			            shadowStyle : {                       // 阴影指示器样式设置
			                width: 'auto',                   // 阴影大小
			                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
			            }
			        },
			    },
			    legend: {
			    	orient: 'horizontal', // 'vertical'
			        x: 'left', // 'center' | 'left' | {number},
			        y: 'top', // 'center' | 'bottom' | {number}
			        data:json2.legend,
			        show:true
			    },
			    toolbox: {
			        show : false,
			        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
			        feature : {
			            mark : {show: true},//辅助线开关
			            markUndo : {show: true},//删除辅助线
			            markClear : {show: true},//清空辅助线
			            dataZoom : {show: true},//区域缩放
			            dataView : {show: false},//数据视图
			            magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: false},
			        }
			    },
			    calculable : true,
			    dataZoom : {
			    	x : 100,
			    	width : '520x',
			        show : true,
			        realtime : true,
			        start : 40,
			        end : 100,
			        fillerColor:'#d4cde4',
			        backgroundColor:'#f7f7f7',
			        handleColor:'#008acd',
			        dataBackgroundColor:'#efefff',
			    },
			    grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
                },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : json2.xAxis,
			            name : json.x_coordinate_name,
			            axisLabel: {
				            show: true,
				            textStyle: {
				                color: '#6a7883',
		//						                fondside:"36px"
				                fontSize:14
				            }
				       	},
				       	axisLine:{
			                lineStyle:{
			                    color:'#000',
			                    width:1,//这里是为了突出显示加上的
			                }
			        	},
			        	splitLine: {
			        		show: true,
			        		lineStyle:{
								    color: ['#ccc'],
								    width: 1,
								    type: 'solid'
								}  
			        	},//网格线
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : json.y_coordinate_name,
		                axisLabel: {
		                    show: true,
		                    textStyle: {
		                        color: '#6a7883',
		                        //						                fondside:"36px"
		                        fontSize:14
		                    }
		                },
		                axisLine:{
		                    lineStyle:{
		                        color:'#000',
		                        width:1,//这里是为了突出显示加上的
		                    }
		                },
		                splitArea: {           // 分隔区域
				            show: true,       // 默认不显示,属性show控制显示与否
				            // onGap: null,
				            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
				                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.2)']
				            }
				        },
		            }
			    ],
			    series : function() {
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
                        for (var i = 0; i < json2.series.length ; i++) {
                        	var random = rnd(0, colorArr.length);
                            var item = {
                                name: json2.series[i].name,
                                type: 'line',
                                itemStyle : {
									normal : {
										color: colorArr[random],
									}
								},
//								smooth: true,
                                data: json2.series && json2.series[i].data
                            };
                            colorArr.splice(random, 1);
                            serie.push(item);
                            
                        }
                        return serie;
                    } ()
			};
			var option3 = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器,坐标轴触发有效
			            type : 'line',         // 默认为直线,可选为：'line' | 'shadow'
			            lineStyle : {          // 直线指示器样式设置
			                color: '#48b',
			                width: 2,
			                type: 'solid'
			            },
			            shadowStyle : {                       // 阴影指示器样式设置
			                width: 'auto',                   // 阴影大小
			                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
			            }
			        },
			    },
			    legend: {
			    	orient: 'horizontal', // 'vertical'
			        x: 'left', // 'center' | 'left' | {number},
			        y: 'top', // 'center' | 'bottom' | {number}
			        data:json3.legend,
			        show:true
			    },
			    grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
                },
			    toolbox: {
			        show : false,
			        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
			        feature : {
			            mark : {show: true},//辅助线开关
			            markUndo : {show: true},//删除辅助线
			            markClear : {show: true},//清空辅助线
			            dataZoom : {show: true},//区域缩放
			            dataView : {show: false},//数据视图
			            magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: false},
			        }
			    },
			    calculable : true,
			    dataZoom : {
			        show : false,
			        realtime : true,
			        start : 40,
			        end : 100,
			        fillerColor:'#d4cde4',
			        backgroundColor:'#f7f7f7',
			        handleColor:'#008acd',
			        dataBackgroundColor:'#efefff',
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : json3.xAxis,
			            name : json.x_coordinate_name,
			            axisLabel: {
				            show: true,
				            textStyle: {
				                color: '#6a7883',
		//						                fondside:"36px"
				                fontSize:14
				            }
				       	},
				       	axisLine:{
			                lineStyle:{
			                    color:'#000',
			                    width:1,//这里是为了突出显示加上的
			                }
			        	},
			        	splitLine: {
			        		show: true,
			        		lineStyle:{
								    color: ['#ccc'],
								    width: 1,
								    type: 'solid'
								}  
			        	},//网格线
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : json.y_coordinate_name,
		                axisLabel: {
		                    show: true,
		                    textStyle: {
		                        color: '#6a7883',
		                        //						                fondside:"36px"
		                        fontSize:14
		                    }
		                },
		                axisLine:{
		                    lineStyle:{
		                        color:'#000',
		                        width:1,//这里是为了突出显示加上的
		                    }
		                },
		                splitArea: {           // 分隔区域
				            show: true,       // 默认不显示,属性show控制显示与否
				            // onGap: null,
				            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
				                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.2)']
				            }
				        },
		            }
			    ],
			    series : function() {
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
                        for (var i = 0; i < json3.series.length ; i++) {
                        	var random = rnd(0, colorArr.length);
                            var item = {
                                name: json1.series[i].name,
                                type: 'line',
                                itemStyle : {
									normal : {
										color: colorArr[random],
									}
								},
//								smooth: true,
                                data: json3.series && json3.series[i].data
                            };
                            colorArr.splice(random, 1);
                            serie.push(item);
                            
                        }
                        return serie;
                    } ()
			};
            // 基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(idName), '', { width: width, height:'330px'});
            var myChart1 = echarts.init(document.getElementById(idName+'1'), '', { width: width, height:'330px'});
            var myChart2 = echarts.init(document.getElementById(idName+'2'), '', { width: width, height:'330px'});
            var myChart3 = echarts.init(document.getElementById(idName+'3'), '', { width: width, height:'330px'});
            // 为echarts对象加载数据
            myChart.setOption(option);
            myChart1.setOption(option1);
            myChart2.setOption(option2);
            myChart3.setOption(option3);
            echarts.connect([myChart,myChart1,myChart2,myChart3]);
           　}
	}
	
	var opretionLineListRequestSetting = function(json){
		$scope.isShowDefaultOpretionLineList = false;//隐藏正在加载图标
		var unDataTemp = true;
	  	if(json.picture_list && json.picture_list.length > 0){
	  		for(var i = 0; i < json.picture_list.length; i++){
				if(json.picture_list[i].series &&　json.picture_list[i].series.length > 0){
					for(var j = 0; j < json.picture_list[i].series.length; j++){
						if(json.picture_list[i].series[j].data && json.picture_list[i].series[j].data.length > 0){
							for(var k = 0; k < json.picture_list[i].series[j].data.length; k++){
								if(json.picture_list[i].series[j].data[k] != ''){
									unDataTemp = false;//有数据正常显示
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
    	if(json &&　!json.picture_list || unDataTemp || json.picture_list[0].series[0].data[0] == 'null'){
    		$scope.isShowNodataIconOpretionLineList = true;
    		$scope.isShowHavedataIconOpretionLineList = false;
    	}else{
    		$scope.isShowNodataIconOpretionLineList = false;
    		$scope.isShowHavedataIconOpretionLineList = true;
    		var json0 = json.picture_list[0];
    		var json1 = json.picture_list[1];
    		var json2 = json.picture_list[2];
    		var json3 = json.picture_list[3];
    		$scope.opretionLineListTitleTolTitle = json.main_title;
    		$scope.opretionLineListTitle0 = json0.title;
    		$scope.opretionLineListTitle1 = json1.title;
    		$scope.opretionLineListTitle2 = json2.title;
    		$scope.opretionLineListTitle3 = json3.title;
    		opretionLineListSetting(json,'p_main');
    		
    		
    	}
	}
	var opretionLineList = function(){
		var startTime = new Date().getTime();
		$scope.isShowNodataIconOpretionLineList = false;
		$scope.isShowHavedataIconOpretionLineList = false;
		$scope.isShowDefaultOpretionLineList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_OPRETION_LINE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_OPRETION_LINE_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
    	getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			opretionLineListRequestSetting(results.results);
            		},1000)
        		}else{
        			opretionLineListRequestSetting(results.results);
	              
        		}
               
			}else{
				
				$scope.isShowDefaultOpretionLineList = false;
				$scope.isShowHavedataIconOpretionLineList = false;
				$scope.isShowNodataIconOpretionLineList = true;
            }
    	})
	};
	
	/***************************************偿债能力 start**********************************************/	

	/*
	* 16.14.	偿债能力-利息保障倍数普通折线图
	* 多个图
	*
	*/
	
	//2个折线图的公共配置
	var debtProfileIomesListCom = function(json,idName){

 		if(json &&　 document.getElementById(idName)){
            var width = document.getElementById(idName).parentNode.offsetWidth - 40 + 'px';
            var json0 = json.picture_list[0];
            var json1 = json.picture_list[1];
            var option = {
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
                        }
                    },
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
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
                calculable: true,
                dataZoom: {
                	x : 100,
                	width : '520px',
                    show: true,
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
                        data: json0.xAxis,
                        name : json.x_coordinate_name,
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
                        name : json.y_coordinate_name,
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
                    for (var i = 0; i < json0.series.length; i++) {
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
                        }
                    },
                },
                legend: {
                    orient: 'horizontal', // 'vertical'
                    x: 'left', // 'center' | 'left' | {number},
                    y: 'top', // 'center' | 'bottom' | {number}
                    data: json1.legend,
                    show: true
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
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
                        name : json.x_coordinate_name,
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
                        name : json.y_coordinate_name,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#6a7883',
                                fontSize: 14
                            },
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
            var myChart1 = echarts.init(document.getElementById(idName+'1'), 'macarons', {
                width: width,
                height: '330px'
            });

            // 为echarts对象加载数据
            myChart.setOption(option);
            myChart1.setOption(option1);
            echarts.connect([myChart, myChart1]);
        }
        
	};
	var debtProfileIomesListRequestSetting = function(json){
		$scope.isShowDefaultdebtProfileIomesList = false;//隐藏正在加载图标
		var unDataTemp = true;
	  	if(json.picture_list && json.picture_list.length > 0){
	  		for(var i = 0; i < json.picture_list.length; i++){
				if(json.picture_list[i].series &&　json.picture_list[i].series.length > 0){
					for(var j = 0; j < json.picture_list[i].series.length; j++){
						if(json.picture_list[i].series[j].data && json.picture_list[i].series[j].data.length > 0){
							for(var k = 0; k < json.picture_list[i].series[j].data.length; k++){
								if(json.picture_list[i].series[j].data[k] != ''){
									unDataTemp = false;//有数据正常显示
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
    	if(json &&　!json.picture_list || unDataTemp){
    		$scope.isShowNodataIcondebtProfileIomesList = true;
    		$scope.isShowHavedataIcondebtProfileIomesList = false;
    	}else{
    		$scope.isShowNodataIcondebtProfileIomesList = false;
    		$scope.isShowHavedataIcondebtProfileIomesList = true;
    		var json0 = json.picture_list[0];
    		var json1 = json.picture_list[1];
   			$scope.debtProfileIomesListTolTitle = json.main_title;
    		$scope.debtProfileIomesListTitle0 = json0.title;
    		$scope.debtProfileIomesListTitle1 = json1.title;
    	
    		debtProfileIomesListCom && debtProfileIomesListCom(json,'d_main');
    	}
	};
	var debtProfileIomesList = function(){
		var startTime = new Date().getTime();
		$scope.isShowNodataIcondebtProfileIomesList = false;
		$scope.isShowHavedataIcondebtProfileIomesList = false;
		$scope.isShowDefaultdebtProfileIomesList = true;//显示正在加载图标
		var options = {
	        service_code: 'WINMET_APP_PAY_DEBT_PROFILE_TIMES_LIST',
	        params:{
	        	service_code: 'WINMET_APP_PAY_DEBT_PROFILE_TIMES_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			debtProfileIomesListRequestSetting(results.results);
            		},1000)
        		}else{
        			
        			debtProfileIomesListRequestSetting(results.results);
	               
        		}
			}else{
				$scope.isShowDefaultdebtProfileIomesList = false;
				$scope.isShowHavedataIcondebtProfileIomesList = false;
				$scope.isShowNodataIcondebtProfileIomesList = true;
            }
        })
	};
	
	
	/*
	* 16.15.	偿债能力-流动负债保障倍数普通折线图
	* 多个图
	* 
	*/	
	var debtFlowProfileIomesListRequestSetting = function(json){
		$scope.isShowDefaultDebtFlowProfileIomesList = false;//隐藏正在加载图标
		var unDataTemp = true;
	  	if(json.picture_list && json.picture_list.length > 0){
	  		for(var i = 0; i < json.picture_list.length; i++){
				if(json.picture_list[i].series &&　json.picture_list[i].series.length > 0){
					for(var j = 0; j < json.picture_list[i].series.length; j++){
						if(json.picture_list[i].series[j].data && json.picture_list[i].series[j].data.length > 0){
							for(var k = 0; k < json.picture_list[i].series[j].data.length; k++){
								if(json.picture_list[i].series[j].data[k] != ''){
									unDataTemp = false;//有数据正常显示
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
    	if(json &&　!json.picture_list || unDataTemp ){
    		$scope.isShowNodataIconDebtFlowProfileIomesList = true;
    		$scope.isShowHavedataIconDebtFlowProfileIomesList = false;
    	}else{
    		$scope.isShowNodataIconDebtFlowProfileIomesList = false;
    		$scope.isShowHavedataIconDebtFlowProfileIomesList = true;
    		var json0 = json.picture_list[0];
    		var json1 = json.picture_list[1];
    		var json2 = json.picture_list[2];
    		var json3 = json.picture_list[3];
    		$scope.debtFlowProfileIomesListTolTitle = json.main_title;
    		$scope.debtFlowProfileIomesListTitle0 = json0.title;
    		$scope.debtFlowProfileIomesListTitle1 = json1.title;
    		$scope.debtFlowProfileIomesListTitle2 = json2.title;
    		$scope.debtFlowProfileIomesListTitle3 = json3.title;
    		opretionLineListSetting(json,'df_main');
    	}
	}
	var debtFlowProfileIomesList = function(){
		var startTime = new Date().getTime();
		$scope.isShowNodataIconDebtFlowProfileIomesList = false;
		$scope.isShowHavedataIconDebtFlowProfileIomesList = false;
		$scope.isShowDefaultDebtFlowProfileIomesList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_PAY_DEBT_FLOWPROFILE_TIMES_LIST',
	        params:{
	        	service_code: 'WINMET_APP_PAY_DEBT_FLOWPROFILE_TIMES_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			debtFlowProfileIomesListRequestSetting(results.results,'df_main');
            		},1000)
        		}else{
        			debtFlowProfileIomesListRequestSetting(results.results,'df_main');
        		}
            	
			}else{
				$scope.isShowDefaultDebtFlowProfileIomesList = false;//隐藏正在加载图标
				$scope.isShowHavedataIconDebtFlowProfileIomesList = false;
				$scope.isShowNodataIconDebtFlowProfileIomesList = true;//显示占位图
            }
        })
		
	};
	
	/***************************************偿债能力 end**********************************************/	
	
	/*
	* 16.16.	杜邦分析
	* 
	*  
	*/
	
	var payDubangListRequestSetting = function(json){
		$scope.isShowadefaultpayDubangList = false;//隐藏正在加载图片
    	if(json　&& !json.list || json　&& json.list.length == 0){
    		$scope.isShowNoDataIconpayDubangList = true;
    		$scope.isShowHaveDataIconpayDubangList = false;
    	}else{
    		$scope.isShowNoDataIconpayDubangList = false;
    		$scope.isShowHaveDataIconpayDubangList = true;//有数据
			$scope.fixedDatasText = [
				{
					RateName:'权益净利率',
					Info:'增量'
				},
				{
					RateName:'资产净利率',
					Info:'增量'
				},
				{
					RateName:'权益乘数',
					Info:'增量'
				},
				{
					RateName:'销售净利率',
					Info:'增量'
				},
				{
					RateName:'资产周转率',
					Info:'增量'
				},
				{
					RateName:'净利润',
					Info:'环比'
				},
				{
					RateName:'销售收入',
					Info:'环比'
				},
				{
					RateName:'销售收入',
					Info:'环比'
				},
				{
					RateName:'资产总额',
					Info:'环比'
				},
				{
					RateName:'销售收入',
					Info:'环比'
				},
				{
					RateName:'全部成本',
					Info:'环比'
				},
				{
					RateName:'其他利润',
					Info:'环比'
				},
				{
					RateName:'所得税',
					Info:'环比'
				},
				{
					RateName:'费用率',
					Info:'环比'
				},
				{
					RateName:'长期资产',
					Info:'环比'
				},
				{
					RateName:'流动资产',
					Info:'环比'
				},
				{
					RateName:'营业成本',
					Info:'环比'
				},
				{
					RateName:'销售费用',
					Info:'环比'
				},
				{
					RateName:'管理费用',
					Info:'环比'
				},
				{
					RateName:'其他',
					Info:'环比'
				},
				{
					RateName:'毛利率',
					Info:'环比'
				},
				{
					RateName:'现金有价证券',
					Info:'环比'
				},
				{
					RateName:'应收账款',
					Info:'环比'
				},
				{
					RateName:'存货',
					Info:'环比'
				},
				{
					RateName:'其他流动资产',
					Info:'环比'
				}
		
			];
    		$scope.reportTime = json.report_time;
    		$scope.unit = json.unit;
 		    $scope.fixedDatasTextData = json.list;
			
    	}
	}
	var payDubangList = function(){
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconpayDubangList = false;
		$scope.isShowHaveDataIconpayDubangList = false;
		$scope.isShowadefaultpayDubangList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_PAY_DUBANG_LIST',
	        params:{
	        	service_code: 'WINMET_APP_PAY_DUBANG_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){  
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			payDubangListRequestSetting(results.results);
            		},1000);
            	}else{
            		payDubangListRequestSetting(results.results);
            	}
			}else{
				$scope.isShowadefaultpayDubangList = false;
				$scope.isShowHaveDataIconpayDubangList = false;
				$scope.isShowNoDataIconpayDubangList = true;
            }
        })
	};
	
    /*
	* 16.17.	勾稽关系-总分和异常个数图
	* 
	*  
	*/
	
	var crossListRequestSetting = function(json){
		$scope.isShowadefaultcrossList = false;//隐藏正在加载图片
    	if(json　&& !json.xAxis){
    		$scope.isShowNoDataIconcrossList = true;
    		$scope.isShowHaveDataIconcrossList = false;
    	}else{
    		$scope.isShowNoDataIconcrossList = false;
    		$scope.isShowHaveDataIconcrossList = true;
    		$scope.comColumnChartDeffer.resolve(json);
    	}
	}
    $scope.comColumnChartDeffer = $q.defer();
	var crossList = function(){
		$scope.comColumnChartDeffer = $q.defer();
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconcrossList = false;
		$scope.isShowHaveDataIconcrossList = false;
		$scope.isShowadefaultcrossList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_CROSS_LIST',
	        params:{
	        	service_code: 'WINMET_APP_CROSS_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){  
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			crossListRequestSetting(results.results);
            		},1000);
            	}else{
            		crossListRequestSetting(results.results);
            	}
			}else{
				$scope.isShowadefaultcrossList = false;
				$scope.isShowHaveDataIconcrossList = false;
				$scope.isShowNoDataIconcrossList = true;
            }
        })
	};
    
    /*
	* 16.18.	勾稽关系-普通折线图
	* 普通折线图
	* comCrossLineChart
	*/
	
	var crossLineListRequestSetting = function(json){
		$scope.isShowdefaultrossLineList = false;//隐藏正在加载图片
		if(json　&& !json.xAxis || (json && json.xAxis.length == 0)){
			$scope.isShowNoDataIconrossLineList = true;
			$scope.isShowHaveDataIconrossLineList = false;
		}else{
			$scope.isShowNoDataIconrossLineList = false;
			$scope.isShowHaveDataIconrossLineList = true;
			$scope.comCrossLineChartDeffer.resolve(json);
		}
	}
   $scope.comCrossLineChartDeffer = $q.defer();
	var crossLineList = function(){
		$scope.comCrossLineChartDeffer = $q.defer();
        var startTime = new Date().getTime();
        $scope.isShowNoDataIconrossLineList = false;
        $scope.isShowHaveDataIconrossLineList = false;
        $scope.isShowdefaultrossLineList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_CROSS_LINE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_CROSS_LINE_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
                var loadTimes = new Date().getTime() - startTime;//毫秒
				if(loadTimes < $rootScope.loadingTimeLimt){
					$timeout(function(){
						crossLineListRequestSetting(results.results);
					},1000);
				}else{
					crossLineListRequestSetting(results.results);
				}
			}else{
            	$scope.isShowdefaultrossLineList = false;//隐藏正在加载图片
            	$scope.isShowHaveDataIconrossLineList = false;
            	$scope.isShowNoDataIconrossLineList = true;
            }
        })
	};
    
    
    
     /*
	* 16.19.	信用风险分析
	* 
	* 
	*/
	
	var comCridtLineChartSetting = function(json,idName){

 		if(json &&　 document.getElementById(idName)){
            var width = document.getElementById(idName).parentNode.offsetWidth - 40 + 'px';
            var json0 = json.picture_list[0];
            var json1 = json.picture_list[1];
            var MaxsArr = [];
//          测试数据
//          json1.series = [
//          	{
//					"data": ['','','','','','','9','9'],
//					"name": "长期信用评级"
//				},
//				{
//					"data": ['4','4','5','6','15','18','17','9'],
//					"name": "长期信用评级"
//				},
//          ]
            if(json1.series.length > 0 && json1.series[0].data){
            	for(var i = 0; i < json1.series.length; i++){
            		var temp = Math.max.apply(null, json1.series[i].data);
            		MaxsArr.push(temp);
            	}
            }
            var splitNumberTemp =  Math.max.apply(null, MaxsArr) ;
            splitNumberTemp > 0  ? splitNumberTemp = splitNumberTemp : splitNumberTemp = 10;
            var splitNumber = splitNumberTemp == 19 ?  splitNumberTemp  :  splitNumberTemp + 1;
            var option = {
                tooltip: {
                    trigger : 'axis',
                    axisPointer: {            // 坐标轴指示器,坐标轴触发有效
                        type: 'line',         // 默认为直线,可选为：'line' | 'shadow'
                        lineStyle: {          // 直线指示器样式设置
                            color: '#48b',
                            width: 2,
                            type: 'solid',      
                        },
                        shadowStyle: {                       // 阴影指示器样式设置
                            width: 'auto',                   // 阴影大小
                            color: 'rgba(150,150,150,0.3)'  // 阴影颜色
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
                        mark: {show: true},//辅助线开关
                        markUndo: {show: true},//删除辅助线
                        markClear: {show: true},//清空辅助线
                        dataZoom: {show: true},//区域缩放
                        dataView: {show: false},//数据视图
                        magicType: {show: true, type: ['line']},
                        restore: {show: true},
                        saveAsImage: {show: false},
                    },
                },
                calculable: true,
                dataZoom: {
                	x :100,
                	width : '520px',
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
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data : json0.xAxis,
                        name : json0.x_coordinate_name,
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
                        name : json0.y_coordinate_name,
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
                    for (var i = 0; i < json0.series.length; i++) {
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
            var myChart1 = echarts.init(document.getElementById(idName+'1'), 'macarons', {
                width: width,
                height: '330px'
            });

            // 为echarts对象加载数据
            myChart.setOption(option);
            myChart1.setOption(option1);
            echarts.connect([myChart, myChart1]);
        }
        
	};
	var cridrLineListRequestSetting = function(json){
		$scope.isShowDefaultCridrLineList = false;//隐藏正在加载图标
		var unDataTemp = true;
	  	if(json.picture_list && json.picture_list.length > 0){
	  		for(var i = 0; i < json.picture_list.length; i++){
				if(json.picture_list[i].series &&　json.picture_list[i].series.length > 0){
					for(var j = 0; j < json.picture_list[i].series.length; j++){
						if(json.picture_list[i].series[j].data && json.picture_list[i].series[j].data.length > 0){
							for(var k = 0; k < json.picture_list[i].series[j].data.length; k++){
								if(json.picture_list[i].series[j].data[k] != ''){
									unDataTemp = false;//有数据正常显示
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
     	if(json && !json.picture_list || unDataTemp){
     		$scope.isShowNoDataIconCridrLineList = true;
     		$scope.isShowHaveDataIconCridrLineList = false;
     	}else{
     		$scope.isShowNoDataIconCridrLineList = false;
     		$scope.isShowHaveDataIconCridrLineList = true;
     		var json0 = json.picture_list[0];
    		var json1 = json.picture_list[1];
    	
    		$scope.cridrLineListTitle0 = json0.title;
    		$scope.cridrLineListTitle1 = json1.title;
    	
     		comCridtLineChartSetting(json,'cr_main');
     	}
     		
		
	}
	var cridrLineList = function(){
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconCridrLineList = false;
		$scope.isShowHaveDataIconCridrLineList = false;
		$scope.isShowDefaultCridrLineList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_CRIDT_LINE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_CRIDT_LINE_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
                   var loadTimes = new Date().getTime() - startTime;//毫秒
                   if(loadTimes < $rootScope.loadingTimeLimt){
              		 $timeout(function(){
              		 	cridrLineListRequestSetting(results.results);
              		 },1000)
          		 }else{
          		 	cridrLineListRequestSetting(results.results);
          		 }
			}else{
				$scope.isShowDefaultCridrLineList = false;//隐藏正在加载图标
				$scope.isShowHaveDataIconCridrLineList = false;
				$scope.isShowNoDataIconCridrLineList = true;
            }
        })

	}
	
	/*
	* 16.20.	信用数据-银行授信
	* 删除
	* 
	*/
	


	var cridtBankList = function(){
		var startTime = new Date().getTime();
		$scope.isShowNoDataIconCridtBankList = false;
		$scope.isShowDefaultCridtBankList = true;//显示占位图
		var options = {
	        service_code: 'WINMET_APP_CRIDT_BANK_LIST',
	        params:{
	        	service_code: 'WINMET_APP_CRIDT_BANK_LIST',
		        company_code: companyCode,
		        credit_code: creditCode
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	var loadTimes = new Date().getTime() - startTime;//毫秒
            	if(loadTimes < $rootScope.loadingTimeLimt){
            		$timeout(function(){
            			cridtBankListSetting(results.results);
            		},1000)
        		}else{
        			cridtBankListSetting(results.results);
        		}

			 }else{
			 	$scope.isShowDefaultCridtBankList = false;//隐藏正在加载图标
			 	$scope.isShowNoDataIconCridtBankList = true;
            }
        })
	};
	/*
	* 主体财务状况评分
	* 
	* 
	*/ 

	var loadFinanceData = function(){
		$scope.isNoData = false;//无数据
		$scope.isShowHaveDataIconloadFinanceData = false;
    	$scope.isShowState = true;//中间态
		var options = {
			service_code: 'WINMET_APP_FINANCIAL_RISK',
			params: {
				service_code:'WINMET_APP_FINANCIAL_RISK',
				company_name: companyName//企业名称
			}
		};
		getInterface.jsonp(options, function(results) {
			if(results.status == 'Y'){
				$scope.bonddetail = results.results;  
				$scope.isShowState = false;//中间态
				if(($scope.bonddetail.main_score_card && $scope.bonddetail.main_score_card.score_card_titile) || ($scope.bonddetail.little_grade && $scope.bonddetail.little_grade.length > 0)){
                	$scope.isShowHaveDataIconloadFinanceData = true;
                	$scope.bonddetailMainTitle  = $scope.bonddetail.main_score_card.score_card_titile;
	            	$scope.tuTitleB = $scope.bonddetail.main_score_card.line_charge.line_charge_dataset;
					$scope.oneB = $scope.tuTitleB[0].value_title;
					$scope.twoB = $scope.tuTitleB[1].value_title;
					//将内容中含br 替换成 空
					
					if($scope.bonddetail.main_score_card.score_card_brief.indexOf('/br')){
					
						$scope.bonddetail.main_score_card.score_card_brief = $scope.bonddetail.main_score_card.score_card_brief.replace(/\/br/g,'');
					}
					
					if($scope.bonddetail.little_grade.length > 0 ){
						angular.forEach($scope.bonddetail.little_grade,function(value,index){
							if(value.score_card_brief.indexOf('/br')){
								value.score_card_brief = value.score_card_brief.replace('/br','');
							}
							
						})
					}
					
					//横轴数据
					
					$scope.listsB=$scope.bonddetail.little_grade[0].line_charge.line_charge_x;
					$scope.finalData = $scope.listsB[$scope.listsB.length - 1].x_name;
				
					$scope.listB= [];
					$scope.axisXB=[];
					angular.forEach($scope.listsB, function(data,index,array){			
						$scope.listB.push(data.x_name);
						var a =data.x_name*1000
						var oDate=new Date();
		            	oDate.setTime(a);
		            	$scope.sDate=oDate.getFullYear()+'/'+(oDate.getMonth()+1)+'/'+oDate.getDate();
						$scope.axisXB.push($scope.sDate);	
					});
			
					var rnd = function(n, m){
				      	return Math.floor(Math.random()*(m-n)+n);
				            
				   	};
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
					$scope.oneB = "企业财务状况";
					$scope.twoB = "行业财务状况";
					var option = {
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
					            lineStyle : {          // 直线指示器样式设置
					                color: '#48b',
					                width: 2,
					                type: 'solid'
					            },
					            shadowStyle : {                       // 阴影指示器样式设置
					                width: 'auto',                   // 阴影大小
					                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
					            }
					        },
					    },
					    legend: {
					    	orient: 'horizontal', // 'vertical'
					        x: 'left', // 'center' | 'left' | {number},
					        y: 'top', // 'center' | 'bottom' | {number}
					        data:[$scope.oneB,$scope.twoB]
//					        data:["企业财务状况","行业财务状况"]
					    },
					    toolbox: {
					        show : true,
					        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
					        feature : {
					            mark : {show: true},
					            dataZoom : {show: true},
					            dataView : {show: false},
					            magicType : {show: true, type: ['line']},
					            restore : {show: true},
					            saveAsImage : {show: false},
					        }
					    },
					    calculable : true,
					    grid: {
		                    left: '3%',
		                    right: '10%',
		                    bottom: '20%',
		                    containLabel: true
		                },
					    dataZoom : {
					    	x : 100,
					    	width : '500px',
					        show : true,
					        realtime : true,
					        start : 40,
					        end : 100,
					        fillerColor:'#d4cde4',
					        backgroundColor:'#f7f7f7',
					        handleColor:'#008acd',
					        dataBackgroundColor:'#efefff',
					    },
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : $scope.listB,
					            axisLabel: {
						            show: true,
						            textStyle: {
						                color: '#6a7883',
//						                fondside:"36px"
						                fontSize:14
						            }
						       	},
						       	axisLine:{
					                lineStyle:{
					                    color:'#000',
					                    width:1,//这里是为了突出显示加上的
					                }
					        	},
					        	splitLine: {
					        		show: true,
					        		lineStyle:{
										    color: ['#ccc'],
										    width: 1,
										    type: 'solid'
										}  
					        	},//网格线
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            boundaryGap : false,
//					            splitNumber : 20,
					            axisLabel: {
						            show: true,
						            textStyle: {
						                color: '#000',
						                fontSize:14
						            },
						       	},
					       		
						       	axisLine:{
					                lineStyle:{
					                    color:'#000',
					                    width:1,//这里是为了突出显示加上的
					                }
					        	},
					        	splitArea: {           // 分隔区域
						            show: true,       // 默认不显示，属性show控制显示与否
						            // onGap: null,
						            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
						                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.2)']
						            }
						        },
					        }
					    ],
					    series : function(){
					    	var serie = [];
					    	var lineDatas =  results.results.main_score_card.line_charge.line_charge_dataset;
					    	lineDatas[0].value_title = '企业财务状况';
					    	lineDatas[1].value_title = '行业财务状况';
		                    for (var i = 0; i < lineDatas.length ; i++) {
		                    	var random = rnd(0, colorArr.length);
		                        var item = {
	                                name : lineDatas[i].value_title,
	                                type : 'line',
	                                data : function(){
	                                	var datas = [];
	                                	angular.forEach(lineDatas[i].value_list, function(value,index,array){
											datas.push(value.y_value);																		
										})
	                                	return datas;
	                                	
	                                }(),
	                                itemStyle : {
										normal : {
											color:colorArr[random],
										}
									},
	                            };
		                        colorArr.splice(random, 1);    
		                        serie.push(item);
		                            
		                     }
		                	return serie;
					    }()

					};
					if(document.getElementById('finance_ardar_zx')){
						var width = document.getElementById('finance_ardar_zx').parentNode.offsetWidth - 40 + 'px';
						var echartBond = echarts.init(document.getElementById('finance_ardar_zx'),{},{width:width,height:'300px'});
						echartBond.setOption(option);
//						$scope.debtChartTestDeffer.resolve(option);
					}
					
					
					
					//雷达
					var jsonPolar = results.results.little_grade;
					var legend = [];
					var series = [];
					angular.forEach(jsonPolar,function(value,index){
						legend.push(value.score_card_titile);
						series.push(value.score_card_value);
					})
					
	        		var optionPolar = {
						    tooltip : {
						        trigger : 'item',
						       	position : 'bottom',
						    },
						    textStyle: {//坐标值颜色
					             //设置颜色
					             color:'#000'
					        },
					        color:function(){
						            var arr = [];
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
						            for(var i = 0; i < legend.length; i++ ){
						            	var random = rnd(0, colorArr.length);
					                    var temp = colorArr[random];
					                    arr.push(temp);
						            }
						            colorArr.splice(random, 1);
						            return arr;
						    }(),
						    legend: {
						        orient : 'vertical',
						        x : 'right',
						        y : 'center',
//						        data:['主体信用总评分','行业信用总评分'],
						        backgroundColor: 'rgba(0,0,0,0)',
						        borderColor: '#ccc',       // 图例边框颜色
						        borderWidth: 0,            // 图例边框线宽,单位px,默认为0（无边框）
						        padding: 2,                // 图例内边距,单位px,默认各方向内边距为5,
						                                   // 接受数组分别设定上右下左边距,同css
						        itemGap: 5,               // 各个item之间的间隔,单位px,默认为10,
						                                   // 横向布局时为水平间隔,纵向布局时为纵向间隔
						        itemWidth:15,             // 图例图形宽度
						        itemHeight: 4,            // 图例图形高度
						        textStyle: {
						            color: '#333',        // 图例文字颜色
						            fontSize:'12px',
						            fontFamily : '微软雅黑',
						        }
						       
						    },
						    polar : [
						       {
						           indicator : function(){
							           	var arr = [];
							           	angular.forEach(legend,function(value,index){
							           		var temp = {};
							           		if(index == 0){
							           			temp = {
								           			text : value,
								           			max  : 100,
								           			axisLabel: {show: true, textStyle: {fontSize: 12, color: '#333'}}
								           		};
							           		}else{
							           			temp = {
								           			text : value,
							           			    max  : 100
								           		};
							           		}
							           		arr.push(temp);
							           	})
							           	return arr;
						           }(),
						            radius : '80%'
						        }
						    ],
						    calculable : true,
						    series : [
						        {
						            type: 'radar',
						            data : [
							            {
							            	value:series,
							            	name : '  '
							            }
						            ],
						        }
						    ]
						};
						 
	                // 基于准备好的dom，初始化echarts图表
	                if(document.getElementById('finance_ardar_list')){
	                	 var width = document.getElementById('finance_ardar_list').parentNode.offsetWidth - 40 + 'px';
		                var myChartpolar = echarts.init(document.getElementById('finance_ardar_list'), 'macarons', { width: width, height:'300px'});
		                // 为echarts对象加载数据
		                myChartpolar.setOption(optionPolar);
	                }
	               
					
						
				}else{
					$scope.isNoData = true;
					$scope.isShowHaveDataIconloadFinanceData = false;
//					if(document.getElementById('finance_ardar_zx')){
//              		document.getElementById('finance_ardar_zx').style.display = 'none';
//              	}
				}
          }else{
          		$scope.isShowState = false;
          		$scope.isShowHaveDataIconloadFinanceData = false;
          		$scope.isNoData = true;
			}
			
		});
	};
	
    
    /*
	* 16.24.	风险分析-财务异常分析-表格
	* 
	* 	
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
	* comHighRunChart
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
    		$scope.comHighRunChartDeffer.resolve(json);
    	}
	};
	$scope.comHighRunChartDeffer = $q.defer();
	var riskHighRunList = function(){
		$scope.comHighRunChartDeffer = $q.defer();
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
    
    /*
	* 担保风险分析
	* 
	* 
	*/
	


	var loadConcernList = function() {
		$scope.metadata = false;//暂无数据
		$scope.isProcessing = true;//正在加载。。。
		var options = {
			service_code: 'WINMET_APP_ASSURE_RISK_SLOBON',
			params: {
				service_code:'WINMET_APP_ASSURE_RISK_SLOBON',
				company_code:companyCode,//企业注册号
				credit_code:creditCode//统一社会信用代码
			}
		};
		getInterface.jsonp(options, function(results) {
			if(results.status == 'Y'){
				var atlasDatas = results.results;
				if(document.getElementById('diagram_echart')){
					var width = document.getElementById('diagram_echart').parentNode.offsetWidth + 'px';
					var myChart = echarts.init(document.getElementById('diagram_echart'), {}, {width: width, height:'500px'});
					var option = {};
					var rnd = function(n, m){
						return Math.floor(Math.random()*(m-n)+n);
					}
					var myRandomNum = function(m, n){
						return  rnd(m, n);
					}
					if(atlasDatas.nodes.length == 0) {
						$scope.isProcessing = false;
						$scope.metadata = true;
						return;
					};
					$scope.isProcessing = false;
					if(atlasDatas.nodes.length > 0  && atlasDatas.edges.length > 0){
						
						angular.forEach(atlasDatas.nodes,function(value,index){
							value.x = rnd(-1000000,1000000) * Math.random();
							value.y = rnd(-1000000,1000000) * Math.random();
							value.color = 'rgb('+ rnd(0,255) +','+ rnd(0,255) + ',' + rnd(0,255) + ')';
						});
						var sumSize = function(node){
							var sum = 0;
							var num = 0;
							angular.forEach(atlasDatas.edges,function(value,index){
								if(node.id == value.sourceID && value.size !=='--'){
									sum += parseFloat(value.size);
									num++;
								}
							});
							return Math.log(Math.sqrt(sum))*10 < 10 ? 10 : Math.log(Math.sqrt(sum))*10;
						}
						myChart.setOption(option = {
				    		tooltip: {
				                trigger: 'item',
				                    hideDelay: 3000,
				                    enterable: true,
				                    show: true,
				                    formatter: function(params){
				                    	for(var i = 0; i < atlasDatas.nodes.length; i++){
				                    		if(params.data.source === atlasDatas.nodes[i].id){
				                        		var sourceName = atlasDatas.nodes[i].label;
				                        	}
				                    		if(params.data.target === atlasDatas.nodes[i].id){
				                        		var targetName = atlasDatas.nodes[i].label;
				                       		}
				                    	}
				  
				                    	if(params.dataType == 'edge'){
				            			return  sourceName  + ' > ' + targetName+ '</br>' + 
				            			'担保金额 : ' + params.value;
				                	}
				                }
				            },
					        series : [
					            {
					                type: 'graph',
					                layout: 'none',
					                data: atlasDatas.nodes.map(function (node) {
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
					                edges: atlasDatas.edges.map(function (edge) {
					                    return {
					                        source: edge.sourceID,
					                        target: edge.targetID,
					                        value:edge.size,
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
					                edgeLabel: { position:'middle',normal: { textStyle: { fontSize: 20 }}},
					                roam: true,
					                focusNodeAdjacency: true,
					                lineStyle: {
					                    normal: {
					                        width: 0.5,
					                        curveness: 0.1,
					                        opacity: 0.7
					                    }
					                }
					            }
					        ]
						}, true);
					}
				}
			}else if(results.status == 'N'){
				$scope.show = false;
				$scope.diagram = false;
				$scope.metadata = true;
			}
		});
		
	};

	

    /*
	* 16.1.	是否有分析报告查看权限
	* 
	* 
	*/
	
	var analysisReportLimit = function(){
		$scope.isPower = false;
		$scope.isNoPower = false;
		$scope.isShowAnalysisReportLimit = true;//正在加载图标
		var options = {
	        service_code: 'WINMET_APP_ANALYSIS_REPORT_LIMIT',
	        params:{
	        	service_code: 'WINMET_APP_ANALYSIS_REPORT_LIMIT'
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	$scope.isShowAnalysisReportLimit = false;//隐藏正在加载图标
            	$scope.isPower = true;//有访问分析报告的权限
				init();	
           }else{
           		$scope.isShowAnalysisReportLimit = false;//隐藏正在加载图标
            	$scope.isPower = false;
            	$scope.isNoPower = true;
            }
        })
	}
	
   	analysisReportLimit();
   	
});


//饼图
app.directive('comPieChart', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        	
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
    		scope.defer.promise.then(function(json){
    			if(json.series && document.getElementById(scope.id)){
	        		var width = document.getElementById(scope.id).parentNode.offsetWidth - 40 + 'px'; 
	        		var rnd = function(n, m){
				      	return Math.floor(Math.random()*(m-n)+n);
				            
				   	};
	        		var option = {
						    tooltip : {
						        trigger: 'item',
//						        formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
						    color:function(){
						    	var arr = [];
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
						    	for(var i = 0; i < json.legend.length; i++ ){
						    		var random = rnd(0, colorArr.length);
						    		var temp = colorArr[random];
						    		arr.push(temp);
						    	}
						    	colorArr.splice(random, 1);
						    	return arr;
						    }(),
						    legend: {
			//			        orient : 'vertical',
						        x : 'center',
						        data:json.legend,
						        backgroundColor: 'rgba(0,0,0,0)',
						        borderColor: '#ccc',       // 图例边框颜色
						        borderWidth: 0,            // 图例边框线宽,单位px,默认为0（无边框）
						        padding: 2,                // 图例内边距,单位px,默认各方向内边距为5,
						                                   // 接受数组分别设定上右下左边距,同css
						        itemGap: 5,               // 各个item之间的间隔,单位px,默认为10,
						                                   // 横向布局时为水平间隔,纵向布局时为纵向间隔
						        itemWidth:10,             // 图例图形宽度
						        itemHeight: 10,            // 图例图形高度
						        textStyle: {
						            color: '#333',        // 图例文字颜色
						            fontSize:'12px',
						            fontFamily : '微软雅黑',
						        }
						    },
						    calculable : true,
						    series : [
						        {
//						            name:'访问来源',
						            type:'pie',
						            radius : '55%',
						            center: ['50%', '60%'],
						            data:json.series
						        }
						    ]
						};
						 
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'300px'});
	                // 为echarts对象加载数据
	                myChart.setOption(option);
	            }
        	});
        }
    };
})
//雷达图
app.directive('comArdarChart', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        	
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
    		scope.defer.promise.then(function(json){
        		if(json.series && document.getElementById(scope.id)){
        			var width = document.getElementById(scope.id).parentNode.offsetWidth - 40  + 'px';
	        		var option = {
						    tooltip : {
						        trigger : 'item',
						       	position : 'bottom',
						    },
						    textStyle: {//坐标值颜色
					             //设置颜色
					             color:'#000'
					        },
					        color:function(){
						           	var arr = [];
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
						            var rnd = function(n, m){
						                 return Math.floor(Math.random()*(m-n)+n);
						            };
						             for(var i = 0; i < json.legend.length; i++ ){
						             	var random = rnd(0, colorArr.length);
					                    var temp = colorArr[random];
					                    colorArr.splice(random, 1);
					                    arr.push(temp);
						             }
						              return arr;
						    }(),
						    legend: {
						        orient : 'vertical',
						        x : 'right',
						        y : 'center',
						        data:json.legend,
						        backgroundColor: 'rgba(0,0,0,0)',
						        borderColor: '#ccc',       // 图例边框颜色
						        borderWidth: 0,            // 图例边框线宽,单位px,默认为0（无边框）
						        padding: 2,                // 图例内边距,单位px,默认各方向内边距为5,
						                                   // 接受数组分别设定上右下左边距,同css
						        itemGap: 5,               // 各个item之间的间隔,单位px,默认为10,
						                                   // 横向布局时为水平间隔,纵向布局时为纵向间隔
						        itemWidth:15,             // 图例图形宽度
						        itemHeight: 4,            // 图例图形高度
						        textStyle: {
						            color: '#333',        // 图例文字颜色
						            fontSize:'12px',
						            fontFamily : '微软雅黑',
						        }
						    },
						    polar : [
						       {
						           indicator : function(){
							           	var arr = [];
							           	angular.forEach(json.indicator,function(value,index){
							           		var temp = {};
							           		var min =   parseFloat(value.min) - Math.abs(( parseFloat(value.max) - parseFloat(value.min))/5);
							           		if(index == 0){
							           			temp = {
								           			text : value.text,
								           			max  : value.max,
								           			min :  min,
								           			axisLabel: {
								           				show: true,
								           				formatter: function (value, index) {
								           					var temp = value + '';
								           					var subNum =  temp.indexOf('.');
								           					if(temp.indexOf('.') >= 0){
								           						return temp.substring(0,subNum + 1) + temp.substring(subNum + 1,subNum + 5) ;
								           					}else{
								           						return temp;
								           					}
														},
													textStyle: {fontSize: 12, color: '#333'}},
//								           			nameGap : 30, 
								           			
								           		};
							           		}else{
							           			temp = {
								           			text : value.text,
								           			max  : value.max,
								           			min :  min,
//								           			nameGap : 30,
								           		};
							           		}
							           		arr.push(temp);
							           	})
							           	return arr;
						           }(),
						           radius : '80%'
						        }
						    ],
						    calculable : true,
						    series : [
						        {
						            type: 'radar',
						            data :
						            	function() {
		                                    var serie = [];
		                                    for (var i = 0; i < json.series.data.length ; i++) {
		                                        var item = {
		                                            value: json.series.data[i].value, 
		                                            name: json.series.data && json.series.data[i].name
		                                        };
		                                        serie.push(item);
		
		                                    }
		                                    return serie;
		                                } ()
						            
						            
						            
						        }
						    ]
						};
						 
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'300px'});
	                // 为echarts对象加载数据
	                myChart.setOption(option);
	           }
        	});
        }
    };
});

//信用数据-普通折线图

app.directive('comCridtLineChart', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        	
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
    		scope.defer.promise.then(function(json){
    			if(json.picture_list && document.getElementById(scope.id)){
	        		var width = document.getElementById(scope.id).parentNode.offsetWidth - 40 + 'px'; 
	        		var json0 = json.picture_list[0];
	        		var json1 = json.picture_list[1];
	        		var option = {
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器,坐标轴触发有效
					            type : 'line',         // 默认为直线,可选为：'line' | 'shadow'
					            lineStyle : {          // 直线指示器样式设置
					                color: '#48b',
					                width: 2,
					                type: 'solid'
					            },
					            shadowStyle : {                       // 阴影指示器样式设置
					                width: 'auto',                   // 阴影大小
					                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
					            }
					        },
					    },
					    legend: {
					    	orient: 'horizontal', // 'vertical'
					        x: 'left', // 'center' | 'left' | {number},
					        y: 'top', // 'center' | 'bottom' | {number}
					        data:json0.legend,
					        show:true
					    },
					    toolbox: {
					        show : true,
					        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
					        feature : {
					            mark : {show: true},//辅助线开关
					            markUndo : {show: true},//删除辅助线
					            markClear : {show: true},//清空辅助线
					            dataZoom : {show: true},//区域缩放
					            dataView : {show: false},//数据视图
					            magicType : {show: true, type: ['line']},
					            restore : {show: true},
					            saveAsImage : {show: false},
					        }
					    },
					    calculable : true,
					    dataZoom : {
					        show : false,
					        realtime : true,
					        start : 40,
					        end : 100,
					        fillerColor:'#d4cde4',
					        backgroundColor:'#f7f7f7',
					        handleColor:'#008acd',
					        dataBackgroundColor:'#efefff',
					    },
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : json0.xAxis,
					            name : json.x_coordinate_name,
					            axisLabel: {
						            show: true,
						            textStyle: {
						                color: '#6a7883',
				//						                fondside:"36px"
						                fontSize:14
						            }
						       	},
						       	axisLine:{
					                lineStyle:{
					                    color:'#000',
					                    width:1,//这里是为了突出显示加上的
					                }
					        	},
					        	splitLine: {
					        		show: true,
					        		lineStyle:{
										    color: ['#ccc'],
										    width: 1,
										    type: 'solid'
										}  
					        	},//网格线
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            name : json.y_coordinate_name,
				                axisLabel: {
				                    show: true,
				                    textStyle: {
				                        color: '#6a7883',
				                        //						                fondside:"36px"
				                        fontSize:14
				                    }
				                },
				                axisLine:{
				                    lineStyle:{
				                        color:'#000',
				                        width:1,//这里是为了突出显示加上的
				                    }
				                },
				                splitArea: {           // 分隔区域
						            show: true,       // 默认不显示,属性show控制显示与否
						            // onGap: null,
						            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
						                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.2)']
						            }
						        },
				            }
					    ],
					    series : function() {
		                        var serie = [];
		                        for (var i = 0; i < json0.series.length ; i++) {
		                            var item = {
		                                name: json0.series[i].name,
		                                type: 'line',
		                                itemStyle : {
											normal : {
												color:'#2ec7c9',
											}
										},
//										smooth: true,
		                                data: json0.series && json0.series[i].value
		                            };
		                            serie.push(item);
		                            
		                        }
		                        return serie;
		                    } ()
					};
					var option1 = {
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器,坐标轴触发有效
					            type : 'line',         // 默认为直线,可选为：'line' | 'shadow'
					            lineStyle : {          // 直线指示器样式设置
					                color: '#48b',
					                width: 2,
					                type: 'solid'
					            },
					            shadowStyle : {                       // 阴影指示器样式设置
					                width: 'auto',                   // 阴影大小
					                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
					            }
					        },
					    },
					    legend: {
					    	orient: 'horizontal', // 'vertical'
					        x: 'left', // 'center' | 'left' | {number},
					        y: 'top', // 'center' | 'bottom' | {number}
					        data:json1.legend,
					        show:true
					    },
					    toolbox: {
					        show : true,
					        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
					        feature : {
					            mark : {show: true},//辅助线开关
					            markUndo : {show: true},//删除辅助线
					            markClear : {show: true},//清空辅助线
					            dataZoom : {show: true},//区域缩放
					            dataView : {show: false},//数据视图
					            magicType : {show: true, type: ['line']},
					            restore : {show: true},
					            saveAsImage : {show: false},
					        }
					    },
					    calculable : true,
					    dataZoom : {
					        show : true,
					        realtime : true,
					        start : 40,
					        end : 100,
					        fillerColor:'#d4cde4',
					        backgroundColor:'#f7f7f7',
					        handleColor:'#008acd',
					        dataBackgroundColor:'#efefff',
					    },
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : json1.xAxis,
					            name : json.x_coordinate_name,
					            axisLabel: {
						            show: true,
						            textStyle: {
						                color: '#6a7883',
				//						                fondside:"36px"
						                fontSize:14
						            }
						       	},
						       	axisLine:{
					                lineStyle:{
					                    color:'#000',
					                    width:1,//这里是为了突出显示加上的
					                }
					        	},
					        	splitLine: {
					        		show: true,
					        		lineStyle:{
										    color: ['#ccc'],
										    width: 1,
										    type: 'solid'
										}  
					        	},//网格线
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
				                axisLabel: {
				                    show: true,
				                    textStyle: {
				                        color: '#6a7883',
				                        //						                fondside:"36px"
				                        fontSize:14
				                    }
				                },
				                axisLine:{
				                    lineStyle:{
				                        color:'#000',
				                        width:1,//这里是为了突出显示加上的
				                    }
				                },
				                splitArea: {           // 分隔区域
						            show: true,       // 默认不显示,属性show控制显示与否
						            // onGap: null,
						            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
						                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.2)']
						            }
						        },
				            }
					    ],
					    series : function() {
		                        var serie = [];
		                        for (var i = 0; i < json1.series.length ; i++) {
		                            var item = {
		                                name: json1.series[i].name,
		                                type: 'line',
		                                itemStyle : {
											normal : {
												color:'#2ec7c9',
											}
										},
//										smooth: true,
		                                data: json1.series && json1.series[i].value
		                            };
		                            serie.push(item);
		                            
		                        }
		                        return serie;
		                    } ()
					};
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'300px'});
	                var myChart1 = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'300px'});
	
	                // 为echarts对象加载数据
	                myChart.setOption(option);
	                myChart1.setOption(option1);
	                echarts.connect([myChart,myChart1]);
		           
	           　}
        	});
        }
    };
})

//风险分析-财务异常分析
app.directive('comHighRunChart', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        	
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
    		scope.defer && scope.defer.promise.then(function(json){
    			var rnd = function(n, m){
			       return Math.floor(Math.random()*(m-n)+n);
			            
			   	};
			   	var eachPage = 30;//一页多少条数据
			   	var pageConts = Math.ceil(json.series.length / eachPage);
			   	var pageArr = [];
			   	for(var i = 0; i < pageConts; i++){
			   		pageArr.push(i+1);
			   	}
    			if(json.series && document.getElementById(scope.id)){
	        		var width = document.getElementById(scope.id).parentNode.offsetWidth - 40 + 'px'; 
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
					        tooltip: {
					        	trigger: 'item',
					        	axisPointer : {            // 坐标轴指示器,坐标轴触发有效
				                    type : 'shadow'        // 默认为直线,可选为：'line' | 'shadow'
				              }
	    					},
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
//					            data: json.legend
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
					    		(function(i){
					    			var temp = {
	//						            title: {text: '第' + i + 1},
							            xAxis: [{
							                        data: json.xAxis && json.xAxis.slice(i * eachPage, i * eachPage + eachPage),
							                        axisLabel :{
										                formatter:function(val){
														    return val &&  val.split("").join("\n");
														}
										            },
							                    }],
							            series: [
							                {
							                	data: json.series && json.series.slice(i * eachPage, i * eachPage + eachPage),
							                	barWidth : 10,
							                },
							            ]
							        }
						    		console.log('x',json.xAxis.length,'y',json.series.length);
						    		seriesDatas.push(temp);
					    		})(i);
					    		
					    	}
					    	return seriesDatas;
					    }()
					};
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'600px'});
	
	                // 为echarts对象加载数据
	                myChart.setOption(option);
//	                setInterval(function(){
//	                	myChart && myChart.dispose();
//	                	 // 基于准备好的dom，初始化echarts图表
//		                var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'300px'});
//		
//		                // 为echarts对象加载数据
//		                myChart.setOption(option);
//	                },304000);
	           　}
            
        	});
        }
    };
})

//勾稽关系第一个图
app.directive('comColumnChart', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        	
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
    		scope.defer.promise.then(function(json){
    			if(json.series && document.getElementById(scope.id)){
	        		var width = document.getElementById(scope.id).parentNode.offsetWidth - 40 + 'px'; 
	        		var option = {
						    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器,坐标轴触发有效
						            type : 'shadow'        // 默认为直线,可选为：'line' | 'shadow'
						        }
						    },
						    color:function(){
				            	var arr = [];
				            	var rnd = function(n, m){
							      	return Math.floor(Math.random()*(m-n)+n);
							            
							   	};
							   	var removeWithoutCopy = function(arr, item) {  
								     for(var i = 0; i < arr.length; i++){  
								         if(arr[i] == item){  
								             //splice方法会改变数组长度，当减掉一个元素后，后面的元素都会前移，因此需要相应减少i的值  
								             arr.splice(i,1);  
								             i--;  
								         }  
								     }  
								     return arr;  
			 					};
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
					            for(var i = 0; i < json.legend.length; i++ ){
					            	var random = rnd(0, colorArr.length);
					            	var temp = colorArr[random];
					            	colorArr.splice(random, 1);
				                    arr.push(temp);
					            }
					            return arr;	
				            }(),
						    legend: {
			//			    	orient : 'vertical',
			//			    	x : 'right',
						        data:json.legend,
						        backgroundColor: 'rgba(0,0,0,0)',
						        borderColor: '#ccc',       // 图例边框颜色
						        borderWidth: 0,            // 图例边框线宽,单位px,默认为0（无边框）
						        padding: 2,                // 图例内边距,单位px,默认各方向内边距为5,
						                                   // 接受数组分别设定上右下左边距,同css
						        itemGap: 5,               // 各个item之间的间隔,单位px,默认为10,
						                                   // 横向布局时为水平间隔,纵向布局时为纵向间隔
						        itemWidth:10,             // 图例图形宽度
						        itemHeight: 10,            // 图例图形高度
						        textStyle: {
						            color: '#333',        // 图例文字颜色
						            fontSize:'12px',
						            fontFamily : '微软雅黑',
						        }
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis : [
						        {
						            type : 'category',
						            data : json.xAxis,
						            name : json.x_coordinate_name,
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value',
						            name : json.y_coordinate_name,
						        }
						    ],
						    series : 
						   		 function() {
                                    var serie = [];
                                    for (var i = 0; i < json.series.length ; i++) {
                                        var item = {
                                            name: json.series[i].name,
                                            type: 'bar',
                                            barWidth : 30,
                                            data: json.series && json.series[i].data
                                        };
                                        serie.push(item);

                                    }
                                    return serie;
                                } ()
						};
						 
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'300px'});
	                // 为echarts对象加载数据
	                myChart.setOption(option);
	            }
        	});
        }
    };
});
//勾稽关系第二图
app.directive('comCrossLineChart', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        	
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
    		scope.defer.promise.then(function(json){
    			if(json.xAxis && document.getElementById(scope.id)){
	        		var width = document.getElementById(scope.id).parentNode.offsetWidth - 40 + 'px'; 
	        		var rnd = function(n, m){
                              return Math.floor(Math.random()*(m-n)+n);
                        };
	        		var option = {
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器,坐标轴触发有效
					            type : 'line',         // 默认为直线,可选为：'line' | 'shadow'
					            lineStyle : {          // 直线指示器样式设置
					                color: '#48b',
					                width: 2,
					                type: 'solid'
					            },
					            shadowStyle : {                       // 阴影指示器样式设置
					                width: 'auto',                   // 阴影大小
					                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
					            }
					        },
					    },
					    legend: {
					    	orient: 'horizontal', // 'vertical'
					        x: 'left', // 'center' | 'left' | {number},
					        y: 'top', // 'center' | 'bottom' | {number}
					        data:json.legend
					    },
					    toolbox: {
					        show : true,
					        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
					        feature : {
					            mark : {show: true},//辅助线开关
					            markUndo : {show: true},//删除辅助线
					            markClear : {show: true},//清空辅助线
					            dataZoom : {show: true},//区域缩放
					            dataView : {show: false},//数据视图
					            magicType : {show: true, type: ['line']},
					            restore : {show: true},
					            saveAsImage : {show: false},
					        }
					    },
					    calculable : true,
					    grid: {
		                    left: '3%',
		                    right: '10%',
		                    bottom: '20%',
		                    containLabel: true
		                },
					    dataZoom : {
					    	x : 100,
                    		width : '550px',
					        show : true,
					        realtime : true,
					        start : 40,
					        end : 100,
					        fillerColor:'#d4cde4',
					        backgroundColor:'#f7f7f7',
					        handleColor:'#008acd',
					        dataBackgroundColor:'#efefff',
					    },
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : json.xAxis,
					            axisLabel: {
						            show: true,
						            textStyle: {
						                color: '#6a7883',
						                fontSize:14
						            }
						       	},
						       	axisLine:{
					                lineStyle:{
					                    color:'#000',
					                    width:1,//这里是为了突出显示加上的
					                }
					        	},
					        	splitLine: {
					        		show: true,
					        		lineStyle:{
										    color: ['#ccc'],
										    width: 1,
										    type: 'solid'
										}  
					        	},//网格线
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
				                axisLabel: {
				                    show: true,
				                    textStyle: {
				                        color: '#6a7883',
				                        //						                fondside:"36px"
				                        fontSize:14
				                    }
				                },
				                axisLine:{
				                    lineStyle:{
				                        color:'#000',
				                        width:1,//这里是为了突出显示加上的
				                    }
				                },
				                splitArea: {           // 分隔区域
						            show: true,       // 默认不显示,属性show控制显示与否
						            // onGap: null,
						            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
						                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.2)']
						            }
						        },
				            }
					    ],
					    series :
							    function() {
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
                                    for (var i = 0; i < json.series.length ; i++) {
                                    	var random = rnd(0, colorArr.length);
                                        var item = {
                                            name: json.series[i].name,
                                            type: 'line',
                                            itemStyle : {
												normal : {
													color: colorArr[random],
												}
											},
								            
                                            data: json.series && json.series[i].data
                                        };
                                        colorArr.splice(random, 1);
                                        serie.push(item);

                                    }
                                    return serie;
                                } ()
						    
						};
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'330px'});
	
	                // 为echarts对象加载数据
	                myChart.setOption(option);
	           　}
	            
        	});
        }
    };
})
//资本结构
app.directive('debtChart', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
        	scope.defer.promise.then(function(option){
        		if(document.getElementById(scope.id)){
        			var width = document.getElementById(scope.id).parentNode.offsetWidth - 40  + 'px'; 
		            var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'300px'});
		            // 为echarts对象加载数据
		            myChart.setOption(option);
        		}
        		
        	}, function(){
        		
        	})
        }
    };
});

//资本结构-堆积折线图
app.directive('comDebtChart', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        	
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
    		scope.defer.promise.then(function(json){
        		if(json.series &&  document.getElementById(scope.id)){
        			var width = document.getElementById(scope.id).parentNode.offsetWidth - 40 + 'px'; 
	        		var option = {
					    tooltip : {
					        trigger: 'axis'
					    },
	//				    title : {
	//				        text: json.title,
	//				        x:'center'
	//				    },
						toolbox: {
					        show : true,
					        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
					        feature : {
					            mark : {show: true},
					            dataZoom : {show: true},
					            dataView : {show: false},
					            magicType : {show: true, type: ['line']},
					            restore : {show: true},
					            saveAsImage : {show: false},
					        }
					   },
					    legend: {
		//			    	orient : 'vertical',
		//			    	x : 'right',
					        data:json.legend,
					        backgroundColor: 'rgba(0,0,0,0)',
					        borderColor: '#ccc',       // 图例边框颜色
					        borderWidth: 0,            // 图例边框线宽,单位px,默认为0（无边框）
					        padding: 2,                // 图例内边距,单位px,默认各方向内边距为5,
					                                   // 接受数组分别设定上右下左边距,同css
					        itemGap: 5,               // 各个item之间的间隔,单位px,默认为10,
					                                   // 横向布局时为水平间隔,纵向布局时为纵向间隔
					        itemWidth:20,             // 图例图形宽度
					        itemHeight: 0,            // 图例图形高度
					        textStyle: {
					            color: '#333',        // 图例文字颜色
					            fontSize:'12px',
					            fontFamily : '微软雅黑',
					        }
					    },
					    calculable : true,
					    dataZoom : {
							x : 100,
					    	width : '550x',
					        show : true,
					        realtime : true,
					        start : 40,
					        end : 100,
					        fillerColor:'#d4cde4',
					        backgroundColor:'#f7f7f7',
					        handleColor:'#008acd',
					        dataBackgroundColor:'#efefff',
					    },
					    grid: {
			                left: '3%',
			                right: '10%',
			                bottom: '20%',
			                containLabel: true
			            },
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            axisLabel: {
		                            show: true,
		                            textStyle: {
		                                color: '#6a7883',
		                                //						                fondside:"36px"
		                                fontSize: 14
		                            }
		                        },
					            data : json.xAxis,
					            name : json.x_coordinate_name,
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            name : json.y_coordinate_name
					        }
					    ],
					    series : 
					    		function() {
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
                                    var rnd = function(n, m){
						                  return Math.floor(Math.random()*(m-n)+n);
						            };
                                    for (var i = 0; i < json.series.length ; i++) {
                                    	var random = rnd(0, colorArr.length);
                                        var item = {
                                            name: json.series[i].name,
                                          	type:'line',
					            			stack: '总量',
					            			itemStyle: {
					            				normal: {
					            					areaStyle: {type: 'default'},
					            					color: colorArr[random],
					            				}
					            			},
                                            data: json.series && json.series[i].data
                                        };
                                        colorArr.splice(random, 1);
                                        serie.push(item);

                                    }
                                    return serie;
                                } ()
					};
						 
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'330px'});
	                // 为echarts对象加载数据
	                myChart.setOption(option);
	           }
        	});
        }
    };
})




//评级
app.directive('debtChartTest', function() {
	return {
        scope: {
        	id: "@",
        	defer:"="
        },
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function(scope, iElm, iAttrs, controller) {
        	scope.defer.promise.then(function(option){
        		if(document.getElementById(scope.id)){
        			var width = document.getElementById(scope.id).parentNode.offsetWidth - 40  + 'px'; 
		            var myChart = echarts.init(document.getElementById(scope.id), 'macarons', { width: width, height:'300px'});
		            // 为echarts对象加载数据
		            myChart.setOption(option);
        		}
        		
        	}, function(){
        		
        	})
        }
    };
});
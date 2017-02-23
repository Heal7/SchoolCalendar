//index.js
var scFile = require('../../utils/school-calendar.js')
var schoolCalendar = new scFile.SchoolCalendar();

//月份天数
var DAY_OF_MONTH = [
  [31,28,31,30,31,30,31,31,30,31,30,31],
  [31,29,31,30,31,30,31,31,30,31,30,31]
];

//判断当前年是否为闰年
var isLeapYear = function(year){
  if (year%400==0 || year%4==0 && year%100!=0)
    return 1
  else 
    return 0
};

//获取当月有多少天
var getDayCount = function(year,month){
  return DAY_OF_MONTH[isLeapYear(year)][month];
};


var pageData = {
  date: "",        //当前日期字符串
  //arr数据是与索引对应的数据信息
  arrIsShow: [],     //是否显示此日期
  isToday:[],        //是否是今天
  infoIsShow:[],     // 学校事件是否显示
  arrDays: [],       //关于几号的信息
  arrInfoEx: [],     //学校事件等扩展信息
  // arrInfoExShow: [], //处理后用于显示的扩展信息
}

//刷新全部数据
var refreshPageData = function(year,month,day){
  pageData.date = year+'年' +(month+1)+'月';
  var offset = new Date(year,month,1).getDay();
  for( var i = 0; i<42; i++){
    var dayCount = getDayCount(year,month)
    pageData.arrIsShow[i] = i<offset || i>=dayCount+offset ? false:true;
    var today = new Date();
    if(year==today.getFullYear() && month==today.getMonth() && (i-offset+1) == today.getDate()){
       pageData.isToday[i] = 'isToday'
    }
    else{
       pageData.isToday[i] = ''
    }
    pageData.arrDays[i] = i-offset+1;
    var d = new Date(year,month,i-offset+1);//42个日期
    var dEx = schoolCalendar.school(d);
    if( dEx != null){
      pageData.arrInfoEx[i] = dEx;
      pageData.infoIsShow[i] = 'infoIsShow'; 
    }
    else{
      pageData.arrInfoEx[i] = '';
      pageData.infoIsShow[i] = '';
    }
  }
};

var curDate = new Date();
var curYear = curDate.getFullYear();
var curMonth = curDate.getMonth();
var curDay = curDate.getDate();


refreshPageData(curYear,curMonth,curDay);

Page({
  data: pageData,
  onLoad: function(options){
  },
  
   //回到今日
  goToday:function(e){
    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth();
    var curDay = curDate.getDate();
    refreshPageData(curYear,curMonth,curDay); 
    this.setData(pageData);
  },

  goLastMonth:function(e){
    if(curMonth == 0){
      curYear--;
      curMonth = 11;
    }else{
      curMonth--;
    }
    refreshPageData(curYear,curMonth,curDay);
    this.setData(pageData);
  },

  goNextMonth:function(e){
    if(curMonth == 11){
      curYear++;
      curMonth = 0;
    }else{
      curMonth++;
    }
    refreshPageData(curYear,curMonth,curDay);
    this.setData(pageData);
  },
  
  //跳转
  bindDateChange:function(e){
    var arr = e.detail.value.split("-");
    refreshPageData(+arr[0],arr[1]-1,arr[2]-1);
    this.setDta(pageData);
  }
})

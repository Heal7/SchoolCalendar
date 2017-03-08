var schoolevents = new Array(
    "20170219 开学",
    "20170220 上课",
    "20170402 清明放假",
    "20170403 清明放假",
    "20170404 清明放假",
    "20170415 博士入学考试",
    "20170429 五一放假",
    "20170430 五一放假",
    "20170501 五一放假",
    "20170528 端午放假",
    "20170529 端午放假",
    "20170530 端午放假",
    "20170617 四六级考试",
    "20170701 考试结束"  
);
var schoolTime = new Array();
var schoolEvent = new Array();

for( var i=0; i<schoolevents.length; i++){
    schoolTime.push(schoolevents[i].split(" ")[0]);
    schoolEvent.push(schoolevents[i].split(" ")[1]);
}



function SchoolCalendar(){
    this.school = function(date){
        
        var year = date.getFullYear(), 
            month = date.getMonth()+1,
            day = date.getDate();

        if(month<10){
            month = "0" + month
        }
        if(day<10){
            day = "0" + day
        }


        for(let i=0; i<schoolTime.length; i++){
            if(schoolTime[i] === year+month+day)
                return schoolEvent[i]
            else
                continue
        }
    }
    
}




module.exports = {
    SchoolCalendar: SchoolCalendar
}
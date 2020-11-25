import Vue from 'vue'
import moment from "moment";

// 完整时间格式
Vue.filter("time", function(value, formatString) {
    if(value){
        formatString = formatString || "YYYY-MM-DD HH:mm:ss";
        return moment(value).format(formatString);
    }else{
        return "";
    }
});

// 只有日期的格式
Vue.filter("date", function(value, formatString) {
    if(value){
        formatString = formatString || "YYYY-MM-DD";
        return moment(value).format(formatString);
    }else{
        return "";
    }
});

//授权状态
Vue.filter("authorizationStatus", function(input) {
    if( input === false ){
        return '未授权'
    }else if( input === true ){
        return '已授权'
    }else{
        return input;
    }
});

//数字转换成汉字
Vue.filter("letterChange", function(input) {
    if(input=='1'){
        return '一'
    }else if(input=='2'){
        return '二'
    }else if(input=='3'){
        return '三'
    }else if(input=='4'){
        return '四'
    }else if(input=='5'){
        return '五'
    }else{
        return input;
    }
});

// 日志角色筛选
Vue.filter('operationRoleFilter',function(input){
    if(input == '1'){
        return '管理员'
    }else if(input == '2'){
        return '审计员'
    }
})
// 日志操作审核筛选
Vue.filter('operateFilter',function(input){
    if(input == '0'){
        return '成功'
    }else if(input == '1'){
        return '失败'
    }
})
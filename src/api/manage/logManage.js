const axios = window.axios;

const qs = require('qs')



let errObj = {message: "服务器错误", data: {}, code: '1'}
/**
 * 获取用户密钥管理列表
 * @param rows //行数
 * @param operatorRole //操作人类别
 * @param page
 * @param startTime //开始时间
 * @param endTime //结束时间
 * @param operType //操作类别
 */
export const getOperationLogList  = async (operatorRole,startTime,endTime,operType,page,rows) => {
    try{
        return await axios.post("/getOperationLogList", qs.stringify({ operatorRole,startTime,endTime,operType,page,rows }))
    }
    catch{
        return errObj
    }
}

/**
 * 导出业务日志列表
 * @param operatorRole //操作人类别
 * @param startTime //开始时间
 * @param endTime //结束时间
 * @param operType //操作类别
 */
export const exportOperationLogs  =  (operatorRole,operType,startTime,endTime) => {
   window.location.href = "/exportOperationLogs?operatorRole ="+ operatorRole +"&operType="+ operType +"&startTime="+startTime+"&endTime="+endTime;
}

/**
 * 获取归档记录列表
 */
export const getStrategyInfo  = async () => {
    try{
        return await axios.post("/getStrategyInfo")
    }
    catch{
        return errObj
    }
}

/**
 * 设置归档记录列表
 * @param isUse //是否使用
 * @param intervalDay //间隔天数
 * @param hours //小时
 */
export const setStrategy  = async (isUse,intervalDay,hours) => {
    try{
        return await axios.post("/setStrategy", qs.stringify({isUse,intervalDay,hours}))
    }
    catch{
        return errObj
    }
}
/**
 * 设置归档记录列表
 * @param page //页数
 * @param rows //行数
 */
export const getArchiveLogsList  = async (page,rows) => {
    try{
        return await axios.post("/getArchiveLogsList", qs.stringify({page,rows}))
    }
    catch{
        return errObj
    }
}

/**
 * 下载归档日志
 * @param archivalId
 */
export const downArchival  = (archivalId) => {
    window.location.href = "/downArchival?archivalId="+ archivalId;
}





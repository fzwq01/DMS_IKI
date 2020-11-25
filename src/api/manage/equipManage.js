const axios = window.axios;

const qs = require('qs')


let errObj = {message: "服务器错误", data: {}, code: '1'}

/**
 * 获取设备基本信息
 */
export const deviceInformation  = async () => {
    try{
        return await axios.post("/device/deviceInformation")
    }
    catch{
        return errObj
    }
}

/**
 * 设备自检
 */
export const deviceCheck  = async () => {
    try{
        return await axios.post("/device/deviceCheck")
    }
    catch{
        return errObj
    }
}


/**
 * 获取白名单列表
 * @param page //页数
 * @param rows //行数
 */
export const getAuthIpList  = async (page,rows) => {
    try{
        return await axios.post("/deviceIp/getAuthIpList", qs.stringify({page,rows}))
    }
    catch{
        return errObj
    }
}

/**
 * 设置添加IP
 * @param authIp //页数
 */
export const setAuthIp  = async (authIp) => {
    try{
        return await axios.post("/deviceIp/setAuthIp", qs.stringify({authIp}))
    }
    catch{
        return errObj
    }
}

/**
 *  删除IP
 * @param authId //页数
 */
export const delAuthIp  = async (authId) => {
    try{
        return await axios.post("/deviceIp/delAuthIp", qs.stringify({authId}))
    }
    catch{
        return errObj
    }
}


/**
 *  获取网络配置数据
 */
export const getNetWork  = async () => {
    try{
        return await axios.post("/deviceIp/getNetWork")
    }
    catch{
        return errObj
    }
}

/**
 *  网络配置
 * @param netWorkVo //配置信息
 */
export const setNetWork  = async (netWorkVo) => {
    try{
        return await axios.post("/deviceIp/setNetWork",netWorkVo)
    }
    catch{
        return errObj
    }
}
/**
 *  重启
 */
 export const reboot  = async () => {
    try{
        return await axios.post("/dss/reboot")
    }
    catch{
        return errObj
    }
}

/**
 *  关机
 */
export const shutdown  = async () => {
    try{
        return await axios.post("/dss/shutdown")
    }
    catch{
        return errObj
    }
}

const axios = window.axios;

const qs = require('qs')


let errObj = {message: "服务器错误", data: {}, code: '1'}


/**
 * 获取管理员授权列表
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getAuthList = async () => {
    try {
        return await axios.post("/user/getAuthList")
    } catch (e) {
        return errObj
    }
}

/**
 * 管理员授权
 * @param base64SignedData  对随机数的消息签名值
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const ukeyAuth = async (base64SignedData) => {
    try {
        return await axios.post("/user/ukeyAuth", qs.stringify({base64SignedData}))
    } catch (e) {
        return errObj
    }
}

/**
 * 管理员释权
 * @param serNumber  
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const delAuth = async ( serNumber ) => {
    try {
        return await axios.post("/user/delAuth", qs.stringify({serNumber}))
    } catch (e) {
        return errObj
    }
}

/**
 * 检查管理员权限
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const checkSuperAuth = async () => {
    try {
        return await axios.post("/user/checkSuperAuth")
    } catch (e) {
        return errObj
    }
}

/**
 * 验证密码主管UKey
 * @param base64SignedData  对随机数的消息签名值
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const authSuperRole = async (base64SignedData) => {
    try {
        return await axios.post("/user/authSuperRole", qs.stringify({base64SignedData}))
    } catch (e) {
        return errObj
    }
}

/**
 * 获取服务端随机数  用户UKey签名
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getAuthCode = async () => {
    try {
        return await axios.post("/user/getAuthCode")
    } catch (e) {
        return errObj
    }
}

/**
 * 获取角色列表
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getRoleList = async () => {
    try {
        return await axios.post("/user/getRoleList")
    } catch (e) {
        return errObj
    }
}

/**
 * 删除管理员角色
 * @param identity
 * @param roleId
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const delRole = async ( identity, roleId ) => {
    try {
        return await axios.post("/user/delRole", qs.stringify({ identity, roleId }))
    } catch (e) {
        return errObj
    }
}

/**
 * 添加管理员或审计员
 * @param base64SignCert
 * @param roleId
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const addRole = async ( base64SignCert, roleId ) => {
    try {
        return await axios.post("/user/addRole", qs.stringify({ base64SignCert, roleId }))
    } catch (e) {
        return errObj
    }
}

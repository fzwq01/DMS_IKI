const axios = window.axios;

const qs = require('qs')


let errObj = {message: "服务器错误", data: {}, code: '1'}


/**
 * 获取用户密钥管理列表
 * @param page //页数
 * @param rows //行数
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getUserSecretKeyList = async ( page, rows ) => {
    try {
        return await axios.post("/secretKey/getUserSecretKeyList", qs.stringify({ page, rows }))
    } catch (e) {
        return errObj
    }
}

/**
 * 删除用户密钥
 * @param id 
 * @param type 
 * @param index
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const delSecretKey = async ( id, type, index ) => {
    try {
        return await axios.post("/secretKey/delSecretKey", qs.stringify({ id, type, index }))
    } catch (e) {
        return errObj
    }
}

/**
 * 更新用户权限码
 * @param id 
 * @param newPwd 
 * @param oldPwd
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const updateKeyPwd = async ( id, newPwd, oldPwd ) => {
    try {
        return await axios.post("/secretKey/updateKeyPwd", qs.stringify({ id, newPwd, oldPwd }))
    } catch (e) {
        return errObj
    }
}

/**
 * 导入密钥文件
 * @param id 
 * @param p12File 
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const importP12 = async ( id, p12File) => {
    try {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('p12File', p12File)
        return await axios.post("/secretKey/importP12", formData)
    } catch (e) {
        return errObj
    }
}

/**
 * 更新用户名
 * @param id 
 * @param userName 
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const updateUserName = async ( id, userName) => {
    try {
        return await axios.post("/secretKey/updateUserName", qs.stringify({ id, userName }))
    } catch (e) {
        return errObj
    }
}

/**
 * 获取对称密钥列表
 * @param page //页数
 * @param rows //行数
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getSymmetricSecretKeyList = async ( page, rows ) => {
    try {
        return await axios.post("/secretKey/getSymmetricSecretKeyList", qs.stringify({ page, rows }))
    } catch (e) {
        return errObj
    }
}

/**
 * 新增密钥
 * @param indexList 
 * @param type 
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const addSecretKey = async ( indexList, type ) => {
    try {
        return await axios.post("/secretKey/addSecretKey", qs.stringify({ indexList, type }))
    } catch (e) {
        return errObj
    }
}

/**
 * 获取分割密钥
 * @param base64Cert 
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getSplitKey = async ( base64Cert ) => {
    try {
        return await axios.post("/secretKey/getSplitKey", qs.stringify({ base64Cert }))
    } catch (e) {
        return errObj
    }
}

/**
 * 备份密钥
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const backupSecretKey = async () => {
    try {
        return await axios.post("/secretKey/backupSecretKey")
    } catch (e) {
        return errObj
    }
}

/**
 * 下载备份文件
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const downLoadBackupSecretKey = () => {
    window.location.href="/secretKey/downLoadBackupSecretKey";
}

/**
 * 上传恢复文件
 * @param file 
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const uploadRecoverFile = async ( file ) => {
    try {
        let formData = new FormData()
        formData.append('file', file)
        return await axios.post("/secretKey/uploadRecoverFile", formData)
    } catch (e) {
        return errObj
    }
}

/**
 * 密钥恢复
 * @param encrypt1 
 * @param encrypt2 
 * @param encrypt3 
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const recoverSecretKey = async ( encrypt1, encrypt2, encrypt3 ) => {
    try {
        return await axios.post("/secretKey/recoverSecretKey", qs.stringify({ encrypt1, encrypt2, encrypt3 }))
    } catch (e) {
        return errObj
    }
}

/**
 * 开始密钥恢复
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const recoverSecretKeyBegin = async () => {
    try {
        return await axios.post("/secretKey/recoverSecretKeyBegin")
    } catch (e) {
        return errObj
    }
}

/**
 * 检查管理员UKey
 * @param base64SignedData
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const checkManagerUkey = async ( base64SignedData ) => {
    try {
        return await axios.post("/secretKey/checkManagerUkey", qs.stringify({ base64SignedData }))
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
 * 登录鉴权
 * @param base64SignedData  对服务端随机数的签名
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const login = async (base64SignedData) => {
    try {
        return await axios.post("/user/auth", qs.stringify({base64SignedData}))
    } catch (e) {
        return errObj
    }
}


/**
 * 导出申请文件
 * @param id 
 * @param userName 
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const downloadP10 = ( id, userName ) => {
    window.location.href="/secretKey/downloadP10?id="+id+'&userName='+userName;
}


const axios = window.axios;

const qs = require('qs')


let errObj = {message: "服务器错误", data: {}, code: '1'}


/**
 * 初始化准备
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const initReady = async () => {
    try {
        return await axios.post("/init/initReady")
    } catch (e) {
        return errObj
    }
}


/**
 * 上传密钥备份文件
 * @param file 密钥备份文件
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const uploadRecoverFile = async (file) => {
    try {
        let formData = new FormData();
        formData.append('file', file)
        return await axios.post("/init/uploadRecoverFile", formData)
    } catch (e) {
        return errObj
    }

}


/**
 * 上传UKey中的保护密钥
 * @param encrypt1
 * @param encrypt2
 * @param encrypt3
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const recoverSecretKey = async (encrypt1, encrypt2, encrypt3) => {
    try {
        return await axios.post("/init/recoverSecretKey", qs.stringify({encrypt1, encrypt2, encrypt3}))
    } catch (e) {
        return errObj
    }
}


/**
 * 开始恢复密钥
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const recoverSecretKeyBegin = async () => {
    try {
        return await axios.post('/init/recoverSecretKeyBegin')
    } catch (e) {
        return errObj
    }
}


/**
 * 下载p10文件
 */
export const downloadPkxFile = () => {
    window.location.href = '/init/downloadPkxFile'
}


/**
 * 导入p12文件
 * @param p12File p12文件
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const importDeviceP12 = async (p12File) => {
    try {
        let formData = new FormData();
        formData.append('p12File', p12File)
        return await axios.post("/init/importDeviceP12", formData)
    } catch (e) {
        return errObj
    }
}


/**
 * 绑定管理员
 * @param base64SignCert 签名标识
 * @param roleId         角色ID
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const addRole = async (base64SignCert, roleId) => {
    try {
        return await axios.post("/user/addRole", qs.stringify({base64SignCert, roleId}))
    } catch (e) {
        return errObj
    }
}


/**
 * 获取网络地址
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getNetWork = async () => {
    try {
        return await axios.post("/deviceIp/getNetWork")
    } catch (e) {
        return errObj
    }
}

/**
 * 设置网络信息
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 * @param netWorkVo
 */
export const setNetWork = async (netWorkVo) => {
    try {
        return await axios.post("/deviceIp/setNetWork", netWorkVo)
    } catch (e) {
        return errObj
    }
}


/**
 * 获取系统版本号
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getVersion = async () => {
    try {
        return await axios.post("/version/getVersion")
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
 * 格式化密码卡
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const initCryptoCard = async () => {
    try {
        return await axios.post("/init/initCryptocard")
    } catch (e) {
        return errObj
    }
}

/**
 * 生产种子矩阵
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const initProduce = async () => {
    try {
        return await axios.post("/init/initProduce")
    } catch (e) {
        return errObj
    }
}

/**
 * 管理员设置完成
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const initUsersComplete = async () => {
    try {
        return await axios.post("/init/initUsers")
    } catch (e) {
        return errObj
    }
}

/**
 * 获取当前绑定了几个管理员
 * @param roleId
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const checkBindSerNum = async (roleId) => {
    try {
        return await axios.post("/user/checkBindSerNum",qs.stringify({roleId}))
    } catch (e) {
        return errObj
    }
}

/**
 * 获取初始化状态
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const getInitState = async () => {
    try {
        return await axios.post("/init/getInitState")
    } catch (e) {
        return errObj
    }
}
/**
 * 初始化完成
 * @returns {Promise<{code: string, data: {}, message: string}|*>}
 */
export const initComplete = async () => {
    try {
        return await axios.post("/init/initComplete")
    } catch (e) {
        return errObj
    }
}



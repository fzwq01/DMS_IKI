const axios = window.axios;

const qs = require('qs')

let errObj = {message: "服务器错误", data: {}, code: '1'}


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



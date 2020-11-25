
import UKeyApi from './ukeyApi'
import {errorMsg} from './msg'

const error=(msg)=>{
    errorMsg(msg)
    return false
}

export default{
    /**
     * 获取容器列表
     */
    async  GetUserList () {
        let res = await UKeyApi.SOF_GetUserList();
        if ( res ) {
            return res;
        } else {
            //获取用户列表失败
            error('请插入正确的UKey！');
            return false;
        }
    },
    /**
     * 获取容器列表信息：应用名、容器名
     */
    async GetUserListAll () {
        let res = await UKeyApi.SOF_GetUserListAll();
        if ( res ) {
            return res;
        } else {
            //获取用户列表失败
            error('请插入正确的UKey！');
            return false;
        }
    },

    /**
     * 获取UKey状态
     * @constructor
     */
    async  GetDevState(){
        let res =  await  UKeyApi.SOF_GetDevState();
        if( res ){
            return res
        }else{
             error('请插入UKey');
            return false
        }
    },


    /**
     * 登录
     * @param containerName 容器名称
     * @param passWd 应用pin码
     * @constructor
     */
    async LoginUKey(containerName, passWd){
        let res =  await  UKeyApi.SOF_Login(containerName, passWd);
        if( res ){
            return res
        }else{
            return false
        }
    },

    /**
     * 退出登录
     * @param containerName 容器名称
     * @constructor
     */
    async LoginOut(containerName){
        let res = await UKeyApi.SOF_LoginOut(containerName);
        if( res ){
            return  res
        }else{
            return false
        }
    },

    /**
     * 导入加密类型的用户标识
     * @param containerName 容器名称
     * @param cert 用户标识
     * @constructor
     */
    async ImportEncCert( containerName, cert ){
        let res = await UKeyApi.SOF_ImportEncCert(containerName, cert);
        if(res){
            return res
        }else{
             error('导入加密类型的用户标识失败')
            return false
        }
    },


    /**
     * 导入签名类型的用户标识
     * @param containerName 容器名称
     * @param cert 用户标识
     * @constructor
     */
    async ImportSignCert ( containerName, cert ){
        let res = await UKeyApi.SOF_ImportSignCert( containerName, cert  )
        if(res){
            return res
        }else{
            error('导入签名类型的用户标识失败')
            return false
        }
    },

    /**
     * 导入双公钥用户标识
     * @param containerName 容器名称
     * @param cert 用户标识
     * @constructor
     */
    async ImportBothCert(containerName,cert){
        let res = await UKeyApi.SOF_ImportBothCert( containerName, cert  )
        if(res){
            return res
        }else{
           error('导入用户标识失败')
            return false
        }
    },

    /**
     * 导出签名类型的用户标识
     * @param containerName 容器名称
     * @constructor
     */
    async ExportSignCert(containerName){
        let res = await UKeyApi.SOF_ExportSignCert( containerName );
        if(res){
            return res
        }else{
            error('导出签名类型的用户标识失败')
            return false
        }
    },


    /**
     * 修改PIN
     * @param containerName 容器名称
     * @param oldPassWd 旧pin
     * @param newPassWd 新pin
     * @constructor
     */
    async ChangePassWd ( containerName, oldPassWd, newPassWd ){
        let res = await UKeyApi.SOF_ChangePassWd(containerName, oldPassWd, newPassWd);
        if(res){
            return res
        }else{
           error('PIN码修改失败')
            return false
        }
    },

    /**
     * 获取PIN重试次数
     * @param containerName 容器名称
     */
     async GetPinRetryCount (containerName) {
        let getRetryCount = await UKeyApi.SOF_GetPinRetryCount(containerName);
        if(getRetryCount > 0){
            error('PIN码输入错误，您还有'+ getRetryCount + '次机会');
            return false
        }else{
           error('UKey已被锁定，请联系管理员解锁！');
            return false
        }
     },

     /**
     * 重置用户PIN码
     * @param containerName 容器名称
     * @param szAdminPIN 管理员pin
     * @param szNewUserPIN 用户的新pin
     * @constructor
     */
     async ResetPassWd(containerName, szAdminPIN, szNewUserPIN ){
         let reset  = await UKeyApi.SOF_ResetPassWd(containerName, szAdminPIN, szNewUserPIN);
         if(reset){
             return reset
         }else{
              error('重置PIN码失败！');
             return false
         }
     },

    /**
     * 数字签名
     * @param containerName 容器名称
     * @param inData 签名明文
     * @param type 若type=base64表示inData是经过base64编码后的数据
     * @constructor
     */
    async SignData(containerName, inData, type ){
        let sign = await  UKeyApi.SOF_SignData(containerName, inData, type);
        if(sign) {
            return sign
        }else{
            error('消息签名失败！')
            return false
        }
    },

    /**
     * 数字验签
     * @param Base64EncodeCert 用户标识
     * @param inData 明文
     * @param signValue 签名值
     * @param type 若type=base64表示inData是经过base64编码后的数据
     * @constructor
     */
    async VerifySignedData(Base64EncodeCert, inData, signValue, type){
        let verify  = await UKeyApi.SOF_VerifySignedData(Base64EncodeCert, inData, signValue, type);
        if(verify){
            return verify
        }else{
            error('数字验签失败！')
            return false
        }
    },

    /**
     * 消息签名
     * @param containerName 容器名
     * @param inData 原文
     * @param type 若type=base64表示inData是经过base64编码后的数据
     * @constructor
     */
    async SignMessage( containerName, inData, type ){
        let sign = await UKeyApi.SOF_SignMessage(containerName, inData, type)
            if(sign){
                return sign
            }else{
                error('消息签名失败！')
                return false
            }
    },

    /**
     * 消息验签
     * @param messageData 消息签名的结果
     * @param inData 签名明文
     * @param type 若type=base64表示inData是经过base64编码
     * @constructor
     */
    async VerifySignedMessage(messageData, inData, type){
        let verify = await UKeyApi.SOF_VerifySignedMessage(messageData, inData, type)
            if(verify){
                return verify
            }else{
                error('消息验名失败！')
                return false
            }
    },

    /**
     * 生成保护公钥
     * @param appName 应用名
     * @param containerName 容器名
     * @param pin 用户pin
     * @constructor
     */
    async GeneratePKc (appName, containerName, pin){
        let generate = await UKeyApi.SOF_GeneratePKc(appName, containerName, pin)
        if(generate){
            return generate
        }else{
            error('生成保护公钥失败！')
            return false
        }
    },


    /**
     * 导入密钥对密文
     * @param containerName 容器名
     * @param ske 密钥密文，为EncryptedValue结构数据经Der编码后再经Base64编码的结果
     * @constructor
     */
    async ImportCipherSke ( containerName, ske){
        let skes = await UKeyApi.SOF_ImportCipherSke(containerName, ske)
        if(skes){
            return skes
        }else{
            error('导入密钥对密文失败！')
            return false
        }
    },

    /**
     * 导入私钥矩阵
     * @param appName 应用名
     * @param pbPubMatrix 私钥矩阵
     * @constructor
     */
    async ImportPriMatrix ( appName, pbPubMatrix){
        let ske = await UKeyApi.SOF_ImportPriMatrix(appName, pbPubMatrix)
        if(ske){
            return ske
        }else{
           error('导入私钥矩阵失败！')
            return false
        }
    },

    /**
     * 导出私钥矩阵
     * @param appName 应用名
     * @constructor
     */
    async ExportPriMatrix ( appName){
        let ske = await UKeyApi.SOF_ExportPriMatrix(appName)
        if(ske){
            return ske
        }else{
            error('导出私钥矩阵失败！')
            return false
        }
    },

    /**
     * 导入初始化矩阵
     * @param appName 应用名
     * @param matrix 矩阵
     * @param adminPin 管理员pin
     * @param userPin 用户pin
     * @constructor
     */
    async ImportInitMatrix ( appName){
        let matrix = await UKeyApi.SOF_ImportInitMatrix(appName)
        if(matrix){
            return matrix
        }else{
            error('导入初始化矩阵失败！')
            return false
        }
    },

    /**
     * 生成新的保护公钥
     * @param appName 应用名
     * @param pin Pin码
     * @constructor
     */
    async UpdatePKc ( appName){
        let pkc = await UKeyApi.SOF_updatePKc(appName)
        if(pkc){
            return pkc
        }else{
           error('生成新的保护公钥失败！')
            return false
        }
    },

    /**
     * 密钥对更新
     * @param appName 应用名
     * @param userPin 用户pin
     * @param cipherSke Ske密文（ EncryptedValue结构数据经Der编码后再经Base64编码的结果）
     * @param encCert 加密类型的用户标识
     * @param signCert 签名类型的用户标识
     * @constructor
     */
    async UpdateKey (  appName, userPin, cipherSke, encCert, signCert){
        let pkc = await UKeyApi.SOF_UpdateKey( appName, userPin, cipherSke, encCert, signCert)
        if(pkc){
            return pkc
        }else{
             error('密钥对更新失败！')
            return false
        }
    },

    /**
     * 设备重置
     * @param appName 应用名
     * @constructor
     */
    async DeviceReset ( appName){
        let pkc = await UKeyApi.SOF_DeviceReset(appName)
        if(pkc){
            return pkc
        }else{
            error('设备重置失败！')
            return false
        }
    },

    /**
     * 数字信封转换
     * @param appName 应用名
     * @param containerName 容器名
     * @param base64PubKey Base64编码的公钥
     * @constructor
     */

    async ExchangeDigitEnvelopeBaseOnECC(appName, containerName, base64PubKey){
        let exchange = await UKeyApi.SOF_ExchangeDigitEnvelopeBaseOnECC(appName, containerName, base64PubKey)
        if(exchange){
            return exchange
        }else{
            error('数字信封转换失败！')
            return false
        }
    },

    /**
     * 导入密钥分割数据
     * @param appName 应用名
     * @param segmentKey 被分割的密钥数据
     * @param containerName 容器名
     * @param userPin 用户pin
     * @constructor
     */

    async ImportSegMentKeyThreshold(appName, segmentKey, containerName, userPin){
        let importKey = await UKeyApi.SOF_ImportSegMentKeyThreshold(appName, segmentKey, containerName, userPin)
        console.log(importKey)
        if(importKey){
            return importKey
        }else{
            error('导入密钥分割数据失败！')
            return false
        }
    }
}




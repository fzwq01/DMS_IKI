let axios = window.axios ;
const Qs = require('qs') ;

let url = 'http://127.0.0.1:4433' ;

export default {
    /**
     * 获取容器列表
     */
    async SOF_GetUserList () {
        try {
            let res = await axios.post( url + "/SOF_GetUserList" ) ;
            res = res.data ? res.data : res ;
            if (res.result !== "NULL" ) {
                return res.result.split( "&&&" )[ 0 ].split( "||" )[ 1 ] ;
            } else {
                return false;
            }
        } catch( err ) {
            return false;
        }
    },

    /**
     * 判断容器列表是否存在
     */
    async SOF_GetUserListIsKeyExist () {
        try {
            let res = await axios.post( url + "/SOF_GetUserList?type=IsKeyExist" ) ;
            res = res.data ? res.data : res ;
            if (res.result !== "NULL" ) {
                return res.result.split( "&&&" )[ 0 ].split( "||" )[ 1 ] ;
            } else {
                return false;
            }
        } catch( err ) {
            return false;
        }
    },

    /**
     * 获取容器列表信息：应用名、容器名
     */
    async SOF_GetUserListAll () {
        try {
            let res = await axios.post( url + "/SOF_GetUserList" ) ;
            res = res.data ? res.data : res ;
            if (res.result !== "NULL" ) {
                return { appName: res.result.split( "&&&" )[ 0 ].split( "||" )[ 0 ], containerName: res.result.split( "&&&" )[ 0 ].split( "||" )[ 1 ] } ;
            } else {
                return false;
            }
        } catch( err ) {
            return false;
        }
    },

    /**
     * 获取UKey状态
     * @constructor
     */
    async SOF_GetDevState () {
        try {
            let res = await axios.post( url + "/SOF_GetDevState" ) ;
            res = res.data ? res.data : res ;
            return res.result === 'TRUE';
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 登录
     * @param containerName 容器名称
     * @param passWd 应用pin码
     * @constructor
     */
    async SOF_Login ( containerName, passWd ) {
        try {
            let res = await axios.post( url + "/SOF_Login",Qs.stringify({containerName,passWd})) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 退出登录
     * @param containerName 容器名称
     * @constructor
     */
    async SOF_LoginOut ( containerName ) {
        try {
            let res = await axios.post( url + "/SOF_LoginOut",Qs.stringify({containerName})) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 导入加密类型的用户标识
     * @param containerName 容器名称
     * @param cert 用户标识
     * @constructor
     */
    async SOF_ImportEncCert ( containerName, cert ) {
        try {
            let res = await axios.post( url + "/SOF_ImportEncCert", Qs.stringify( { containerName, cert } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },


    /**
     * 导入签名类型的用户标识
     * @param containerName 容器名称
     * @param cert 用户标识
     * @constructor
     */
    async SOF_ImportSignCert ( containerName, cert ) {
        try {
            let res = await axios.post( url + "/SOF_ImportSignCert", Qs.stringify( { containerName, cert } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 导入双公钥用户标识
     * @param containerName 容器名称
     * @param cert 用户标识
     * @constructor
     */
    async SOF_ImportBothCert ( containerName,cert ) {
        try {
            let res = await axios.post( url + "/SOF_ImportBothCert", Qs.stringify( { containerName, cert } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 导出签名类型的用户标识
     * @param containerName 容器名称
     * @constructor
     */
    async SOF_ExportSignCert ( containerName ) {
        try {
            let res = await axios.post( url + "/SOF_ExportSignCert",Qs.stringify({containerName}) ) ;
            res = res.data ? res.data : res ;
            if ( res.result !== "NULL" ) {
                return res.result ;
            } else {
                return false ;
            }
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 修改PIN
     * @param containerName 容器名称
     * @param oldPassWd 旧pin
     * @param newPassWd 新pin
     * @constructor
     */
    async SOF_ChangePassWd ( containerName, oldPassWd, newPassWd ) {
        try {
            let res = await axios.post( url + "/SOF_ChangePassWd",Qs.stringify({containerName,oldPassWd,newPassWd}) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 获取PIN重试次数
     * @param containerName 容器名称
     */
    async SOF_GetPinRetryCount ( containerName ) {
        try {
            let res = await axios.post( url + "/SOF_GetPinRetryCount",Qs.stringify({containerName} )) ;
            res = res.data ? res.data : res ;
            if ( res.result !== "FALSE" && res.result !== "NULL" ) {
                return res.result ;
            } else {
                return false ;
            }
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 重置用户PIN码
     * @param containerName 容器名称
     * @param szAdminPIN 管理员pin
     * @param szNewUserPIN 用户的新pin
     * @constructor
     */
    async SOF_ResetPassWd ( containerName, szAdminPIN, szNewUserPIN ) {
        try {
            let res = await axios.post( url + "/SOF_ResetPassWd",Qs.stringify({containerName,szAdminPIN,szNewUserPIN})) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 数字签名
     * @param containerName 容器名称
     * @param inData 签名明文
     * @param type 若type=base64表示inData是经过base64编码后的数据
     * @constructor
     */
    async SOF_SignData ( containerName, inData, type ) {
        try {
            let res = await axios.post( url + "/SOF_SignData", Qs.stringify( { containerName, inData, type } ) ) ;
            res = res.data ? res.data : res ;
            if (res.result !== "NULL" ) {
                return res.result ;
            } else {
                return false ;
            }
        } catch( err ) {
            return false ;
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
    async SOF_VerifySignedData ( Base64EncodeCert, inData, signValue, type ) {
        try {
            let res = await axios.post( url + "/SOF_VerifySignedData", Qs.stringify( { Base64EncodeCert, inData, signValue, type } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 消息签名
     * @param containerName 容器名
     * @param inData 原文
     * @param type 若type=base64表示inData是经过base64编码后的数据
     * @constructor
     */
    async SOF_SignMessage ( containerName, inData, type ) {
        try {
            let res = await axios.post( url + "/SOF_SignMessage", Qs.stringify( { containerName, inData, type } ) ) ;
            res = res.data ? res.data : res ;
            if ( res.result !== "NULL" ) {
                return res.result ;
            } else {
                return false ;
            }
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 消息验签
     * @param messageData 消息签名的结果
     * @param inData 签名明文
     * @param type 若type=base64表示inData是经过base64编码
     * @constructor
     */
    async SOF_VerifySignedMessage ( messageData, inData, type ) {
        try {
            let res = await axios.post( url + "/SOF_VerifySignedMessage", Qs.stringify( { messageData, inData, type } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 生成保护公钥
     * @param appName 应用名
     * @param containerName 容器名
     * @param pin 用户pin
     * @constructor
     */
    async SOF_GeneratePKc ( appName, containerName, pin ) {
        try {
            let res = await axios.post( url + "/SOF_GeneratePKc", Qs.stringify( { appName, containerName, pin } ) ) ;
            res = res.data ? res.data : res ;
            if (res.result !== "NULL" ) {
                return res.result ;
            } else if ( res.RetryCount ) {
                return res.RetryCount ;
            } else {
                return false ;
            }
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 导入密钥对密文
     * @param containerName 容器名
     * @param ske 密钥密文，为EncryptedValue结构数据经Der编码后再经Base64编码的结果
     * @constructor
     */
    async SOF_ImportCipherSke ( containerName, ske ) {
        try {
            let res = await axios.post( url + "/SOF_ImportCipherSke", Qs.stringify( { containerName, ske } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false;
        }
    },

    /**
     * 导入私钥矩阵
     * @param appName 应用名
     * @param pbPubMatrix 私钥矩阵
     * @constructor
     */
    async SOF_ImportPriMatrix ( appName, pbPubMatrix ) {
        try {
            let res = await axios.post( url + "/SOF_ImportPriMatrix", Qs.stringify( { appName, pbPubMatrix } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 导出私钥矩阵
     * @param appName 应用名
     * @constructor
     */
    async SOF_ExportPriMatrix ( appName ) {
        try {
            let res = await axios.post( url + "/SOF_ExportPriMatrix",Qs.stringify({appName}) ) ;
            res = res.data ? res.data : res ;
            if (res.result !== "NULL" ) {
                return res.result ;
            } else {
                return false ;
            }
        } catch( err ) {
            return false ;
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
    async SOF_ImportInitMatrix ( appName, matrix, adminPin, userPin ) {
        try {
            let res = await axios.post( url + "/SOF_ImportInitMatrix", Qs.stringify( { appName, matrix, adminPin, userPin } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 生成新的保护公钥
     * @param appName 应用名
     * @param pin Pin码
     * @constructor
     */
    async SOF_updatePKc ( appName, pin ) {
        try {
            let res = await axios.post( url + "/SOF_updatePKc",Qs.stringify( { appName, pin } ) ) ;
            res = res.data ? res.data : res ;
            if (res.result !== "NULL" ) {
                return res.result ;
            } else {
                return false ;
            }
        } catch( err ) {
            return false ;
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
    async SOF_UpdateKey ( appName, userPin, cipherSke, encCert, signCert ) {
        try {
            let res = await axios.post( url + "/SOF_UpdateKey?", Qs.stringify( { appName, userPin, cipherSke, encCert, signCert } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 设备重置
     * @param appName 应用名
     * @constructor
     */
    async SOF_DeviceReset ( appName ) {
        try {
            let res = await axios.post( url+"/SOF_DeviceReset",Qs.stringify( { appName } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },

    /**
     * 数字信封转换
     * @param appName 应用名
     * @param containerName 容器名
     * @param base64PubKey Base64编码的公钥
     * @constructor
     */
    async SOF_ExchangeDigitEnvelopeBaseOnECC ( appName, containerName, base64PubKey ) {
        try {
            let res = await axios.post( url + "/SOF_ExchangeDigitEnvelopeBaseOnECC?", Qs.stringify( { appName, containerName, base64PubKey } ) ) ;
            res = res.data ? res.data : res ;
            if ( res.result !== "FALSE" && res.result !== "NULL" ) {
                return res.result ;
            } else {
                return false ;
            }
        } catch( err ) {
            return false ;
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
    async SOF_ImportSegMentKeyThreshold ( appName, segmentKey, containerName, userPin ) {
        try {
            let res = await axios.post( url + "/SOF_ImportSegMentKeyThreshold?", Qs.stringify( { appName, segmentKey, containerName, userPin } ) ) ;
            res = res.data ? res.data : res ;
            return res.result === "TRUE";
        } catch( err ) {
            return false ;
        }
    },
}


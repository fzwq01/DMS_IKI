<template>
    <div id="container">
        <div id="content">
            <span class="tips" v-if="type == '0'?keyIndex <= 5:keyIndex <= 3">
                {{type == '0'?'*请依次插入5个管理员的UKey，用于保存密钥备份文件的保护密钥':'*请依次插入3个备份此密钥文件时所用到的UKey，用于获取密钥备份文件的保护密钥'}}
            </span>
            <!-- 完成密钥输入的列表 -->
            <div v-for="(item,index) in activeList" :key="index">
                <div :class="index%2 === 0?'activeOdd':'activeEven'">
                    <div class="icon">
                        <img src="../../../assets/greenUkey.png" alt="">
                        <span>UKey{{index+1}}</span>
                    </div>
                    <div>获取保护密钥成功</div>
                </div>
            </div>
            <!-- 表单 -->
            <div class="item" v-if="type == '0' ?keyIndex <= 5:keyIndex <= 3">
                <div>
                    <div class="UKeyState">
                        <div class="UKeyIcon">
                            <img src="../../../assets/UKeyOut.png" alt="" v-if="!USB">
                            <img src="../../../assets/UKeyIn.png" alt="" v-if="USB">
                        </div>
                        <div class="UKeyText" v-if="!USB">请插入第{{keyIndex | letterChange}}个管理员UKey</div>
                        <div class="UKeyText" v-if="USB">已插入第{{keyIndex | letterChange}}个管理员UKey</div>
                    </div>
                    <el-form :model="uKeyForm" :rules="rules" ref="uKeyForm" label-width="0px"
                             class="demo-ruleForm" v-if="USB">
                        <el-form-item prop="PIN">
                            <el-input type="password" v-model="uKeyForm.PIN" autocomplete="off"
                                      :placeholder="placeholder"></el-input>
                        </el-form-item>
                        <el-form-item class="btnContainer">
                            <button class="defaultBtn" @click.stop.prevent="$emit('cancel')">取消</button>
                            <button v-if="type == '0'" class="darkBlueBtn" @click.stop.prevent="submitBackup('uKeyForm')">确定</button>
                            <button v-if="type == '1'" class="darkBlueBtn" @click.stop.prevent="submitRecovery('uKeyForm')">确定</button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- 未输入密钥列表 -->
            <div v-for="(item2,index2) in unActiveList" :key="'list'+index2">
                <div :class="index2%2===0?'unActive2':'unActive3'">
                    <div class="icon">
                        <img src="../../../assets/garyUkey.png" alt="">
                        <span v-if="keyIndex === 1">UKey{{index2+2}}</span>
                        <span v-if="keyIndex === 2">UKey{{index2+3}}</span>
                        <span v-if="keyIndex === 3">UKey{{index2+4}}</span>
                        <span v-if="keyIndex === 4">UKey{{index2+5}}</span>
                    </div>
                    <div>保护密钥待保存</div>
                </div>
            </div>
        </div>
        <div class="btnContainerArea" v-if="type == '0'?keyIndex > 5:keyIndex > 3">
            <button class="cancelBtn" @click.stop.prevent="$emit('cancel')">取 消</button>
            <button class="lightBlueBtn" @click.stop.prevent="install">{{type == '0'?'备 份':'恢 复'}}</button>
        </div>
        <success-tips :text="type == '0'?'密钥备份成功，您可点击【下载备份】进行密钥备份文件下载':'密钥恢复成功'" ref="successDialog"></success-tips>
        <fail-tips text="获取保护密钥失败" ref="failDialog"></fail-tips>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import UKey from '../../../util/ukeyUtil'
import { errorMsg } from "../../../util/msg"
import successTips from "../../init/common/successTips";
import failTips from "../../init/common/failTips";
import { checkPin } from "../../../util/formValidate";
import { getSplitKey, backupSecretKey, recoverSecretKey, getAuthCode} from '../../../api/manage/keyManagement' //分割密钥 备份 恢复  获取随机数 检查管理员UKey 开始密钥恢复
import { checkManagerUkey, recoverSecretKeyBegin } from '../../../api/manage/keyManagement'  //检查管理员UKey 开始密钥恢复
export default {
    name:'ukeyList',
    props:['type','unActiveList'], // 0 备份 /  1 恢复
    components: {successTips, failTips},
    computed: {
        ...mapState(['USB'])
    },
    data() {
        return {
            keyIndex:1,
            placeholder:'请输入UKey1 PIN',
            uKeyForm: {
                PIN: ""
            },
            rules: {
                PIN: {validator: checkPin, trigger: 'blur'}
            },
            activeList:[], //用于循环激活的UKey样式

            publicKey:'', //公钥
            secretKeyList:[]  //存放输入的pin码
        }
    },
    methods: {
        submitRecovery(formName) {
            console.log('在恢复')
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    let pin = this.uKeyForm.PIN
                    //获取UKey的容器
                    let container = await UKey.GetUserList()
                    if (!container) {
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    //获取appName
                    let list = await UKey.GetUserListAll()
                    if (!list) {
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    //登录UKey
                    let loginResult = await UKey.LoginUKey(container, pin)
                    if (!loginResult) {
                        //pin码错误  获取剩余输入次数
                        await UKey.GetPinRetryCount(container)
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    //todo  密钥恢复流程
                    /**
                     * 1.获取服务端随机数
                     * 2.对随机数消息签名
                     * 3.服务端验签
                     * 4.判断是否第一个管理员  第一个管理员调用开始密钥恢复接口  获取公钥
                     * 5.ukey导出存储的密钥分割数据（UKEY的数字信封转换）  存储在变量中
                     * 6.调用密钥恢复接口  将三个导出的密钥数据发送服务端进行恢复
                     */

                    //获取随机数
                    let random = await getAuthCode()
                    if (random.code != '0') {
                        errorMsg(random.message)
                        return
                    }

                    //对服务端随机数进行签名
                    let signValue = await UKey.SignMessage(container, random.data)
                    if (!signValue) {
                        return
                    }
                    
                    //验证管理员UKey
                    let checkResult = await checkManagerUkey( signValue )
                    if (checkResult.code != '0') {
                        errorMsg(checkResult.message)
                        return
                    }
                    
                    //第一个管理员调用开始密钥恢复接口，获取公钥
                    if( this.keyIndex === 1 ){
                        let recoverResult = await recoverSecretKeyBegin()
                        if (recoverResult.code != '0') {
                            errorMsg(recoverResult.message)
                            return
                        }
                        this.publicKey = recoverResult.data 
                    }

                    //导出密钥分割数据
                    let changeResult = await UKey.ExchangeDigitEnvelopeBaseOnECC( list.appName, container, this.publicKey )
                    if (!changeResult) {
                        return
                    }
                    console.log(changeResult)
                    this.secretKeyList.push( changeResult.data )

                    //TODO 获取服务端随机数
                    //TODO  对服务端随机数进行消息签名
                    //TODO  将签名值发送服务端进行验签 检查管理员UKey
                    //判断是否是第一个管理员
                    //如果是第一个管理员 调用密钥备份
                    //如果不是第一个管理员 

                    // //导出签名证书
                    // let exportResult = await UKey.ExportSignCert( container )
                    // if (!exportResult) {
                    //     this.$refs['uKeyForm'].resetFields();
                    //     return
                    // }

                    // //获取分割密钥
                    // let key = await getSplitKey( exportResult )
                    // if (key.code != '0') {
                    //     errorMsg(key.message)
                    //     this.$refs['uKeyForm'].resetFields();
                    //     return
                    // }

                    // //导入密钥分割数据
                    // let importResult = await UKey.ImportSegMentKeyThreshold( list.appName, key.data, container, pin )
                    // if( !importResult ){
                    //     this.$refs['uKeyForm'].resetFields();
                    //     return
                    // }

                    this.keyIndex += 1;
                    this.activeList.push(1);
                    this.unActiveList.pop();
                    this.placeholder = `请输入UKey${this.keyIndex} PIN`;
                    this.$refs[formName].resetFields();
                } else {
                    return false;
                }
            })
        },

        submitBackup(formName) {
            console.log('在备份')
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    let pin = this.uKeyForm.PIN
                    //获取UKey的容器
                    let container = await UKey.GetUserList()
                    if (!container) {
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    //获取appName
                    let list = await UKey.GetUserListAll()
                    if (!list) {
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    //登录UKey
                    let loginResult = await UKey.LoginUKey(container, pin)
                    if (!loginResult) {
                        //pin码错误  获取剩余输入次数
                        await UKey.GetPinRetryCount(container)
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    //获取随机数
                    let random = await getAuthCode()
                    if (random.code != '0') {
                        errorMsg(random.message)
                        return
                    }

                    //对服务端随机数进行签名
                    let signValue = await UKey.SignMessage(container, random.data)
                    if (!signValue) {
                        return
                    }
                    
                    //验证管理员UKey
                    let checkResult = await checkManagerUkey( signValue )
                    if (checkResult.code != '0') {
                        errorMsg(checkResult.message)
                        return
                    }

                    if( this.keyIndex === 1 ){
                        let backupResult = await backupSecretKey()
                        if (backupResult.code != '0') {
                            errorMsg(backupResult.message)
                        }
                        return 
                    }

                    //TODO 获取服务端随机数
                    //TODO  对服务端随机数进行消息签名
                    //TODO  将签名值发送服务端进行验签 检查管理员UKey
                    //判断是否是第一个管理员
                    //如果是第一个管理员 调用密钥备份
                    //如果不是第一个管理员 

                    //导出签名证书
                    let exportResult = await UKey.ExportSignCert( container )
                    if (!exportResult) {
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    //获取分割密钥
                    let key = await getSplitKey( exportResult )
                    if (key.code != '0') {
                        errorMsg(key.message)
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    //导入密钥分割数据
                    let importResult = await UKey.ImportSegMentKeyThreshold( list.appName, key.data, container, pin )
                    if( !importResult ){
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }

                    this.keyIndex += 1;
                    this.activeList.push(1);
                    this.unActiveList.pop();
                    this.placeholder = `请输入UKey${this.keyIndex} PIN`;
                    this.$refs[formName].resetFields();
                } else {
                    return false;
                }
            })
        },
        async install() {
            if(this.type == '0'){
                let result = await backupSecretKey()
                if (result.code != '0') {
                    errorMsg(result.message)
                    return
                }
            }else{
                let recoverResult = await recoverSecretKey( this.secretKeyList[0],this.secretKeyList[1],this.secretKeyList[2] )
                if (recoverResult.code != '0') {
                    errorMsg(recoverResult.message)
                    return
                }
            }
            this.$refs.successDialog.successShow = true;
            const timer = setTimeout( () => {
                this.$emit('nextStep')
            } , 2000 )
            this.$once('hook:beforeDestroy',() => clearTimeout(timer));
        }
    }
}
</script>

<style scoped lang="scss">
    #container {
        width:540px;
        background-color: #e9eef2;
        padding:40px 30px;
        box-sizing: border-box;
        border-radius: 4px;
        text-align: left;

        #content {
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .tips {
                color: red;
                font-size: 12px;
                padding-bottom: 10px;
            }

            .item {
                width: 460px;
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: center;
                background-color: #fff; 
            }
        }

        .btnContainer {
            button {
                margin-right: 20px;
                margin-left: 20px;
            }
        }

    }
    .btnContainerArea{
        margin-top: 40px;
        text-align: center;
        .cancelBtn{
            margin-right:25px
        }
    }

    .UKeyState {
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: #0089ff;
        height: 65px;
        line-height: 65px;
        vertical-align: middle;
        align-items: center;
        align-content: center;
        img {
            vertical-align: middle;
        }

        .UKeyIcon {
            margin-right: 20px;
        }
    }
    .unActive2{
        @include rowColor (460px, 50px, #e9eef2, #aaaaaa)
    }
    .unActive3{
        @include rowColor (460px, 50px, #fff, #aaaaaa)
    }
    //偶数行
    .activeEven{  
        @include rowColor (460px, 50px, #e9eef2, #2ad0c5)
    }
    .activeOdd{  
        @include rowColor (460px, 50px, #fff, #2ad0c5)
    }

    .icon{
        img {
            margin-right:15px;
        }
    }
</style>
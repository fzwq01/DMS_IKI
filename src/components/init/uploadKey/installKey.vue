<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/installKey.png" alt="">
        <div id="container">
            <div id="content">
                <span class="tips" v-if="keyIndex <= 3">*请依次插入3个备份此密钥文件时所用到的UKey，用于获取密钥备份文件的保护密钥</span>
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
                <div class="item" v-if="keyIndex <= 3">
                    <div class="formArea">
                        <div class="UKeyState">
                            <div class="UKeyIcon">
                                <img src="../../../assets/UKeyOut.png" alt="" v-if="!USB">
                                <img src="../../../assets/UKeyIn.png" alt="" v-if="USB">
                            </div>
                            <div class="UKeyText" v-if="!USB">请插入第{{keyIndex | letterChange}}个管理员UKey</div>
                            <div class="UKeyText" v-if="USB">已插入第{{keyIndex | letterChange}}个管理员UKey</div>
                        </div>
                        <el-form :model="uKeyForm" :rules="rules" ref="uKeyForm" label-width="0px" class="demo-ruleForm" v-if="USB">
                            <el-form-item prop="PIN">
                                <el-input type="password" v-model="uKeyForm.PIN" autocomplete="off" :placeholder="placeholder"></el-input>
                            </el-form-item>
                            <el-form-item class="btnContainer">
                                <button class="cancelBtn" @click.stop.prevent="cancel">取消</button>
                                <button class="darkBlueBtn" @click.stop.prevent="submitForm('uKeyForm')">确定</button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <!-- 未输入密钥的列表 -->
                <div v-for="(item2,index2) in unActiveList" :key="'list'+index2">
                    <div :class="index2%2===0?'unActive2':'unActive3'">
                        <div class="icon">
                            <img src="../../../assets/garyUkey.png" alt="">
                            <span v-if="keyIndex === 1">UKey{{index2+2}}</span>
                            <span v-if="keyIndex === 2">UKey{{index2+3}}</span>
                        </div>
                        <div>保护密钥待获取</div>
                    </div>
                </div>

            </div>
            <div class="btnContainerArea" v-if="keyIndex > 3">
                <button class="defaultBtn cancelBtn" @click.stop.prevent="cancel">取 消</button>
                <button class="lightBlueBtn" @click.stop.prevent="install">安 装</button>
            </div>
            <success-tips text="备份密钥安装成功!" ref="successDialog"></success-tips>
            <fail-tips text="备份密钥安装失败!" ref="failDialog"></fail-tips>
        </div>
    </StepContent>
</template>

<script>
import {mapState} from 'vuex'
import UKey from '../../../util/ukeyUtil'
import { errorMsg } from "../../../util/msg"
import StepContent from '../common/StepContent'
import successTips from "../common/successTips"
import failTips from "../common/failTips"
import {checkPin} from "../../../util/formValidate"
import { recoverSecretKey } from '../../../api/init/initApi' // 恢复
import { recoverSecretKeyBegin } from '../../../api/manage/keyManagement' //开始密钥恢复 
export default {
    name: "installKey",
    components: {StepContent,successTips, failTips},
    computed: {
        ...mapState(['USB'])
    },
    async created(){
        let recoverResult = await recoverSecretKeyBegin()
        if (recoverResult.code != '0') {
            errorMsg(recoverResult.message)
            return
        }
        this.publicKey = recoverResult.data 
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
            unActiveList:[1,1], //未激活的列表

            publicKey:'', //公钥
            secretKeyList:[]
        }
    },
    methods: {
        submitForm(formName) {
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

                    //导出密钥分割数据
                    let changeResult = await UKey.ExchangeDigitEnvelopeBaseOnECC( list.appName, container, this.publicKey )
                    if (!changeResult) {
                        this.$refs['uKeyForm'].resetFields();
                        return
                    }
                    this.secretKeyList.push( changeResult )

                    //退出登录
                    await UKey.LoginOut( container )

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
        cancel(){
            this.$router.push({name:'uploadKey'})
            // this.keyIndex = 1
            // this.activeList = []
            // this.unActiveList = [1,1]
            // this.secretKeyList = []
            // this.placeholder = '请输入UKey1 PIN'
            // this.$refs['uKeyForm'].resetFields()
        },
        async install() { 
            let recoverResult = await recoverSecretKey( this.secretKeyList[0],this.secretKeyList[1],this.secretKeyList[2] )
            if (recoverResult.code != '0') {
                errorMsg(recoverResult.message)
                setTimeout( () => {
                    this.$router.push({name:'initType'})
                },2000)
                return
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
        #content {
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top:35px;

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
                background-color: #ebeff5; 
                .formArea{
                    width:300px;
                }
            }
        }
    }
    .cancelBtn{
        margin-right:20px
    }
    .btnContainerArea{
        margin-top: 60px;
        text-align: center;
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
        @include rowColor (460px, 50px, #fff, #aaaaaa)
    }
    .unActive3{
        @include rowColor (460px, 50px, #f9f9f9, #aaaaaa)
    }
    //偶数行
    .activeEven{  
        @include rowColor (460px, 50px, #fff, #2ad0c5)
    }
    .activeOdd{  
        @include rowColor (460px, 50px, #f9f9f9, #2ad0c5)
    }

    .icon{
        img {
            margin-right:15px;
        }
    }
</style>

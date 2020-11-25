<template>
    <div class="content">
        <div class="UKeyState" v-if="!USB">
            <div class="UKeyIcon">
                <img src="../../../assets/UKeyOut.png" alt="">
            </div>
            <div class="UKeyText">请插入密码主管UKey</div>
        </div>
        <div class="UKeyState" v-if="USB">
            <div class="UKeyIcon"><img src="../../../assets/UKeyIn.png" alt=""></div>
            <div class="UKeyText">UKey已插入</div>
        </div>
        <el-form :model="uKeyForm" :rules="rules" ref="uKeyForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="PIN码:" prop="PIN">
                <el-input type="password" v-model="uKeyForm.PIN" autocomplete="off"
                          placeholder="请输入密码主管UKey PIN码"></el-input>
            </el-form-item>
            <div class="btnContainer">
                <button class="lightBlueBtn" @click.stop.prevent="submitForm('uKeyForm')">提交</button>
            </div>
        </el-form>

        <success-tips text="密码主管授权成功!" ref="successDialog"></success-tips>
    </div>
</template>

<script>
    import {getAuthCode, getVersion, authSuperRole} from "../../../api/init/initApi";
    import {mapState} from 'vuex'
    import {checkPin} from '../../../util/formValidate'
    import UKey from '../../../util/ukeyUtil'
    import {errorMsg} from "../../../util/msg";
    import successTips from "../common/successTips";
    import failTips from "../common/failTips";
    export default {
        name: "masterAuth",
        components: {successTips},
        data() {
            return {
                uKeyForm: {
                    PIN: ''
                },
                rules: {
                    PIN: {validator: checkPin, trigger: 'blur'}
                }
            }
        },
        async created() {
            let res = await getVersion()
            console.log(res)
        },
        computed: {
            ...mapState({USB: "USB"})
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.USB) {
                            let pin = this.uKeyForm.PIN
                            //获取UKey的容器
                            let container = await UKey.GetUserList()
                            if (!container) {
                                return
                            }

                            //登录UKey
                            let loginResult = await UKey.LoginUKey(container, pin)

                            if (!loginResult) {
                                //pin码错误  获取剩余输入次数
                                let account = await UKey.GetPinRetryCount(container)
                                return
                            }

                            //获取服务端随机数
                            let ser_rnd = await getAuthCode()
                            if (ser_rnd.code != '0') {
                                this.$message.error(ser_rnd.message)
                                return
                            }

                            //对服务端随机数进行签名
                            let signature = await UKey.SignMessage(container, ser_rnd.data, null)
                            if (!signature) {
                                return
                            }

                            //将签名值发送服务端进行验签
                            let verifyResult = await authSuperRole(signature)
                            if (verifyResult.code != '0') {
                                errorMsg(verifyResult.message)
                                return
                            }

                            //判断UKey的pin码是不是默认的  默认的就跳转到修改界面  不是就进行下一步
                            if (this.uKeyForm.PIN === '12345678') {
                                this.$router.push({name: 'modifyPin'})
                            } else {
                                this.$refs.successDialog.successShow=true
                                setTimeout(()=>{
                                    this.$refs.successDialog.successShow=false;
                                    this.$router.push({name: 'initType'})
                                },1500)

                            }
                        } else {
                            this.$message.error('请插入密码主管UKey')
                        }
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .content {
        width: 600px;
        margin: 103px auto 0 auto;
    }

    .UKeyState {
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: #0089ff;
        height: 80px;
        line-height: 80px;
        vertical-align: middle;
        margin-bottom: 12px;

        img {
            vertical-align: middle;
        }

        .UKeyIcon {
            margin-right: 15px;
        }
    }

    .btnContainer {
        margin-top: 60px;
    }
</style>

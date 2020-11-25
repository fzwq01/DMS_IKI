<template>
    <div id="formContainer">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px" class="demo-ruleForm">
            <el-form-item label="请输入PIN码:" prop="pin">
                <el-input type="password" placeholder="请输入UKey PIN码" v-model="ruleForm.pin"></el-input>
            </el-form-item>
            <div class="bottomBtn">
                <button class="loginBtn" @click.stop.prevent="submitForm('ruleForm')"><span
                        style="margin-right:25px">登</span><span>录</span></button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {checkPin} from '../../util/formValidate'
    import UKeyUtil from "../../util/ukeyUtil";
    import {errorMsg} from "../../util/msg";
    import {getAuthCode, login} from "../../api/login/login";

    export default {
        name: 'loginForm',
        data() {
            return {
                ruleForm: {
                    pin: '', //pin码
                },
                rules: {
                    pin: [{validator: checkPin, trigger: 'blur'}]
                }
            }
        },
        methods: {
            //登录
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let pin = this.ruleForm.pin
                        //获取UKey的容器
                        let container = await UKeyUtil.GetUserList()
                        if (!container) {
                            return
                        }
                        //登录UKey
                        let loginResult = await UKeyUtil.LoginUKey(container, pin)

                        if (!loginResult) {
                            //pin码错误  获取剩余输入次数
                            await UKeyUtil.GetPinRetryCount(container)
                            return
                        }

                        //获取随机数
                        let random = await getAuthCode();
                        if (random.code != '0') {
                            errorMsg(random.message)
                            return
                        }

                        //对服务端随机数进行签名
                        let signValue = await UKeyUtil.SignMessage(container, random.data)
                        if (!signValue) {
                            return
                        }

                        //签名值发送到服务端进行验签
                        let result = await login(signValue)

                        if (result.code != '0') {
                            errorMsg(result.message)
                            return
                        }

                        this.$router.push({name: 'index'})
                    } else {
                        return false;
                    }
                })
            },
        }
    }
</script>

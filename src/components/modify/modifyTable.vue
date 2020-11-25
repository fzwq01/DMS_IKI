<template>
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-width="108px" class="demo-ruleForm">
       <div class="top-content" >
            <div v-if="!USB">
                <img src="../../assets/UKeyOut.png"/>
                <span class="ukey_text">请插入UKey</span>
            </div>
            <div v-else>
                <img src="../../assets/UKeyIn.png" alt="">
                <span class="ukey_text">UKey已插入</span>
            </div>
        </div>
         <el-form-item label="旧PIN码：" prop="oldPin">
            <el-input v-model="ruleForm.oldPin" type="password" auto-complete="new password" ></el-input>
        </el-form-item>
        <el-form-item label="新PIN码：" prop="newPin">
            <el-input v-model="ruleForm.newPin" type="password" auto-complete="new password" ></el-input>
        </el-form-item>
        <el-form-item label="确认新PIN码：" prop="reNewPin">
            <el-input v-model="ruleForm.reNewPin"  type="password" auto-complete="new password"></el-input>
        </el-form-item>

        <div style="text-align: right;">
            <button type="button" @click.prevent="submitForm('ruleForm')" class="authBtn" style="padding:0;margin-right:30px;">确认修改</button>
            <button class="defaultBtn" @click.prevent="$router.go(-1)" style="margin-right:30px;">取消</button>
        </div>
   </el-form>                               
</template>

<script>
import {mapState} from 'vuex'
import {
    validatorNewpin,
    validatorOldpin
} from '../../util/formValidate'
import {successMsg,errorMsg} from '../../util/msg'

import UKey from '../../util/ukeyUtil'
export default {
    name:'modifyTable',
    data(){
        let that = this;
        let validatorReNewPin = function (rule, value, callback) {
            if (value === "") {
                callback(new Error('请再次输入新PIN码'));
            } else {
                if (value != "") {
                    if (
                        value.length < 8 ||
                        value.length > 16 ||
                        !/^[0-9a-zA-Z]{8,16}$/.test(value)
                    ) {
                        callback(new Error('请输入正确的PIN码'));
                    } else if (value != that.ruleForm.newPin) {
                        callback(new Error('两次输入新PIN码不一致'));
                    } else {
                        callback();
                    }
                }
            }
        };
        return{
            ruleForm:{
                oldPin:'',
                newPin:'',
                reNewPin:''
            },
            rules: {
                oldPin: [{
                    validator: validatorOldpin,
                    trigger: "blur"
                }],
                newPin: [{
                    validator: validatorNewpin,
                    trigger: "blur"
                }],
                reNewPin: [{
                    validator: validatorReNewPin,
                    trigger: "blur"
                }]
            }
        }
    },
    methods:{
        // 确认修改
        submitForm(formName){
             this.$refs[formName].validate( async (valid) => {
                    if (valid) {
                        if (this.USB) {
                            //获取UKey的容器
                            let container = await UKey.GetUserList()
                            if (!container) {
                                this.$refs['ruleForm'].resetFields();
                                return
                            }
                            // 登录
                            let loginResult = await UKey.LoginUKey(container, this.ruleForm.oldPin)
                            if (!loginResult) {
                                //pin码错误  获取剩余输入次数
                                await UKey.GetPinRetryCount(container)
                                this.$refs['ruleForm'].resetFields();
                                return
                            }

                            // 修改PIN码
                            let changePin = await UKey.ChangePassWd(container,this.ruleForm.oldPin,this.ruleForm.newPin)
                             console.log(changePin)
                             if (changePin) {
                                successMsg('UKey PIN码修改成功，请妥善保管新的PIN码！');
                                this.$refs['ruleForm'].resetFields();
                                return
                            }
                            else{
                                console.log('错误啦')
                                errorMsg('修改PIN码失败，请稍后再试！')
                                return 
                            }
                            this.$refs['ruleForm'].resetFields();
                        }else{
                            return
                        }
                    }
             })
        },
    },
    computed: {
        ...mapState(['USB'])
    },
}
</script>

<style lang="scss" scoped>
.demo-ruleForm{
    width: 400px;
    height: 300px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left:-200px;
    top: 50%;
    margin-top: -150px;
    .top-content{
        margin-bottom: 30px;
        padding-left: 90px;
    }
    img{vertical-align: middle;padding-right: 10px;}
    .ukey_text{
        font-size: 14px;
        color:#0089ff;
    }
}
</style>
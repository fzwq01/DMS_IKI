<template>
    <div class="modifyContainer">
        <div class="UKeyState" v-if="!USB">
            <div class="UKeyIcon">
                <img src="../../../assets/bigUkey.png" alt="">
            </div>
            <div class="UKeyText">请插入密码主管UKey</div>
        </div>
        <el-form :model="uKeyForm" :rules="rules" ref="uKeyForm" label-width="100px" class="uKey-ruleForm" v-if="USB">
            <div class="slogan">修改密码主管PIN码</div>
            <el-form-item label="新PIN码:" prop="PIN">
                <el-input type="password" v-model="uKeyForm.PIN" autocomplete="off" placeholder="请输入新PIN码"></el-input>
            </el-form-item>
            <el-form-item label="确认新PIN码:" prop="rePIN">
                <el-input type="password" v-model="uKeyForm.rePIN" autocomplete="off"
                          placeholder="请再次输入新PIN码"></el-input>
            </el-form-item>
            <div class="btnContainer">
                <button class="lightBlueBtn" @click.stop.prevent="submitForm('uKeyForm')">确 定</button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import UKey from "../../../util/ukeyUtil";
    import {successMsg} from "../../../util/msg";

    export default {
        name: "changePin",
        computed: {
            ...mapState({USB: "USB"})
        },
        data() {
            let checkPin = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新PIN码'))
                } else if (value.length < 8 || value.length > 16 || !/^[0-9a-zA-Z]{8,16}$/.test(value)) {
                    callback(new Error('PIN码为8-16位数字和字母的任意组合！'))
                } else {
                    if (this.uKeyForm.PIN !== '') {
                        this.$refs.uKeyForm.validateField('rePIN');
                    }
                    callback()
                }
            }
            let checkRePin = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请再次输入新PIN码'))
                } else if (value.length < 8 || value.length > 16 || !/^[0-9a-zA-Z]{8,16}$/.test(value)) {
                    callback(new Error('确认PIN码为8-16位数字和字母的任意组合！'))
                } else if (value !== this.uKeyForm.PIN) {
                    callback(new Error('两次PIN码输入不一致，请重新输入'))
                } else {
                    callback()
                }
            }
            return {
                uKeyForm: {
                    PIN: '',
                    rePIN: ''
                },
                rules: {
                    PIN: {validator: checkPin, trigger: 'blur'},
                    rePIN: {validator: checkRePin, trigger: 'blur'}
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        //获取容器
                        let container = await UKey.GetUserList()
                        if (!container) {
                            return
                        }
                       //修改PIN码
                        let modifyResult = await UKey.ChangePassWd(container,12345678,this.uKeyForm.rePIN)
                        if (!modifyResult) {
                            return;
                        }
                        successMsg("修改成功")
                        await this.$router.push({name: 'masterAuth'})
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .modifyContainer {
        padding-top: 35px;
        width: 500px;
        margin: 0 auto;
    }

    .slogan {
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        color: #212844;
        margin-bottom: 40px;
    }

    .uKey-ruleForm {
        margin-top: 40px;
    }

    .UKeyState {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #0089ff;
        margin-top: 100px;
        vertical-align: middle;

        img {
            vertical-align: middle;
        }

        .UKeyText {
            padding-top: 30px;
        }
    }

    .btnContainer {
        margin-top: 60px
    }

</style>

<template>
    <div id="managerContainer">
        <div v-if="num == 1 ">
            <div class="content">
                <img src="../../../assets/bigUkey.png" alt="">
                <div class="text">需要设置5个管理员，请提前准备5个UKey!</div>
            </div>
            <div class="btnContainer">
                <button class="lightBlueBtn" @click.stop.prevent="confirm">确 定</button>
            </div>
        </div>
        <div v-else>
            <div class="UKeyState">
                <div class="UKeyIcon">
                    <img src="../../../assets/UKeyOut.png" alt="" v-if="!USB">
                    <img src="../../../assets/UKeyIn.png" alt="" v-if="USB">
                </div>
                <div class="UKeyText" v-if="!USB">请插入设置为 {{managerIndex}} 号管理员的UKey</div>
                <div class="UKeyText" v-if="USB">已插入第 {{managerIndex}} 号管理员UKey</div>
            </div>
            <div class="formContainer">
                <el-form :model="uKeyForm" :rules="rules" ref="uKeyForm" label-width="100px" class="demo-ruleForm"
                         v-if="USB">
                    <el-form-item label="PIN码:" prop="PIN">
                        <el-input type="password" v-model="uKeyForm.PIN" autocomplete="off"
                                  placeholder="请输入UKey PIN码"></el-input>
                    </el-form-item>
                    <div class="btnContainer">
                        <button class="lightBlueBtn add" @click.stop.prevent="submitForm('uKeyForm')">添加管理员</button>
                    </div>
                </el-form>
            </div>
        </div>
        <success-tips text="管理员设置成功!" ref="successDialog"></success-tips>
        <fail-tips text="管理员设置失败!" ref="failDialog"></fail-tips>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {checkPin} from "../../../util/formValidate";
    import successTips from "../common/successTips";
    import failTips from "../common/failTips";
    import UKeyUtil from "../../../util/ukeyUtil";
    import {errorMsg} from "../../../util/msg";
    import {addRole, checkBindSerNum, initUsersComplete} from "../../../api/init/initApi";

    export default {
        name: 'localManagerConfigComponent',
        computed: {
            ...mapState(['USB'])
        },
        components: {successTips, failTips},
        data() {
            return {
                num: 1,
                managerIndex: 1,
                uKeyForm: {
                    PIN: ''
                },
                rules: {
                    PIN: {validator: checkPin, trigger: 'blur'}
                }
            }
        },
        async created() {

            //检测当前绑定的管理员数量  超过5个 证明已经完成管理员绑定了 未超过5个 显示剩余待绑定的界面

            let bindSerNum = await checkBindSerNum(1);
            if (bindSerNum.code != '0' && bindSerNum.data === -1) {
                this.$route.name === 'administratorSettings' ? this.$router.push({name: "networkConfiguration"}) : this.$router.push({name: "localNetworkConfig"})
                return
            }
            if (bindSerNum.code != '0' && bindSerNum.data !== -1) {
                this.$message.error(bindSerNum.message)
                return
            }
            this.managerIndex = bindSerNum.data
        },
        methods: {
            submitForm(uKeyForm) {
                this.$refs[uKeyForm].validate(async (valid) => {
                    if (valid) {
                        let pin = this.uKeyForm.PIN
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


                        //导出UKey中的用户标识
                        let userCert = await UKeyUtil.ExportSignCert(container)
                        if (!userCert) {
                            return
                        }

                        //将UKey中导出的标识发送到服务端进行绑定
                        let bindResult = await addRole(userCert, 1)
                        if (bindResult.code != '0') {
                            errorMsg(bindResult.message)
                            return
                        }


                        this.$refs.successDialog.successShow = true;

                        setTimeout(async () => {
                            this.$refs.successDialog.successShow = false;
                            this.$refs[uKeyForm].resetFields();
                            if (this.managerIndex === 5) {
                                await initUsersComplete();
                                this.$route.name === 'administratorSettings' ? this.$router.push({name: "networkConfiguration"}) : this.$router.push({name: "localNetworkConfig"})
                            } else {
                                this.managerIndex += 1;
                            }

                        }, 3000)

                    } else {

                        return false;
                    }
                });
            },
            confirm() {
                this.num = 2
            }
        }
    }
</script>

<style scoped lang="scss">
    #managerContainer {
        padding-top: 50px;

        .content {
            font-size: 14px;
            color: #0089ff;

            .text {
                height: 55px;
                line-height: 55px;
            }
        }

        .formContainer {
            width: 600px;
            margin: 0 auto;
        }

        .btnContainer {
            button {
                margin-right: 20px;
                margin-left: 20px;
            }
        }

        .UKeyState {
            display: flex;
            flex-direction: row;
            justify-content: center;
            color: #0089ff;
            height: 36px;
            line-height: 36px;
            vertical-align: middle;
            margin-bottom: 35px;

            img {
                vertical-align: middle;
            }

            .UKeyIcon {
                margin-right: 20px;
            }
        }

        .btnContainer {
            margin-top: 35px;
        }

        .add {
            margin-top: 25px
        }
    }
</style>

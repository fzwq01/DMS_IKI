<template>
    <div id="dialogContaniner">
        <el-dialog title="授权" :visible.sync="dialogVisible" width="520px" :before-close="handleClose" top="30vh" :modal-append-to-body="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="55px" class="demo-ruleForm">
                <div class="pictArea">
                    <img v-if="USB" src = '../../../assets/UKeyIn.png'/>
                    <img v-else src = '../../../assets/UKeyOut.png'/>
                    <span>{{ USB ? '已插入UKey' : '请插入其他管理员UKey授权' }}</span>
                </div>
                <el-form-item label="PIN码:" prop="pin">
                    <el-input  type="password" placeholder="请输入UKey PIN码" v-model="ruleForm.pin"></el-input>
                </el-form-item>
                <div class="bottomBtn">
                    <button class="cancelBtn" @click.stop.prevent="cancel">取 消</button>
                    <button class="trueBtn" @click.stop.prevent="submitForm('ruleForm')">授 权</button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex"
import UKey from '../../../util/ukeyUtil'
import { errorMsg } from "../../../util/msg"
import { checkPin } from "../../../util/formValidate"
import { getAuthCode, authSuperRole, ukeyAuth } from '../../../api/manage/authorityManagement'

export default {
    name:'authDialog',
    data(){
        return{
            dialogVisible: false,
            ruleForm: {
                pin: '', //pin码
            },
            rules: {
                pin: [ { validator: checkPin, trigger: 'blur' } ]
            }
        }
    },
    methods:{
        handleClose( done ) {
            this.$refs['ruleForm'].resetFields();
            done();
        },
        //登录
        submitForm( formName ) {
            this.$refs[ formName ].validate( async ( valid ) => {
                if (valid) {
                    if( this.USB ) {
                        let pin = this.ruleForm.pin
                        //获取UKey的容器
                        let container = await UKey.GetUserList()
                        if (!container) {
                            this.cancel()
                            return
                        }

                        //登录UKey
                        let loginResult = await UKey.LoginUKey(container, pin)

                        if (!loginResult) {
                            //pin码错误  获取剩余输入次数
                            await UKey.GetPinRetryCount(container)
                            this.cancel()
                            return
                        }

                        //获取服务端随机数
                        let ser_rnd = await getAuthCode()
                        if (ser_rnd.code != '0') {
                            this.$message.error(ser_rnd.message)
                            this.cancel()
                            return
                        }

                        //对服务端随机数进行签名
                        let signature = await UKey.SignMessage(container, ser_rnd.data, null)
                        if (!signature) {
                            this.cancel()
                            return
                        }

                        //管理员授权
                        let authResult = await ukeyAuth(signature)
                        if (authResult.code != '0') {
                            this.cancel()
                            errorMsg(authResult.message)
                            return
                        }

                        this.$message.success('授权成功')
                        this.$emit('update')
                        this.cancel()

                    } else {
                        this.$message.error( '请插入UKey' );
                    }
                } else {
                    return false;
                }
            })
        },
        //取消
        cancel(){
            this.dialogVisible = false;
            this.$refs['ruleForm'].resetFields();
        },
    },
    computed:{
        ...mapState( [ "USB" ] )
    }
}
</script>

<style scoped lang="scss">
    #dialogContaniner{
        .pictArea{
            margin-top:15px;
            margin-bottom: 35px;
            img{
                vertical-align:middle;
                padding-right:15px;
            }

            span{
                font-size: 14px;
                color:rgb(27, 140, 242)
            }
        }
        .bottomBtn{
            text-align: right;
            margin-top:60px;

            .cancelBtn{
                margin-right:20px
            }
        }
    }
</style>
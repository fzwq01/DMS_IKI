<template>
    <div id="dialogContaniner">
        <el-dialog :title="type == '0'?'添加管理员':'添加审计员'" :visible.sync="dialogVisible" width="520px" :before-close="handleClose" top="30vh" :modal-append-to-body="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="55px" class="demo-ruleForm">
                <div class="pictArea">
                    <img v-if="USB" src = '../../../assets/UKeyIn.png'/>
                    <img v-else src = '../../../assets/UKeyOut.png'/>
                    <span>{{ USB ? '已插入UKey' : '请插入其他管理员UKey授权' }}</span>
                </div>
                <el-form-item label="PIN码:" prop="pin">
                    <el-input  type="password" :placeholder="type == '0'?'请输入需要添加为管理员UKey PIN码':'请输入需要添加为审计员UKey PIN码'" v-model="ruleForm.pin"></el-input>
                </el-form-item>
                <div class="bottomBtn">
                    <button class="cancelBtn" @click.stop.prevent="cancel">取 消</button>
                    <button class="trueBtn" @click.stop.prevent="submitForm('ruleForm')">确 定</button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {mapState} from "vuex"
import UKey from '../../../util/ukeyUtil'
import { errorMsg } from "../../../util/msg"
import {checkPin} from "../../../util/formValidate"
import { getAuthCode, addRole } from '../../../api/manage/authorityManagement' //添加管理员
export default {
    name:'addAdministrator',
    props:['type'], // 0 管理员 、 1 审计员
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
        //确定
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

                        //导出签名证书
                        let exportResult = await UKey.ExportSignCert( container )
                        
                        //添加管理员
                        let addResult = await addRole( exportResult, this.type =='0'?1:2 )
                        if (addResult.code != '0') {
                            errorMsg(addResult.message)
                            this.cancel()
                            return
                        }
                        this.$emit('updateList')
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
        }
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
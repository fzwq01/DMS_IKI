<template>
    <div id="dialogContaniner">
        <el-dialog title="修改私钥访问控制码" :visible.sync="dialogVisible" width="520px" :before-close="handleClose" top="30vh" :modal-append-to-body="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="旧访问码：" prop="oldCode">
                    <el-input  type="password" placeholder="请输入旧私钥访问控制码" v-model="ruleForm.oldCode"></el-input>
                </el-form-item>
                <el-form-item label="新访问码：" prop="newCold">
                    <el-input  type="password" placeholder="请输入由8-16位数字和字母组合的新私钥访问控制码" v-model="ruleForm.newCold"></el-input>
                </el-form-item>
                <el-form-item label="确定新访问码：" prop="trueCode">
                    <el-input  type="password" placeholder="请再次输入新私钥访问控制码" v-model="ruleForm.trueCode"></el-input>
                </el-form-item>
                <div class="bottomBtn">
                    <button class="cancelBtn" @click.stop.prevent="cancel">取 消</button>
                    <button class="trueBtn" @click.stop.prevent="submitForm('ruleForm')">修 改</button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import { checkOldCode, checkNewCode } from "../../../util/formValidate"
import { updateKeyPwd } from '../../../api/manage/keyManagement' //修改用户权限码
export default {
    name:'codeDialog',
    props:['id'],
    data(){
        let checkTrueCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新私钥访问控制码'));
            } else if ( value && this.ruleForm.newCold != this.ruleForm.trueCode ){
                callback(new Error('两次输入的访问码不一致'));
            } else {
                callback();
            }
        }
        return{
            dialogVisible: false,
            ruleForm: {
                oldCode: '', 
                newCold:'', 
                trueCode:''
            },
            rules: {
                oldCode: [ { validator: checkOldCode, trigger: 'blur' } ],
                newCold: [ { validator: checkNewCode, trigger: 'blur' } ],
                trueCode: [ { validator: checkTrueCode, trigger: 'blur' } ]
            }
        }
    },
    methods:{
        handleClose( done ) {
            this.$refs['ruleForm'].resetFields();
            done();
        },
        //修改
        submitForm( formName ) {
            this.$refs[ formName ].validate( async ( valid ) => {
                if (valid) {
                    let modifyResult = await updateKeyPwd( this.id, this.ruleForm.newCold, this.ruleForm.oldCode )
                    if( modifyResult.code !== 0){
                        this.cancel()
                        errorMsg(modifyResult.message)
                        return
                    }
                    this.$emit('modifySuccess')
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
}
</script>

<style scoped lang="scss">
    #dialogContaniner{
        .el-form{
            padding-top:15px;
        }
        .bottomBtn{
            text-align: right;
            margin-top:45px;

            .cancelBtn{
                margin-right:20px
            }
        }
    }
</style>
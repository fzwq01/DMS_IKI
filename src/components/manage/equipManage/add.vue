<template>
    <div id="dialogContaniner">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="520px" :before-close="handleClose" top="30vh" :modal-append-to-body="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="需要授权的IP地址" prop="ip">
                    <el-input  type="text" placeholder="请输入需要授权的IP地址:" v-model="ruleForm.ip"></el-input>
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
import {checkIP} from '../../../util/formValidate'
export default {
    name:'addUserDialog',
    props:['title','type'],
    data(){
        return{
            dialogVisible: false,
            ruleForm: {
                ip:'', //ip
            },
            rules: {
                ip: [ { required: true,validator:checkIP, trigger: 'blur' } ]
            }
        }
    },
    methods:{
        handleClose(done) {
            if(this.ruleForm.ip){
                this.$refs['ruleForm'].resetFields();
            }
            done();
        },
        //确认添加
        submitForm( formName ) {
            this.$refs[ formName ].validate( async ( valid ) => {
                if (valid) {
                    this.dialogVisible = false;
                    this.$emit('addSumbit',this.ruleForm.ip)
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
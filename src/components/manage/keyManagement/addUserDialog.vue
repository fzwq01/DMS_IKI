<template>
    <div id="dialogContaniner">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="520px" :before-close="handleClose" top="30vh" :modal-append-to-body="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
                <el-form-item label="密钥索引：" prop="index" v-if="type != 1">
                    <el-input  type="text" placeholder="请输入密钥索引" v-model="ruleForm.index"></el-input>
                </el-form-item>
                <div class="redTip" v-if="type != 1">*密钥索引范围（1~40），用逗号分割，例如：1,5,10-20</div>

                <el-form-item label="用户名：" prop="name" v-else>
                    <el-input  type="text" placeholder="请输入用户名" v-model="ruleForm.name"></el-input>
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
import { errorMsg } from "../../../util/msg"
import {checkPin} from "../../../util/formValidate"
import { updateUserName, addSecretKey } from '../../../api/manage/keyManagement' //更新用户名 添加对称密钥
export default {
    name:'addUserDialog',
    props:['title','type','id'],
    data(){
        return{
            dialogVisible: false,
            ruleForm: {
                index: '', //密钥索引
                name:'', //用户名
            },
            rules: {
                index: [ { required: true, message: '请输入密钥索引', trigger: 'blur' } ],
                name: [ { required: true, message: '请输入用户名', trigger: 'blur' } ]
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
                    if( this.type === 1 ){
                        //更新用户名
                        let updateResult = await updateUserName( this.id, this.ruleForm.name )
                        this.cancel()
                        if( updateResult.code !== 0){
                            errorMsg(updateResult.message)
                            return
                        }
                        this.$message.success('修改成功！')
                        this.$emit('update')
                    }else{
                        //添加对称密钥
                        let addResult = await addSecretKey( this.ruleForm.index, this.type == '2'?1:0 )
                        this.cancel()
                        if( addResult.code !== 0){
                            errorMsg(addResult.message)
                            return
                        }
                        this.$message.success('添加成功！')
                        this.$emit('update')
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

        .redTip{
            color:red;
            font-size: 12px;
            padding-left:20px
        }
    }
</style>
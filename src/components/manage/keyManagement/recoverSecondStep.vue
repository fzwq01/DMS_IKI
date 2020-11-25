<template>
    <div id="areaContainer">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="148px" class="demo-ruleForm">
            <el-form-item label="密钥备份文件:" prop="keyFile">
                <div class="option">
                    <button class="importBtn" @click.stop.prevent="importFile">选择文件</button>
                    <span class="fileName">{{keyFileName}}</span>
                    <input type="file" id="file" @change="selectFile">
                </div>
            </el-form-item>
            <el-form-item>
                <button class="cancelBtn" @click.stop.prevent="cancel">取 消</button>
                <button class="lightBlueBtn" @click.stop.prevent="upload('ruleForm')">上 传</button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import {uploadRecoverFile} from '../../../api/manage/keyManagement' //上传恢复文件
export default {
    name:'recoverSecondStep',
    data() {
        var validateFile = (rule, value, callback) => {
            if (this.ruleForm.keyFile === '') {
                callback(new Error('请上传密钥备份文件'));
            } else {
                callback();
            }
        };
        return {
            keyFileName: "未选择任何文件",
            ruleForm:{
                keyFile: '',
            },
            rules: {
                keyFile: [ { validator: validateFile, trigger: 'blur' } ]
            }
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        upload( formName ) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    let uploadResult = await uploadRecoverFile( this.ruleForm.keyFile )
                    if (uploadResult.code != '0') {
                        this.$refs['ruleForm'].resetFields()
                        this.keyFileName = '未选择任何文件'
                        errorMsg(uploadResult.message)
                        return
                    }
                    this.$message.success('上传成功！')
                    this.$emit('nextStep')
                } else {
                    return false;
                }
            });
        },
        importFile() {
            document.getElementById('file').click();
        },
        selectFile(e) {
            if (e.target.files[0]) {
                this.ruleForm.keyFile = e.target.files[0]
                //对文件名进行剪切 防止文件名过长对页面布局造成影响
                if (e.target.files[0].name.length > 10) {
                    let suffix = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf(".")-1);
                    this.keyFileName = e.target.files[0].name.substring(0, 6) + "..." + suffix;
                } else {
                    this.keyFileName = e.target.files[0].name;
                }
            } else {
                this.ruleForm.keyFile = '';
                this.keyFileName = '未选择任何文件';
            }
            this.$refs.ruleForm.clearValidate();
        }
    }
}
</script>

<style scoped lang="scss">
    #areaContainer{
        width:540px;
        height:250px;
        background-color: #e9eef2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 4px;

        .el-form{
            margin-top:73px;
        }

        .cancelBtn{
            margin-right:25px
        }

        .option{
            position: relative;
            text-align: left;

            .fileName{
                color:#2ecdaf;
                font-size: 14px;
                margin-left:15px;
            }

            #file{
                width:250px;
                opacity: 0;
                position: absolute;
                left:10px;
                top:50%;
                transform: translate(0,-50%);
            }
        }
    }
</style>
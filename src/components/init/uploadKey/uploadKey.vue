<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/uploadKey.png" alt="">
        <div class="container">
            <div class="content">
                <div class="item">
                    <div class="label">密钥备份文件：</div>
                    <div class="option">
                        <button class="lightGreenBtn" @click.stop.prevent="importFile">导入文件</button>
                        <span class="fileName">{{keyFileName}}</span>
                        <input type="file" id="file" @change="selectFile">
                    </div>
                </div>
            </div>
            <div class="btnContainer">
                <button class="defaultBtn cancelBtn" @click.stop.prevent="cancel">取消</button>
                <button class="lightBlueBtn" @click.stop.prevent="upload">上传</button>
            </div>
            <success-tips text="密钥备份文件上传成功" ref="successDialog"></success-tips>
            <fail-tips text="密钥备份文件生产失败" ref="failDialog"></fail-tips>
        </div>
    </StepContent>
</template>

<script>
import StepContent from '../common/StepContent'
import successTips from "../common/successTips"
import failTips from "../common/failTips"
import {uploadRecoverFile} from '../../../api/init/initApi' //导入密钥备份文件
 
    export default {
        name: "uploadKey",
        components: { StepContent, successTips, failTips },
        data() {
            return {
                keyFile: '',
                keyFileName: "未选择任何文件"
            }
        },
        methods: {
            cancel() {
                this.$router.push({name:'initType'})
            },
            async upload() {
                if (!this.keyFile) {
                    this.$message.error('请选择要上传的密钥备份文件');
                    return;
                }

                let uploadResult = await uploadRecoverFile( this.keyFile )
                if( uploadResult.code !== 0 ){
                    this.$refs.failDialog.failShow = true
                    setTimeout(() => {
                        this.$refs.failDialog.failShow = false
                    }, 2000)
                    return 
                }

                this.$refs.successDialog.successShow = true
                setTimeout(() => {
                    this.$refs.successDialog.successShow = false
                    this.$router.push({name: "installKey"})
                }, 2000)

            },
            //选择文件
            importFile() {
                document.getElementById('file').click();
            },
            selectFile(e) {
                console.log(e.target.files[0])
                if (e.target.files[0]) {
                    this.keyFile = e.target.files[0];
                    //对文件名进行剪切 防止文件名过长对页面布局造成影响
                    if (e.target.files[0].name.length > 20) {
                        let suffix = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf(".") - 1);
                        this.keyFileName = e.target.files[0].name.substring(0, 10) + "..." + suffix;
                    } else {
                        this.keyFileName = e.target.files[0].name;
                    }
                } else {
                    this.keyFile = '';
                    this.keyFileName = '未选择任何文件';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {

        .content {
            padding: 83px 0 35px 0;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .item {
                width: 500px;
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                height: 60px;
                line-height: 60px;

                .label {
                    flex-basis: 140px;
                    color: #0089ff;
                    text-align: right;
                    padding-right: 20px;
                }

                .option {
                    flex-grow: 1;
                    text-align: left;
                    position: relative;
                    overflow: hidden;

                    .fileName {
                        font-size: 12px;
                        color: #1dd8d1;
                        padding-left: 20px;

                    }

                    .exportBtn {
                        vertical-align: middle;
                        position: relative;
                        padding-left: 20px;

                        img {
                            position: absolute;
                            left: 14px;
                        }
                    }

                    #file {
                        position: absolute;
                        left: 0;
                        top: 12px;
                        height: 34px;
                        width: 120px;
                        display: none;
                    }
                }
            }
        }

        .btnContainer {
            .cancelBtn{
                margin-left: 56px;
                margin-right:25px
            }
        }
    }
</style>

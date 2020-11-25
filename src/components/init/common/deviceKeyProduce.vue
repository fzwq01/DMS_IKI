<template>
    <div id="productContainer">
        <div class="content">
            <div class="item">
                <div class="label">导出密钥申请文件：</div>
                <div class="option">
                    <button class="lightGreenBtn exportBtn" @click="exportFile">
                        <img src="../../../assets/init/exportFile.png" alt="">导出文件
                    </button>
                </div>
            </div>
            <div class="item">
                <div class="label">导入密钥文件：</div>
                <div class="option">
                    <button class="importBtn" @click.stop.prevent="importFile">导入文件</button>
                    <span class="fileName">{{keyFileName}}</span>
                    <input type="file" id="file" @change="selectFile">
                </div>
            </div>
        </div>
        <div class="btnContainer">
            <div class="btnArea">
                <button class="lightBlueBtn" @click.stop.prevent="produce">生 产</button>
            </div>
        </div>
        <success-tips text="设备密钥生产成功" ref="successDialog"></success-tips>
        <fail-tips text="设备密钥生产失败" ref="failDialog"></fail-tips>
    </div>
</template>

<script>
    import successTips from "./successTips";
    import failTips from "./failTips";
    import {downloadPkxFile, importDeviceP12} from "../../../api/init/initApi";

    export default {
        name: 'deviceKeyProduceComponent',
        components: {successTips, failTips},
        data() {
            return {
                keyFile: '',
                keyFileName: "未选择任何文件"
            }
        },
        methods: {
            cancel() {
                this.$router.push({name: 'initType'});
            },
            exportFile() {
                downloadPkxFile()
            },
            async produce() {
                if (!this.keyFile) {
                    this.$message.error('请选择要导入的密钥文件')
                    return
                }
                let importResult = await importDeviceP12(this.keyFile)
                if (importResult.code != '0') {
                    this.$refs.failDialog.failShow = true
                    setTimeout(() => {
                        this.$refs.failDialog.failShow = false;
                    }, 1200)
                    return
                }
                this.$refs.successDialog.successShow = true;
                setTimeout(() => {
                    this.$refs.successDialog.successShow = false;
                    this.$route.name === 'deviceKeyProduction' ? this.$router.push({name: "administratorSettings"}) : this.$router.push({name: "localManagerConfig"});
                }, 1200)
            },
            importFile() {
                document.getElementById('file').click();
            },
            selectFile(e) {
                if (e.target.files[0]) {
                    this.keyFile = e.target.files[0]
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
    #productContainer {
        .content {
            padding: 65px 0 30px 60px;
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

                &:nth-of-type(2) {
                    margin-top: 20px
                }
            }
        }

        .btnContainer {
            .btnArea {
                width: 115px;
                margin: 0 auto;
                text-align: left;
            }
        }
    }
</style>

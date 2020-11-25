<template>
    <div class="container">
        <div class="slogan">初次使用密码机需进行初始化，产生种子矩阵和管理员</div>
        <div class="radioContainer">
            <el-radio v-model="type" label="1" class="radio">本地生产</el-radio>
            <el-radio v-model="type" label="2" class="radio">上传密钥备份文件</el-radio>
        </div>
        <div class="btnContainer">
            <button class="lightBlueBtn" @click.stop.prevent="init">初始化</button>
        </div>
    </div>
</template>

<script>
    import {initReady,initCryptoCard} from "../../../api/init/initApi";

    export default {
        name: "initType",
        data() {
            return {
                type: '1'
            }
        },
        methods: {
            async init() {
                let InitReady = await initReady()
                if (InitReady.code != '0') {
                    this.$message.error(InitReady.message)
                    return
                }
                let InitCryptoCard=await initCryptoCard()
                if (InitCryptoCard.code != '0') {
                    this.$message.error(InitCryptoCard.message)
                    return
                }
                if (this.type === '1') {
                    this.$router.push({name: "matrixProduce"})
                } else if (this.type === '2') {
                    this.$router.push({name: "uploadKey"})
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        padding-top: 105px;
    }

    .slogan {
        font-size: 20px;
        color: #212844;
        height: 60px;
        line-height: 60px;
    }

    .radioContainer {
        height: 105px;
        line-height: 105px;
    }

    .radio {
        font-size: 14px;
        margin-right: 50px;
        margin-left: 50px;
    }

    .btnContainer {
        margin-top: 15px
    }
</style>

<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/productMatrix.png" alt="">
        <div class="container">
            <div class="content">
                <img src="../../../assets/init/matrixFile.png" alt="">
                <div class="text">种子矩阵文件</div>
            </div>
            <div class="btnContainer">
                <button class="defaultBtn" @click.stop.prevent="cancel">取消</button>
                <button class="lightBlueBtn" @click.stop.prevent="produce">生产</button>
            </div>
            <success-tips text="种子矩阵生产成功" ref="successDialog"></success-tips>
            <fail-tips text="种子矩阵生产失败" ref="failDialog"></fail-tips>
        </div>
    </StepContent>
</template>

<script>
    import successTips from "../common/successTips";
    import failTips from "../common/failTips";
    import StepContent from '../common/StepContent'
    import {initProduce} from "../../../api/init/initApi";

    export default {
        name: "matrixProduce",
        components: {successTips, failTips, StepContent},
        methods: {
            cancel() {
                this.$router.push({name: 'initType'})
            },
            async produce() {
                let productResult = await initProduce()
                if (productResult.code != '0') {
                    this.$refs.failDialog.failShow = true;
                    setTimeout(() => {
                        this.$refs.failDialog.failShow = false;
                    }, 1500)
                    return
                }
                this.$refs.successDialog.successShow = true;
                setTimeout(() => {
                    this.$refs.successDialog.successShow = false;
                    this.$router.push({name: 'deviceKeyProduce'})
                }, 1500)
            }
        }
    }
</script>

<style scoped lang="scss">
    .content {
        padding: 55px 0 40px 0;
        font-size: 14px;
        color: #0089ff;

        .text {
            height: 40px;
            line-height: 40px;
        }
    }

    .btnContainer {
        margin-top: 10px;

        .defaultBtn {
            margin-right: 25px
        }
    }
</style>

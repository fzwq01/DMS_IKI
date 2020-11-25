<template>
    <div id="prepareContainer">
        <div class="content">
            <img src="../../../assets/bigUkey.png" alt="">
            <div class="text">需要设置5个管理员，请提前准备5个UKey</div>
        </div>
        <div class="btnContainer">
            <button class="lightBlueBtn" @click="confirm">确定</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'uKeyPrepareComponent',
    methods: {
        confirm(){
            this.$route.name === 'administratorSettings'?this.$router.push({name:"administratorSettings"}):this.$router.push({name:"localManagerConfig"});
        }
    }
}
</script>

<style scoped lang="scss">
    #prepareContainer{
        .content {
            padding: 60px 0 40px 0;
            font-size: 14px;
            color: #0089ff;

            .text {
                height: 40px;
                line-height: 40px;
            }
        }

        .btnContainer {
            button {
                margin-right: 20px;
                margin-left: 20px;
            }
        }
    }
</style>
<template>
    <div id="stateDialog">
        <el-dialog :visible.sync="failShow" width="520px" :show-close="false" top="30vh">
            <img src="../../../assets/fail.png" alt="">
            <div class="tips">{{text}}</div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "failTips",
    props: ['text'],
    data() {
        return {
            failShow: false
        }
    }
}
</script>

<style scoped lang="scss">
    .tips{
        padding-top: 20px;
        color: #ff5428;
        padding-bottom: 30px;
    }
</style>

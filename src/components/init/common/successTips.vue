<template>
    <div id="stateDialog">
        <el-dialog :visible.sync="successShow" width="520px" :show-close="false" top="30vh" :modal-append-to-body="false">
            <img src="../../../assets/success.png" alt="">
            <div class="tips">{{text}}</div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "successTips",
    props: ['text'],
    data() {
        return {
            successShow: false
        }
    }
}
</script>

<style scoped lang="scss">
    .tips{
        padding-top: 20px;
        color: #1dd8d1;
        padding-bottom: 30px;
    }
</style>

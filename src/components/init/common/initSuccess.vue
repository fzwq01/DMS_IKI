<template>
    <div class="container">
        <div class="img-container">
            <img src="../../../assets/success.png" alt="">
        </div>
        <div class="text">
            <p>初始化成功，需重启设备后初始化才能生效</p>
            <p>设备重启后可通过管理员UKey重新登录密码机</p>
        </div>
        <div class="btnContainer">
            <button class="lightBlueBtn" @click.stop.prevent="toLogin">立即重启</button>
        </div>
        <fail-tips text="初始化重启失败!" ref="failDialog"></fail-tips>
    </div>
</template>

<script>
    import {initComplete} from "../../../api/init/initApi";
    import failTips from "./failTips";

    export default {
        name: "initSuccess",
        components: {failTips},
        methods:{
            async toLogin(){
                let initResult=await initComplete();
                if(initResult.code!='0'){
                    this.$refs.failDialog.failShow=true
                    setTimeout(()=>{
                        this.$refs.failDialog.failShow=false;
                    },1200)
                    return
                }
                this.$router.push({name:'login'})
            }
        }
    }
</script>

<style scoped lang="scss">
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 476px;
    }
    .text{
        padding: 20px 0;
        color: #2ecdaf;
        font-size: 14px;
    }
    .btnContainer{
        padding-top: 20px;
    }
</style>

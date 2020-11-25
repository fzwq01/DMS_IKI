<template>
    <div class="area">
        <div><img src="../../../assets/bigUkey.png"/></div>
        <span>进行密钥恢复前请准备好任意3个备份时所使用的管理员UKey!</span>
        <button class="lightBlueBtn" @click.stop.prevent="startBackup">开始恢复</button>
        <deleteDialog title="密钥恢复" text='密钥恢复过程中会破坏密码设备内当前的密钥数据，请谨慎操作!' @submit="submit" ref="dialog"/>
    </div>
</template>

<script>
import deleteDialog from '../../../components/common/deleteDialog'
export default {
    name:'recoverFirstStep',
    components:{ deleteDialog },
    methods:{
        startBackup(){
            this.$refs.dialog.dialogVisible = true;
            this.$refs.dialog.content = '继 续';
            // const timer = setTimeout( () => {
            //     this.$emit('nextStep')
            // } , 1500 )
            // this.$once('hook:beforeDestroy',() => clearTimeout(timer));
        },
        //继续
        submit(){
            this.$emit('nextStep')
        }
    }
}
</script>

<style scoped lang="scss">
    .area{
        width:540px;
        height:355px;
        background-color: #e9eef2;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:60px 0;
        box-sizing: border-box;
        border-radius: 4px;

        span{
            color:#0089ff;
            font-size: 15px;
            margin-top:15px;
            margin-bottom: 50px;
        }
    }
</style>
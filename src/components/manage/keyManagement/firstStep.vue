<template>
    <div class="area">
        <div><img src="../../../assets/bigUkey.png"/></div>
        <span>进行密钥备份前请准备好5个管理员UKey!</span>
        <button class="lightBlueBtn" @click.stop.prevent="startBackup">开始备份</button>
    </div>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import { backupSecretKey } from '../../../api/manage/keyManagement' //密钥备份
export default {
    name:'firstStep',
    methods:{
        //开始备份
        async startBackup(){
            let backupResult = await backupSecretKey()
            if (backupResult.code != '0') {
                errorMsg(backupResult.message)
                return 
            }
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
<template>
    <div class="area">
        <div><img src="../../../assets/bigUkey.png"/></div>
        <span>进行密钥备份前请准备好5个管理员UKey</span>
        <div>
            <button class="lightGreenBtn" @click.stop.prevent="downLoadBackup">下载备份</button>
            <button class="lightBlueBtn" @click.stop.prevent="startBackup">开始备份</button>
        </div>
    </div>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import { downLoadBackupSecretKey, backupSecretKey } from '../../../api/manage/keyManagement' //下载备份文件 密钥备份
export default { 
    name:'thirdStep',
    methods:{
        //开始备份
        async startBackup(){
            let backupResult = await backupSecretKey()
            if (backupResult.code != '0') {
                errorMsg(backupResult.message)
                return 
            }
            this.$emit('nextStep')
        },
        //下载备份
        downLoadBackup(){
            downLoadBackupSecretKey()
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

        .lightGreenBtn{
            margin-right:45px
        }
    }
</style>
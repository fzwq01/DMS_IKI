
<template>
<detail title="设备管理" title2="设备启停">
    <div class="equipSelf" slot='table' style="min-width:1200px">
        <div class="center-img">
            <div class="imgs" @click="clickReStart(1)" style="margin-right:130px">
                <img src="../../../assets/manage/self.png" alt="">
                <img src="../../../assets/manage/startAgain.png" :class="[rotate ? 'searching' : '']" id="search" class="search">
                <span class="search-text">重启</span>
            </div>
            <div class="imgs" @click="clickShutDown(2)">
                <img src="../../../assets/manage/shut.png" alt="">
                <img src="../../../assets/manage/shutdown.png" :class="[scale ? 'scaling' : '']" id="search" class="search search2">
                <span class="search-text">关机</span>
            </div>
        </div>
        <re-shut-down ref="shutReset" :title="title" :text="text" @submit="submit"></re-shut-down>
    </div>
</detail>
</template>

<script>
import detail from '../../../components/common/contents'
import reShutDown from '../../../components/common/deleteDialog'
import{
    reboot,
    shutdown
} from '../../../api/manage/equipManage'

export default {
    name:'deviceStartEnd',
    data(){
        return{
            rotate:false,
            scale:false,
            title:'',
            text:'',
            data:''
        }
    },
    components:{
        detail,
        reShutDown
    },
    methods:{
        // 重启
        clickReStart(data){
            this.data = data;
            this.rotate = !this.rotate;
            this.title = '重启';
            this.text=' 您正在进行IKI服务器密码机重启操作，密码机进入重启状态后，将会进行系统重新启动，导致短时间的业务断开，请确认是否重启？'
            setTimeout(() => {
               this.$refs.shutReset.dialogVisible = true;
            },500)
        },
        // 关机
        clickShutDown(data){
            this.data = data;
            this.scale = !this.scale;
            this.title = '关机';
            this.text = '您正在进行IKI服务器密码机关机操作，密码机执行关机操作命令后，将会导致系统业务断开，请确认是否关机？'
            setTimeout(() => {
               this.$refs.shutReset.dialogVisible = true;
            },500)
        },
        submit(){
            console.log(this.data)
            if(this.data == 1){
                reboot()
            }else if(this.data == 2){
                shutdown()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.equipSelf {
    .center-img {
        width: 690px;
        height: 350px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        .imgs{
            display: inline-block;
            cursor: pointer;
        }
    }
}

.search-text{
    left: 116px !important;
}
.search{
    top: 114px !important;
    left: 102px !important;
}
.search2{
    top: 120px !important;
    left: 110px !important;
}
.scaling{
    animation: scale linear 0.5s;
}
@keyframes scale {
     0% { transform: scale(1);}
     50% { transform: scale(0.8);}
     100% { transform: scale(1);}
}
.searching{
    animation: search linear 1s infinite;
}
@keyframes search {
     0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
}
</style>

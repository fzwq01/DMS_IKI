<template>
  <detail :title="title" :title2="title2">
        <div class="basicInfo" slot='table'>
            <div class="basic-img">
                <div class="img">
                    <img src="../../../assets/manage/proImg.png" alt="">
                </div>
            </div>
            <div class="info-detail">
                <div><span class="equip-title">生产厂商：</span>{{data.factory}}</div>
                <div><span class="equip-title">设备类型：</span>{{data.type}}</div>
                <div><span class="equip-title">设备型号：</span>{{data.mode}}</div>
                <div><span class="equip-title">设备序列号：</span>{{data.sequence}}</div>
                <div><span class="equip-title">设备支持算法：</span>{{data.algorighm}}</div>
            </div>
        </div>
  </detail>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import detail from '../../../components/common/contents'
import {deviceInformation} from '../../../api/manage/equipManage'
export default {
    name:'basicInfo',
    data(){
        return{
            title:'设备管理',
            title2:'设备基本信息',
            data:{
                factory:'',//生产厂商
                type:'',//设备类型
                mode:'',//设备型号
                sequence:'',//设备序列号
                algorighm:'',//设备支持算法
            },
        }
    },
    created(){
        this.deviceInformation()
    },
    methods:{
        async deviceInformation(){
            let deviceInfo = await deviceInformation();
            if(deviceInfo.code != 0){
                errorMsg(deviceInfo.message)
                    return
            }else{
                this.data = deviceInfo.data
            }
        },
    },
    components:{
        detail
    }
}
</script>

<style lang="scss" scoped>
// 设备管理 基本信息
.basicInfo{
    display: flex;
    flex-direction: row;
    border-radius: 6px;
    .basic-img{
        flex-basis: 316px;
        box-sizing: border-box;
        padding:40px 30px;
        background:#E9EEF2;
        .img{
            background:#fff;
            width: 290px;
            height: 220px;
            line-height: 220px;
            border-radius: 8px;
            text-align: center;
            img{
                vertical-align: middle;
            }
        }
    }
    .info-detail{
        background:#E9EEF2;
        font-size: 16px;
        padding:40px 10px;
        text-align: left;
        div{
            line-height: 46px;
        }
    }
}
</style>

<template>
    <detail :title='title' :title2='title2'>
        <div slot='table'>
            <div class="content-policy content-policy2" >
                <div class="top">
                    <span style="color:rgb(122, 140, 155);">归档策略：</span>
                    <el-radio-group v-model="policyChoose" :disabled="disabledSave">
                        <el-radio label="不归档"></el-radio>
                        <el-radio label="自动归"></el-radio>
                    </el-radio-group>
                </div>
                <div class="top-input" v-if="chooseChange == '1'">
                    <span style="color:rgb(122, 140, 155);padding-left:50px;">策略：</span>
                    <el-radio style="margin-right:0px;"></el-radio>
                    每隔 
                    <el-input v-model="day" :disabled="disabledSave"></el-input> 天，在
                    <el-select v-model="clock" placeholder="0" :disabled="disabledSave">
                        <el-option :label="item"  v-for="item in number" :key="item" :value="item"></el-option>
                    </el-select>
                    时
                </div>
                <div class="bottom">
                    <div v-if="!savedSuccess">
                        <span class="defaultBtn defaultBtn2" @click="cancel">取消</span>
                        <span class="lightBlueBtn lightBlueBtn2" @click="setStrategy">保存</span>
                    </div>
                    <span class="lightBlueBtn lightBlueBtn2" @click="changeStrategy" v-else>修改</span>
                </div>
            </div>
        </div>
    </detail>
</template>

<script>
import {errorMsg} from '../../../util/msg'
import detail from '../../../components/common/contents'
import{
    getStrategyInfo,
    setStrategy
    } from '../../../api/manage/logManage'
export default {
    name:'',
    data(){
        return{
            title:'日志管理',
            title2:'日志归档管理',
            policyChoose:'',
            disabledSave:true,
            chooseChange:'',
            savedSuccess:false,
            day:'',//天
            clock:'',//时
            number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        }
    },
    watch:{
        policyChoose(val){
           val == '不归档' ?  this.chooseChange = '0' : this.chooseChange =  '1';
           if(this.chooseChange == '0'){
               this.day = '';
               this.clock = '';
           }
        }
    },
    created(){
        this.getStrategyInfo()
    },
    methods:{
        // 获取归档信息
        async getStrategyInfo(){
            let strategyInfo = await getStrategyInfo();
            if(strategyInfo.data){
                this.day = strategyInfo.data.archiveDay;
                this.clock = strategyInfo.data.archiveHour;
                strategyInfo.data.archiveType == 0 ? this.policyChoose = '不归档':this.policyChoose = '自动归' ;
                this.chooseChange = strategyInfo.data.archiveType;
                this.savedSuccess = true;
            }
        },
        cancel(){
            this.savedSuccess === false ? this.savedSuccess = true : this.savedSuccess = false;
            this.disabledSave = true;
        },
        // 保存归档记录
        async setStrategy(){
            let res = await setStrategy(this.chooseChange,this.day,this.clock)
            if(res.code != 0){
                errorMsg(res.message)
            }else{
                this.savedSuccess === false ? this.savedSuccess = true : this.savedSuccess = false;
                this.disabledSave = true;
            }
            
        },
        changeStrategy(){
           if(this.chooseChange == '1'){
            //    归档
               this.savedSuccess = false;
               this.disabledSave = false;
           }else if(this.chooseChange == '0'){
            //    不归档
               this.savedSuccess = false;
               this.disabledSave = false;
               this.day = '';
               this.clock = '';
           }
        }
    },
    components:{
        detail
    }
}
</script>

<style lang="scss" scoped>
// 日志归档
.content-policy,.content-policy2{
    width: 470px;
    height:auto;
    padding-bottom: 20px;
    background-color:#E9EEF2;
    border-radius: 8px;
    .top,.top2{
        width: 100%;
        display: inline-block;
        line-height: 100px;
        text-align: left;
        padding-left: 50px;
        padding-top: 20px;
        box-sizing: border-box;
    }
    .bottom{
        margin-bottom:20px;
        span{
            height: 34px;
            line-height: 34px;
            display: inline-block;
        }
        .defaultBtn2{
            width: 88px;
        }
        .lightBlueBtn2{
            width: 120px;
        }
    }
}
.content-policy2{
    width: 460px;
    .top2{
        line-height: 50px;
        .top-input{
            .el-radio{
                margin-right: 0px !important;
            }
        }
    }
    .bottom{
        margin-top: 44px;
    }
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
    border-color: #0089ff !important;
    background: #0089ff !important;
}
::v-deep .el-radio__input.is-checked + .el-radio__label{
    color:#333;
}
::v-deep .el-input{
    width: 80px;
    height: 30px;
}
::v-deep .el-input__icon{
    line-height: 10px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #000;
}
::v-deep .el-select__caret{
    position: relative;
    top:8px;
}
::v-deep .el-icon-arrow-up:before{
    content:''
}
</style>
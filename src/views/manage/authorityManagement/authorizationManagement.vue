<template>
    <contents title = "权限管理" title2 = "授权管理">
        <div slot="table" id="tableContainer">
            <div class="toolArea">
                <button class="authBtn" @click.stop.prevent="grant">
                    <img src="../../../assets/edit.png"/>授 权
                </button>
                <span>*当前权限状态：{{tip}}</span>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="identity" label="管理员" width="345"></el-table-column>
                <el-table-column label="授权状态" width="335">
                    <template slot-scope="scope">
                        <span class="more" :class="scope.row.auth === true?'greenState':'redState'">{{scope.row.auth | authorizationStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" :disabled="scope.row.auth === false" @click.stop.prevent="handle(scope.$index, scope.row)">释权</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <authDialog @update="update"  ref="dialog"/>
        </div>
    </contents>
</template>

<script> 
import { errorMsg } from "../../../util/msg"
import contents from '../../../components/common/content'
import authDialog from '../../../components/manage/authorityManagement/authDialog'
import { getAuthList,delAuth, checkSuperAuth } from '../../../api/manage/authorityManagement' //获取管理员授权列表 释权 检查管理员权限
export default {
    name:'authorizationManagement',
    components:{ contents, authDialog },
    created(){
        this.getList()
    },
    data(){
        return{
            tableData: [],
            tip:'管理员权限（需要半数以上的管理员授权，才能获得超级管理权限）'
        }
    },
    methods:{
        async getList(){
            let list = await getAuthList()
            if( list.code !== 0){
                errorMsg(list.message)
                return
            }
            this.tableData = list.data
        },
        //释权
        async handle(index, row) {
            let delResult = await delAuth( row.serNumber )
            if (delResult.code != '0') {
                errorMsg(delResult.message)
                return
            }
            this.$message.success('释权成功！')
            this.update()
        },
        //授权
        grant(){
            this.$refs.dialog.dialogVisible = true;
        },
        //更新
        async update(){
            this.getList()
            let authResult = await checkSuperAuth()
            if (authResult.code != '0') {
                return;
            }
            this.tip = '超级管理员权限'
        }
    }
}
</script>

<style scoped lang="scss">
    .toolArea{
        display: flex;
        align-items: flex-end;
        margin-bottom: 24px;

        span{
            margin-left:15px;
            color:red;
            font-size: 12px;
        }   
    }
</style>
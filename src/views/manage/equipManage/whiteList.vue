<template>
    <detail title = "设备管理" title2 = "白名单管理">
        <div slot="table">
            <div class="tool-top">
                <span class="lightBlueBtn lightBlueBtn2 span-add" @click.stop.prevent="addList">
                    <img src="../../../assets/manage/add.png"  class="add"/>添加白名单
                </span>
                <span class="tip-text">*只有在白名单的IP地址才能访问密码服务，当白名单为空时，允许所有IP访问白名单修改后需要重启密码机才能生效！ </span>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="ip" label="IP地址" width="345"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="deleteList(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加 -->
            <add ref="add" @addSumbit="addSumbit" title='添加白名单'></add>
            <!-- 页码 -->
            <page @pageChange="pageChange" :currentPage="currentPage" :totalRecords="totalRecords" :totalPage="totalPage"></page>
            <!-- 删除 -->
            <delete-dialog ref="delete" title="删除白名单" :text='text' @submit="submit"></delete-dialog>
        </div>
    </detail>
</template>

<script>
import {
    getAuthIpList,
    setAuthIp,
    delAuthIp
} from '../../../api/manage/equipManage'
import {successMsg,errorMsg} from '../../../util/msg'

import detail from '../../../components/common/content'
import add from '../../../components/manage/equipManage/add'
import deleteDialog from '../../../components/common/deleteDialog'
import page from '../../../components/page/page'


export default {
    name:'authorizationManagement',
    components:{ detail , page , add , deleteDialog },
    data(){
        return{
            text:'删除此白名单后，该IP将失去访问密码服务的权限，确定删除？',
            tableData: [],
            currentPage:1,
            totalRecords:'',
            totalPage:'',
            rows:8,
            page:1,
            authId:'',
        }
    },
    created(){
        this.getAuthIpList(this.page,this.rows);
    },
    methods:{
         //获取列表
        async getAuthIpList(page,rows){
            let list = await getAuthIpList(page,rows);
                if( list.code !== 0){
                    errorMsg(list.message)
                    return
            }
            this.tableData = list.data.rows;
            this.totalRecords = list.data.records
            this.totalPage = list.data.total
        },
        deleteList(row) {
            this.$refs.delete.dialogVisible = true;
            this.authId = row.id;
        },
        addList(){
            this.$refs.add.dialogVisible = true;
        },
        // 添加
        addSumbit(data){
            setAuthIp(data).then(res => {
                if(res.code != 0){
                     errorMsg(res.message)
                    return
                }else{
                    this.$message.success('添加成功！')
                    this.getAuthIpList();
                }
            })
        },
        // 删除
        submit(){
            delAuthIp(this.authId).then(res => {
                if( res.code !== 0){
                    errorMsg(list.message)
                    return
                }
                else{
                    this.$message.success('删除成功！')
                    this.getAuthIpList();
                }
            })
        },
        pageChange(page){
            this.getAuthIpList(page,this.rows)
        }
    },
}
</script>

<style scoped lang="scss">
    .tool-top{
        display: flex;
        align-items: flex-end;
        margin-bottom: 25px;
        .span-add{
            color:#fff;
            width:150px;
            margin-left: 0;
            img{
                position: relative;
                top: 2px;
                left:-10px;
            }
        }
        
    }
</style>
<template>
    <contents title = "权限管理" title2 = "管理员管理">
        <div slot="table" id="tableContainer">
            <div class="toolArea">
                <button class="authBtn" @click.stop.prevent="addAdministrator">
                    <img src="../../../assets/add.png"/>添加管理员
                </button>
                 <button class="addBtn" @click.stop.prevent="addAuditor">
                    <img src="../../../assets/add.png"/>添加审计员
                </button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="345"></el-table-column>
                <el-table-column prop="roleName" label="管理员类型" width="335"></el-table-column>
                <el-table-column prop="serNumber" label="管理员编号" width="365"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click.stop.prevent="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <addAdministrator :type="type" @updateList="updateList" ref="dialog"/>
            <deleteDialog text='确定要删除此管理员？' title="删除管理员" @submit="submitDelete" ref="deleteDialog"/>
            <successTips :text="type == '0'?'添加管理员成功':'添加审计员成功'" ref="successDialog"/>
        </div>
    </contents>
</template>

<script>
import contents from '../../../components/common/content'
import addAdministrator from '../../../components/manage/authorityManagement/addAdministrator'
import deleteDialog from '../../../components/common/deleteDialog'
import successTips from '../../../components/init/common/successTips'
import { getRoleList, delRole } from '../../../api/manage/authorityManagement' //获取角色列表 删除管理员
export default {
    name:'administratorManagement',
    components:{ contents, addAdministrator, deleteDialog, successTips },
    created(){
        this.getList()
    },
    data(){
        return{
            type:0,
            tableData: [],
            info:{}
        }
    },
    methods:{
        //获取列表信息
        async getList(){
            let list = await getRoleList()
            if( list.code !== 0){
                errorMsg(list.message)
                return
            }
            this.tableData = list.data
        },
        //添加管理员
        addAdministrator(){
            this.type = 0;
            this.$refs.dialog.dialogVisible = true;
        },
        //添加审计员
        addAuditor(){
            this.type = 1;
            this.$refs.dialog.dialogVisible = true;
        },
        //删除管理员
        async handleDelete(index, row) {
            this.$refs.deleteDialog.dialogVisible = true;
            this.info = {...row}
        },
        //确定删除
        async submitDelete(){
            let delResult = await delRole( this.info.identity, this.info.roleID )
            if( delResult.code !== 0){
                errorMsg(delResult.message)
                return
            }
            this.$message.success('管理员删除成功！')
            this.getList()
        },
        //更新列表
        updateList(){
            setTimeout( () => {
                this.$refs.successDialog.successShow = true;
            },500)
            setTimeout( () => {
                this.$refs.successDialog.successShow = false;
                this.getList()
            },2000)
        }
    }
}
</script>

<style scoped lang="scss">
    .toolArea{
        display: flex;
        align-items: flex-end;
        margin-bottom: 24px; 
        .authBtn{
            margin-right:20px
        }
    }
</style>
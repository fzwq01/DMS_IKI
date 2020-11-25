<template>
    <contents title = "密钥管理" title2 = "对称密钥管理">
        <div slot="table" id="tableContainer">
            <div class="toolArea">
                <button class="authBtn" @click.stop.prevent="addUser">
                    <img src="../../../assets/add.png"/>添加
                </button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="keyindex" label="密钥索引" width="345"></el-table-column>
                <el-table-column label="密钥长度" width="345">
                    <template slot-scope="{}">128</template>
                </el-table-column>
                <el-table-column label="密钥管理">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click.stop.prevent="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <addUserDialog title="添加对称密钥" type="2" @update="getList" ref="dialog"/>
           <deleteDialog text='确定删除此对称密钥?' title="删除对称密钥" @submit="submit" ref="deleteDialog"/>
           <page @pageChange="pageChange" :totalPage="totalPage" :totalRecords="totalRecords" :currentPage="currentPage"/>
        </div>
    </contents>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import contents from '../../../components/common/content'
import addUserDialog from '../../../components/manage/keyManagement/addUserDialog'
import deleteDialog from '../../../components/common/deleteDialog'
import page from '../../../components/page/page'
import { getSymmetricSecretKeyList, delSecretKey } from '../../../api/manage/keyManagement' //获取列表 删除密钥
export default {
    name:'symmetricKeyManagement',
    components:{ contents, addUserDialog, deleteDialog, page },
    created(){
        this.getList()
    },
    data(){
        return{
            currentPage:1,
            rows:10,
            totalPage:1,
            totalRecords:4,
            tableData: [],

            info:{},

            
        }
    },
    methods:{
        //获取列表
        async getList(){
            let list = await getSymmetricSecretKeyList( this.currentPage, this.rows )
            if( list.code !== 0){
                errorMsg(list.message)
                return
            }
            this.tableData = list.data.rows
            this.totalRecords = list.data.records
            this.totalPage = list.data.total
        },
        //添加用户
        addUser(){
            this.type = 0;
            this.title = '添加用户';
            this.$refs.dialog.dialogVisible = true;
        },
        //删除
        handleDelete(index, row) {
            this.$refs.deleteDialog.dialogVisible = true
            this.info = {...row}
            console.log(index, row);
        },
        //确定删除
        async submit(){
            let delResult = await delSecretKey( this.info.id, this.info.type, this.info.keyindex )
            if( delResult.code !== 0){
                errorMsg(delResult.message)
                return
            }
            this.$message.success('删除成功！')
            this.getList()
        },
         //换页
        pageChange( page ){
            this.currentPage = page
            this.getList()
        }
    }
}
</script>

<style scoped lang="scss">
    .toolArea{
        display: flex;
        margin-bottom: 24px;
    }
</style>
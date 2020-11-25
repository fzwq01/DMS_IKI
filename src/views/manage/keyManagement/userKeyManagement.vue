<template>
    <contents title = "密钥管理" title2 = "用户密钥管理">
        <div slot="table" id="tableContainer">
            <div class="toolArea">
                <button class="authBtn" @click.stop.prevent="addUser">
                    <img src="../../../assets/add.png"/>添加用户
                </button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="keyindex" label="密钥索引" width="150"></el-table-column>
                <el-table-column label="用户名" width="340">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" class="lineText" @click.stop.prevent="handleEdit(scope.$index, scope.row)">{{scope.row.username}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="密钥管理" width="400">
                    <template slot-scope="scope">
                        <div class="toolContainer">
                            <el-button size="mini" type="text" class="rightLine" v-if="scope.row.status === 1" @click.stop.prevent="exportFile(scope.$index, scope.row)">导出申请文件</el-button>
                            <div class="selectArea" v-if="scope.row.status === 1">
                                <el-button size="mini" type="text" class="rightLine" @click.stop.prevent="importFile(scope.$index, scope.row)">导入密钥文件</el-button>
                                <input class="selectTool" type='file' name="file" accept=".doc,.pdf,.zip,image/*"  @change="changeData"   ref="file"/>
                            </div>
                            <el-button size="mini" type="text" style="padding-left:10px" @click.stop.prevent="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="私钥访问控制码管理">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click.stop.prevent="handleModify(scope.$index, scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <addUserDialog :title="title" :type="type" :id="id" @update="getList" ref="dialog"/>
            <codeDialog :id="id" @modifySuccess="modifySuccess" ref="codeDialog"/>
            <successTips text="私钥访问控制码修改成功，请妥善保管新的私钥访问控制码!" ref="successDialog"/>
            <page @pageChange="pageChange" :totalPage="totalPage" :totalRecords="totalRecords" :currentPage="currentPage"/>
        </div>
    </contents>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import contents from '../../../components/common/content'
import addUserDialog from '../../../components/manage/keyManagement/addUserDialog'
import codeDialog from '../../../components/manage/keyManagement/codeDialog'
import successTips from '../../../components/init/common/successTips'
import page from '../../../components/page/page'
import { getUserSecretKeyList, delSecretKey, importP12, downloadP10 } from '../../../api/manage/keyManagement' //获取用户密钥列表 删除密钥 导入密钥文件 导出申请文件
export default {
    name:'userKeyManagement',
    components:{ contents, addUserDialog, codeDialog, successTips, page },
    created(){
        this.getList()
    },
    data(){
        return{
            id:'',
            type:0,
            title:'',

            currentPage:1,
            rows:10,
            totalPage:1,
            totalRecords:4,
            
            tableData: [],

            info:{}
        }
    },
    methods:{
        //获取列表
        async getList(){
            let list = await getUserSecretKeyList( this.currentPage, this.rows )
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
            this.type = 0
            this.title = '添加用户'
            this.$refs.dialog.dialogVisible = true
        },
        //修改
        handleModify(index, row) {
            this.$refs.codeDialog.dialogVisible = true
            this.id = row.id
        },
        //编辑
        handleEdit(index, row) {
            this.type = 1;
            this.title = '编辑用户名';
            this.$refs.dialog.dialogVisible = true;
            this.id = row.id;
        },
        //修改成功
        modifySuccess(){
            this.$refs.successDialog.successShow = true;
            setTimeout( () =>{
                this.$refs.successDialog.successShow = false;
            },1500)
        },
        //导出申请文件
        exportFile(index, row) {
            downloadP10( row.id, row.username ) 
            // console.log(exportResult);
        },
        //导入申请文件
        importFile(index, row) {
            this.$refs.file.click()
            this.info = {...row}
        },
        //导入密钥文件
        async changeData (e){
            console.log(e.target.files[0])
            if (e.target.files[0]) {
                let p12File = e.target.files[0]
                let imortResult = await importP12( this.info.id, p12File )
                if( imortResult.code !== 0){
                    errorMsg(imortResult.message)
                    return
                }
                this.$message.success('上传成功！')
                this.getList()
            }
        },
        //删除
        async handleDelete(index, row) {
            let delResult = await delSecretKey( row.id, row.type, row.keyindex )
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
        align-items: flex-end;
        margin-bottom: 24px; 
    }

    .lineText{
        text-decoration: underline;
    }
    .rightLine{
        border-right:1px solid #ddd;
    }

    .toolContainer{
        display: flex;
        align-items: center;
        .selectArea{
            width:96px;
            position: relative;
            margin-right:10px;
            
            .selectTool{
                opacity: 0;
                width:90px;
                position: absolute;
                left:0;
                top:50%;
                transform: translate(0,-50%);
                z-index:0;
            }

            button{
                padding-left:10px;
                position: absolute;
                left:0;
                top:50%;
                transform: translate(0,-50%);
                z-index:9;
            }
        }
    }
</style>
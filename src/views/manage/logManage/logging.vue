<template>
    <contents title="日志管理" title2="日志归档记录">
        <div slot='table'>
             <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="350">
                </el-table-column>
                <el-table-column
                prop="archiveTime"
                label="归档时间 "
                width="350">
                <!-- <template slot-scope="scope">
                    {{scope.row.data | time}}
                </template> -->
                </el-table-column>
                <el-table-column
                prop="archiveSize"
                label="归档数量 "
                width="350">
                </el-table-column>
                <el-table-column
                label="操作结果">
                <template >
                    <span class="download-logo" @click="downLoad(scope.row)">下载</span>
                </template>
                </el-table-column>
            </el-table>

            <page :totalPage="totalPage" @pageChange="pageChange" :totalRecords="totalRecords" :currentPage="currentPage"></page>
        </div>
    </contents>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import contents from '../../../components/common/contents'
import page from '../../../components/page/page'
import{
    getArchiveLogsList,
    downArchival
}from '../../../api/manage/logManage'

export default {
    name:'checkLog',
    components:{
        contents,
        page
    },
     data() {
        return {
            totalPage:1,
            totalRecords:0,
            currentPage:1,
            rows:8,
            tableData: [
            // {
            //     archiveId: 122,
            //     archiveSize: 8,
            //     archiveTime: 2020-11-3
            // },
            //  {
            //     archiveId: 122,
            //     archiveSize: 8,
            //     archiveTime: 2020-11-3
            // }
            ]
        }
    },
    created(){
        this.archiveList()
    },
    methods:{
        // 获取归档列表
         async archiveList(){
            let archiveList = await getArchiveLogsList(this.currentPage,this.rows);
            console.log(archiveList)
            if( archiveList.code !== 0){
                    errorMsg(archiveList.message)
                    return
            }
            this.tableData = archiveList.data.rows;
            this.totalRecords = archiveList.data.records
            this.totalPage = archiveList.data.total
        },
        // 下载
        downLoad(rows){
            console.log(rows.archiveId)
            downArchival(rows.archiveId)
        },
        pageChange(){

        }
    }
}
</script>

<style lang="scss" scoped>
// 下载日志
.download-logo{
    color: #E9EEF2;
    cursor: pointer;
}
</style>

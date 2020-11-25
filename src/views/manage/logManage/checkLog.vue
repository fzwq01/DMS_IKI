<template>
    <contents title="日志管理" title2="查看日志信息">
        <div slot='table'>
            <div class="btn-input">
                <div class="input-style">
                    <span>时间：</span>
                    <el-date-picker
                            v-model="startTime"
                            type="date"
                            placeholder="年/月/日"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :picker-options="start_time"
                            @change="timeSelect">
                    </el-date-picker>
                    <span> 至 </span>
                    <el-date-picker
                            v-model="endTime"
                            type="date"
                            placeholder="年/月/日"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :picker-options="end_time"
                            @change="timeSelect1">
                    </el-date-picker>
                </div>
                <div class="lightBlueBtn lightBlueBtn2" @click="checkLog">
                    <img src="../../../assets/manage/scale.png" alt="" class="scale-style">
                    查询
                </div>
                <div class="lightGreenBtn lightGreenBtn2" @click="exportLogLists">
                    <img src="../../../assets/manage/output_03.png" alt="" class="scale-style">
                    导出
                </div>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="operactionTime"
                        label="时间"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="operationRole"
                        label="角色"
                        width="200">
                    <template slot-scope="scope">
                        {{scope.row.operationRole | operationRoleFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operationEvent"
                        label="事件">
                </el-table-column>
                <el-table-column
                        prop="operationResult"
                >
                    <!-- 表头 -->
                    <template slot="header" slot-scope="scope">
                        <el-select v-model="operateName" @change="chooseBear">
                            <el-option
                                    v-for="item in filters"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.operationResult | operateFilter}}
                    </template>
                    <!-- 表格内容 -->
                </el-table-column>
            </el-table>

            <page @pageChange="pageChange" ref="pageCompoent" :currentPage="currentPage" :totalRecords="totalRecords" :totalPage="totalPage"></page>
        </div>
    </contents>
</template>

<script>
    import { errorMsg } from "../../../util/msg"
    import contents from '../../../components/common/contents'
    import page from '../../../components/page/page'
    import {
        getOperationLogList,
        exportOperationLogs
    } from '../../../api/manage/logManage'

    export default {
        name: 'checkLog',
        components: {
            contents,
            page
        },
        created(){
            this.getLogLists(undefined,undefined,undefined,undefined,this.page, this.rows)
        },
        data() {
            return {
                filters: [{text: '操作结果', value: undefined}, {text: '成功', value: '0'}, {text: '失败', value: '1'}],
                startTime: undefined,
                endTime: undefined,
                currentPage: 1,
                page:1,
                rows:8,
                totalRecords: 0,//数据总数
                totalPage: 1,//页数
                operateName: '操作结果',
                operType:undefined,
                operatorRole:1,//角色
                tableData: [],
                start_time: {
                    disabledDate: time => {
                        if (this.endTime) {
                                return time.getTime() > new Date(this.endTime).getTime()
                            }
                        }
                    },
                end_time: {
                    disabledDate: time => {
                        if (this.startTime) {
                            return time.getTime() < new Date(this.startTime).getTime() - 86400000
                        }
                    }
                },
            }
        },
        methods: {
            //获取列表
            async getLogLists(operatorRole,startTime,endTime,operType,page,rows){
                let list = await getOperationLogList(operatorRole,startTime,endTime,operType,page,rows);
                 if( list.code !== 0){
                    errorMsg(list.message)
                    return
                }
                this.tableData = list.data.rows;
                this.totalRecords = list.data.records;
                this.totalPage = list.data.total;
                this.currentPage = list.data.page;
            },
            // 导出日志列表
            exportLogLists(){
               exportOperationLogs(this.operatorRole,this.operType,this.startTime,this.endTime)
            },
            // 开始时间
            timeSelect(value) {
                this.startTime = value;
            },
            // 结束时间
            timeSelect1(value) {
                this.endTime = value;
            },
            // 查询
            checkLog(){
                if(this.startTime && this.endTime){
                    this.getLogLists(undefined,this.startTime,this.endTime,this.operType,1,8)
                    this.$refs.pageCompoent.current_page = 1;
                }else{
                     this.getLogLists(undefined,undefined,undefined,undefined,this.page, this.rows);
                     this.$refs.pageCompoent.current_page = 1;
                     this.operType = undefined
                }
                
            },
            chooseBear(value) {
                // this.currentPage = 1; 
                this.$refs.pageCompoent.current_page = 1;
                this.operType = value;
                this.getLogLists(undefined,this.startTime,this.endTime,value,1,this.rows)
            },
            pageChange(page){
                this.getLogLists(undefined,this.startTime,this.endTime,this.operType,page, this.rows)
            }
        }
    }
</script>

<style lang="scss" scoped>
// 查看日志信息
    .btn-input{
        text-align: left;
        margin-bottom: 30px;
        div{display: inline-block;}

        .input-style{
            .bottom{margin-top: 44px;}
            span{
                color: #E9EEF2;
                padding:0 8px;
            }
        }
    }
    // 放大镜
    .scale-style{
        position: relative;
        top: 4px;
        left: -20px;
    }
    ::v-deep .cell .el-input--suffix .el-input__inner {
        background: #008AFF;
        color: #fff;
        font-weight: bold;
        border: 1px solid #fff;
    }

    ::v-deep .el-input--prefix .el-input__inner {
        padding-left: 16px;
    }

    ::v-deep .el-icon-arrow-up:before {
        content: "";
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid #fff;
        left: 1px;
        top: -9px;
        position: relative;
    }

    ::v-deep .el-input__icon {
        line-height: 35px;
        color: #C0C4CC;
        position: relative;
        left: 1px;
        top: 0px;
    }
    ::v-deep .el-icon-date{
        left:175px;
    }

    .el-select {
        .el-select__caret {
            left: 0;
        }
    }
</style>

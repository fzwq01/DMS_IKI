<template>
    <detail title="设备管理" title2="设备自检">
        <div class="equipSelf" slot='table'>
            <div class="center-img" v-if="!tablePlay">
                <div class="imgs" @click="deviceCheck">
                    <img src="../../../assets/manage/self.png" alt="" >
                    <div class="search " :class="[rotate ? 'search2' : '']">
                        <img src="../../../assets/manage/search.png" :class="[rotate ? 'searching' : '']" id="search">
                    </div>
                    <span class="search-text">设备自检</span>
                </div>
            </div>

            <!-- 表格 -->
            <div slot='table' v-else>
                <table class="el-table" style="border-collapse:collapse">
                    <thead class="el-table__header-wrapper">
                        <tr style="height:60px;">
                            <th class="th-self" style="width:400px;">
                                <div class="cell">自检内容</div>
                            </th>
                            <th class="th-self">
                                <div class="cell">自检结果</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="el-table-self">
                        <tr >
                            <td>密码算法正确性</td>
                            <td>{{tableData.algorithmValidity == "0" ? '正确' :'错误'}}</td>
                        </tr>
                        <tr>
                            <td>随机数发生器</td>
                            <td>{{tableData.randomness == "0" ? '正常' :'不正常'}}</td>
                        </tr>
                        <tr>
                            <td>存储矩阵完整性</td>
                            <td>{{tableData.matrixintegrality == "0" ? '完整' :'不完整'}}</td>
                        </tr>
                        <tr>
                            <td>存储密钥完整性</td>
                            <td>{{tableData.keyintegrality == "0" ? '完整' :'不完整'}}</td>
                        </tr>
                        <tr>
                            <td>存储数据完整性</td>
                            <td>{{tableData.dataintegrality == "0" ? '完整' :'不完整'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </detail>
</template>

<script>
    import detail from '../../../components/common/contents'
    import {deviceCheck} from '../../../api/manage/equipManage'
    import {errorMsg} from "../../../util/msg";

    export default {
        name: 'equipSelf',
        data() {
            return {
                rotate: false,
                tablePlay: false,
                tableData: {
                    algorithmValidity:'',
                    randomness:'',
                    matrixintegrality:'',
                    keyintegrality:'',
                    dataintegrality:'',
                }
                // algorithmValidity 0 密码算法正确性  randomness 0  随机数发生器
                // matrixintegrality 存储矩阵完整性  
                // keyintegrality存储密钥完整性  dataintegrality存储数据完整性 null
            }
        },
        created() {
        },
        components: {
            detail
        },
        methods: {
            async deviceCheck() {
                this.rotate ? '' : this.rotate = true
                let deviceInfo = await deviceCheck();
                if (deviceInfo.code != "0") {
                    this.rotate = false
                    errorMsg(deviceInfo.message)
                    return
                }else{
                    this.tableData = deviceInfo.data
                }
                setInterval(() => {
                    this.rotate = false
                    this.tablePlay = true
                    return
                }, 2000)

            },
        }
    }
</script>

<style lang="scss" scoped>
    .el-table-self tr{
        height: 60px;
        td{
            padding-left: 50px;
        }
    }
    .th-self{
        padding-left: 20px;
        .cell{
            border-right: 2px solid #37a6f8 !important;
        }
    }
    .search2 {
        width: 150px;
        height: 130px;
        position: relative;
        background-color: transparent;
        animation: rond 1s linear infinite;
        border-radius: 50%;
    }

    .searching {
        position: absolute;
        left: 30px;
        top: 0;
        animation: search linear 1s infinite;
    }

    @keyframes rond {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes search {
        0% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>

<template>
    <detail title="设备管理" title2="网络配置" class="config-net">
        <div class="netConfig" slot='table'>
            <div class="config-top">
                <span class="top-title ">LAN1口</span>
                <el-form :model="network.lan1" ref="networkForm1"
                         class="demo-ruleForm">
                    <el-form-item prop="ip">
                        <span class="equip-title">IP地址：</span>
                        <ve-ip v-model="network.lan1.ip" message="请输入正确的IP地址" :disabled='disabled'
                               class="ip_style"></ve-ip>
                    </el-form-item>
                    <el-form-item prop="netMask" style=" text-align: left">
                        <span class="equip-title">子网掩码：</span>
                        <ve-ip v-model="network.lan1.netMask" message="请输入正确的子网掩码" :disabled='disabled'></ve-ip>
                    </el-form-item>
                    <el-form-item prop="gateWay" style=" text-align: left">
                        <span class="equip-title">默认网关：</span>
                        <ve-ip v-model="network.lan1.gateWay" message="请输入正确的默认网关" :disabled='disabled'></ve-ip>
                    </el-form-item>
                </el-form>
            </div>
            <div class="config-bottom">
                <span class="top-title ">LAN2口</span>
                <el-form :model="network.lan2" ref="networkForm2"
                         class="demo-ruleForm">
                    <el-form-item prop="ip">
                        <span class="equip-title">IP地址：</span>
                        <ve-ip v-model="network.lan2.ip" message="请输入正确的IP地址" :disabled='disabled'
                               class="ip_style"></ve-ip>
                    </el-form-item>
                    <el-form-item prop="netMask" style=" text-align: left">
                        <span class="equip-title">子网掩码：</span>
                        <ve-ip v-model="network.lan2.netMask" message="请输入正确的子网掩码" :disabled='disabled'></ve-ip>
                    </el-form-item>
                    <el-form-item prop="gateWay" style=" text-align: left">
                        <span class="equip-title">默认网关：</span>
                        <ve-ip v-model="network.lan2.gateWay" message="请输入正确的默认网关" :disabled='disabled'></ve-ip>
                    </el-form-item>
                </el-form>
                <span class="tip-text" style="margin-top:20px;display:inline-block;">*网络配置修改后需要重启密码机才能生效</span>
                <div>
                    <span class="lightBlueBtn lightBlueBtn2" @click="editNet" v-if="disabled">编辑</span>
                    <div v-else class="btn-group">
                        <span class=" defaultBtn" @click="cancel">取消</span>
                        <span class="lightBlueBtn lightBlueBtn2" @click="save">保存</span>
                    </div>
                </div>
            </div>
            <div v-show="false">
                {{validateIp1}}{{validateNetWork1}}{{validateGateWay1}}
                {{validateIp2}}{{validateNetWork2}}{{validateGateWay2}}
            </div>
            <success-tips :text="configSuccessText" ref="successDialog"></success-tips>
            <fail-tips :text="configFailText" ref="failDialog"></fail-tips>
        </div>
    </detail>
</template>

<script>
    import detail from '../../../components/common/contents';
    import successTips from "../../../components/init/common/successTips";
    import failTips from "../../../components/init/common/failTips";
    import VueIpInput from 'vue-ip-input';
    import {errorMsg, successMsg} from '../../../util/msg'
    import {
        getNetWork,
        setNetWork
    } from '../../../api/manage/equipManage'


    export default {
        name: 'netConfig',
        data() {
            return {
                disabled: false,//禁止
                configSuccessText: '网络配置成功',
                configFailText: '网络配置失败',
                network: {
                    lan1: {
                        ip: '',
                        netMask: '',
                        gateWay: ''
                    },
                    lan2: {
                        ip: '',
                        netMask: '',
                        gateWay: ''
                    }
                },
            }
        },
        computed: {
            //监听LAN1口的输入
            validateIp1() {
                let validateIp = this.network.lan1.ip;
                if (Array.isArray(validateIp) && validateIp.join() === ',,,') {
                    this.network.lan1.ip = ''
                }
                return ''
            },
            validateNetWork1() {
                let validateNetWork = this.network.lan1.netMask;
                if (Array.isArray(validateNetWork) && validateNetWork.join() === ',,,') {
                    this.network.lan1.netMask = ''
                }
                return ''
            },
            validateGateWay1() {
                let validateGateWay = this.network.lan1.gateWay;
                if (Array.isArray(validateGateWay) && validateGateWay.join() === ',,,') {
                    this.network.lan1.gateWay = ''
                }
                return ''
            },
            validateIp2() {
                let validateIp = this.network.lan2.ip;
                if (Array.isArray(validateIp) && validateIp.join() === ',,,') {
                    this.network.lan2.ip = ''
                }
                return ''
            },
            validateNetWork2() {
                let validateNetWork = this.network.lan2.netMask;
                if (Array.isArray(validateNetWork) && validateNetWork.join() === ',,,') {
                    this.network.lan2.netMask = ''
                }
                return ''
            },
            validateGateWay2() {
                let validateGateWay = this.network.lan2.gateWay;
                if (Array.isArray(validateGateWay) && validateGateWay.join() === ',,,') {
                    this.network.lan2.gateWay = ''
                }
                return ''
            },

        },
        created() {
            this.getNetWork()
        },
        methods: {
            // 获取配置参数
            async getNetWork() {
                let res = await getNetWork();
                if (res.code !== 0) {
                    errorMsg(res.message)
                    return
                }
            },
            checkIsEmpty(obj) {
                let isNotEmpty = false;
                for (let item in obj) {
                    if (obj[item].length > 0) {
                        isNotEmpty = true
                    }
                }
                return isNotEmpty;
            },
            editNet() {
                this.disabled = false;
            },
            cancel() {
                this.disabled = true;
            },
            async save() {
                let lan1 = {}
                let lan2 = {}
                let reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/

                // 都为空
                if (!this.checkIsEmpty(this.network.lan1) && !this.checkIsEmpty(this.network.lan2)) {

                    errorMsg("请至少配置一个LAN口网络")

                    return;
                }
                // 检查LAN1配置
                if (this.checkIsEmpty(this.network.lan1)) {
                    for (let item in this.network.lan1) {
                        if (!reg.test((this.network.lan1[item]).join('.'))) {
                            errorMsg("请正确配置LAN1口网络")

                        } else {
                            lan1[item] = (this.network.lan1[item]).join('.');
                        }
                    }
                }
                // 检查LAN2配置
                if (this.checkIsEmpty(this.network.lan2)) {
                    for (let item in this.network.lan2) {
                        if (!reg.test((this.network.lan2[item]).join('.'))) {

                            errorMsg("请正确配置LAN2口网络")

                        } else {
                            lan2[item] = (this.network.lan2[item]).join('.');
                        }
                    }
                }
                let networkConfig = {
                    "eno1Ip": lan1.ip,
                    "eno2Ip": lan2.ip,
                    "gatewayEno1": lan1.gateWay,
                    "gatewayEno2": lan2.gateWay,
                    "subnetMaskEno1": lan1.netMask,
                    "subnetMaskEno2": lan2.netMask,
                }
                let res = await setNetWork(networkConfig);
                if (res.code != "0") {
                    errorMsg(res.message)
                    return
                }
                successMsg("网络配置成功")

            }
        },
        components: {
            detail,
            failTips,
            successTips
        }
    }
</script>

<style lang="scss" scoped>
    // 网络配置
    .config-net{
        .netConfig{
            width: 440px;
            padding:40px;
            box-sizing: border-box;
            background:#E9EEF2;

            .config-top,.config-bottom{
                padding-bottom: 20px;
                border-bottom: 1px dashed rgb(185, 180, 180);
                .top-title{
                    font-size: 18px;
                    display: inline-block;
                    margin-bottom: 20px;
                    text-align: left;
                    width: 100%;
                }
                .el-form-item{
                    margin-bottom: 18px;
                    span{
                        width: 80px;
                        display: inline-block;
                        text-align: left;
                    }
                    .el-input{
                        width: 280px !important;
                        height: 30px;
                    }
                }
            }
            .config-bottom{padding-top: 20px;border-bottom: none;}
        }
        .equip-title{
            float: left;
        }
        .btn-group{
            span{
                margin-left: 20px;
            }
        }
        .tip-text{
            display: block;
        }
        .lightBlueBtn,.defaultBtn{
            display: inline-block;
            line-height: 35px;
            height: 35px;
            margin:20px 0 0 0;
        }
    }
    ::v-deep .v-easy-input--box {
        border: 0;

        ul {
            background: #fff;
            border: 1px solid #c0c4cc;
        }
    }

    ::v-deep .input-ip ul li input:disabled {
        color: #606266;
        background-color: #fff;
    }

    .el-form-item__label {
        color: rgb(122, 140, 155);
        text-align: left !important;
    }

    ::v-deep .el-form-item__error {
        left: 80px !important;
    }
</style>

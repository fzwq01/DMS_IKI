<template>
    <div id="networkContainer">
        <div class="content">
            <div class="networkConfigContainer">
                <div class="lan1">
                    <el-form :model="network.lan1" ref="networkForm1" label-width="100px" class="demo-ruleForm">
                        <div class="title">LAN1口</div>
                        <el-form-item label="IP地址:" prop="IP" style=" text-align: left">
                            <ve-ip v-model="network.lan1.ip" message="请输入正确的IP地址"></ve-ip>
                        </el-form-item>
                        <el-form-item label="子网掩码:" prop="netMask" style=" text-align: left">
                            <ve-ip v-model="network.lan1.netMask" message="请输入正确的子网掩码"></ve-ip>
                        </el-form-item>
                        <el-form-item label="默认网关:" prop="gateWay" style=" text-align: left">
                            <ve-ip v-model="network.lan1.gateWay" message="请输入正确的网关地址"></ve-ip>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="lan2">
                    <el-form :model="network.lan2" ref="networkForm2" label-width="100px" class="demo-ruleForm">
                        <div class="title">LAN2口</div>
                        <el-form-item label="IP地址:" prop="IP" style=" text-align: left">
                            <ve-ip v-model="network.lan2.ip" message="请输入正确的IP地址"></ve-ip>
                        </el-form-item>
                        <el-form-item label="子网掩码:" prop="netMask" style=" text-align: left">
                            <ve-ip v-model="network.lan2.netMask" message="请输入正确的子网掩码"></ve-ip>
                        </el-form-item>
                        <el-form-item label="默认网关:" prop="gateWay" style=" text-align: left">
                            <ve-ip v-model="network.lan2.gateWay" message="请输入正确的网关地址"></ve-ip>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="false">
                    {{lan1Ip}}{{lan1NetMask}}{{lan1GateWay}}
                    {{lan2Ip}}{{lan2NetMask}}{{lan2GateWay}}
                </div>
            </div>
        </div>
        <div class="btnContainer">
            <button class="lightBlueBtn" @click.stop.prevent="save">保存</button>
        </div>
        <success-tips :text="configSuccessText" ref="successDialog"></success-tips>
        <fail-tips :text="configFailText" ref="failDialog"></fail-tips>
    </div>
</template>

<script>
import successTips from "./successTips";
import failTips from "./failTips";
import VueIpInput from 'vue-ip-input';
import {setNetWork} from "../../../api/init/initApi";
export default {
    name:'networkConfigComponent',
    components: {successTips, failTips, 'vue-ip-input': VueIpInput},
    data() {
        return {
            configSuccessText: "网络配置成功",
            configFailText: "网络配置失败",
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
            }
        }
    },
    computed: {
        //监听LAN1口的输入  当删掉IP时及时的去掉错误提示
        lan1Ip: function () {
            if (Array.isArray(this.network.lan1.ip) && this.network.lan1.ip.join() === ',,,') {
                this.network.lan1.ip = ''
            }
            return ''
        },
        lan1NetMask: function () {
            if (Array.isArray(this.network.lan1.netMask) && this.network.lan1.netMask.join() === ',,,') {
                this.network.lan1.netMask = ''
            }
            return ''
        },
        lan1GateWay: function () {
            if (Array.isArray(this.network.lan1.gateWay) && this.network.lan1.gateWay.join() === ',,,') {
                this.network.lan1.gateWay = ''
            }
            return ''
        },
        //监听LAN2口的输入  当删掉IP时及时的去掉错误提示
        lan2Ip: function () {
            if (Array.isArray(this.network.lan2.ip) && this.network.lan2.ip.join() === ',,,') {
                this.network.lan2.ip = ''
            }
            return ''
        },
        lan2NetMask: function () {
            if (Array.isArray(this.network.lan2.netMask) && this.network.lan2.netMask.join() === ',,,') {
                this.network.lan2.netMask = ''
            }
            return ''
        },
        lan2GateWay: function () {
            if (Array.isArray(this.network.lan2.gateWay) && this.network.lan2.gateWay.join() === ',,,') {
                this.network.lan2.gateWay = ''
            }
            return ''
        },

    },
    methods: {
        checkConfig(obj) {
            let status = false;
            for (let key in obj) {
                if (obj[key].length > 0) {
                    status = true
                }
            }
            return status;
        },
        async save() {
            let lan1 = {}
            let lan2 = {}
            let reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
            //LAN1和LAN2都未配置
            if (!this.checkConfig(this.network.lan1) && !this.checkConfig(this.network.lan2)) {
                this.configFailText = '请至少配置一个LAN口网络'
                this.$refs.failDialog.failShow = true
                setTimeout(() => {
                    this.$refs.failDialog.failShow = false
                }, 1000)
                return;
            }
            //检查LAN1口配置
            if (this.checkConfig(this.network.lan1)) {
                for (let key in this.network.lan1) {
                    if (!reg.test((this.network.lan1[key] || []).join('.'))) {
                        this.configFailText = '请正确配置LAN1口网络'
                        this.$refs.failDialog.failShow = true
                        setTimeout(() => {
                            this.$refs.failDialog.failShow = false
                        }, 1000)
                        return;
                    } else {
                        lan1[key] = (this.network.lan1[key]).join('.')
                    }
                }
            }
            //检查LAN2口配置
            if (this.checkConfig(this.network.lan2)) {
                for (let key in this.network.lan2) {
                    if (!reg.test((this.network.lan2[key] || []).join('.'))) {
                        this.configFailText = '请正确配置LAN2口网络'
                        this.$refs.failDialog.failShow = true
                        setTimeout(() => {
                            this.$refs.failDialog.failShow = false
                        }, 1000)
                        return;
                    } else {
                        lan2[key] = (this.network.lan2[key]).join('.')
                    }
                }
            }

            let networkInfo={
                "eno1Ip": lan1.ip,
                "eno2Ip": lan2.ip,
                "gatewayEno1": lan1.gateWay,
                "gatewayEno2": lan2.gateWay,
                "subnetMaskEno1": lan1.netMask,
                "subnetMaskEno2": lan2.netMask
            }

            let configResult=await setNetWork(networkInfo);
            if(configResult.code!='0'){
                this.configFailText = configResult.message
                this.$refs.failDialog.failShow = true
                setTimeout(() => {
                    this.$refs.failDialog.failShow = false
                }, 1000)
                return
            }
            this.configSuccessText = '网络配置成功'
            this.$refs.successDialog.successShow = true
            setTimeout(() => {
                this.$refs.successDialog.successShow = false
                this.$router.push({name: 'initSuccess'})
            }, 1000)
        }
    }
}
</script>

<style scoped lang="scss">
    #networkContainer{
        padding-top:40px;
        .networkConfigContainer {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        .lan1 {
            width: 400px;
            margin-right: 8px;
        }
        .lan2 {
            width: 400px;
            margin-left: 8px;
        }
        .title {
            padding: 10px 10px;
            text-align: right;
            width: 100px;
            font-size: 14px;
            color: #429aff;
            box-sizing: border-box;
        }
        .btnContainer {
            padding-top: 35px;
        }
    }
</style>

<template>
    <div class="nav-bar">
        <el-menu :default-active="this.$route.name" :router="true" :unique-opened="true" class="el-menu-vertical-demo" text-color="#7A8C9B" active-text-color="#078DFF">
            <el-menu-item index="index" >
                <img src="../../../assets/index/1-1.png" alt=""  :class="($route.name==='index')? 'example2' : 'example1'">
                <img src="../../../assets/index/1-2.png"
                    alt=""
                    :class="($route.name==='index')? 'example1' : 'example2'">
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <img src="../../../assets/index/2-1.png" alt=""  :class="($route.name==='authorizationManagement' ||  $route.name==='administratorManagement')? 'example2' : 'example1'">
                    <img src="../../../assets/index/2-2.png"
                        alt=""
                        :class="($route.name==='authorizationManagement' ||  $route.name==='administratorManagement')? 'example1' : 'example2'">
                    <span
                     :class="($route.name==='authorizationManagement' ||  $route.name==='administratorManagement')? 'is-activing' : 'is-null'"
                    >权限管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="authorizationManagement"  :class="($route.name==='authorizationManagement')? 'is-actived ' : 'radius'">授权管理</el-menu-item>
                    <el-menu-item index="administratorManagement" class="radius3" :class="($route.name==='administratorManagement')? 'is-actived ' : 'radius'">管理员管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <img src="../../../assets/index/3-1.png"   :class="($route.name==='userKeyManagement' ||  $route.name==='symmetricKeyManagement' || $route.name==='keyBackup' || $route.name==='keyRecovery')? 'example2' : 'example1'">
                    <img src="../../../assets/index/3-2.png"   :class="($route.name==='userKeyManagement' ||  $route.name==='symmetricKeyManagement' || $route.name==='keyBackup' || $route.name==='keyRecovery')? 'example1' : 'example2'">
                    <span
                    :class="($route.name==='userKeyManagement' ||  $route.name==='symmetricKeyManagement' || $route.name==='keyBackup' || $route.name==='keyRecovery')? 'is-activing' : 'is-null'"
                    >密钥管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="userKeyManagement" class="radius2" :class="($route.name==='userKeyManagement')? 'is-actived ' : 'radius'">用户密钥管理</el-menu-item>
                    <el-menu-item index="symmetricKeyManagement" class="radius radius2" :class="($route.name==='symmetricKeyManagement')? 'is-actived ' : 'radius'">对称密钥管理</el-menu-item>
                    <el-menu-item index="keyBackup"  :class="($route.name==='keyBackup')? 'is-actived ' : 'radius'">密钥备份</el-menu-item>
                    <el-menu-item index="keyRecovery"  :class="($route.name==='keyRecovery')? 'is-actived ' : 'radius'">密钥恢复</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <img src="../../../assets/index/4-1.png" alt=""  :class="($route.name==='checkLog' || $route.name==='logPolicy' ||$route.name==='logging')? 'example2' : 'example1'">
                    <img src="../../../assets/index/4-2.png"
                        alt=""
                        :class="($route.name==='checkLog' || $route.name==='logPolicy' ||$route.name==='logging')? 'example1' : 'example2'">
                    <span
                        :class="($route.name==='checkLog' || $route.name==='logPolicy' ||$route.name==='logging')? 'is-activing' : 'is-null'"
                    >日志管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/home/checkLog" class="radius2" :class="($route.name==='checkLog')? 'is-actived ' : 'radius'">查看日志信息</el-menu-item>
                    <el-menu-item index="/home/logPolicy" class="radius2" :class="($route.name==='logPolicy')? 'is-actived ' : 'radius'">日志归档策略</el-menu-item>
                    <el-menu-item index="/home/logging" class=" radius2" :class="($route.name==='logging')? 'is-actived ' : 'radius'">日志归档记录</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <img src="../../../assets/index/5-1.png" alt=""  
                         :class="($route.name==='deviceStartEnd' || $route.name==='basicInfo' || $route.name==='equipSelf' || $route.name==='whiteList' ||$route.name==='netConfig')? 'example2' : 'example1'">
                    <img src="../../../assets/index/5-2.png"
                        alt=""
                        :class="($route.name==='deviceStartEnd' || $route.name==='basicInfo' || $route.name==='equipSelf' || $route.name==='whiteList' ||$route.name==='netConfig')? 'example1' : 'example2'">
                    <span
                      :class="($route.name==='deviceStartEnd' || $route.name==='basicInfo' || $route.name==='equipSelf' || $route.name==='whiteList' ||$route.name==='netConfig')? 'is-activing' : 'is-null'"
                    >设备管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/home/basicInfo" class="radius2"  :class="($route.name==='basicInfo')? 'is-actived ' : 'radius'">设备基本信息</el-menu-item>
                    <el-menu-item index="/home/equipSelf"  :class="($route.name==='equipSelf')? 'is-actived ' : 'radius'">设备自检</el-menu-item>
                    <el-menu-item index="/home/whiteList" class="radius3"  :class="($route.name==='whiteList')? 'is-actived ' : 'radius'">白名单管理</el-menu-item>
                    <el-menu-item index="/home/netConfig"   :class="($route.name==='netConfig')? 'is-actived ' : 'radius'">网络配置</el-menu-item>
                    <el-menu-item index="/home/deviceStartEnd"   :class="($route.name==='deviceStartEnd')? 'is-actived ' : 'radius'">设备启停</el-menu-item>
                </el-menu-item-group>
            </el-submenu>                  
        </el-menu>
    </div>
</template>

<script>
export default {
    name:'navbar',
    watch: {
        // $route: "watchRoute"
    },
    // mounted(){
    //     this.watchRoute();
    // },
}
</script>

<style lang="scss" scoped>
   .el-menu-item,.el-submenu{
       text-align:center;
       position: relative;
       img{
           display: inline;
           position: absolute;
           top:20px;
           left: 68px;
           padding-right: 10px;
       }
   }
</style>
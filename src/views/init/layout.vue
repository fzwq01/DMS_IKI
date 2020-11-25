<template>
    <div class="init-layout">
        <div class="logo">

        </div>

        <div class="bgContainer"></div>
        <div class="main-content">
            <div class="slogan">
                <div class="version">{{version}}</div>
            </div>
            <router-view></router-view>
        </div>


        <div>这是B改变的内容</div>
    </div>
</template>

<script>
    import {getVersion, getInitState} from "../../api/init/initApi";

    export default {
        name: "layout",
        data() {
            return {
                version: ""
            }
        },
        async created() {
            let version = await getVersion()
            this.version = version.data;
            let initState = await getInitState();

            //0 初始化完成
            if (initState.data == '0') {
                this.$router.push({name: "login"})
            }

            //1 初始化未开始
            if (initState.data == '1') {
                this.$router.push({name: 'masterAuth'})
            }
        }
    }
</script>

<style scoped lang="scss">
    .init-layout {
        display: flex;
        height: 100%;
        width: 100%;
        background: #edf5fe;
        flex-direction: column;
        position: relative;
        min-width: 1100px;

        .bgContainer {
            flex-basis: 50%;
            background-image: url('../../assets/init/initBg.png');
            background-size: cover;
        }

        .logo {
            position: absolute;
            top: 40px;
            left: 0;
            background-image: url("../../assets/logo.png");
            background-repeat: no-repeat;
            background-position: 40px center;
            height: 60px;
            width: 200px;

        }

        .main-content {
            width: 1100px;
            min-height: 650px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -550px;
            margin-top: -325px;
            background: #fff;
            border-radius: 12px;

            .slogan {
                height: 174px;
                background: url("../../assets/init/slogan.png") no-repeat;
                position: relative;

                .version {
                    color: #fff;
                    font-size: 14px;
                    position: absolute;
                    bottom: 60px;
                    right: 200px;
                }
            }
        }
    }
</style>

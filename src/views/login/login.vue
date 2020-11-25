<template>
    <div id="loginContainer">
        <div class="loginArea">
            <div class="loginContent">
                <div class="loginHead"></div>
                <div class="loginForm">
                    <span class="title">UKey登录</span>
                    <div class="mainContent" v-if="!USB">
                        <div><img src="../../assets/bigUkey.png"/></div>
                        <span>请插入UKey</span>
                    </div>
                    <loginForm v-else/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import loginForm from '../../components/login/loginForm'
export default {
    name:'login',
    components:{ loginForm },
    computed: {
        ...mapState(['USB'])
    },
}
</script>

<style scoped lang="scss">
    #loginContainer{
        width:100%;
        height:100%;
        background-image: url('../../assets/loginBg.png');
        background-repeat: repeat-x;
        background-position: center;
        background-size: 100% 100%;
        position: relative;

        .loginArea{
            width:630px;
            min-height:640px;
            display: flex;
            background-color: #5da9f2;
            border-radius: 6px;
            padding:10px;
            box-sizing: border-box;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);

            .loginContent{
                width:100%;
                border-radius: 6px;
                background-color: #fff;

                .loginHead{
                    height:195px;
                    background-image: url('../../assets/loginHead.png');
                    background-repeat: repeat-x;
                    background-position: center;
                    background-size: 100% 100%;
                }

                .loginForm{
                    padding:40px 70px;
                    display: flex;
                    flex-direction: column;
                    
                    .title{
                        color:#0089ff;
                        font-size: 22px;
                        text-align: left;
                    }

                    .mainContent{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-top:70px;

                        span{
                            color:#0089ff;
                            font-size: 18px;
                            margin-top:15px
                        }
                        
                    }
                }
            }
        }
    }
</style>
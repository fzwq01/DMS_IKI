<template>
    <div class="home">
        <div class="left_content">
            <mean-header class="mean_header"></mean-header>
            <nav-bar class="menu"></nav-bar>
        </div>
        <div class="right_content">
            <right-header class="right-header"></right-header>
             <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import meanHeader from '../../components/manage/index/meanHeader'
import navBar from '../../components/manage/index/navBar'
import rightHeader from '../../components/manage/index/rightHeader'

export default {
    name:'home',
    data(){
        return{
            
        }
    },
    components:{
        meanHeader,
        navBar,
        rightHeader
    }
}
</script>

<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
    min-width: 930px;
    display: flex;
    flex-direction: row;
    .left_content{
        flex-basis: 265px;
        display: flex;
        flex-direction: column;

        .mean_header{
            flex-basis: 70px;
        }

        .menu{
            flex-grow: 1;
        }
    }
    .right_content{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        border-radius: 22px;
        box-shadow: 0 -10px 21px 2px #EAF0F6;
        z-index: 10;

        .right-header{
            flex-basis: 70px;
            border-bottom: 1px solid #ECF3FD;

        }
        .content{
            flex-grow: 1;
            padding: 40px 20px 30px 20px;
            box-sizing: border-box;
        }
    }
}
</style>
<template>
    <div class="contentContainer" id="contentContainer">
        <div class="tools">
            <span>{{title}}</span>
            <span> > </span> 
            <span>{{title2}}</span>
        </div>
        <div class="tableContent">
            <slot name='table'></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'contents',
    props:['title','title2']
}
</script>

<style lang="scss" scoped>
// 内容插件
.contentContainer{
    padding:0px 15px 20px 15px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .tool{
        font-size: 24px;
    }

    .tools{
        min-height:70px;
        flex-basis: 70px;
        text-align: left;

        span{
            font-size: 24px;
            color:#333;
        }

    }

    .tableContent{
        flex-grow: 1;
        overflow: hidden;
    }
}
</style>
<template>
    <div id="stepContainer">
        <slot name="img"></slot>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'StepContent',
}
</script>

<style scoped lang="scss">
    #stepContainer{
        padding-top:50px
    }
</style>
<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/administratorSettings.png" alt="">
        <localManagerConfigComponent />
    </StepContent>
</template>

<script>
import StepContent from '../common/StepContent'
import localManagerConfigComponent from '../common/localManagerConfig'
export default {
    name:'administratorSettings',
    components:{ StepContent, localManagerConfigComponent }
}
</script>
<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/local-managerConfig.png" alt="">
        <localManagerConfigComponent />
    </StepContent>
</template>

<script>
import StepContent from '../common/StepContent'
import localManagerConfigComponent from '../common/localManagerConfig'
export default {
    name: "localManagerConfig",
    components:{ StepContent, localManagerConfigComponent }
}
</script>


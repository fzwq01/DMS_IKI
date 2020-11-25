<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/networkConfig-local.png" alt="">
        <networkConfigComponent />
    </StepContent>
</template>

<script>
import StepContent from '../common/StepContent'
import networkConfigComponent from '../common/networkConfig'
    export default {
        name: "networkConfig",
        components: { StepContent, networkConfigComponent },
    }
</script>

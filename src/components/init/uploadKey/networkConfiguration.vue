<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/networkConfiguration.png" alt="">
        <networkConfigComponent />
    </StepContent>
</template>

<script>
import StepContent from '../common/StepContent'
import networkConfigComponent from '../common/networkConfig'
export default {
    name:'networkConfiguration',
    components:{ StepContent, networkConfigComponent }
}
</script>
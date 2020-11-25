<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/deviceKeyProduction.png" alt="">
        <deviceKeyProduceComponent />
    </StepContent>
</template>

<script>
import StepContent from '../common/StepContent'
import deviceKeyProduceComponent from '../common/deviceKeyProduce'
export default {
    name:'deviceKeyProduction',
    components:{ StepContent, deviceKeyProduceComponent }
}
</script>
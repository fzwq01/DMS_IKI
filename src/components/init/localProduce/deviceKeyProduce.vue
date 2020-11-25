<template>
    <StepContent>
        <img slot="img" src="../../../assets/init/deviceKeyProduce.png" alt="">
        <deviceKeyProduceComponent />
    </StepContent>
</template>

<script>
    import deviceKeyProduceComponent from '../common/deviceKeyProduce'
    import StepContent from '../common/StepContent'
    export default {
        name: "deviceKeyProduce",
        components:{ deviceKeyProduceComponent, StepContent }
    }
</script>

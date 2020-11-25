<template>
    <contents title = "密钥管理" title2 = "密钥备份">
        <div slot="table">
            <firstStep @nextStep="step = 2" v-if="step == 1"/>
            <secondStep @nextStep="step = 3" @cancel="step = 1" v-if="step == 2"/>
            <thirdStep @nextStep="step = 2" v-if="step == 3"/>
        </div>
    </contents>
</template>

<script>
import contents from '../../../components/common/content'
import firstStep from '../../../components/manage/keyManagement/firstStep'
import secondStep from '../../../components/manage/keyManagement/secondStep'
import thirdStep from '../../../components/manage/keyManagement/thirdStep'

export default {
    name:'keyBackup',
    components:{ contents, firstStep, secondStep, thirdStep },
    data(){
        return{
            step:1
        }
    },
}
</script>
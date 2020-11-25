<template>
    <contents title = "密钥管理" title2 = "密钥恢复">
        <div slot="table">
            <recoverFirstStep @nextStep="nextStep" v-if="step == 1"/>
            <recoverSecondStep @nextStep="step = 3" @cancel="step = 1" v-if="step == 2"/>
            <recoverThirdStep :publicKey="publicKey" @cancel='step = 1' @nextStep="step = 1" v-if="step == 3"/>
        </div>
    </contents>
</template>

<script>
import { errorMsg } from "../../../util/msg"
import contents from '../../../components/common/content'
import recoverFirstStep from '../../../components/manage/keyManagement/recoverFirstStep'
import recoverSecondStep from '../../../components/manage/keyManagement/recoverSecondStep'
import recoverThirdStep from '../../../components/manage/keyManagement/recoverThirdStep'
import { recoverSecretKeyBegin } from '../../../api/manage/keyManagement' //开始密钥恢复

export default {
    name:'keyRecovery',
    components:{ contents, recoverFirstStep, recoverSecondStep, recoverThirdStep },
    data(){
        return{
            step:1,
            publicKey:'' //公钥
        }
    },
    methods:{
        async nextStep(){
            this.step = 2
            let recoverResult = await recoverSecretKeyBegin()
            if (recoverResult.code != '0') {
                errorMsg(recoverResult.message)
                return
            }
            this.publicKey = recoverResult.data 
        }
    }
}
</script>
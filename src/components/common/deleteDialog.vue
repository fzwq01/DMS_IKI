<template>
    <div id="dialogContaniner">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="480px" :before-close="handleClose" top="30vh" :modal-append-to-body="false">
            <div class="pictArea">
                <div><img src="../../assets/error.png" /></div>
                <div class="textArea">
                    <!-- <span v-if="text.length < 30">{{text.length > 30?text.split('，')[0]+'，'+text.split('，')[1]+'，':text}}</span> -->
                    <span class="lastText">{{text}}</span>
                </div>
            </div>
            <div class="bottomBtn">
                <button class="cancelBtn" @click.stop.prevent="cancel">取 消</button>
                <button class="trueBtn" @click.stop.prevent="submitForm">{{content}}</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'deleteDialog',
    props:['title','text'],
    data(){
        return{
            dialogVisible:false,
            content:'确 定'
        }
    },
    methods:{
        handleClose( done ) {
            done();
        },
        cancel(){
            this.dialogVisible = false;
        },
        //确定
        submitForm( formName ) {
            this.dialogVisible = false;
            this.$emit('submit');
        },
    },
}
</script>

<style scoped lang="scss">
    #dialogContaniner{
        .pictArea{
            display: flex;
            flex-direction: column;
            align-items: center;

            .textArea{
                display: flex;
                flex-direction: column;

                span{
                    font-size: 14px;
                    color:red;
                }

                .lastText{
                    margin-top:10px
                }
            }
        }
        .bottomBtn{
            text-align: right;
            margin-top:30px;

            .cancelBtn{
                margin-right:20px
            }
        }
    }
</style>
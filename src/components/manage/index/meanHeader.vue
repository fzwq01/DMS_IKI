<template>
  <div class="mean-header">
      <div class="logo">
          <img src="../../../assets/index/logo.png" alt="">
      </div>
      <div class="clears"></div>
  </div>
</template>

<script>
export default {
    name:'mean-header',
    data(){
        return{
            managerName:'..管理员'
        }
    }
}
</script>

<style lang="scss" scoped>
.mean-header{
    width: 100%;
    height: 100%;
    .logo{
        width: 270px;
        line-height: 76px;
        float: left;
        img{
            vertical-align: middle;
        }
    }
    .right{
        float: right;
        width: 380px;
        line-height: 76px;
        margin-right: 30px;
        div{display: inline-block;}
        .name{
            img{position: relative;top: 10px;}
        }
        .name,.alter,.exit{
            width: 130px;
            float: left;
            cursor: pointer;
            img{
                margin-right: 10px;
            }
            div{
                font-size: 16px;
                &:hover{
                    // color:#000;
                }
            }
        }
        .alter{
            position: relative;
            &::after{
                content:'';
                width:1px;
                height:10px;
                position: absolute;
                top: 20px;
                background: #A3A6B2;
                margin-left: 26px;
                height: 34px;
            }
        }
        .exit{
            width:120px;
            .exit_pic{
                position: relative;
                top:2px;
            }
        }
    }
}
</style>
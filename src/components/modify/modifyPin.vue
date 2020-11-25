<template>
  <div>
      <div class="modify">修改PIN码</div>
      <div class="modify_bottom">
          <modify-table></modify-table>
      </div>

  </div>
</template>

<script>
import modifyTable from './modifyTable'
export default {
    name:'modifyPin',
    components:{
        modifyTable
    }
}
</script>

<style lang="scss" scoped>
.modify{
    min-height:70px;
    flex-basis: 70px;
    text-align: left;
    font-size: 24px;
    color:#333;
}
.modify_bottom{
    width:100%;
}
</style>
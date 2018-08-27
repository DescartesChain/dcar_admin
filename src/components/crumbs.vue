<template>
<div class="crumbs">
 <span class="one">HOME</span>
 <span class="two"><b>/</b><slot></slot></span>
</div>
</template>

<script>
export default {
  name: 'Crumbs'
}
</script>

<style lang="scss" scoped>
.crumbs {
  height: 80px;
  line-height: 80px;
  padding: 0 52px;
  background-color: #ffffff;
  box-shadow: 0px -1px 20px rgba(135, 150, 193, 0.49) inset;
  .one {
    color: #4349dd;
  }
  .two {
    color: #a1aed2;
    b {
      margin: 0 5px;
    }
  }
}
</style>

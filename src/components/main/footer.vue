<template>
  <div id="footer" class="text-center">
    <div class="copyright">
      <p>LIFE PLUS享家點 所有圖片皆來自於網路</p>
      <p style="font-size: 14px">Copyright © 2020</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="stylus" scoped>
#footer{
  width 72.5%
  height 100px
  margin 10px auto
  background white
  padding-top 16px
  border-top 1px solid var(--brown1)
  @media screen and (max-width: 768px) {
    width 90%
  }
}
</style>

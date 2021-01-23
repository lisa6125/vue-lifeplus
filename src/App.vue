<template lang="pug">
  div#app
    router-view(:key="$route.fullPath")
</template>

<script>
import '../src/assets/css/variable.scss'
export default {
  name: 'App',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$alert.success('登出成功')
            // 清除 vuex
            this.$store.commit('logout')

            // 導回首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            this.$alert.error(res.data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
          this.$alert.error(error.response.data.message)
        })
    },
    heartbeat () {
      this.axios
        .get('http://localhost:3000' + '/users/heartbeat')
        .then(res => {
          // 如果 vuex 是登入中
          if (this.user._id.length > 0) {
            // 但是後端沒登入
            if (!res.data) {
              this.$alert.error('登入時效已過')
              // 登出
              this.$store.commit('logout')
              // 導回首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(err => {
          this.$alert.error('發生錯誤')
          console.log(err)
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 5000)
  }
}
</script>

<style lang="stylus">
@import "./assets/css/_reset.scss"
@media screen and (max-width:768px){
  #topnav{
    display:none
  }
}
</style>

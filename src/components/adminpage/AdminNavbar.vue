<template>
  <div id="adminnavbar">
    <nav class="navbar navbar-expand-lg navbar-light px-5">
      <router-link class="navbar-brand" :to="`/`">享家點後台</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link text-center m-2" :to="`/admin`">
              <span data-feather="file"></span>
              <font-awesome-icon
                :icon="['fas', 'archive']"
                size="lg"
              ></font-awesome-icon
              >&ensp;商品管理
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-center m-2"
              :to="`/admin/controlshare`"
            >
              <span data-feather="shopping-cart"></span>
              <font-awesome-icon
                :icon="['fas', 'pen-nib']"
                size="lg"
              ></font-awesome-icon
              >&ensp;分享管理
            </router-link>
          </li>
          <!--
          <li class="nav-item">
            <a class="nav-link text-center m-2" href="#">
              <span data-feather="users"></span>
              <font-awesome-icon :icon="['fas','id-card']" size="lg"></font-awesome-icon>&ensp;
              會員管理
            </a>
          </li> -->
          <li class="nav-item">
            <router-link
              class="nav-link text-center m-2"
              :to="`/admin/controlorder`"
            >
              <span data-feather="bar-chart-2"></span>
              <font-awesome-icon
                :icon="['fas', 'list-alt']"
                size="lg"
              ></font-awesome-icon
              >&ensp; 訂單管理
            </router-link>
          </li>
          <li class="nav-item text-center m-2">
            <router-link class="nav-link" :to="`/admin/controlreply`">
              <span data-feather="layers"></span>
              <font-awesome-icon
                :icon="['fas', 'mail-bulk']"
                size="lg"
              ></font-awesome-icon
              >&ensp; 回覆管理
            </router-link>
          </li>
          <li class="nav-item text-center m-2">
            <a class="nav-link" href="#" @click="logout">登出</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminNavbar',
  methods: {
    logout() {
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
  },
}
</script>
<style lang="stylus" scoped>
#adminnavbar{
  nav{
    background var(--brown3)
    .navbar-brand{
      font-size 1.5rem
    }
  }
}
</style>

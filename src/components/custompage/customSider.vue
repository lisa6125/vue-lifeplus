<template>
  <div id="customsidebar">
    <nav class="col-md-2 d-none d-md-block left sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-center m-2 active" href="#">
              {{ userName }}會員中心
            </a>
          </li>
          <router-link class="nav-item text-decoration-none" to="/custom/">
            <li class="nav-link text-center m-2 text-decoration-none">
              <font-awesome-icon
                :icon="['fas', 'archive']"
                size="lg"
              ></font-awesome-icon
              >&ensp;個人資料
            </li>
          </router-link>
          <router-link
            class="nav-item text-decoration-none"
            to="/custom/orderdetail"
          >
            <li class="nav-link text-center m-2">
              <font-awesome-icon
                :icon="['fas', 'pen-nib']"
                size="lg"
              ></font-awesome-icon
              >&ensp;訂單查詢
            </li>
          </router-link>
          <router-link
            class="nav-item text-decoration-none"
            to="/custom/sharedetail"
          >
            <li class="nav-link text-center m-2">
              <font-awesome-icon
                :icon="['fas', 'id-card']"
                size="lg"
              ></font-awesome-icon
              >&ensp; 分享回饋
            </li>
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'customSider',
  computed: {
    userName() {
      return this.$store.state.user.name
    },
  },
}
</script>

<style lang="stylus" scoped>
// #customsidebar nav{
//   z-index :-1;
// }
</style>

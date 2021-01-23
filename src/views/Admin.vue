<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container-fluid px-5">
      <div class="row">
        <div class="col-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/dashboard.scss'
import AdminNavbar from '../components/adminpage/AdminNavbar'
export default {
  components: {
    AdminNavbar,
  },
  name: 'Admin',
}
</script>

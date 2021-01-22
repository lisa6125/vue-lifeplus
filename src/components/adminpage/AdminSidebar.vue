<template>
  <div id="adminsidebar">
    <nav class="col-md-2 d-none d-md-block left sidebar" >
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-center active" href="#">
              <span data-feather="home"></span>
              管理員
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center m-2" href="#/admin/">
              <span data-feather="file"></span>
              <font-awesome-icon :icon="['fas','archive']" size="lg"></font-awesome-icon>&ensp;商品管理
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center m-2" href="#">
              <span data-feather="shopping-cart"></span>
              <font-awesome-icon :icon="['fas','pen-nib']" size="lg"></font-awesome-icon>&ensp;回饋管理
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center m-2" href="#">
              <span data-feather="users"></span>
              <font-awesome-icon :icon="['fas','id-card']" size="lg"></font-awesome-icon>&ensp;
              會員管理
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center m-2" href="#">
              <span data-feather="bar-chart-2"></span>
              <font-awesome-icon :icon="['fas','list-alt']" size="lg"></font-awesome-icon>&ensp;
              訂單管理
            </a>
          </li>
          <li class="nav-item text-center m-2">
            <a class="nav-link" href="#">
              <span data-feather="layers"></span>
              <font-awesome-icon :icon="['fas','mail-bulk']" size="lg"></font-awesome-icon>&ensp;
              回覆管理
            </a>
          </li>
        </ul>

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              Current month
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              Last quarter
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              Social engagement
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminSidebar'
}
</script>

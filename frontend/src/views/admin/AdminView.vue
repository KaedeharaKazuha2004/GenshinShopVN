<template>
  <div class="container container-fluid py-4">
    <div class="row">
      <div class="col col-4">
        <div class="card border-info mb-3 shadow shadow-sm bg-light">
          <div class="card-body">
            <h5 class="card-title fw-semibold"><i class="fa-solid fa-users"></i> KHÁCH HÀNG</h5>
            <hr>
            <p class="card-text">Quản lý thông tin khách hàng</p>
            <RouterLink to="/admin/customers" class="btn btn-primary"><i class="fa-solid fa-circle-arrow-right"></i> Xem </RouterLink>
          </div>
        </div>
      </div>
      <div class="col col-4">
        <div class="card border-info mb-3 shadow shadow-sm bg-light">
          <div class="card-body">
            <h5 class="card-title fw-semibold"><i class="fa-solid fa-cart-flatbed"></i> HÀNG HÓA</h5>
            <hr>
            <p class="card-text">Quản lý thông tin hàng hóa</p>
            <RouterLink to="/admin/products" class="btn btn-primary"><i class="fa-solid fa-circle-arrow-right"></i> Xem </RouterLink>
          </div>
        </div>
      </div>
      <div class="col col-4">
        <div class="card border-info mb-3 shadow shadow-sm bg-light">
          <div class="card-body">
            <h5 class="card-title fw-semibold"><i class="fa-regular fa-copy"></i> ĐƠN HÀNG</h5>
            <hr>
            <p class="card-text">Quản lý đơn hàng</p>
            <RouterLink to="/admin/invoices" class="btn btn-primary"><i class="fa-solid fa-circle-arrow-right"></i> Xem </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminView'
}
</script>

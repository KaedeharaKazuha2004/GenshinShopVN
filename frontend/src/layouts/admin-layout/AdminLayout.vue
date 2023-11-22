<template>
  <div class="wrapper">
    <AdminHeader />
    <div class="inner">
      <AdminSidebar />
      <div class="content">
        <div class="container-fluid" style="padding-top: 15px;">
          <div class="card text-bg-dark mb-3">
            <div class="card-header"><i class="fa-solid fa-circle-exclamation" style="color: yellow;"></i> LƯU Ý</div>
              <div class="card-body">
                <h5 class="card-title">Đây là trang web dành cho quản trị viên</h5>
                <p class="card-text">Trang quản lý đơn hàng, khách hàng và sản phẩm của shop. Chỉ quản trị viên mới có thể xem được toàn bộ nội dung.</p>
              </div>
            </div>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/AdminHeader.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import { useUserStore } from '@/stores/user'
import { RouterView } from 'vue-router'

export default {
  name: 'AdminLayout',
  components: { RouterView, AdminHeader, AdminSidebar },
  data() {
    const userStore = useUserStore()
    return { userStore }
  },
  computed: {
    isAdmin() {
      return this.userStore.isAdmin()
    }
  },
  mounted() {
    if (!this.isAdmin) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.inner {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow: auto;
}
</style>

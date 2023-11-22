<template>
  <div class="sidebar" :class="{ open: isOpened }">
    <div class="item-list">
      <AdminSidebarItem 
        path="/admin" 
        icon="fa-solid fa-house" 
        title="TRANG CHỦ" 
        :show-title="isOpened" 
      />
      <AdminSidebarItem
        path="/admin/customers"
        icon="fa-solid fa-users"
        title="KHÁCH HÀNG"
        :show-title="isOpened"
      />
      <AdminSidebarItem
        path="/admin/products"
        icon="fa-solid fa-dolly"
        title="HÀNG HÓA"
        :show-title="isOpened"
      />
      <AdminSidebarItem
        path="/admin/invoices"
        icon="fa-regular fa-copy"
        title="ĐƠN HÀNG"
        :show-title="isOpened"
      />
      <AdminSidebarItem
        path="/"
        icon="fa-solid fa-arrow-left"
        title="QUAY VỀ TRANG WEB"
        :show-title="isOpened"
      />
    </div>

    <div class="back-btn" @click="toggle">
      <i class="fa-solid" :class="{ 'fa-arrow-left': isOpened, 'fa-arrow-right': !isOpened }"></i>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AdminSidebarItem from './AdminSidebarItem.vue'

export default {
  name: 'AdminSidebar',
  components: { AdminSidebarItem },
  data() {
    const isOpened = ref(true)

    return { isOpened }
  },
  methods: {
    toggle() {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 64px;
  border-right: 1px solid white;
  background: black;
  display: flex;
  flex-direction: column;
  transition: 0.6s ease;
}

.sidebar.open {
  width: 250px;
}

.item-list {
  flex: 1;
  overflow: auto;
}

.back-btn {
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
}

.back-btn:hover {
  background: black;
}
</style>

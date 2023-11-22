<template>
  <nav class="navbar navbar-expand-lg border-bottom">
    <div class="container px-4 px-lg-5">
      <RouterLink class="navbar-brand" to="/">
        <img src="../assets/images/sticker_22.png" style="width: 32px; height: 32px;"> <img src="../assets/images/logo-genshin-impact-42374.png" style="width: 80px; height: 50px;"> Shop VN 
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <RouterLink to="/">
            <li class="nav-item">
              <a class="nav-link fw-semibold" aria-current="page">TRANG CHỦ</a>
            </li>
          </RouterLink>
          <RouterLink to="/customer">
            <li class="nav-item" v-if="isLogged">
              <a class="nav-link fw-semibold" aria-current="page">THÔNG TIN TÀI KHOẢN</a>
            </li>
          </RouterLink>
        </ul>
        <div class="d-flex gap-1">
          <RouterLink class="btn btn-outline-dark" to="/cart">
            <i class="fa-solid fa-cart-shopping"></i> Cart<span
              class="badge bg-dark text-white ms-1 rounded-pill"
              > {{ numberOfItem }}</span
            >
          </RouterLink>

          <div class="dropdown" :class="{ show: showModal }" v-if="isLogged" @click="toggleModal">
            <button class="btn btn-secondary dropdown-toggle" type="button">
              <i class="fa-solid fa-user"></i> {{ user?.ten }}
            </button>
            <ul class="dropdown-menu" :class="{ show: showModal }">
              <li>
                <RouterLink class="dropdown-item" to="/customer">
                  <i class="fa fa-user"></i>
                  Thông tin tài khoản
                </RouterLink>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="logout">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  Đăng xuất</a
                >
              </li>
            </ul>
          </div>

          <RouterLink to="/auth/login" v-else-if="$route.path !== '/auth/login'">
            <button class="btn btn-primary"><i class="fa-solid fa-user"></i> Đăng nhập</button>
          </RouterLink>

          <RouterLink to="/auth/register" v-else>
            <button class="btn btn-primary"><i class="fa-solid fa-user"></i> Đăng ký</button>
          </RouterLink>
          <div style="padding-left: 25px;"></div>
          <RouterLink class="btn btn-sm btn-danger" to="/admin" v-if="isAdmin" style="height: 30px;">
            <i class="fa fa-shield"></i>
            Admin Panel
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },

  data() {
    const cartStore = useCartStore()
    const userStore = useUserStore()
    const showModal = ref(false)
    const cart = ref(cartStore.cart)
    return {
      userStore,
      cartStore,
      cart,
      showModal
    }
  },
  watch: {
    cartStore() {
      this.cart = cartStore.cart
    },
    cart() {}
  },
  methods: {
    toggleModal(event) {
      event.stopPropagation()

      this.showModal = !this.showModal
    },
    onWindowClick() {
      this.showModal = false
    },
    logout() {
      this.userStore.logout().then(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    isLogged() {
      return this.userStore.isLogged()
    },
    user() {
      return this.userStore.user
    },
    isStaff() {
      return this.userStore.user?.role === 'nhanvien'
    },
    isAdmin() {
      return this.userStore.isAdmin()
    },
    numberOfItem() {
      console.log(this.cartStore.cart)
      return this.cartStore.cart ? this.cartStore.cart.length : 0
    }
  },
  mounted() {
    window.addEventListener('click', this.onWindowClick)
  },
  unmounted() {
    window.removeEventListener('click', this.onWindowClick)
  }
}
</script>



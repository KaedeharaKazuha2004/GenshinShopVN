<template>
  <div>
    <AppHeader />

    <div class="bg-light">
      <RouterView />
    </div>

    <footer id="footer" class="py-3 bg-dark position-relative start-0 end-0 bottom-0" style="height: 60px; position: fixed;">
      <div class="container-fluid">
        <p class="m-0 float-start text-white">
          Copyright &copy; {{ new Date().getFullYear() }} by B2207567 - Vu Duc Thang
        </p>
        <p class="m-0 float-end text-white">
          <a href="https://www.facebook.com/vuducthang.3576/"><i class="fa-brands fa-facebook"></i></a>
          <a href="https://www.instagram.com/vuducthang2004/"><i class="fa-brands fa-instagram" style="padding-left: 10px;"></i></a>
          <a href="https://twitter.com/Scorbun96857469"><i class="fa-brands fa-x-twitter" style="padding-left: 10px;"></i></a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'

export default {
  name: 'CustomerLayout',
  components: {
    AppHeader,
    RouterView
  }
}
</script>

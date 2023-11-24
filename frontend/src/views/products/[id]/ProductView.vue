<template>
  <div class="container py-4 animate__animated animate__fadeIn">
    <span class="spinner-border" v-if="!product"></span>
    <div class="row" v-else>
      <div class="col col-12 col-md-6">
        <img
          v-if="product.images[imgIndex]"
          :src="fileService.getFileUrl(product.images[imgIndex].path)"
          :alt="product.images[imgIndex].ten"
          style="width: 100%; aspect-ratio: 1; object-fit: cover"
          class="rounded border"
        />

        <div class="d-flex gap-2 my-2" style="position: relative; z-index: 1; overflow-x: auto; white-space: nowrap;">
          <img
            v-for="(image, index) in product.images"
            :key="image.id"
            :src="fileService.getFileUrl(image.path)"
            :alt="image.ten"
            style="width: 150px; aspect-ratio: 1; cursor: pointer; position: relative; z-index: 1;"
            class="border rounded border-2"
            :class="{
              'border-primary': imgIndex === index
            }"
            @click="imgIndex = index"
          />
        </div>
      </div>

      <div class="col col-12 col-md-6">
        <h2 class="fw-semibold">{{ product.ten }}</h2>

        <p>
          {{ product.mota }}
        </p>
  
        <div class="row">
          <div class="col col-12 col-md-3 mb-3">
            <button class="btn btn-success" disabled>{{vndFormat(product.gia)}}</button>
          </div>
          <div class="col col-12 col-md-3 mb-3">
            <button class="btn btn-secondary" disabled>Còn lại: {{ product.soluong }}</button>
          </div>
          <div class="col col-12 col-md-6 mb-3">
            <div class="input-group">
              <span class="input-group-text">Số lượng</span>
              <input
                class="form-control"
                type="number"
                v-model="quantity"
                min="1"
                :max="product.soluong"
              />
            </div>
          </div>
        </div>
        <a href="#" @click="addToCart" class="btn btn-primary d-block mb-2">
          <i class="fa fa-cart-plus"> </i>
            Thêm vào giỏ hàng
        </a>
        <a href="#" class="btn btn-success d-block" @click="buy"><i class="fa-solid fa-check"></i> Mua </a>
        <div v-if="cartItem">
          Đã có <span style="font-weight: bold">{{ cartItem.soluong }}</span> sản phẩm này trong giỏ
          hàng
        </div>
      </div>
    </div>
    <hr>
    <h3 class="fw-semibold">CÁC SẢN PHẨM KHÁC</h3>

    <div class="row">
      <div
        class="col col-12 col-md-4 col-lg-3 col-xl-2 mb-2 p-1"
        v-for="product in otherProducts"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import fileService from '@/services/file.service'
import hanghoaService from '@/services/hanghoa.service'
import { useCartStore } from '@/stores/cart'
import vndFormat from '@/utils/vndFormat'
import { ref } from 'vue'

const cartStore = useCartStore()

export default {
  name: 'ProductView',
  data() {
    const product = ref(null)
    const imgIndex = ref(0)
    const quantity = ref(1)
    const cartItem = ref(null)
    const otherProducts = ref([])
    return { product, fileService, imgIndex, quantity, cartItem, otherProducts }
  },
  watch: {
    product(value) {
      if (!value) return
      this.cartItem = cartStore.getItemById(value.id)
    },
    cartStore() {
      if (!this.product) return
      this.cartItem = cartStore.getItemById(this.product.id)
    },
    $route() {
      this.getProductData()
    }
  },
  methods: {
    async getProductData() {
      try {
        const { id } = this.$route.params
        const res = await hanghoaService.getById(id)
        this.product = res
      } catch (error) {
        console.log(error)
      }
    },
    addToCart() {
      cartStore.addToCart({
        id: this.product.id,
        soluong: this.quantity
      })
      this.cartItem = cartStore.getItemById(this.product.id)
      this.$toast.success('Thêm vào giỏ hàng thành công!', { position: 'top-right' })
    },
    vndFormat,
    async getOtherProducts() {
      try {
        this.otherProducts = (await hanghoaService.getAll()).data
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    buy() {
      this.addToCart()
      this.$router.push('/cart')
    }
  },
  beforeMount() {
    this.getProductData()
    this.getOtherProducts()
  },
  components: { ProductCard }
}
</script>

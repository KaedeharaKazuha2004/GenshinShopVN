<template>
  <div class="container py-4" v-if="invoice">
    <div class="card border-danger shadow shadow-sm" style="max-width: 480px; margin: 0 auto">
      <div class="card-header fw-semibold">CẢNH BÁO</div>
      <div class="card-body">
        <h5 class="card-title fw-semibold">
          XÓA ĐƠN HÀNG #<span style="font-weight: bold">{{ invoice.id }}</span>
        </h5>
        <hr>
        <p class="card-text">Bạn có chắc chắn muốn xóa đơn hàng này không</p>
        <p class="card-text"><i class="fa-solid fa-circle-exclamation" style="color: yellow;"></i> LƯU Ý: Bạn sẽ không thể hoàn tác lại quá trình này sau khi ấn nút xác nhận xóa.</p>
        <button class="btn btn-danger" @click="handleDelete">
          <span><i class="fa-solid fa-trash"></i> Tôi đã hiểu và xác nhận xóa </span>
        </button>

        <RouterLink to="/admin/invoices" class="btn"><i class="fa-solid fa-arrow-rotate-left"></i> Quay lại</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import dathangService from '@/services/dathang.service'
import { ref } from 'vue'

export default {
  name: 'AdminDeleteinvoice',
  data() {
    const invoice = ref(null)

    return { invoice }
  },
  methods: {
    async handleDelete() {
      try {
        await dathangService.deleteById(this.$route.params.id)

        this.$toast.info('Xóa đơn hàng thành công')
        this.$router.back()
      } catch (error) {
        this.$toast.error(error.message)
      }
    }
  },
  async beforeMount() {
    this.invoice = await (await dathangService.getDetail(this.$route.params.id)).data
    console.log(this.invoice)
  }
}
</script>

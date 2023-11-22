<template>
  <main>
    <header class="container-fluid bg-dark" style="position: relative;">
      <div id="carouselGenshin" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselGenshin" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselGenshin" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselGenshin" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/images/1920x1080.png" class="d-block w-100" alt="Error loading image">
          <div class="carousel-caption d-none d-md-block">
            <h5>Genshin Shop VN</h5>
            <p>Shop mua bán các vật phẩm, phụ kiện và trang phục cosplay trò chơi Genshin Impact.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/images/Genshin x XiaoHongShu.png" class="d-block w-100" alt="Error loading image">
          <div class="carousel-caption d-none d-md-block">
            <h5>Genshin x XiaoHongShu collab</h5>
            <p>"Together with Kokomi, we will protect the coral ecology" - Sự kiện collab giữa trò chơi Genshin Impact và XiaoHongShu nhằm nâng cao nhận thức về tầm quan trọng của việc bảo vệ rặng san hô dưới đại dương.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/images/Genshin x Zhihu Trivia Event.png" class="d-block w-100" alt="Error loading image">
          <div class="carousel-caption d-none d-md-block">
            <h5 style="color: black;">Genshin x Zhihu Trivia Event</h5>
            <p style="color: black;">Sự kiện collab đố vui có thưởng giữa trò chơi Genshin Impact và nền tảng hỏi đáp trực tuyến Zhihu</p>
          </div>
        </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselGenshin" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselGenshin" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </header>
    <section class="py-5">
      <div class="container px-2 px-lg-5">
        <div>
          <div class="d-flex align-items-end mb-2">
            <h3 style="font-weight: bold">SẢN PHẨM</h3>
          </div>
          <div class="d-flex align-items-end mb-2 gap-2">
            <div style="width: 250px">
              <label>Sắp xếp theo</label>
              <select
                required
                placeholder="Chon trường sắp xếp"
                class="form-select"
                v-model="sortBy"
              >
                <option value="" disabled selected>Chọn trường để sắp xếp</option>
                <option value="gia">Giá</option>
                <option value="ten">Tên</option>
                <option value="createdAt">Ngày tạo</option>
              </select>
            </div>
            <div v-if="sortBy">
              <div @click="toggleDirection" class="btn btn-secondary" v-if="direction === 1">
                <i class="fa-solid fa-sort-up"></i>
                Tăng dần (A-Z, 0-9)
              </div>
              <div @click="toggleDirection" class="btn btn-secondary" v-if="direction === -1">
                <i class="fa-solid fa-sort-down"></i>
                Giảm dần (Z-A, 9-0)
              </div>
            </div>

            <button
              @click="toggleSearchingPanel"
              class="btn btn-success"
              :class="{ 'btn-warning': isSearching }"
            >
            <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <FilterComponent
            v-if="isSearching"
            class="animate__animated animate__fadeIn filter-component"
            v-model="filter"
            title="Tìm kiếm sản phẩm"
            :items="[
              { name: 'ten', title: 'Tên' },
              { name: 'mota', title: 'Mô tả' }
            ]"
          />
        </div>

        <div
          v-auto-animate
          id="product-list-container"
          class="row gx-2 gx-lg-2 row-cols-3 row-cols-md-5 row-cols-xl-6 gap-2"
        >
          <ProductCard
            v-for="product in products"
            class="col mb-5"
            :key="product.id"
            :product="product"
          />
        </div>
        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 5px">
          <ul class="pagination" style="margin-bottom: 0">
            <li
              class="page-item"
              :class="{
                disabled: isFirstPage
              }"
              @click="prevPage"
            >
              <a class="page-link" href="#" aria-label="Previous">
                <i class="fa fa-angle-left"></i>
              </a>
            </li>
            <li
              class="page-item"
              v-for="item in total"
              :class="{ active: page === item }"
              :key="item"
              @click="page = item"
            >
              <a style="z-index: 0" class="page-link" href="#">{{ item }}</a>
            </li>
            <li
              class="page-item"
              :class="{
                disabled: isLastPage
              }"
              @click="nextPage"
            >
              <a class="page-link" href="#" aria-label="Next">
                <i class="fa fa-angle-right"></i>
              </a>
            </li>
          </ul>
          <label>Hiển thị số lượng: </label>
          <select v-model="pageSize" class="form-select" style="width: 150px">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import hanghoaService from '@/services/hanghoa.service'
import fileService from '@/services/file.service'
import vndFormat from '@/utils/vndFormat'
import FilterComponent from '@/components/FilterComponent.vue'
import { ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'HomeView',
  components: {
    FilterComponent,
    ProductCard
  },
  data() {
    const products = ref([])
    const pageSize = ref(5)
    const total = ref([])
    const page = ref(1)
    const filter = ref({ searchBy: 'ten', term: '' })
    const isLoading = ref(false)
    const sortBy = ref('')
    const direction = ref(1)
    const isSearching = ref(false)

    return {
      products,
      pageSize,
      total,
      page,
      isLoading,
      filter,
      sortBy,
      direction,
      isSearching
    }
  },
  beforeMount() {
    this.updateProductList()
  },
  watch: {
    pageSize() {
      this.updateProductList()
    },
    page() {
      this.updateProductList()
    },
    filter() {
      this.updateProductList()
    },
    sortBy() {
      this.updateProductList()
    },
    direction() {
      this.updateProductList()
    }
  },
  methods: {
    async updateProductList() {
      try {
        this.isLoading = true

        const res = await hanghoaService.getAll({
          page: this.page,
          pageSize: this.pageSize,
          ...this.filter,
          sortBy: this.sortBy,
          direction: this.direction
        })

        this.products = res.data
        const totalPages = Math.ceil(res.totalRows / this.pageSize)
        this.total = Array.from({ length: totalPages }, (_, i) => i + 1)
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.isLoading = false
      }
    },
    nextPage() {
      if (this.page < this.total.length) {
        this.page++
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--
      }
    },
    toggleDirection() {
      this.direction = this.direction === 1 ? -1 : 1
    },
    vndFormat,
    getImage(path) {
      return fileService.getFileUrl(path)
    },
    async toggleSearchingPanel() {
      if (this.isSearching) {
        const panel = document.querySelector('.filter-component')
        panel.classList.add('animate__fadeOut')
        setTimeout(() => {
          this.isSearching = !this.isSearching
          panel.classList.remove('animate__fadeOut')
        }, 800)
        return
      }
      this.isSearching = !this.isSearching
    }
  },
  computed: {
    isFirstPage() {
      return this.page === 1
    },
    isLastPage() {
      return this.page === this.total.length
    }
  }
}
</script>

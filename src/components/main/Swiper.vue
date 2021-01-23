<template>
  <div
    is="swiper"
    ref="mySwiper"
    class="sale__content swiper-container"
    :options="swiperOption"
  >
    <div
      class="swiper-slide"
      is="swiper-slide"
      v-for="sale in sales"
      :key="'sale' + sale.id"
    >
      <router-link :to="`/productdetail/${sale.id}`" target="_blank">
        <div class="sale-pic">
          <img :src="`${sale.img[0]}`" alt="" />
          <img :src="`${sale.img[1]}`" alt="" />
        </div>
        <div class="product-name">
          <h5>{{ sale.title }}</h5>
          <p>NT${{ sale.price | thousands }}</p>
        </div>
      </router-link>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        direction: 'horizontal',
        speed: 2000,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        slidesPerView: 1,
        spaceBetween: 5,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          // when window width is >= 896px
          897: {
            slidesPerView: 4
          },
          // when window width is >= 668px
          668: {
            slidesPerView: 3
          },
          // when window width is >= 569px
          569: {
            slidesPerView: 2
          }
        }
      },
      sales: [
        {
          id: '600646482806db20444307dd',
          img: [
            'https://www.ikea.com.tw/dairyfarm/tw/images/193/0719380_PE732028_S4.jpg',
            'https://www.ikea.com.tw/dairyfarm/tw/images/193/0719379_PE732027_S4.jpg'
          ],
          title: '實木餐桌',
          price: 16000
        },
        {
          id: '60064bf32806db2044430801',
          img: [
            'https://www.ikea.com.tw/dairyfarm/tw/images/289/0828965_PE680174_S4.jpg',
            'https://www.ikea.com.tw/dairyfarm/tw/images/254/0825433_PE680190_S4.jpg'
          ],
          title: '清新雙人沙發',
          price: 32000
        },
        {
          id: '60064ec22806db204443081d',
          img: [
            'https://www.ikea.com.tw/dairyfarm/tw/images/502/0750238_PH159469_S4.jpg',
            'https://www.ikea.com.tw/dairyfarm/tw/images/729/0672925_PE716965_S4.jpg'
          ],
          title: '藤編椅',
          price: 3200
        },
        {
          id:
            'VqUgrIQn2xduyroirqHVwbNEhArvZHFnyMwmdBLm2sgbSrIeJAGJNEIDrpJPHTov',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/vykOZbS2HbsT7Rym9N3vyBEUEPYGYfF5ll7EMY4W6Bw4xhXYMIXJ1XDlVFeLzTMToEkTnLPzvI0vy5tqllkBit9AihNXuQzlvv9wmUdmiBKnXxYOdgQLyIXfOmKZ8Ck4.png',
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Y5bRu7BEb8jEWPzInHbMDeYKwNa5deaQy19FMzgWG5yRb71K4ukFUBB0RTKFJC0fAZdV9av2BTMKwY1beWihMpbbymJ4hK1WNpmrAf6ZAD4r9CGCV0blQrbiFkbeHCTx.png'
          ],
          title: '原型雙人沙發',
          price: 140100
        },
        {
          id:
            'X7KIKvGlTsEY5AJewFJJIfriyEkMFCo5bDo2AO59UsifrJN0NQMe8Loc9W4eIgXQ',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/HXofHl5l7E742fXcXtHxmSt9jASUcjqK0l04TZsIudlO1t4svMJrqLRgq7p13DAdUh2xd0i8JuZsi7c6eO3u878wlUNONABbugFQ3qbLEYLcHpNxAyFv9tputKdZ4hE4.png',
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/6TvWSjMadY6fObd9VdSPQBpwLEHVx3Q82RtUj6ocEAk9fj2gaYmYVJbUqRSOeM9zVx6kXTI78nQgsF71ZqNCeUAWLGQNI8BqAAJCEOd7lg2LSFiOLOLHj58V0Lel3t90.png'
          ],
          title: '封光吊燈',
          price: 10000
        },
        {
          id:
            'eQoKOCkszCMIRhRN3YAqpBnpMinvTAfzGgSQiKrZCMyhLlk3UR5QSipucPuXboDa',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/k7QLOd1LkjF1Znan5N7nuN9SqzbdrXtZaM11xvmuE8JjmZqHAzfD11yHYwqFtW5aew99cQhgUDtW1u2epfUwuoZzqlxJF4dXqWtau7eVisG6F8SmFLBHJ9d3uEa7lAtc.png',
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/4AHGLMmycAH0MxRGvcsEY5dxhKY6HI7b0Dqa3IdHJcaaAX7nDsP4RnXrO4jA91MSwj8iMJy5iQmNCrovUgNaeWDYajqqBB8Qh3uSgHv5P0Mg85RbsOOrySTdDQvJ83SC.png'
          ],
          title: '速寫椅凳',
          price: 24800
        },
        {
          id:
            'lqfnX0MnUC0f6O9YvSt1FxjgKhP71kU8nQxu0DvzD2WsqDtWTEIVayDM80FehXCm',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/UJUDCt3z4gELMrjPd66J265q2gk11xWtorhDf0Ee6xb8dDO2cs3YbCujF75AWetr5zMz9CthAYW6ChVjGpb1yLJ8WDe37gQa7ajgySWSr3Cz0zQiJqJXBO8iA7ijHbgg.png',
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/6Khh5S9lOOaUf57nOHQWIacfKMMQcNGmTA9bucy0m3NkBxwlm9pHWfa76jrnsPmGKcr5hlGfFVsvGAzWr2OwLFab607VVIF1dIHMfwj5Iy0aN7b8Enz6qV5g7n9Xi2q7.png'
          ],
          title: '層列邊桌',
          price: 15000
        },
        {
          id:
            'aIDl5f2PAskhksJP5n09HF0u0qRnyDpovqxrwjIKE3qf7ozn8QwWeuVI6NLArc8J',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/PnEfRj3QrQODQSBxoeRcq37yhSBN9MkTZuDKmguqggQFadsk1tBD3Zj1XeUkS7MiCaw1enHibrHoW3qerIYOrHmt4saA8cUDX9sO5RjqoDaVpQoA22RJYY1bf7Kfp5BQ.png',
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/XdIAQzWrYMPcJmovkLpp7Dt3zbCtezzpL9sRpzG4Hmi0N4fnmTAkv2nIHwJKwEo0comvJ58dqJxSFlpPC49fzK9VH8BWLsO2ibX6FjnUZxnBMv8k4scfZSo6KTMGuhfx.png'
          ],
          title: '層列咖啡桌',
          price: 21500
        }
      ]
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    this.swiper.slideTo(1, 2000, true)
  }
}
</script>

<style lang="stylus" scoped>
:root{
--black: rgb(0,0,0)
--main-yellow: rgb(250,210,0)
--white: rgb(255,255,255)
--gray: rgb(170,170,170)
--dark-gray: rgb(120,120,120)
--beige: rgb(187,200,193)
--dark-beige: rgb(97,123,110)
--red: #b42424
}
@mixin media-w1024 {
  @media (max-width: 1024px) {
    @content;
  }
}
@mixin media-w896 {
  @media (max-width: 896px) {
    @content;
  }
}
@mixin media-w767 {
  @media (max-width: 767px) {
    @content;
  }
}
@mixin media-w667 {
  @media (max-width: 667px) {
    @content;
  }
}
@mixin media-w568 {
  @media (max-width: 568px) {
    @content;
  }
}
.sale__content
  width: 72.5%
  height 90%
  padding-bottom: 50px
  @media screen and (max-width: 992px){
    width: 90%
  }
  @media screen and (max-width: 576px){
    margin-top 80px
  }
  .swiper-slide
    width: 100%
    height 100%
    position: relative
    font-size: 18px
    text-decoration: none
    color: var(--black)
    a
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      align-items: center
      text-decoration: none
      color: var(--black)
      .sale-pic
        position: relative
        width: 100%
        height: 80%
        background-size: cover
        transition: 0.3s ease-in-out
        overflow: hidden
        @include media-w568
          height: 300px
        img
          width 100%
          height 100%
          object-fit cover
          transition: 0.3s ease-in-out
          position: absolute
          &:hover
            &:last-child
              opacity: 0
      .product-name
        width: 100%
        padding: 20px 0
        display: flex
        flex-direction: column
        align-items: center
        bottom: 30px
        background: var(--brown4)
        h5
          font-size: 15px
          font-weight: 500
          color: var(--dark-beige)
          margin-bottom: 10px
        .orign
          font-size: 13px
          padding-top: 8px
          text-decoration: line-through
          font-weight: 300
          font-style: italic
        p
          display: flex
          align-items: center
          font-weight: 300
          font-style: italic
          font-size: 20px
          .sale-icon
            font-style: initial
            font-size: 12px
            font-weight: 300
            padding: 2px 5px
            border-radius: 10px
            margin-left: 10px
            background: var(--main-yellow)
            color: var(--black)
  .swiper-pagination-bullet
    width: 10px
    height: 2px
    border-radius: 0
    background-color: var(--brown4)
  .swiper-pagination-bullet-active
    background-color: var(--brown1) !important
</style>

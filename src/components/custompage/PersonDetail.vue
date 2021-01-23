<template lang="pug">
  div#personDetail.vh-100.m-auto(v-if='edit')
    h3.text-center {{userName}}會員資料首頁
    #showprofile.m-lg-5
      h6.m-3.p-3.border-bottom 會員姓名：{{userName}}
      h6.m-3.p-3.border-bottom 會員信箱：{{userEmail}}
      h6.m-3.p-3.border-bottom 會員地址：{{userAddress}}
      h6.m-3.p-3.border-bottom 會員電話：{{userPhone}}
      h6.m-3.p-3.border-bottom 會員生日：{{useBirth}}
      h6.m-3.p-3.border-bottom 會員性別：{{useGender}}
      b-btn.m-3(@click="changeProfile(false)") 修改會員資料
  form#personDetail_form.vh-100.m-auto(v-else,@submit.prevent="saveProfile")
    h3.text-center {{userName}}會員資料首頁
    .change_item.my-4
      h6 會員姓名：
      b-input.ml-3(type="text",v-model='nameModel')
    .change_item.my-4
      h6 會員信箱：
      b-input.ml-3(type="text",v-model='emailModel')
    .change_item.my-4
      h6 會員地址：
      b-input.ml-3(type="text",v-model='addressModel')
    .change_item.my-4
      h6 會員電話：
      b-input.ml-3(type="text",v-model='phoneModel')
    .change_item.my-4
      h6 會員生日：
      b-input.ml-3(type="text",v-model='birthModel',placeholder="ex：1999/01/01")
    .change_item.my-4
      h6 會員性別：
      b-form-radio-group.ml-3(v-model="genderModel",
        :options="options",
        class="mb-3",
        value-field="item",
        text-field="name",
        disabled-field="notEnabled")
    b-btn.m-3(type='submit') 保存會員資料
</template>

<script>
export default {
  name: 'PersonDetail',
  data() {
    return {
      userName: '',
      userEmail: '',
      userAddress: '',
      userPhone: '',
      useBirth: '',
      useGender: '',
      nameModel: '',
      emailModel: '',
      addressModel: '',
      phoneModel: '',
      birthModel: '',
      genderModel: '女性',
      edit: true,
      options: [
        { item: '女性', name: '女性' },
        { item: '男性', name: '男性' }
      ]
    }
  },
  methods: {
    changeProfile(value) {
      this.edit = value
      this.nameModel = this.userName
      this.emailModel = this.userEmail
      this.addressModel = this.userAddress
      this.phoneModel = this.userPhone
      this.birthModel = this.useBirth
      this.genderModel = this.useGender
    },
    saveProfile() {
      this.axios
        .patch(
          process.env.VUE_APP_API + '/users/' + this.$store.state.user._id,
          {
            name: this.nameModel,
            email: this.emailModel,
            address: this.addressModel,
            phone: this.phoneModel,
            birth: this.birthModel,
            gender: this.genderModel
          }
        )
        .then(res => {
          this.$store.commit('login', res.data.result)
          this.$alert.success('修改資料成功')
          this.userName = res.data.result.name
          this.userEmail = res.data.result.email
          this.userAddress = res.data.result.address
          this.userPhone = res.data.result.phone
          this.useBirth = res.data.result.birth
          this.useGender = res.data.result.gender
          this.nameModel = ''
          this.emailModel = ''
          this.addressModel = ''
          this.phoneModel = ''
          this.birthModel = ''
          this.genderModel = '女性'
          this.edit = true
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    },
    getuserdetail() {
      this.axios
        .get(
          process.env.VUE_APP_API +
            '/users/getuser/' +
            this.$store.state.user._id
        )
        .then(res => {
          this.userName = res.data.result.name
          this.userEmail = res.data.result.email
          this.userAddress = res.data.result.address
          this.userPhone = res.data.result.phone
          this.useBirth = res.data.result.birth
          this.useGender = res.data.result.gender
        })
    }
  },
  created() {
    this.getuserdetail()
  }
}
</script>

<style lang="stylus">
#personDetail,#personDetail_form{
  width 50%
  padding-top 10%
  @media screen and (max-width: 768px){
    width 75%
    padding-top 100px
  }
  @media screen and (max-width: 576px){
    width 100%
    padding-top 100px
  }
}
#personDetail_form{
  .change_item{
    display flex
    align-items center
    h6{
      display inline-block
    }
    input{
      width 80%
      @media screen and (max-width: 576px){
        width 70%
      }
    }
  }
}
</style>

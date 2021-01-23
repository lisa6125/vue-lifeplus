<template lang="pug">
  #login
    Navbar
    section.user
      .user_options-container
        .user_options-text
          .user_options-unregistered
            h2.user_unregistered-title Don't have an account?
            p.user_unregistered-text Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.
            button.user_unregistered-signup#signup-button(@click='showchick(false)') Sign up
          .user_options-registered
            h2.user_registered-title Have an account?
            p.user_registered-text Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.
            button.user_registered-login#login-button(@click='showchick(true)') Login
        .user_options-forms#user_options-forms(:class='status')
          .user_forms-login
            h2.forms_title Login
            form.forms_form(@submit.prevent="onSubmit")
              fieldset.forms_fieldset
                .forms_field
                  input.forms_field-input(type='account', placeholder='Account',v-model="account",required,autofocus)
                .forms_field
                  input.forms_field-input(type='password',placeholder='Password',required,v-model="password")
              .forms_buttons
                button.forms_buttons-forgot(type='button') Forgot password?
                input.forms_buttons-action(type='submit' value='Log In')
          .user_forms-signup
            h2.forms_title Sign Up
            form.forms_form(@submit.prevent="onSubmit_reg")
              fieldset.forms_fieldset
                .forms_field
                  input.forms_field-input(type='text',placeholder='Full Name',v-model="name",required)
                .forms_field
                  input.forms_field-input(type='email',placeholder='Email',v-model="email",required)
                .forms_field
                  input.forms_field-input(type='account',placeholder='Account',v-model="account",required)
                .forms_field
                  input.forms_field-input(type='password',placeholder='Password',v-model="password",required)
              .forms_buttons
                input.forms_buttons-action(type='submit' value='Sign up')
</template>

<script>
import Navbar from '../components/main/navbar'
export default {
  components: {
    Navbar
  },
  name: 'login',
  data () {
    return {
      name: '',
      account: '',
      password: '',
      email: '',
      right: false,
      status: {
        bounceRight: false,
        bounceLeft: true
      }
    }
  },
  methods: {
    onSubmit () {
      this.axios
        .post(process.env.VUE_APP_API + '/users/login', this.$data)
        .then(res => {
          if (res.data.success && res.data.result.right) {
            this.$store.commit('login', res.data.result)
            this.$alert.success('登入成功，進入管理').then(() => {
              this.$router.push('/admin/')
            })
          } else if (res.data.success && !res.data.result.right) {
            this.$store.commit('login', res.data.result)
            this.$alert.success('登入成功，進入會員').then(() => {
              this.$router.push('/')
            })
          } else {
            this.$alert.error(res.data.message)
          }
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    },
    onSubmit_reg () {
      this.axios
        .post(process.env.VUE_APP_API + '/users/', this.$data)
        .then(res => {
          this.$alert.success(res.data.message)
          this.name = ''
          this.account = ''
          this.password = ''
          this.email = ''
          this.status.bounceRight = true
          this.status.bounceLeft = false
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    },
    showchick (c) {
      if (c === true) {
        this.status.bounceRight = true
        this.status.bounceLeft = false
      } else {
        this.status.bounceRight = false
        this.status.bounceLeft = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
/**
 * * General variables
 * */
/**
 * * General configs
 * */
* {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type=submit] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@-webkit-keyframes bounceTop {
  0% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceTop {
  0% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
@-webkit-keyframes bounceBottom {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  100% {
    transform: translate3d(0, 50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceBottom {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  100% {
    transform: translate3d(0, 50%, 0);
  }
}
/**
 * * Show Sign Up form
 * */
@-webkit-keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
/**
 * * Page background
 * */
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: url('../assets/images/login_bg2.jpg');
  background-size: cover;
}
.user_options-container {
  position: relative;
  width: 80%;
  background: url('../assets/images/login_bg.jpg');
  background-size: cover;
  @media screen and (max-width:768px) {
    height: 100%
  }
}
.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
  @media screen and (max-width:768px) {
    height: 100%
    width: 100%;
    flex-direction column
    justify-content: center;
    align-items center
  }
}

/**
 * * Registered and Unregistered user box and text
 * */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
  @media screen and (max-width:768px) {
    width: 90%
  }
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
  @media screen and (max-width:576px) {
    font-size: 1rem;
  }
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  @media screen and (max-width:576px) {
    font-size 0.8rem
    padding: 10px 20px;
    margin-top: 10px;
  }
}
.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/**
 * * Login and signup forms
 * */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 450px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;
  @media screen and (max-width:768px) {
    width: calc(120% - 30px);
    top: 30%;
    left: -7%;
  }
  @media screen and (max-width:576px) {
    width: calc(120% - 30px);
    top: 35%;
    left: -7%;
  }
}
.user_options-forms .user_forms-login {
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: var(--brown1);
  letter-spacing: 0.1rem;
  @media screen and (max-width:768px) {
    margin-bottom: 15px;
  }
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
  @media screen and (max-width:768px) {
    margin-bottom: 5px;
  }
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: gray;
  letter-spacing: 0.1rem;
  transition: border-color 0.2s ease-in-out;
  @media screen and (max-width:768px) {
    font-size: 0.8rem;
  }
}
.user_options-forms .forms_field-input:focus {
  border-color: gray;
}
.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}
.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color:var(--brown1);
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: var(--brown3);
}
.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  justify-content: flex-end;
}
.user_options-forms .user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
 * * Triggers
 * */
.user_options-forms.bounceLeft {
  -webkit-animation: bounceLeft 1s forwards;
          animation: bounceLeft 1s forwards;
  @media screen and (max-width:768px) {
  -webkit-animation: bounceTop 1s forwards;
          animation: bounceTop 1s forwards;
  }
}
.user_options-forms.bounceLeft .user_forms-signup {
  -webkit-animation: showSignUp 1s forwards;
          animation: showSignUp 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}
.user_options-forms.bounceRight {
  -webkit-animation: bounceRight 1s forwards;
          animation: bounceRight 1s forwards;
  @media screen and (max-width:768px) {
  -webkit-animation: bounceBottom 1s forwards;
          animation: bounceBottom 1s forwards;
  }
}

/**
 * * Responsive 990px
 * */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 340px;
  }
  .user_options-forms .forms_buttons {
    flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
    top: 5%;
  }

  .user_options-registered,
.user_options-unregistered {
    padding: 50px 45px;
  }
}
@media screen and (max-width:576px) {
  .user_options-registered,
  .user_options-unregistered {
      padding: 30px 15px;
      margin-top: 50px;
    }

    .user_options-forms .forms_buttons{
      margin-top: 5px;
    }

    .user_options-forms .forms_buttons-action{
      font-size 0.5rem
      padding: 10px;
    }

    .user_options-forms {
    min-height: 250px;
  }
  }
</style>

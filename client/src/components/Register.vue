<template>
<section id="body" style="height: 100vh;">
    <div style="background-image: url(images/arka.jpg); background-attachment: fixed; background-size: cover; width: 100%; height: 100vh; position: relative;"  >
    <div class="baslik">
        <b style="font-size: 70px; text-align: center; margin-bottom: -21px; display: block;">
            <p>Grha-VerFlow</p>
        </b>
        <span style="font-size: 19px; text-align: center; display: block; margin-bottom: 25px;"></span>
    </div>
    <section>
    <form method="post" action="">
        <div class="arkalogin">
            <div class="loginbaslik">Register Here</div>
            <hr style="border: 1px solid #ccc;">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Email</span>
              </div>
                <input v-model="email" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Username</span>
              </div>
                <input v-model="name" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Password</span>
              </div>
                <input v-model="password" type="password" class="form-control" aria-label="Password" aria-describedby="basic-addon1">
            </div>
            <button type="button" @click="signUp" class="btn btn-primary">Register</button>
            <button type="button" @click="toLogin" class="btn btn-primary">Back To Login</button>
        </div>
    </form>
    </section>
    <span style="font-size: 17px; text-align: center; display: block; color: #fff;
    ">Your Own Stack-Overflow</span>
    </div>
    </section>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      name: '',
      password: '',
      url: 'http://localhost:3000'
    }
  },
  methods: {
    signUp () {
      let obj = {
        email: this.email,
        name: this.name,
        password: this.password
      }
      console.log(obj)
      axios.post(`${this.url}/users/signup`, obj)
        .then(response => {
          console.log(response)
          swal(
            'Login Success',
            'you can login now',
            'success'
          )
          this.$router.push('/')
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Register Failed',
            text: err.message
          })
        })
    },
    toLogin () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
   #body {
                background: linear-gradient(132deg, #f44336, #E91E63, #9C27B0, #673AB7, #3F51B5, #2196F3,#03A9F4, #00BCD4, #009688, #4CAF50, #FFC107, #FF9800, #f44336, #E91E63, #9C27B0, #673AB7, #3F51B5, #2196F3,#03A9F4, #00BCD4, #009688, #4CAF50, #FFC107, #FF9800);
                background-size: 400% 400%;
                animation: BackgroundGradient 30s ease infinite;
            }
            @keyframes BackgroundGradient {
                0% {background-position: 0% 50%;}
                50% {background-position: 100% 50%;}
                100% {background-position: 0% 50%;}
            }
            .baslik
{
    color: #fff;
    text-align: center;
    font-family: 'Fira Sans', sans-serif;
}
.arkalogin
{
    width: 300px;
    text-align: center;
    background: #fff;
    height: 435px;
    padding: 10px;
    margin: 50px auto;
}
.loginbaslik
{
    color: #888888;
    text-align: left;
    font-size: 19px;
    margin-top: 15px;
}
.giris
{
    width: 100%;
    height: 40px;
    margin-top: 10px;
    border: none;
    background: #E5E5E5;
    outline: none;
    padding: 0 10px;
}
.butonlogin
{
    width: 100%;
    margin-top: 10px;
    height: 40px;
    font-weight: bold;
    background: #2196F3;
    border: none;
    color: #fff;
    transition: all 250ms;
}
.butonlogin:hover
{
    background: #1E88E5;
}
#error
{
    color: red;
    float: left;
}
#body
{
    margin: 0;
    overflow-x: hidden;
}
</style>

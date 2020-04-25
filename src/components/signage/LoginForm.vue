<template>
    <div class="column no-padding-right">
      <h2 class="title has-text-dark has-text-centered">
        Вход
      </h2>
        <form class="columns is-multiline"
          autocomplete="off"
          @submit.prevent="performLogin"
        >

         <b-field label="Логин" class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
            <b-input v-model="loginForm.username"></b-input>
        </b-field>

         <b-field label="Пароль" class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
            <b-input type="password" v-model="loginForm.password" v-bind:style="{color:'blue'}" password-reveal></b-input>
        </b-field>

          <div class="column is-6-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-10-mobile is-offset-1-mobile has-text-centered p-t-lg">
            <button
              type="submit"
              class="button is-medium is-fullwidth raised is-rounded primary-btn no-margin-bottom"
            >
              Войти
            </button>
          </div>
        </form>

      <BLoading
        :is-full-page="true"
        :active.sync="loading"
        :can-cancel="false"
      />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'login',
        data() {
            return {
                loading: false,
                loginForm:{
                    username:"",
                    password:"",
                }
            }
        },

    computed: {
    ...mapState('auth', ['user'])
  },
    methods:{
        ...mapActions('auth', [
      'login'
    ]),

    performLogin () {
      this.loading = true
      this.errorMsg = ''
      this.login(this.loginForm)
        .then(() => {
          this.loading = false
          this.$router.push({ name: 'client-dashboard' })
        })
        .catch(() => {
          this.loading = false
          this.errorMsg = 'Неправильный номер телефона или пароль'
        })
    },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
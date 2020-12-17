<template>
    <div class="column no-padding-right">
         <BNotification
                 style="position: absolute"
                v-if="errorMsg"
                type="is-danger"
                :auto-close="true"
                :position="is-bottom-right"
                :duration="5000"
        >
            {{errorMsg}}
        </BNotification>
        <h2 class="title has-text-dark has-text-centered is-ce">
            Регистрация
        </h2>
        <form
                class="columns is-multiline"
                autocomplete="off"
                @submit.prevent="performSignup"
        >
            <b-field
                    class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile no-margin-bottom"
                    label="Логин">
                <b-input v-model="signupForm.username" pattern="[a-zA-Z][A-Za-z0-9]{7,15}"></b-input>
            </b-field>

            <b-field
                    class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile no-margin-bottom"
                    label="Электронная почта">
                <b-input type="email" v-model="signupForm.email"></b-input>
            </b-field>

            <b-field
                    class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile no-margin-bottom"
                    label="Пароль">
                <b-input v-model="signupForm.password" password-reveal type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}"></b-input>
            </b-field>

            <b-field
                    class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile no-margin-bottom"
                    label="Повторите пароль">
                <b-input v-model="confirmPassword" password-reveal type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}"></b-input>
            </b-field>

            <div class="column has-text-centered is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile p-t-lg no-margin-bottom no-padding-bottom">
                <button
                        type="submit"
                        class="button is-medium is-fullwidth raised is-rounded primary-btn"
                >
                    Зарегистрироваться
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
    import { mapActions } from 'vuex'

    export default {
        name: 'signup',
        data() {
            return {
                loading: false,
                confirmPassword: "",
                signupForm: {
                    username: "",
                    password: "",
                    email: ""
                },
                errorMsg:"",
            }
        },
        methods: {
            ...mapActions('auth', [
                'signup'
            ]),

            performSignup() {
                this.loading = true
                this.errorMsg = undefined
                if(this.signupForm.password === this.confirmPassword) {
                    this.signup(this.signupForm)
                        .then(() => {
                            this.loading = false
                            this.$router.push({name: 'client-dashboard'})
                        })
                        .catch(() => {
                            this.loading = false
                            this.showErrorNotification("Такой логин уже существует")
                        })
                }
                else {
                    this.showErrorNotification("Пароли не совпадают")
                    this.loading = false
                }
            },

            showErrorNotification(message) {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: message,
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
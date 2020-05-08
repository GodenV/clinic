<template>
    <div>
        <section class="hero is-medium is-relative is-theme-primary huge-pb no-padding-bottom is-fullheight">
            <navbar v-bind:transpanent="true"/>
            <div class="hero-body auth-container">
                <div class="container">
                    <div class="auth-block column is-10-desktop is-offset-1-desktop is-12-tablet is-offset-0-tablet is-12-mobile is-offset-0-mobile is-paddingless block"
                         v-bind:class="{ 'right-panel-active': login}">
                        <div class="form-container sign-up-container columns is-vcentered">
                            <SignupForm/>
                            <div class="auth-btn padding-10 column is-12  has-text-centered">
                                <a @click="change">Или войдите</a>
                            </div>
                        </div>
                        <div class="form-container sign-in-container columns is-vcentered">
                            <LoginForm/>
                            <div class="auth-btn padding-10 column is-12  has-text-centered">
                                <a @click="change">Или
                                    зарегесрируйтесь</a>
                            </div>
                        </div>
                        <div class="overlay-container">
                            <div class="overlay">
                                <div class="overlay-panel overlay-left">
                                    <h1 class="is-size-3-desktop is-size-4-tablet is-size-5-mobile has-text-weight-semibold">
                                        Добро пожаловать</h1>
                                    <p class="is-size-5-desktop is-size-6-tablet is-size-6-mobile">Введите свои
                                        персональные данные чтобы создать
                                        аккаунт</p>
                                    <div class="is-size-5-desktop is-size-6-tablet is-size-6-mobile button light-btn button-signup btn-outlined is-bold btn-align rounded raised"
                                         @click="change">
                                        Вход
                                    </div>
                                </div>
                                <div class="overlay-panel overlay-right">
                                    <h1 class="is-size-3-desktop is-size-4-tablet is-size-5-mobile has-text-weight-semibold">
                                        С возвращением</h1>
                                    <p class="is-size-5-desktop is-size-6-tablet is-size-6-mobile">Чтобы оставаться на
                                        связи с нами, пожалуйста, войдите в
                                        систему с вашей личной
                                        информацией</p>
                                    <div class="is-size-5-desktop is-size-6-tablet is-size-6-mobile button light-btn button-signup btn-outlined is-bold btn-align rounded raised"
                                         @click="change">Зарегестророваться
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import LoginForm from "@/components/signage/LoginForm"
    import SignupForm from "@/components/signage/SignupForm";

    export default {
        components: {
            Navbar,
            LoginForm,
            SignupForm
        },
        metaInfo: {
            title: 'Вход',
            titleTemplate: '%s | Клинический центр HealsFlex',
        },
        name: 'auth',
        props: {
            msg: String
        },
        data() {
            return {
                login: false,
                loginMobile: true,
            }
        },
        methods: {
            change() {
                this.login = !this.login
            }
        }
    }
</script>


<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Nunito:400,500,600,700,800');

    @media screen and (max-width: 600px) {

        .auth-container {
            .sign-up-container {
                width: 100% !important;
                left: -100% !important;
            }

            .sign-in-container {
                width: 100% !important;
            }

            .overlay {
                display: none;
            }

            .auth-btn {
                display: block !important;
                height: 20px;
            }
        }
    }

    .auth-container {
        background-image: url('../assets/740196.jpg');
        background-size: cover;

        .auth-btn {
            display: none;
        }

        * {
            font-family: Nunito;
        }

        .auth-block {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
            position: relative;
            overflow: hidden;
            max-width: 100%;
            min-height: 480px;
        }

        .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
        }

        .sign-in-container {
            left: 0;
            width: 50%;
            z-index: 2;
        }

        .auth-block.right-panel-active .sign-in-container {
            transform: translateX(100%);
            opacity: 0;
        }

        .sign-up-container {
            left: 0;
            width: 50%;
            opacity: 0;
            z-index: 1;
        }

        .auth-block.right-panel-active .sign-up-container {
            transform: translateX(100%);
            opacity: 1;
            z-index: 3;
            animation: show 0.6s;
        }

        @keyframes show {
            0%, 49.99% {
                opacity: 0;
                z-index: 1;
            }

            50%, 100% {
                opacity: 1;
                z-index: 3;
            }
        }

        .overlay-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: transform 0.6s ease-in-out;
            z-index: 4;
        }

        .auth-block.right-panel-active .overlay-container {
            transform: translateX(-100%);
        }

        .overlay {
            background: #FF416C;
            background: -webkit-linear-gradient(to right, #00fff2, #3f48fa);
            background: linear-gradient(to right, #00fff2, #3f48fa);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 0 0;
            color: #FFFFFF;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;
        }

        .auth-block.right-panel-active .overlay {
            transform: translateX(50%);
        }

        .overlay-panel {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
            text-align: center;
            top: 0;
            height: 100%;
            width: 50%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;
        }

        .overlay-left {
            transform: translateX(-20%);
        }

        .auth-block.right-panel-active .overlay-left {
            transform: translateX(0);
        }

        .overlay-right {
            right: 0;
            transform: translateX(0);
        }

        .auth-block.right-panel-active .overlay-right {
            transform: translateX(20%);
        }
    }
</style>
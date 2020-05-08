<template>
    <footer class="footer-dark">
        <div class="container">
            <div class="columns footer-columns is-flex-mobile">
                <div class="column is-6 columns is-multiline">
                    <h2 class="column is-12">КОНТАКТЫ</h2>
                    <div class="white-line"></div>
                    <div class="column is-12">
                        <i class="fas fa-phone"/> +375 29 90 88 777
                    </div>
                    <div class="column is-12">
                        <i class="fas fa-phone"/> +375 17 35 88 777
                    </div>
                    <div class="column is-12">
                        <i class="fas fa-map-marked"/> 220062, г. Минск, ул. Мястровская, 24
                    </div>
                    <div class="column is-12">
                        <i class="fas fa-mail-bulk"/> info@nettaclinic.com
                    </div>
                </div>
                 <div class="column is-4 is-offset-2">
                <div class="footer-column">

                    <div class="p-t-md"/>

                    <div class="content">
                        <router-link :to="{name: 'payment'}">
                            <nav class="level has-text-centered is-mobile social">

                            </nav>
                        </router-link>
                    </div>

                    <div class="content">
                        <nav class="level has-text-centered is-mobile social">
                            <div class="level-item">
                                <a
                                        href="https://vk.com/public179942761"
                                        class="is-size-3"
                                > <i class="fab fa-vk"/></a>
                            </div>
                            <div class="level-item">
                                <a
                                        href="https://www.facebook.com/pages/category/Finance/Winwin-%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%B1%D1%8B%D1%81%D1%82%D1%80%D1%8B%D1%85-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD-%D0%B7%D0%B0%D0%B9%D0%BC%D0%BE%D0%B2-%D0%BF%D0%BE%D0%B4-%D0%B7%D0%B0%D0%BB%D0%BE%D0%B3-%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8F-106582817408604/"
                                        class="is-size-3"
                                > <i class="fab fa-facebook"/></a>
                            </div>
                            <div class="level-item">
                                <a
                                        href="https://www.instagram.com/win2.belarus/"
                                        class="is-size-3"
                                > <i class="fab fa-instagram"/></a>
                            </div>
                            <div class="level-item">
                                <a
                                        href="https://twitter.com/WinWin73167640"
                                        class="is-size-3"
                                > <i class="fab fa-twitter"/></a>
                            </div>
                            <div class="level-item">
                                <a
                                        href="https://ok.ru/profile/574318036290"
                                        class="is-size-3"
                                > <i class="fab fa-odnoklassniki"/></a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            </div>

        </div>
    </footer>
</template>

<script>
    export default {
        name: 'FooterBar',
        data() {
            return {
                publicPath: process.env.BASE_URL
            }
        }
    }
</script>

<style lang="scss">

    .white-line {
        background-color: white;
        height: 1px;
        width: 300px;
    }

</style>

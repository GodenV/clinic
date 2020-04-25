<template>
    <div>
        <section class="hero is-medium is-relatives">
            <navbar/>
            <div class="hero-body no-padding">
                <div class="main-page-carousel">
                    <b-carousel
                            :autoplay=autoplay
                            :animated=animated
                            :arrow=arrow
                            :pause-hover=pauseHover
                            :pause-info=pauseInfo
                            :repeat=repeat
                            :interval=interval>
                        <b-carousel-item class="bg-img"
                                         v-bind:style="{backgroundImage: `url(${require('../assets/home1.jpg')})`}">
                            <div class="container has-text-left">
                                <h1 class="is-size-2 has-text-black">Эстетическая<br/> медицина</h1>
                                <p class="is-size-4 has-text-black">Забота о здоровье и красоте</p>
                                <div class="has-text-black button light-btn button-signup btn-outlined is-bold btn-align rounded raised">
                                    Услуги
                                </div>
                            </div>
                        </b-carousel-item>
                        <b-carousel-item class="bg-img"
                                         v-bind:style="{backgroundImage: `url(${require('../assets/home3.jpg')})`}">
                            <div class="container has-text-left">
                                <h1 class="is-size-2 has-text-black">Учебно-методический <br/> центр</h1>
                                <p class="is-size-4 has-text-black">Обучаем врачей и медсестер <br/>
                                    искусству, науке, технике и процедурам <br/>
                                    эстетической медицины</p>
                                <div class="has-text-black button light-btn button-signup btn-outlined is-bold btn-align rounded raised">
                                    Узнать подробнее
                                </div>
                            </div>

                        </b-carousel-item>
                        <b-carousel-item class="bg-img"
                                         v-bind:style="{backgroundImage: `url(${require('../assets/home2.jpg')})`}">
                            <div class="container has-text-left">
                                <h1 class="is-size-2 has-text-black">Институт геронтологии</h1>
                                <p class="is-size-4 has-text-black">Первое и единственное <br/>
                                    представительство в Беларуси <br/></p>
                                <div class="has-text-black button light-btn button-signup btn-outlined is-bold btn-align rounded raised">
                                    Узнать подробнее
                                </div>
                            </div>
                        </b-carousel-item>
                        <template slot="indicators">
                            <div class="indicator-container">
                                <div class="first-round">
                                </div>
                            </div>
                        </template>
                    </b-carousel>
                </div>
                <div class="container">
                    <div class="columns is-multiline schedule has-text-white">
                        <div class="column sch-con is-3 no-padding">
                            <div class="uneven-item schedule-item padding-15">
                                <div class="columns schedule-item-head">
                                    <b-icon
                                            class="column is-2 schedule-icon"
                                            icon="calendar-alt"
                                            size="is-medium">
                                    </b-icon>
                                    <div class="column is-offset-1 is-size-5">
                                        ВРЕМЯ РАБОТЫ
                                    </div>
                                </div>
                                <div class="schedule-line"></div>
                                <div class="columns no-margin">
                                    <div class="column is-4">
                                        ПН-ВС
                                    </div>
                                    <div class="column is-8 has-text-right">
                                        8:00-21:00
                                    </div>
                                </div>
                                <div class="padding-15">
                                    Без выходных
                                </div>
                                <div class="padding-15">
                                    Изменения в графике работы можно уточнить на специальной странице по ссылке ниже
                                </div>
                            </div>
                            <div class="box has-text-centered has-text-grey-dark is-size-4 schedule-item-button">
                                График работы
                            </div>
                        </div>
                        <div class="column sch-con is-3 no-padding">
                            <div class="even-item schedule-item padding-15">
                                <div class="columns schedule-item-head">
                                    <b-icon
                                            class="column is-2 schedule-icon"
                                            icon="phone"
                                            size="is-medium">
                                    </b-icon>
                                    <div class="has-text-white column is-offset-1 is-size-5">
                                        ОНЛАЙН-ЗАПИСЬ
                                    </div>
                                </div>
                                <div class="schedule-line"></div>
                                <div class="padding-15">
                                    Воспользуйтесь сервисом онлайн-записи. В удобное время врач гарантированно будет на
                                    месте и примет Вас.
                                </div>
                            </div>
                            <div class="box has-text-centered has-text-grey-dark is-size-4 schedule-item-button">
                                График работы
                            </div>
                        </div>
                        <div class="column sch-con is-3 no-padding">
                            <div class="uneven-item schedule-item padding-15">
                                <div class="columns schedule-item-head">
                                    <b-icon
                                            class="column is-2 schedule-icon"
                                            icon="ambulance"
                                            size="is-medium">
                                    </b-icon>
                                    <div class="has-text-white column is-offset-1 is-size-5">
                                        ГОРЯЧАЯ ЛИНИЯ
                                    </div>
                                </div>
                                <div class="schedule-line"></div>
                                <div class="padding-15">
                                    <div class="is-size-4">+375 29 90 88 777</div>
                                    <div>Позвонить!</div>
                                </div>
                            </div>
                            <div class="box has-text-centered has-text-grey-dark is-size-4 schedule-item-button">
                                Контакты
                            </div>
                        </div>
                        <div class="column sch-con is-3 no-padding">
                            <div class="even-item schedule-item padding-15">
                                <div class="columns schedule-item-head">
                                    <b-icon
                                            class="column is-2 schedule-icon"
                                            icon="percent"
                                            size="is-medium">
                                    </b-icon>
                                    <div class="has-text-white column is-offset-1 is-size-5">
                                        АКЦИИ
                                    </div>
                                </div>
                                <div class="schedule-line"></div>
                                <div class="padding-15">
                                    Перейдя по ссылке ниже Вы сможете узнать о всех текущих спецпредложениях и акциях,
                                    проходящих в нашей клинике
                                </div>
                            </div>
                            <div class="box has-text-centered has-text-grey-dark is-size-4 schedule-item-button">
                                Новости
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container" v-bind:style="{paddingTop: 150+'px'}">
                    <div class="columns">
                        <div class="column is-4">
                            <a
                                    class="square-icon-box rounded secondary"
                                    target="_blank"
                            >
                                <div class="icon-box-wrapper">
                                    <div class="icon-box">
                                        <i class="fas fa-coins"/>
                                    </div>
                                </div>
                                <div class="box-title">
                                    Квалифицированные сотрудники
                                </div>
                                <div class="box-text">
                                    Мы ручаемся за качество предоставляемых услуг
                                </div>
                            </a>
                        </div>
                        <div class="column is-4">
                            <a
                                    class="square-icon-box rounded secondary"
                                    target="_blank"
                            >
                                <div class="icon-box-wrapper">
                                    <div class="icon-box">
                                        <i class="fas fa-car-alt"/>
                                    </div>
                                </div>
                                <div class="box-title">
                                    Современное оборудование
                                </div>
                                <div class="box-text">
                                    Лучшее оснощение в Бееларуси
                                </div>
                            </a>
                        </div>
                        <div class="column is-4">
                            <a
                                    class="square-icon-box rounded secondary"
                                    target="_blank"
                            >
                                <div class="icon-box-wrapper">
                                    <div class="icon-box">
                                        <i class="fas fa-download"/>
                                    </div>
                                </div>
                                <div class="box-title">
                                    Эффективность и безопастность
                                </div>
                                <div class="box-text">
                                    Полная конфиденциальность и анонимность
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <Map/>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import Map from "@/components/Map";

    export default {
        components: {
            Navbar,
            Map,
        },
        metaInfo: {
            title: 'Главная',
            titleTemplate: '%s | Клинический центр HealsFlex',
        },
        name: 'home',
        data() {
            return {
                arrow: false,
                pauseHover: false,
                pauseInfo: false,
                repeat: false,
                interval: 3000,
                animated: 'fade',
                autoplay: true,
            }
        },
        props: {
            msg: String
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Nunito:400,500,600,700,800');

    * {
        font-family: Nunito;
    }

    .schedule {
        z-index: 2;
    }

    .cls {
        height: 1000px;
        background-color: black;
    }

    .bg-img {
        height: 750px;
        margin: 0 !important;
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;

        & > div {
            margin-top: 300px;
        }
    }

    .main-page-carousel {
        position: relative;
        margin-bottom: -40px;
    }

    .is-active .first-round {
        box-shadow: 0 0 10px rgb(46, 74, 250);
    }

    .first-round {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #2c4dfa;
        margin-left: -30vw;
        margin-top: -80px;
    }

    .indicator-container {
        width: 20px;
    }

    .schedule {
        height: 300px;
    }

    .schedule-item-button {
        height: 80px;
        margin-top: -80px;
        transition-duration: 500ms;
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        &:hover {
            background-color: #9ab2db;
        }
    }

    .sch-con {
        &:hover .schedule-item {
            margin-top: -80px;
        }

        &:hover .schedule-item-button {
            display: block;
            margin-top: 0;
        }
    }

    .schedule-item {
        position: relative;
        height: 100%;
        transition-duration: 400ms;
        z-index: 10;
    }

    .even-item {
        background-color: #5167d2;
    }

    .uneven-item {
        background-color: #2a4eb2;
    }

    .schedule-icon {
        color: rgba(255, 255, 255, 0.6);
    }

    .schedule-line {
        height: 1px;
        width: 14vw;
        background-color: rgba(255, 255, 255, 0.6);
        margin: auto;
    }

    .parallax {
        perspective: 1px;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .parallax__layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .parallax__layer--base {
        transform: translateZ(0);
    }

    .parallax__layer--back {
        transform: translateZ(-1px);
    }

    .parallax-container {
        display: block;
    }

</style>
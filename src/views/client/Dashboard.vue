<template>
    <div>
        <section class="section dashboard-section">
        <Navbar/>
        </section>
        <div v-if="!(isCreateMedicalCard && isCreateCustomer)">
            <section
                    class="section"
                    style="padding-top: 2rem !important;"
            >
                <b-steps
                        v-model="step"
                        size="is-medium"
                        :has-navigation="false"
                >
                    <b-step-item
                            label="Личная информация пациента"
                            icon="user"
                    />
                    <b-step-item
                            label="Данные карточки пациента"
                            icon="info"
                    />
                </b-steps>
            </section>
            <CustomerForm v-if="step===0" :afterSubmit="reloadData"/>
            <MedicalCardForm :afterSubmit="reloadData" :customerId="customer.id" v-if="step===1"/>
        </div>
        <section v-else class="section">
            <div class="hero-body container dashboard-container">
                <div class="columns is-variable">
                    <div class="column is-6">
                        <div class="flex-card is-avatar light-bordered card-overflow no-padding-top">
                            <div class="inner">
                                <div class="contact-block">
                                    <div class="contact-name no-margin-top border-bottom">
                                        {{customer.surname+" "+customer.name+" "+customer.lastName}}
                                    </div>
                                    <div class="contact-name">
                                        {{ customer.medicalCard.registration }}
                                    </div>
                                    <div class="stats-block">
                                        <div class="stat">
                                            <span>Телефон</span>
                                            <span class="is-size-5">{{ customer.phone }}</span>
                                        </div>
                                        <div class="stat">
                                            <span>Пол</span>
                                            <span class="is-size-5">{{ genders[customer.medicalCard.gender]}}</span>
                                        </div>
                                    </div>
                                    <div class="stats-block">
                                        <div class="stat">
                                            <span>Рост</span>
                                            <span class="is-size-5">{{ customer.medicalCard.height }}см</span>
                                        </div>
                                        <div class="stat">
                                            <span>Вес</span>
                                            <span class="is-size-5">{{ customer.medicalCard.weight }}кг</span>
                                        </div>
                                        <div class="stat">
                                            <span>Дата рождения</span>
                                            <span class="is-size-5">{{ customer.medicalCard.birthday }}</span>
                                        </div>
                                    </div>
                                    <div class="contact-block">
                                        <div class="contact-name">
                                            <span class="name-text">Хронические заболевания</span>
                                            <span>
                                             {{ customer.medicalCard.chronicDiseases }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="contact-block">
                                        <div class="contact-name">
                                            <span class="name-text">Аллергии</span>
                                             {{ customer.medicalCard.allergies }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns column no-margin is-6">

                    </div>
                </div>
                <BLoading
                        :is-full-page="true"
                        :active.sync="loading"
                        :can-cancel="false"
                />
            </div>
        </section>
    </div>
</template>

<script>
    import CustomerForm from '@/components/forms/CustomerForm'
    import MedicalCardForm from '@/components/forms/MedicalCardForm'
    import Navbar from '@/components/Navbar'
    import {getCustomer} from '@/api/customers'
    import store from '@/store/index'

    export default {
        components: {
            CustomerForm,
            MedicalCardForm,
            Navbar
        },
        data() {
            return {
                customer: {},
                genders: {
                    MALE: "Мужчина",
                    FEMALE: "Женщина"
                },
                isCreateMedicalCard: false,
                isCreateCustomer: false,
                step: null,

            }
        },
        methods: {
            getCurrentCustomer() {
                return getCustomer(store.getters['auth/user'].id)
            },
            reloadData() {
                this.loading = true
                this.getCurrentCustomer()
                    .then((response) => {
                        this.customer = response.data[0]
                        this.isCreateCustomer = true
                        if (this.customer.medicalCard) {
                            this.isCreateMedicalCard = true
                        } else {
                            this.step = 1
                        }
                        this.loading = false
                    })
                    .catch(() => {
                        this.isCreateCustomer = false
                        this.step = 0
                        this.loading = false
                    })
            }

        },
        created() {
            this.reloadData()
        },
    };
</script>

<style lang="scss">
    .dashboard-container {
        margin-top: 200px;
    }

    .name-text {
        text-transform: uppercase;
        font-weight: 600;
        font-size: .85rem;
        color: #999;
        display: block;
    }

    .contact-name {
        max-width: 100%;
        word-wrap: break-word;
    }
</style>
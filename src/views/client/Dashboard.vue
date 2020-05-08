<template>
    <div>
        <Navbar/>
        <div v-if="!(isCreateMedicalCard && isCreateCustomer)">
            <section class="section dashboard-section">
                <navbar/>
            </section>
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
            <CustomerForm :customerId="customer.id" v-if="step===0"/>
            <MedicalCardForm v-if="step===1"/>
        </div>
        <section v-else class="section">
            <div class="hero-body container dashboard-container">
                <div class="columns is-variable">
                    <div class="column is-6">
                        <div class="flex-card is-avatar light-bordered card-overflow no-padding-top">
                            <div class="inner">
                                <div class="contact-block">
                                    <div class="contact-name no-margin-top border-bottom">
                                        {{ "Керсновский Вадим Витальевич" }}
                                    </div>
                                    <div class="contact-name">
                                        {{ "Город брест 20 улицца ляля" }}
                                    </div>
                                    <div class="stats-block">
                                        <div class="stat">
                                            <span>Телефон</span>
                                            <span class="is-size-5">{{ +375336031780 }}</span>
                                        </div>
                                        <div class="stat">
                                            <span>Первоначальная сумма</span>
                                            <span class="is-size-5">{{  }}</span>
                                        </div>
                                    </div>
                                    <div class="stats-block">
                                        <div class="stat">
                                            <span>Долг</span>
                                            <span class="is-size-5">{{  }}</span>
                                        </div>
                                        <div class="stat">
                                            <span>Ставка</span>
                                            <span class="is-size-5">{{  }}%</span>
                                        </div>
                                        <div class="stat">
                                            <span>Срок</span>
                                            <span class="is-size-5">{{  }} мес.</span>
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
                medicalCard: {},
                isCreateMedicalCard: false,
                isCreateCustomer: false,
                step: 0,
            }
        },
        methods: {
            getCurrentCustomer() {
                return getCustomer(store.getters['auth/user'].id)
            },

        },
        created() {
            this.loading = false
            this.getCurrentCustomer()
                .then((response) => {
                    this.customer = response.data[0]
                    this.isCreateCustomer = true
                    if(this.customer.medicalCard){
                        this.step = 2
                        this.isCreateMedicalCard = true
                    }
                    else {
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
    };
</script>

<style lang="scss">
    .dashboard-container {
        margin-top: 200px;
    }
</style>
<template>
    <form class="columns is-multiline" @submit.prevent="performSubmit">
        <div class="column no-padding-right">
            <h2 class="title has-text-dark has-text-centered">
                Заполните данные о себе
            </h2>

            <b-field label="Фамилия"
                     class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
                <b-input v-model="customerForm.surname" required></b-input>
            </b-field>

            <b-field label="Имя"
                     class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
                <b-input v-model="customerForm.name" required></b-input>
            </b-field>

             <b-field label="Отчество"
                     class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
                <b-input v-model="customerForm.lastName" required></b-input>
            </b-field>

            <b-field label="Номер телефона"
                     class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
                <b-input v-model="customerForm.phone" pattern="[\+]\d{12}" required></b-input>
            </b-field>

            <div class="column is-6-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-10-mobile is-offset-1-mobile has-text-centered p-t-lg">
                <button
                        type="submit"
                        class="button is-medium is-fullwidth raised is-rounded primary-btn no-margin-bottom"
                >
                    Сохранить
                </button>
            </div>

            <BLoading
                    :is-full-page="true"
                    :active.sync="loading"
                    :can-cancel="false"
            />
        </div>
    </form>
</template>

<script>
    import store from '@/store/index'
    import { createCustomer, updateCustomer } from '@/api/customers'

    export default {
        name: "CustomerForm",
        props:['customerId', 'afterSubmit'],
        data() {
            return {
                loading: false,
                customerForm: {
                    name: "",
                    surname: "",
                    lastName: "",
                    phone: "",
                    userId: store.getters["auth/user"].id
                },
            }
        },
        methods:{
            selectSubmitMethod(){
                if(this.customerId)
                    return updateCustomer(this.customerId,this.customerForm)
                return createCustomer(this.customerForm)
            },
            performSubmit(){
                this.selectSubmitMethod()
                .then()
            }
    }
    }
</script>

<style scoped>

</style>
<template>
    <form class="columns is-multiline" @submit.prevent="performSubmit">
        <h2 class="column is-12 title has-text-dark has-text-centered">
            Мед. карта
        </h2>

        <b-field label="Прописка"
                 class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
            <b-input v-model="cardForm.registration" required></b-input>
        </b-field>

        <b-field label="Рост"
                 class="column is-2 is-offset-2">
            <b-input v-model="cardForm.height" type="number" required></b-input>
        </b-field>

        <b-field label="Вес"
                 class="column is-2">
            <b-input v-model="cardForm.weight" type="number" required></b-input>
        </b-field>

        <b-field class="column is-2" label="Категория">
            <b-select v-model="cardForm.gender" required>
                <option value="FEMALE">Женщина</option>
                <option value="MALE">Мужчина</option>
            </b-select>
        </b-field>

        <DateField
                class="column is-2"
                :label="'Дата Рождения'"
                :string-date.sync="cardForm.birthday"
        />

        <b-field label="Хронические диагнозы"
                 class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
            <b-input v-model="cardForm.chronicDiseases"></b-input>
        </b-field>

        <b-field label="Аллергии"
                 class="column is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
            <b-input v-model="cardForm.allergies"></b-input>
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
    </form>
</template>

<script>
    import {createMedicalCard} from '@/api/customers'
    import DateField from '@/components/fields/DateField'

    export default {
        name: "MedicalCardForm",
        props: ['customerId', 'afterSubmit'],
        components: {
            DateField
        },
        data() {
            return {
                loading: false,
                cardForm: {
                    registration: "",
                    height: "",
                    weight: "",
                    chronicDiseases: "",
                    gender: "",
                    allergies: "",
                    birthday: null
                },
            }
        },
        methods: {
            performSubmit() {
                this.loading = true
                createMedicalCard(this.customerId, this.cardForm)
                    .then(() => {
                        this.afterSubmit()
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    })
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <form @action.prevent="submitForm">
        <div class="modal-card appointment-form">
            <header class="modal-card-head">
                <p class="modal-card-title">Создание талонов</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Select datetime">
                    <b-datetimepicker
                            v-model="appointmentsForm.startTime"
                            placeholder="Select a date"
                            icon="calendar"
                            :timepicker="timepicker"
                            horizontal-time-picker
                            requried
                    >
                    </b-datetimepicker>
                </b-field>
                <b-field label="Переодиччность">
                    <b-input
                            type="number"
                            required>
                    </b-input>
                </b-field>
                <b-field label="Количесвто талонов">
                    <b-input
                            type="number"
                            required>
                    </b-input>
                </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Закрыть</button>
                <button class="button is-primary">Создать</button>
            </footer>
        </div>
    </form>
</template>

<script>
    import {createAppointments} from '@/api/appointments'
    import dayjs from "dayjs";

    export default {
        name: "Appointment",
        props: ['doctorId', 'afterSubmit'],
        data() {
            return {
                appointmentsForm: {
                    doctorId: this.doctorId,
                    startTime: new Date(),
                    ticketsNumber: 0,
                    gap: 0,
                },
                timepicker: {
                    incrementMinutes: 15,
                }
            }
        },
        methods: {
            submitForm() {
                createAppointments(this.appointmentsForm)
            },
            getString(date) {
                let parsedDate = dayjs(date).format('YYYY-MM-DD')
                this.$emit('update:stringDate', parsedDate)
            }
        }
    }
</script>

<style lang="scss">
    .appointment-form {
        width: 600px;
        height: 600px;
    }
</style>
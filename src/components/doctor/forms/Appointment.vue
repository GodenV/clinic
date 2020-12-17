<template>
    <form @submit.prevent="submitForm">
        <div class="modal-card appointment-form">
            <header class="modal-card-head">
                <p class="modal-card-title">Создание талонов</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Select datetime">
                    <b-datetimepicker
                            v-model="startTime"
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
                            v-model="appointmentsForm.gap"
                            type="number"
                            required>
                    </b-input>
                </b-field>
                <b-field label="Количесвто талонов">
                    <b-input
                            v-model="appointmentsForm.ticketsNumber"
                            type="number"
                            required>
                    </b-input>
                </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Закрыть</button>
                <button type="submit" class="button is-primary">Создать</button>
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
                startTime: new Date(),
                dateTime: new Date(),
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
                this.appointmentsForm.startTime = this.toStringDate(this.startTime)
                createAppointments(this.appointmentsForm)
                .then(()=> {
                        this.afterSubmit()
                        this.$parent.close()
                }
                )
            },
            toStringDate(datetime) {
                return dayjs(datetime).format('YYYY-MM-DD HH:mm')
            },
        }
    }
</script>

<style lang="scss">
    .appointment-form {
        width: 600px;
        height: 600px;
    }
</style>
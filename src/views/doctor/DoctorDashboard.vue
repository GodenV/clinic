<template>
    <div>
        <section class="section dashboard-section">
            <Navbar/>
        </section>
        <section class="container">
            <div class="columns">
                <div class="column is-4">
                    <b-button>Добавить талоны</b-button>
                </div>
                <div class="column has-text-centered is-8" style="min-height: 500px">
                    <div class="columns">
                        <span class="column is-6"> Ваши талоны на</span>
                        <b-field>
                            <b-datepicker
                                    class="column is-6"
                                    v-model="filterDate"
                                    size="is-medium"
                                    @input="onInputDate"
                            />
                        </b-field>
                    </div>
                    <b-table v-if="appointments.length"
                             :data="appointments"
                             :row-class="this.selectRowStyle(row)">
                        <template slot-scope="props">
                            <b-table-column field="id" label="ID" width="100" searchable sortable numeric>
                                {{ props.row.id }}
                            </b-table-column>
                            <b-table-column field="name" label="ФИО" searchable sortable>
                                {{ props.row.surname +" "+props.row.name+" "+props.row.lastName}}
                            </b-table-column>
                            <b-table-column field="phone" label="Номер телефона" searchable sortable>
                                {{ props.row.phone }}
                            </b-table-column>
                            <b-table-column class="has-text-centered" label="Редактировать">
                                <b-button type="is-warning" @click="updateClick(props.row.id)">Редактировать</b-button>
                            </b-table-column>
                            <b-table-column class="has-text-centered" label="Удалить">
                                <b-button type="is-danger" @click="deleteClick(props.row.id)"
                                          v-if="!props.row.customerid">
                                    Отменить
                                </b-button>
                            </b-table-column>
                        </template>
                        <template slot="detail" slot-scope="props">
                            <h2>
                                Причина
                            </h2>
                            <span>
                            {{props.row.reason}}
                        </span>
                            <h2>
                                Диагноз
                            </h2>
                            <span>
                            {{props.row.diagnosis}}
                        </span>
                            <h2>
                                Рекомендации
                            </h2>
                            <span>
                            {{props.row.recommendations}}
                        </span>
                        </template>
                    </b-table>
                </div>
            </div>
            <b-modal :active.sync="isComponentModalActive"
                     has-modal-card trap-focus aria-role="dialog"
                     aria-modal :can-cancel="false">
                <Appointment :doctorId="doctor.id" :afterSubmit="getAppointmentsList"></Appointment>
            </b-modal>
        </section>
        <BLoading
                :is-full-page="true"
                :active.sync="loading"
                :can-cancel="false"
        />
    </div>
</template>

<script>
    import {getDoctor} from '@/api/doctors'
    import {getAppointments} from '@/api/appointments'
    import Appointment from '@/components/doctor/forms/Appointment'
    import Navbar from '@/components/Navbar'
    import dayjs from "dayjs";

    export default {
        components: {
            Navbar,
            Appointment
        },
        data() {
            return {
                isComponentModalActive: true,
                loading: false,
                appointments: [],
                filterDate: new Date(),
                doctor: {},
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '100',
                        numeric: true,
                        searchable: true,
                    },
                    {
                        field: 'surname',
                        label: 'Фамилия',
                        searchable: true,
                    },
                    {
                        field: 'name',
                        label: 'Имя',
                        searchable: true,
                    },
                    {
                        field: 'lastName',
                        label: 'Отество',
                        searchable: true,
                    },
                    {
                        field: 'dateTime',
                        label: 'Date',
                        centered: true
                    },
                    {
                        field: 'gender',
                        label: 'Gender',
                    }
                ]
            }
        },
        methods: {
            getCurrentDoctor() {
                this.loading = true
                return getDoctor(this.$store.getters['auth/user']['id'])
                    .then((response) => {
                        this.doctor = response.data[0]
                        this.loading = false
                        Promise.resolve(response)
                    })
                    .catch((error) => {
                        this.loading = false
                        Promise.reject(error)
                    })
            },
            selectRowStyle(appointment) {
                let time = new Date(appointment.dateTime)
                if (appointment.customerId) {
                    if (time < Date.now() && (appointment.recommendations || appointment.diagnosis))
                        return "green"
                    if (time < Date.now() && (!appointment.recommendations || !appointment.diagnosis))
                        return "red"
                } else {
                    return "grey"
                }
            },
            getAppointmentsList() {
                this.loading = true
                getAppointments(this.doctor.id, dayjs(this.filterDate).format('YYYY-MM-DD'))
                    .then((response) => {
                        this.appointments = response.data
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    })
            },
            onInputDate() {
                this.getAppointmentsList()
            },
        },
        created() {
            this.getCurrentDoctor()
                .then(() => {
                    this.getAppointmentsList()
                })
        },
    };
</script>

<style lang="scss">

</style>
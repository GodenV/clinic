<template>
    <div>
        <section class="section dashboard-section">
            <Navbar/>
        </section>
        <section class="container">
            <div class="columns">
                <div class="columns is-multiline column is-5">
                    <div class="column is-12 doctor-card">
                        <div class="flex-card is-avatar light-bordered card-overflow no-padding-top">
                            <div class="inner">
                                <div class="contact-block">
                                    <div class="align-left contact-name no-margin-top border-bottom">
                                        <div>
                                            <img class="doctor-avatar" :src="doctor.imageUrl"/>
                                        </div>
                                        {{doctor.surname+" "+doctor.name+" "+doctor.lastName}}
                                    </div>
                                    <div class="stats-block">
                                        <div class="stat">
                                            <span>Категория</span>
                                            <span class="is-size-5">{{ categories[doctor.medicalCategory] }}</span>
                                        </div>
                                        <div class="stat">
                                            <span>Специализация</span>
                                            <span class="is-size-5">{{ doctor.specialization }}</span>
                                        </div>
                                    </div>
                                    <div class="contact-block">
                                        <div class="contact-name">
                                            <span class="name-text">Отделение</span>
                                            <span>
                                            {{ department.name }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns column no-margin is-6">

                        </div>
                    </div>
                    <div class="has-text-centered column is-6">
                        <b-button class="is-success" @click="isComponentModalActive=true">Добавить талоны</b-button>
                    </div>
                    <div class="has-text-centered column is-6">
                        <b-button @click="onDeleteAppointment" type="is-danger">Удалить просроченные</b-button>
                    </div>
                </div>
                <div class="column has-text-centered is-7" style="min-height: 500px">
                    <div class="columns">
                        <span class="column is-size-4"> Ваши талоны на:</span>
                        <b-field>
                            <b-datepicker
                                    class="column"
                                    v-model="filterDate"
                                    size="is-medium"
                                    @input="onInputDate"
                            />
                        </b-field>
                    </div>
                    <b-table v-if="appointments.length"
                             :data="appointments"
                             :row-class="(row, index) => {
                                  let time = new Date(row.dateTime)
                                  if (row.customerDto ) {
                                  if (time < Date.now() && (row.recommendations || row.diagnosis))
                                      return 'r-green'
                                  if (time < Date.now() && (!row.recommendations || !row.diagnosis))
                                   return 'r-red'
                                   } else {
                                   return 'r-grey'
                                   }
                             }"
                             detailed>
                        <template slot-scope="props">
                            <b-table-column field="id" label="ID" width="100" searchable sortable numeric>
                                {{ props.row.id }}
                            </b-table-column>
                            <b-table-column field="name" label="ФИО" searchable sortable>
                                {{ props.row.customerDto ? props.row.customerDto.surname +
                                " "+props.row.customerDto.name+" "+props.row.customerDto.lastName : "Не занят"}}
                            </b-table-column>
                            <b-table-column field="phone" label="Время" searchable sortable>
                                {{ props.row.dateTime }}
                            </b-table-column>
                            <b-table-column class="has-text-centered" label="Редактировать">
                                <b-button type="is-warning" @click="updateClick(props.row)">Редактировать</b-button>
                            </b-table-column>
                            <b-table-column class="has-text-centered" label="Удалить">
                                <b-button type="is-danger" @click="onDeleteAppointment(props.row.id)"
                                          v-if="!props.row.customerDto">
                                    Отменить
                                </b-button>
                            </b-table-column>
                        </template>
                        <template slot="detail" slot-scope="props">
                            <h2>
                                Причина:
                            </h2>
                            <span>
                            {{props.row.reason}}
                        </span>
                            <h2>
                                Диагноз:
                            </h2>
                            <span>
                            {{props.row.diagnosis}}
                        </span>
                            <h2>
                                Рекомендации:
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
            <b-modal :active.sync="isModalActive"
                     has-modal-card
                     trap-focus
                     :destroy-on-hide="false"
                     aria-role="dialog"
                     aria-modal>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Заполнение диагноза</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Диагноз">
                            <b-input maxlength="200" type="textarea" v-model="appForm.diagnosis"></b-input>
                        </b-field>
                        <b-field label="Рекомендации">
                            <b-input maxlength="200" type="textarea" v-model="appForm.recommendations"></b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="isModalActive = false">Назад</button>
                        <button @click="onSubmitApplicationUpdate" class="button is-primary">Занять</button>
                    </footer>
                </div>
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
    import {getAppointments, deleteAppointment, updateAppointment} from '@/api/appointments'
    import {getDepartment} from '@/api/departments'
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
                isModalActive: false,
                isComponentModalActive: false,
                appForm: {
                    id: "",
                    doctorId: "",
                    customerId: "",
                    reason: "",
                    diagnosis: "",
                    recommendations: "",
                    dateTime: ""
                },
                loading: false,
                appointments: [],
                filterDate: new Date(),
                department: {},
                doctor: {},
                categories: {
                    FIRST: "ПЕРВАЯ",
                    SECOND: "ВТОРАЯ",
                    HIGHEST: "ВЫСШАЯ"
                },
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
            onSubmitApplicationUpdate() {
                updateAppointment(this.appForm.id, this.appForm)
                    .then(() => {
                        this.getAppointmentsList()
                    })
                this.isModalActive = false
            },
            updateClick(row) {
                this.appForm.id = row.id
                this.appForm.customerId = row.customerDto.id
                this.appForm.doctorId = this.doctor.id
                this.appForm.reason = row.reason
                this.appForm.recommendations = row.recommendations
                this.appForm.diagnosis = row.diagnosis
                this.appForm.dateTime = row.dateTime
                this.isModalActive = true
            },
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
            getDepartment() {
                this.loading = true
                getDepartment(this.doctor.id)
                    .then((response) => {
                        this.department = response.data
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    })
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
            onDeleteAppointment(id) {
                this.loading = true
                deleteAppointment(id)
                    .then(() => {
                        this.getAppointmentsList()
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    })
            }
        }
        ,
        created() {
            this.getCurrentDoctor()
                .then(() => {
                    this.getAppointmentsList()
                    this.getDepartment()
                })
        }
        ,
    }
    ;
</script>

<style lang="scss">
    .r-red {
        background-color: rgb(246, 198, 198);
    }

    .r-green {
        background-color: rgb(186, 243, 170);
    }

    .r-grey {
        background-color: rgb(187, 186, 186);
    }

    .doctor-avatar {
        margin-top: 20px;
        width: 70%;
        border-radius: 10px;
    }

    .doctor-card {
        margin-top: 10px;
    }
</style>
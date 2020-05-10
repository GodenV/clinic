<template>
    <section class="container">
        <section class="section dashboard-section">
            <Navbar/>
        </section>
        <b-steps
                class="appointment-steps"
                :label-position="labelPosition"
                :has-navigation="false"
                v-model="slideNum"
                vertical>
            <b-step-item :clickable=true label="Отделения" icon="heart">
                <div class="columns is-multiline is-centered">
                    <div class="column is-12 has-text-centered">
                        <h1 class="is-size-2 padding-10">Выберете одно из отделений нашей клиники</h1>
                        <div class="head-line margin-10" style="width: 50vw"></div>
                        <div class="head-line margin-10" style="width: 35vw"></div>
                        <div class="head-line margin-10" style="width: 25vw"></div>
                    </div>
                    <div :class="selectDepartmentId === department.id && 'focusDepartment'"
                         class="carousel-el column is-narrow" v-for="department in departments" :key="department.id">
                        <div @click="getSelectDepartment(department.id)"
                             class="department-item-button is-size-5 has-text-white"><i class="fas fa-share"></i>
                            {{department.name}}
                        </div>
                        <figure class="department-image">
                            <img :src="department.imageUrl">
                        </figure>
                    </div>
                    <div class="column is-12 has-text-centered">
                        <div class="button is-size-5" @click="slideNum++">Далее</div>
                    </div>
                </div>
            </b-step-item>

            <b-step-item :clickable=true label="Врачи" icon="account">
                <div class="columns is-multiline is-centered">
                    <div class="column is-12 has-text-centered">
                        <h1 class="is-size-2 padding-10">{{selectDepartment.name}}</h1>
                        <div class="head-line margin-10" style="width: 50vw"></div>
                        <div class="head-line margin-10" style="width: 35vw"></div>
                        <div class="head-line margin-10" style="width: 25vw"></div>
                    </div>
                    <div class="column is-4">
                        <figure class="image is-5by4">
                            <img class="border-radius: 5px" :src="selectDepartment.imageUrl">
                        </figure>
                    </div>
                    <div class="column is-8">
                        <span class="has-text-grey is-size-4">Номер телефона: {{selectDepartment.phone}}<br/></span>
                        <span class="has-text-grey-dark is-size-4">Описание:<br/></span>
                        <span class="has-text-grey is-size-5"> {{selectDepartment.description}}</span>
                    </div>
                    <div :class="selectDoctorId === doctor.id && 'doctor-active'"
                         class="doctor margin-30 column is-narrow" v-for="doctor in selectDepartment.doctors"
                         :key="doctor.id">
                        <figure class="circle-doctor">
                            <img :src="doctor.imageUrl" @click="selectDoctorId=doctor.id">
                        </figure>
                        <div class="is-size-5 has-text-centered">
                            {{doctor.name +" "+ doctor.surname +" "+ doctor.lastName}}
                        </div>
                        <div class="is-size-4 has-text-centered">
                            {{doctor.specialization}}
                        </div>
                    </div>
                    <div class="column is-12 has-text-centered">
                        <div class="button is-size-5" @click="slideNum++">Далее</div>
                    </div>
                </div>
            </b-step-item>

            <b-step-item class="final-appointments" :clickable=true label="Social" icon="account-plus">
                <div class="columns is-multiline">
                    <div class="column is-12 has-text-centered">
                        <h1 class="is-size-2 padding-10">{{selectDepartment.name}}</h1>
                        <div class="head-line margin-10" style="width: 50vw"></div>
                        <div class="head-line margin-10" style="width: 35vw"></div>
                        <div class="head-line margin-10" style="width: 25vw"></div>
                    </div>
                    <div class="column is-4">
                        <figure class="image is-5by4">
                            <img class="border-radius: 5px" :src="selectDepartment.imageUrl">
                        </figure>
                    </div>
                    <div v-if="selectedDoctor()"
                         class="doctor margin-30 column is-narrow">
                        <div class="is-size-5 has-text-centered">
                            {{this.selectedDoctor().name +" "+ this.selectedDoctor().surname +" "+
                            this.selectedDoctor().lastName}}
                        </div>
                        <div class="is-size-4 has-text-centered">
                            {{this.selectedDoctor().specialization}}
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <span class="column is-size-4">Талоны на:</span>
                    <b-field>
                        <b-datepicker
                                position="is-top-left"
                                class="column"
                                v-model="filterDate"
                                size="is-medium"
                                @input="onInputDate"
                        />
                    </b-field>
                </div>
                <b-table v-if="appointments.length"
                         :data="appointments">
                    <template slot-scope="props">
                        <b-table-column field="id" label="ID" width="100" searchable sortable numeric>
                            {{ props.row.id }}
                        </b-table-column>
                        <b-table-column field="phone" label="Время" searchable sortable>
                            {{ props.row.dateTime.slice(11,17) }}
                        </b-table-column>
                        <b-table-column class="has-text-centered" label="Редактировать">
                            <b-button type="is-warning" @click="onUpdateClick(props.row)">Забронировать</b-button>
                        </b-table-column>
                    </template>
                </b-table>
                <div v-else class="is-size-4">
                    Нет талонов на выбранную дату
                </div>
            </b-step-item>
        </b-steps>
        <b-modal :active.sync="isModalActive"
                 has-modal-card
                 trap-focus
                 :destroy-on-hide="false"
                 aria-role="dialog"
                 aria-modal>
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Запись на приём</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Причина посещёния">
                        <b-input maxlength="200" type="textarea" v-model="reason"></b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="this.isModalActive=false">Назад</button>
                    <button @click="onSubmit" class="button is-primary">Занять</button>
                </footer>
            </div>
        </b-modal>
    </section>
</template>

<script>
    import Navbar from '@/components/Navbar'
    import {getDepartments, getDepartment} from '@/api/departments'
    import {getAppointments, updateAppointment} from '@/api/appointments'
    import dayjs from "dayjs";
    import {getCustomer} from "../api/customers";

    export default {
        name: "BookAppointment",
        components: {
            Navbar,
        },
        data() {
            return {
                customer: {},
                loading: false,
                labelPosition: 'bottom',
                slideNum: 0,
                filterDate: new Date(),
                appointments: [],
                departments: [],
                selectDepartment: {},
                selectDepartmentId: 0,
                selectDoctorId: 0,
                appForm: {},
                isModalActive: false,
                reason: "",
            }
        },
        methods: {
            getSelectDepartment(id) {
                this.selectDepartmentId = id
                getDepartment(id)
                    .then((response) => {
                        this.selectDepartment = response.data
                        this.selectDoctorId = response.data.doctors[0].id
                    })
                    .catch(() => {
                        }
                    )
            },
            onUpdateClick(form) {
                form.customerId = this.customer.id
                this.appForm = form
                this.isModalActive = true
            },
            onSubmit() {
                let id = this.appForm.id
                this.appForm.reason = this.reason
                delete this.appForm['created']
                delete this.appForm['updated']
                delete this.appForm['id']
                delete this.appForm['customerDto']
                delete this.appForm['status']
                this.appForm["doctorId"] = this.selectDoctorId
                updateAppointment(id, this.appForm)
                this.$router.push({name: 'home'})
            },
            getDepartmentList() {
                this.loading = true
                return getDepartments()
                    .then((response) => {
                        this.departments = response.data
                        this.loading = false
                        Promise.resolve(response)
                    })
                    .catch((error) => {
                        this.loading = false
                        Promise.reject(error)
                    })
            },
            onInputDate() {
                getAppointments(this.selectDoctorId, dayjs(this.filterDate).format('YYYY-MM-DD'))
                    .then((response) => {
                        this.appointments = response.data.filter((app) => {
                            return !app.customerDto
                        })
                    })
                    .catch(() => {

                    })
            },
            searchDoctor(element) {
                return element.id === this.selectDoctorId
            },
            selectedDoctor() {
                return this.selectDepartment.doctors.find(this.searchDoctor)
            }
        },
        watch: {
            selectDoctorId: function (id) {
                console.log("sadasdasd")
                getAppointments(id, dayjs(this.filterDate).format('YYYY-MM-DD'))
                    .then((response) => {
                        this.appointments = response.data
                    })
                    .catch(() => {

                    })
            },
        },
        created() {
            getCustomer(this.$store.getters['auth/user'].id)
                .then((response) => {
                    this.customer = response.data[0]
                })
            this.getDepartmentList()
                .then(() => {
                    this.getSelectDepartment(this.departments[0].id)
                })
        }
    }
</script>

<style lang="scss">
    .final-appointments {
        min-height: 600px;
    }

    .doctor-active {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        transition: all .8s ease;
        padding: 10px;

        img {
            filter: grayscale(0) !important;
        }
    }

    .circle-doctor {
        img {
            object-fit: cover;
            width: 100%;
            height: 270px;
            border-radius: 135px;
            filter: grayscale(0.6);
        }

        margin: auto;
        width: 270px;
        padding-bottom: 30px;
    }

    .appointment-steps .steps {
        position: fixed !important;
        height: 90vh;
        top: 6vh;
        left: 0;
    }

    .focusDepartment {
        img {
            filter: grayscale(0) !important;
            transition: all .8s ease;
        }

        .department-item-button {
            background-color: grey;

            i {
                width: 30px;
                display: inline-block;
            }
        }
    }

    .department-item-button {
        z-index: 1;
        position: absolute;
        top: 225px;
        font-weight: bold;
        right: 5px;
        background-color: #2a4eb2;
        padding: 10px;
        border-radius: 5px;
        width: 220px;
        transition: all .8s ease;
        cursor: pointer;

        i {
            width: 0;
            overflow: hidden;
            transition: all .8s ease;
        }

        &:hover {
            background-color: grey;

            i {
                width: 30px;
                display: inline-block;
            }
        }
    }


    .department-image {
        img {
            filter: grayscale(0.8);
            object-fit: cover;
            width: 100%;
            height: 300px;
            border-radius: 10px;
        }

        margin: auto;
        width: 300px;
        padding-bottom: 30px;
    }

    .head-line {
        background-color: #2a4eb2;
        height: 5px;
    }
</style>
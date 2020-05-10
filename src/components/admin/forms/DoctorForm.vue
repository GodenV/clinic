<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <form class="columns is-multiline"
                  autocomplete="off"
                  @submit.prevent="performSubmit">
                <div class="modal-container">

                    <div class="modal-header is-size-3">
                        Отделения
                    </div>

                    <div class="modal-body">
                        <div class="columns is-multiline">
                            <b-field v-if="!userId"
                                    class="column is-10 is-offset-1"
                                    label="Логин">
                                <b-input v-model="userForm.username" pattern="[a-zA-Z][A-Za-z0-9]{7,15}"></b-input>
                            </b-field>

                            <b-field v-if="!userId"
                                    class="column is-10 is-offset-1"
                                    label="Электронная почта">
                                <b-input type="email" v-model="userForm.email"></b-input>
                            </b-field>

                            <b-field v-if="!userId"
                                    class="column is-10 is-offset-1"
                                    label="Пароль">
                                <b-input v-model="userForm.password"
                                         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}"></b-input>
                            </b-field>
                            <b-field class="column is-10 is-offset-1" label="Имя">
                                <b-input v-model="doctorForm.name" required></b-input>
                            </b-field>
                            <b-field class="column is-10 is-offset-1" label="Фамилия">
                                <b-input v-model="doctorForm.surname" required></b-input>
                            </b-field>
                            <b-field class="column is-10 is-offset-1" label="Отчество">
                                <b-input v-model="doctorForm.lastName" required></b-input>
                            </b-field>
                            <b-field class="column is-10 is-offset-1" label="Специализация">
                                <b-input v-model="doctorForm.specialization" required></b-input>
                            </b-field>
                            <b-field class="column is-10 is-offset-1" label="Категория">
                                <b-select v-model="doctorForm.medicalCategory" required>
                                    <option value="SECOND">Вторая</option>
                                    <option value="FIRST">Первая</option>
                                    <option value="HIGHEST">Высшая</option>
                                </b-select>
                            </b-field>

                            <b-field class="column is-10 is-offset-1" label="Отделения">
                                <b-select v-model="doctorForm.departmentId" required>
                                    <option v-for="department in departments"
                                            :value="department.id"
                                            :key="department.id">
                                        {{department.name}}
                                    </option>
                                </b-select>
                            </b-field>

                            <upload-field
                                    class="column is-offset-1"
                                    rules="required"
                                    title="Фото отделения"
                                    :files.sync="doctorPhoto"
                            />
                        </div>
                    </div>

                    <div class="modal-footer">
                        <b-button class="modal-default-button margin-10" type="is-primary"
                                  @click.prevent="performSubmit">Сохранить
                        </b-button>
                        <b-button class="modal-default-button margin-10" type="is-warning" @click="$emit('close')">
                            Отмена
                        </b-button>
                    </div>
                </div>
            </form>
        </div>
        <div class="column no-padding-right">

            <BLoading
                    :is-full-page="true"
                    :active.sync="loading"
                    :can-cancel="false"
            />
        </div>
    </div>
</template>

<script>
    import UploadField from '@/components/fields/UploadField'
    import {updateDoctor, createDoctor, addDoctorPhoto} from '@/api/doctors'
    import {createUser, getUser} from '@/api/users'
    import {getDepartments} from '@/api/departments'

    export default {
        name: "DoctorForm",
        components: {
            UploadField,
        },

        data() {
            return {
                departments: [],
                loading: false,
                doctorId: 0,
                userId: 0,
                userForm: {
                    username: "",
                    password: "",
                    email: "",
                    roles: ["ROLE_DOCTOR"],
                },
                doctorForm: {
                    name: "",
                    surname: "",
                    lastName: "",
                    specialization: "",
                    medicalCategory: "",
                    departmentId: "",
                    userId: 0,
                },
                doctorPhoto: null,
            }
        },

        props: ['getDoctor'],

        created() {
            let doctor = this.getDoctor()
            this.getDepartmentsList()
            if (doctor.name) {
                this.doctorForm.name = doctor.name
                this.doctorForm.surname = doctor.surname
                this.doctorForm.lastName = doctor.lastName
                this.doctorForm.specialization = doctor.specialization
                this.doctorForm.medicalCategory = doctor.medicalCategory
                this.doctorForm.departmentId = doctor.departmentId
                this.doctorId = doctor.id
                this.doctorForm.userId = doctor.userId
                this.userId = doctor.userId
                this.doctorPhoto = doctor.imageUrl
                this.getUserById()
            }
        },



        methods: {
            getDepartmentsList() {
                this.loading = true
                getDepartments()
                    .then((response) => {
                        this.departments = response.data
                        this.loading = false
                    })
                    .catch((error) => {
                        console.log(error)
                        this.loading = false
                    })
            },
            getUserById(){
               this.loading = true
                getUser(this.userId)
                    .then((response) => {
                        this.userForm = {email: response.data.email, username: response.data.username},
                        this.loading = false
                    })
                    .catch((error) => {
                        console.log(error)
                        this.loading = false
                    })
            },
            selectSubmitMethod() {
                if (this.doctorId)
                    return updateDoctor(this.doctorId, this.doctorForm)
                return createDoctor(this.doctorForm)
            },

            selectUserMethod() {
                if (!this.userId)
                    return createUser(this.userForm).then((response) => {
                        this.doctorForm.userId = response.data.id
                    })
                return Promise.resolve()

            },

            performSubmit() {
                this.errorMsg = ''
                this.loading = true
                this.selectUserMethod()
                    .then(() => {
                        this.selectSubmitMethod()
                            .then((response) => {
                                let id = response.data.doctorId || this.doctorId
                                if (this.doctorPhoto instanceof File) {
                                    let formData = new FormData()
                                    formData.append('file', this.doctorPhoto)
                                    addDoctorPhoto(id, formData)
                                        .then(() => {
                                            this.$emit('close')
                                            this.loading = false
                                        })
                                }
                                else {
                                    this.loading = false
                                    this.$emit('close')
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                this.loading = false
                                this.errorMsg = error.data
                            })
                    })
                .catch((error) =>{
                    console.log(error)
                })
            },
        }
    }
</script>

<style lang="scss">


</style>
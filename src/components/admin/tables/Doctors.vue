<template>
    <section class="departments">
        <b-button type="is-success" @click="showModal=true">Добавить</b-button>
        <b-table :data="doctors"
                 detailed>
            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="100" searchable sortable numeric>
                    {{ props.row.id }}
                </b-table-column>
                <b-table-column field="name" label="ФИО" searchable sortable>
                    {{ props.row.name + props.row.surname + props.row.lastName}}
                </b-table-column>
                <b-table-column field="specialization" label="Специализация" searchable sortable>
                    {{ props.row.specialization}}
                </b-table-column>
                <b-table-column field="medicalCategory" label="Категория" searchable sortable>
                    {{ props.row.medicalCategory}}
                </b-table-column>
                <b-table-column field="departmentId" label="Отделение" searchable sortable>
                    {{ props.row.departmentId}}
                </b-table-column>
                <b-table-column class="has-text-centered" label="Редактировать">
                    <b-button type="is-warning" @click="updateClick(props.row.id)">Редактировать</b-button>
                </b-table-column>
                <b-table-column class="has-text-centered" label="Удалить">
                    <b-button type="is-danger" @click="deleteClick(props.row.id)">Удалить</b-button>
                </b-table-column>
            </template>
            <template slot="detail" slot-scope="props">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img :src="props.row.imageUrl">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ props.row.name }}</strong>
                                <br>
                                {{ props.row.description }}
                            </p>
                        </div>
                    </div>
                </article>
            </template>
        </b-table>
        <DoctorForm :getDoctor="this.getDoctor" @close="closeModal" v-if="showModal"/>
    </section>
</template>

<script>
    import {getDoctors, deleteDoctor} from '@/api/doctors'
    import DoctorForm from '../forms/DoctorForm'

    export default {
        name: "DoctorsTable",
        components: {DoctorForm},
        comments: {
            DoctorForm,
        },
        data() {
            return {
                doctors: [],
                selectId: 0,
                showModal: false
            }
        },
        created() {
            this.getDoctorsList()
        },
        methods: {
            deleteClick(id) {
                deleteDoctor(id)
                    .then((response) => {
                        this.doctors = response.data
                        this.loading = false
                        this.getDoctorsList()
                    })
                    .catch((error) => {
                        console.log(error)
                        this.loading = false
                    })
            },
            closeModal() {
                this.selectId = 0
                this.showModal = false
                this.getDoctorsList()
            },
            findDoctor(element) {
                return element.id === this.selectId
            },
            getDoctor() {
                return this.doctors.find(this.findDoctor) || {}
            },
            updateClick(id) {
                this.showModal = true
                this.selectId = id
            },
            getDoctorsList() {
                this.loading = true
                getDoctors()
                    .then((response) => {
                        this.doctors = response.data
                        this.loading = false
                    })
                    .catch((error) => {
                        console.log(error)
                        this.loading = false
                    })
            }
        }
    }
</script>

<style lang="scss">
    .departments {
        width: 100%;
    }
</style>
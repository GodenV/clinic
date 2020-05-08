<template>
    <section class="departments">
        <b-button type="is-success" @click="showModal=true">Добавить</b-button>
        <b-table :data="departments"
                 detailed>
            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="100" searchable sortable numeric>
                    {{ props.row.id }}
                </b-table-column>
                <b-table-column field="name" label="Наименование" searchable sortable>
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="phone" label="Номер телефона" searchable sortable>
                    {{ props.row.phone }}
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
        <DepartmentForm :getDepartment="this.getDepartment" @close="closeModal" v-if="showModal"/>
    </section>
</template>

<script>
    import {getDepartments, deleteDepartment} from '@/api/departments'
    import DepartmentForm from '../forms/DepartmentForm'

    export default {
        name: "DepartmentsTable",
        components: {DepartmentForm},
        comments: {
            DepartmentForm,
        },
        data() {
            return {
                departments: [],
                selectId: 0,
                showModal: false
            }
        },
        created() {
            this.getDepartmentsList()
        },
        methods: {
            deleteClick(id) {
                deleteDepartment(id)
                    .then((response) => {
                        this.departments = response.data
                        this.loading = false
                        this.getDepartmentsList()
                    })
                    .catch((error) => {
                        console.log(error)
                        this.loading = false
                    })
            },
            closeModal() {
                this.selectId = 0
                this.showModal = false
                this.getDepartmentsList()
            },
            findDepartment(element) {
                return element.id === this.selectId
            },
            getDepartment() {
                return this.departments.find(this.findDepartment) || {}
            },
            updateClick(id) {
                this.showModal = true
                this.selectId = id
            },
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
            }
        }
    }
</script>

<style lang="scss">
    .departments {
        width: 100%;
    }
</style>
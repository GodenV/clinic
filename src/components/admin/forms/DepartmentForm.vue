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
                            <b-field class="column is-10 is-offset-1" label="Наименование отделения">
                                <b-input v-model="departmentForm.name" required></b-input>
                            </b-field>
                            <b-field class="column is-10 is-offset-1" label="Номер телефона">
                                <b-input v-model="departmentForm.phone" pattern="[\+]\d{12}" required></b-input>
                            </b-field>
                            <b-field class="column is-10 is-offset-1" label="Описание отделения">
                                <b-input v-model="departmentForm.description" type="textarea"
                                         minlength="10"
                                         maxlength="1000"
                                         placeholder="Описание ортделения"
                                         required>
                                </b-input>
                            </b-field>
                            <upload-field
                                    class="column is-offset-1"
                                    rules="required"
                                    title="Фото отделения"
                                    :files.sync="departmentPhoto"
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
    import {updateDepartment, createDepartment, addDepartmentPhoto} from '@/api/departments'

    export default {
        name: "DepartmentForm",
        components: {
            UploadField,
        },

        data() {
            return {
                loading: false,
                id: 0,
                departmentForm: {
                    description: "",
                    name: "",
                    phone: ""
                },
                departmentPhoto: null,
            }
        },

        props: ['getDepartment'],

        created() {
            let department = this.getDepartment()
            if (department.name) {
                this.departmentForm.phone = department.phone
                this.departmentForm.description = department.description
                this.departmentForm.name = department.name
                this.departmentPhoto = department.imageUrl
                this.id = department.id
            }
        },

        methods: {
            selectSubmitMethod() {
                if (this.id)
                    return updateDepartment(this.id, this.departmentForm)
                return createDepartment(this.departmentForm)
            },
            performSubmit() {
                this.errorMsg = ''
                this.loading = true

                this.selectSubmitMethod()
                    .then((response) => {
                        if (this.departmentPhoto instanceof File) {
                            let id = response.data.departmentId || this.id
                            let formData = new FormData()
                            formData.append('file', this.departmentPhoto)
                            addDepartmentPhoto(id, formData)
                                .then(() => {
                                    this.$emit('close')
                                    this.loading = false
                                })
                        } else {
                            this.loading = false
                            this.$emit('close')
                        }
                    })
                    .catch((error) => {
                        this.loading = false
                        this.errorMsg = error.data
                    })
            },

        }
    }
</script>

<style lang="scss">
    .modal-default-button {
        float: right;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        overflow-y: auto;
        max-height: 90vh;
        max-width: 800px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-body {
        margin: 20px 0;
    }


    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

</style>
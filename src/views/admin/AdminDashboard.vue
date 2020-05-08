<template>
    <section class="hero is-medium is-relatives">
        <navbar/>
        <div class="hero-body">
            <b-tabs type="is-toggle" expanded v-model="activeTab">
                <b-tab-item label="Отделения">
                    <DepartmentsTable/>
                </b-tab-item>

                <b-tab-item label="Доктора">
                    <DoctorsTable/>
                </b-tab-item>
            </b-tabs>
        </div>
    </section>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import DepartmentsTable from "../../components/admin/tables/Departments"
    import DoctorsTable from '../../components/admin/tables/Doctors'

    export default {
        name: "AdminDashboard",
        components: {
            DoctorsTable,
            Navbar,
            DepartmentsTable,
        },
        data() {
            return {
                activeTab: 0,
            }
        }
    }
</script>

<style lang="scss">

</style>
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

import Home from '@/views/Home'
import Auth from '@/views/Authentication'
import ClientDashboard from '@/views/client/Dashboard'
import AdminDashboard from '@/views/admin/AdminDashboard'
import DoctorDashboard from '@/views/doctor/DoctorDashboard'
import FAQ from '@/views/FAQ'

Vue.use(Router)

function checkPermission(to, from, next) {

    if (!to.meta.roles) {
        return next()
    }
    if (to.meta.roles.filter(x => store.state.auth.user.roles.includes(x)).length) {
        return next()
    } else {
        switch (store.state.auth.user.roles[0]) {
            case 'ROLE_USER':
                return next({
                    name: 'client-dashboard'
                })
            case 'ROLE_DOCTOR':
                return next({
                    name: 'doctor-dashboard'
                })
            case 'ROLE_ADMIN':
                return next({
                    name: 'admin-dashboard'
                })
        }
    }
}

const router = new Router({

    scrollBehavior() {
        return {x: 0, y: 0}
    },

    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/faq',
            name: 'faq',
            component: FAQ
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: Auth,
            meta: {
                noAuth: true
            }
        },
        {
            path: '/client',
            name: 'client-dashboard',
            component: ClientDashboard,
            meta: {
                roles: ['ROLE_ADMIN', 'ROLE_USER']
            }
        },
        {
            path: '/admin',
            name: 'admin-dashboard',
            component: AdminDashboard,
            meta: {roles: ['ROLE_ADMIN']}
        },
        {
            path: '/doctor',
            name: 'doctor-dashboard',
            component: DoctorDashboard,
            meta: {roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']}
        }
    ]
})

router.beforeEach((to, from, next) => {
    const userAuthed = store.getters[`auth/isAuthenticated`]
    const accessToken = localStorage.getItem('accessToken')

    if (!userAuthed && accessToken) {
        store.dispatch(`auth/getCurrentUser`, accessToken)
    }

    if (to.meta.noAuth && !!accessToken) {
        switch (store.state.auth.user.roles[0]) {
            case 'ROLE_USER':
                return next({
                    name: 'client-dashboard'
                })
            case 'ROLE_DOCTOR':
                return next(
                    {
                        name: 'doctor-dashboard'
                    }
                )
            case 'ROLE_ADMIN':
                return next({
                    name: 'admin-dashboard'
                })
        }
    }

    if (to.meta.roles && !accessToken) {
        return next({name: 'login'})
    } else if (to.meta.roles && accessToken) {
        if (store.state.auth.user.roles === undefined) {
             console.log("asadsadasdads")
            const watcher = store.watch((state) => state.auth.user, () => {
                watcher()
                checkPermission(to, from, next)
            })
        } else {
            checkPermission(to, from, next)
        }
    } else if (!to.meta.roles) {
        return next()
    }
})

// router.beforeEach((to, from, next) => {
//     const ref = to.query.ref_src
//
//     if (ref) {
//         localStorage.setItem('ref_src', ref)
//     }
//
//     let userAuthed = store.getters[`auth/isAuthenticated`]
//     let accessToken = localStorage.getItem('accessToken')
//
//     if (!userAuthed && accessToken) {
//         store.dispatch(`auth/getCurrentUser`, accessToken)
//     }
//
//     if (to.meta.auth && !accessToken) {
//         return next({name: 'login'})
//     } else if (to.meta.noAuth && accessToken) {
//         return next({name: 'home'})
//     } else {
//         return next()
//     }
// })


export default router
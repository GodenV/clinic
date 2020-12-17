<template>
  <nav
    class="navbar navbar-wrapper navbar-fade is-fixed-top"
    :class="[
      { 'start-nav navbar-light': !faded && !transpanent },
      { 'navbar-faded': faded || transpanent },
      { 'is-dark-mobile': navbarActive },
    ]"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <router-link
          :to="{ name: 'home' }"
          class="navbar-item"
          @click.native="navbarActive = false"
        >
          <img src="../assets/logo.png" alt="Лого" class="light-logo" />
          <img src="../assets/logo.png" alt="Лого" class="dark-logo" />
        </router-link>

        <!-- Responsive toggle -->
        <div class="custom-burger" @click="navbarActive = !navbarActive">
          <a id="" class="responsive-btn">
            <span class="menu-toggle">
              <span class="icon-box-toggle">
                <span class="rotate">
                  <i class="icon-line-top" />
                  <i class="icon-line-center" />
                  <i class="icon-line-bottom" />
                </span>
              </span>
            </span>
          </a>
        </div>
        <!-- /Responsive toggle -->
      </div>

      <div class="navbar-menu" :class="[{ 'is-active': navbarActive }]">
        <!-- Navbar Start -->
        <div class="navbar-start">
          <!-- Navbar item -->
          <router-link
            :to="{ name: 'home' }"
            class="navbar-item is-slide"
            @click.native="navbarActive = false"
          >
            Главная
          </router-link>
          <router-link
            :to="{ name: 'faq' }"
            class="navbar-item is-slide"
            @click.native="navbarActive = false"
          >
            Частые вопросы
          </router-link>
          <router-link
            v-if="
              isAuthenticated &&
              this.$store.getters['auth/user'].roles[0] === 'ROLE_USER' &&
              this.customer
            "
            :to="{ name: 'book-appointment' }"
            class="navbar-item is-slide"
            @click.native="navbarActive = false"
          >
            Записаться на прием
          </router-link>
          <router-link
            :to="{ name: 'stats' }"
            class="navbar-item is-slide"
            @click.native="navbarActive = false"
          >
            Статистика
          </router-link>
        </div>

        <!-- Navbar end -->
        <div v-if="!isAuthenticated" class="navbar-end">
          <!-- Signup button -->
          <div class="navbar-item">
            <a
              :class="[{ 'has-text-white': !faded && !transpanent }]"
              href="tel:+375293470077"
              >+375 (29) 347-00-77</a
            >
          </div>
          <div class="navbar-item">
            <router-link
              id="#signin-btn"
              :to="{ name: 'authentication' }"
              href="#"
              class="button button-signup btn-outlined is-bold btn-align rounded raised"
              :class="[
                { 'light-btn': !faded && !transpanent },
                { 'secondary-btn': faded || transpanent },
              ]"
            >
              Вход
            </router-link>
          </div>
        </div>
        <div v-if="this.$store.getters['auth/user']" class="navbar-end">
          <!-- Signup button -->
          <div class="navbar-item">
            <a
              :class="[{ 'has-text-white': !faded && !transpanent }]"
              href="tel:+375293470077"
              >+375 (29) 347-00-77</a
            >
          </div>
          <div class="navbar-item">
            <router-link
              :to="{ name: dash[this.$store.getters['auth/user'].roles[0]] }"
              class="button button-signup btn-outlined is-bold btn-align rounded raised"
              :class="[
                { 'light-btn': !faded && !transpanent },
                { 'secondary-btn': faded || transpanent },
              ]"
              @click.native="navbarActive = false"
            >
              Личный кабинет
            </router-link>
          </div>
          <div class="navbar-item">
            <a
              class="button button-signup btn-outlined is-bold btn-align rounded raised"
              :class="[
                { 'info-btn': !faded && !transpanent },
                { 'info-btn': faded || transpanent },
              ]"
              @click="performLogout"
            >
              Выход
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getCustomer } from "@/api/customers";
import store from "@/store/index";

export default {
  name: "Navbar",

  props: ["transpanent"],

  data() {
    return {
      customer: undefined,
      loginOpen: false,
      navbarActive: false,
      faded: false,
      publicPath: process.env.BASE_URL,
      dash: {
        ROLE_ADMIN: "admin-dashboard",
        ROLE_USER: "client-dashboard",
        ROLE_DOCTOR: "doctor-dashboard",
      },
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  mounted() {
    this.navbarScroll();
  },
  methods: {
    ...mapActions("auth", ["logout"]),

    closeLoginForm(value) {
      this.loginOpen = !value;
    },

    performLogout() {
      this.logout().then(() => {
        const path = "/";
        if (this.$route.path !== path) {
          this.$router.push({ name: "home" });
        }
      });
    },

    navbarToggle() {
      this.navbarActive = !this.navbarActive;
    },

    getCurrentCustomer() {
      return getCustomer(store.getters["auth/user"].id);
    },

    navbarScroll() {
      window.addEventListener("scroll", () => {
        let height = window.scrollY;
        if (height > 65) {
          this.faded = true;
        } else {
          this.faded = false;
        }
      });
    },
  },

  created() {
    if (this.isAuthenticated) {
      this.getCurrentCustomer()
        .then((response) => {
          this.customer = response.data[0];
        })
        .catch(() => {});
    }
  },
};
</script>

<style lang="scss">
.navbar-item {
  &:focus {
    background-color: transparent !important;
  }
}

.start-nav {
  background-color: rgba(40, 35, 250, 0.8) !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius-bottomleft: 3px;
  border-radius-bottomright: 3px;
}

.navbar-faded {
  background: rgba(255, 255, 255, 0.8) !important;
}
</style>

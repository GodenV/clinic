<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {


        computed: {
            ...mapState('auth', ['user'])
        }

    }

</script>

<style lang="scss">

  @import 'assets/scss/spacing.module';
  @import 'assets/scss/animation.module';
  @import 'assets/scss/main.module';
  @import 'assets/scss/form.module';
  @import 'assets/icons/all.min.css';

</style>

<template>
  <div>
    <section class="section is-medium faq-section">
      <navbar v-bind:transpanent="true"/>

      <div class="container">
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div class="section-title-wrapper has-text-centered">
              <div class="bg-number has-text-grey-light">
                <i class="fas fa-question" />
              </div>
              <h1 class="section-title-landing is-size-4 has-text-white">
                Часто задаваемые вопросы
              </h1>
              <div class="has-text-grey-lighter">
                Прозрачные ответы на распространенные вопросы
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section win-faq">
      <div class="container">
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <template
              v-for="(item, key) in questions"
            >
              <div :key="key">
                <div
                  class="title-wrapper m-t-xl"
                >
                  <div class="title is-landing quick-feature">
                    {{ item.title }}
                  </div>
                  <div class="title-divider is-small" />
                </div>
                <span
                  class="section-feature-description"
                  v-html="item.text"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>

    <footer-bar />
  </div>
</template>

<script>
import FooterBar from '../components/Footer'
import Navbar from '../components/Navbar'
export default {
  metaInfo: {
    title: 'Частые вопросы',
    titleTemplate: '%s | Онлайн Займы WinWin',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'В этом разделе вы найдете ответы на часто задаваемых вопросы о сервисе займов WinWin, как получить и погасить займ' }
    ]
  },
  name: 'WinFaq',
  components: { Navbar, FooterBar },
  data () {
    return {
      questions: [
        {
          title: 'Что такое HelthFlex',
          text: 'HelthFlex - это одна из лучших клиник в РБ, с высоким качеством предлагаемых услуг и сервисом, где работают лучшие специалисты',
        },
      ]
    }
  }
}
</script>

<style lang="scss">
.faq-section {
  background: linear-gradient(45deg, #0082c8, #6441A5);;
}
.faq-section:before {
    background: transparent url('../assets/images/wavy-alt.png') no-repeat scroll 0 bottom / 100% auto;
    content: "";
    height: 321px;
    width: 100%;
    position: absolute;
    top: 160px;
    left: 0;
}
</style>

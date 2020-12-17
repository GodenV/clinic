<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CometChat } from "@cometchat-pro/chat";

export default {
  computed: {
    ...mapState("auth", ["user"]),
  },
  created() {
    this.initializeApp();
  },
  methods: {
    initializeApp() {
      let cometChatSettings = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion("eu")
        .build();
      CometChat.init("2730004d1e1a02d", cometChatSettings).then(
        () => {
          console.log("Initialization completed successfully");
          //You can now call login function.
        },
        (error) => {
          console.log("Initialization failed with error:", error);
          //Check the reason for error and take apppropriate action.
        }
      );
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/spacing.module";
@import "assets/scss/animation.module";
@import "assets/scss/main.module";
@import "assets/scss/form.module";
@import "assets/icons/all.min.css";
</style>

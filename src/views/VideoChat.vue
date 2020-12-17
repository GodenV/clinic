<template>
  <div class="main-video-block">
    <Navbar />
    <div class="call-info">
      <span>Консультация со специалистом</span>
      <br>
      <i class="fas fa-phone-volume"></i>
    </div>
    <div id="callScreen"></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { CometChat } from "@cometchat-pro/chat";

export default {
  components: {
    Navbar,
  },
  name: "VideoChat",
  data() {
    return {
      username: "",
      uid: "",
      session_id: "",
      receiver_id: null,
      error: false,
      showSpinner: false,
      incomingCall: true,
      ongoingCall: false,
    };
  },
  created() {
    let sessionID = "123456";
    let audioOnly = false;
    let deafaultLayout = true;

    let callSettings = new CometChat.CallSettingsBuilder()
      .setSessionID(sessionID)
      .enableDefaultLayout(deafaultLayout)
      .setIsAudioOnlyCall(audioOnly)
      .build();

let usrnm =
      this.$route.query.role === "doctor" ? "specus" : "pacus";
    CometChat.login(usrnm, "1bff403f0c20df538233c03364a04b046eb93f8a").then(
      () => {

    CometChat.startCall(
      callSettings,
      document.getElementById("callScreen"),
      new CometChat.OngoingCallListener({
        onCallEnded: (call) => {
          console.log("Call ended:", call);
        },
        onError: (error) => {
          console.log("Error :", error);
        },
      })
    );
      }
    );
  }
};
</script>

<style lang="scss">
#callScreen {
  width: 911px;
  height: 800px;
  border: 1px solid white;
}

.main-video-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;

  .call-info {
    height: 80vh;
    width: 28vw;
    span{
      font-size: 25px;
    }

    i{
      margin-top: 40px;
      font-size: 420px;
      color:green;
    }
  }
}

iframe {
  height: 70vh !important;
  border-radius: 50px;
}

</style>
<template>
   <div class="modal-card" style="width: auto">
        <app-header :title='title'></app-header>        
        <div class="contents">
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
            <div v-for='message in messages' :key="message.child_message">
            <card v-for="(child_message, index) in message.child_messages" 
                :key="index"
                :content="child_message.content"
                :call="child_message.message_call"
                :message="child_message.message"
                :id="child_message.goal_id"
                @remove="removeMessage"
                ></card>
            </div>    
        </div>
        <fab :icon="fabIcon" @click="isComponentModalActive = true"></fab>
        <app-footer></app-footer>
        <under-tab :index='2'></under-tab>
        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <modal-form @add="addMessage"></modal-form>
        </b-modal>
    </div>
</template>
<script>
import http from "../../service/service";
import UnderTab from "../modules/underTab.vue";
import AppHeader from "../modules/header.vue";
import AppFooter from "../modules/footer.vue";
import Card from "../modules/messageCard.vue";
import ModalForm from "../modules/addMessageModal.vue";
import Fab from "../modules/fab.vue";

export default {
  name: "messages",
  components: {
    UnderTab,
    AppHeader,
    AppFooter,
    Card,
    ModalForm,
    Fab
  },
  data() {
    return {
      title: "メッセージ設定",
      goal_id: "",
      fabIcon: "plus",
      isComponentModalActive: false,
      isLoading: false,
      messages: []
    };
  },
  methods: {
    addMessage(data) {
      this.isComponentModalActive = false;
      http
        .addMessage(this.goal_id, Number(data.message_call), data.message)
        .then(response => {
          console.log(response);
          this.getMessage();
        })
        .catch(err => {
          if (err) {
            this.$dialog.alert({
              title: "Error",
              message: err.response.data.error,
              type: "is-danger",
              hasIcon: true,
              icon: "times-circle",
              iconPack: "fa"
            });
            switch (err.response.status) {
              case 401:
                http.RemoveToken();
                this.$router.push({ path: "/" });
                break;
              default:
                break;
            }
          }
        });
    },
    getMessage() {
      this.isLoading = true;
      http
        .getMessage()
        .then(response => {
          this.isLoading = false;
          this.messages = response.data.messages;
          console.log("messages");
          console.log(this.messages);
          console.log("messages.child_messages");
          console.log(this.messages.child_messages);
        })
        .catch(err => {
          this.isLoading = false;
          if (err) {
            this.$dialog.alert({
              title: "Error",
              message: err.response.data.error,
              type: "is-danger",
              hasIcon: true,
              icon: "times-circle",
              iconPack: "fa"
            });
            switch (err.response.status) {
              case 401:
                http.RemoveToken();
                this.$router.push({ path: "/" });
                break;
              default:
                break;
            }
          }
        });
    },
    removeMessage(id, call,content) {
      this.$dialog.confirm({
        title: "メッセージ削除",
        message: "『" + content + "の" + call + "回目" + "』を削除しますか？",
        confirmText: "削除",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          http
            .removeMessage(id, call)
            .then(response => {
              console.log("delete");
              this.getMessage();
            })
            .catch(err => {
              if (err) {
                this.$dialog.alert({
                  title: "Error",
                  message: err.response.data.error,
                  type: "is-danger",
                  hasIcon: true,
                  icon: "times-circle",
                  iconPack: "fa"
                });
                switch (err.response.status) {
                  case 401:
                    http.RemoveToken();
                    this.$router.push({ path: "/" });
                    break;
                  default:
                    break;
                }
              }
            })
      });
    }
  },
  created() {
    this.goal_id = localStorage.getItem("goal_id");
    this.getMessage();
  }
};
</script>

<style>
</style>
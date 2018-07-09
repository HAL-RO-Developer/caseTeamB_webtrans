<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <span class="title is-6">メッセージ</span>
        </header>
        <section class="modal-card-body">
            <b-field label="目標一覧">
                <b-select
                    type="text"
                    v-model="data.goal_id"
                    placeholder="目標一覧"
                    required>
                    <option v-for="goal in goals"
                    :key="goal.goal_id" :value="goal.goal_id">
                    {{goal.content}}</option>
                </b-select>
            </b-field>
            <b-field label="回数:">
                <b-input type="number" v-model="data.message_call" min="1"></b-input>
            </b-field>
            <b-field label="メッセージ:">
                <b-input maxlength="140" type="textarea" v-model="data.message" required></b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">キャンセル</button>
            <button class="button is-primary" @click="add">追加</button>
        </footer>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        goal_id: "",
        message_call: null,
        message: ""
      },
      goals: []
    };
  },
  methods: {
    add() {
      this.$emit("add", this.data);
    },
    getGoal() {
      http
        .getGoal()
        .then(response => {
          console.log(response);
          this.goals = response.data.goals.child_goals;
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  },
  created: function(){
      this.getGoal();
  }
};
</script>
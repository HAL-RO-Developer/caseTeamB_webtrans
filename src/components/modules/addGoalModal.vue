<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">目標追加</p>
        </header>
        <section class="modal-card-body">
            <b-field label="子ども名">
                <b-select
                    type="text"
                    v-model="data.child_id"
                    placeholder="子ども名"
                    icon="account"
                    required>
                    <option v-for="child in children"
                    :key="child.child_id" :value="child.child_id">
                    {{child.nickname}}</option>
                </b-select>
            </b-field>
            <b-field label="目標名">
                <b-input
                    type="text"
                    v-model="data.content"
                    placeholder="目標名"
                    required>
                </b-input>
           </b-field>
           <b-field label="達成目標数">
             <b-input
                    type="text"
                    v-model="data.content"
                    placeholder="目標名"
                    required>
                </b-input>
            </b-field>
          <b-field label="期限">
            <b-datepicker
              placeholder="Click to select..."
              icon="calendar-today"
              :readonly="false"
              v-model="deadline"
              >
            </b-datepicker>
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
        children: [],
        child_id: null,
        content: "",
        criteria: null,
        deadline: new Date()
      }
    };
  },
  methods: {
    add() {
      this.$emit("add", this.data);
    },
    getChild() {
      http
        .getChild()
        .then(response => {
          console.log(response);
          this.children = response.data.children;
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
    }
  }
};
</script>
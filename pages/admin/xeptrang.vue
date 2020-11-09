<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex lg4 pa-2>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title class="text-xs-center"
              >Feature List</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="success" @click="SaveList">Save</v-btn>
          </v-toolbar>
          <draggable v-model="list">
            <transition-group name="slide-fade">
              <v-alert
                outline
                color="success"
                icon="open_with"
                v-for="(element, index) in list"
                :key="element.title"
                :value="true"
              >
                <v-avatar>
                  <v-img
                    :src="`${element.thumb}`"
                    height="50"
                    width="50"
                  ></v-img>
                </v-avatar>
                {{ element.title }}
                <v-icon
                  @click="removeItem(element, index)"
                  dark
                  class="float-right"
                  >remove_circle</v-icon
                >
              </v-alert>
            </transition-group>
          </draggable>
        </v-card>
      </v-flex>
      <v-flex lg8 pa-2>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title class="text-xs-center"
              >List article</v-toolbar-title
            >
          </v-toolbar>
          <v-toolbar card color="white">
            <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Nhập từ khóa cần tìm "
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <v-btn icon>
              <v-icon>filter_list</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="complex.headers"
              :search="search"
              :items="items"
              :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
              class="elevation-1"
              item-key="name"
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-avatar>
                    <v-img :src="`${props.item.thumb}`" max-height="50"></v-img>
                  </v-avatar>
                </td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.cate }}</td>
                <td>
                  <v-icon
                    ref="rm"
                    :disabled="props.item.disableButton"
                    @click="AddToList(props.item)"
                    color="teal"
                    >add_box</v-icon
                  >
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import draggable from "vuedraggable";
export default {
  layout: "dashboard",
  data: () => ({
    alert: {
      ishow: true,
    },
    terms: false,
    search: "",
    complex: {
      headers: [
        {
          text: "Thumb",
          value: "thumb",
        },
        {
          text: "Tên",
          value: "name",
        },
        {
          text: "Danh mục",
          value: "cate",
        },
        {
          text: "Action",
          value: "",
        },
      ],
    },
    list: [],
    items: [],
  }),
  components: {
    draggable,
  },
  mounted() {
    this.getFeature();
    this.getArticles();
  },
  methods: {
    async getArticles() {
      const { data } = await this.$axios.get("/api/articles");
      this.items = data;
      // check item in list
      if (this.list.length != 0) {
        this.list.map((v, k) => {
          let id = v._id;
          const found = this.items.find((element) => element._id == id);
          if (found !== undefined) {
            found.disableButton = true;
          }
        });
      }
    },
    async getFeature() {
      const { data } = await this.$axios.get("/api/layouts");
      if (data.layouts.length != 0) {
        this.list = data.layouts[0].feature;
      }
    },
    SaveList() {
      let listFeature = JSON.stringify(this.list);
      console.log(listFeature);
      this.$axios
        .post("/api/feature", { feature: listFeature })
        .then((response) => {
          this.makeToast("success", "Thêm List thành công");
        })
        .catch((error) => {
          if (error.response.data.errors[0].msg) {
            this.makeToast("warning", error.response.data.errors[0].msg);
          }
        });
    },
    AddToList(obj) {
      obj.disableButton = true;
      let id = obj._id;
      const found = this.list.find((element) => element._id == id);
      if (found === undefined) {
        obj.position;
        this.list.push(obj);
      } else {
        this.makeToast("warning", "Bài viết đã được thêm");
      }
    },
    removeItem(obj, index) {
      let id = obj._id;
      obj.disableButton = false;
      this.list.splice(index, 1);
      let newArr = this.items.map((u) => (u._id !== id ? u : obj));
      this.items = newArr;
    },
    makeToast(variant = null, content) {
      this.$bvToast.toast(content, {
        title: `Thông Báo`,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
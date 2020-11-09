<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex lg4 pa-2>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title class="text-xs-center">Main Menu</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="SaveList">Save</v-btn>
          </v-toolbar>
          <draggable v-model="list">
            <transition-group name="slide-fade">
              <v-alert
                outline
                color="success"
                icon="open_with"
                v-for="element in list"
                :key="element.id_x"
                :value="true"
                v-show="element.status"
              >
                {{ element.name }}
              </v-alert>
            </transition-group>
          </draggable>
        </v-card>
      </v-flex>
      <v-flex lg8 pa-2>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title class="text-xs-center">List Menu</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="success" round @click="AddCat">Thêm Menu</v-btn>
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
              item-key="id_x"
            >
              <template slot="items" slot-scope="props">
                <td>
                  {{ props.item.parent }}
                </td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.link }}</td>
                <td>
                  <v-chip
                    :color="props.item.status ? 'green' : 'red'"
                    text-color="white"
                  >
                    <v-avatar class="amber accent-4">{{
                      props.item.status
                    }}</v-avatar>
                    {{ props.item.status ? "Đang mở" : "Đang tắt" }}
                  </v-chip>
                </td>
                <td>
                  <v-icon @click="Edit(props.item)" color="teal">edit</v-icon>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- POPUP  -->
    <v-dialog v-model="popup.dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ popup.head_title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="popup.dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  :items="items"
                  v-validate="'required'"
                  data-vv-name="parent:"
                  v-model="popup.parent"
                  label="Chuyên Mục cha"
                  required
                  auto
                  item-text="name"
                  item-value="name"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Nhập Tên Chuyên Mục"
                  type="text"
                  v-model="popup.name"
                  v-on:change="signalChange"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Slug"
                  type="text"
                  v-model="popup.slug"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-subheader class="pa-0">Trạng thái: </v-subheader>
                <v-switch
                  :label="popup.status ? 'On' : 'Off'"
                  v-model="popup.status"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="popup.dialog = false"
            >Close</v-btn
          >
          <v-btn
            v-if="popup.head_title === 'Thêm Menu'"
            color="blue darken-1"
            flat
            @click.native="submitForm"
            >Save</v-btn
          >
          <v-btn v-else color="blue darken-1" flat @click.native="UpdateForm"
            >Sửa</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { ConverToSlug } from "@/helpers/FuncHelper";
import draggable from "vuedraggable";
export default {
  layout: "dashboard",
  data: () => ({
    alert: {
      ishow: true,
    },
    popup: {
      id_x: null,
      head_title: "Thêm Chuyên Mục",
      dialog: false,
      name: null,
      slug: null,
      parent: 0,
      status: false,
    },
    terms: false,
    search: "",
    complex: {
      headers: [
        {
          text: "Menu Cha",
          value: "parent",
        },
        {
          text: "Tên",
          value: "name",
        },
        {
          text: "Links",
          value: "link",
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
    this.getArticles();
  },
  methods: {
    async getArticles() {
      const { data } = await this.$axios.get("/api/layouts");
      if (data.layouts.length != 0) {
        this.items = data.layouts[0].menu;
        this.list = data.layouts[0].menu;
      }
    },
    AddCat() {
      this.popup.dialog = true;
      this.popup.head_title = "Thêm Menu";
      this.popup.name = "";
      this.popup.slug = "";
      this.popup.parent = 0;
      this.popup.status = false;
    },
    submitForm() {
      const pos = this.items
        .map(function (e) {
          return e.name;
        })
        .indexOf(this.popup.name);
      if (pos === -1) {
        this.items.push({
          id_x: this.items.length + 1,
          parent: this.popup.parent,
          name: this.popup.name,
          link: this.popup.slug,
          status: this.popup.status,
        });
      } else {
        this.makeToast("warning", "Tên menu đã tồn tại");
      }
    },
    SaveList() {
      let listFeature = JSON.stringify(this.list);
      console.log(listFeature);
      this.$axios
        .post("/api/menu", { menu: listFeature })
        .then((response) => {
          this.makeToast("success", "Thêm List thành công");
          this.popup.dialog = false;
        })
        .catch((error) => {
          if (error.response.data.errors[0].msg) {
            this.makeToast("warning", error.response.data.errors[0].msg);
          }
        });
    },
    Edit(obj) {
      console.log(obj);
      this.popup.dialog = true;
      this.popup.head_title = "Edit Menu";
      this.popup.name = obj.name;
      this.popup.slug = obj.link;
      this.popup.parent = obj.parent;
      this.popup.parent = obj.status;
      this.popup.id_x = obj.id_x;
    },
    UpdateForm() {
      const found = this.items.find(
        (element) => element.id_x == this.popup.id_x
      );
      if (found !== undefined) {
        found.name = this.popup.name;
        found.link = this.popup.slug;
        found.parent = this.popup.parent;
        found.status = this.popup.status;
        const pos = this.items
          .map(function (e) {
            return e.name;
          })
          .indexOf(found.name);
        if (pos !== -1) {
          this.SaveList();
        } else {
          this.makeToast("warning", "Tên menu đã tồn tại");
        }
      } else {
        this.makeToast("warning", "Tên menu đã tồn tại");
      }
    },
    signalChange(evt) {
      this.popup.slug = `/${ConverToSlug(evt)}`;
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
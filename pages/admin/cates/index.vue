<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          <v-card>
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
              <v-btn color="success" round @click="AddCat"
                >Thêm Chuyên Mục</v-btn
              >
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
                  <td>{{ props.index }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.slug }}</td>
                  <td>{{ props.item.parent }}</td>
                  <td>
                    <v-chip
                      :color="props.item.trang_thai ? 'green' : 'red'"
                      text-color="white"
                    >
                      <v-avatar class="amber accent-4">{{
                        props.item.trang_thai
                      }}</v-avatar>
                      {{ props.item.trang_thai ? "Đang mở" : "Đang tắt" }}
                    </v-chip>
                  </td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                      @click="UpdateCatId(props.item._id)"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="red"
                      small
                      @click="DeleteRecord(props.item._id)"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
                <v-subheader class="pa-0">Trạng thái: </v-subheader>
                <v-switch
                  :label="popup.trang_thai ? 'On' : 'Off'"
                  v-model="popup.trang_thai"
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
            v-if="popup.head_title === 'Thêm Chuyên Mục'"
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
  </div>
</template>

<script>
import { ConverToSlug } from "@/helpers/FuncHelper";
export default {
  layout: "dashboard",
  data() {
    return {
      s1: false,
      err: null,
      other_err: null,
      items: [],
      list_update: [],
      popup: {
        id_x: null,
        head_title: "Thêm Chuyên Mục",
        dialog: false,
        name: null,
        slug: null,
        parent: 0,
        trang_thai: false,
      },
      search: "",
      complex: {
        headers: [
          {
            text: "STT",
            value: "stt",
          },
          {
            text: "Tên",
            value: "name",
          },
          {
            text: "Slug",
            value: "slug",
          },
          {
            text: "Chuyên Mục cha",
            value: "parent",
          },
          {
            text: "Trạng thái",
            value: "trang thai",
          },
          {
            text: "Action",
            value: "",
          },
        ],
      },
    };
  },
  created() {
    this.updateAllCat();
  },
  methods: {
    AddCat() {
      this.popup.dialog = true;
      this.popup.head_title = "Thêm Chuyên Mục";
      this.popup.name = "";
      this.popup.slug = "";
      this.popup.parent = 0;
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
    async updateAllCat() {
      const { data } = await this.$axios.get("/api/cates");
      this.items = data;
    },
    async UpdateCatId(id) {
      this.popup.id_x = id;
      this.popup.dialog = true;
      this.popup.head_title = "Sửa Chuyên Mục";
      const { data } = await this.$axios.get("/api/cates/" + id);
      this.popup.name = data.name;
      this.popup.slug = data.slug;
      this.popup.parent = data.parent;
      this.popup.trang_thai = data.trang_thai;
    },
    submitForm() {
      this.$axios
        .post("/api/cates", {
          name: this.popup.name,
          slug: this.popup.slug,
          parent: this.popup.parent,
          trang_thai: this.popup.trang_thai,
        })
        .then((response) => {
          console.log(response);

          if (response.data._id) {
            this.popup.dialog = false;
            this.updateAllCat();
            this.makeToast("success", "Thêm Chuyên Mục thành công");
          }
        })
        .catch((error) => {
          if (error.response.data.errors[0].msg) {
            this.makeToast("warning", error.response.data.errors[0].msg);
          }
        });
    },
    UpdateForm() {
      let obj = {
        name: this.popup.name,
        slug: this.popup.slug,
        parent: this.popup.parent,
        trang_thai: this.popup.trang_thai,
      };
      this.$axios
        .put("/api/cates/" + this.popup.id_x, obj)
        .then((response) => {
          console.log(response);

          if (response.data._id) {
            this.popup.dialog = false;
            this.updateAllCat();
            this.makeToast("success", "Cập nhật Chuyên Mục thành công");
          }
        })
        .catch((error) => {
          if (error.response.data.errors[0].msg) {
            this.makeToast("warning", error.response.data.errors[0].msg);
          }
        });
    },
    DeleteRecord(id) {
      if (confirm("Bạn muốn xóa Chuyên Mục này?") === true) {
        this.$axios
          .delete("/api/cates/" + id)
          .then((response) => {
            if (response.data._id) {
              this.updateAllCat();
              this.makeToast("success", "Xóa Chuyên Mục thành công");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

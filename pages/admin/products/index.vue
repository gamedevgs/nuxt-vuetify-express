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
              <v-btn color="success" round @click="AddArticle"
                >Thêm Sản Phẩm</v-btn
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
                  <td>
                    <!-- <v-img
                      ref="avartar"
                      :src="`/uploads/${props.item.thumb}`"
                      max-height="50"
                    ></v-img> -->
                    <v-img
                      ref="avartar"
                      :src="`${props.item.thumb}`"
                      max-height="50"
                    ></v-img>
                  </td>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.cate }}</td>
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
                  <td>{{ Convertime(props.item.time_create) }}</td>
                  <td>
                    <v-btn
                      depressed
                      icon
                      dark
                      color="primary"
                      small
                      @click="UpdateCatId(props.item._id)"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      icon
                      dark
                      color="red"
                      small
                      @click="DeleteRecord(props.item._id)"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      icon
                      dark
                      color="blue"
                      small
                      @click="ReviewArticle(props.item._id)"
                    >
                      <span class="material-icons"> remove_red_eye </span>
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
    <v-dialog v-model="popup.dialog" persistent :fullscreen="device">
      <v-card>
        <v-card-title>
          <span class="headline">{{ popup.head_title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="popup.dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout row wrap>
              <v-flex lg9 class="pa-1">
                <v-text-field
                  solo
                  label="Tiêu đề Sản Phẩm"
                  type="text"
                  color="teal"
                  :rules="[
                    (v) => !!v || 'Tiêu đề không được để trống',
                    (v) => (v && v.length <= 67) || 'Tối đa 67 ký tự',
                  ]"
                  :counter="67"
                  v-model="popup.title"
                  required
                ></v-text-field>
                <v-text-field
                  solo
                  class="pb-2"
                  color="teal"
                  multi-line
                  label="Thuong hieu"
                  type="text"
                  v-model="popup.excerpt"
                  required
                  :rules="[
                    (v) => !!v || 'MO TA không được để trống',
                    (v) => (v && v.length <= 170) || 'Tối đa 170 ký tự',
                  ]"
                  :counter="170"
                ></v-text-field>
                <ckeditor v-model="popup.content"></ckeditor>
              </v-flex>
              <v-flex lg3 class="pa-2">
                <div @click="setThumb">
                  <v-img ref="avartar" :src="defaulThumb"></v-img>
                </div>
                <input
                  ref="file_input"
                  type="file"
                  name="file"
                  accept="image/jpeg, image/png, image/gif"
                  @change="previewFiles"
                  style="display: none"
                />
                <v-select
                  :items="listCat"
                  v-validate="'required'"
                  data-vv-name="cate"
                  v-model="popup.cate"
                  label="Chuyên mục"
                  :rules="[(v) => !!v || 'Chưa chọn Chuyên mục']"
                  required
                  auto
                  item-text="name"
                  item-value="name"
                ></v-select>
                <v-text-field
                  label="Giá"
                  type="number"
                  prefix="$"
                  v-model="popup.price"
                  required
                ></v-text-field>
                <v-text-field
                  label="Số Lượng"
                  type="number"
                  v-model="popup.sl"
                  required
                ></v-text-field>
                <v-subheader class="pa-0">Trạng thái: </v-subheader>
                <v-switch
                  :label="popup.status ? 'On' : 'Off'"
                  v-model="popup.status"
                ></v-switch>
                <v-text-field
                  label="Tác giả"
                  type="text"
                  prepend-icon="person"
                  v-model="popup.author"
                  required
                ></v-text-field>
                <v-chip label color="info" text-color="white">
                  <v-icon left>label</v-icon>Từ Khóa (Tags)
                </v-chip>
                <v-combobox
                  multiple
                  label="Hãy nhập text & Enter"
                  :rules="[(v) => !!v || 'Hãy nhập Tags']"
                  chips
                  tags
                  solo
                  append-icon=""
                  clearable
                  v-model="popup.tags"
                  required
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      close
                      @input="remove(data.item)"
                      :selected="data.selected"
                    >
                      <strong>{{ data.item }}</strong
                      >&nbsp;
                      <span>({{ data.index }})</span>
                    </v-chip>
                  </template>
                </v-combobox>
                <v-toolbar card color="white">
                  <v-btn
                    v-if="popup.head_title === 'Tạo Sản Phẩm'"
                    color="success"
                    round
                    @click="submitForm"
                  >
                    <v-icon> done_all</v-icon> &nbsp;Xuất Bản</v-btn
                  >
                  <v-btn v-else color="info" round @click="UpdateForm"
                    ><v-icon> launch</v-icon>&nbsp;Cập Nhật</v-btn
                  >
                  <v-btn color="warning" round @click="ClosePopup"
                    ><v-icon> highlight_off</v-icon>&nbsp;Đóng</v-btn
                  >
                </v-toolbar>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-flex xl4>
      <v-dialog
        v-model="fullscreen.dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon @click.native="fullscreen.dialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Review</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex lg12 xs12>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 v-if="review.length != 0">
                    <h1 class="font-weight-bold">{{ review.title }}</h1>
                    <h3 class="font-weight-bold">{{ review.excerpt }}</h3>
                    <span class="text-left"
                      >Tác giả: {{ review.author }} | {{ review.cate }} |
                      {{ Convertime(review.time_create) }}</span
                    >
                    <div v-html="review.content"></div>
                    <div class="tag" v-if="fullscreen.list_tags.length != 0">
                      <v-chip
                        v-for="tag in fullscreen.list_tags"
                        :key="tag"
                        color="orange"
                        text-color="white"
                      >
                        {{ tag }}
                        <v-icon right>star</v-icon>
                      </v-chip>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-flex>
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import { ConverToSlug, timeAgo } from "@/helpers/FuncHelper";
export default {
  layout: "dashboard",
  data() {
    return {
      valid: true,
      fullscreen: {
        dialog: false,
        list_tags: [],
      },
      device: isMobile ? true : false,
      editorOption: {
        placeholder: "Nhập nội dung Sản Phẩm ở đây",
      },
      items: [],
      review: {},
      listCat: [],
      defaulThumb: require("@/static/discover/ds_5.jpeg"),
      popup: {
        id_x: null,
        head_title: "Tạo Sản Phẩm",
        dialog: false,
        title: "",
        excerpt: "",
        thumb: "",
        content: "",
        cate: "",
        sl: 0,
        price: 0,
        options: "",
        author: "",
        status: false,
        tags: [],
      },
      search: "",
      complex: {
        headers: [
          {
            text: "STT",
            value: "stt",
          },
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
            text: "Trạng thái",
            value: "trang thai",
          },
          {
            text: "Ngày Xuất bản",
            value: "time",
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
    this.updateAllArticle();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    setThumb() {
      this.$refs.file_input.click();
    },
    Convertime(time) {
      return timeAgo(time);
    },
    previewFiles(e) {
      let _this = this;
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      this.$axios
        .post("/api/upload/", formData)
        .then((res) => {
          _this.popup.thumb = res.data.link;
          _this.defaulThumb = URL.createObjectURL(file);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    remove(item) {
      this.popup.tags.splice(this.popup.tags.indexOf(item), 1);
      this.popup.tags = [...this.popup.tags];
    },
    AddArticle() {
      this.reset();
      this.popup.dialog = true;
      this.popup.head_title = "Tạo Sản Phẩm";
      this.defaulThumb = require("@/static/discover/ds_5.jpeg");
      this.popup.thumb = "";
      this.popup.content = "";
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
      if (data.length != 0) {
        data.map((v, k) => {
          if (v.trang_thai) {
            this.listCat.push(v);
          }
        });
      }
    },
    async updateAllArticle() {
      const { data } = await this.$axios.get("/api/products");
      this.items = data;
    },
    async ReviewArticle(id) {
      const { data } = await this.$axios.get("/api/products/" + id);
      this.review = data;
      this.fullscreen.dialog = true;
      this.fullscreen.list_tags = data.tags.split(",");
    },
    async UpdateCatId(id) {
      this.popup.id_x = id;
      this.popup.dialog = true;
      this.popup.head_title = "Sửa Sản Phẩm";
      this.defaulThumb = require("@/static/discover/ds_5.jpeg");
      this.popup.tags = [];
      const { data } = await this.$axios.get("/api/products/" + id);

      this.popup.title = data.title;
      this.popup.excerpt = data.excerpt;
      // this.defaulThumb = "/uploads/" + encodeURI(data.thumb);
      this.defaulThumb = encodeURI(data.thumb);
      this.popup.thumb = data.thumb;
      this.popup.content = data.content;
      this.popup.cate = data.cate;
      this.popup.author = data.author;
      this.popup.sl = data.sl;
      this.popup.price = data.price;
      this.popup.status = data.status;
      if (data.tags.length != 0) {
        data.tags.map((v, k) => {
          this.popup.tags.push(v.name);
        });
      }
    },
    submitForm() {
      this.validate();
      if (this.valid) {
        if (this.popup.content == "") {
          this.makeToast("warning", "Chưa nhập nội dung");
        } else if (this.popup.thumb == "") {
          this.makeToast("warning", "Chưa chọn thumb");
        } else {
          this.$axios
            .post("/api/products", {
              title: this.popup.title,
              excerpt: this.popup.excerpt,
              thumb: this.popup.thumb,
              content: this.popup.content,
              sl: this.popup.sl,
              price: this.popup.price,
              options: this.popup.otpions,
              cate: this.popup.cate,
              author: this.popup.author,
              status: this.popup.status,
              tags: JSON.stringify(this.popup.tags),
            })
            .then((response) => {
              if (response.data._id) {
                this.popup.dialog = false;
                this.updateAllArticle();
                this.makeToast("success", "Thêm Sản Phẩm thành công");
              }
            })
            .catch((error) => {
              if (error.response.data.errors[0].msg) {
                this.makeToast("warning", error.response.data.errors[0].msg);
              }
            });
        }
      }
    },
    UpdateForm() {
      let obj = {
        title: this.popup.title,
        excerpt: this.popup.excerpt,
        thumb: this.popup.thumb,
        content: this.popup.content,
        cate: this.popup.cate,
        sl: this.popup.sl,
        price: this.popup.price,
        otpions: this.popup.options,
        author: this.popup.author,
        status: this.popup.status,
        tags: JSON.stringify(this.popup.tags),
      };
      this.$axios
        .put("/api/products/" + this.popup.id_x, obj)
        .then((response) => {
          if (response.data._id) {
            this.popup.dialog = false;
            this.updateAllArticle();
            this.makeToast("success", "Cập nhật Sản Phẩm thành công");
          }
        })
        .catch((error) => {
          if (error.response.data.errors[0].msg) {
            this.makeToast("warning", error.response.data.errors[0].msg);
          }
        });
    },
    ClosePopup() {
      if (confirm("Tất cả dữ liệu trong khung soạn thảo sẻ mất?") === true) {
        this.popup.dialog = false;
      }
    },
    DeleteRecord(id) {
      if (confirm("Bạn muốn xóa Danh Mục này?") === true) {
        this.$axios
          .delete("/api/products/" + id)
          .then((response) => {
            if (response.data._id) {
              this.updateAllArticle();
              this.makeToast("success", "Xóa Sản Phẩm thành công");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  components: {},
};
</script>
<style lang="stylus" scoped>
.quill {
  height: 520px;
  padding-bottom: 69px;
}
</style>


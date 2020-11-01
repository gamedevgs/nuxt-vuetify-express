<template>
  <div id="media" class="media">
    <v-dialog
      v-model="popup"
      persistent
      :max-width="view === 'grid' ? '80%' : '50%'"
    >
      <v-card>
        <v-card-title>
          <span class="headline">File Manager</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="popup = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>

        <v-toolbar class="elevation-0 transparent media-toolbar">
          <v-btn-toggle>
            <v-btn flat @click="SumbitUpload">
              <v-icon color="primary">cloud_upload</v-icon>
              &nbsp;Tải Lên
            </v-btn>
            <v-btn flat>
              <v-icon color="primary">folder</v-icon>
              &nbsp; Thêm thư mục
            </v-btn>
          </v-btn-toggle>
          <input
            type="file"
            name="file"
            accept="image/jpeg, image/png, image/gif"
            @change="previewFiles"
            class="form-control-file border"
          />

          <v-spacer></v-spacer>
          <v-btn-toggle v-model="view">
            <v-btn flat value="list">
              <v-icon color="primary">view_headline</v-icon>
            </v-btn>
            <v-btn flat value="grid">
              <v-icon color="primary">view_list</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-toolbar>
        <b-progress :value="proccess" show-progress class="mb-3"></b-progress>
        <b-breadcrumb :items="items" @click="BackFolder"> </b-breadcrumb>

        <v-layout row wrap>
          <v-flex lg12 xs12>
            <div class="media-content flex transparent pa-5">
                <v-container fluid v-if="view === 'grid'">
                  <v-layout row wrap class="x-grid-lg">
                    <v-flex
                      lg2
                      sm12
                      xs12
                      v-for="(item, index) in folders"
                      :key="'folder' + index"
                    >
                      <v-card
                        flat
                        tile
                        class="text-center"
                        @click="EnterFolder(item)"
                      >
                        <v-card-media height="150px">
                          <v-icon size="135" class="mx-auto" color="indigo"
                            >folder</v-icon
                          >
                        </v-card-media>
                        <v-divider></v-divider>
                        <v-card-title>
                          {{ item.name }} ({{ fileSize(item.size) }})
                        </v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex
                      lg2
                      sm12
                      xs12
                      class="pa-2"
                      v-for="(item, index) in files"
                      :key="index"
                    >
                      <v-card flat tile>
                        <v-btn icon @click="removeItem(item)">
                          <v-icon>delete</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <a @click="showDetail(item)" class="d-flex">
                          <img
                            style="height: 150px; width: 100%"
                            :src="getImage(item.path)"
                            alt=""
                            v-if="isImage(item)"
                          />

                          <v-icon class="mx-auto" size="135" v-else
                            >insert_drive_file</v-icon
                          >
                        </a>
                        <v-divider></v-divider>
                        <v-card-title>
                          {{ item.name }} ({{ fileSize(item.size) }})
                        </v-card-title>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-layout column v-else>
                  <v-list dense class="transparent">
                    <v-list-tile
                      avatar
                      @click="showDetail(item)"
                      v-for="(item, index) in files"
                      :key="'list-file-' + index"
                    >
                      <v-list-tile-avatar>
                        <v-icon>{{ mimeIcons(item) }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <div class="container">
                          <div class="layout row">
                            <div class="flex">{{ item.name }}</div>
                            <v-spacer></v-spacer>
                            <div class="caption">
                              {{ fileSize(item.size) }}
                            </div>
                          </div>
                        </div>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="normal" max-width="50%">
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">{{ name_review }}</span>
        </v-card-title>
        <v-container>
          <v-flex lg12 sm12 xs12>
            <img
              :width="dfsize > 100000 ? '100%' : ''"
              :src="defaults"
              alt=""
            />
            <v-spacer></v-spacer>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Bytes from "bytes";
export default {
  layout: "dashboard",
  components: {
  },
  props: {
    type: {
      type: String,
      default: "image",
    },
  },
  data: () => ({
    items: [],
    name_review: "",
    defaults: "/default-image.jpg",
    dfsize: 100000,
    popup: true,
    normal: false,
    allFlie: [],
    size: "lg",
    view: "grid",
    files: [],
    proccess: 0,
    file_need_upload: null,
    selectedFile: {
      path: "/static/icon/empty_file.svg",
    },
    imageMime: [".jpg", ".png", ".svg", ".ico", ".jpeg"],

    folders: [],
  }),
  mounted() {
    this.LoadFolder();
  },
  methods: {
    async LoadFolder() {
      let _this = this;
      const { data } = await this.$axios.get("/api/file-manager");
      this.allFlie = data.children;
      this.checkBreakrum(data.path);
      data.children.map((v, k) => {
        if (v.type === "file") {
          _this.files.push(v);
        } else {
          _this.folders.push(v);
        }
      });
    },
    previewFiles(e) {
      this.proccess = 0;
      const file = e.target.files[0];
      this.file_need_upload = file;
    },
    SumbitUpload() {
      let _this = this;
      if (_this.file_need_upload === null) {
        _this.makeToast("warning", "Vui lòng chọn file");
      } else {
        _this.proccess += 1;
        let formData = new FormData();
        formData.append("filess", _this.file_need_upload);
        _this.$axios
          .post("/api/upload", formData)
          .then((res) => {
            if (res.data.message === "success") {
              _this.makeToast("success", "Upload file thành công");
              _this.proccess = 100;
            }
          })
          .catch((error) => {
            console.log(error);
            _this.makeToast("warning", "Upload file ko thành công");
          });
      }
    },
    isImage(file) {
      return this.imageMime.includes(file.extension);
    },
    getImage(path) {
      const result = path.replace(/(.*)(\/static)/gm, ``);
      return result;
    },
    mimeIcons(file) {
      return this.imageMime.includes(file.extension)
        ? "image"
        : "insert_drive_file";
    },
    removeItem(file) {
      console.log(file);
      let _this = this;
      let get_folder_file = file.path.replace(/\/[ \w-]+?(?=\.)(.*)/gm, ``);
      let current_folder = { name: "", path: get_folder_file };
      if (confirm("Bạn muốn xóa File này?") === true) {
        _this.$axios
          .post("/api/file-delete", {
            file: file.path,
          })
          .then((response) => {
            if (response.data.message === "success") {
              _this.makeToast("success", "Đã xóa mục này");
              _this.files = [];
              _this.folders = [];
              console.log(get_folder_file);
              _this.EnterFolder(current_folder);
            }
          })
          .catch((error) => {
            console.log(error);
            _this.makeToast("success", "Xóa file Thất bại");
          });
      }
    },
    BackFolder(item) {
      this.files = [];
      this.folders = [];
      this.LoadFolder();
    },
    EnterFolder(folder) {
      let _this = this;
      _this.$router.push({ query: { breadcrumb: folder.name } });
      _this.$axios
        .post("/api/enter-folder", {
          path: folder.path,
        })
        .then((response) => {
          if (response.data.message === "success") {
            _this.files = [];
            _this.folders = [];
            if (response.data.data) {
              _this.checkBreakrum(response.data.data.path);
              response.data.data.children.map((v, k) => {
                if (v.type === "file") {
                  _this.files.push(v);
                } else {
                  _this.folders.push(v);
                }
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkBreakrum(path) {
      this.items = [];
      const result = path.replace(/(.*)\/(static)/gm, `$2`);
      result.split("/").map((v, k) => {
        this.items.push(v == "static" ? "root" : v);
      });
    },
    showDetail(file) {
      console.log(file);
      this.popup = true;
      if (this.isImage(file)) {
        this.defaults = this.getImage(file.path);
        this.dfsize = file.size;
        this.normal = true;
        this.name_review = file.name;
      } else {
        this.makeToast("warning", "Không thể xem trước file này");
      }
      // this.selectedFile = file;
    },
    makeToast(variant = null, content) {
      this.$bvToast.toast(content, {
        title: `Thông Báo`,
        variant: variant,
        solid: true,
      });
    },
    fileSize(number) {
      return Bytes.format(number);
    },
    formateDate(string) {
      return string ? new Date(string).toLocaleDateString() : "";
    },
    computeFileImage(file) {
      return this.isImage(file) ? file.path : "/static/icon/file_empty.svg";
    },
  },
};
</script>
<style lang="stylus" scoped>
.media {
  &-cotent--wrap, &-menu {
    min-width: 260px;
    border-right: 1px solid #eee;
    min-height: calc(100vh - 50px - 64px);
  }

  &-detail {
    min-width: 300px;
    border-left: 1px solid #eee;
  }
}
</style>

<template>
  <v-app id="login">
    <v-content >
      <v-container fill-height >
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-5 " height="500">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">Admin Login</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="model.email"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="show3 ? 'visibility' : 'visibility_off'"
                    :type="show3 ? 'text' : 'password'"
                    name="password"
                    label="Password"
                    id="password"
                    v-model="model.password"
                    @click:append="show3 = !show3"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  round
                  block
                  color="primary"
                  @click="login"
                  :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: "default",
  data: () => ({
    show3: false,
    model: {
      email: "",
      password: "",
    },
  }),

  methods: {
    makeToast(variant = null, content) {
      this.$bvToast.toast(content, {
        title: `Thông Báo`,
        variant: variant,
        solid: true,
      });
    },
    login() {
      // this.loading = true;
      this.$auth
        .loginWith("local", {
          data: {
            email: this.model.email,
            password: this.model.password,
          },
        })
        .catch((error) => {
          if (error.response.data.errors[0].msg) {
            this.makeToast("warning", error.response.data.errors[0].msg);
          }
        });
    },
  },
};
</script>
<style scoped lang="css">
#login {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
    background-image: url(https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg);
}
</style>

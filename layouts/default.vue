<template>
  <v-app id="appRoot">
    <v-container>
      <v-toolbar dark fixed class="info">
        <v-toolbar-title>
          <v-img
            src="https://cdn.iconscout.com/icon/free/png-512/vue-282497.png"
            height="50"
            width="100px"
            contain
          ></v-img
        ></v-toolbar-title>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            flat
            v-for="element in layouts.menu"
            :key="element.id_x"
            :to="element.link"
            >{{ element.name }}</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>
      <nuxt />
    </v-container>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="info">
          <strong class="subheading"
            >Get connected with us on social networks!</strong
          >

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          <div class="col-lg-6 h-100 text-center text-lg-left my-auto">
            <ul class="list-inline mb-2">
              <li class="list-inline-item">
                <a href="#">About</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="#">Contact</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="#">Terms of Use</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
            <p class="text-muted small mb-4 mb-lg-0">
              &copy; Your Website 2020. All Rights Reserved.
            </p>
          </div>
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  computed: {
    ...mapState(["layouts"]),
  },
};
</script>

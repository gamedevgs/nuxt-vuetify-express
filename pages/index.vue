<template>
  <v-content>
    <v-layout row pt-5>
      <v-flex lg8 xs12>
        <v-carousel :show-arrows="false">
          <v-carousel-item
            v-for="(item, i) in layouts.feature"
            :key="i"
            :src="item.thumb"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>

      <v-flex
        lg4
        xs12
        id="scroll-target"
        style="max-height: 500px"
        class="scroll-y"
        v-scroll:#scroll-target="onScroll"
      >
        <v-list
          two-line
          v-for="element in layouts.feature"
          :key="element.title"
        >
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="element.thumb" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ element.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{
                element.excerpt
              }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex lg12 pt-2 pb-2 xs12>
        <v-card>
          <v-img
            src="https://znews-photo.zadn.vn/Uploaded/abhuax4/2020_11_05/3300x315_2__1.jpg"
            aspect-ratio="2.75"
            height="100"
          ></v-img>
        </v-card>
      </v-flex>
      <v-toolbar dense dark color="warning">
        <v-btn
          flat
          v-for="element in layouts.menu"
          :key="element.id_x"
          :to="element.link"
          >{{ element.name }}</v-btn
        >
      </v-toolbar>
      <v-flex
        v-for="(element, index) in layouts.feature"
        :key="element.title"
        v-show="index < 7"
        :class="index == 0 ? 'lg6' : 'lg3'"
      >
        <v-card>
          <v-card-media contain height="auto" :src="element.thumb">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h4>{{ element.title }}</h4>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";
export default {
  data: () => ({
    show: true,
    offsetTop: 0,
  }),
  components: {
    draggable,
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
  },
  computed: {
    ...mapState(["layouts"]),
  },
};
</script>
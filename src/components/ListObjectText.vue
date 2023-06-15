<template>
  <br />
  <div v-for="item in getItemObject(item)" :key="item.key" class="flex ml-4">
    <span class="title">{{ item.key }} :</span>
    <div v-if="typeof item.value === 'object'">
      <list-object-text :item="item.value" />
    </div>
    <div v-else>
      <img
        v-if="item.key === 'png' || item.key === 'svg'"
        :src="item.value"
        class="w-10"
      />
      <div v-else>
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
import ListObjectText from "./ListObjectText.vue";
import useCountry from "../composables/useCountry";

export default {
  name: "ListObjectText",

  setup() {
    const { getItemObject } = useCountry();

    return {
      getItemObject,
    };
  },

  components: {
    ListObjectText,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

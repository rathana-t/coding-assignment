<template>
  <div v-for="item in getItemObject(country)" :key="item.key">
    <div class="flex">
      <span class="title">{{ item.key }} :</span>
      <div v-if="typeof item.value === 'object'">
        <list-object-text :item="item.value" />
      </div>
      <div v-else>
        {{ item.value }}
      </div>
    </div>
    <div class="border-b border-slate-400 w-full"></div>
  </div>
</template>

<script>
import ListObjectText from "./ListObjectText.vue";
import useCountry from "../composables/useCountry";

export default {
  name: "CountryModal",

  setup(){
  const { getItemObject } = useCountry();

  return {
    getItemObject,
  };
},

  components: {
    ListObjectText,
  },

  props: {
    country: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.title {
  @apply text-slate-400;
}

</style>
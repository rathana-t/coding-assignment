<template>
  <div>
    <img
      :src="country.flags.png"
      class="min-w-[7rem] min-h-[4rem] max-w-[7rem] max-h-[4rem] object-cover rounded-md"
    />
    <div class="grid grid-cols-6 pl-4 gap-5 w-full">
      <h1
        class="text-md font-semibold cursor-pointer"
        @click="$emit('open-modal', country)"
      >
        {{ country.name.official }}
      </h1>
      <div>
        <p><span class="text-slate-500">Code 2:</span> {{ country.cca2 }}</p>
        <p><span class="text-slate-500">Code 3:</span> {{ country.cca3 }}</p>
      </div>
      <p>
        {{ getCallingCode(country.idd) }}
      </p>
      <div>
        {{ getTheNativeName(country.name?.nativeName) || "N/A" }}
      </div>

      <p class="col-span-2">
        {{ country?.altSpellings?.join(", ") }}
      </p>
    </div>
  </div>
</template>

<script>
import useCountry from "../composables/useCountry";

export default {
  name: "CountryItem",

  setup() {
    const { getCallingCode, getTheNativeName } = useCountry();

    return {
      getCallingCode,
      getTheNativeName,
    };
  },

  props: {
    country: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div v-if="!!modalCountry">
    <div
      class="fixed top-0 left-0 z-10 bg-gray-500 opacity-70 w-full h-screen"
    ></div>
    <div
      class="fixed top-0 left-0 z-20 m-20 bg-slate-50 rounded-md p-10 w-[80%] h-[80%] flex flex-col items-end"
    >
      <div class="max-h-[90%] w-full overflow-y-auto">
        <modal :country="modalCountry" />
      </div>
      <button
        class="bottom-0 right-0 p-2 rounded-md bg-slate-500 text-white"
        @click="modalCountry = null"
      >
        Close
      </button>
    </div>
  </div>
  <div class="fixed top-0 left-0 right-0 bg-slate-200 h-20">
    <div class="flex justify-between items-center h-full p-5">
      <div class="flex justify-center">
        <input
          v-model="search"
          type="text"
          class="border-2 border-gray-300 p-2 rounded-md w-72"
          placeholder="Search"
          @input="searchCountry"
        />
      </div>
      <div class="text-4xl">
        <span class="text-slate-400"> Total: </span>
        <span class="font-bold">
          {{ totalData || 0}}
        </span>
      </div>
      <div>
        Sort country name by:
        <div class="flex justify-end">
          <div class="flex justify-center items-center">
            <button
              class="border-2 border-gray-300 p-1 rounded-md w-20"
              :class="{
                'bg-blue-500 text-white': sortBy === 'asc',
                'opacity-50': !data?.length,
              }"
              @click="sortData('asc')"
              :disabled="!data?.length"
            >
              ASC
            </button>
            <button
              class="border-2 border-gray-300 p-1 rounded-md w-20"
              :class="{
                'bg-blue-500 text-white': sortBy === 'desc',
                'opacity-50': !data?.length,
              }"
              @click="sortData('desc')"
              :disabled="!data?.length"
            >
              DESC
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-36 mb-16 p-4">
    <div
      class="flex justify-center items-center px-5 fixed left-0 top-20 w-full bg-slate-500 text-white"
    >
      <div class="w-[7rem] h-[4rem]" />
      <div class="grid grid-cols-6 pl-6 gap-5 w-full">
        <div class="flex">
          <h1 class="text-md font-semibold">Country</h1>
        </div>
        <div>Code</div>
        <div>Calling code</div>
        <div>Native Name</div>
        <p class="col-span-2">Alternative</p>
      </div>
    </div>
    <div class="space-y-2">
      <country-item
        v-for="country in dataByPage"
        :key="country.name.official"
        :country="country"
        class="flex items-start p-2 bg-white border-2 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out"
        @open-modal="openModal"
      />
    </div>
  </div>
  <pagination :page="page" :last-page="lastPage" :goto-page="gotoPage" />
</template>

<script>
import CountryItem from "./components/CountryItem.vue";
import Modal from "./components/Modal.vue";
import Pagination from "./components/Pagination.vue";

export default {
  name: "App",

  components: {
    CountryItem,
    Modal,
    Pagination,
  },

  data() {
    return {
      baseUrl: "https://restcountries.com/v3.1",

      data: [],
      dataByPage: [],
      page: 1,
      lastPage: 1,
      limit: 25,
      sortBy: "",
      search: "",

      modalCountry: null,
    };
  },

  computed: {
    totalData() {
      return this.data?.length;
    },
  },

  mounted() {
    this.fetchData("/all").then((res) => {
      this.data = res;
      this.setValue();
    });
  },

  methods: {
    async fetchData(url) {
      try {
        return await fetch(`${this.baseUrl}${url}`).then((res) => res.json());
      } catch (error) {
        console.error(error);
      }
    },

    openModal(country) {
      this.modalCountry = country;
    },

    gotoPage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.lastPage) {
        return;
      }

      this.page = pageNumber;
      const start = (this.page - 1) * this.limit;
      const end = start + this.limit;
      this.dataByPage = this.data?.length && this.data.slice(start, end);
    },

    sortData(sort) {
      if (!sort) {
        return;
      }

      this.data?.length &&
        this.data.sort((a, b) => {
          if (sort === "asc") {
            return a.name.official.localeCompare(b.name.official);
          } else {
            return b.name.official.localeCompare(a.name.official);
          }
        });

      this.sortBy = sort;
      this.gotoPage(1);
    },

    async searchCountry() {
      const searchValue = this.search.toLowerCase().trim();

      if (searchValue) {
        this.data = await this.fetchData(`/name/${searchValue}`);
      } else {
        this.data = await this.fetchData("/all");
      }

      this.setValue();
      this.sortData(this.sortBy);
    },

    setValue() {
      this.page = 1;
      this.lastPage = Math.ceil(this.data.length / this.limit);
      this.dataByPage = this.data?.length && this.data.slice(0, this.limit);
    },
  },
};
</script>

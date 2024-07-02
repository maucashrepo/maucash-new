<template>
  <div id="app">
    <!-- <maucash-page-table :columns="columns" :data="data" :total="total" @changePageNum="changePageNum" @changePageSize="changePageSize"/> -->
    <maucash-login
      :baseUrl="baseUrl"
      :imgUrl="imgUrl"
      :headers="headers"
      @loginHandle="loginHandle"
    />
    <!-- <maucash-date-picker
      @confirm-date="confirmDate"
      :format="'dd-MM-yyyy'"
      :defaultVal="defaultVal"
      isAddDay
      isDisabledDate
    />
    <Button
      @click="openModal"
      type="primary"
    >打开弹框</Button> -->
    <!-- <maucash-change-password ref="modal" @fetchData="fetchData"/> -->
    <!-- <maucash-modal
      ref="modal"
      @fetchData="fetchData"
      :modalType="'alert'"
      :containerStyle="containerStyle"
      :isFooter="true"
      :draggable="true"
    >
      <div slot="header">
        <h1>标题区域</h1>
      </div>
      <div slot="body">
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
        <h1>我的内容区域</h1>
      </div>
    </maucash-modal> -->
    <!-- <maucash-product :productList="productList" @on-change="change" :currentProduct="'YN-SYSTEM'"/> -->
  </div>
</template>

<script>
import MaucashPageTable from "./packages/maucash-page-table/maucash-page-table";
import MaucashLogin from "./packages/maucash-login/maucash-login";
import maucashDatePicker from "./packages/maucash-date-picker/maucash-date-picker";
import MaucashValueCount from "./packages/maucash-value-count/maucash-value-count";
import MaucashModal from "./packages/maucash-modal/maucash-modal";
import MaucashChangePassword from "./packages/maucash-change-password/maucash-change-password";
import MaucashProduct from "./packages/maucash-product";
export default {
  name: "app",
  data () {
    return {
      containerStyle: {
        maxHeight: "200px"
      },
      baseUrl: "https://web.maucash.id/",
      imgUrl: "https://web.maucash.id/",
      headers: {
        "X-Origin": "approval-web",
        "X-Org-Id": "2"
      },
      productList: [
        { name: "All Product", value: "YN-SYSTEM" },
        { name: "Maucash", value: "YN-MAUCASH" },
        { name: "Spektra", value: "YN-SPEKTRA" }
      ],
      defaultVal: [new Date(2019, 10, 10), new Date(2019, 10, 10)]
    };
  },
  methods: {
    loginHandle (data) {
      console.log(data);
    },
    change (val) {
      console.log(val);
    },
    openModal () {
      this.$refs.modal.open();
    },
    fetchData () { },
    confirmDate (val) {
      console.log(val);
    }
  },
  computed: {},
  components: {
    MaucashPageTable,
    MaucashLogin,
    maucashDatePicker,
    MaucashValueCount,
    MaucashModal,
    MaucashChangePassword,
    MaucashProduct
  }
};
</script>

<style lang="scss">
</style>

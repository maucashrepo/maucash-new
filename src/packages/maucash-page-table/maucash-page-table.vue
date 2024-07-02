<template>
  <div class="maucash-page-table">
    <!-- 中间表格start -->
    <Table border ref="selection" :columns="columns" :data="data" :no-data-text="noDataText"></Table>
    <!-- 中间表格end -->
    <!-- 下面页码start -->
    <Page v-if="total > 10" :total="total" :current="currentPage" :page-size="pageSize" show-elevator show-sizer @on-change="changePageNum" @on-page-size-change="changePageSize" class="pages"></Page>
    <!-- 下面页码end -->
    <!-- 加载数据中loading -->
    <Spin fix v-if="loading">
      <Icon type="load-c" size=30 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
export default {
  name: 'MaucashPageTable',
  props: {
    data: {
      type: Array,
      default: function() {
        return new Array();
      }
    },
    columns: {
      type: Array,
      default: function() {
        return new Array();
      }
    },
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    noDataText: {
      type: String,
      default: 'No Data'
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  watch: {
    data(val) {
      if (val.length) {
        this.loading = false;
      } else {
        setTimeout(() => {
          this.loading = false;
        }, 4000);
      }
    }
  },
  methods: {
    changePageNum(num) {
      this.loading = true;
      this.$emit('changePageNum', num);
    },
    changePageSize(num) {
      this.loading = true;
      this.$emit('changePageSize', num);
    }
  }
};
</script>

<style scoped>
/*加载中*/
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.pages{
  margin-top: 2rem;
}
</style>
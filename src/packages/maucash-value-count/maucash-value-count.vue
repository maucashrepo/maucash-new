<template>
  <div>
    <h3 class="row-header">{{title}}</h3>
    <Row class="row-body" :gutter="14">
      <div class="chart-title">
        <div style="width:200px;">
          <maucash-date-picker @confirm-date="searchDate" :format="format" :isAddDay="isAddDay"/>
        </div>
      </div>
      <Col span="8" v-for="item in valueCountArray" :key="item.name">
        <value-count :class="item.type" :icon="item.icon" :name="item.name" :value="item.value" />
      </Col>
    </Row>
  </div>
</template>

<script>
import ValueCount from './value-count';
import MaucashDatePicker from './../maucash-date-picker/maucash-date-picker';
export default {
  name: "MaucashValueCount",
  props: {
    title: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    valueCountArray: {
      type: Array,
      default: function() {
        return new Array();
      }
    }
  },
  data() {
    return {
      isAddDay: true,
    }
  },
  methods: {
    searchDate(val) {
      this.$emit('confirm-date', val);
    },
  },
  components: {
    ValueCount,
    MaucashDatePicker,
  }
};
</script>

<style scoped>
.chart-title{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-right: 7px;
}
</style>

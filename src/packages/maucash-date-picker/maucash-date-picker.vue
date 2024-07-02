<template>
  <div>
    <DatePicker
      type="daterange"
      transfer
      split-panels
      confirm
      style="width:100%;"
      :disabled="isDisabled"
      :format="format"
      :clearable=false
      :options="rangeDateOptions"
      v-model="rangeDate"
      :placeholder="placeholder"
      @on-ok="searchDate"
      @on-clear="clearDate"
    >
    </DatePicker>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "MaucashDatePicker",
  props: {
    // 时间显示格式
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    // 文字提示
    placeholder: {
      type: String,
      default: "please"
    },
    // 默认值
    defaultVal: {
      type: Array,
      default: () => [],
    },
    // 是否添加一天
    isAddDay: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    isDisabled: {
      type: Boolean,
      default: false
    },
    // 是否禁止当前日期后的时间选择
    isDisabledDate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // rangeDate: [moment(+new Date()).format('DD-MM-YYYY'), moment(+new Date()).format('DD-MM-YYYY')],
      formDate: [],
      rangeDateOptions: {
        disabledDate: (date) => {
          if (this.isDisabledDate) {
            return date && date.valueOf() > Date.now();
          } else {
            return false;
          }
        },
        shortcuts: [
          {
            text: "1 day",
            value () {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              return [start, end];
            }
          },
          {
            text: "1 week",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1 month",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "1 year",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              return [start, end];
            }
          }
        ]
      }
    };
  },
  methods: {
    searchDate () {
      this.$emit("confirm-date", this.formDate);
    },
    // 清除时间
    clearDate () {
      this.rangeDate = ["", ""];
      this.searchDate();
    }
  },
  computed: {
    rangeDate: {
      set (date) {
        const formDate = date.map(item =>
          item ? moment(item).format("YYYY-MM-DD") : ""
        );
        if (this.isAddDay) {
          this.formDate = [
            formDate[0],
            formDate[1]
              ? moment(formDate[1])
                .add(1, "day")
                .format("YYYY-MM-DD")
              : ""
          ];
        } else {
          this.formDate = formDate;
        }
      },
      get () {
        if (this.defaultVal) {
          return this.defaultVal;
        } else {
          return [];
        }
      }
    }
  }
};
</script>

<style scoped>
</style>

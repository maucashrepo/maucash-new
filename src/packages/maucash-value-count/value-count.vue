<template>
  <Card
    class="value-count"
    :padding="0"
    :bordered="false"
  >
    <div class="icon"><Icon size="48" :type="icon"></Icon></div>
    <div class="info">
      <div class="value">{{value}}</div>
      <div class="name">{{name}}</div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      type: String | Number
    }
  },
};
</script>
<style lang="scss">
.value-count{
  border: 1px solid #dddee1; 
  margin-bottom: 10px;
  text-align: center;
}
.value-count .ivu-card-body {
  display: flex;
  > div {
    padding: 1rem;
  }
  .info {
    flex: 1
  }
  .icon {
    font-size: 1.2rem;
    color: #fff;
    padding: 1rem 1.5rem;
  }
  .name {
    color: #999;
  }
  .value {
    font-weight: 800;
    font-size: 1.5rem;
  }
}
.value-count.primary {
  .icon {
    background-color: #3273dc;
  }
  .value {
    color: #3273dc;
  }
}
.value-count.light-blue {
  .icon {
    background-color: #75d4ff;
  }
  .value {
    color: #75d4ff;
  }
}
.value-count.light-green {
  .icon {
    background-color: #30e0a8;
  }
  .value {
    color: #30e0a8;
  }
}
.value-count.light-orange{
  .icon {
    background-color: #ffc031;
  }
  .value {
    color: #ffc031;
  }
}
.value-count.light-red {
  .icon {
    background-color: #ff6e4b;
  }
  .value {
    color: #ff6e4b;
  }
}
</style>


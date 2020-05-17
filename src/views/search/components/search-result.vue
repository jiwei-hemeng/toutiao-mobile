<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      list: []
    }
  },
  methods: {
    onLoad () {
      console.log(123)
      this.finished = true
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>

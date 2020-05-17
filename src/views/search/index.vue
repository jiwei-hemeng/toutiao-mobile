<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
      <result :searchText="searchText" v-if="isResultShow" />
      <suggestion v-else-if="searchText" :searchText="searchText" />
      <history v-else />
    </form>
  </div>
</template>

<script>
import Suggestion from './components/search-suggestion'
import Result from './components/search-result'
import History from './components/search-history'
export default {
  name: 'SearchIndex',
  components: {
    Suggestion,
    Result,
    History
  },
  data () {
    return {
      isResultShow: false,
      searchText: ''
    }
  },
  methods: {
    onSearch () {
      this.isResultShow = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>

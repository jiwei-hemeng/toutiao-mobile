<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" /> -->
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      isRefreshLoading: false,
      timestamp: null,
      refreshSuccessText: '',
      scrollTop: 0
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.push(...results)
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.unshift(...results)
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  },
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated () {
    // 把记录的到顶部的距离重新设置回去
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>>

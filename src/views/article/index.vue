<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="article-wrap">
      <!-- 文章标题 -->
      <h1 class="title">{{ article.title }}</h1>
      <!-- 作者信息 -->
      <van-cell center class="user-info">
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          :src="article.aut_photo"
        />
        <div slot="label" class="pubdate">{{ article.pubdate | relativeTime }}</div>
        <van-button
          class="follow-btn"
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          round
          size="small"
          :loading="isFollowLoading"
          @click="onFollow"
        >{{ article.is_followed ? '已关注' : '关注' }}</van-button>
      </van-cell>
      <!-- 文章内容 -->
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>
      <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :color="article.attitude === 1 ? 'hotpink' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    </div>
  </div>
</template>

<script>
import { getArticle, addCollect, deleteCollect } from '@/api/article'
import { ImagePreview } from 'vant'
import './github-markdown.css'
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticle(this.articleId)
      this.article = data.data
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    handlePerviewImage () {
      // 1. 获取文章内容 DOM 容器
      const articleContent = this.$refs['article-content']
      // 2. 得到所有的 img 标签
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = [] // 收集所有的图片路径
      // 3. 循环 img 列表，给 img 注册点击事件
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 4. 在事件处理函数中调用 ImagePreview() 预览
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 起始位置
          })
        }
      })
    },
    onCollect () {},
    onLike () {}
  },
  data () {
    return {
      article: {}, // 文章数据对象
      isFollowLoading: false, // 关注用户按钮的 loading 状态
      isCollectLoading: false // 收藏的 loading 状态
    }
  }
}
</script>

<style lang="less" scoped>
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 24px 20px 18px;
  background-color: #fff;
  margin: 0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
ul {
  list-style: unset;
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
</style>

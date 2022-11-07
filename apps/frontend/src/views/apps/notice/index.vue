<template>
  <div class="p-10">
    <div v-if="noticeList.length === 0">
      <Empty :image="Empty.PRESENTED_IMAGE_SIMPLE" description="暂无公告" />
    </div>
    <Timeline>
      <TimelineItem
        v-for="item in noticeList"
        :key="item.id"
        :color="item?.type == 1 ? 'blue' : item?.type == 2 ? 'green' : 'red'"
      >
        <div class="pt-1 mb-1 text-base text-gray">{{ formatToDateTime(item.timestamp) }}</div>

        <Card size="small" class="mt-4 shadow">
          <h3 class="font-bold">{{ item.title }}</h3>
          <p class="tracking-wide">{{ item.content }}</p>
        </Card>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script lang="ts" setup name="公告">
  import { ref } from 'vue';
  import { Timeline, TimelineItem, Card, Empty } from 'ant-design-vue';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { getNoticeList } from '/@/api/apps/notice';

  const noticeList = ref<API.NoticeListPageResult>([]);

  getNoticeList().then((data) => {
    noticeList.value = data.items;
  });
</script>

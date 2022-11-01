declare namespace API {
  type NoticeListPageResultItem = {
    id: number;
    title: string;
    content: string;
    type: number;
    show: boolean;
    timestamp: string;
  };

  type NoticeListPageResult = NoticeListPageResultItem[];

  /** 创建公告参数 */
  type CreateNoticeParams = {
    title?: string;
    content?: string;
    type?: number;
    show?: boolean;
    timestamp?: string;
  };

  /** 更新公告参数 */
  type UpdateNoticeParams = CreateNoticeParams & {
    id: number;
  };
}

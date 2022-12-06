declare namespace API {
  type NoticeItem = {
    id: number;
    title: string;
    content: string;
    type: number;
    show: boolean;
    timestamp: string;
  };

  type NoticeList = NoticeItem[];

  type CreateNotice = {
    title?: string;
    content?: string;
    type?: number;
    show?: boolean;
    timestamp?: string;
  };

  type UpdateNotice = CreateNotice & {
    id: number;
  };
}

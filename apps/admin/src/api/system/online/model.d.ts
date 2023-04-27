declare namespace API {
  type OnlineUserItem = {
    id: number;
    ip: string;
    username: string;
    isCurrent: true;
    time: string;
    os: string;
    browser: string;
    disable: boolean;
  };

  type OnlineUserList = OnlineUserItem[];
}

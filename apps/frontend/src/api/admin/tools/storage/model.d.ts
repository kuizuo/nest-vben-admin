declare namespace API {
  type StorageListPageResultItem = {
    id: number;
    name: string;
    fileName: string;
    extName: string;
    path: string;
    type: string;
    size: string;
    username: string;
  };

  type StorageListPageResult = StorageListPageResultItem[];
}

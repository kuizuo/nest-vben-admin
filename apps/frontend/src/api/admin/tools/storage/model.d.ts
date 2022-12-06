declare namespace API {
  type StorageItem = {
    id: number;
    name: string;
    fileName: string;
    extName: string;
    path: string;
    type: string;
    size: string;
    username: string;
  };

  type StorageList = StorageItem[];
}

export interface scanInfoModel {
  serialNumber: string;
  uomName: string;
  qty: number;
  status: string;
  errorinfo: string;
  statusColor: string;
}

export interface messageModel {
  title: string;
  content: string;
  datatime: string;
  status: string;
}

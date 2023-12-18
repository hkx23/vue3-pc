export interface scanInfoModel {
  serialNumber: string;
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

export interface scanCollectInfoModel {
  serialNumber: string;
  uomName: string;
  qty: number;
  status: string;
  errorinfo: string;
  statusColor: string;
}

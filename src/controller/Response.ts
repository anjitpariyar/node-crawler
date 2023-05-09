class ResponseObj {
  status: number;
  data: object;
  meta: object;
  msg: string;

  constructor(status: number, data: object, meta: object, msg: string) {
    this.status = status;
    this.data = data;
    this.meta = meta;
    this.msg = msg;
  }
}

export default ResponseObj;

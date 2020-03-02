declare var M;
export class MaterialService {
  static toast(msg: string) {
    M.toast({ html: msg });
  }
}

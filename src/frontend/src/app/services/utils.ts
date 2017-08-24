export const BASE_URL = 'http://0.0.0.0:8082/foglamp/'
// export const BASE_URL = 'http://192.168.1.10:8082/foglamp/'
export const POLLING_INTERVAL = 2000   //milliseconds

export default class Utils {

  public static formateDate(dt: string) {
    var date = new Date(dt); // had to remove the colon (:) after the T in order to make it work
    // var day = date.getDate();
    // var monthIndex = date.getMonth();
    // var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var myFormattedDate = Utils.pad(hours,2,0) + ":" + Utils.pad(minutes,2,0) + ":" + Utils.pad(seconds,2,0);
    return myFormattedDate;
  }
  public static pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}

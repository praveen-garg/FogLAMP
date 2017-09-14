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
    var myFormattedDate = Utils.pad(hours, 2, 0) + ":" + Utils.pad(minutes, 2, 0) + ":" + Utils.pad(seconds, 2, 0);
    return myFormattedDate;
  }
  public static pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  /**
   * @param repeat_time interval to add left pad 
   */
  public static leftPad(repeat_time: string) {
    if (repeat_time != undefined) {  // server sends time in xh:mm:ss format if x = 0
      repeat_time = repeat_time.length == 7 ? repeat_time = "0" + repeat_time : repeat_time;
      console.log("time", repeat_time)
      return repeat_time;
    }
  }

  // Convert time in seconds 
  public static convertTimeToSec(repeatTime: string, repeatDays?: number) {
    let seconds
    let repeat_interval = repeatTime.split(':')
    if (repeatDays > 0) {
      seconds = (+repeatDays) * 86400 + (+repeat_interval[0]) * 60 * 60 + (+repeat_interval[1]) * 60 + (+repeat_interval[2])
    } else {
      seconds = (+repeat_interval[0]) * 60 * 60 + (+repeat_interval[1]) * 60 + (+repeat_interval[2])
    }
    return seconds;
  }

  public static secondsToDhms(totalSeconds) {
    totalSeconds = Number(totalSeconds);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor((totalSeconds % 86400) / 3600);
    let minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
    let seconds = ((totalSeconds % 86400) % 3600) % 60;
    let formatedTime = Utils.pad(hours, 2, 0) + ":" + Utils.pad(minutes, 2, 0) + ":" + Utils.pad(seconds, 2, 0);
    return {
      'days': days,
      'time': formatedTime
    }
  }

  /**
     * To check valid supplied time range 
     * @param time in seconds
     */
  public static not_between(time) {
    console.log("Not beetween", time);
    
    if (time == undefined || time == "") {
      return true;
    }
    // To check if Time in 00:00:00, 23:59:59 range
    let timeUnits = time.split(":")
    let hh = timeUnits[0]
    let mm = timeUnits[1]
    let ss = timeUnits[2]
    if ((+hh) < 0 || (+hh) > 23) {
      return true
    }
    if ((+mm) < 0 || (+mm) > 59) {
      return true
    }
    if ((+ss) < 0 || (+ss) > 59) {
      return true
    }
    let totalSec = (+hh*60*60) + (+mm*60) + (+ss)
    console.log("Total sec", totalSec);
    
    return totalSec < 0 || totalSec >= 86400
  }

}


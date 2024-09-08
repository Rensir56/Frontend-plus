function convertTimestampToTimeString(timestamp: number, currentTime: number, mode:number) {
    const date = new Date(timestamp); // 使用时间戳创建 Date 对象
    const currentDate = new Date(currentTime); // 使用当前时间戳创建 Date 对象
  
    const timestampDate = date.getDate();
    const currentDay = currentDate.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`; // 格式化小时和分钟
    const dateString = `${month}月${day}号`;
  
  
    if (timestampDate === currentDay) {
      // 时间戳与当前日期相同
      return timeString;
    } else {
      // 时间戳与当前日期不同
      if (dateString === '1月1号')
        return ''
      if(mode === 1)
        return dateString + " " + timeString;
      return dateString;
    }
  }

export default convertTimestampToTimeString
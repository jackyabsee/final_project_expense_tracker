export function convertDate(dateString: string) {
  let o_date = new Date(dateString);
  let year = o_date.getFullYear();
  let monthNum = o_date.getMonth() + 1;
  let dateNum = o_date.getDate();
  let hourNum = o_date.getHours();
  let minuteNum = o_date.getMinutes();

  let hour = String(hourNum);
  let month = String(monthNum);
  let minute = String(minuteNum);
  let date = String(dateNum);

  if (hourNum < 10) {
    hour = "0" + hourNum;
  }
  if (monthNum < 10) {
    month = "0" + monthNum;
  }
  if (minuteNum < 10) {
    minute = "0" + minuteNum;
  }
  if (dateNum < 10) {
    date = "0" + dateNum;
  }

  let convertedDate = {
    date: `${year}-${month}-${date}`,
    dateTime: `${year}-${month}-${date} (${hour}:${minute})`,
  };
  return convertedDate;
}

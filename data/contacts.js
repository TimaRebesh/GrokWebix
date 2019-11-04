const dateFormat = webix.Date.strToDate("%d-%m-%Y");
const strFormatDate = webix.Date.dateToStr("%Y-%m-%d");
const birthdayDate = webix.Date.strToDate("%d-%F-%Y,%D");

export const contacts = new webix.DataCollection({
  scheme: {
    $init: obj => {
      obj.b = obj.Birthday;
      obj.Birthday = dateFormat(obj.Birthday);
    },
    $update: obj => {
      obj.Birthday = dateFormat(obj.Birthday);
    },
    $save: obj => {
      obj.Birthday = strFormatDate(obj.Birthday);
    }
  },
  url: "http://localhost:8096/api/v1/contacts/",
  save: "rest->http://localhost:8096/api/v1/contacts/"
});

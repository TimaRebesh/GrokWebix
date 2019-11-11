const formatToDate = webix.Date.strToDate("%d-%m-%Y %H:%i");
const formatToStr = webix.Date.dateToStr("%d-%m-%Y");
const serverFormat = webix.Date.dateToStr("%Y-%m-%d %H:%i");

export const contacts = new webix.DataCollection({
  url: "http://localhost:8096/api/v1/contacts/",
  save: "rest->http://localhost:8096/api/v1/contacts/",
  scheme: {
    $init: obj => {
      obj.birthDate = formatToDate(obj.Birthday);
    },
    $update: obj => {
      obj.Birthday = formatToStr(obj.birthDate);
    },
    $save: obj => {
      obj.Birthday = serverFormat(obj.birthDate);
    }
  }
});

export const userData = new webix.DataCollection({
  url: "https://jsonplaceholder.typicode.com/users",
  save: "rest->https://jsonplaceholder.typicode.com/users",
  scheme: {
    $init: function(obj) {
      (obj.city = obj.address.city), (obj.company = obj.company.name);
    }
  }
});

export { datatable2 };

const url = "https://jsonplaceholder.typicode.com/users";

let datatable2 = {
  view: "datatable",
  id: "datatable2",
  autoConfig: true,
  url: url,
  save: url,
  editable: true,
  scheme: {
    $init: function(obj) {
      (obj.city = obj.address.city), (obj.company = obj.company.name);
    }
  },
  columns: [
    {
      id: "name",
      header: "Name of user",
      editor: "text",
      width: 500
    },
    {
      id: "city",
      header: "City",
      width: 300
    },
    {
      id: "email",
      header: "@mail",
      width: 300
    },
    {
      id: "phone",
      header: "Phone",
      width: 300
    },
    {
      id: "company",
      header: "company",
      adjust: true
    },
    { header: "", width: 200 }
  ],
  on: {
    onAfterEditStop: function() {}
  }
};

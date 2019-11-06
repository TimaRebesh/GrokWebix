import { contacts } from "./data/contacts";

export { datatable, window };

let datatable = {
  id: "listTable",
  rows: [
    {
      view: "toolbar",
      elements: [
        {},
        {
          view: "button",
          value: "export to excel",
          autowidth: true,
          css: "button_excel",
          click: function() {
            webix
              .confirm({
                title: "Dowbload",
                text: "Do you want download this file?",
                type: "confirm-error"
              })
              .then(function(result) {
                webix.toExcel($$("myTable"));
              });
          }
        },
        {
          view: "button",
          value: "refresh",
          autowidth: true,
          click: function() {
            $$("myTable").load("http://localhost:8096/api/v1/contacts/");
          }
        },
        { width: 20 }
      ]
    },
    {
      view: "datatable",
      id: "myTable",
      data: contacts,
      select: true,
      editable: true,
      form: "myPopup",
      hover: "myhoverOfDatatable",
      columns: [
        {
          id: "FirstName",
          header: ["FirstName", { content: "textFilter" }],
          width: 300,
          sort: "string",
          editor: "text"
        },

        {
          id: "LastName",
          header: ["LastName", { content: "textFilter" }],
          sort: "string",
          editor: "text",
          width: 300
        },
        {
          id: "Company",
          header: ["Company", { content: "textFilter" }],
          sort: "string",
          editor: "text",
          width: 300
        },
        {
          id: "Job",
          header: ["Job", { content: "textFilter" }],
          sort: "string",
          editor: "text",
          width: 300
        },
        {
          id: "Birthday",
          header: ["Birthday", { content: "textFilter" }],
          sort: "string",
          editor: "text",
          width: 300
        },
        { fillspace: true }
      ]
      // on: {                                 // second variant of communication with the form
      //   onItemDblClick: function() {
      //     $$("myPopup").show();
      //   },
      //   onAfterSelect(id) {
      //     $$("formInPopup").setValues({
      //       FirstName: this.getItem(id).FirstName,
      //       LastName: this.getItem(id).LastName,
      //       Company: this.getItem(id).Company,
      //       Job: this.getItem(id).Job,
      //       id: this.getItem(id).id
      //     });
      //   }
      // }
    }
  ]
};

let window = webix.ui({
  view: "popup",
  id: "myPopup",
  modal: true,
  position: "center",
  label: {
    width: 140
  },
  body: {
    view: "form",
    id: "formInPopup",
    width: 600,
    rules: {
      FirstName: webix.rules.isNotEmpty,
      LastName: webix.rules.isNotEmpty
    },
    elementsConfig: {
      labelWidth: 100
    },
    elements: [
      {
        view: "text",
        label: "FirstName",
        name: "FirstName",
        required: true,
        placeholder: "first name",
        invalidMessage: "fill in the field please"
      },
      {
        view: "text",
        label: "LastName",
        name: "LastName",
        placeholder: "last name",
        required: true,
        invalidMessage: "fill in the field please"
      },
      { view: "text", label: "Company", name: "Company" },
      { view: "text", label: "Job", name: "Job" },
      {
        view: "datepicker",
        name: "birthDate",
        format: webix.i18n.longDateFormatStr,
        label: "Birthday"
      },
      {
        cols: [
          {
            view: "button",
            value: "Save",
            css: "webix_primary",
            hotkey: "enter",
            click: function() {
              let values = $$("formInPopup").getValues();
              let id = $$("formInPopup").getValues().id;
              // let value1 = $$("formInPopup").getValues().FirstName;
              // let value2 = $$("formInPopup").getValues().LastName;
              // let value3 = $$("formInPopup").getValues().Job;

              // let item = $$("myTable").getItem(id); //объект выбранной записи
              // item.FirstName = value1;
              // item.LastName = value2;
              // item.Job = value3;
              if ($$("formInPopup").validate()) {
                contacts // обновляю данные с сервера
                  .waitSave(() => {
                    if (id) {
                      contacts.updateItem(id, values);
                    }
                  })
                  .then(() => $$("myPopup").hide());
              }
            }
          },
          { width: 20 },
          {
            view: "button",
            value: "Close",
            hotkey: "esc",
            click: function() {
              $$("myPopup").hide();
            }
          }
        ]
      }
    ]
  }
});

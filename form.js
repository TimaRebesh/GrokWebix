import { contacts } from "./data/contacts";

export { getForm };

const someForm = {
  view: "form",
  id: "ParamForm",
  elements: [
    { view: "text", placeholder: "First Name" },
    { view: "text", placeholder: "Last Name" },
    {
      cols: [
        { view: "button", value: "Cancel" },
        { view: "button", value: "Sumbit", type: "form" }
      ]
    }
  ]
};

const addParams = {
  view: "form",
  id: "addParam",
  borderless: true,
  elements: [
    {
      view: "slider",
      lable: "menu width",
      title: webix.template("#value#"),
      min: "100",
      max: "250",
      step: "10",
      value: "250",
      on: {
        onChange: function() {
          const size = this.getValue();
          $$("sidebar").getNode().style.width = size + "px";
        }
      }
    },
    { view: "datepicker", label: "Date", id: "sss" },
    {
      view: "colorpicker",
      label: "Menu Color",
      labelWidth: 120,
      on: {
        onChange: function() {
          const color = this.getValue();
          $$("sidebar").getNode().style.backgroundColor = color;
          $$("toolbar").getNode().style.backgroundColor = color;
        }
      }
    }
  ]
};

function showAdditionalParameters() {
  webix.ui(addParams, $$("ParamForm"));
}

function hideAdditionalParameters() {
  webix.ui(someForm, $$("addParam"));
}

function getForm(companiesUnique) {
  const form = {
    view: "form",
    id: "myForm",
    elementsConfig: {
      labelWidth: 140,
      margin: 20
    },
    elements: [
      {
        type: "header",
        template: `Companies`,
        height: 40,
        css: "form_header"
      },
      {
        cols: [
          {
            rows: [
              {
                view: "combo",
                label: "Select company",
                options: companiesUnique,
                on: {
                  onChange: function() {
                    $$("datatableConnectForm").clearAll();

                    let arrOfSelected = [];

                    contacts.filter(obj => {
                      if (this.getValue() == obj.Company) {
                        arrOfSelected.push(obj);
                      }
                      if (this.getValue() == "All companies") {
                        arrOfSelected.push(obj);
                      }
                      return obj;
                    });
                    $$("datatableConnectForm").parse(arrOfSelected);
                  }
                }
              },
              {
                view: "datatable",
                id: "datatableConnectForm",
                autoConfig: true,
                select: true,
                columns: [
                  {
                    id: "Job",
                    header: ["Job", { content: "textFilter" }],
                    sort: "string",
                    editor: "text",
                    fillspace: true
                  },
                  {
                    id: "LastName",
                    header: ["LastName", { content: "textFilter" }],
                    sort: "string",
                    editor: "text"
                  }
                ]
              },
              { height: 5 }
            ]
          },
          {
            rows: [
              {
                view: "uploader",
                value: "Upload files",
                name: "files",
                link: "listOfUploder",
                upload: "https://docs.webix.com/samples/server/upload"
              },
              {
                view: "list",
                id: "listOfUploder",
                type: "uploader",
                autoheight: true,
                minHeight: 300,
                borderless: true
              },
              {
                view: "checkbox",
                labelRight: "additional control parameters",
                value: 0,
                click: function() {
                  if (this.getValue() == 1) {
                    showAdditionalParameters();
                  } else {
                    hideAdditionalParameters();
                  }
                }
              },

              someForm,
              {},

              { height: 5 }
            ]
          }
        ]
      }
    ]
  };

  return form;
}

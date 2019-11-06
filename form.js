import { contacts } from "./data/contacts";

export { getForm };

function getForm(companiesUnique) {
  const form = {
    view: "form",
    id: "myForm",
    elementsConfig: {
      labelWidth: 100,
      margin: 20
    },
    elements: [
      {
        type: "header",
        template: `dfdfsfdfd`,
        height: 40,
        css: "form_header"
      },
      {
        cols: [
          {
            rows: [
              {
                view: "combo",
                label: "Company",
                options: companiesUnique,
                on: {
                  onChange: function() {
                    $$("datatableConnectForm").clearAll();

                    let arrOfSelected = [];

                    contacts.filter(obj => {
                      if (this.getValue() == obj.Company) {
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
              {}
            ]
          },
          {}
        ]
      }
    ]
  };
  return form;
}

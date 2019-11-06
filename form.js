import { contacts } from "./data/contacts";

export { getForm };

function getForm(companiesUnique) {
  const form = {
    view: "form",
    id: "myForm",
    elementsConfig: {
      labelWidth: 150,
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
                view: "select",
                label: "Company",
                options: companiesUnique
              }
            ]
          },
          {}
        ]
      }
    ]
  };
  return form;
}

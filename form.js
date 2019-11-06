import { contacts } from "./data/contacts";

export const form = {
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
      height: 40
    },
    {
      cols: [
        {
          view: "combo",
          name: "StatusID",
          label: "Status"
        }
      ]
    }
  ]
};

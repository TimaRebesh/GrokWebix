import { datatable, window } from "./datatable.js";
import { datatable2 } from "./datatable2.js";
import { list } from "./list.js";
import { contacts } from "./data/contacts";
import { getForm } from "./form";

webix.protoUI(
  {
    name: "editlist"
  },
  webix.EditAbility,
  webix.ui.list
);

let menu_data = [
  {
    id: "listTable",
    icon: "mdi mdi-view-dashboard",
    value: "Table"
  },
  {
    id: "datatable2",
    icon: "mdi mdi-view-column",
    value: "Users"
  },
  {
    id: "myList",
    icon: "mdi mdi-view-column",
    value: "List"
  },
  {
    id: "myForm",
    icon: "mdi mdi-view-column",
    value: "Form"
  }
];

const toolbar = {
  view: "toolbar",
  padding: 3,
  css: "webix_dark",
  elements: [
    {
      view: "icon",
      icon: "mdi mdi-menu",
      click: function() {
        $$("$sidebar1").toggle();
      }
    },
    { view: "label", label: "My App" },
    {}
  ]
};

const sidebar = {
  view: "sidebar",
  id: "sidebar",
  css: "webix_dark",
  data: menu_data,
  on: {
    onAfterSelect: function(id) {
      $$(id).show();
    }
  }
};

contacts.waitData.then(() => {
  let set = new Set();

  contacts.filter(function(obj) {
    let value = obj.Company;
    set.add(value);
    return value;
  });
  let companiesUnique = Array.from(set);

  webix.ready(function() {
    webix.ui({
      rows: [
        toolbar,
        {
          cols: [
            sidebar,
            {
              cells: [getForm(companiesUnique), datatable, datatable2, list]
            }
          ]
        }
      ]
    });

    $$("tableConectList").attachEvent("onBeforeEditStop", function() {
      const values = $$("tableConectList").getEditorValue();
      const id = $$("tableConectList").getEditor().row;

      $$("tableConectList").updateItem(id, values);
    });

    // $$("listOk").attachEvent("onAfterLoad", function() {
    //   this.select(this.getFirstId());
    //   let set = new Set();
    //   console.log(contacts);
    //   this.filter(function(obj) {
    //     let compValue = obj.Company;
    //     if (!set.has(compValue)) {
    //       set.add(compValue);
    //       return compValue;
    //     }
    //   });
    // });
  });
});
// datatable, datatable2,
// console.log(dataUsers);

import { contacts } from "./data/contacts";
export { list };

let dataToDatatable = [];
let itemObj = null;

let list = {
  id: "myList",
  cols: [
    {
      view: "list",

      width: 200,
      select: true,
      item: { height: 60, css: "list_Item" },
      template: "#Company#",
      // editable: true,
      url: "http://localhost:8096/api/v1/contacts/",
      on: {
        onAfterLoad: function() {
          this.select(this.getFirstId());
          let set = new Set();

          this.filter(function(obj) {
            let compValue = obj.Company;
            if (!set.has(compValue)) {
              set.add(compValue);
              return compValue;
            }
          });
        },
        onAfterSelect: function(id) {
          $$("tableConectList").clearAll();
          dataToDatatable = [];
          let item = this.getItem(id);
          let cont = contacts.serialize();
          cont.map(obj => {
            if (obj.Company == item.Company) {
              dataToDatatable.push(obj);
            }
          });
          let datainJson = JSON.stringify(dataToDatatable);
          $$("tableConectList").parse(datainJson);
          $$("tableConectList").select(this.getSelectedId());
        }
      }
    },
    {
      rows: [
        {
          view: "datatable",
          id: "tableConectList",
          // data: dataToDatatable,
          save: "http://localhost:8096/api/v1/contacts/",
          select: true,
          editable: true,
          scrollY: true,
          editaction: "dblclick",
          resizeColumn: true,
          scheme: {
            $init: function(obj) {
              const today = new Date();
              let birthDate = new Date(obj.Birthday);
              let age = today.getFullYear() - birthDate.getFullYear();
              let m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              obj.age = age;
            }
          },
          columns: [
            {
              header: "Profession",
              id: "Job",
              editor: "text",
              fillspace: true
            },
            {
              header: "Address",
              id: "Address",
              editor: "text",
              fillspace: true
            },
            {
              header: "Age",
              id: "age",
              fillspace: true
            },
            {
              header: "LastName",
              id: "LastName",
              fillspace: true
            }
          ],
          on: {
            onAfterSelect: function() {
              itemObj = this.getItem(this.getSelectedId());
              let values = webix.copy(itemObj);
              $$("template").parse(values);
            }
          }
        },
        {
          template: obj => `
            <div class="info_block1">
              <div class="userinfo_photo">
                <image class="photo" src="${obj.Photo ||
                  "http://confirent.ru/sites/all/themes/skeletontheme/images/empty_avatar.jpg"}" />
                <h1 class="name">${obj.FirstName || " "}</h1>
                <h2 class="name">${obj.LastName || " "}</h2>
              </div>
              <div class="info_block2">
                <p><span class="useremail mdi mdi-email"></span> email: ${obj.Email ||
                  " "}</p>
                <p><span class="userskype mdi mdi-skype"></span> skype: ${obj.Skype ||
                  " "}</p>
                <p><span class="mdi mdi-tag"></span> job: ${obj.Job || " "}</p>
                <p><span class="usercompany mdi mdi-briefcase"></span> company ${obj.Company ||
                  " "}</p>
              </div>
              <div class="info_block3">
                <p><span class="userbirthday webix_icon wxi-calendar"></span> day of birth: ${obj.b ||
                  " "}</p>
                <p><span class="userlocation mdi mdi-map-marker"></span> location: ${obj.Address ||
                  " "}</p>
              </div>
            </div>
          `,
          id: "template",
          view: "template",
          borderless: true
        }
      ]
    }
  ]
};

// six

// new somjdkfjjjjjjjddddddddddddddddddddddddddd
// some comment

// dfdffffffffffffffffffffff

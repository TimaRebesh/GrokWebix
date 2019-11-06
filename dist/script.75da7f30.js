// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"data/contacts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contacts = void 0;
var formatToDate = webix.Date.strToDate("%d-%m-%Y %H:%i");
var formatToStr = webix.Date.dateToStr("%d-%m-%Y");
var serverFormat = webix.Date.dateToStr("%Y-%m-%d %H:%i");
var contacts = new webix.DataCollection({
  url: "http://localhost:8096/api/v1/contacts/",
  save: "rest->http://localhost:8096/api/v1/contacts/",
  scheme: {
    $init: function $init(obj) {
      obj.birthDate = formatToDate(obj.Birthday);
    },
    $update: function $update(obj) {
      obj.Birthday = formatToStr(obj.birthDate);
    },
    $save: function $save(obj) {
      obj.Birthday = serverFormat(obj.birthDate);
    }
  }
});
exports.contacts = contacts;
},{}],"datatable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.window = exports.datatable = void 0;

var _contacts = require("./data/contacts");

var datatable = {
  id: "listTable",
  rows: [{
    view: "toolbar",
    elements: [{}, {
      view: "button",
      value: "export to excel",
      autowidth: true,
      css: "button_excel",
      click: function click() {
        webix.confirm({
          title: "Dowbload",
          text: "Do you want download this file?",
          type: "confirm-error"
        }).then(function (result) {
          webix.toExcel($$("myTable"));
        });
      }
    }, {
      view: "button",
      value: "refresh",
      autowidth: true,
      click: function click() {
        $$("myTable").load("http://localhost:8096/api/v1/contacts/");
      }
    }, {
      width: 20
    }]
  }, {
    view: "datatable",
    id: "myTable",
    data: _contacts.contacts,
    select: true,
    editable: true,
    form: "myPopup",
    hover: "myhoverOfDatatable",
    columns: [{
      id: "FirstName",
      header: ["FirstName", {
        content: "textFilter"
      }],
      width: 300,
      sort: "string",
      editor: "text"
    }, {
      id: "LastName",
      header: ["LastName", {
        content: "textFilter"
      }],
      sort: "string",
      editor: "text",
      width: 300
    }, {
      id: "Company",
      header: ["Company", {
        content: "textFilter"
      }],
      sort: "string",
      editor: "text",
      width: 300
    }, {
      id: "Job",
      header: ["Job", {
        content: "textFilter"
      }],
      sort: "string",
      editor: "text",
      width: 300
    }, {
      id: "Birthday",
      header: ["Birthday", {
        content: "textFilter"
      }],
      sort: "string",
      editor: "text",
      width: 300
    }, {
      fillspace: true
    }] // on: {                                 // second variant of communication with the form
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

  }]
};
exports.datatable = datatable;
var window = webix.ui({
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
    elements: [{
      view: "text",
      label: "FirstName",
      name: "FirstName",
      required: true,
      placeholder: "first name",
      invalidMessage: "fill in the field please"
    }, {
      view: "text",
      label: "LastName",
      name: "LastName",
      placeholder: "last name",
      required: true,
      invalidMessage: "fill in the field please"
    }, {
      view: "text",
      label: "Company",
      name: "Company"
    }, {
      view: "text",
      label: "Job",
      name: "Job"
    }, {
      view: "datepicker",
      name: "birthDate",
      format: webix.i18n.longDateFormatStr,
      label: "Birthday"
    }, {
      cols: [{
        view: "button",
        value: "Save",
        css: "webix_primary",
        hotkey: "enter",
        click: function click() {
          var values = $$("formInPopup").getValues();
          var id = $$("formInPopup").getValues().id; // let value1 = $$("formInPopup").getValues().FirstName;
          // let value2 = $$("formInPopup").getValues().LastName;
          // let value3 = $$("formInPopup").getValues().Job;
          // let item = $$("myTable").getItem(id); //объект выбранной записи
          // item.FirstName = value1;
          // item.LastName = value2;
          // item.Job = value3;

          if ($$("formInPopup").validate()) {
            _contacts.contacts // обновляю данные с сервера
            .waitSave(function () {
              if (id) {
                _contacts.contacts.updateItem(id, values);
              }
            }).then(function () {
              return $$("myPopup").hide();
            });
          }
        }
      }, {
        width: 20
      }, {
        view: "button",
        value: "Close",
        hotkey: "esc",
        click: function click() {
          $$("myPopup").hide();
        }
      }]
    }]
  }
});
exports.window = window;
},{"./data/contacts":"data/contacts.js"}],"datatable2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datatable2 = void 0;
var url = "https://jsonplaceholder.typicode.com/users";
var datatable2 = {
  view: "datatable",
  id: "datatable2",
  autoConfig: true,
  url: url,
  editable: true,
  scheme: {
    $init: function $init(obj) {
      obj.city = obj.address.city, obj.company = obj.company.name;
    }
  },
  columns: [{
    id: "name",
    header: "Name of user",
    editor: "text",
    width: 500
  }, {
    id: "city",
    header: "City",
    width: 300
  }, {
    id: "email",
    header: "@mail",
    width: 300
  }, {
    id: "phone",
    header: "Phone",
    width: 300
  }, {
    id: "company",
    header: "company",
    adjust: true
  }, {
    header: "",
    width: 200
  }]
};
exports.datatable2 = datatable2;
},{}],"list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _contacts = require("./data/contacts");

var dataToDatatable = [];
var itemObj = null;
var list = {
  id: "myList",
  cols: [{
    view: "list",
    id: "listOk",
    width: 200,
    select: true,
    item: {
      height: 60,
      css: "list_Item"
    },
    template: "#Company#",
    // editable: true,
    // data: contacts,
    url: "http://localhost:8096/api/v1/contacts/",
    save: "rest->http://localhost:8096/api/v1/contacts/",
    on: {
      onAfterLoad: function onAfterLoad() {
        this.select(this.getFirstId());
        var set = new Set();
        this.filter(function (obj) {
          var compValue = obj.Company;

          if (!set.has(compValue)) {
            set.add(compValue);
            return compValue;
          }
        });
      },
      onAfterSelect: function onAfterSelect(id) {
        $$("tableConectList").clearAll();
        dataToDatatable = [];
        var item = this.getItem(id);

        var cont = _contacts.contacts.serialize();

        cont.map(function (obj) {
          if (obj.Company == item.Company) {
            dataToDatatable.push(obj);
          }
        });
        var datainJson = JSON.stringify(dataToDatatable);
        $$("tableConectList").parse(datainJson);
        $$("tableConectList").select(this.getSelectedId());
      }
    }
  }, {
    rows: [{
      view: "datatable",
      id: "tableConectList",
      save: "rest->http://localhost:8096/api/v1/contacts/",
      select: true,
      editable: true,
      scrollY: true,
      editaction: "dblclick",
      resizeColumn: true,
      scheme: {
        $init: function $init(obj) {
          var today = new Date();
          var birthDate = new Date(obj.birthDate);
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();

          if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
            age--;
          }

          obj.age = age;
        }
      },
      columns: [{
        header: "Profession",
        id: "Job",
        editor: "text",
        fillspace: true
      }, {
        header: "Address",
        id: "Address",
        editor: "text",
        fillspace: true
      }, {
        header: "Age",
        id: "age",
        fillspace: true
      }, {
        header: "LastName",
        id: "LastName",
        fillspace: true
      }, {
        id: "",
        template: "{common.trashIcon()}",
        width: 40
      }],
      onClick: {
        "wxi-trash": function wxiTrash(e, id) {
          webix.confirm({
            text: "Are you sure?",
            ok: "OK",
            cancel: "Cancel"
          }).then(function () {
            // $$("tableConectList").remove(id);
            $$("tableConectList").remove(id);
            $$("listOk").select($$("listOk").getFirstId());
          });
          return false;
        }
      },
      on: {
        onAfterSelect: function onAfterSelect() {
          itemObj = this.getItem(this.getSelectedId());
          var values = webix.copy(itemObj);
          $$("template").parse(values);
        }
      }
    }, {
      template: function template(obj) {
        return "\n            <div class=\"info_block1\">\n              <div class=\"userinfo_photo\">\n                <image class=\"photo\" src=\"".concat(obj.Photo || "http://confirent.ru/sites/all/themes/skeletontheme/images/empty_avatar.jpg", "\" />\n                <h1 class=\"name\">").concat(obj.FirstName || " ", "</h1>\n                <h2 class=\"name\">").concat(obj.LastName || " ", "</h2>\n              </div>\n              <div class=\"info_block2\">\n                <p><span class=\"useremail mdi mdi-email\"></span> email: ").concat(obj.Email || " ", "</p>\n                <p><span class=\"userskype mdi mdi-skype\"></span> skype: ").concat(obj.Skype || " ", "</p>\n                <p><span class=\"mdi mdi-tag\"></span> job: ").concat(obj.Job || " ", "</p>\n                <p><span class=\"usercompany mdi mdi-briefcase\"></span> company ").concat(obj.Company || " ", "</p>\n              </div>\n              <div class=\"info_block3\">\n                <p><span class=\"userbirthday webix_icon wxi-calendar\"></span> day of birth: ").concat(obj.Birthday || " ", "</p>\n                <p><span class=\"userlocation mdi mdi-map-marker\"></span> location: ").concat(obj.Address || " ", "</p>\n              </div>\n            </div>\n          ");
      },
      id: "template",
      view: "template",
      borderless: true
    }]
  }]
};
exports.list = list;
},{"./data/contacts":"data/contacts.js"}],"form.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getForm = getForm;

var _contacts = require("./data/contacts");

function getForm(companiesUnique) {
  var form = {
    view: "form",
    id: "myForm",
    elementsConfig: {
      labelWidth: 150,
      margin: 20
    },
    elements: [{
      type: "header",
      template: "dfdfsfdfd",
      height: 40,
      css: "form_header"
    }, {
      cols: [{
        rows: [{
          view: "select",
          label: "Company",
          options: companiesUnique
        }]
      }, {}]
    }]
  };
  return form;
}
},{"./data/contacts":"data/contacts.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _datatable = require("./datatable.js");

var _datatable2 = require("./datatable2.js");

var _list = require("./list.js");

var _contacts = require("./data/contacts");

var _form = require("./form");

webix.protoUI({
  name: "editlist"
}, webix.EditAbility, webix.ui.list);
var menu_data = [{
  id: "listTable",
  icon: "mdi mdi-view-dashboard",
  value: "Table"
}, {
  id: "datatable2",
  icon: "mdi mdi-view-column",
  value: "Users"
}, {
  id: "myList",
  icon: "mdi mdi-view-column",
  value: "List"
}, {
  id: "myForm",
  icon: "mdi mdi-view-column",
  value: "Form"
}];
var toolbar = {
  view: "toolbar",
  padding: 3,
  css: "webix_dark",
  elements: [{
    view: "icon",
    icon: "mdi mdi-menu",
    click: function click() {
      $$("$sidebar1").toggle();
    }
  }, {
    view: "label",
    label: "My App"
  }, {}]
};
var sidebar = {
  view: "sidebar",
  id: "sidebar",
  css: "webix_dark",
  data: menu_data,
  on: {
    onAfterSelect: function onAfterSelect(id) {
      $$(id).show();
    }
  }
};

_contacts.contacts.waitData.then(function () {
  var set = new Set();

  _contacts.contacts.filter(function (obj) {
    var value = obj.Company;
    set.add(value);
    return value;
  });

  var companiesUnique = Array.from(set);
  webix.ready(function () {
    webix.ui({
      rows: [toolbar, {
        cols: [sidebar, {
          cells: [(0, _form.getForm)(companiesUnique), _datatable.datatable, _datatable2.datatable2, _list.list]
        }]
      }]
    });
    $$("tableConectList").attachEvent("onBeforeEditStop", function () {
      var values = $$("tableConectList").getEditorValue();
      var id = $$("tableConectList").getEditor().row;
      $$("tableConectList").updateItem(id, values);
    }); // $$("listOk").attachEvent("onAfterLoad", function() {
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
}); // datatable, datatable2,
// console.log(dataUsers);
},{"./datatable.js":"datatable.js","./datatable2.js":"datatable2.js","./list.js":"list.js","./data/contacts":"data/contacts.js","./form":"form.js"}],"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50255" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map
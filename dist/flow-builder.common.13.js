((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[13],{

/***/ "41bd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"26dc0a25-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_LogBlock.vue?vue&type=template&id=29af4076&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"core-log-block"},[_c('h3',{staticClass:"no-room-above"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.edit-block-type',{block_type: _vm.trans(("flow-builder." + (_vm.block.type)))}))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('div',{staticClass:"text-only-resource-editor"},[_c('hr'),_c('h4',[_vm._v("Log Message")]),_vm._l((_vm.flow.languages),function(ref){
var languageId = ref.id;
var language = ref.label;
return [_c('div',{staticClass:"block-content-editor-lang"},[_c('h5',{staticClass:"badge badge-info"},[_vm._v(" "+_vm._s(_vm._f("trans")(language || 'flow-builder.unknown-language'))+" ")])]),_vm._l((_vm.flow.supported_modes),function(mode){return [_c('h6',[_vm._v(_vm._s(_vm._f("trans")(("flow-builder." + (mode.toLowerCase()) + "-content"))))]),_c('resource-variant-text-editor',{attrs:{"resource-id":_vm.messageResource.uuid,"resource-variant":_vm.findOrGenerateStubbedVariantOn(
              _vm.messageResource,
              {language_id: languageId, content_type: ['text'], modes: [mode]}),"mode":mode,"enable-autogen-button": true || false}})]})]})],2),_vm._t("extras"),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_LogBlock.vue?vue&type=template&id=29af4076&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("276c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__("2c4c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("920b");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createSuper.js + 1 modules
var createSuper = __webpack_require__("92a6");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("fc11");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var vue_property_decorator_lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./src/store/flow/resource.ts
var resource = __webpack_require__("393e");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("c964");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./src/store/flow/block-types/Core_LogBlockStore.ts




var BLOCK_TYPE = 'Core.Log';
var getters = {};
var mutations = {};
var actions = {
  createWith: function createWith(_ref, _ref2) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dispatch, props, blankLogResource, exits;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref.dispatch;
              props = _ref2.props;
              _context.next = 4;
              return dispatch('flow/flow_addBlankResource', null, {
                root: true
              });

            case 4:
              blankLogResource = _context.sent;
              _context.t0 = dispatch;
              _context.next = 8;
              return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

            case 8:
              _context.t1 = _context.sent;
              _context.t2 = {
                uuid: _context.t1,
                name: 'Default'
              };
              _context.t3 = {
                props: _context.t2
              };
              _context.t4 = {
                root: true
              };
              _context.next = 14;
              return (0, _context.t0)('flow/block_createBlockDefaultExitWith', _context.t3, _context.t4);

            case 14:
              _context.t5 = _context.sent;
              exits = [_context.t5];
              return _context.abrupt("return", Object(lodash["defaultsDeep"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semantic_label: '',
                exits: exits,
                config: {
                  message: blankLogResource.uuid
                },
                tags: []
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
/* harmony default export */ var Core_LogBlockStore = ({
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/Categorization.vue + 9 modules
var Categorization = __webpack_require__("8619");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue + 37 modules
var ResourceEditor = __webpack_require__("510a");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue + 4 modules
var ResourceVariantTextEditor = __webpack_require__("bb40");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue + 4 modules
var NameEditor = __webpack_require__("f04e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue + 4 modules
var LabelEditor = __webpack_require__("3411");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue + 4 modules
var SemanticLabelEditor = __webpack_require__("1b4e");

// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue + 4 modules
var FirstBlockEditorButton = __webpack_require__("192b");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue + 4 modules
var BlockId = __webpack_require__("792f");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue + 4 modules
var GenericContactPropertyEditor = __webpack_require__("b4ec");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_LogBlock.vue?vue&type=script&lang=ts&
























var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var Core_LogBlockvue_type_script_lang_ts_Core_LogBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(Core_LogBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(Core_LogBlock);

  function Core_LogBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, Core_LogBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "findOrGenerateStubbedVariantOn", resource["c" /* findOrGenerateStubbedVariantOn */]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resourcesByUuid", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(Core_LogBlock, [{
    key: "messageResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.message];
    }
  }]);

  return Core_LogBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Getter], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "resourcesByUuid", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "isEditable", void 0);

Core_LogBlockvue_type_script_lang_ts_Core_LogBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    GenericContactPropertyEditor: GenericContactPropertyEditor["a" /* default */],
    ResourceEditor: ResourceEditor["a" /* default */],
    ResourceVariantTextEditor: ResourceVariantTextEditor["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    BlockId: BlockId["a" /* default */],
    Categorization: Categorization["a" /* default */]
  }
})], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock);
/* harmony default export */ var Core_LogBlockvue_type_script_lang_ts_ = (Core_LogBlockvue_type_script_lang_ts_Core_LogBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, Core_LogBlockStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_LogBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_Core_LogBlockvue_type_script_lang_ts_ = (Core_LogBlockvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_LogBlock.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_types_Core_LogBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_Core_LogBlock = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.13.js.map
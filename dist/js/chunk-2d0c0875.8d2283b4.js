(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c0875"],{"41bd":function(e,t,o){"use strict";o.r(t),o.d(t,"install",(function(){return U}));var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"core-log-block"},[o("h3",{staticClass:"no-room-above"},[e._v(" "+e._s(e._f("trans")("flow-builder.edit-block-type",{block_type:e.trans("flow-builder."+e.block.type)}))+" ")]),o("fieldset",{attrs:{disabled:!e.isEditable}},[o("block-name-editor",{attrs:{block:e.block}}),o("block-label-editor",{attrs:{block:e.block}}),o("block-semantic-label-editor",{attrs:{block:e.block}}),o("div",{staticClass:"text-only-resource-editor"},[o("hr"),o("h4",[e._v("Log Message")]),e._l(e.flow.languages,(function(t){var a=t.id,r=t.label;return[o("div",{staticClass:"block-content-editor-lang"},[o("h5",{staticClass:"badge badge-info"},[e._v(" "+e._s(e._f("trans")(r||"flow-builder.unknown-language"))+" ")])]),e._l(e.flow.supported_modes,(function(t){return[o("h6",[e._v(e._s(e._f("trans")("flow-builder."+t.toLowerCase()+"-content")))]),o("resource-variant-text-editor",{attrs:{"resource-id":e.messageResource.uuid,"resource-variant":e.findOrGenerateStubbedVariantOn(e.messageResource,{language_id:a,content_type:["text"],modes:[t]}),mode:t,"enable-autogen-button":!0}})]}))]}))],2),e._t("extras"),o("first-block-editor-button",{attrs:{flow:e.flow,"block-id":e.block.uuid}})],2),o("block-id",{attrs:{block:e.block}})],1)},r=[],c=o("d4ec"),n=o("bee2"),s=o("262e"),l=o("2caf"),i=o("9ab4"),b=o("4bb5"),u=o("60a3"),d=o("393e"),f=(o("96cf"),o("1da1")),k=o("31aa"),p=o("2ef0"),_="Core.Log",g={},w={},m={createWith:function(e,t){return Object(f["a"])(regeneratorRuntime.mark((function o(){var a,r,c,n;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return e.rootGetters,e.commit,a=e.dispatch,r=t.props,o.next=4,a("flow/flow_addBlankResource",null,{root:!0});case 4:return c=o.sent,o.t0=a,o.next=8,(new k["IdGeneratorUuidV4"]).generate();case 8:return o.t1=o.sent,o.t2={uuid:o.t1,tag:"Default",label:"Default"},o.t3={props:o.t2},o.t4={root:!0},o.next=14,(0,o.t0)("flow/block_createBlockDefaultExitWith",o.t3,o.t4);case 14:return o.t5=o.sent,n=[o.t5],o.abrupt("return",Object(p["defaultsDeep"])(r,{type:_,name:"",label:"",semantic_label:"",exits:n,config:{message:c.uuid}}));case 17:case"end":return o.stop()}}),o)})))()}},O={namespaced:!0,getters:g,mutations:w,actions:m},v=o("af98"),j=o("4a51"),h=o("510a"),y=o("bb40"),x=o("f04e"),B=o("3411"),E=o("1b4e"),R=o("192b"),C=o("792f"),G=o("2fe1"),L=Object(b["e"])("flow"),D=Object(b["e"])("builder"),V=function(e){Object(s["a"])(o,e);var t=Object(l["a"])(o);function o(){var e;return Object(c["a"])(this,o),e=t.apply(this,arguments),e.findOrGenerateStubbedVariantOn=d["c"],e}return Object(n["a"])(o,[{key:"messageResource",get:function(){return this.resourcesByUuid[this.block.config.message]}}]),o}(Object(G["c"])(j["a"]));Object(i["__decorate"])([Object(u["b"])()],V.prototype,"block",void 0),Object(i["__decorate"])([Object(u["b"])()],V.prototype,"flow",void 0),Object(i["__decorate"])([L.Getter],V.prototype,"resourcesByUuid",void 0),Object(i["__decorate"])([D.Getter],V.prototype,"isEditable",void 0),V=Object(i["__decorate"])([Object(u["a"])({components:{ResourceEditor:h["a"],ResourceVariantTextEditor:y["a"],BlockNameEditor:x["a"],BlockLabelEditor:B["a"],BlockSemanticLabelEditor:E["a"],FirstBlockEditorButton:R["a"],BlockId:C["a"]}})],V);var S=V,U=Object(v["c"])(_,O),I=S,J=o("2877"),W=Object(J["a"])(I,a,r,!1,null,null,null);t["default"]=W.exports}}]);
//# sourceMappingURL=chunk-2d0c0875.8d2283b4.js.map
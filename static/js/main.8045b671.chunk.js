(this.webpackJsonpdomo_datefilter=this.webpackJsonpdomo_datefilter||[]).push([[0],{65:function(e,t,r){e.exports=r(77)},74:function(e,t,r){},75:function(e,t,r){},77:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(7),i=r.n(o),s=r(32),c=(r(74),r(28)),u=r(29),l=r(34),p=r(33),d=r(104),f=r(49),y=r(11),m=r(108),v=function(e){var t=e.selectedDate,r=e.handleDateChange;return a.a.createElement(y.a,{utils:f.a},a.a.createElement(d.a,{container:!0,justify:"space-around"},a.a.createElement(m.a,{disableToolbar:!0,variant:"inline",format:"MM/dd/yyyy",margin:"normal",id:"date-picker-inline",label:"Date picker inline",value:t,onChange:r,KeyboardButtonProps:{"aria-label":"change date"}})))};var h=function(e){return{type:"API_START",payload:e}},g=function(e){return{type:"API_END",payload:e}},E=function(e){return{type:"API_ERROR",payload:e}},S=function(e){var t=e.columns;return{type:"SET_STORES",payload:e.rows.map((function(e){return e.reduce((function(e,r,n){return e[t[n]]=r,e}),{})}))}},b=function(e){return console.log("middleware error",e),{type:"SET_STORES",payload:{columns:["StoreID"],rows:[]}}},O=(r(75),function(e){Object(l.a)(r,e);var t=Object(p.a)(r);function r(){return Object(c.a)(this,r),t.apply(this,arguments)}return Object(u.a)(r,[{key:"componentDidCatch",value:function(e,t){this.props.handleError(e,t),console.log(e,t)}},{key:"render",value:function(){return this.props.isError?a.a.createElement("h2",null,"Error"):this.props.children}}]),r}(n.Component)),T=function(e){Object(l.a)(r,e);var t=Object(p.a)(r);function r(){return Object(c.a)(this,r),t.apply(this,arguments)}return Object(u.a)(r,[{key:"componentDidMount",value:function(){this.props.getStores()}},{key:"render",value:function(){console.log("render props",this.props);var e,t,r,n=this.props,o=n.onDateChange,i=n.selectedDate,s=n.storeData,c=n.errorState;if(s.length>0)(function(e,t){var r=e.map((function(e){return e[t]})),n={event:"filter",filter:[]};n.filter.push({columnName:t,operator:"IN",values:r,dataType:"numeric"}),window.parent.postMessage(JSON.stringify(n),"*")})((e=i,t="Open",r="Closed",s.filter((function(n){return Date.parse(n[t])<=e&&Date.parse(n[r])>=e}))),"RowID");return a.a.createElement("div",{className:"App"},a.a.createElement(O,{isError:c.isError,handleError:c.onError},a.a.createElement(v,{handleDateChange:o,selectedDate:i})))}}]),r}(n.Component),w=Object(s.b)((function(e){return{selectedDate:e.dateState.selectedDate,storeData:e.storeState.storeData,errorState:{isError:e.errorState.isError,error:e.errorState.error}}}),(function(e){return{onDateChange:function(t){return e(function(e){return{type:"CHANGE_DATEPICKER",payload:e}}(t))},onError:function(t,r){return e(function(e,t){return{type:"HAS_ERROR",payload:{error:e,info:t}}}(t,r))},getStores:function(){return e(function(e){var t=e.url,r=void 0===t?"":t,n=e.body;return{type:"API",payload:{url:r,body:void 0===n?"":n,onSuccess:e.onSuccess,onFailure:e.onFailure}}}({url:"/sql/v1/dateList",body:"SELECT * FROM dateList limit 100",onSuccess:S,onFailure:b,label:"GET_STORES"}))}}}))(T),D=r(23),R=r(46),j=r(47),A=r(38),C=r.n(A),_=r(48);function N(){}function k(e,t,r,n,a){return r=r||{},new Promise((function(o,i){var s=new XMLHttpRequest;if(n?s.open(e,t,n):s.open(e,t),H(s,t,r),function(e,t){t.contentType?"multipart"!==t.contentType&&e.setRequestHeader("Content-Type",t.contentType):e.setRequestHeader("Content-Type","application/json")}(s,r),function(e,t){t.responseType&&(e.responseType=t.responseType)}(s,r),s.onload=function(){var e;if(I(s.status)){!["csv","excel"].includes(r.format)&&s.response||o(s.response),"blob"===r.responseType&&o(new Blob([s.response],{type:s.getResponseHeader("content-type")}));var t=s.response;try{e=JSON.parse(t)}catch(n){return void i(Error("Invalid JSON response"))}o(e)}else i(Error(s.statusText))},s.onerror=function(){i(Error("Network Error"))},a)if(r.contentType&&"application/json"!==r.contentType)s.send(a);else{var c=JSON.stringify(a);s.send(c)}else s.send()}))}function I(e){return e>=200&&e<300}function P(e){var t=e.match("^https?://([^/]+[.])?(domo|domotech|domorig).(com|io)?(/.*)?$"),r=e.match("(.*).(domoapps).(.*)");return!!t&&!r}function x(){var e=window.location.search.substr(1),t={};return e.split("&").forEach((function(e){var r=e.split("=");t[r[0]]=decodeURIComponent(r[1])})),t}function H(e,t,r){if(-1!==t.indexOf("data/v1")){e.setRequestHeader("Accept",r.format&&{"array-of-arrays":"application/json",csv:"text/csv",excel:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}[r.format]||"application/array-of-objects")}}N.post=function(e,t,r){return k("POST",e,r,!0,t)},N.put=function(e,t,r){return k("PUT",e,r,!0,t)},N.get=function(e,t){return k("GET",e,t)},N.delete=function(e,t){return k("DELETE",e,t)},N.getAll=function(e,t){return Promise.all(e.map((function(e){return N.get(e,t)})))},N.onDataUpdate=function(e){window.addEventListener("message",(function(t){if(P(t.origin)&&"string"===typeof t.data&&t.data.length>0)try{var r=JSON.parse(t.data);if(!r.hasOwnProperty("alias"))return;var n=r.alias,a=JSON.stringify({event:"ack",alias:n});t.source.postMessage(a,t.origin),e(n)}catch(o){console.warn("There was an error in Domo.onDataUpdate! It may be that our event listener caught a message from another source and tried to parse it, so your update still may have worked. If you would like more info, here is the error: \n",o)}}))},N.navigate=function(e,t){var r=JSON.stringify({event:"navigate",url:e,isNewWindow:t});window.parent.postMessage(r,"*")},N.filterContainer=function(e,t,r,n){var a=window.navigator.userAgent.toLowerCase(),o=/safari/.test(a),i=/iphone|ipod|ipad/.test(a),s=JSON.stringify({event:"filter",filter:{columnName:e,operator:t,values:r,dataType:n}});i&&!o?window.webkit.messageHandlers.domofilter.postMessage({column:e,operand:t,values:r,dataType:n}):window.parent.postMessage(s,"*")},N.env=x(),N.__util={isVerifiedOrigin:P,getQueryParams:x,setFormatHeaders:H,isSuccess:I};var L=function(e){var t=e.dispatch;return function(e){return function(){var r=Object(_.a)(C.a.mark((function r(n){var a,o,i,s,c,u,l;return C.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e(n),"API"===n.type){r.next=3;break}return r.abrupt("return");case 3:return a=n.payload,o=a.url,i=a.body,s=a.onSuccess,c=a.onFailure,(u=a.label)&&t(h(u)),r.next=7,N.post(o,i,{contentType:"text/plain"});case 7:l=r.sent,console.log("my middleware",l);try{t(s(l))}catch(p){t(c(p)),t(E(p))}finally{u&&t(g(u))}case 10:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()}},M={selectedDate:new Date},J={storeData:[],isLoadingData:!1},F={error:"",isError:!1},G=Object(j.createLogger)(),q=Object(D.c)({dateState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"CHANGE_DATEPICKER":return Object.assign({},e,{selectedDate:t.payload});default:return e}},storeState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"SET_STORES":return Object.assign({},e,{storeData:t.payload});case"API_START":if("GET_STORES"===t.payload)return Object.assign({},e,{isLoadingData:!0});break;case"API_END":if("GET_STORES"===t.payload)return Object.assign({},e,{isLoadingData:!1});break;default:return e}},errorState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"HAS_ERROR":return Object.assign({},e,{error:t.payload,isError:!0});default:return e}}}),U=Object(D.d)(q,Object(D.a)(R.a,G,L));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(s.a,{store:U},a.a.createElement(w,null))),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.8045b671.chunk.js.map
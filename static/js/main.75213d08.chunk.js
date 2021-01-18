(this["webpackJsonptask-timer"]=this["webpackJsonptask-timer"]||[]).push([[0],{116:function(t,e,n){},121:function(t,e,n){"use strict";n.r(e);var i=n(2),s=n(0),a=n.n(s),r=n(14),c=n.n(r),o=(n(116),n(9)),u=n(8),l=n(20),d=n(13),h=n(16),b=n(173),j=n(5),m=n(166),f=n(167),p=n(157),x=n(64),O=n(151),v=n(94),g=n(175),y=n(152),k=n(153),w=n(154),S=n(155),C=n(156),N=n(176),_=n(158),I=n(171),D=n(124),M=n(78),E=n.n(M),T=function(){function t(){Object(o.a)(this,t),this.subscribers=new Map}return Object(u.a)(t,[{key:"subscribe",value:function(t,e){this.subscribers.set(t,e)}},{key:"unsubscribe",value:function(t){this.subscribers.delete(t)}},{key:"updateSubscribers",value:function(){this.subscribers.forEach((function(t,e,n){t()}))}}]),t}(),P=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){var t;return Object(o.a)(this,n),(t=e.call(this))._desktopNotificationSupport=!1,t._desktopNotificationSupport="Notification"in window,t}return Object(u.a)(n,null,[{key:"instance",get:function(){return this._instance||(this._instance=new this)}}]),Object(u.a)(n,[{key:"requestDesktopNotificationPermissions",value:function(){var t=this;this.desktopNotificationSupport&&"default"===Notification.permission&&Notification.requestPermission().then((function(e){t.updateSubscribers()}))}},{key:"showNotification",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t,e){t.close(),window.focus()},i=new Notification(t,e);i.onclick=function(t){return n(i,t)}}},{key:"desktopNotificationSupport",get:function(){return this._desktopNotificationSupport}},{key:"desktopNotificationEnabled",get:function(){return this.desktopNotificationSupport&&"granted"===Notification.permission}}]),n}(T);P._instance=void 0;var L,R,W=n(172),B=n(149),J=n(123),H=n(150),K=Object(j.a)((function(t){return Object(b.a)({modal:{display:"flex",alignItems:"center",justifyContent:"center",padding:8,border:"none"}})}))((R=L=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var t=this.props.classes;return Object(i.jsx)(W.a,{open:this.props.open,onClose:this.props.onClose,closeAfterTransition:!0,className:t.modal,BackdropComponent:B.a,BackdropProps:{timeout:500},children:Object(i.jsx)(J.a,{in:this.props.open,children:Object(i.jsx)(H.a,{className:t.modal,children:Object(i.jsxs)(O.a,{container:!0,direction:"column",alignItems:"center",alignContent:"center",children:[Object(i.jsx)(O.a,{item:!0,xs:!0,children:Object(i.jsx)(x.a,{variant:"h4",children:this.props.title})}),Object(i.jsxs)(O.a,{item:!0,xs:!0,children:[Object(i.jsx)(x.a,{variant:"subtitle1",children:this.props.subtitle}),Object(i.jsx)("br",{})]}),Object(i.jsx)(D.a,{color:"secondary",variant:"contained",onClick:this.props.onConfirm,children:Object(i.jsx)(O.a,{item:!0,xs:!0,children:this.props.buttonText})})]})})})})}}]),n}(s.Component),L.defaultProps={title:"Are you sure?",subtitle:"This action cannot be undone",buttonText:"Continue"},R)),F=n(23),G=n(45),z=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(o.a)(this,n),(i=e.call(this)).timeout=void 0,i._startTime=void 0,i._endTime=void 0,i._running=!1,i._paused=!1,i._name="NEW",i._min=1,i._max=90,i._value=0,i._intervalMs=1e3,i._startTime=t.startTime,i._endTime=t.endTime,i._running=!0===t.running,i._paused=!0===t.paused,i._name=t.name?t.name:"NEW",i._min=t.min?t.min:1,i._max=t.max?t.max:90,i._value=t.value?t.value:i._min,i._intervalMs=t.intervalMs?t.intervalMs:1e3,i}return Object(u.a)(n,[{key:"toJSON",value:function(){return{startTime:this.startTime,endTime:this.endTime,running:this.running,paused:this.paused,name:this.name,min:this.min,max:this.max,value:this.value,intervalMs:this.intervalMs}}},{key:"start",value:function(){this._running=!0,this._startTime=Date.now(),this._endTime=this._startTime+60*this.value*1e3,this.update()}},{key:"stop",value:function(){this._running=!1,this._paused=!1,this.update()}},{key:"pause",value:function(){this.running&&(this._paused=!this._paused,this.paused||(this._endTime=Date.now()+1e3*this.secondsLeft),this.update())}},{key:"update",value:function(){var t=this;void 0===this.endTime||this.paused||(this.secondsLeft>0?this.timeout=setTimeout((function(){return t.update()}),this.intervalMs):(this._running=!1,this._endTime=Date.now(),clearTimeout(this.timeout))),this.updateSubscribers()}},{key:"name",get:function(){return this._name},set:function(t){this._name=t,this.updateSubscribers()}},{key:"running",get:function(){return this._running}},{key:"paused",get:function(){return this._paused}},{key:"value",get:function(){return this._value},set:function(t){this._value=t,this.updateSubscribers()}},{key:"min",get:function(){return this._min?this._min:1},set:function(t){this._min=t,this.updateSubscribers()}},{key:"max",get:function(){return this._max?this._max:90},set:function(t){this._max=t,this.updateSubscribers()}},{key:"intervalMs",get:function(){return this._intervalMs?this._intervalMs:1e3}},{key:"startTime",get:function(){return this._startTime}},{key:"endTime",get:function(){return this._endTime}},{key:"secondsLeft",get:function(){return this.running&&this.endTime?Math.floor((this.endTime-Date.now())/1e3):0}}]),n}(T),q=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;if(Object(o.a)(this,n),(i=e.call(this))._items=[],i._currentIndex=0,null===t||void 0===t?void 0:t.items){var s,a=Object(G.a)(t.items);try{for(a.s();!(s=a.n()).done;){var r=s.value;i.addItem(r)}}catch(c){a.e(c)}finally{a.f()}}return(null===t||void 0===t?void 0:t.currentIndex)&&(i._currentIndex=t.currentIndex),i._currentIndex>i.items.length-1&&(i._currentIndex=0),i}return Object(u.a)(n,[{key:"advance",value:function(){this._currentIndex=this.nextIndex,this.updateSubscribers()}},{key:"toJSON",value:function(){return{items:this.items,currentIndex:this.currentIndex}}},{key:"addItem",value:function(t){var e=this;if(null!==t){var n=new z(t);n.subscribe(this.constructor.name,(function(){e.updateSubscribers()})),this.items.push(n)}this.updateSubscribers()}},{key:"deleteItem",value:function(t){delete this.items[t],this.updateSubscribers()}},{key:"swapItems",value:function(t,e){var n,i;if(t<e)n=t,i=e;else{if(!(e<t))throw new RangeError("Cannot swap an element with itself");n=e,i=t}this.currentIndex===n?this._currentIndex=i:this.currentIndex===i&&(this._currentIndex=n),this._items=[].concat(Object(F.a)(this.items.slice(0,n)),[this.items[i],this.items[n]],Object(F.a)(this.items.slice(i+1))),this.updateSubscribers()}},{key:"getItem",value:function(t){return this.items[t]}},{key:"items",get:function(){return this._items}},{key:"currentIndex",get:function(){return this._currentIndex}},{key:"current",get:function(){return this.items[this.currentIndex]}},{key:"nextIndex",get:function(){return(this.currentIndex+1)%this.items.length}},{key:"next",get:function(){return this.items[this.nextIndex]}},{key:"runningCountdown",get:function(){return this.items.filter((function(t){return t.running}))[0]}}]),n}(T),U={items:[{name:"Work",min:1,max:90,value:50},{name:"Break time",min:1,max:15,value:10}]},A=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){var t;return Object(o.a)(this,n),(t=e.call(this))._countdowns=new q,t.load(),t}return Object(u.a)(n,[{key:"countdowns",get:function(){return this._countdowns}},{key:"items",get:function(){return this.countdowns.items}}],[{key:"instance",get:function(){return this._instance||(this._instance=new this)}}]),Object(u.a)(n,[{key:"load",value:function(){var t=this,e=localStorage.getItem(this.constructor.name);if(e)this._countdowns=new q(JSON.parse(e));else{var n=localStorage.getItem("countdowns"),i=localStorage.getItem("currentCountdown");n&&(this._countdowns=new q({items:JSON.parse(n),currentIndex:i?parseInt(i):0}))}this._countdowns.subscribe(this.constructor.name,(function(){t.save()})),console.log("CountdownService.load() saving",this.countdowns),this.save()}},{key:"save",value:function(){localStorage.setItem(this.constructor.name,JSON.stringify(this.countdowns)),this.updateSubscribers()}},{key:"reset",value:function(){this._countdowns=new q(U),this.save()}}]),n}(T);A._instance=void 0;var V=function(){function t(e){var n=e.name,i=e.start,s=e.end;Object(o.a)(this,t),this.name=void 0,this.start=void 0,this.end=void 0,this.name=n,this.start=i,this.end=s}return Object(u.a)(t,[{key:"durationMs",get:function(){return this.end-this.start}}]),t}(),Y=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;if(Object(o.a)(this,n),(i=e.call(this)).items=[],null===t||void 0===t?void 0:t.items){var s,a=Object(G.a)(t.items);try{for(a.s();!(s=a.n()).done;){var r=s.value;i.addItem(r)}}catch(c){a.e(c)}finally{a.f()}}return i}return Object(u.a)(n,[{key:"toJSON",value:function(){return{items:this.items}}},{key:"addItem",value:function(t){this.items.push(new V(t)),this.updateSubscribers()}},{key:"today",get:function(){var t=new Date(Date.now());return this.items.filter((function(e){var n=new Date(e.start);return n.getFullYear()===t.getFullYear()&&n.getMonth()===t.getMonth()&&n.getDay()===t.getDay()}))}}]),n}(T),Q=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){var t;Object(o.a)(this,n),(t=e.call(this))._history=void 0;var i=localStorage.getItem("history");return t._history=i?new Y(JSON.parse(i)):new Y,t}return Object(u.a)(n,[{key:"history",get:function(){return this._history}},{key:"items",get:function(){return this.history.items}}],[{key:"instance",get:function(){return this._instance||(this._instance=new this)}}]),Object(u.a)(n,[{key:"save",value:function(){localStorage.setItem("history",JSON.stringify(this.history)),this.updateSubscribers()}},{key:"addItem",value:function(t){this._history.addItem(t),this.save()}},{key:"clear",value:function(){this._history=new Y,this.save()}}]),n}(T);Q._instance=void 0;var X,Z,$=P.instance,tt=Object(j.a)((function(t){return Object(b.a)({sideBar:{width:250},footer:{top:"auto",bottom:0,width:"100%",padding:8},footerButton:{width:"100%"}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(o.a)(this,n),(i=e.call(this,t)).state={notificationsEnabled:$.desktopNotificationEnabled,confirmResetOpen:!1,confirmClearHistoryOpen:!1},i}return Object(u.a)(n,[{key:"refreshNotificationState",value:function(){this.state.notificationsEnabled!==$.desktopNotificationEnabled&&this.setState({notificationsEnabled:$.desktopNotificationEnabled})}},{key:"componentDidUpdate",value:function(){this.refreshNotificationState()}},{key:"componentDidMount",value:function(){var t=this;$.subscribe(this.constructor.name,(function(){t.refreshNotificationState()}))}},{key:"componentWillUnmount",value:function(){$.unsubscribe(this.constructor.name)}},{key:"render",value:function(){var t=this,e=this.props.classes;return Object(i.jsxs)(g.a,{anchor:"left",open:this.props.open,onClose:function(){return t.props.onClose()},children:[Object(i.jsx)(K,{open:this.state.confirmResetOpen,onClose:function(){t.setState({confirmResetOpen:!1}),t.props.onClose()},onConfirm:function(){A.instance.reset(),t.setState({confirmResetOpen:!1}),t.props.onClose()},subtitle:"Resetting your countdowns cannot be undone"}),Object(i.jsx)(K,{open:this.state.confirmClearHistoryOpen,onClose:function(){t.setState({confirmClearHistoryOpen:!1}),t.props.onClose()},onConfirm:function(){Q.instance.clear(),t.setState({confirmClearHistoryOpen:!1}),t.props.onClose()},subtitle:"Clearing history cannot be undone"}),Object(i.jsx)("div",{className:e.sideBar,children:Object(i.jsxs)(y.a,{children:[Object(i.jsxs)(k.a,{button:!0,onClick:function(){$.requestDesktopNotificationPermissions()},children:[Object(i.jsx)(w.a,{children:Object(i.jsx)(E.a,{})}),Object(i.jsx)(S.a,{primary:"Notifications"}),Object(i.jsx)(C.a,{children:Object(i.jsx)(N.a,{edge:"end",onClick:function(){$.requestDesktopNotificationPermissions()},checked:this.state.notificationsEnabled,inputProps:{"aria-labelledby":"switch-list-label-bluetooth"},onFocus:function(){return t.refreshNotificationState()},onBlur:function(){return t.refreshNotificationState()},disabled:!$.desktopNotificationSupport})})]}),Object(i.jsx)(_.a,{}),Object(i.jsx)(k.a,{button:!0,onClick:function(){t.setState({confirmClearHistoryOpen:!0})},children:Object(i.jsx)(S.a,{primary:"Clear history"})}),Object(i.jsx)(k.a,{button:!0,onClick:function(){t.setState({confirmResetOpen:!0})},children:Object(i.jsx)(S.a,{primary:"Reset to defaults"})})]})}),Object(i.jsx)(I.a,{position:"fixed",className:e.footer,children:Object(i.jsx)(D.a,{children:Object(i.jsxs)(x.a,{variant:"caption",children:["Version ","1.0.0"," (what's new)"]})})})]})}}]),n}(s.Component)),et=n(91),nt=n.n(et),it=n(92),st=n(21),at=n(170),rt=n(159),ct=n(160),ot=n(161),ut=n(162),lt=n(163),dt=n(164),ht=function(){function t(){Object(o.a)(this,t)}return Object(u.a)(t,null,[{key:"seconds",value:function(t){var e=Math.floor(t/60/60),n=Math.floor((t-60*e*60)/60),i=Math.floor(t-60*e*60-60*n),s=[];return e>0&&s.push("".concat(e,"h")),n>0&&s.push("".concat(n,"m")),s.push("".concat(i,"s")),s.join(" ")}},{key:"minutes",value:function(t){var e=Math.floor(t/60),n=t-60*e,i=[];return e>0&&i.push("".concat(e,"h")),i.push("".concat(n,"m")),i.join(" ")}}]),t}(),bt=Object(j.a)((function(t){return Object(b.a)({})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(i.jsxs)(I.a,{flexDirection:"column",flex:2,display:"flex",alignItems:"center",children:[Object(i.jsx)(I.a,{display:"flex",children:Object(i.jsx)(x.a,{variant:"caption",children:this.props.caption})}),Object(i.jsx)(I.a,{display:"flex",children:Object(i.jsx)(x.a,{variant:"subtitle1",children:this.props.text})})]})}}]),n}(s.Component)),jt=Object(j.a)((function(t){return Object(b.a)({table:{minWidth:650},totalsGrid:{flexGrow:1,padding:8}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(o.a)(this,n),(i=e.call(this,t)).state={history:Q.instance.history},i}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;Q.instance.subscribe(this.constructor.name,(function(){t.setState({history:Q.instance.history})}))}},{key:"componentWillUnmount",value:function(){Q.instance.unsubscribe(this.constructor.name)}},{key:"render",value:function(){var t,e=this,n=this.props.classes,s={},a=Object(G.a)(this.state.history.today.map((function(t){return t.name})).sort());try{var r=function(){var n=t.value;n in s||(s[n]=e.state.history.today.filter((function(t){return t.name===n})).map((function(t){return t.durationMs})).reduce((function(t,e){return t+e})))};for(a.s();!(t=a.n()).done;)r()}catch(c){a.e(c)}finally{a.f()}return Object(i.jsxs)(O.a,{container:!0,spacing:2,className:n.totalsGrid,children:[Object(i.jsx)(O.a,{item:!0,xs:2,children:Object(i.jsx)(I.a,{flexDirection:"column",display:"flex",alignItems:"center",justifyContent:"center",height:"100%",children:Object(i.jsx)(x.a,{variant:"h5",children:"Totals"})})}),Object.keys(s).map((function(t){return Object(i.jsx)(O.a,{item:!0,xs:2,children:Object(i.jsx)(v.a,{children:Object(i.jsx)(bt,{caption:t,text:"".concat(ht.seconds(s[t]/1e3))})})})})),Object(i.jsx)(O.a,{item:!0,xs:12,children:Object(i.jsx)(rt.a,{children:Object(i.jsxs)(ct.a,{className:n.table,size:"small","aria-label":"a dense table",children:[Object(i.jsx)(ot.a,{children:Object(i.jsxs)(ut.a,{children:[Object(i.jsx)(lt.a,{children:"Task Name"}),Object(i.jsx)(lt.a,{align:"right",children:"Duration"}),Object(i.jsx)(lt.a,{align:"right",children:"Start"}),Object(i.jsx)(lt.a,{align:"right",children:"End"})]})}),Object(i.jsx)(dt.a,{children:this.state.history.today.map((function(t){var e=new Date(t.start),n=new Date(t.end);return Object(i.jsxs)(ut.a,{children:[Object(i.jsx)(lt.a,{component:"th",scope:"row",children:t.name}),Object(i.jsx)(lt.a,{align:"right",children:ht.seconds(t.durationMs/1e3)}),Object(i.jsx)(lt.a,{align:"right",children:"".concat(e.getHours(),":").concat(e.getMinutes(),":").concat(e.getSeconds())}),Object(i.jsx)(lt.a,{align:"right",children:"".concat(n.getHours(),":").concat(n.getMinutes(),":").concat(n.getSeconds())})]},t.name+t.start)}))})]})})})]})}}]),n}(s.Component)),mt=n(165),ft=n(83),pt=n.n(ft),xt=n(82),Ot=n.n(xt),vt=n(84),gt=n.n(vt),yt=n(86),kt=n.n(yt),wt=n(85),St=n.n(wt),Ct=n(90),Nt=n.n(Ct),_t=n(88),It=n.n(_t),Dt=n(87),Mt=n.n(Dt),Et=n(89),Tt=n.n(Et),Pt=n(177),Lt=n(178),Rt=n(168),Wt=n(79),Bt=n.n(Wt),Jt=n(81),Ht=n.n(Jt),Kt=n(80),Ft=n.n(Kt),Gt=Object(j.a)((function(t){return Object(b.a)({fullWidth:{width:"100%"},centeringGrid:{display:"flex"},listItemText:{display:"block"},sliderSpacing:{width:"100%",justifyContent:"center",verticalAlign:"middle"},sliderLabelContainer:{marginBottom:-16},sliderLabel:{paddingRight:10},editPopover:{padding:8},editContainer:{paddingRight:8}})}))((Z=X=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(o.a)(this,n),(i=e.call(this,t)).popoverRef=void 0,i.state={value:i.props.value,label:i.props.label,editLabel:i.props.label,min:i.props.min,editMin:i.props.min,max:i.props.max,editMax:i.props.max,step:i.props.step,menuOpen:!1,editing:i.props.editing,labelError:!1,minError:!1,maxError:!1},i.popoverRef=a.a.createRef(),i.handleOnChange=i.handleOnChange.bind(Object(l.a)(i)),i.handleKeyPress=i.handleKeyPress.bind(Object(l.a)(i)),i.openPopover=i.openPopover.bind(Object(l.a)(i)),i.closePopover=i.closePopover.bind(Object(l.a)(i)),i.saveForm=i.saveForm.bind(Object(l.a)(i)),i.cancelEdit=i.cancelEdit.bind(Object(l.a)(i)),i}return Object(u.a)(n,[{key:"getMinError",value:function(t,e){return isNaN(t)||t<1||t>e}},{key:"getMaxError",value:function(t,e){return isNaN(e)||e<1||e<t}},{key:"handleOnChange",value:function(t,e){"number"===typeof e?(this.setState({value:e}),this.props.onChange(e)):"object"===typeof e&&(this.setState({value:e[0]}),this.props.onChange(e[0]))}},{key:"handleKeyPress",value:function(t){"Enter"===t.key&&this.saveForm()}},{key:"openPopover",value:function(){this.setState({editing:!0,editLabel:this.state.label,editMin:this.state.min,editMax:this.state.max})}},{key:"closePopover",value:function(){this.setState({editing:!1})}},{key:"saveForm",value:function(){var t;this.state.labelError||this.state.minError||this.state.maxError||(t=this.state.value>this.state.editMax?this.state.editMax:this.state.value<this.state.editMin?this.state.editMin:this.state.value,this.props.onEditSave(this.state.editLabel,this.state.editMin,this.state.editMax),this.setState({value:t,label:this.state.editLabel,min:this.state.editMin,max:this.state.editMax}),this.closePopover())}},{key:"cancelEdit",value:function(){this.setState({labelError:!1,minError:!1,maxError:!1}),this.closePopover()}},{key:"renderNormalView",value:function(){var t=this,e=this.props.classes;return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)(I.a,{display:"flex",flexDirection:"row",flex:"100%",alignItems:"baseline",className:e.sliderLabelContainer,children:[Object(i.jsx)(x.a,{variant:"subtitle1",className:e.sliderLabel,children:this.state.label}),Object(i.jsxs)(x.a,{variant:"caption",className:e.sliderLabel,children:["(",this.props.formatCallback(this.state.value),")"]})]}),Object(i.jsxs)(I.a,{display:"flex",flex:1,flexDirection:"row",children:[Object(i.jsx)(I.a,{m:1,flex:"100%",display:"flex",justifyContent:"flex-start",alignItems:"center",children:Object(i.jsx)(Pt.a,{value:this.state.value,step:this.state.step,min:this.state.min,max:this.state.max,onChange:this.handleOnChange,getAriaValueText:function(t){return"".concat(t,"m")},valueLabelDisplay:"off","aria-labelledby":"break-length"})}),Object(i.jsx)(I.a,{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center",children:Object(i.jsx)(p.a,{onClick:function(e){t.openPopover()},children:Object(i.jsx)(Bt.a,{})})})]})]})}},{key:"renderEditPopover",value:function(){var t=this,e=this.props.classes;return Object(i.jsx)(Lt.a,{open:this.state.editing,anchorEl:this.popoverRef.current,anchorOrigin:{vertical:"center",horizontal:"left"},transformOrigin:{vertical:"center",horizontal:"left"},onClose:this.cancelEdit,onEscapeKeyDown:this.cancelEdit,children:Object(i.jsxs)(I.a,{display:"flex",flex:1,flexDirection:"row",className:e.editPopover,children:[Object(i.jsxs)(O.a,{container:!0,children:[Object(i.jsx)(O.a,{item:!0,xs:6,className:e.editContainer,children:Object(i.jsx)(Rt.a,{fullWidth:!0,label:"Name",error:this.state.labelError,value:this.state.editLabel,margin:"dense",size:"small",variant:"outlined",onChange:function(e){t.setState({editLabel:e.target.value,labelError:""===e.target.value})},onKeyPress:this.handleKeyPress})}),Object(i.jsx)(O.a,{item:!0,xs:3,className:e.editContainer,children:Object(i.jsx)(Rt.a,{label:"Min",error:this.state.minError,value:this.state.editMin,size:"small",variant:"outlined",margin:"dense",onChange:function(e){var n=parseInt(e.target.value);t.setState({editMin:n||0,minError:t.getMinError(n,t.state.max),maxError:t.getMaxError(n,t.state.max)})},onKeyPress:this.handleKeyPress})}),Object(i.jsx)(O.a,{item:!0,xs:3,className:e.editContainer,children:Object(i.jsx)(Rt.a,{label:"Max",error:this.state.maxError,value:this.state.editMax,size:"small",variant:"outlined",margin:"dense",onChange:function(e){var n=parseInt(e.target.value);t.setState({editMax:n||0,minError:t.getMinError(t.state.min,n),maxError:t.getMaxError(t.state.min,n)})},onKeyPress:this.handleKeyPress})})]}),Object(i.jsxs)(I.a,{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center",children:[Object(i.jsx)(p.a,{onClick:this.saveForm,children:Object(i.jsx)(Ft.a,{color:"primary"})}),Object(i.jsx)(p.a,{onClick:this.cancelEdit,children:Object(i.jsx)(Ht.a,{color:"secondary"})})]})]})})}},{key:"render",value:function(){return Object(i.jsxs)("div",{ref:this.popoverRef,children:[" ",Object(i.jsxs)(I.a,{display:"flex",flexDirection:"column",children:[this.renderNormalView(),this.renderEditPopover()]})]})}}]),n}(s.Component),X.defaultProps={editing:!1},Z)),zt=Object(j.a)((function(t){return Object(b.a)({popperCardStyle:{paddingLeft:t.spacing(1),backgroundColor:t.palette.grey[50],margin:8,height:"100%"},fillWidth:{width:"100%"}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i,s,a,r;(Object(o.a)(this,n),(a=e.call(this,t)).notificationService=void 0,console.log(A.instance.countdowns),a.state={countdowns:A.instance.countdowns,editingOrder:!1,confirmDeleteOpen:!1,confirmDeleteIndex:0,confirmDeleteName:"",running:null===(i=A.instance.countdowns.current)||void 0===i?void 0:i.running,paused:!1,warningNotificationSent:!1},null===(s=A.instance.countdowns.current)||void 0===s?void 0:s.running)&&(null===(r=A.instance.countdowns.runningCountdown)||void 0===r||r.update());return a.notificationService=P.instance,a.handleStartStopOnClick=a.handleStartStopOnClick.bind(Object(l.a)(a)),a.countdownSubscriber=a.countdownSubscriber.bind(Object(l.a)(a)),a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t,e=this;(A.instance.subscribe(this.constructor.name,(function(){e.setState({countdowns:A.instance.countdowns})})),this.state.running)&&(null===(t=this.state.countdowns.current)||void 0===t||t.subscribe(this.constructor.name,this.countdownSubscriber))}},{key:"componentWillUnmount",value:function(){A.instance.unsubscribe(this.constructor.name)}},{key:"handleStartStopOnClick",value:function(){this.state.running?this.stop():this.start()}},{key:"start",value:function(){this.setState({running:!0}),this.state.countdowns.current.subscribe(this.constructor.name,this.countdownSubscriber),this.state.countdowns.current.start(),window.document.title="".concat(Ut," [").concat(this.state.countdowns.current.name," ").concat(ht.seconds(this.state.countdowns.current.secondsLeft),"]")}},{key:"stop",value:function(){if(this.setState({running:!1}),this.state.countdowns.current.unsubscribe(this.constructor.name),this.state.countdowns.current.stop(),this.state.countdowns.current.startTime&&this.state.countdowns.current.endTime){var t=Date.now();t>this.state.countdowns.current.endTime&&(t=this.state.countdowns.current.endTime),Q.instance.addItem({name:this.state.countdowns.current.name,start:this.state.countdowns.current.startTime,end:t})}this.setState({warningNotificationSent:!1,paused:!1}),this.state.countdowns.advance(),window.document.title=qt}},{key:"countdownSubscriber",value:function(){this.state.countdowns.current.running?(window.document.title="".concat(Ut," [").concat(this.state.countdowns.current.name," ").concat(ht.seconds(this.state.countdowns.current.secondsLeft),"]"),!this.state.warningNotificationSent&&this.state.countdowns.current.secondsLeft<300&&this.state.countdowns.current.secondsLeft>240&&(this.setState({warningNotificationSent:!0}),this.notificationService.showNotification(qt,{body:"Stopping soon: ".concat(this.state.countdowns.current.name)}))):(this.notificationService.showNotification(qt,{body:"Complete: ".concat(this.state.countdowns.current.name)}),this.stop())}},{key:"renderSliders",value:function(){var t=this,e=this.props.classes,n=[],s=function(s){var a=parseInt(s),r=t.state.countdowns.items[s],c=0===a,o=a===t.state.countdowns.items.length-1;t.state.editingOrder?n.push(Object(i.jsx)(O.a,{item:!0,children:Object(i.jsx)(H.a,{className:e.popperCardStyle,children:Object(i.jsxs)(I.a,{display:"flex",flexDirection:"row",children:[Object(i.jsx)(I.a,{flex:"100%",display:"flex",justifyContent:"left",alignItems:"center",children:Object(i.jsx)(x.a,{variant:"button",children:r.name})}),Object(i.jsxs)(I.a,{flex:1,display:"flex",justifyContent:"right",justifyItems:"right",children:[Object(i.jsx)(p.a,{color:"primary",disabled:c,onClick:function(){t.state.countdowns.swapItems(a,a-1)},children:Object(i.jsx)(Ot.a,{})}),Object(i.jsx)(p.a,{color:"primary",disabled:o,onClick:function(){t.state.countdowns.swapItems(a,a+1)},children:Object(i.jsx)(pt.a,{})}),Object(i.jsx)(p.a,{color:"secondary",onClick:function(){t.setState({confirmDeleteOpen:!0,confirmDeleteIndex:a,confirmDeleteName:r.name})},children:Object(i.jsx)(gt.a,{})})]})]})})},r.name)):n.push(Object(i.jsx)(O.a,{item:!0,children:Object(i.jsx)(Gt,{label:r.name,labelSuffix:"m",value:r.value,step:1,min:r.min,max:r.max,onChange:function(t){r.value=t},onEditSave:function(t,e,n){r.name=t,r.min=e,r.max=n},formatCallback:function(t){return ht.minutes(t)}})},r.name))};for(var a in this.state.countdowns.items)s(a);return n}},{key:"render",value:function(){var t,e,n,s=this,a=this.props.classes;return Object(i.jsxs)(O.a,{container:!0,children:[Object(i.jsx)(K,{open:this.state.confirmDeleteOpen,onClose:function(){s.setState({confirmDeleteOpen:!1})},onConfirm:function(){s.state.countdowns.deleteItem(s.state.confirmDeleteIndex),s.setState({confirmDeleteOpen:!1})},subtitle:"Deleting this cannot be undone"}),Object(i.jsx)(O.a,{item:!0,xs:12,children:Object(i.jsxs)(I.a,{display:"flex",flexDirection:"row",children:[Object(i.jsx)(I.a,{flex:"100%",children:Object(i.jsx)(x.a,{variant:"h3",children:" Timers "})}),Object(i.jsx)(I.a,{flex:1,children:Object(i.jsx)(p.a,{disabled:this.state.editingOrder,onClick:function(){s.state.countdowns.addItem({name:"NEW ".concat(s.state.countdowns.items.length)})},children:Object(i.jsx)(St.a,{color:this.state.editingOrder?"disabled":"primary"})})}),Object(i.jsx)(I.a,{flex:1,children:Object(i.jsx)(p.a,{onClick:function(){s.setState({editingOrder:!s.state.editingOrder})},children:Object(i.jsx)(kt.a,{color:this.state.editingOrder?"primary":"action"})})})]})}),Object(i.jsx)(O.a,{item:!0,xs:12,children:this.renderSliders()}),Object(i.jsx)(O.a,{item:!0,xs:12,sm:3,children:Object(i.jsxs)(mt.a,{className:a.fillWidth,variant:"contained",color:this.state.running?this.state.paused?"default":"secondary":"primary",children:[Object(i.jsx)(D.a,{className:a.fillWidth,onClick:this.handleStartStopOnClick,children:this.state.running?Object(i.jsx)(Mt.a,{}):Object(i.jsx)(It.a,{})}),Object(i.jsx)(D.a,{className:a.fillWidth,disabled:!this.state.running,onClick:function(){s.state.running&&(s.state.countdowns.current.pause(),s.setState({paused:!s.state.paused}))},children:this.state.paused?Object(i.jsx)(Tt.a,{}):Object(i.jsx)(Nt.a,{})})]})}),Object(i.jsx)(O.a,{item:!0,xs:4,sm:3,children:Object(i.jsx)(bt,{caption:this.state.running?this.state.paused?"Paused":"Running":"On deck",text:(null===(t=this.state.countdowns.current)||void 0===t?void 0:t.name)||"NONE"})}),Object(i.jsx)(O.a,{item:!0,xs:4,sm:3,children:Object(i.jsx)(bt,{caption:"Time left",text:ht.seconds(null===(e=this.state.countdowns.current)||void 0===e?void 0:e.secondsLeft)})}),Object(i.jsx)(O.a,{item:!0,xs:4,sm:3,children:Object(i.jsx)(bt,{caption:"Up next",text:(null===(n=this.state.countdowns.next)||void 0===n?void 0:n.name)||"NONE"})})]})}}]),n}(s.Component)),qt="Task Timer",Ut="TT",At=P.instance,Vt=Object(j.a)((function(t){return Object(b.a)({root:{flexGrow:1,overflow:"hidden"},fillWidth:{width:"100%"},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1},gridContainer:{flexGrow:1,padding:8},paperContainer:{padding:8},sliderBox:{paddingTop:16},popperCardStyle:{paddingLeft:t.spacing(1),backgroundColor:t.palette.grey[50],margin:8,height:"100%"},popperContentsStyle:{marginRight:8},modal:{display:"flex",alignItems:"center",justifyContent:"center",padding:8,border:"none"},statusStyle:{marginTop:-.5,marginBottom:-1}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;Object(o.a)(this,n),(i=e.call(this,t)).sliderRefs=[];var s=localStorage.getItem("selectedDate");return i.state={workLength:50,breakLength:10,running:!1,paused:!1,secondsLeft:0,sidebarOpen:!1,notificationSupport:"Notification"in window,editingOrder:!1,confirmDeleteOpen:!1,confirmDeleteIndex:0,confirmDeleteName:"",confirmResetOpen:!1,warningNotificationSent:!1,selectedDate:s?new Date(JSON.parse(s)):new Date(0,0,0,12,0,10)},i.checkSchedule=i.checkSchedule.bind(Object(l.a)(i)),i}return Object(u.a)(n,[{key:"componentDidMount",value:function(){At.requestDesktopNotificationPermissions(),this.checkSchedule()}},{key:"checkSchedule",value:function(){var t=this,e=new Date;e.getHours()===this.state.selectedDate.getHours()&&e.getMinutes()===this.state.selectedDate.getMinutes()&&At.showNotification(qt,{body:"It's lunchtime!"}),setTimeout((function(){return t.checkSchedule()}),5e4)}},{key:"render",value:function(){var t=this,e=this.props.classes;return Object(i.jsxs)("div",{className:e.root,children:[Object(i.jsx)(m.a,{position:"static",children:Object(i.jsxs)(f.a,{children:[Object(i.jsx)(p.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",onClick:function(){t.setState({sidebarOpen:!0})},children:Object(i.jsx)(nt.a,{})}),Object(i.jsx)(x.a,{variant:"h6",className:e.title,children:qt})]})}),Object(i.jsx)(tt,{open:this.state.sidebarOpen,onClose:function(){t.setState({sidebarOpen:!1})}}),Object(i.jsxs)(O.a,{container:!0,className:e.gridContainer,spacing:2,children:[Object(i.jsx)(O.a,{item:!0,xs:12,md:8,children:Object(i.jsx)(v.a,{className:e.paperContainer,children:Object(i.jsx)(zt,{})})}),Object(i.jsx)(O.a,{item:!0,xs:12,md:4,children:Object(i.jsx)(v.a,{className:e.paperContainer,children:Object(i.jsxs)(O.a,{container:!0,children:[Object(i.jsx)(O.a,{item:!0,xs:12,children:Object(i.jsx)(x.a,{variant:"h3",children:"Schedule"})}),Object(i.jsx)(O.a,{item:!0,xs:12,children:Object(i.jsx)(st.a,{utils:it.a,children:Object(i.jsx)(at.a,{id:"lunch-time-picker",label:"Lunch",value:this.state.selectedDate,onChange:function(e){t.setState({selectedDate:e}),localStorage.setItem("selectedDate",JSON.stringify(e))},minutesStep:5})})})]})})}),Object(i.jsx)(O.a,{item:!0,xs:12,md:4,children:Object(i.jsx)(v.a,{className:e.paperContainer,children:Object(i.jsxs)(O.a,{container:!0,children:[Object(i.jsx)(O.a,{item:!0,xs:12,children:Object(i.jsx)(x.a,{variant:"h3",children:"History"})}),Object(i.jsx)(O.a,{item:!0,xs:12,children:Object(i.jsx)(jt,{})})]})})})]})]})}}]),n}(s.Component));c.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(Vt,{})}),document.getElementById("root"))}},[[121,1,2]]]);
//# sourceMappingURL=main.75213d08.chunk.js.map
(this["webpackJsonptask-timer"]=this["webpackJsonptask-timer"]||[]).push([[0],{117:function(t,e,n){},122:function(t,e,n){"use strict";n.r(e);var i=n(2),s=n(0),a=n.n(s),r=n(15),o=n.n(r),c=(n(117),n(9)),l=n(8),u=n(20),d=n(12),h=n(14),b=n(151),j=n(5),m=n(154),f=n(155),p=n(64),x=n(128),O=n(170),v=n(171),g=n(161),y=n(94),k=n(177),w=n(156),S=n(157),C=n(158),N=n(159),_=n(160),I=n(178),D=n(162),M=n(174),E=n(78),T=n.n(E),P=function(){function t(){Object(c.a)(this,t),this.subscribers=new Map,this.name=void 0}return Object(l.a)(t,[{key:"subscribe",value:function(t,e){console.debug("Subscribe",t,"to",this.constructor.name,this),this.subscribers.set(t,e)}},{key:"unsubscribe",value:function(t){console.debug("Unsubscribe",t,"from",this.constructor.name,this),this.subscribers.delete(t)}},{key:"updateSubscribers",value:function(){var t=this;this.subscribers.forEach((function(e,n,i){console.debug("Update Subscriber",n,"on",t.constructor.name,t),e()}))}}]),t}(),L=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){var t;return Object(c.a)(this,n),(t=e.call(this))._desktopNotificationSupport=!1,t.name="NotificationService",t._desktopNotificationSupport="Notification"in window,t}return Object(l.a)(n,null,[{key:"instance",get:function(){return this._instance||(this._instance=new this)}}]),Object(l.a)(n,[{key:"requestDesktopNotificationPermissions",value:function(){var t=this;this.desktopNotificationSupport&&"default"===Notification.permission&&Notification.requestPermission().then((function(e){t.updateSubscribers()}))}},{key:"showNotification",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t,e){t.close(),window.focus()},i=new Notification(t,e);i.onclick=function(t){return n(i,t)}}},{key:"desktopNotificationSupport",get:function(){return this._desktopNotificationSupport}},{key:"desktopNotificationEnabled",get:function(){return this.desktopNotificationSupport&&"granted"===Notification.permission}}]),n}(P);L._instance=void 0;var R,W,B=n(175),H=n(153),J=n(127),K=Object(j.a)((function(t){return Object(b.a)({modal:{display:"flex",alignItems:"center",justifyContent:"center",padding:8,border:"none"}})}))((W=R=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props.classes;return Object(i.jsx)(B.a,{open:this.props.open,onClose:this.props.onClose,closeAfterTransition:!0,className:t.modal,BackdropComponent:H.a,BackdropProps:{timeout:500},children:Object(i.jsx)(J.a,{in:this.props.open,children:Object(i.jsx)(m.a,{className:t.modal,children:Object(i.jsxs)(f.a,{container:!0,direction:"column",alignItems:"center",alignContent:"center",children:[Object(i.jsx)(f.a,{item:!0,xs:!0,children:Object(i.jsx)(p.a,{variant:"h4",children:this.props.title})}),Object(i.jsxs)(f.a,{item:!0,xs:!0,children:[Object(i.jsx)(p.a,{variant:"subtitle1",children:this.props.subtitle}),Object(i.jsx)("br",{})]}),Object(i.jsx)(x.a,{color:"secondary",variant:"contained",onClick:this.props.onConfirm,children:Object(i.jsx)(f.a,{item:!0,xs:!0,children:this.props.buttonText})})]})})})})}}]),n}(s.Component),R.defaultProps={title:"Are you sure?",subtitle:"This action cannot be undone",buttonText:"Continue"},W)),F=n(23),A=n(45),G=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this)).timeout=void 0,i._startTime=void 0,i._endTime=void 0,i._running=!1,i._paused=!1,i._name="NEW",i._min=1,i._max=90,i._value=0,i._intervalMs=1e3,i._startTime=t.startTime,i._endTime=t.endTime,i._running=!0===t.running,i._paused=!0===t.paused,i._name=t.name?t.name:"NEW",i._min=t.min?t.min:1,i._max=t.max?t.max:90,i._value=t.value?t.value:i._min,i._intervalMs=t.intervalMs?t.intervalMs:1e3,i}return Object(l.a)(n,[{key:"toJSON",value:function(){return{startTime:this.startTime,endTime:this.endTime,running:this.running,paused:this.paused,name:this.name,min:this.min,max:this.max,value:this.value,intervalMs:this.intervalMs}}},{key:"start",value:function(){this._running=!0,this._startTime=Date.now(),this._endTime=this._startTime+60*this.value*1e3,this.update()}},{key:"stop",value:function(){this._running=!1,this._paused=!1,this.update()}},{key:"pause",value:function(){this.running&&(this._paused=!this._paused,this.paused||(this._endTime=Date.now()+1e3*this.secondsLeft),this.update())}},{key:"update",value:function(){var t=this;void 0===this.endTime||this.paused||(this.secondsLeft>0?this.timeout=setTimeout((function(){return t.update()}),this.intervalMs):(this._running=!1,this._endTime=Date.now(),clearTimeout(this.timeout))),this.updateSubscribers()}},{key:"name",get:function(){return this._name},set:function(t){this._name=t,this.updateSubscribers()}},{key:"running",get:function(){return this._running}},{key:"paused",get:function(){return this._paused}},{key:"value",get:function(){return this._value},set:function(t){this._value=t,this.updateSubscribers()}},{key:"min",get:function(){return this._min?this._min:1},set:function(t){this._min=t,this.updateSubscribers()}},{key:"max",get:function(){return this._max?this._max:90},set:function(t){this._max=t,this.updateSubscribers()}},{key:"intervalMs",get:function(){return this._intervalMs?this._intervalMs:1e3}},{key:"startTime",get:function(){return this._startTime}},{key:"endTime",get:function(){return this._endTime}},{key:"secondsLeft",get:function(){return this.running&&this.endTime?Math.floor((this.endTime-Date.now())/1e3):0}}]),n}(P),U=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;if(Object(c.a)(this,n),(i=e.call(this))._items=[],i._currentIndex=0,i.name="CountdownCollection",null===t||void 0===t?void 0:t.items){var s,a=Object(A.a)(t.items);try{for(a.s();!(s=a.n()).done;){var r=s.value;i.addItem(r)}}catch(o){a.e(o)}finally{a.f()}}return(null===t||void 0===t?void 0:t.currentIndex)&&(i._currentIndex=t.currentIndex),i._currentIndex>i.items.length-1&&(i._currentIndex=0),i}return Object(l.a)(n,[{key:"advance",value:function(){this._currentIndex=this.nextIndex,this.updateSubscribers()}},{key:"toJSON",value:function(){return{items:this.items,currentIndex:this.currentIndex}}},{key:"addItem",value:function(t){var e=this;if(null!==t){var n=new G(t);n.subscribe(this.name,(function(){e.updateSubscribers()})),this.items.push(n)}this.updateSubscribers()}},{key:"deleteItem",value:function(t){delete this.items[t],this.updateSubscribers()}},{key:"swapItems",value:function(t,e){var n,i;if(t<e)n=t,i=e;else{if(!(e<t))throw new RangeError("Cannot swap an element with itself");n=e,i=t}this.currentIndex===n?this._currentIndex=i:this.currentIndex===i&&(this._currentIndex=n),this._items=[].concat(Object(F.a)(this.items.slice(0,n)),[this.items[i],this.items[n]],Object(F.a)(this.items.slice(i+1))),this.updateSubscribers()}},{key:"getItem",value:function(t){return this.items[t]}},{key:"items",get:function(){return this._items}},{key:"currentIndex",get:function(){return this._currentIndex}},{key:"current",get:function(){return this.items[this.currentIndex]}},{key:"nextIndex",get:function(){return(this.currentIndex+1)%this.items.length}},{key:"next",get:function(){return this.items[this.nextIndex]}},{key:"runningCountdown",get:function(){return this.items.filter((function(t){return t.running}))[0]}}]),n}(P),z={items:[{name:"Work",min:1,max:90,value:50},{name:"Break time",min:1,max:15,value:10}]},q=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){var t;return Object(c.a)(this,n),(t=e.call(this))._countdowns=new U,t.name="CountdownService",t.load(),t}return Object(l.a)(n,[{key:"countdowns",get:function(){return this._countdowns}},{key:"items",get:function(){return this.countdowns.items}}],[{key:"instance",get:function(){return this._instance||(this._instance=new this)}}]),Object(l.a)(n,[{key:"load",value:function(){var t=this,e=localStorage.getItem(this.name);if(e)this._countdowns=new U(JSON.parse(e));else{var n=localStorage.getItem("countdowns"),i=localStorage.getItem("currentCountdown");n&&(this._countdowns=new U({items:JSON.parse(n),currentIndex:i?parseInt(i):0}))}this._countdowns.subscribe(this.name,(function(){t.save()})),this.save()}},{key:"save",value:function(){localStorage.setItem(this.name,JSON.stringify(this.countdowns)),this.updateSubscribers()}},{key:"reset",value:function(){this._countdowns=new U(z),this.save()}}]),n}(P);q._instance=void 0;var V=function(){function t(e){var n=e.name,i=e.start,s=e.end;Object(c.a)(this,t),this.name=void 0,this.start=void 0,this.end=void 0,this.name=n,this.start=i,this.end=s}return Object(l.a)(t,[{key:"durationMs",get:function(){return this.end-this.start}}]),t}(),Y=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;if(Object(c.a)(this,n),(i=e.call(this)).items=[],i.name="HistoryItemCollection",null===t||void 0===t?void 0:t.items){var s,a=Object(A.a)(t.items);try{for(a.s();!(s=a.n()).done;){var r=s.value;i.addItem(r)}}catch(o){a.e(o)}finally{a.f()}}return i}return Object(l.a)(n,[{key:"toJSON",value:function(){return{items:this.items}}},{key:"addItem",value:function(t){this.items.push(new V(t)),this.updateSubscribers()}},{key:"today",get:function(){var t=new Date(Date.now());return this.items.filter((function(e){var n=new Date(e.start);return n.getFullYear()===t.getFullYear()&&n.getMonth()===t.getMonth()&&n.getDay()===t.getDay()}))}}]),n}(P),Q=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){var t;Object(c.a)(this,n),(t=e.call(this)).name="HistoryService",t._history=void 0;var i=localStorage.getItem("history");return t._history=i?new Y(JSON.parse(i)):new Y,t}return Object(l.a)(n,[{key:"history",get:function(){return this._history}},{key:"items",get:function(){return this.history.items}}],[{key:"instance",get:function(){return this._instance||(this._instance=new this)}}]),Object(l.a)(n,[{key:"save",value:function(){localStorage.setItem("history",JSON.stringify(this.history)),this.updateSubscribers()}},{key:"addItem",value:function(t){this._history.addItem(t),this.save()}},{key:"clear",value:function(){this._history=new Y,this.save()}}]),n}(P);Q._instance=void 0;var X,Z,$=L.instance,tt=Object(j.a)((function(t){return Object(b.a)({sideBar:{width:250},footer:{top:"auto",bottom:0,width:"100%",padding:8},footerButton:{width:"100%"}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={notificationsEnabled:$.desktopNotificationEnabled,confirmResetOpen:!1,confirmClearHistoryOpen:!1},i}return Object(l.a)(n,[{key:"refreshNotificationState",value:function(){this.state.notificationsEnabled!==$.desktopNotificationEnabled&&this.setState({notificationsEnabled:$.desktopNotificationEnabled})}},{key:"componentDidUpdate",value:function(){this.refreshNotificationState()}},{key:"componentDidMount",value:function(){var t=this;$.subscribe("NotificationService",(function(){t.refreshNotificationState()}))}},{key:"componentWillUnmount",value:function(){$.unsubscribe("NotificationService")}},{key:"render",value:function(){var t=this,e=this.props.classes;return Object(i.jsxs)(k.a,{anchor:"left",open:this.props.open,onClose:function(){return t.props.onClose()},children:[Object(i.jsx)(K,{open:this.state.confirmResetOpen,onClose:function(){t.setState({confirmResetOpen:!1}),t.props.onClose()},onConfirm:function(){q.instance.reset(),t.setState({confirmResetOpen:!1}),t.props.onClose()},subtitle:"Resetting your countdowns cannot be undone"}),Object(i.jsx)(K,{open:this.state.confirmClearHistoryOpen,onClose:function(){t.setState({confirmClearHistoryOpen:!1}),t.props.onClose()},onConfirm:function(){Q.instance.clear(),t.setState({confirmClearHistoryOpen:!1}),t.props.onClose()},subtitle:"Clearing history cannot be undone"}),Object(i.jsx)("div",{className:e.sideBar,children:Object(i.jsxs)(w.a,{children:[Object(i.jsxs)(S.a,{button:!0,onClick:function(){$.requestDesktopNotificationPermissions()},children:[Object(i.jsx)(C.a,{children:Object(i.jsx)(T.a,{})}),Object(i.jsx)(N.a,{primary:"Notifications"}),Object(i.jsx)(_.a,{children:Object(i.jsx)(I.a,{edge:"end",onClick:function(){$.requestDesktopNotificationPermissions()},checked:this.state.notificationsEnabled,inputProps:{"aria-labelledby":"switch-list-label-bluetooth"},onFocus:function(){return t.refreshNotificationState()},onBlur:function(){return t.refreshNotificationState()},disabled:!$.desktopNotificationSupport})})]}),Object(i.jsx)(D.a,{}),Object(i.jsx)(S.a,{button:!0,onClick:function(){t.setState({confirmClearHistoryOpen:!0})},children:Object(i.jsx)(N.a,{primary:"Clear history"})}),Object(i.jsx)(S.a,{button:!0,onClick:function(){t.setState({confirmResetOpen:!0})},children:Object(i.jsx)(N.a,{primary:"Reset to defaults"})})]})}),Object(i.jsx)(M.a,{position:"fixed",className:e.footer,children:Object(i.jsx)(x.a,{children:Object(i.jsxs)(p.a,{variant:"caption",children:["Version ","1.1.2"," (what's new)"]})})})]})}}]),n}(s.Component)),et=n(91),nt=n.n(et),it=n(92),st=n(21),at=n(173),rt=n(163),ot=n(164),ct=n(165),lt=n(166),ut=n(167),dt=n(168),ht=function(){function t(){Object(c.a)(this,t)}return Object(l.a)(t,null,[{key:"seconds",value:function(t){var e=Math.floor(t/60/60),n=Math.floor((t-60*e*60)/60),i=Math.floor(t-60*e*60-60*n),s=[];return e>0&&s.push("".concat(e,"h")),n>0&&s.push("".concat(n,"m")),s.push("".concat(i,"s")),s.join(" ")}},{key:"minutes",value:function(t){var e=Math.floor(t/60),n=t-60*e,i=[];return e>0&&i.push("".concat(e,"h")),i.push("".concat(n,"m")),i.join(" ")}}]),t}(),bt=Object(j.a)((function(t){return Object(b.a)({})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(i.jsxs)(M.a,{flexDirection:"column",flex:2,display:"flex",alignItems:"center",children:[Object(i.jsx)(M.a,{display:"flex",children:Object(i.jsx)(p.a,{variant:"caption",children:this.props.caption})}),Object(i.jsx)(M.a,{display:"flex",children:Object(i.jsx)(p.a,{variant:"subtitle1",children:this.props.text})})]})}}]),n}(s.Component)),jt=Object(j.a)((function(t){return Object(b.a)({table:{minWidth:650},totalsGrid:{flexGrow:1,padding:8}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).name="HistoryList",i.state={history:Q.instance.history},i}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this;Q.instance.subscribe(this.name,(function(){t.setState({history:Q.instance.history})}))}},{key:"componentWillUnmount",value:function(){Q.instance.unsubscribe(this.name)}},{key:"render",value:function(){var t,e=this,n=this.props.classes,s={},a=Object(A.a)(this.state.history.today.map((function(t){return t.name})).sort());try{var r=function(){var n=t.value;n in s||(s[n]=e.state.history.today.filter((function(t){return t.name===n})).map((function(t){return t.durationMs})).reduce((function(t,e){return t+e})))};for(a.s();!(t=a.n()).done;)r()}catch(o){a.e(o)}finally{a.f()}return Object(i.jsxs)(f.a,{container:!0,spacing:2,className:n.totalsGrid,children:[Object(i.jsx)(f.a,{item:!0,xs:2,children:Object(i.jsx)(M.a,{flexDirection:"column",display:"flex",alignItems:"center",justifyContent:"center",height:"100%",children:Object(i.jsx)(p.a,{variant:"h5",children:"Totals"})})}),Object.keys(s).map((function(t){return Object(i.jsx)(f.a,{item:!0,xs:2,children:Object(i.jsx)(y.a,{children:Object(i.jsx)(bt,{caption:t,text:"".concat(ht.seconds(s[t]/1e3))})})},t)})),Object(i.jsx)(f.a,{item:!0,xs:12,children:Object(i.jsx)(rt.a,{children:Object(i.jsxs)(ot.a,{className:n.table,size:"small","aria-label":"a dense table",children:[Object(i.jsx)(ct.a,{children:Object(i.jsxs)(lt.a,{children:[Object(i.jsx)(ut.a,{children:"Task Name"}),Object(i.jsx)(ut.a,{align:"right",children:"Duration"}),Object(i.jsx)(ut.a,{align:"right",children:"Start"}),Object(i.jsx)(ut.a,{align:"right",children:"End"})]})}),Object(i.jsx)(dt.a,{children:this.state.history.today.map((function(t){var e=new Date(t.start),n=new Date(t.end);return Object(i.jsxs)(lt.a,{children:[Object(i.jsx)(ut.a,{component:"th",scope:"row",children:t.name}),Object(i.jsx)(ut.a,{align:"right",children:ht.seconds(t.durationMs/1e3)}),Object(i.jsx)(ut.a,{align:"right",children:"".concat(e.getHours(),":").concat(e.getMinutes(),":").concat(e.getSeconds())}),Object(i.jsx)(ut.a,{align:"right",children:"".concat(n.getHours(),":").concat(n.getMinutes(),":").concat(n.getSeconds())})]},t.name+t.start)}))})]})})})]})}}]),n}(s.Component)),mt=n(169),ft=n(83),pt=n.n(ft),xt=n(82),Ot=n.n(xt),vt=n(84),gt=n.n(vt),yt=n(86),kt=n.n(yt),wt=n(85),St=n.n(wt),Ct=n(90),Nt=n.n(Ct),_t=n(88),It=n.n(_t),Dt=n(87),Mt=n.n(Dt),Et=n(89),Tt=n.n(Et),Pt=n(179),Lt=n(180),Rt=n(172),Wt=n(79),Bt=n.n(Wt),Ht=n(81),Jt=n.n(Ht),Kt=n(80),Ft=n.n(Kt),At=Object(j.a)((function(t){return Object(b.a)({fullWidth:{width:"100%"},centeringGrid:{display:"flex"},listItemText:{display:"block"},sliderSpacing:{width:"100%",justifyContent:"center",verticalAlign:"middle"},sliderLabelContainer:{marginBottom:-16},sliderLabel:{paddingRight:10},editPopover:{padding:8},editContainer:{paddingRight:8}})}))((Z=X=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).popoverRef=void 0,i.state={value:i.props.value,label:i.props.label,editLabel:i.props.label,min:i.props.min,editMin:i.props.min,max:i.props.max,editMax:i.props.max,step:i.props.step,menuOpen:!1,editing:i.props.editing,labelError:!1,minError:!1,maxError:!1},i.popoverRef=a.a.createRef(),i.handleOnChange=i.handleOnChange.bind(Object(u.a)(i)),i.handleKeyPress=i.handleKeyPress.bind(Object(u.a)(i)),i.openPopover=i.openPopover.bind(Object(u.a)(i)),i.closePopover=i.closePopover.bind(Object(u.a)(i)),i.saveForm=i.saveForm.bind(Object(u.a)(i)),i.cancelEdit=i.cancelEdit.bind(Object(u.a)(i)),i}return Object(l.a)(n,[{key:"getMinError",value:function(t,e){return isNaN(t)||t<1||t>e}},{key:"getMaxError",value:function(t,e){return isNaN(e)||e<1||e<t}},{key:"handleOnChange",value:function(t,e){"number"===typeof e?(this.setState({value:e}),this.props.onChange(e)):"object"===typeof e&&(this.setState({value:e[0]}),this.props.onChange(e[0]))}},{key:"handleKeyPress",value:function(t){"Enter"===t.key&&this.saveForm()}},{key:"openPopover",value:function(){this.setState({editing:!0,editLabel:this.state.label,editMin:this.state.min,editMax:this.state.max})}},{key:"closePopover",value:function(){this.setState({editing:!1})}},{key:"saveForm",value:function(){var t;this.state.labelError||this.state.minError||this.state.maxError||(t=this.state.value>this.state.editMax?this.state.editMax:this.state.value<this.state.editMin?this.state.editMin:this.state.value,this.props.onEditSave(this.state.editLabel,this.state.editMin,this.state.editMax),this.setState({value:t,label:this.state.editLabel,min:this.state.editMin,max:this.state.editMax}),this.closePopover())}},{key:"cancelEdit",value:function(){this.setState({labelError:!1,minError:!1,maxError:!1}),this.closePopover()}},{key:"renderNormalView",value:function(){var t=this,e=this.props.classes;return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)(M.a,{display:"flex",flexDirection:"row",flex:"100%",alignItems:"baseline",className:e.sliderLabelContainer,children:[Object(i.jsx)(p.a,{variant:"subtitle1",className:e.sliderLabel,children:this.state.label}),Object(i.jsxs)(p.a,{variant:"caption",className:e.sliderLabel,children:["(",this.props.formatCallback(this.state.value),")"]})]}),Object(i.jsxs)(M.a,{display:"flex",flex:1,flexDirection:"row",children:[Object(i.jsx)(M.a,{m:1,flex:"100%",display:"flex",justifyContent:"flex-start",alignItems:"center",children:Object(i.jsx)(Pt.a,{value:this.state.value,step:this.state.step,min:this.state.min,max:this.state.max,onChange:this.handleOnChange,getAriaValueText:function(t){return"".concat(t,"m")},valueLabelDisplay:"off","aria-labelledby":"break-length"})}),Object(i.jsx)(M.a,{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center",children:Object(i.jsx)(g.a,{onClick:function(e){t.openPopover()},children:Object(i.jsx)(Bt.a,{})})})]})]})}},{key:"renderEditPopover",value:function(){var t=this,e=this.props.classes;return Object(i.jsx)(Lt.a,{open:this.state.editing,anchorEl:this.popoverRef.current,anchorOrigin:{vertical:"center",horizontal:"left"},transformOrigin:{vertical:"center",horizontal:"left"},onClose:this.cancelEdit,onEscapeKeyDown:this.cancelEdit,children:Object(i.jsxs)(M.a,{display:"flex",flex:1,flexDirection:"row",className:e.editPopover,children:[Object(i.jsxs)(f.a,{container:!0,children:[Object(i.jsx)(f.a,{item:!0,xs:6,className:e.editContainer,children:Object(i.jsx)(Rt.a,{fullWidth:!0,label:"Name",error:this.state.labelError,value:this.state.editLabel,margin:"dense",size:"small",variant:"outlined",onChange:function(e){t.setState({editLabel:e.target.value,labelError:""===e.target.value})},onKeyPress:this.handleKeyPress})}),Object(i.jsx)(f.a,{item:!0,xs:3,className:e.editContainer,children:Object(i.jsx)(Rt.a,{label:"Min",error:this.state.minError,value:this.state.editMin,size:"small",variant:"outlined",margin:"dense",onChange:function(e){var n=parseInt(e.target.value);t.setState({editMin:n||0,minError:t.getMinError(n,t.state.max),maxError:t.getMaxError(n,t.state.max)})},onKeyPress:this.handleKeyPress})}),Object(i.jsx)(f.a,{item:!0,xs:3,className:e.editContainer,children:Object(i.jsx)(Rt.a,{label:"Max",error:this.state.maxError,value:this.state.editMax,size:"small",variant:"outlined",margin:"dense",onChange:function(e){var n=parseInt(e.target.value);t.setState({editMax:n||0,minError:t.getMinError(t.state.min,n),maxError:t.getMaxError(t.state.min,n)})},onKeyPress:this.handleKeyPress})})]}),Object(i.jsxs)(M.a,{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center",children:[Object(i.jsx)(g.a,{onClick:this.saveForm,children:Object(i.jsx)(Ft.a,{color:"primary"})}),Object(i.jsx)(g.a,{onClick:this.cancelEdit,children:Object(i.jsx)(Jt.a,{color:"secondary"})})]})]})})}},{key:"render",value:function(){return Object(i.jsxs)("div",{ref:this.popoverRef,children:[" ",Object(i.jsxs)(M.a,{display:"flex",flexDirection:"column",children:[this.renderNormalView(),this.renderEditPopover()]})]})}}]),n}(s.Component),X.defaultProps={editing:!1},Z)),Gt=Object(j.a)((function(t){return Object(b.a)({popperCardStyle:{paddingLeft:t.spacing(1),backgroundColor:t.palette.grey[50],margin:8,height:"100%"},fillWidth:{width:"100%"}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i,s,a,r;(Object(c.a)(this,n),(a=e.call(this,t)).notificationService=void 0,a.state={countdowns:q.instance.countdowns,editingOrder:!1,confirmDeleteOpen:!1,confirmDeleteIndex:0,confirmDeleteName:"",running:null===(i=q.instance.countdowns.current)||void 0===i?void 0:i.running,paused:!1,warningNotificationSent:!1},null===(s=q.instance.countdowns.current)||void 0===s?void 0:s.running)&&(null===(r=q.instance.countdowns.runningCountdown)||void 0===r||r.update());return a.notificationService=L.instance,a.handleStartStopOnClick=a.handleStartStopOnClick.bind(Object(u.a)(a)),a.countdownSubscriber=a.countdownSubscriber.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t,e=this;(q.instance.subscribe("CountdownComponent",(function(){e.setState({countdowns:q.instance.countdowns})})),this.state.running)&&(null===(t=this.state.countdowns.current)||void 0===t||t.subscribe("CountdownComponent",this.countdownSubscriber))}},{key:"componentWillUnmount",value:function(){q.instance.unsubscribe("CountdownComponent")}},{key:"handleStartStopOnClick",value:function(){this.state.running?this.stop():this.start()}},{key:"start",value:function(){this.setState({running:!0}),this.state.countdowns.current.start(),window.document.title="".concat(Qt," [").concat(this.state.countdowns.current.name," ").concat(ht.seconds(this.state.countdowns.current.secondsLeft),"]")}},{key:"stop",value:function(){if(this.setState({running:!1}),this.state.countdowns.current.stop(),this.state.countdowns.current.startTime&&this.state.countdowns.current.endTime){var t=Date.now();t>this.state.countdowns.current.endTime&&(t=this.state.countdowns.current.endTime),Q.instance.addItem({name:this.state.countdowns.current.name,start:this.state.countdowns.current.startTime,end:t})}this.setState({warningNotificationSent:!1,paused:!1}),this.state.countdowns.advance(),window.document.title=Yt}},{key:"countdownSubscriber",value:function(){this.state.countdowns.current.running?(window.document.title="".concat(Qt," [").concat(this.state.countdowns.current.name," ").concat(ht.seconds(this.state.countdowns.current.secondsLeft),"]"),!this.state.warningNotificationSent&&this.state.countdowns.current.secondsLeft<300&&this.state.countdowns.current.secondsLeft>240&&(this.setState({warningNotificationSent:!0}),this.notificationService.showNotification(Yt,{body:"Stopping soon: ".concat(this.state.countdowns.current.name)}))):(this.notificationService.showNotification(Yt,{body:"Complete: ".concat(this.state.countdowns.current.name)}),this.stop())}},{key:"renderSliders",value:function(){var t=this,e=this.props.classes,n=[],s=function(s){var a=parseInt(s),r=t.state.countdowns.items[s],o=0===a,c=a===t.state.countdowns.items.length-1;t.state.editingOrder?n.push(Object(i.jsx)(f.a,{item:!0,children:Object(i.jsx)(m.a,{className:e.popperCardStyle,children:Object(i.jsxs)(M.a,{display:"flex",flexDirection:"row",children:[Object(i.jsx)(M.a,{flex:"100%",display:"flex",justifyContent:"left",alignItems:"center",children:Object(i.jsx)(p.a,{variant:"button",children:r.name})}),Object(i.jsxs)(M.a,{flex:1,display:"flex",justifyContent:"right",justifyItems:"right",children:[Object(i.jsx)(g.a,{color:"primary",disabled:o,onClick:function(){t.state.countdowns.swapItems(a,a-1)},children:Object(i.jsx)(Ot.a,{})}),Object(i.jsx)(g.a,{color:"primary",disabled:c,onClick:function(){t.state.countdowns.swapItems(a,a+1)},children:Object(i.jsx)(pt.a,{})}),Object(i.jsx)(g.a,{color:"secondary",onClick:function(){t.setState({confirmDeleteOpen:!0,confirmDeleteIndex:a,confirmDeleteName:r.name})},children:Object(i.jsx)(gt.a,{})})]})]})})},r.name)):n.push(Object(i.jsx)(f.a,{item:!0,children:Object(i.jsx)(At,{label:r.name,labelSuffix:"m",value:r.value,step:1,min:r.min,max:r.max,onChange:function(t){r.value=t},onEditSave:function(t,e,n){r.name=t,r.min=e,r.max=n},formatCallback:function(t){return ht.minutes(t)}})},r.name))};for(var a in this.state.countdowns.items)s(a);return n}},{key:"render",value:function(){var t,e,n,s=this,a=this.props.classes;return Object(i.jsxs)(f.a,{container:!0,children:[Object(i.jsx)(K,{open:this.state.confirmDeleteOpen,onClose:function(){s.setState({confirmDeleteOpen:!1})},onConfirm:function(){s.state.countdowns.deleteItem(s.state.confirmDeleteIndex),s.setState({confirmDeleteOpen:!1})},subtitle:"Deleting this cannot be undone"}),Object(i.jsx)(f.a,{item:!0,xs:12,children:Object(i.jsxs)(M.a,{display:"flex",flexDirection:"row",children:[Object(i.jsx)(M.a,{flex:"100%",children:Object(i.jsx)(p.a,{variant:"h3",children:" Timers "})}),Object(i.jsx)(M.a,{flex:1,children:Object(i.jsx)(g.a,{disabled:this.state.editingOrder,onClick:function(){s.state.countdowns.addItem({name:"NEW ".concat(s.state.countdowns.items.length)})},children:Object(i.jsx)(St.a,{color:this.state.editingOrder?"disabled":"primary"})})}),Object(i.jsx)(M.a,{flex:1,children:Object(i.jsx)(g.a,{onClick:function(){s.setState({editingOrder:!s.state.editingOrder})},children:Object(i.jsx)(kt.a,{color:this.state.editingOrder?"primary":"action"})})})]})}),Object(i.jsx)(f.a,{item:!0,xs:12,children:this.renderSliders()}),Object(i.jsx)(f.a,{item:!0,xs:12,sm:3,children:Object(i.jsxs)(mt.a,{className:a.fillWidth,variant:"contained",color:this.state.running?this.state.paused?"default":"secondary":"primary",children:[Object(i.jsx)(x.a,{className:a.fillWidth,onClick:this.handleStartStopOnClick,children:this.state.running?Object(i.jsx)(Mt.a,{}):Object(i.jsx)(It.a,{})}),Object(i.jsx)(x.a,{className:a.fillWidth,disabled:!this.state.running,onClick:function(){s.state.running&&(s.state.countdowns.current.pause(),s.setState({paused:!s.state.paused}))},children:this.state.paused?Object(i.jsx)(Tt.a,{}):Object(i.jsx)(Nt.a,{})})]})}),Object(i.jsx)(f.a,{item:!0,xs:4,sm:3,children:Object(i.jsx)(bt,{caption:this.state.running?this.state.paused?"Paused":"Running":"On deck",text:(null===(t=this.state.countdowns.current)||void 0===t?void 0:t.name)||"NONE"})}),Object(i.jsx)(f.a,{item:!0,xs:4,sm:3,children:Object(i.jsx)(bt,{caption:"Time left",text:ht.seconds(null===(e=this.state.countdowns.current)||void 0===e?void 0:e.secondsLeft)})}),Object(i.jsx)(f.a,{item:!0,xs:4,sm:3,children:Object(i.jsx)(bt,{caption:"Up next",text:(null===(n=this.state.countdowns.next)||void 0===n?void 0:n.name)||"NONE"})})]})}}]),n}(s.Component)),Ut=n(123),zt=n(124),qt=function(){function t(e){Object(c.a)(this,t),this.grid=void 0,this.grid=e||{top:1}}return Object(l.a)(t,[{key:"top",get:function(){return this.grid.top?this.grid.top:1}},{key:"left",get:function(){return this.grid.left?this.grid.left:1}},{key:"bottom",get:function(){return this.grid.bottom?this.grid.bottom:1}},{key:"right",get:function(){return this.grid.right?this.grid.right:1}},{key:"middle",get:function(){return this.grid.middle?this.grid.middle:1}},{key:"center",get:function(){return this.grid.center?this.grid.center:1}}]),t}(),Vt=Object(zt.a)((function(t){return Object(Ut.a)({container:{width:"100%",height:"100%"}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).spacing=void 0,i.spacing=new qt(t.spacing),i}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props.classes;return Object(i.jsx)(B.a,{open:this.props.open,onClose:this.props.onClose,closeAfterTransition:!0,BackdropComponent:H.a,BackdropProps:{timeout:500},children:Object(i.jsx)(J.a,{in:this.props.open,children:Object(i.jsxs)(M.a,{display:"flex",flexDirection:"column",className:t.container,children:[Object(i.jsx)(M.a,{flex:this.spacing.top,onClick:this.props.onClose}),Object(i.jsx)(M.a,{flex:this.spacing.middle,children:Object(i.jsxs)(M.a,{display:"flex",flexDirection:"row",className:t.container,children:[Object(i.jsx)(M.a,{flex:this.spacing.left,onClick:this.props.onClose}),Object(i.jsx)(M.a,{flex:this.spacing.center,children:this.props.children}),Object(i.jsx)(M.a,{flex:this.spacing.right,onClick:this.props.onClose})]})}),Object(i.jsx)(M.a,{flex:this.spacing.bottom,onClick:this.props.onClose})]})})})}}]),n}(s.Component)),Yt="Task Timer",Qt="TT",Xt=L.instance,Zt=Object(j.a)((function(t){return Object(b.a)({root:{flexGrow:1,overflow:"hidden"},fillWidth:{width:"100%"},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1},gridContainer:{flexGrow:1,padding:8},paperContainer:{padding:8},sliderBox:{paddingTop:16},popperCardStyle:{paddingLeft:t.spacing(1),backgroundColor:t.palette.grey[50],margin:8,height:"100%"},popperContentsStyle:{marginRight:8},modal:{display:"flex",alignItems:"center",justifyContent:"center",padding:8,border:"none",width:"100%",height:"100%"},statusStyle:{marginTop:-.5,marginBottom:-1}})}))(function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;Object(c.a)(this,n),(i=e.call(this,t)).sliderRefs=[];var s=localStorage.getItem("selectedDate"),a=localStorage.getItem("version");return i.state={workLength:50,breakLength:10,running:!1,paused:!1,secondsLeft:0,sidebarOpen:!1,notificationSupport:"Notification"in window,editingOrder:!1,confirmDeleteOpen:!1,confirmDeleteIndex:0,confirmDeleteName:"",confirmResetOpen:!1,warningNotificationSent:!1,selectedDate:s?new Date(JSON.parse(s)):new Date(0,0,0,12,0,10),whatsNewModalOpen:"1.1.2"!==a},i.checkSchedule=i.checkSchedule.bind(Object(u.a)(i)),i}return Object(l.a)(n,[{key:"componentDidMount",value:function(){Xt.requestDesktopNotificationPermissions(),localStorage.setItem("version","1.1.2"),this.checkSchedule()}},{key:"checkSchedule",value:function(){var t=this,e=new Date;e.getHours()===this.state.selectedDate.getHours()&&e.getMinutes()===this.state.selectedDate.getMinutes()&&Xt.showNotification(Yt,{body:"It's lunchtime!"}),setTimeout((function(){return t.checkSchedule()}),5e4)}},{key:"render",value:function(){var t=this,e=this.props.classes;return Object(i.jsxs)("div",{className:e.root,children:[Object(i.jsx)(Vt,{open:this.state.whatsNewModalOpen,onClose:function(){console.log("App.tsx onClose()"),t.setState({whatsNewModalOpen:!1})},spacing:{top:{xs:1,md:2},middle:{xs:1,md:1},center:{xs:5,md:1},bottom:{xs:1,md:2}},children:Object(i.jsx)(m.a,{className:e.modal,children:Object(i.jsxs)(f.a,{container:!0,direction:"column",alignItems:"center",alignContent:"center",children:[Object(i.jsx)(f.a,{item:!0,xs:!0,children:Object(i.jsxs)(p.a,{variant:"h4",children:["Version ","1.1.2"]})}),Object(i.jsxs)(f.a,{item:!0,xs:!0,children:[Object(i.jsx)(p.a,{variant:"body1",children:"Task Timer has been updated since the last time you were here. Click below to see what's new!"})," ",Object(i.jsx)("br",{})]}),Object(i.jsx)(f.a,{item:!0,xs:!0,children:Object(i.jsx)(x.a,{variant:"contained",href:"/WHATS_NEW.html",target:"_blank",onClick:function(){t.setState({whatsNewModalOpen:!1})},children:"See what's new!"})})]})})}),Object(i.jsx)(O.a,{position:"static",children:Object(i.jsxs)(v.a,{children:[Object(i.jsx)(g.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",onClick:function(){t.setState({sidebarOpen:!0})},children:Object(i.jsx)(nt.a,{})}),Object(i.jsx)(p.a,{variant:"h6",className:e.title,children:Yt})]})}),Object(i.jsx)(tt,{open:this.state.sidebarOpen,onClose:function(){t.setState({sidebarOpen:!1})}}),Object(i.jsxs)(f.a,{container:!0,className:e.gridContainer,spacing:2,children:[Object(i.jsx)(f.a,{item:!0,xs:12,md:8,children:Object(i.jsx)(y.a,{className:e.paperContainer,children:Object(i.jsx)(Gt,{})})}),Object(i.jsx)(f.a,{item:!0,xs:12,md:4,children:Object(i.jsx)(y.a,{className:e.paperContainer,children:Object(i.jsxs)(f.a,{container:!0,children:[Object(i.jsx)(f.a,{item:!0,xs:12,children:Object(i.jsx)(p.a,{variant:"h3",children:"Schedule"})}),Object(i.jsx)(f.a,{item:!0,xs:12,children:Object(i.jsx)(st.a,{utils:it.a,children:Object(i.jsx)(at.a,{id:"lunch-time-picker",label:"Lunch",value:this.state.selectedDate,onChange:function(e){t.setState({selectedDate:e}),localStorage.setItem("selectedDate",JSON.stringify(e))},minutesStep:5})})})]})})}),Object(i.jsx)(f.a,{item:!0,xs:12,md:4,children:Object(i.jsx)(y.a,{className:e.paperContainer,children:Object(i.jsxs)(f.a,{container:!0,children:[Object(i.jsx)(f.a,{item:!0,xs:12,children:Object(i.jsx)(p.a,{variant:"h3",children:"History"})}),Object(i.jsx)(f.a,{item:!0,xs:12,children:Object(i.jsx)(jt,{})})]})})})]})]})}}]),n}(s.Component));o.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(Zt,{})}),document.getElementById("root"))}},[[122,1,2]]]);
//# sourceMappingURL=main.7d9fdf11.chunk.js.map
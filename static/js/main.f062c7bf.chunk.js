(this["webpackJsonptask-timer"]=this["webpackJsonptask-timer"]||[]).push([[0],{151:function(t,e,n){},179:function(t,e,n){"use strict";n.r(e);var i,s,a=n(4),o=n(0),r=n.n(o),c=n(15),l=n.n(c),u=(n(151),n(24)),d=n(14),h=n(11),b=n(17),p=n(21),j=n(30),f=n(202),m=n(6),x=n(206),O=n(214),v=n(221),g=n(85),w=n(205),C=n(215),y=n(216),k=n(130),S=n(217),N=n(93),_=n.n(N),T=n(222),E=n(224),I=n(218),L=n(114),M=n.n(L),D=n(116),P=n.n(D),R=n(115),B=n.n(R),J=Object(m.a)((function(t){return Object(f.a)({fullWidth:{width:"100%"},centeringGrid:{display:"flex"},listItemText:{display:"block"},sliderSpacing:{width:"100%",justifyContent:"center",verticalAlign:"middle"},sliderLabelContainer:{marginBottom:-16},sliderLabel:{paddingRight:10},editPopover:{padding:8},editContainer:{paddingRight:8}})}))((s=i=function(t){Object(p.a)(n,t);var e=Object(j.a)(n);function n(t){var i;return Object(d.a)(this,n),(i=e.call(this,t)).popoverRef=void 0,i.state={value:i.props.value,label:i.props.label,editLabel:i.props.label,min:i.props.min,editMin:i.props.min,max:i.props.max,editMax:i.props.max,step:i.props.step,menuOpen:!1,editing:i.props.editing,labelError:!1,minError:!1,maxError:!1},i.popoverRef=r.a.createRef(),i.handleOnChange=i.handleOnChange.bind(Object(b.a)(i)),i.handleKeyPress=i.handleKeyPress.bind(Object(b.a)(i)),i.openPopover=i.openPopover.bind(Object(b.a)(i)),i.closePopover=i.closePopover.bind(Object(b.a)(i)),i.saveForm=i.saveForm.bind(Object(b.a)(i)),i.cancelEdit=i.cancelEdit.bind(Object(b.a)(i)),i}return Object(h.a)(n,[{key:"getMinError",value:function(t,e){return isNaN(t)||t<1||t>e}},{key:"getMaxError",value:function(t,e){return isNaN(e)||e<1||e<t}},{key:"handleOnChange",value:function(t,e){"number"===typeof e?(this.setState({value:e}),this.props.onChange(e)):"object"===typeof e&&(this.setState({value:e[0]}),this.props.onChange(e[0]))}},{key:"handleKeyPress",value:function(t){"Enter"===t.key&&this.saveForm()}},{key:"openPopover",value:function(){this.setState({editing:!0,editLabel:this.state.label,editMin:this.state.min,editMax:this.state.max})}},{key:"closePopover",value:function(){this.setState({editing:!1})}},{key:"saveForm",value:function(){var t;this.state.labelError||this.state.minError||this.state.maxError||(t=this.state.value>this.state.editMax?this.state.editMax:this.state.value<this.state.editMin?this.state.editMin:this.state.value,this.props.onEditSave(this.state.editLabel,this.state.editMin,this.state.editMax),this.setState({value:t,label:this.state.editLabel,min:this.state.editMin,max:this.state.editMax}),this.closePopover())}},{key:"cancelEdit",value:function(){this.setState({labelError:!1,minError:!1,maxError:!1}),this.closePopover()}},{key:"renderNormalView",value:function(){var t=this,e=this.props.classes;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)(v.a,{display:"flex",flexDirection:"row",flex:"100%",alignItems:"baseline",className:e.sliderLabelContainer,children:[Object(a.jsx)(g.a,{variant:"subtitle1",className:e.sliderLabel,children:this.state.label}),Object(a.jsxs)(g.a,{variant:"caption",className:e.sliderLabel,children:["(",this.props.formatCallback(this.state.value),")"]})]}),Object(a.jsxs)(v.a,{display:"flex",flex:1,flexDirection:"row",children:[Object(a.jsx)(v.a,{m:1,flex:"100%",display:"flex",justifyContent:"flex-start",alignItems:"center",children:Object(a.jsx)(T.a,{value:this.state.value,step:this.state.step,min:this.state.min,max:this.state.max,onChange:this.handleOnChange,getAriaValueText:function(t){return"".concat(t,"m")},valueLabelDisplay:"off","aria-labelledby":"break-length"})}),Object(a.jsx)(v.a,{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center",children:Object(a.jsx)(w.a,{onClick:function(e){t.openPopover()},children:Object(a.jsx)(M.a,{})})})]})]})}},{key:"renderEditPopover",value:function(){var t=this,e=this.props.classes;return Object(a.jsx)(E.a,{open:this.state.editing,anchorEl:this.popoverRef.current,anchorOrigin:{vertical:"center",horizontal:"left"},transformOrigin:{vertical:"center",horizontal:"left"},onClose:this.cancelEdit,onEscapeKeyDown:this.cancelEdit,children:Object(a.jsxs)(v.a,{display:"flex",flex:1,flexDirection:"row",className:e.editPopover,children:[Object(a.jsxs)(x.a,{container:!0,children:[Object(a.jsx)(x.a,{item:!0,xs:6,className:e.editContainer,children:Object(a.jsx)(I.a,{fullWidth:!0,label:"Name",error:this.state.labelError,value:this.state.editLabel,margin:"dense",size:"small",variant:"outlined",onChange:function(e){t.setState({editLabel:e.target.value,labelError:""===e.target.value})},onKeyPress:this.handleKeyPress})}),Object(a.jsx)(x.a,{item:!0,xs:3,className:e.editContainer,children:Object(a.jsx)(I.a,{label:"Min",error:this.state.minError,value:this.state.editMin,size:"small",variant:"outlined",margin:"dense",onChange:function(e){var n=parseInt(e.target.value);t.setState({editMin:n||0,minError:t.getMinError(n,t.state.max),maxError:t.getMaxError(n,t.state.max)})},onKeyPress:this.handleKeyPress})}),Object(a.jsx)(x.a,{item:!0,xs:3,className:e.editContainer,children:Object(a.jsx)(I.a,{label:"Max",error:this.state.maxError,value:this.state.editMax,size:"small",variant:"outlined",margin:"dense",onChange:function(e){var n=parseInt(e.target.value);t.setState({editMax:n||0,minError:t.getMinError(t.state.min,n),maxError:t.getMaxError(t.state.min,n)})},onKeyPress:this.handleKeyPress})})]}),Object(a.jsxs)(v.a,{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center",children:[Object(a.jsx)(w.a,{onClick:this.saveForm,children:Object(a.jsx)(B.a,{color:"primary"})}),Object(a.jsx)(w.a,{onClick:this.cancelEdit,children:Object(a.jsx)(P.a,{color:"secondary"})})]})]})})}},{key:"render",value:function(){return Object(a.jsxs)("div",{ref:this.popoverRef,children:[" ",Object(a.jsxs)(v.a,{display:"flex",flexDirection:"column",children:[this.renderNormalView(),this.renderEditPopover()]})]})}}]),n}(o.Component),i.defaultProps={editing:!1},s)),K=n(225),W=n(207),F=n(209),q=n(210),z=n(211),A=n(212),G=n(226),U=n(213),V=n(117),H=n.n(V),Q=function(){function t(){Object(d.a)(this,t),this.subscribers=new Map}return Object(h.a)(t,[{key:"subscribe",value:function(t,e){this.subscribers.set(t,e)}},{key:"unsubscribe",value:function(t){this.subscribers.delete(t)}},{key:"updateSubscribers",value:function(){this.subscribers.forEach((function(t,e,n){t()}))}}]),t}(),X=function(t){Object(p.a)(n,t);var e=Object(j.a)(n);function n(){var t;return Object(d.a)(this,n),(t=e.call(this))._desktopNotificationSupport=!1,t._desktopNotificationSupport="Notification"in window,t}return Object(h.a)(n,null,[{key:"instance",get:function(){return this._instance||(this._instance=new this)}}]),Object(h.a)(n,[{key:"requestDesktopNotificationPermissions",value:function(){var t=this;this.desktopNotificationSupport&&"default"===Notification.permission&&Notification.requestPermission().then((function(e){t.updateSubscribers()}))}},{key:"showNotification",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t,e){t.close(),window.focus()},i=new Notification(t,e);i.onclick=function(t){return n(i,t)}}},{key:"desktopNotificationSupport",get:function(){return this._desktopNotificationSupport}},{key:"desktopNotificationEnabled",get:function(){return this.desktopNotificationSupport&&"granted"===Notification.permission}}]),n}(Q);X._instance=void 0;var Y,Z,$=X.instance,tt=Object(m.a)((function(t){return Object(f.a)({sideBar:{width:250}})}))(function(t){Object(p.a)(n,t);var e=Object(j.a)(n);function n(t){var i;return Object(d.a)(this,n),(i=e.call(this,t)).state={notificationsEnabled:$.desktopNotificationEnabled},i}return Object(h.a)(n,[{key:"refreshNotificationState",value:function(){this.state.notificationsEnabled!==$.desktopNotificationEnabled&&this.setState({notificationsEnabled:$.desktopNotificationEnabled})}},{key:"componentDidUpdate",value:function(){this.refreshNotificationState()}},{key:"componentDidMount",value:function(){var t=this;$.subscribe(this.constructor.name,(function(){t.refreshNotificationState()}))}},{key:"componentWillUnmount",value:function(){$.unsubscribe(this.constructor.name)}},{key:"render",value:function(){var t=this,e=this.props.classes;return Object(a.jsx)(K.a,{anchor:"left",open:this.props.open,onClose:function(){return t.props.onClose()},children:Object(a.jsx)("div",{className:e.sideBar,children:Object(a.jsxs)(W.a,{children:[Object(a.jsxs)(F.a,{button:!0,onClick:function(){$.requestDesktopNotificationPermissions()},children:[Object(a.jsx)(q.a,{children:Object(a.jsx)(H.a,{})}),Object(a.jsx)(z.a,{primary:"Notifications"}),Object(a.jsx)(A.a,{children:Object(a.jsx)(G.a,{edge:"end",onClick:function(){$.requestDesktopNotificationPermissions()},checked:this.state.notificationsEnabled,inputProps:{"aria-labelledby":"switch-list-label-bluetooth"},onFocus:function(){return t.refreshNotificationState()},onBlur:function(){return t.refreshNotificationState()},disabled:!$.desktopNotificationSupport})})]}),Object(a.jsx)(U.a,{}),Object(a.jsx)(F.a,{button:!0,onClick:this.props.resetCallback,children:Object(a.jsx)(z.a,{primary:"Reset to defaults"})})]})})})}}]),n}(o.Component)),et=n(220),nt=n(208),it=n(184),st=n(185),at=Object(m.a)((function(t){return Object(f.a)({modal:{display:"flex",alignItems:"center",justifyContent:"center",padding:8,border:"none"}})}))((Z=Y=function(t){Object(p.a)(n,t);var e=Object(j.a)(n);function n(){return Object(d.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var t=this.props.classes;return Object(a.jsx)(et.a,{open:this.props.open,onClose:this.props.onClose,closeAfterTransition:!0,className:t.modal,BackdropComponent:nt.a,BackdropProps:{timeout:500},children:Object(a.jsx)(it.a,{in:this.props.open,children:Object(a.jsx)(O.a,{className:t.modal,children:Object(a.jsxs)(x.a,{container:!0,direction:"column",alignItems:"center",alignContent:"center",children:[Object(a.jsx)(x.a,{item:!0,xs:!0,children:Object(a.jsx)(g.a,{variant:"h4",children:this.props.title})}),Object(a.jsxs)(x.a,{item:!0,xs:!0,children:[Object(a.jsx)(g.a,{variant:"subtitle1",children:this.props.subtitle}),Object(a.jsx)("br",{})]}),Object(a.jsx)(st.a,{color:"secondary",variant:"contained",onClick:this.props.onConfirm,children:Object(a.jsx)(x.a,{item:!0,xs:!0,children:this.props.buttonText})})]})})})})}}]),n}(o.Component),Y.defaultProps={title:"Are you sure?",subtitle:"This action cannot be undone",buttonText:"Continue"},Z)),ot=function(t){Object(p.a)(n,t);var e=Object(j.a)(n);function n(){var t,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"NEW",s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:90,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1e3;return Object(d.a)(this,n),(t=e.call(this))._name=i,t._min=s,t._max=a,t._value=o,t._intervalMs=r,t.timeout=void 0,t.startTime=void 0,t._endTime=void 0,t._running=!1,t._paused=!1,t._secondsLeft=0,t}return Object(h.a)(n,[{key:"loadFromJsonObject",value:function(t){return this.startTime=t.startTime,this._endTime=t.endTime,this._running=t.running,this._paused=t.paused,this._secondsLeft=t.secondsLeft,this._name=t.name,this._min=t.min,this._max=t.max,this._value=t.value,this._intervalMs=t.intervalMs,this}},{key:"exportToJsonObject",value:function(){return{startTime:this.startTime,endTime:this.endTime,running:this.running,paused:this.paused,secondsLeft:this.secondsLeft,name:this.name,min:this.min,max:this.max,value:this.value,intervalMs:this.intervalMs}}},{key:"start",value:function(){this._running=!0,this.startTime=Date.now(),this._endTime=this.startTime+60*this.value*1e3,this.update()}},{key:"stop",value:function(){this._running=!1,this._paused=!1,this.update()}},{key:"pause",value:function(){this.running&&(this._paused=!this._paused,this.paused||(this._endTime=Date.now()+1e3*this._secondsLeft),this.update())}},{key:"update",value:function(){var t=this;void 0===this.endTime||this.paused||(this._secondsLeft=Math.floor((this.endTime-Date.now())/1e3),this._running&&this.secondsLeft>0?this.timeout=setTimeout((function(){return t.update()}),this.intervalMs):(this._running=!1,this._secondsLeft=0,clearTimeout(this.timeout))),this.updateSubscribers()}},{key:"name",get:function(){return this._name},set:function(t){this._name=t}},{key:"secondsLeft",get:function(){return this._secondsLeft}},{key:"running",get:function(){return this._running}},{key:"paused",get:function(){return this._paused}},{key:"value",get:function(){return this._value?this._value:0},set:function(t){this._value=t}},{key:"min",get:function(){return this._min?this._min:1},set:function(t){this._min=t}},{key:"max",get:function(){return this._max?this._max:90},set:function(t){this._max=t}},{key:"intervalMs",get:function(){return this._intervalMs?this._intervalMs:1e3}},{key:"endTime",get:function(){return this._endTime}}]),n}(Q),rt=function(){function t(){Object(d.a)(this,t)}return Object(h.a)(t,null,[{key:"seconds",value:function(t){var e=Math.floor(t/60/60),n=Math.floor((t-60*e*60)/60),i=Math.floor(t-60*e*60-60*n),s=[];return e>0&&s.push("".concat(e,"h")),n>0&&s.push("".concat(n,"m")),s.push("".concat(i,"s")),s.join(" ")}},{key:"minutes",value:function(t){var e=Math.floor(t/60),n=t-60*e,i=[];return e>0&&i.push("".concat(e,"h")),i.push("".concat(n,"m")),i.join(" ")}}]),t}(),ct=n(121),lt=n.n(ct),ut=n(119),dt=n.n(ut),ht=n(118),bt=n.n(ht),pt=n(120),jt=n.n(pt),ft=n(123),mt=n.n(ft),xt=n(122),Ot=n.n(xt),vt=n(127),gt=n.n(vt),wt=n(125),Ct=n.n(wt),yt=n(124),kt=n.n(yt),St=n(126),Nt=n.n(St),_t=n(128),Tt=n(25),Et=n(219),It="Task Timer",Lt=[new ot("Work",1,90,50),new ot("Break time",1,15,10)],Mt=X.instance,Dt=Object(m.a)((function(t){return Object(f.a)({root:{flexGrow:1,overflow:"hidden"},fillWidth:{width:"100%"},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1},gridContainer:{flexGrow:1,padding:8},paperContainer:{padding:8},sliderBox:{paddingTop:16},popperCardStyle:{paddingLeft:t.spacing(1),backgroundColor:t.palette.grey[50],margin:8,height:"100%"},popperContentsStyle:{marginRight:8},modal:{display:"flex",alignItems:"center",justifyContent:"center",padding:8,border:"none"},statusStyle:{marginTop:-.5,marginBottom:-1}})}))(function(t){Object(p.a)(n,t);var e=Object(j.a)(n);function n(t){var i;Object(d.a)(this,n),(i=e.call(this,t)).sliderRefs=[];var s=localStorage.getItem("currentCountdownIndex"),a=localStorage.getItem("countdowns"),o=Lt;null!==a&&(o=JSON.parse(a).map((function(t){return(new ot).loadFromJsonObject(t)})));var r=0,c=!1,l=!1,u=o.filter((function(t){return t.running}))[0];u&&(u.update(),r=u.secondsLeft,c=!0,l=u.paused);var h=localStorage.getItem("selectedDate");return i.state={workLength:50,breakLength:10,running:c,paused:l,secondsLeft:r,sidebarOpen:!1,notificationSupport:"Notification"in window,countdowns:o,currentCountdownIndex:s?parseInt(s):0,editingOrder:!1,confirmDeleteOpen:!1,confirmDeleteIndex:0,confirmDeleteName:"",confirmResetOpen:!1,warningNotificationSent:!1,selectedDate:h?new Date(JSON.parse(h)):new Date(0,0,0,12)},i.handleStartStopOnClick=i.handleStartStopOnClick.bind(Object(b.a)(i)),i.updateCountdownState=i.updateCountdownState.bind(Object(b.a)(i)),i.updateSubscriber=i.updateSubscriber.bind(Object(b.a)(i)),i.saveCountdownsToLocalStorage=i.saveCountdownsToLocalStorage.bind(Object(b.a)(i)),i.swapCountdowns=i.swapCountdowns.bind(Object(b.a)(i)),i.deleteCountdown=i.deleteCountdown.bind(Object(b.a)(i)),i.checkSchedule=i.checkSchedule.bind(Object(b.a)(i)),i}return Object(h.a)(n,[{key:"componentDidMount",value:function(){Mt.requestDesktopNotificationPermissions(),this.state.running&&this.currentCountdown.subscribe(this.constructor.name,this.updateSubscriber),this.checkSchedule()}},{key:"checkSchedule",value:function(){var t=this,e=new Date;e.getHours()===this.state.selectedDate.getHours()&&e.getMinutes()===this.state.selectedDate.getMinutes()&&Mt.showNotification(It,{body:"It's lunchtime!"}),setTimeout((function(){return t.checkSchedule()}),5e4)}},{key:"swapCountdowns",value:function(t,e){var n,i;if(t<e)n=t,i=e;else{if(!(e<t))throw new RangeError("Cannot swap an element with itself");n=e,i=t}this.state.currentCountdownIndex===n?this.setState({currentCountdownIndex:i}):this.state.currentCountdownIndex===i&&this.setState({currentCountdownIndex:n});var s=[].concat(Object(u.a)(this.state.countdowns.slice(0,n)),[this.state.countdowns[i],this.state.countdowns[n]],Object(u.a)(this.state.countdowns.slice(i+1)));this.setState({countdowns:s})}},{key:"deleteCountdown",value:function(t){var e=[].concat(Object(u.a)(this.state.countdowns.slice(0,t)),Object(u.a)(this.state.countdowns.slice(t+1)));this.saveCountdownsToLocalStorage(e),this.setState({countdowns:e})}},{key:"getNextCountdown",value:function(){return this.state.countdowns[this.nextCountdownIndex]}},{key:"updateCountdownState",value:function(t){this.setState({secondsLeft:t.secondsLeft,running:t.running}),this.saveCountdownsToLocalStorage()}},{key:"saveCountdownsToLocalStorage",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.countdowns;localStorage.setItem("countdowns",JSON.stringify(t.map((function(t){return t.exportToJsonObject()}))))}},{key:"updateSubscriber",value:function(){this.currentCountdown.running?(this.updateCountdownState(this.currentCountdown),!this.state.warningNotificationSent&&this.currentCountdown.secondsLeft<300&&this.currentCountdown.secondsLeft>240&&(this.setState({warningNotificationSent:!0}),Mt.showNotification(It,{body:"Stopping soon: ".concat(this.currentCountdown.name)}))):(Mt.showNotification(It,{body:"Complete: ".concat(this.currentCountdown.name)}),this.stopTimer())}},{key:"startTimer",value:function(){this.currentCountdown.subscribe(this.constructor.name,this.updateSubscriber),this.currentCountdown.start()}},{key:"pauseTimer",value:function(){}},{key:"stopTimer",value:function(){this.currentCountdown.unsubscribe(this.constructor.name),this.currentCountdown.stop(),this.updateCountdownState(this.currentCountdown),this.setState({currentCountdownIndex:this.nextCountdownIndex,warningNotificationSent:!1,paused:!1}),localStorage.setItem("currentCountdownIndex",this.nextCountdownIndex.toString())}},{key:"handleStartStopOnClick",value:function(){this.state.running?this.stopTimer():this.startTimer()}},{key:"renderSliders",value:function(){var t=this,e=this.props.classes,n=[],i=function(i){var s=parseInt(i),o=t.state.countdowns[i],r=0===s,c=s===t.state.countdowns.length-1;t.state.editingOrder?n.push(Object(a.jsx)(x.a,{item:!0,children:Object(a.jsx)(O.a,{className:e.popperCardStyle,children:Object(a.jsxs)(v.a,{display:"flex",flexDirection:"row",children:[Object(a.jsx)(v.a,{flex:"100%",display:"flex",justifyContent:"left",alignItems:"center",children:Object(a.jsx)(g.a,{variant:"button",children:o.name})}),Object(a.jsxs)(v.a,{flex:1,display:"flex",justifyContent:"right",justifyItems:"right",children:[Object(a.jsx)(w.a,{color:"primary",disabled:r,onClick:function(){t.swapCountdowns(s,s-1)},children:Object(a.jsx)(bt.a,{})}),Object(a.jsx)(w.a,{color:"primary",disabled:c,onClick:function(){t.swapCountdowns(s,s+1)},children:Object(a.jsx)(dt.a,{})}),Object(a.jsx)(w.a,{color:"secondary",onClick:function(){t.setState({confirmDeleteOpen:!0,confirmDeleteIndex:s,confirmDeleteName:o.name})},children:Object(a.jsx)(jt.a,{})})]})]})})},o.name)):n.push(Object(a.jsx)(x.a,{item:!0,children:Object(a.jsx)(J,{label:o.name,labelSuffix:"m",value:o.value,step:1,min:o.min,max:o.max,onChange:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;n.value=e,t.saveCountdownsToLocalStorage()},onEditSave:function(e,n,i){o.name=e,o.min=n,o.max=i,t.forceUpdate(),t.saveCountdownsToLocalStorage()},formatCallback:function(t){return rt.minutes(t)}})},o.name))};for(var s in this.state.countdowns)i(s);return n}},{key:"render",value:function(){var t=this,e=this.props.classes;return Object(a.jsxs)("div",{className:e.root,children:[Object(a.jsx)(C.a,{position:"static",children:Object(a.jsxs)(y.a,{children:[Object(a.jsx)(w.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",onClick:function(){t.setState({sidebarOpen:!0})},children:Object(a.jsx)(lt.a,{})}),Object(a.jsx)(g.a,{variant:"h6",className:e.title,children:It})]})}),Object(a.jsx)(tt,{open:this.state.sidebarOpen,onClose:function(){t.setState({sidebarOpen:!1})},resetCallback:function(){t.setState({confirmResetOpen:!0,sidebarOpen:!1})}}),Object(a.jsx)(at,{open:this.state.confirmResetOpen,onClose:function(){t.setState({confirmResetOpen:!1})},onConfirm:function(){t.setState({confirmResetOpen:!1,countdowns:Lt}),t.saveCountdownsToLocalStorage(Lt)},subtitle:"Resetting your countdowns cannot be undone"}),Object(a.jsx)(at,{open:this.state.confirmDeleteOpen,onClose:function(){t.setState({confirmDeleteOpen:!1})},onConfirm:function(){t.deleteCountdown(t.state.confirmDeleteIndex),t.setState({confirmDeleteOpen:!1})},subtitle:"Deleting this cannot be undone"}),Object(a.jsxs)(x.a,{container:!0,className:e.gridContainer,spacing:2,children:[Object(a.jsxs)(x.a,{item:!0,xs:12,md:8,children:[" ",Object(a.jsx)(k.a,{className:e.paperContainer,children:Object(a.jsxs)(x.a,{container:!0,children:[Object(a.jsx)(x.a,{item:!0,xs:12,children:Object(a.jsxs)(v.a,{display:"flex",flexDirection:"row",children:[Object(a.jsx)(v.a,{flex:"100%",children:Object(a.jsx)(g.a,{variant:"h3",children:" Timers "})}),Object(a.jsx)(v.a,{flex:1,children:Object(a.jsx)(w.a,{disabled:this.state.editingOrder,onClick:function(){var e=[].concat(Object(u.a)(t.state.countdowns),[new ot("NEW ".concat(t.state.countdowns.length))]);t.saveCountdownsToLocalStorage(e),t.setState({countdowns:e})},children:Object(a.jsx)(Ot.a,{color:this.state.editingOrder?"disabled":"primary"})})}),Object(a.jsx)(v.a,{flex:1,children:Object(a.jsx)(w.a,{onClick:function(){t.state.editingOrder&&t.saveCountdownsToLocalStorage(),t.setState({editingOrder:!t.state.editingOrder})},children:Object(a.jsx)(mt.a,{color:this.state.editingOrder?"primary":"action"})})})]})}),Object(a.jsx)(x.a,{item:!0,xs:12,children:this.renderSliders()}),Object(a.jsx)(x.a,{item:!0,xs:12,sm:3,children:Object(a.jsxs)(S.a,{className:e.fillWidth,variant:"contained",color:this.state.running?this.state.paused?"default":"secondary":"primary",children:[Object(a.jsx)(_.a,{className:e.fillWidth,onClick:this.handleStartStopOnClick,children:this.state.running?Object(a.jsx)(kt.a,{}):Object(a.jsx)(Ct.a,{})}),Object(a.jsx)(_.a,{className:e.fillWidth,disabled:!this.state.running,onClick:function(){t.state.running&&(t.currentCountdown.pause(),t.setState({paused:!t.state.paused}))},children:this.state.paused?Object(a.jsx)(Nt.a,{}):Object(a.jsx)(gt.a,{})})]})}),Object(a.jsx)(x.a,{item:!0,xs:4,sm:3,children:Object(a.jsxs)(v.a,{flexDirection:"column",flex:2,display:"flex",alignItems:"center",children:[Object(a.jsx)(v.a,{display:"flex",children:Object(a.jsx)(g.a,{variant:"subtitle1",children:this.state.running?this.state.paused?"Paused":"Running":"On deck"})}),Object(a.jsx)(v.a,{display:"flex",children:Object(a.jsx)(g.a,{variant:"caption",children:this.currentCountdown.name})})]})}),Object(a.jsx)(x.a,{item:!0,xs:4,sm:3,children:Object(a.jsxs)(v.a,{flexDirection:"column",flex:2,display:"flex",alignItems:"center",children:[Object(a.jsx)(v.a,{display:"flex",children:Object(a.jsx)(g.a,{variant:"subtitle1",children:"Time left"})}),Object(a.jsx)(v.a,{display:"flex",children:Object(a.jsx)(g.a,{variant:"caption",children:rt.seconds(this.state.secondsLeft)})})]})}),Object(a.jsx)(x.a,{item:!0,xs:4,sm:3,children:Object(a.jsxs)(v.a,{flexDirection:"column",flex:2,display:"flex",alignItems:"center",children:[Object(a.jsx)(v.a,{display:"flex",children:Object(a.jsx)(g.a,{variant:"subtitle1",children:"Up next"})}),Object(a.jsx)(v.a,{display:"flex",children:Object(a.jsx)(g.a,{variant:"caption",children:this.getNextCountdown().name})})]})})]})})," "]}),Object(a.jsxs)(x.a,{item:!0,xs:12,md:4,children:[" ",Object(a.jsx)(k.a,{className:e.paperContainer,children:Object(a.jsxs)(x.a,{container:!0,children:[Object(a.jsx)(x.a,{item:!0,xs:12,children:Object(a.jsx)(g.a,{variant:"h3",children:"Schedule"})}),Object(a.jsx)(x.a,{item:!0,xs:12,children:Object(a.jsx)(Tt.a,{utils:_t.a,children:Object(a.jsx)(Et.a,{id:"lunch-time-picker",label:"Lunch",value:this.state.selectedDate,onChange:function(e){t.setState({selectedDate:e}),localStorage.setItem("selectedDate",JSON.stringify(e))},minutesStep:1})})})]})})," "]})]})]})}},{key:"currentCountdown",get:function(){return void 0===this.state.countdowns[this.state.currentCountdownIndex]?(this.setState({currentCountdownIndex:0}),localStorage.setItem("currentCountdownIndex","0"),this.state.countdowns[0]):this.state.countdowns[this.state.currentCountdownIndex]}},{key:"nextCountdownIndex",get:function(){return(this.state.currentCountdownIndex+1)%this.state.countdowns.length}}]),n}(o.Component));l.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(Dt,{})}),document.getElementById("root"))}},[[179,1,2]]]);
//# sourceMappingURL=main.f062c7bf.chunk.js.map
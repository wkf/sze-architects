// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('sze_architects.site');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.fx.dom.Scroll');
if(typeof sze_architects.site.site !== 'undefined'){
} else {
sze_architects.site.site = (function (){var G__20494 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20494) : cljs.core.atom.call(null,G__20494));
})();
}
sze_architects.site.body = document.body;
sze_architects.site.get_element_by_tag = (function sze_architects$site$get_element_by_tag(tag){
return ((function (){var G__20496 = tag;
return goog.dom.getElementsByTagNameAndClass(G__20496);
})()[(0)]);
});
sze_architects.site.get_toggle_menu_button = (function sze_architects$site$get_toggle_menu_button(container){
var G__20499 = "toggle-menu";
var G__20500 = container;
return goog.dom.getElementByClass(G__20499,G__20500);
});
sze_architects.site.scroll_y = (function sze_architects$site$scroll_y(by){
var scroll = (function (){return goog.dom.getDocumentScroll();
})();
return (new goog.fx.dom.Scroll(sze_architects.site.body,[scroll.x,scroll.y],[scroll.x,(scroll.y + by)],(200))).play();
});
/**
 * Start the site. Attempt to be idempotent.
 */
sze_architects.site.start = (function sze_architects$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__20520 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__20520) : cljs.core.deref.call(null,G__20520));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

FastClick.attach(sze_architects.site.body);

var seq__20521 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__20522 = null;
var count__20523 = (0);
var i__20524 = (0);
while(true){
if((i__20524 < count__20523)){
var tag = chunk__20522.cljs$core$IIndexed$_nth$arity$2(null,i__20524);
var el_20539 = sze_architects.site.get_element_by_tag(tag);
var G__20525_20540 = sze_architects.site.get_toggle_menu_button(el_20539);
var G__20526_20541 = "click";
var G__20527_20542 = ((function (seq__20521,chunk__20522,count__20523,i__20524,G__20525_20540,G__20526_20541,el_20539,tag){
return (function (e){
var G__20528_20543 = sze_architects.site.body;
var G__20529_20544 = [cljs.core.str("show-"),cljs.core.str(tag),cljs.core.str("-menu")].join('');
goog.dom.classlist.toggle(G__20528_20543,G__20529_20544);

if(cljs.core.truth_((function (){var G__20530 = sze_architects.site.body;
var G__20531 = [cljs.core.str("show-"),cljs.core.str(tag),cljs.core.str("-menu")].join('');
return goog.dom.classlist.contains(G__20530,G__20531);
})())){
return sze_architects.site.scroll_y(el_20539.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__20521,chunk__20522,count__20523,i__20524,G__20525_20540,G__20526_20541,el_20539,tag))
;
goog.events.listen(G__20525_20540,G__20526_20541,G__20527_20542);

var G__20545 = seq__20521;
var G__20546 = chunk__20522;
var G__20547 = count__20523;
var G__20548 = (i__20524 + (1));
seq__20521 = G__20545;
chunk__20522 = G__20546;
count__20523 = G__20547;
i__20524 = G__20548;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__20521);
if(temp__4425__auto__){
var seq__20521__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20521__$1)){
var c__15771__auto__ = cljs.core.chunk_first(seq__20521__$1);
var G__20549 = cljs.core.chunk_rest(seq__20521__$1);
var G__20550 = c__15771__auto__;
var G__20551 = cljs.core.count(c__15771__auto__);
var G__20552 = (0);
seq__20521 = G__20549;
chunk__20522 = G__20550;
count__20523 = G__20551;
i__20524 = G__20552;
continue;
} else {
var tag = cljs.core.first(seq__20521__$1);
var el_20553 = sze_architects.site.get_element_by_tag(tag);
var G__20532_20554 = sze_architects.site.get_toggle_menu_button(el_20553);
var G__20533_20555 = "click";
var G__20534_20556 = ((function (seq__20521,chunk__20522,count__20523,i__20524,G__20532_20554,G__20533_20555,el_20553,tag,seq__20521__$1,temp__4425__auto__){
return (function (e){
var G__20535_20557 = sze_architects.site.body;
var G__20536_20558 = [cljs.core.str("show-"),cljs.core.str(tag),cljs.core.str("-menu")].join('');
goog.dom.classlist.toggle(G__20535_20557,G__20536_20558);

if(cljs.core.truth_((function (){var G__20537 = sze_architects.site.body;
var G__20538 = [cljs.core.str("show-"),cljs.core.str(tag),cljs.core.str("-menu")].join('');
return goog.dom.classlist.contains(G__20537,G__20538);
})())){
return sze_architects.site.scroll_y(el_20553.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__20521,chunk__20522,count__20523,i__20524,G__20532_20554,G__20533_20555,el_20553,tag,seq__20521__$1,temp__4425__auto__))
;
goog.events.listen(G__20532_20554,G__20533_20555,G__20534_20556);

var G__20559 = cljs.core.next(seq__20521__$1);
var G__20560 = null;
var G__20561 = (0);
var G__20562 = (0);
seq__20521 = G__20559;
chunk__20522 = G__20560;
count__20523 = G__20561;
i__20524 = G__20562;
continue;
}
} else {
return null;
}
}
break;
}
}
});
/**
 * Stop the site. Attempt to be idempotent. Useful for interactive local development.
 */
sze_architects.site.stop = (function sze_architects$site$stop(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__20572 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__20572) : cljs.core.deref.call(null,G__20572));
})()))){
var seq__20573_20581 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__20574_20582 = null;
var count__20575_20583 = (0);
var i__20576_20584 = (0);
while(true){
if((i__20576_20584 < count__20575_20583)){
var tag_20585 = chunk__20574_20582.cljs$core$IIndexed$_nth$arity$2(null,i__20576_20584);
var G__20577_20586 = sze_architects.site.get_toggle_menu_button(sze_architects.site.get_element_by_tag(tag_20585));
var G__20578_20587 = "click";
goog.events.removeAll(G__20577_20586,G__20578_20587);

var G__20588 = seq__20573_20581;
var G__20589 = chunk__20574_20582;
var G__20590 = count__20575_20583;
var G__20591 = (i__20576_20584 + (1));
seq__20573_20581 = G__20588;
chunk__20574_20582 = G__20589;
count__20575_20583 = G__20590;
i__20576_20584 = G__20591;
continue;
} else {
var temp__4425__auto___20592 = cljs.core.seq(seq__20573_20581);
if(temp__4425__auto___20592){
var seq__20573_20593__$1 = temp__4425__auto___20592;
if(cljs.core.chunked_seq_QMARK_(seq__20573_20593__$1)){
var c__15771__auto___20594 = cljs.core.chunk_first(seq__20573_20593__$1);
var G__20595 = cljs.core.chunk_rest(seq__20573_20593__$1);
var G__20596 = c__15771__auto___20594;
var G__20597 = cljs.core.count(c__15771__auto___20594);
var G__20598 = (0);
seq__20573_20581 = G__20595;
chunk__20574_20582 = G__20596;
count__20575_20583 = G__20597;
i__20576_20584 = G__20598;
continue;
} else {
var tag_20599 = cljs.core.first(seq__20573_20593__$1);
var G__20579_20600 = sze_architects.site.get_toggle_menu_button(sze_architects.site.get_element_by_tag(tag_20599));
var G__20580_20601 = "click";
goog.events.removeAll(G__20579_20600,G__20580_20601);

var G__20602 = cljs.core.next(seq__20573_20593__$1);
var G__20603 = null;
var G__20604 = (0);
var G__20605 = (0);
seq__20573_20581 = G__20602;
chunk__20574_20582 = G__20603;
count__20575_20583 = G__20604;
i__20576_20584 = G__20605;
continue;
}
} else {
}
}
break;
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,false);
} else {
return null;
}
});
sze_architects.site.start();

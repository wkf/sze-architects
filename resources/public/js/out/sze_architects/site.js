// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('sze_architects.site');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
if(typeof sze_architects.site.site !== 'undefined'){
} else {
sze_architects.site.site = (function (){var G__20493 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20493) : cljs.core.atom.call(null,G__20493));
})();
}
sze_architects.site.body = document.body;
sze_architects.site.find_toggle_menu_button = (function sze_architects$site$find_toggle_menu_button(tag){
var G__20497 = "toggle-menu";
var G__20498 = ((function (){var G__20499 = tag;
return goog.dom.getElementsByTagNameAndClass(G__20499);
})()[(0)]);
return goog.dom.getElementByClass(G__20497,G__20498);
});
/**
 * Start the site. Attempt to be idempotent.
 */
sze_architects.site.start = (function sze_architects$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__20515 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__20515) : cljs.core.deref.call(null,G__20515));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

FastClick.attach(sze_architects.site.body);

var seq__20516 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__20517 = null;
var count__20518 = (0);
var i__20519 = (0);
while(true){
if((i__20519 < count__20518)){
var tag = chunk__20517.cljs$core$IIndexed$_nth$arity$2(null,i__20519);
var G__20520_20530 = sze_architects.site.find_toggle_menu_button(tag);
var G__20521_20531 = "click";
var G__20522_20532 = ((function (seq__20516,chunk__20517,count__20518,i__20519,G__20520_20530,G__20521_20531,tag){
return (function (e){
var G__20523 = sze_architects.site.body;
var G__20524 = [cljs.core.str("show-"),cljs.core.str(tag),cljs.core.str("-menu")].join('');
return goog.dom.classes.toggle(G__20523,G__20524);
});})(seq__20516,chunk__20517,count__20518,i__20519,G__20520_20530,G__20521_20531,tag))
;
goog.events.listen(G__20520_20530,G__20521_20531,G__20522_20532);

var G__20533 = seq__20516;
var G__20534 = chunk__20517;
var G__20535 = count__20518;
var G__20536 = (i__20519 + (1));
seq__20516 = G__20533;
chunk__20517 = G__20534;
count__20518 = G__20535;
i__20519 = G__20536;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__20516);
if(temp__4425__auto__){
var seq__20516__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20516__$1)){
var c__15770__auto__ = cljs.core.chunk_first(seq__20516__$1);
var G__20537 = cljs.core.chunk_rest(seq__20516__$1);
var G__20538 = c__15770__auto__;
var G__20539 = cljs.core.count(c__15770__auto__);
var G__20540 = (0);
seq__20516 = G__20537;
chunk__20517 = G__20538;
count__20518 = G__20539;
i__20519 = G__20540;
continue;
} else {
var tag = cljs.core.first(seq__20516__$1);
var G__20525_20541 = sze_architects.site.find_toggle_menu_button(tag);
var G__20526_20542 = "click";
var G__20527_20543 = ((function (seq__20516,chunk__20517,count__20518,i__20519,G__20525_20541,G__20526_20542,tag,seq__20516__$1,temp__4425__auto__){
return (function (e){
var G__20528 = sze_architects.site.body;
var G__20529 = [cljs.core.str("show-"),cljs.core.str(tag),cljs.core.str("-menu")].join('');
return goog.dom.classes.toggle(G__20528,G__20529);
});})(seq__20516,chunk__20517,count__20518,i__20519,G__20525_20541,G__20526_20542,tag,seq__20516__$1,temp__4425__auto__))
;
goog.events.listen(G__20525_20541,G__20526_20542,G__20527_20543);

var G__20544 = cljs.core.next(seq__20516__$1);
var G__20545 = null;
var G__20546 = (0);
var G__20547 = (0);
seq__20516 = G__20544;
chunk__20517 = G__20545;
count__20518 = G__20546;
i__20519 = G__20547;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__20557 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__20557) : cljs.core.deref.call(null,G__20557));
})()))){
var seq__20558_20566 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__20559_20567 = null;
var count__20560_20568 = (0);
var i__20561_20569 = (0);
while(true){
if((i__20561_20569 < count__20560_20568)){
var tag_20570 = chunk__20559_20567.cljs$core$IIndexed$_nth$arity$2(null,i__20561_20569);
var G__20562_20571 = sze_architects.site.find_toggle_menu_button(tag_20570);
var G__20563_20572 = "click";
goog.events.removeAll(G__20562_20571,G__20563_20572);

var G__20573 = seq__20558_20566;
var G__20574 = chunk__20559_20567;
var G__20575 = count__20560_20568;
var G__20576 = (i__20561_20569 + (1));
seq__20558_20566 = G__20573;
chunk__20559_20567 = G__20574;
count__20560_20568 = G__20575;
i__20561_20569 = G__20576;
continue;
} else {
var temp__4425__auto___20577 = cljs.core.seq(seq__20558_20566);
if(temp__4425__auto___20577){
var seq__20558_20578__$1 = temp__4425__auto___20577;
if(cljs.core.chunked_seq_QMARK_(seq__20558_20578__$1)){
var c__15770__auto___20579 = cljs.core.chunk_first(seq__20558_20578__$1);
var G__20580 = cljs.core.chunk_rest(seq__20558_20578__$1);
var G__20581 = c__15770__auto___20579;
var G__20582 = cljs.core.count(c__15770__auto___20579);
var G__20583 = (0);
seq__20558_20566 = G__20580;
chunk__20559_20567 = G__20581;
count__20560_20568 = G__20582;
i__20561_20569 = G__20583;
continue;
} else {
var tag_20584 = cljs.core.first(seq__20558_20578__$1);
var G__20564_20585 = sze_architects.site.find_toggle_menu_button(tag_20584);
var G__20565_20586 = "click";
goog.events.removeAll(G__20564_20585,G__20565_20586);

var G__20587 = cljs.core.next(seq__20558_20578__$1);
var G__20588 = null;
var G__20589 = (0);
var G__20590 = (0);
seq__20558_20566 = G__20587;
chunk__20559_20567 = G__20588;
count__20560_20568 = G__20589;
i__20561_20569 = G__20590;
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

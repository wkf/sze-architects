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
sze_architects.site.find_body = (function sze_architects$site$find_body(){
return ((function (){var G__20495 = "body";
return goog.dom.getElementsByTagNameAndClass(G__20495);
})()[(0)]);
});
sze_architects.site.find_toggle_menu_button = (function sze_architects$site$find_toggle_menu_button(tag){
var G__20499 = "toggle-menu";
var G__20500 = ((function (){var G__20501 = tag;
return goog.dom.getElementsByTagNameAndClass(G__20501);
})()[(0)]);
return goog.dom.getElementByClass(G__20499,G__20500);
});
/**
 * Start the site. Attempt to be idempotent.
 */
sze_architects.site.start = (function sze_architects$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__20517 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__20517) : cljs.core.deref.call(null,G__20517));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

var body = sze_architects.site.find_body();
var seq__20518 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__20519 = null;
var count__20520 = (0);
var i__20521 = (0);
while(true){
if((i__20521 < count__20520)){
var tag = chunk__20519.cljs$core$IIndexed$_nth$arity$2(null,i__20521);
var G__20522_20532 = sze_architects.site.find_toggle_menu_button(tag);
var G__20523_20533 = "click";
var G__20524_20534 = ((function (seq__20518,chunk__20519,count__20520,i__20521,G__20522_20532,G__20523_20533,tag,body){
return (function (e){
var G__20525 = body;
var G__20526 = [cljs.core.str("show-"),cljs.core.str(tag),cljs.core.str("-menu")].join('');
return goog.dom.classes.toggle(G__20525,G__20526);
});})(seq__20518,chunk__20519,count__20520,i__20521,G__20522_20532,G__20523_20533,tag,body))
;
goog.events.listen(G__20522_20532,G__20523_20533,G__20524_20534);

var G__20535 = seq__20518;
var G__20536 = chunk__20519;
var G__20537 = count__20520;
var G__20538 = (i__20521 + (1));
seq__20518 = G__20535;
chunk__20519 = G__20536;
count__20520 = G__20537;
i__20521 = G__20538;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__20518);
if(temp__4425__auto__){
var seq__20518__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20518__$1)){
var c__15770__auto__ = cljs.core.chunk_first(seq__20518__$1);
var G__20539 = cljs.core.chunk_rest(seq__20518__$1);
var G__20540 = c__15770__auto__;
var G__20541 = cljs.core.count(c__15770__auto__);
var G__20542 = (0);
seq__20518 = G__20539;
chunk__20519 = G__20540;
count__20520 = G__20541;
i__20521 = G__20542;
continue;
} else {
var tag = cljs.core.first(seq__20518__$1);
var G__20527_20543 = sze_architects.site.find_toggle_menu_button(tag);
var G__20528_20544 = "click";
var G__20529_20545 = ((function (seq__20518,chunk__20519,count__20520,i__20521,G__20527_20543,G__20528_20544,tag,seq__20518__$1,temp__4425__auto__,body){
return (function (e){
var G__20530 = body;
var G__20531 = [cljs.core.str("show-"),cljs.core.str(tag),cljs.core.str("-menu")].join('');
return goog.dom.classes.toggle(G__20530,G__20531);
});})(seq__20518,chunk__20519,count__20520,i__20521,G__20527_20543,G__20528_20544,tag,seq__20518__$1,temp__4425__auto__,body))
;
goog.events.listen(G__20527_20543,G__20528_20544,G__20529_20545);

var G__20546 = cljs.core.next(seq__20518__$1);
var G__20547 = null;
var G__20548 = (0);
var G__20549 = (0);
seq__20518 = G__20546;
chunk__20519 = G__20547;
count__20520 = G__20548;
i__20521 = G__20549;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__20559 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__20559) : cljs.core.deref.call(null,G__20559));
})()))){
var seq__20560_20568 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__20561_20569 = null;
var count__20562_20570 = (0);
var i__20563_20571 = (0);
while(true){
if((i__20563_20571 < count__20562_20570)){
var tag_20572 = chunk__20561_20569.cljs$core$IIndexed$_nth$arity$2(null,i__20563_20571);
var G__20564_20573 = sze_architects.site.find_toggle_menu_button(tag_20572);
var G__20565_20574 = "click";
goog.events.removeAll(G__20564_20573,G__20565_20574);

var G__20575 = seq__20560_20568;
var G__20576 = chunk__20561_20569;
var G__20577 = count__20562_20570;
var G__20578 = (i__20563_20571 + (1));
seq__20560_20568 = G__20575;
chunk__20561_20569 = G__20576;
count__20562_20570 = G__20577;
i__20563_20571 = G__20578;
continue;
} else {
var temp__4425__auto___20579 = cljs.core.seq(seq__20560_20568);
if(temp__4425__auto___20579){
var seq__20560_20580__$1 = temp__4425__auto___20579;
if(cljs.core.chunked_seq_QMARK_(seq__20560_20580__$1)){
var c__15770__auto___20581 = cljs.core.chunk_first(seq__20560_20580__$1);
var G__20582 = cljs.core.chunk_rest(seq__20560_20580__$1);
var G__20583 = c__15770__auto___20581;
var G__20584 = cljs.core.count(c__15770__auto___20581);
var G__20585 = (0);
seq__20560_20568 = G__20582;
chunk__20561_20569 = G__20583;
count__20562_20570 = G__20584;
i__20563_20571 = G__20585;
continue;
} else {
var tag_20586 = cljs.core.first(seq__20560_20580__$1);
var G__20566_20587 = sze_architects.site.find_toggle_menu_button(tag_20586);
var G__20567_20588 = "click";
goog.events.removeAll(G__20566_20587,G__20567_20588);

var G__20589 = cljs.core.next(seq__20560_20580__$1);
var G__20590 = null;
var G__20591 = (0);
var G__20592 = (0);
seq__20560_20568 = G__20589;
chunk__20561_20569 = G__20590;
count__20562_20570 = G__20591;
i__20563_20571 = G__20592;
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

// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('sze_architects.site');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.fx.dom.Scroll');
NodeList.prototype.cljs$core$ISeqable$ = true;

NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (array){
var array__$1 = this;
return cljs.core.array_seq.cljs$core$IFn$_invoke$arity$2(array__$1,(0));
});
if(typeof sze_architects.site.site !== 'undefined'){
} else {
sze_architects.site.site = (function (){var G__25523 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__25523) : cljs.core.atom.call(null,G__25523));
})();
}
sze_architects.site.get_element_by_tag = (function sze_architects$site$get_element_by_tag(tag){
return cljs.core.first((function (){var G__25525 = tag;
return goog.dom.getElementsByTagNameAndClass(G__25525);
})());
});
sze_architects.site.get_toggle_menu_buttons = (function sze_architects$site$get_toggle_menu_buttons(container){
var G__25528 = "toggle-menu";
var G__25529 = container;
return goog.dom.getElementsByClass(G__25528,G__25529);
});
sze_architects.site.body = document.body;
sze_architects.site.header = sze_architects.site.get_element_by_tag("header");
sze_architects.site.footer = sze_architects.site.get_element_by_tag("footer");
/**
 * https://groups.google.com/forum/#!msg/closure-library-discuss/8XhcwWP4Jks/OUbDyHICfUEJ
 */
sze_architects.site.get_scroll_container = (function sze_architects$site$get_scroll_container(){
var document_element = window.document.documentElement;
document_element.scrollTop = (1);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(document_element.scrollTop,(1))){
document_element.scrollTop = (0);

return document_element;
} else {
return sze_architects.site.body;
}
});
sze_architects.site.scroll_y = (function sze_architects$site$scroll_y(by){
var scroll = (function (){return goog.dom.getDocumentScroll();
})();
var container = sze_architects.site.get_scroll_container();
return (new goog.fx.dom.Scroll(container,[scroll.x,scroll.y],[scroll.x,(scroll.y + by)],(500))).play();
});
/**
 * http://stackoverflow.com/a/17234319/102622
 */
sze_architects.site.refresh_element = (function sze_architects$site$refresh_element(el){
var parent = el.parentNode;
var sibling = el.nextSibling;
parent.removeChild(el);

return window.setTimeout(((function (parent,sibling){
return (function (){
return parent.insertBefore(el,sibling);
});})(parent,sibling))
,(0));
});
/**
 * Start the site. Attempt to be idempotent.
 */
sze_architects.site.start = (function sze_architects$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__25589 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25589) : cljs.core.deref.call(null,G__25589));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true,cljs.core.array_seq([cljs.core.constant$keyword$dropkick,(new window.Dropkick("#project-field",{"mobile": true})),cljs.core.constant$keyword$fastclick,FastClick.attach(sze_architects.site.body)], 0));

if(cljs.core.not('ontouchstart' in window)){
var G__25590_25648 = sze_architects.site.body;
var G__25591_25649 = "no-touch";
var G__25592_25650 = true;
goog.dom.classlist.enable(G__25590_25648,G__25591_25649,G__25592_25650);
} else {
var seq__25593_25651 = cljs.core.seq((function (){var G__25597 = "image-card";
return goog.dom.getElementsByClass(G__25597);
})());
var chunk__25594_25652 = null;
var count__25595_25653 = (0);
var i__25596_25654 = (0);
while(true){
if((i__25596_25654 < count__25595_25653)){
var el_25655 = chunk__25594_25652.cljs$core$IIndexed$_nth$arity$2(null,i__25596_25654);
var G__25598_25656 = el_25655;
var G__25599_25657 = "click";
var G__25600_25658 = ((function (seq__25593_25651,chunk__25594_25652,count__25595_25653,i__25596_25654,G__25598_25656,G__25599_25657,el_25655){
return (function (){
var G__25601 = el_25655;
var G__25602 = "show-overlay";
return goog.dom.classlist.toggle(G__25601,G__25602);
});})(seq__25593_25651,chunk__25594_25652,count__25595_25653,i__25596_25654,G__25598_25656,G__25599_25657,el_25655))
;
goog.events.listen(G__25598_25656,G__25599_25657,G__25600_25658);

var G__25659 = seq__25593_25651;
var G__25660 = chunk__25594_25652;
var G__25661 = count__25595_25653;
var G__25662 = (i__25596_25654 + (1));
seq__25593_25651 = G__25659;
chunk__25594_25652 = G__25660;
count__25595_25653 = G__25661;
i__25596_25654 = G__25662;
continue;
} else {
var temp__4425__auto___25663 = cljs.core.seq(seq__25593_25651);
if(temp__4425__auto___25663){
var seq__25593_25664__$1 = temp__4425__auto___25663;
if(cljs.core.chunked_seq_QMARK_(seq__25593_25664__$1)){
var c__20800__auto___25665 = cljs.core.chunk_first(seq__25593_25664__$1);
var G__25666 = cljs.core.chunk_rest(seq__25593_25664__$1);
var G__25667 = c__20800__auto___25665;
var G__25668 = cljs.core.count(c__20800__auto___25665);
var G__25669 = (0);
seq__25593_25651 = G__25666;
chunk__25594_25652 = G__25667;
count__25595_25653 = G__25668;
i__25596_25654 = G__25669;
continue;
} else {
var el_25670 = cljs.core.first(seq__25593_25664__$1);
var G__25603_25671 = el_25670;
var G__25604_25672 = "click";
var G__25605_25673 = ((function (seq__25593_25651,chunk__25594_25652,count__25595_25653,i__25596_25654,G__25603_25671,G__25604_25672,el_25670,seq__25593_25664__$1,temp__4425__auto___25663){
return (function (){
var G__25606 = el_25670;
var G__25607 = "show-overlay";
return goog.dom.classlist.toggle(G__25606,G__25607);
});})(seq__25593_25651,chunk__25594_25652,count__25595_25653,i__25596_25654,G__25603_25671,G__25604_25672,el_25670,seq__25593_25664__$1,temp__4425__auto___25663))
;
goog.events.listen(G__25603_25671,G__25604_25672,G__25605_25673);

var G__25674 = cljs.core.next(seq__25593_25664__$1);
var G__25675 = null;
var G__25676 = (0);
var G__25677 = (0);
seq__25593_25651 = G__25674;
chunk__25594_25652 = G__25675;
count__25595_25653 = G__25676;
i__25596_25654 = G__25677;
continue;
}
} else {
}
}
break;
}
}

var seq__25608 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sze_architects.site.header,sze_architects.site.footer], null));
var chunk__25613 = null;
var count__25614 = (0);
var i__25615 = (0);
while(true){
if((i__25615 < count__25614)){
var el = chunk__25613.cljs$core$IIndexed$_nth$arity$2(null,i__25615);
var seq__25616_25678 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__25617_25679 = null;
var count__25618_25680 = (0);
var i__25619_25681 = (0);
while(true){
if((i__25619_25681 < count__25618_25680)){
var button_el_25682 = chunk__25617_25679.cljs$core$IIndexed$_nth$arity$2(null,i__25619_25681);
var G__25620_25683 = button_el_25682;
var G__25621_25684 = "click";
var G__25622_25685 = ((function (seq__25616_25678,chunk__25617_25679,count__25618_25680,i__25619_25681,seq__25608,chunk__25613,count__25614,i__25615,G__25620_25683,G__25621_25684,button_el_25682,el){
return (function (e){
var G__25623_25686 = el;
var G__25624_25687 = "show-menu";
goog.dom.classlist.toggle(G__25623_25686,G__25624_25687);

if(cljs.core.truth_((function (){var G__25625 = el;
var G__25626 = "show-menu";
return goog.dom.classlist.contains(G__25625,G__25626);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__25616_25678,chunk__25617_25679,count__25618_25680,i__25619_25681,seq__25608,chunk__25613,count__25614,i__25615,G__25620_25683,G__25621_25684,button_el_25682,el))
;
goog.events.listen(G__25620_25683,G__25621_25684,G__25622_25685);

var G__25688 = seq__25616_25678;
var G__25689 = chunk__25617_25679;
var G__25690 = count__25618_25680;
var G__25691 = (i__25619_25681 + (1));
seq__25616_25678 = G__25688;
chunk__25617_25679 = G__25689;
count__25618_25680 = G__25690;
i__25619_25681 = G__25691;
continue;
} else {
var temp__4425__auto___25692 = cljs.core.seq(seq__25616_25678);
if(temp__4425__auto___25692){
var seq__25616_25693__$1 = temp__4425__auto___25692;
if(cljs.core.chunked_seq_QMARK_(seq__25616_25693__$1)){
var c__20800__auto___25694 = cljs.core.chunk_first(seq__25616_25693__$1);
var G__25695 = cljs.core.chunk_rest(seq__25616_25693__$1);
var G__25696 = c__20800__auto___25694;
var G__25697 = cljs.core.count(c__20800__auto___25694);
var G__25698 = (0);
seq__25616_25678 = G__25695;
chunk__25617_25679 = G__25696;
count__25618_25680 = G__25697;
i__25619_25681 = G__25698;
continue;
} else {
var button_el_25699 = cljs.core.first(seq__25616_25693__$1);
var G__25627_25700 = button_el_25699;
var G__25628_25701 = "click";
var G__25629_25702 = ((function (seq__25616_25678,chunk__25617_25679,count__25618_25680,i__25619_25681,seq__25608,chunk__25613,count__25614,i__25615,G__25627_25700,G__25628_25701,button_el_25699,seq__25616_25693__$1,temp__4425__auto___25692,el){
return (function (e){
var G__25630_25703 = el;
var G__25631_25704 = "show-menu";
goog.dom.classlist.toggle(G__25630_25703,G__25631_25704);

if(cljs.core.truth_((function (){var G__25632 = el;
var G__25633 = "show-menu";
return goog.dom.classlist.contains(G__25632,G__25633);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__25616_25678,chunk__25617_25679,count__25618_25680,i__25619_25681,seq__25608,chunk__25613,count__25614,i__25615,G__25627_25700,G__25628_25701,button_el_25699,seq__25616_25693__$1,temp__4425__auto___25692,el))
;
goog.events.listen(G__25627_25700,G__25628_25701,G__25629_25702);

var G__25705 = cljs.core.next(seq__25616_25693__$1);
var G__25706 = null;
var G__25707 = (0);
var G__25708 = (0);
seq__25616_25678 = G__25705;
chunk__25617_25679 = G__25706;
count__25618_25680 = G__25707;
i__25619_25681 = G__25708;
continue;
}
} else {
}
}
break;
}

var G__25709 = seq__25608;
var G__25710 = chunk__25613;
var G__25711 = count__25614;
var G__25712 = (i__25615 + (1));
seq__25608 = G__25709;
chunk__25613 = G__25710;
count__25614 = G__25711;
i__25615 = G__25712;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__25608);
if(temp__4425__auto__){
var seq__25608__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__25608__$1)){
var c__20800__auto__ = cljs.core.chunk_first(seq__25608__$1);
var G__25713 = cljs.core.chunk_rest(seq__25608__$1);
var G__25714 = c__20800__auto__;
var G__25715 = cljs.core.count(c__20800__auto__);
var G__25716 = (0);
seq__25608 = G__25713;
chunk__25613 = G__25714;
count__25614 = G__25715;
i__25615 = G__25716;
continue;
} else {
var el = cljs.core.first(seq__25608__$1);
var seq__25609_25717 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__25610_25718 = null;
var count__25611_25719 = (0);
var i__25612_25720 = (0);
while(true){
if((i__25612_25720 < count__25611_25719)){
var button_el_25721 = chunk__25610_25718.cljs$core$IIndexed$_nth$arity$2(null,i__25612_25720);
var G__25634_25722 = button_el_25721;
var G__25635_25723 = "click";
var G__25636_25724 = ((function (seq__25609_25717,chunk__25610_25718,count__25611_25719,i__25612_25720,seq__25608,chunk__25613,count__25614,i__25615,G__25634_25722,G__25635_25723,button_el_25721,el,seq__25608__$1,temp__4425__auto__){
return (function (e){
var G__25637_25725 = el;
var G__25638_25726 = "show-menu";
goog.dom.classlist.toggle(G__25637_25725,G__25638_25726);

if(cljs.core.truth_((function (){var G__25639 = el;
var G__25640 = "show-menu";
return goog.dom.classlist.contains(G__25639,G__25640);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__25609_25717,chunk__25610_25718,count__25611_25719,i__25612_25720,seq__25608,chunk__25613,count__25614,i__25615,G__25634_25722,G__25635_25723,button_el_25721,el,seq__25608__$1,temp__4425__auto__))
;
goog.events.listen(G__25634_25722,G__25635_25723,G__25636_25724);

var G__25727 = seq__25609_25717;
var G__25728 = chunk__25610_25718;
var G__25729 = count__25611_25719;
var G__25730 = (i__25612_25720 + (1));
seq__25609_25717 = G__25727;
chunk__25610_25718 = G__25728;
count__25611_25719 = G__25729;
i__25612_25720 = G__25730;
continue;
} else {
var temp__4425__auto___25731__$1 = cljs.core.seq(seq__25609_25717);
if(temp__4425__auto___25731__$1){
var seq__25609_25732__$1 = temp__4425__auto___25731__$1;
if(cljs.core.chunked_seq_QMARK_(seq__25609_25732__$1)){
var c__20800__auto___25733 = cljs.core.chunk_first(seq__25609_25732__$1);
var G__25734 = cljs.core.chunk_rest(seq__25609_25732__$1);
var G__25735 = c__20800__auto___25733;
var G__25736 = cljs.core.count(c__20800__auto___25733);
var G__25737 = (0);
seq__25609_25717 = G__25734;
chunk__25610_25718 = G__25735;
count__25611_25719 = G__25736;
i__25612_25720 = G__25737;
continue;
} else {
var button_el_25738 = cljs.core.first(seq__25609_25732__$1);
var G__25641_25739 = button_el_25738;
var G__25642_25740 = "click";
var G__25643_25741 = ((function (seq__25609_25717,chunk__25610_25718,count__25611_25719,i__25612_25720,seq__25608,chunk__25613,count__25614,i__25615,G__25641_25739,G__25642_25740,button_el_25738,seq__25609_25732__$1,temp__4425__auto___25731__$1,el,seq__25608__$1,temp__4425__auto__){
return (function (e){
var G__25644_25742 = el;
var G__25645_25743 = "show-menu";
goog.dom.classlist.toggle(G__25644_25742,G__25645_25743);

if(cljs.core.truth_((function (){var G__25646 = el;
var G__25647 = "show-menu";
return goog.dom.classlist.contains(G__25646,G__25647);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__25609_25717,chunk__25610_25718,count__25611_25719,i__25612_25720,seq__25608,chunk__25613,count__25614,i__25615,G__25641_25739,G__25642_25740,button_el_25738,seq__25609_25732__$1,temp__4425__auto___25731__$1,el,seq__25608__$1,temp__4425__auto__))
;
goog.events.listen(G__25641_25739,G__25642_25740,G__25643_25741);

var G__25744 = cljs.core.next(seq__25609_25732__$1);
var G__25745 = null;
var G__25746 = (0);
var G__25747 = (0);
seq__25609_25717 = G__25744;
chunk__25610_25718 = G__25745;
count__25611_25719 = G__25746;
i__25612_25720 = G__25747;
continue;
}
} else {
}
}
break;
}

var G__25748 = cljs.core.next(seq__25608__$1);
var G__25749 = null;
var G__25750 = (0);
var G__25751 = (0);
seq__25608 = G__25748;
chunk__25613 = G__25749;
count__25614 = G__25750;
i__25615 = G__25751;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__25787 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25787) : cljs.core.deref.call(null,G__25787));
})()))){
var temp__4425__auto___25822 = cljs.core.constant$keyword$dropkick.cljs$core$IFn$_invoke$arity$1((function (){var G__25788 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25788) : cljs.core.deref.call(null,G__25788));
})());
if(cljs.core.truth_(temp__4425__auto___25822)){
var dropkick_25823 = temp__4425__auto___25822;
dropkick_25823.dispose();
} else {
}

var temp__4425__auto___25824 = cljs.core.constant$keyword$fastclick.cljs$core$IFn$_invoke$arity$1((function (){var G__25789 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25789) : cljs.core.deref.call(null,G__25789));
})());
if(cljs.core.truth_(temp__4425__auto___25824)){
var fastclick_25825 = temp__4425__auto___25824;
fastclick_25825.destroy();
} else {
}

var G__25790_25826 = sze_architects.site.body;
var G__25791_25827 = "no-touch";
var G__25792_25828 = false;
goog.dom.classlist.enable(G__25790_25826,G__25791_25827,G__25792_25828);

var seq__25793_25829 = cljs.core.seq((function (){var G__25797 = "image-card";
return goog.dom.getElementsByClass(G__25797);
})());
var chunk__25794_25830 = null;
var count__25795_25831 = (0);
var i__25796_25832 = (0);
while(true){
if((i__25796_25832 < count__25795_25831)){
var el_25833 = chunk__25794_25830.cljs$core$IIndexed$_nth$arity$2(null,i__25796_25832);
var G__25798_25834 = el_25833;
var G__25799_25835 = "click";
goog.events.removeAll(G__25798_25834,G__25799_25835);

var G__25836 = seq__25793_25829;
var G__25837 = chunk__25794_25830;
var G__25838 = count__25795_25831;
var G__25839 = (i__25796_25832 + (1));
seq__25793_25829 = G__25836;
chunk__25794_25830 = G__25837;
count__25795_25831 = G__25838;
i__25796_25832 = G__25839;
continue;
} else {
var temp__4425__auto___25840 = cljs.core.seq(seq__25793_25829);
if(temp__4425__auto___25840){
var seq__25793_25841__$1 = temp__4425__auto___25840;
if(cljs.core.chunked_seq_QMARK_(seq__25793_25841__$1)){
var c__20800__auto___25842 = cljs.core.chunk_first(seq__25793_25841__$1);
var G__25843 = cljs.core.chunk_rest(seq__25793_25841__$1);
var G__25844 = c__20800__auto___25842;
var G__25845 = cljs.core.count(c__20800__auto___25842);
var G__25846 = (0);
seq__25793_25829 = G__25843;
chunk__25794_25830 = G__25844;
count__25795_25831 = G__25845;
i__25796_25832 = G__25846;
continue;
} else {
var el_25847 = cljs.core.first(seq__25793_25841__$1);
var G__25800_25848 = el_25847;
var G__25801_25849 = "click";
goog.events.removeAll(G__25800_25848,G__25801_25849);

var G__25850 = cljs.core.next(seq__25793_25841__$1);
var G__25851 = null;
var G__25852 = (0);
var G__25853 = (0);
seq__25793_25829 = G__25850;
chunk__25794_25830 = G__25851;
count__25795_25831 = G__25852;
i__25796_25832 = G__25853;
continue;
}
} else {
}
}
break;
}

var seq__25802_25854 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__25803_25855 = null;
var count__25804_25856 = (0);
var i__25805_25857 = (0);
while(true){
if((i__25805_25857 < count__25804_25856)){
var tag_25858 = chunk__25803_25855.cljs$core$IIndexed$_nth$arity$2(null,i__25805_25857);
var seq__25806_25859 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_25858)));
var chunk__25807_25860 = null;
var count__25808_25861 = (0);
var i__25809_25862 = (0);
while(true){
if((i__25809_25862 < count__25808_25861)){
var button_25863 = chunk__25807_25860.cljs$core$IIndexed$_nth$arity$2(null,i__25809_25862);
var G__25810_25864 = button_25863;
var G__25811_25865 = "click";
goog.events.removeAll(G__25810_25864,G__25811_25865);

var G__25866 = seq__25806_25859;
var G__25867 = chunk__25807_25860;
var G__25868 = count__25808_25861;
var G__25869 = (i__25809_25862 + (1));
seq__25806_25859 = G__25866;
chunk__25807_25860 = G__25867;
count__25808_25861 = G__25868;
i__25809_25862 = G__25869;
continue;
} else {
var temp__4425__auto___25870 = cljs.core.seq(seq__25806_25859);
if(temp__4425__auto___25870){
var seq__25806_25871__$1 = temp__4425__auto___25870;
if(cljs.core.chunked_seq_QMARK_(seq__25806_25871__$1)){
var c__20800__auto___25872 = cljs.core.chunk_first(seq__25806_25871__$1);
var G__25873 = cljs.core.chunk_rest(seq__25806_25871__$1);
var G__25874 = c__20800__auto___25872;
var G__25875 = cljs.core.count(c__20800__auto___25872);
var G__25876 = (0);
seq__25806_25859 = G__25873;
chunk__25807_25860 = G__25874;
count__25808_25861 = G__25875;
i__25809_25862 = G__25876;
continue;
} else {
var button_25877 = cljs.core.first(seq__25806_25871__$1);
var G__25812_25878 = button_25877;
var G__25813_25879 = "click";
goog.events.removeAll(G__25812_25878,G__25813_25879);

var G__25880 = cljs.core.next(seq__25806_25871__$1);
var G__25881 = null;
var G__25882 = (0);
var G__25883 = (0);
seq__25806_25859 = G__25880;
chunk__25807_25860 = G__25881;
count__25808_25861 = G__25882;
i__25809_25862 = G__25883;
continue;
}
} else {
}
}
break;
}

var G__25884 = seq__25802_25854;
var G__25885 = chunk__25803_25855;
var G__25886 = count__25804_25856;
var G__25887 = (i__25805_25857 + (1));
seq__25802_25854 = G__25884;
chunk__25803_25855 = G__25885;
count__25804_25856 = G__25886;
i__25805_25857 = G__25887;
continue;
} else {
var temp__4425__auto___25888 = cljs.core.seq(seq__25802_25854);
if(temp__4425__auto___25888){
var seq__25802_25889__$1 = temp__4425__auto___25888;
if(cljs.core.chunked_seq_QMARK_(seq__25802_25889__$1)){
var c__20800__auto___25890 = cljs.core.chunk_first(seq__25802_25889__$1);
var G__25891 = cljs.core.chunk_rest(seq__25802_25889__$1);
var G__25892 = c__20800__auto___25890;
var G__25893 = cljs.core.count(c__20800__auto___25890);
var G__25894 = (0);
seq__25802_25854 = G__25891;
chunk__25803_25855 = G__25892;
count__25804_25856 = G__25893;
i__25805_25857 = G__25894;
continue;
} else {
var tag_25895 = cljs.core.first(seq__25802_25889__$1);
var seq__25814_25896 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_25895)));
var chunk__25815_25897 = null;
var count__25816_25898 = (0);
var i__25817_25899 = (0);
while(true){
if((i__25817_25899 < count__25816_25898)){
var button_25900 = chunk__25815_25897.cljs$core$IIndexed$_nth$arity$2(null,i__25817_25899);
var G__25818_25901 = button_25900;
var G__25819_25902 = "click";
goog.events.removeAll(G__25818_25901,G__25819_25902);

var G__25903 = seq__25814_25896;
var G__25904 = chunk__25815_25897;
var G__25905 = count__25816_25898;
var G__25906 = (i__25817_25899 + (1));
seq__25814_25896 = G__25903;
chunk__25815_25897 = G__25904;
count__25816_25898 = G__25905;
i__25817_25899 = G__25906;
continue;
} else {
var temp__4425__auto___25907__$1 = cljs.core.seq(seq__25814_25896);
if(temp__4425__auto___25907__$1){
var seq__25814_25908__$1 = temp__4425__auto___25907__$1;
if(cljs.core.chunked_seq_QMARK_(seq__25814_25908__$1)){
var c__20800__auto___25909 = cljs.core.chunk_first(seq__25814_25908__$1);
var G__25910 = cljs.core.chunk_rest(seq__25814_25908__$1);
var G__25911 = c__20800__auto___25909;
var G__25912 = cljs.core.count(c__20800__auto___25909);
var G__25913 = (0);
seq__25814_25896 = G__25910;
chunk__25815_25897 = G__25911;
count__25816_25898 = G__25912;
i__25817_25899 = G__25913;
continue;
} else {
var button_25914 = cljs.core.first(seq__25814_25908__$1);
var G__25820_25915 = button_25914;
var G__25821_25916 = "click";
goog.events.removeAll(G__25820_25915,G__25821_25916);

var G__25917 = cljs.core.next(seq__25814_25908__$1);
var G__25918 = null;
var G__25919 = (0);
var G__25920 = (0);
seq__25814_25896 = G__25917;
chunk__25815_25897 = G__25918;
count__25816_25898 = G__25919;
i__25817_25899 = G__25920;
continue;
}
} else {
}
}
break;
}

var G__25921 = cljs.core.next(seq__25802_25889__$1);
var G__25922 = null;
var G__25923 = (0);
var G__25924 = (0);
seq__25802_25854 = G__25921;
chunk__25803_25855 = G__25922;
count__25804_25856 = G__25923;
i__25805_25857 = G__25924;
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

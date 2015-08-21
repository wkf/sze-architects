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
sze_architects.site.site = (function (){var G__25522 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__25522) : cljs.core.atom.call(null,G__25522));
})();
}
sze_architects.site.get_element_by_tag = (function sze_architects$site$get_element_by_tag(tag){
return cljs.core.first((function (){var G__25524 = tag;
return goog.dom.getElementsByTagNameAndClass(G__25524);
})());
});
sze_architects.site.get_toggle_menu_buttons = (function sze_architects$site$get_toggle_menu_buttons(container){
var G__25527 = "toggle-menu";
var G__25528 = container;
return goog.dom.getElementsByClass(G__25527,G__25528);
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__25588 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25588) : cljs.core.deref.call(null,G__25588));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true,cljs.core.array_seq([cljs.core.constant$keyword$dropkick,(new window.Dropkick("#project-field",{"mobile": true})),cljs.core.constant$keyword$fastclick,FastClick.attach(sze_architects.site.body)], 0));

if(cljs.core.not('ontouchstart' in window)){
var G__25589_25647 = sze_architects.site.body;
var G__25590_25648 = "no-touch";
var G__25591_25649 = true;
goog.dom.classlist.enable(G__25589_25647,G__25590_25648,G__25591_25649);
} else {
var seq__25592_25650 = cljs.core.seq((function (){var G__25596 = "image-card";
return goog.dom.getElementsByClass(G__25596);
})());
var chunk__25593_25651 = null;
var count__25594_25652 = (0);
var i__25595_25653 = (0);
while(true){
if((i__25595_25653 < count__25594_25652)){
var el_25654 = chunk__25593_25651.cljs$core$IIndexed$_nth$arity$2(null,i__25595_25653);
var G__25597_25655 = el_25654;
var G__25598_25656 = "click";
var G__25599_25657 = ((function (seq__25592_25650,chunk__25593_25651,count__25594_25652,i__25595_25653,G__25597_25655,G__25598_25656,el_25654){
return (function (){
var G__25600 = el_25654;
var G__25601 = "show-overlay";
return goog.dom.classlist.toggle(G__25600,G__25601);
});})(seq__25592_25650,chunk__25593_25651,count__25594_25652,i__25595_25653,G__25597_25655,G__25598_25656,el_25654))
;
goog.events.listen(G__25597_25655,G__25598_25656,G__25599_25657);

var G__25658 = seq__25592_25650;
var G__25659 = chunk__25593_25651;
var G__25660 = count__25594_25652;
var G__25661 = (i__25595_25653 + (1));
seq__25592_25650 = G__25658;
chunk__25593_25651 = G__25659;
count__25594_25652 = G__25660;
i__25595_25653 = G__25661;
continue;
} else {
var temp__4425__auto___25662 = cljs.core.seq(seq__25592_25650);
if(temp__4425__auto___25662){
var seq__25592_25663__$1 = temp__4425__auto___25662;
if(cljs.core.chunked_seq_QMARK_(seq__25592_25663__$1)){
var c__20799__auto___25664 = cljs.core.chunk_first(seq__25592_25663__$1);
var G__25665 = cljs.core.chunk_rest(seq__25592_25663__$1);
var G__25666 = c__20799__auto___25664;
var G__25667 = cljs.core.count(c__20799__auto___25664);
var G__25668 = (0);
seq__25592_25650 = G__25665;
chunk__25593_25651 = G__25666;
count__25594_25652 = G__25667;
i__25595_25653 = G__25668;
continue;
} else {
var el_25669 = cljs.core.first(seq__25592_25663__$1);
var G__25602_25670 = el_25669;
var G__25603_25671 = "click";
var G__25604_25672 = ((function (seq__25592_25650,chunk__25593_25651,count__25594_25652,i__25595_25653,G__25602_25670,G__25603_25671,el_25669,seq__25592_25663__$1,temp__4425__auto___25662){
return (function (){
var G__25605 = el_25669;
var G__25606 = "show-overlay";
return goog.dom.classlist.toggle(G__25605,G__25606);
});})(seq__25592_25650,chunk__25593_25651,count__25594_25652,i__25595_25653,G__25602_25670,G__25603_25671,el_25669,seq__25592_25663__$1,temp__4425__auto___25662))
;
goog.events.listen(G__25602_25670,G__25603_25671,G__25604_25672);

var G__25673 = cljs.core.next(seq__25592_25663__$1);
var G__25674 = null;
var G__25675 = (0);
var G__25676 = (0);
seq__25592_25650 = G__25673;
chunk__25593_25651 = G__25674;
count__25594_25652 = G__25675;
i__25595_25653 = G__25676;
continue;
}
} else {
}
}
break;
}
}

var seq__25607 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sze_architects.site.header,sze_architects.site.footer], null));
var chunk__25612 = null;
var count__25613 = (0);
var i__25614 = (0);
while(true){
if((i__25614 < count__25613)){
var el = chunk__25612.cljs$core$IIndexed$_nth$arity$2(null,i__25614);
var seq__25615_25677 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__25616_25678 = null;
var count__25617_25679 = (0);
var i__25618_25680 = (0);
while(true){
if((i__25618_25680 < count__25617_25679)){
var button_el_25681 = chunk__25616_25678.cljs$core$IIndexed$_nth$arity$2(null,i__25618_25680);
var G__25619_25682 = button_el_25681;
var G__25620_25683 = "click";
var G__25621_25684 = ((function (seq__25615_25677,chunk__25616_25678,count__25617_25679,i__25618_25680,seq__25607,chunk__25612,count__25613,i__25614,G__25619_25682,G__25620_25683,button_el_25681,el){
return (function (e){
var G__25622_25685 = el;
var G__25623_25686 = "show-menu";
goog.dom.classlist.toggle(G__25622_25685,G__25623_25686);

if(cljs.core.truth_((function (){var G__25624 = el;
var G__25625 = "show-menu";
return goog.dom.classlist.contains(G__25624,G__25625);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__25615_25677,chunk__25616_25678,count__25617_25679,i__25618_25680,seq__25607,chunk__25612,count__25613,i__25614,G__25619_25682,G__25620_25683,button_el_25681,el))
;
goog.events.listen(G__25619_25682,G__25620_25683,G__25621_25684);

var G__25687 = seq__25615_25677;
var G__25688 = chunk__25616_25678;
var G__25689 = count__25617_25679;
var G__25690 = (i__25618_25680 + (1));
seq__25615_25677 = G__25687;
chunk__25616_25678 = G__25688;
count__25617_25679 = G__25689;
i__25618_25680 = G__25690;
continue;
} else {
var temp__4425__auto___25691 = cljs.core.seq(seq__25615_25677);
if(temp__4425__auto___25691){
var seq__25615_25692__$1 = temp__4425__auto___25691;
if(cljs.core.chunked_seq_QMARK_(seq__25615_25692__$1)){
var c__20799__auto___25693 = cljs.core.chunk_first(seq__25615_25692__$1);
var G__25694 = cljs.core.chunk_rest(seq__25615_25692__$1);
var G__25695 = c__20799__auto___25693;
var G__25696 = cljs.core.count(c__20799__auto___25693);
var G__25697 = (0);
seq__25615_25677 = G__25694;
chunk__25616_25678 = G__25695;
count__25617_25679 = G__25696;
i__25618_25680 = G__25697;
continue;
} else {
var button_el_25698 = cljs.core.first(seq__25615_25692__$1);
var G__25626_25699 = button_el_25698;
var G__25627_25700 = "click";
var G__25628_25701 = ((function (seq__25615_25677,chunk__25616_25678,count__25617_25679,i__25618_25680,seq__25607,chunk__25612,count__25613,i__25614,G__25626_25699,G__25627_25700,button_el_25698,seq__25615_25692__$1,temp__4425__auto___25691,el){
return (function (e){
var G__25629_25702 = el;
var G__25630_25703 = "show-menu";
goog.dom.classlist.toggle(G__25629_25702,G__25630_25703);

if(cljs.core.truth_((function (){var G__25631 = el;
var G__25632 = "show-menu";
return goog.dom.classlist.contains(G__25631,G__25632);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__25615_25677,chunk__25616_25678,count__25617_25679,i__25618_25680,seq__25607,chunk__25612,count__25613,i__25614,G__25626_25699,G__25627_25700,button_el_25698,seq__25615_25692__$1,temp__4425__auto___25691,el))
;
goog.events.listen(G__25626_25699,G__25627_25700,G__25628_25701);

var G__25704 = cljs.core.next(seq__25615_25692__$1);
var G__25705 = null;
var G__25706 = (0);
var G__25707 = (0);
seq__25615_25677 = G__25704;
chunk__25616_25678 = G__25705;
count__25617_25679 = G__25706;
i__25618_25680 = G__25707;
continue;
}
} else {
}
}
break;
}

var G__25708 = seq__25607;
var G__25709 = chunk__25612;
var G__25710 = count__25613;
var G__25711 = (i__25614 + (1));
seq__25607 = G__25708;
chunk__25612 = G__25709;
count__25613 = G__25710;
i__25614 = G__25711;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__25607);
if(temp__4425__auto__){
var seq__25607__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__25607__$1)){
var c__20799__auto__ = cljs.core.chunk_first(seq__25607__$1);
var G__25712 = cljs.core.chunk_rest(seq__25607__$1);
var G__25713 = c__20799__auto__;
var G__25714 = cljs.core.count(c__20799__auto__);
var G__25715 = (0);
seq__25607 = G__25712;
chunk__25612 = G__25713;
count__25613 = G__25714;
i__25614 = G__25715;
continue;
} else {
var el = cljs.core.first(seq__25607__$1);
var seq__25608_25716 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__25609_25717 = null;
var count__25610_25718 = (0);
var i__25611_25719 = (0);
while(true){
if((i__25611_25719 < count__25610_25718)){
var button_el_25720 = chunk__25609_25717.cljs$core$IIndexed$_nth$arity$2(null,i__25611_25719);
var G__25633_25721 = button_el_25720;
var G__25634_25722 = "click";
var G__25635_25723 = ((function (seq__25608_25716,chunk__25609_25717,count__25610_25718,i__25611_25719,seq__25607,chunk__25612,count__25613,i__25614,G__25633_25721,G__25634_25722,button_el_25720,el,seq__25607__$1,temp__4425__auto__){
return (function (e){
var G__25636_25724 = el;
var G__25637_25725 = "show-menu";
goog.dom.classlist.toggle(G__25636_25724,G__25637_25725);

if(cljs.core.truth_((function (){var G__25638 = el;
var G__25639 = "show-menu";
return goog.dom.classlist.contains(G__25638,G__25639);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__25608_25716,chunk__25609_25717,count__25610_25718,i__25611_25719,seq__25607,chunk__25612,count__25613,i__25614,G__25633_25721,G__25634_25722,button_el_25720,el,seq__25607__$1,temp__4425__auto__))
;
goog.events.listen(G__25633_25721,G__25634_25722,G__25635_25723);

var G__25726 = seq__25608_25716;
var G__25727 = chunk__25609_25717;
var G__25728 = count__25610_25718;
var G__25729 = (i__25611_25719 + (1));
seq__25608_25716 = G__25726;
chunk__25609_25717 = G__25727;
count__25610_25718 = G__25728;
i__25611_25719 = G__25729;
continue;
} else {
var temp__4425__auto___25730__$1 = cljs.core.seq(seq__25608_25716);
if(temp__4425__auto___25730__$1){
var seq__25608_25731__$1 = temp__4425__auto___25730__$1;
if(cljs.core.chunked_seq_QMARK_(seq__25608_25731__$1)){
var c__20799__auto___25732 = cljs.core.chunk_first(seq__25608_25731__$1);
var G__25733 = cljs.core.chunk_rest(seq__25608_25731__$1);
var G__25734 = c__20799__auto___25732;
var G__25735 = cljs.core.count(c__20799__auto___25732);
var G__25736 = (0);
seq__25608_25716 = G__25733;
chunk__25609_25717 = G__25734;
count__25610_25718 = G__25735;
i__25611_25719 = G__25736;
continue;
} else {
var button_el_25737 = cljs.core.first(seq__25608_25731__$1);
var G__25640_25738 = button_el_25737;
var G__25641_25739 = "click";
var G__25642_25740 = ((function (seq__25608_25716,chunk__25609_25717,count__25610_25718,i__25611_25719,seq__25607,chunk__25612,count__25613,i__25614,G__25640_25738,G__25641_25739,button_el_25737,seq__25608_25731__$1,temp__4425__auto___25730__$1,el,seq__25607__$1,temp__4425__auto__){
return (function (e){
var G__25643_25741 = el;
var G__25644_25742 = "show-menu";
goog.dom.classlist.toggle(G__25643_25741,G__25644_25742);

if(cljs.core.truth_((function (){var G__25645 = el;
var G__25646 = "show-menu";
return goog.dom.classlist.contains(G__25645,G__25646);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__25608_25716,chunk__25609_25717,count__25610_25718,i__25611_25719,seq__25607,chunk__25612,count__25613,i__25614,G__25640_25738,G__25641_25739,button_el_25737,seq__25608_25731__$1,temp__4425__auto___25730__$1,el,seq__25607__$1,temp__4425__auto__))
;
goog.events.listen(G__25640_25738,G__25641_25739,G__25642_25740);

var G__25743 = cljs.core.next(seq__25608_25731__$1);
var G__25744 = null;
var G__25745 = (0);
var G__25746 = (0);
seq__25608_25716 = G__25743;
chunk__25609_25717 = G__25744;
count__25610_25718 = G__25745;
i__25611_25719 = G__25746;
continue;
}
} else {
}
}
break;
}

var G__25747 = cljs.core.next(seq__25607__$1);
var G__25748 = null;
var G__25749 = (0);
var G__25750 = (0);
seq__25607 = G__25747;
chunk__25612 = G__25748;
count__25613 = G__25749;
i__25614 = G__25750;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__25786 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25786) : cljs.core.deref.call(null,G__25786));
})()))){
var temp__4425__auto___25821 = cljs.core.constant$keyword$dropkick.cljs$core$IFn$_invoke$arity$1((function (){var G__25787 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25787) : cljs.core.deref.call(null,G__25787));
})());
if(cljs.core.truth_(temp__4425__auto___25821)){
var dropkick_25822 = temp__4425__auto___25821;
dropkick_25822.dispose();
} else {
}

var temp__4425__auto___25823 = cljs.core.constant$keyword$fastclick.cljs$core$IFn$_invoke$arity$1((function (){var G__25788 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25788) : cljs.core.deref.call(null,G__25788));
})());
if(cljs.core.truth_(temp__4425__auto___25823)){
var fastclick_25824 = temp__4425__auto___25823;
fastclick_25824.destroy();
} else {
}

var G__25789_25825 = sze_architects.site.body;
var G__25790_25826 = "no-touch";
var G__25791_25827 = false;
goog.dom.classlist.enable(G__25789_25825,G__25790_25826,G__25791_25827);

var seq__25792_25828 = cljs.core.seq((function (){var G__25796 = "image-card";
return goog.dom.getElementsByClass(G__25796);
})());
var chunk__25793_25829 = null;
var count__25794_25830 = (0);
var i__25795_25831 = (0);
while(true){
if((i__25795_25831 < count__25794_25830)){
var el_25832 = chunk__25793_25829.cljs$core$IIndexed$_nth$arity$2(null,i__25795_25831);
var G__25797_25833 = el_25832;
var G__25798_25834 = "click";
goog.events.removeAll(G__25797_25833,G__25798_25834);

var G__25835 = seq__25792_25828;
var G__25836 = chunk__25793_25829;
var G__25837 = count__25794_25830;
var G__25838 = (i__25795_25831 + (1));
seq__25792_25828 = G__25835;
chunk__25793_25829 = G__25836;
count__25794_25830 = G__25837;
i__25795_25831 = G__25838;
continue;
} else {
var temp__4425__auto___25839 = cljs.core.seq(seq__25792_25828);
if(temp__4425__auto___25839){
var seq__25792_25840__$1 = temp__4425__auto___25839;
if(cljs.core.chunked_seq_QMARK_(seq__25792_25840__$1)){
var c__20799__auto___25841 = cljs.core.chunk_first(seq__25792_25840__$1);
var G__25842 = cljs.core.chunk_rest(seq__25792_25840__$1);
var G__25843 = c__20799__auto___25841;
var G__25844 = cljs.core.count(c__20799__auto___25841);
var G__25845 = (0);
seq__25792_25828 = G__25842;
chunk__25793_25829 = G__25843;
count__25794_25830 = G__25844;
i__25795_25831 = G__25845;
continue;
} else {
var el_25846 = cljs.core.first(seq__25792_25840__$1);
var G__25799_25847 = el_25846;
var G__25800_25848 = "click";
goog.events.removeAll(G__25799_25847,G__25800_25848);

var G__25849 = cljs.core.next(seq__25792_25840__$1);
var G__25850 = null;
var G__25851 = (0);
var G__25852 = (0);
seq__25792_25828 = G__25849;
chunk__25793_25829 = G__25850;
count__25794_25830 = G__25851;
i__25795_25831 = G__25852;
continue;
}
} else {
}
}
break;
}

var seq__25801_25853 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__25802_25854 = null;
var count__25803_25855 = (0);
var i__25804_25856 = (0);
while(true){
if((i__25804_25856 < count__25803_25855)){
var tag_25857 = chunk__25802_25854.cljs$core$IIndexed$_nth$arity$2(null,i__25804_25856);
var seq__25805_25858 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_25857)));
var chunk__25806_25859 = null;
var count__25807_25860 = (0);
var i__25808_25861 = (0);
while(true){
if((i__25808_25861 < count__25807_25860)){
var button_25862 = chunk__25806_25859.cljs$core$IIndexed$_nth$arity$2(null,i__25808_25861);
var G__25809_25863 = button_25862;
var G__25810_25864 = "click";
goog.events.removeAll(G__25809_25863,G__25810_25864);

var G__25865 = seq__25805_25858;
var G__25866 = chunk__25806_25859;
var G__25867 = count__25807_25860;
var G__25868 = (i__25808_25861 + (1));
seq__25805_25858 = G__25865;
chunk__25806_25859 = G__25866;
count__25807_25860 = G__25867;
i__25808_25861 = G__25868;
continue;
} else {
var temp__4425__auto___25869 = cljs.core.seq(seq__25805_25858);
if(temp__4425__auto___25869){
var seq__25805_25870__$1 = temp__4425__auto___25869;
if(cljs.core.chunked_seq_QMARK_(seq__25805_25870__$1)){
var c__20799__auto___25871 = cljs.core.chunk_first(seq__25805_25870__$1);
var G__25872 = cljs.core.chunk_rest(seq__25805_25870__$1);
var G__25873 = c__20799__auto___25871;
var G__25874 = cljs.core.count(c__20799__auto___25871);
var G__25875 = (0);
seq__25805_25858 = G__25872;
chunk__25806_25859 = G__25873;
count__25807_25860 = G__25874;
i__25808_25861 = G__25875;
continue;
} else {
var button_25876 = cljs.core.first(seq__25805_25870__$1);
var G__25811_25877 = button_25876;
var G__25812_25878 = "click";
goog.events.removeAll(G__25811_25877,G__25812_25878);

var G__25879 = cljs.core.next(seq__25805_25870__$1);
var G__25880 = null;
var G__25881 = (0);
var G__25882 = (0);
seq__25805_25858 = G__25879;
chunk__25806_25859 = G__25880;
count__25807_25860 = G__25881;
i__25808_25861 = G__25882;
continue;
}
} else {
}
}
break;
}

var G__25883 = seq__25801_25853;
var G__25884 = chunk__25802_25854;
var G__25885 = count__25803_25855;
var G__25886 = (i__25804_25856 + (1));
seq__25801_25853 = G__25883;
chunk__25802_25854 = G__25884;
count__25803_25855 = G__25885;
i__25804_25856 = G__25886;
continue;
} else {
var temp__4425__auto___25887 = cljs.core.seq(seq__25801_25853);
if(temp__4425__auto___25887){
var seq__25801_25888__$1 = temp__4425__auto___25887;
if(cljs.core.chunked_seq_QMARK_(seq__25801_25888__$1)){
var c__20799__auto___25889 = cljs.core.chunk_first(seq__25801_25888__$1);
var G__25890 = cljs.core.chunk_rest(seq__25801_25888__$1);
var G__25891 = c__20799__auto___25889;
var G__25892 = cljs.core.count(c__20799__auto___25889);
var G__25893 = (0);
seq__25801_25853 = G__25890;
chunk__25802_25854 = G__25891;
count__25803_25855 = G__25892;
i__25804_25856 = G__25893;
continue;
} else {
var tag_25894 = cljs.core.first(seq__25801_25888__$1);
var seq__25813_25895 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_25894)));
var chunk__25814_25896 = null;
var count__25815_25897 = (0);
var i__25816_25898 = (0);
while(true){
if((i__25816_25898 < count__25815_25897)){
var button_25899 = chunk__25814_25896.cljs$core$IIndexed$_nth$arity$2(null,i__25816_25898);
var G__25817_25900 = button_25899;
var G__25818_25901 = "click";
goog.events.removeAll(G__25817_25900,G__25818_25901);

var G__25902 = seq__25813_25895;
var G__25903 = chunk__25814_25896;
var G__25904 = count__25815_25897;
var G__25905 = (i__25816_25898 + (1));
seq__25813_25895 = G__25902;
chunk__25814_25896 = G__25903;
count__25815_25897 = G__25904;
i__25816_25898 = G__25905;
continue;
} else {
var temp__4425__auto___25906__$1 = cljs.core.seq(seq__25813_25895);
if(temp__4425__auto___25906__$1){
var seq__25813_25907__$1 = temp__4425__auto___25906__$1;
if(cljs.core.chunked_seq_QMARK_(seq__25813_25907__$1)){
var c__20799__auto___25908 = cljs.core.chunk_first(seq__25813_25907__$1);
var G__25909 = cljs.core.chunk_rest(seq__25813_25907__$1);
var G__25910 = c__20799__auto___25908;
var G__25911 = cljs.core.count(c__20799__auto___25908);
var G__25912 = (0);
seq__25813_25895 = G__25909;
chunk__25814_25896 = G__25910;
count__25815_25897 = G__25911;
i__25816_25898 = G__25912;
continue;
} else {
var button_25913 = cljs.core.first(seq__25813_25907__$1);
var G__25819_25914 = button_25913;
var G__25820_25915 = "click";
goog.events.removeAll(G__25819_25914,G__25820_25915);

var G__25916 = cljs.core.next(seq__25813_25907__$1);
var G__25917 = null;
var G__25918 = (0);
var G__25919 = (0);
seq__25813_25895 = G__25916;
chunk__25814_25896 = G__25917;
count__25815_25897 = G__25918;
i__25816_25898 = G__25919;
continue;
}
} else {
}
}
break;
}

var G__25920 = cljs.core.next(seq__25801_25888__$1);
var G__25921 = null;
var G__25922 = (0);
var G__25923 = (0);
seq__25801_25853 = G__25920;
chunk__25802_25854 = G__25921;
count__25803_25855 = G__25922;
i__25804_25856 = G__25923;
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

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
sze_architects.site.site = (function (){var G__23690 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23690) : cljs.core.atom.call(null,G__23690));
})();
}
sze_architects.site.get_element_by_tag = (function sze_architects$site$get_element_by_tag(tag){
return cljs.core.first((function (){var G__23692 = tag;
return goog.dom.getElementsByTagNameAndClass(G__23692);
})());
});
sze_architects.site.get_toggle_menu_buttons = (function sze_architects$site$get_toggle_menu_buttons(container){
var G__23695 = "toggle-menu";
var G__23696 = container;
return goog.dom.getElementsByClass(G__23695,G__23696);
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23756 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23756) : cljs.core.deref.call(null,G__23756));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true,cljs.core.array_seq([cljs.core.constant$keyword$fastclick,FastClick.attach(sze_architects.site.body)], 0));

if(cljs.core.not('ontouchstart' in window)){
var G__23757_23815 = sze_architects.site.body;
var G__23758_23816 = "no-touch";
var G__23759_23817 = true;
goog.dom.classlist.enable(G__23757_23815,G__23758_23816,G__23759_23817);
} else {
var seq__23760_23818 = cljs.core.seq((function (){var G__23764 = "image-card";
return goog.dom.getElementsByClass(G__23764);
})());
var chunk__23761_23819 = null;
var count__23762_23820 = (0);
var i__23763_23821 = (0);
while(true){
if((i__23763_23821 < count__23762_23820)){
var el_23822 = chunk__23761_23819.cljs$core$IIndexed$_nth$arity$2(null,i__23763_23821);
var G__23765_23823 = el_23822;
var G__23766_23824 = "click";
var G__23767_23825 = ((function (seq__23760_23818,chunk__23761_23819,count__23762_23820,i__23763_23821,G__23765_23823,G__23766_23824,el_23822){
return (function (){
var G__23768 = el_23822;
var G__23769 = "show-overlay";
return goog.dom.classlist.toggle(G__23768,G__23769);
});})(seq__23760_23818,chunk__23761_23819,count__23762_23820,i__23763_23821,G__23765_23823,G__23766_23824,el_23822))
;
goog.events.listen(G__23765_23823,G__23766_23824,G__23767_23825);

var G__23826 = seq__23760_23818;
var G__23827 = chunk__23761_23819;
var G__23828 = count__23762_23820;
var G__23829 = (i__23763_23821 + (1));
seq__23760_23818 = G__23826;
chunk__23761_23819 = G__23827;
count__23762_23820 = G__23828;
i__23763_23821 = G__23829;
continue;
} else {
var temp__4425__auto___23830 = cljs.core.seq(seq__23760_23818);
if(temp__4425__auto___23830){
var seq__23760_23831__$1 = temp__4425__auto___23830;
if(cljs.core.chunked_seq_QMARK_(seq__23760_23831__$1)){
var c__18967__auto___23832 = cljs.core.chunk_first(seq__23760_23831__$1);
var G__23833 = cljs.core.chunk_rest(seq__23760_23831__$1);
var G__23834 = c__18967__auto___23832;
var G__23835 = cljs.core.count(c__18967__auto___23832);
var G__23836 = (0);
seq__23760_23818 = G__23833;
chunk__23761_23819 = G__23834;
count__23762_23820 = G__23835;
i__23763_23821 = G__23836;
continue;
} else {
var el_23837 = cljs.core.first(seq__23760_23831__$1);
var G__23770_23838 = el_23837;
var G__23771_23839 = "click";
var G__23772_23840 = ((function (seq__23760_23818,chunk__23761_23819,count__23762_23820,i__23763_23821,G__23770_23838,G__23771_23839,el_23837,seq__23760_23831__$1,temp__4425__auto___23830){
return (function (){
var G__23773 = el_23837;
var G__23774 = "show-overlay";
return goog.dom.classlist.toggle(G__23773,G__23774);
});})(seq__23760_23818,chunk__23761_23819,count__23762_23820,i__23763_23821,G__23770_23838,G__23771_23839,el_23837,seq__23760_23831__$1,temp__4425__auto___23830))
;
goog.events.listen(G__23770_23838,G__23771_23839,G__23772_23840);

var G__23841 = cljs.core.next(seq__23760_23831__$1);
var G__23842 = null;
var G__23843 = (0);
var G__23844 = (0);
seq__23760_23818 = G__23841;
chunk__23761_23819 = G__23842;
count__23762_23820 = G__23843;
i__23763_23821 = G__23844;
continue;
}
} else {
}
}
break;
}
}

var seq__23775 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sze_architects.site.header,sze_architects.site.footer], null));
var chunk__23780 = null;
var count__23781 = (0);
var i__23782 = (0);
while(true){
if((i__23782 < count__23781)){
var el = chunk__23780.cljs$core$IIndexed$_nth$arity$2(null,i__23782);
var seq__23783_23845 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23784_23846 = null;
var count__23785_23847 = (0);
var i__23786_23848 = (0);
while(true){
if((i__23786_23848 < count__23785_23847)){
var button_el_23849 = chunk__23784_23846.cljs$core$IIndexed$_nth$arity$2(null,i__23786_23848);
var G__23787_23850 = button_el_23849;
var G__23788_23851 = "click";
var G__23789_23852 = ((function (seq__23783_23845,chunk__23784_23846,count__23785_23847,i__23786_23848,seq__23775,chunk__23780,count__23781,i__23782,G__23787_23850,G__23788_23851,button_el_23849,el){
return (function (e){
var G__23790_23853 = el;
var G__23791_23854 = "show-menu";
goog.dom.classlist.toggle(G__23790_23853,G__23791_23854);

if(cljs.core.truth_((function (){var G__23792 = el;
var G__23793 = "show-menu";
return goog.dom.classlist.contains(G__23792,G__23793);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23783_23845,chunk__23784_23846,count__23785_23847,i__23786_23848,seq__23775,chunk__23780,count__23781,i__23782,G__23787_23850,G__23788_23851,button_el_23849,el))
;
goog.events.listen(G__23787_23850,G__23788_23851,G__23789_23852);

var G__23855 = seq__23783_23845;
var G__23856 = chunk__23784_23846;
var G__23857 = count__23785_23847;
var G__23858 = (i__23786_23848 + (1));
seq__23783_23845 = G__23855;
chunk__23784_23846 = G__23856;
count__23785_23847 = G__23857;
i__23786_23848 = G__23858;
continue;
} else {
var temp__4425__auto___23859 = cljs.core.seq(seq__23783_23845);
if(temp__4425__auto___23859){
var seq__23783_23860__$1 = temp__4425__auto___23859;
if(cljs.core.chunked_seq_QMARK_(seq__23783_23860__$1)){
var c__18967__auto___23861 = cljs.core.chunk_first(seq__23783_23860__$1);
var G__23862 = cljs.core.chunk_rest(seq__23783_23860__$1);
var G__23863 = c__18967__auto___23861;
var G__23864 = cljs.core.count(c__18967__auto___23861);
var G__23865 = (0);
seq__23783_23845 = G__23862;
chunk__23784_23846 = G__23863;
count__23785_23847 = G__23864;
i__23786_23848 = G__23865;
continue;
} else {
var button_el_23866 = cljs.core.first(seq__23783_23860__$1);
var G__23794_23867 = button_el_23866;
var G__23795_23868 = "click";
var G__23796_23869 = ((function (seq__23783_23845,chunk__23784_23846,count__23785_23847,i__23786_23848,seq__23775,chunk__23780,count__23781,i__23782,G__23794_23867,G__23795_23868,button_el_23866,seq__23783_23860__$1,temp__4425__auto___23859,el){
return (function (e){
var G__23797_23870 = el;
var G__23798_23871 = "show-menu";
goog.dom.classlist.toggle(G__23797_23870,G__23798_23871);

if(cljs.core.truth_((function (){var G__23799 = el;
var G__23800 = "show-menu";
return goog.dom.classlist.contains(G__23799,G__23800);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23783_23845,chunk__23784_23846,count__23785_23847,i__23786_23848,seq__23775,chunk__23780,count__23781,i__23782,G__23794_23867,G__23795_23868,button_el_23866,seq__23783_23860__$1,temp__4425__auto___23859,el))
;
goog.events.listen(G__23794_23867,G__23795_23868,G__23796_23869);

var G__23872 = cljs.core.next(seq__23783_23860__$1);
var G__23873 = null;
var G__23874 = (0);
var G__23875 = (0);
seq__23783_23845 = G__23872;
chunk__23784_23846 = G__23873;
count__23785_23847 = G__23874;
i__23786_23848 = G__23875;
continue;
}
} else {
}
}
break;
}

var G__23876 = seq__23775;
var G__23877 = chunk__23780;
var G__23878 = count__23781;
var G__23879 = (i__23782 + (1));
seq__23775 = G__23876;
chunk__23780 = G__23877;
count__23781 = G__23878;
i__23782 = G__23879;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__23775);
if(temp__4425__auto__){
var seq__23775__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__23775__$1)){
var c__18967__auto__ = cljs.core.chunk_first(seq__23775__$1);
var G__23880 = cljs.core.chunk_rest(seq__23775__$1);
var G__23881 = c__18967__auto__;
var G__23882 = cljs.core.count(c__18967__auto__);
var G__23883 = (0);
seq__23775 = G__23880;
chunk__23780 = G__23881;
count__23781 = G__23882;
i__23782 = G__23883;
continue;
} else {
var el = cljs.core.first(seq__23775__$1);
var seq__23776_23884 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23777_23885 = null;
var count__23778_23886 = (0);
var i__23779_23887 = (0);
while(true){
if((i__23779_23887 < count__23778_23886)){
var button_el_23888 = chunk__23777_23885.cljs$core$IIndexed$_nth$arity$2(null,i__23779_23887);
var G__23801_23889 = button_el_23888;
var G__23802_23890 = "click";
var G__23803_23891 = ((function (seq__23776_23884,chunk__23777_23885,count__23778_23886,i__23779_23887,seq__23775,chunk__23780,count__23781,i__23782,G__23801_23889,G__23802_23890,button_el_23888,el,seq__23775__$1,temp__4425__auto__){
return (function (e){
var G__23804_23892 = el;
var G__23805_23893 = "show-menu";
goog.dom.classlist.toggle(G__23804_23892,G__23805_23893);

if(cljs.core.truth_((function (){var G__23806 = el;
var G__23807 = "show-menu";
return goog.dom.classlist.contains(G__23806,G__23807);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23776_23884,chunk__23777_23885,count__23778_23886,i__23779_23887,seq__23775,chunk__23780,count__23781,i__23782,G__23801_23889,G__23802_23890,button_el_23888,el,seq__23775__$1,temp__4425__auto__))
;
goog.events.listen(G__23801_23889,G__23802_23890,G__23803_23891);

var G__23894 = seq__23776_23884;
var G__23895 = chunk__23777_23885;
var G__23896 = count__23778_23886;
var G__23897 = (i__23779_23887 + (1));
seq__23776_23884 = G__23894;
chunk__23777_23885 = G__23895;
count__23778_23886 = G__23896;
i__23779_23887 = G__23897;
continue;
} else {
var temp__4425__auto___23898__$1 = cljs.core.seq(seq__23776_23884);
if(temp__4425__auto___23898__$1){
var seq__23776_23899__$1 = temp__4425__auto___23898__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23776_23899__$1)){
var c__18967__auto___23900 = cljs.core.chunk_first(seq__23776_23899__$1);
var G__23901 = cljs.core.chunk_rest(seq__23776_23899__$1);
var G__23902 = c__18967__auto___23900;
var G__23903 = cljs.core.count(c__18967__auto___23900);
var G__23904 = (0);
seq__23776_23884 = G__23901;
chunk__23777_23885 = G__23902;
count__23778_23886 = G__23903;
i__23779_23887 = G__23904;
continue;
} else {
var button_el_23905 = cljs.core.first(seq__23776_23899__$1);
var G__23808_23906 = button_el_23905;
var G__23809_23907 = "click";
var G__23810_23908 = ((function (seq__23776_23884,chunk__23777_23885,count__23778_23886,i__23779_23887,seq__23775,chunk__23780,count__23781,i__23782,G__23808_23906,G__23809_23907,button_el_23905,seq__23776_23899__$1,temp__4425__auto___23898__$1,el,seq__23775__$1,temp__4425__auto__){
return (function (e){
var G__23811_23909 = el;
var G__23812_23910 = "show-menu";
goog.dom.classlist.toggle(G__23811_23909,G__23812_23910);

if(cljs.core.truth_((function (){var G__23813 = el;
var G__23814 = "show-menu";
return goog.dom.classlist.contains(G__23813,G__23814);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23776_23884,chunk__23777_23885,count__23778_23886,i__23779_23887,seq__23775,chunk__23780,count__23781,i__23782,G__23808_23906,G__23809_23907,button_el_23905,seq__23776_23899__$1,temp__4425__auto___23898__$1,el,seq__23775__$1,temp__4425__auto__))
;
goog.events.listen(G__23808_23906,G__23809_23907,G__23810_23908);

var G__23911 = cljs.core.next(seq__23776_23899__$1);
var G__23912 = null;
var G__23913 = (0);
var G__23914 = (0);
seq__23776_23884 = G__23911;
chunk__23777_23885 = G__23912;
count__23778_23886 = G__23913;
i__23779_23887 = G__23914;
continue;
}
} else {
}
}
break;
}

var G__23915 = cljs.core.next(seq__23775__$1);
var G__23916 = null;
var G__23917 = (0);
var G__23918 = (0);
seq__23775 = G__23915;
chunk__23780 = G__23916;
count__23781 = G__23917;
i__23782 = G__23918;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23953 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23953) : cljs.core.deref.call(null,G__23953));
})()))){
var temp__4425__auto___23987 = cljs.core.constant$keyword$fastclick.cljs$core$IFn$_invoke$arity$1((function (){var G__23954 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23954) : cljs.core.deref.call(null,G__23954));
})());
if(cljs.core.truth_(temp__4425__auto___23987)){
var fastclick_23988 = temp__4425__auto___23987;
fastclick_23988.destroy();
} else {
}

var G__23955_23989 = sze_architects.site.body;
var G__23956_23990 = "no-touch";
var G__23957_23991 = false;
goog.dom.classlist.enable(G__23955_23989,G__23956_23990,G__23957_23991);

var seq__23958_23992 = cljs.core.seq((function (){var G__23962 = "image-card";
return goog.dom.getElementsByClass(G__23962);
})());
var chunk__23959_23993 = null;
var count__23960_23994 = (0);
var i__23961_23995 = (0);
while(true){
if((i__23961_23995 < count__23960_23994)){
var el_23996 = chunk__23959_23993.cljs$core$IIndexed$_nth$arity$2(null,i__23961_23995);
var G__23963_23997 = el_23996;
var G__23964_23998 = "click";
goog.events.removeAll(G__23963_23997,G__23964_23998);

var G__23999 = seq__23958_23992;
var G__24000 = chunk__23959_23993;
var G__24001 = count__23960_23994;
var G__24002 = (i__23961_23995 + (1));
seq__23958_23992 = G__23999;
chunk__23959_23993 = G__24000;
count__23960_23994 = G__24001;
i__23961_23995 = G__24002;
continue;
} else {
var temp__4425__auto___24003 = cljs.core.seq(seq__23958_23992);
if(temp__4425__auto___24003){
var seq__23958_24004__$1 = temp__4425__auto___24003;
if(cljs.core.chunked_seq_QMARK_(seq__23958_24004__$1)){
var c__18967__auto___24005 = cljs.core.chunk_first(seq__23958_24004__$1);
var G__24006 = cljs.core.chunk_rest(seq__23958_24004__$1);
var G__24007 = c__18967__auto___24005;
var G__24008 = cljs.core.count(c__18967__auto___24005);
var G__24009 = (0);
seq__23958_23992 = G__24006;
chunk__23959_23993 = G__24007;
count__23960_23994 = G__24008;
i__23961_23995 = G__24009;
continue;
} else {
var el_24010 = cljs.core.first(seq__23958_24004__$1);
var G__23965_24011 = el_24010;
var G__23966_24012 = "click";
goog.events.removeAll(G__23965_24011,G__23966_24012);

var G__24013 = cljs.core.next(seq__23958_24004__$1);
var G__24014 = null;
var G__24015 = (0);
var G__24016 = (0);
seq__23958_23992 = G__24013;
chunk__23959_23993 = G__24014;
count__23960_23994 = G__24015;
i__23961_23995 = G__24016;
continue;
}
} else {
}
}
break;
}

var seq__23967_24017 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__23968_24018 = null;
var count__23969_24019 = (0);
var i__23970_24020 = (0);
while(true){
if((i__23970_24020 < count__23969_24019)){
var tag_24021 = chunk__23968_24018.cljs$core$IIndexed$_nth$arity$2(null,i__23970_24020);
var seq__23971_24022 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_24021)));
var chunk__23972_24023 = null;
var count__23973_24024 = (0);
var i__23974_24025 = (0);
while(true){
if((i__23974_24025 < count__23973_24024)){
var button_24026 = chunk__23972_24023.cljs$core$IIndexed$_nth$arity$2(null,i__23974_24025);
var G__23975_24027 = button_24026;
var G__23976_24028 = "click";
goog.events.removeAll(G__23975_24027,G__23976_24028);

var G__24029 = seq__23971_24022;
var G__24030 = chunk__23972_24023;
var G__24031 = count__23973_24024;
var G__24032 = (i__23974_24025 + (1));
seq__23971_24022 = G__24029;
chunk__23972_24023 = G__24030;
count__23973_24024 = G__24031;
i__23974_24025 = G__24032;
continue;
} else {
var temp__4425__auto___24033 = cljs.core.seq(seq__23971_24022);
if(temp__4425__auto___24033){
var seq__23971_24034__$1 = temp__4425__auto___24033;
if(cljs.core.chunked_seq_QMARK_(seq__23971_24034__$1)){
var c__18967__auto___24035 = cljs.core.chunk_first(seq__23971_24034__$1);
var G__24036 = cljs.core.chunk_rest(seq__23971_24034__$1);
var G__24037 = c__18967__auto___24035;
var G__24038 = cljs.core.count(c__18967__auto___24035);
var G__24039 = (0);
seq__23971_24022 = G__24036;
chunk__23972_24023 = G__24037;
count__23973_24024 = G__24038;
i__23974_24025 = G__24039;
continue;
} else {
var button_24040 = cljs.core.first(seq__23971_24034__$1);
var G__23977_24041 = button_24040;
var G__23978_24042 = "click";
goog.events.removeAll(G__23977_24041,G__23978_24042);

var G__24043 = cljs.core.next(seq__23971_24034__$1);
var G__24044 = null;
var G__24045 = (0);
var G__24046 = (0);
seq__23971_24022 = G__24043;
chunk__23972_24023 = G__24044;
count__23973_24024 = G__24045;
i__23974_24025 = G__24046;
continue;
}
} else {
}
}
break;
}

var G__24047 = seq__23967_24017;
var G__24048 = chunk__23968_24018;
var G__24049 = count__23969_24019;
var G__24050 = (i__23970_24020 + (1));
seq__23967_24017 = G__24047;
chunk__23968_24018 = G__24048;
count__23969_24019 = G__24049;
i__23970_24020 = G__24050;
continue;
} else {
var temp__4425__auto___24051 = cljs.core.seq(seq__23967_24017);
if(temp__4425__auto___24051){
var seq__23967_24052__$1 = temp__4425__auto___24051;
if(cljs.core.chunked_seq_QMARK_(seq__23967_24052__$1)){
var c__18967__auto___24053 = cljs.core.chunk_first(seq__23967_24052__$1);
var G__24054 = cljs.core.chunk_rest(seq__23967_24052__$1);
var G__24055 = c__18967__auto___24053;
var G__24056 = cljs.core.count(c__18967__auto___24053);
var G__24057 = (0);
seq__23967_24017 = G__24054;
chunk__23968_24018 = G__24055;
count__23969_24019 = G__24056;
i__23970_24020 = G__24057;
continue;
} else {
var tag_24058 = cljs.core.first(seq__23967_24052__$1);
var seq__23979_24059 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_24058)));
var chunk__23980_24060 = null;
var count__23981_24061 = (0);
var i__23982_24062 = (0);
while(true){
if((i__23982_24062 < count__23981_24061)){
var button_24063 = chunk__23980_24060.cljs$core$IIndexed$_nth$arity$2(null,i__23982_24062);
var G__23983_24064 = button_24063;
var G__23984_24065 = "click";
goog.events.removeAll(G__23983_24064,G__23984_24065);

var G__24066 = seq__23979_24059;
var G__24067 = chunk__23980_24060;
var G__24068 = count__23981_24061;
var G__24069 = (i__23982_24062 + (1));
seq__23979_24059 = G__24066;
chunk__23980_24060 = G__24067;
count__23981_24061 = G__24068;
i__23982_24062 = G__24069;
continue;
} else {
var temp__4425__auto___24070__$1 = cljs.core.seq(seq__23979_24059);
if(temp__4425__auto___24070__$1){
var seq__23979_24071__$1 = temp__4425__auto___24070__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23979_24071__$1)){
var c__18967__auto___24072 = cljs.core.chunk_first(seq__23979_24071__$1);
var G__24073 = cljs.core.chunk_rest(seq__23979_24071__$1);
var G__24074 = c__18967__auto___24072;
var G__24075 = cljs.core.count(c__18967__auto___24072);
var G__24076 = (0);
seq__23979_24059 = G__24073;
chunk__23980_24060 = G__24074;
count__23981_24061 = G__24075;
i__23982_24062 = G__24076;
continue;
} else {
var button_24077 = cljs.core.first(seq__23979_24071__$1);
var G__23985_24078 = button_24077;
var G__23986_24079 = "click";
goog.events.removeAll(G__23985_24078,G__23986_24079);

var G__24080 = cljs.core.next(seq__23979_24071__$1);
var G__24081 = null;
var G__24082 = (0);
var G__24083 = (0);
seq__23979_24059 = G__24080;
chunk__23980_24060 = G__24081;
count__23981_24061 = G__24082;
i__23982_24062 = G__24083;
continue;
}
} else {
}
}
break;
}

var G__24084 = cljs.core.next(seq__23967_24052__$1);
var G__24085 = null;
var G__24086 = (0);
var G__24087 = (0);
seq__23967_24017 = G__24084;
chunk__23968_24018 = G__24085;
count__23969_24019 = G__24086;
i__23970_24020 = G__24087;
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

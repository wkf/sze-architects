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
sze_architects.site.site = (function (){var G__23699 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23699) : cljs.core.atom.call(null,G__23699));
})();
}
sze_architects.site.get_element_by_tag = (function sze_architects$site$get_element_by_tag(tag){
return cljs.core.first((function (){var G__23701 = tag;
return goog.dom.getElementsByTagNameAndClass(G__23701);
})());
});
sze_architects.site.get_toggle_menu_buttons = (function sze_architects$site$get_toggle_menu_buttons(container){
var G__23704 = "toggle-menu";
var G__23705 = container;
return goog.dom.getElementsByClass(G__23704,G__23705);
});
sze_architects.site.body = document.body;
sze_architects.site.scroll_y = (function sze_architects$site$scroll_y(by){
var scroll = (function (){return goog.dom.getDocumentScroll();
})();
return (new goog.fx.dom.Scroll(sze_architects.site.body,[scroll.x,scroll.y],[scroll.x,(scroll.y + by)],(200))).play();
});
sze_architects.site.header = sze_architects.site.get_element_by_tag("header");
sze_architects.site.footer = sze_architects.site.get_element_by_tag("footer");
/**
 * Start the site. Attempt to be idempotent.
 */
sze_architects.site.start = (function sze_architects$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23747 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23747) : cljs.core.deref.call(null,G__23747));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

FastClick.attach(sze_architects.site.body);

var seq__23748 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sze_architects.site.header,sze_architects.site.footer], null));
var chunk__23753 = null;
var count__23754 = (0);
var i__23755 = (0);
while(true){
if((i__23755 < count__23754)){
var el = chunk__23753.cljs$core$IIndexed$_nth$arity$2(null,i__23755);
var seq__23756_23788 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23757_23789 = null;
var count__23758_23790 = (0);
var i__23759_23791 = (0);
while(true){
if((i__23759_23791 < count__23758_23790)){
var button_el_23792 = chunk__23757_23789.cljs$core$IIndexed$_nth$arity$2(null,i__23759_23791);
var G__23760_23793 = button_el_23792;
var G__23761_23794 = "click";
var G__23762_23795 = ((function (seq__23756_23788,chunk__23757_23789,count__23758_23790,i__23759_23791,seq__23748,chunk__23753,count__23754,i__23755,G__23760_23793,G__23761_23794,button_el_23792,el){
return (function (e){
var G__23763_23796 = el;
var G__23764_23797 = "show-menu";
goog.dom.classlist.toggle(G__23763_23796,G__23764_23797);

if(cljs.core.truth_((function (){var G__23765 = el;
var G__23766 = "show-menu";
return goog.dom.classlist.contains(G__23765,G__23766);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23756_23788,chunk__23757_23789,count__23758_23790,i__23759_23791,seq__23748,chunk__23753,count__23754,i__23755,G__23760_23793,G__23761_23794,button_el_23792,el))
;
goog.events.listen(G__23760_23793,G__23761_23794,G__23762_23795);

var G__23798 = seq__23756_23788;
var G__23799 = chunk__23757_23789;
var G__23800 = count__23758_23790;
var G__23801 = (i__23759_23791 + (1));
seq__23756_23788 = G__23798;
chunk__23757_23789 = G__23799;
count__23758_23790 = G__23800;
i__23759_23791 = G__23801;
continue;
} else {
var temp__4425__auto___23802 = cljs.core.seq(seq__23756_23788);
if(temp__4425__auto___23802){
var seq__23756_23803__$1 = temp__4425__auto___23802;
if(cljs.core.chunked_seq_QMARK_(seq__23756_23803__$1)){
var c__18976__auto___23804 = cljs.core.chunk_first(seq__23756_23803__$1);
var G__23805 = cljs.core.chunk_rest(seq__23756_23803__$1);
var G__23806 = c__18976__auto___23804;
var G__23807 = cljs.core.count(c__18976__auto___23804);
var G__23808 = (0);
seq__23756_23788 = G__23805;
chunk__23757_23789 = G__23806;
count__23758_23790 = G__23807;
i__23759_23791 = G__23808;
continue;
} else {
var button_el_23809 = cljs.core.first(seq__23756_23803__$1);
var G__23767_23810 = button_el_23809;
var G__23768_23811 = "click";
var G__23769_23812 = ((function (seq__23756_23788,chunk__23757_23789,count__23758_23790,i__23759_23791,seq__23748,chunk__23753,count__23754,i__23755,G__23767_23810,G__23768_23811,button_el_23809,seq__23756_23803__$1,temp__4425__auto___23802,el){
return (function (e){
var G__23770_23813 = el;
var G__23771_23814 = "show-menu";
goog.dom.classlist.toggle(G__23770_23813,G__23771_23814);

if(cljs.core.truth_((function (){var G__23772 = el;
var G__23773 = "show-menu";
return goog.dom.classlist.contains(G__23772,G__23773);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23756_23788,chunk__23757_23789,count__23758_23790,i__23759_23791,seq__23748,chunk__23753,count__23754,i__23755,G__23767_23810,G__23768_23811,button_el_23809,seq__23756_23803__$1,temp__4425__auto___23802,el))
;
goog.events.listen(G__23767_23810,G__23768_23811,G__23769_23812);

var G__23815 = cljs.core.next(seq__23756_23803__$1);
var G__23816 = null;
var G__23817 = (0);
var G__23818 = (0);
seq__23756_23788 = G__23815;
chunk__23757_23789 = G__23816;
count__23758_23790 = G__23817;
i__23759_23791 = G__23818;
continue;
}
} else {
}
}
break;
}

var G__23819 = seq__23748;
var G__23820 = chunk__23753;
var G__23821 = count__23754;
var G__23822 = (i__23755 + (1));
seq__23748 = G__23819;
chunk__23753 = G__23820;
count__23754 = G__23821;
i__23755 = G__23822;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__23748);
if(temp__4425__auto__){
var seq__23748__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__23748__$1)){
var c__18976__auto__ = cljs.core.chunk_first(seq__23748__$1);
var G__23823 = cljs.core.chunk_rest(seq__23748__$1);
var G__23824 = c__18976__auto__;
var G__23825 = cljs.core.count(c__18976__auto__);
var G__23826 = (0);
seq__23748 = G__23823;
chunk__23753 = G__23824;
count__23754 = G__23825;
i__23755 = G__23826;
continue;
} else {
var el = cljs.core.first(seq__23748__$1);
var seq__23749_23827 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23750_23828 = null;
var count__23751_23829 = (0);
var i__23752_23830 = (0);
while(true){
if((i__23752_23830 < count__23751_23829)){
var button_el_23831 = chunk__23750_23828.cljs$core$IIndexed$_nth$arity$2(null,i__23752_23830);
var G__23774_23832 = button_el_23831;
var G__23775_23833 = "click";
var G__23776_23834 = ((function (seq__23749_23827,chunk__23750_23828,count__23751_23829,i__23752_23830,seq__23748,chunk__23753,count__23754,i__23755,G__23774_23832,G__23775_23833,button_el_23831,el,seq__23748__$1,temp__4425__auto__){
return (function (e){
var G__23777_23835 = el;
var G__23778_23836 = "show-menu";
goog.dom.classlist.toggle(G__23777_23835,G__23778_23836);

if(cljs.core.truth_((function (){var G__23779 = el;
var G__23780 = "show-menu";
return goog.dom.classlist.contains(G__23779,G__23780);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23749_23827,chunk__23750_23828,count__23751_23829,i__23752_23830,seq__23748,chunk__23753,count__23754,i__23755,G__23774_23832,G__23775_23833,button_el_23831,el,seq__23748__$1,temp__4425__auto__))
;
goog.events.listen(G__23774_23832,G__23775_23833,G__23776_23834);

var G__23837 = seq__23749_23827;
var G__23838 = chunk__23750_23828;
var G__23839 = count__23751_23829;
var G__23840 = (i__23752_23830 + (1));
seq__23749_23827 = G__23837;
chunk__23750_23828 = G__23838;
count__23751_23829 = G__23839;
i__23752_23830 = G__23840;
continue;
} else {
var temp__4425__auto___23841__$1 = cljs.core.seq(seq__23749_23827);
if(temp__4425__auto___23841__$1){
var seq__23749_23842__$1 = temp__4425__auto___23841__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23749_23842__$1)){
var c__18976__auto___23843 = cljs.core.chunk_first(seq__23749_23842__$1);
var G__23844 = cljs.core.chunk_rest(seq__23749_23842__$1);
var G__23845 = c__18976__auto___23843;
var G__23846 = cljs.core.count(c__18976__auto___23843);
var G__23847 = (0);
seq__23749_23827 = G__23844;
chunk__23750_23828 = G__23845;
count__23751_23829 = G__23846;
i__23752_23830 = G__23847;
continue;
} else {
var button_el_23848 = cljs.core.first(seq__23749_23842__$1);
var G__23781_23849 = button_el_23848;
var G__23782_23850 = "click";
var G__23783_23851 = ((function (seq__23749_23827,chunk__23750_23828,count__23751_23829,i__23752_23830,seq__23748,chunk__23753,count__23754,i__23755,G__23781_23849,G__23782_23850,button_el_23848,seq__23749_23842__$1,temp__4425__auto___23841__$1,el,seq__23748__$1,temp__4425__auto__){
return (function (e){
var G__23784_23852 = el;
var G__23785_23853 = "show-menu";
goog.dom.classlist.toggle(G__23784_23852,G__23785_23853);

if(cljs.core.truth_((function (){var G__23786 = el;
var G__23787 = "show-menu";
return goog.dom.classlist.contains(G__23786,G__23787);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23749_23827,chunk__23750_23828,count__23751_23829,i__23752_23830,seq__23748,chunk__23753,count__23754,i__23755,G__23781_23849,G__23782_23850,button_el_23848,seq__23749_23842__$1,temp__4425__auto___23841__$1,el,seq__23748__$1,temp__4425__auto__))
;
goog.events.listen(G__23781_23849,G__23782_23850,G__23783_23851);

var G__23854 = cljs.core.next(seq__23749_23842__$1);
var G__23855 = null;
var G__23856 = (0);
var G__23857 = (0);
seq__23749_23827 = G__23854;
chunk__23750_23828 = G__23855;
count__23751_23829 = G__23856;
i__23752_23830 = G__23857;
continue;
}
} else {
}
}
break;
}

var G__23858 = cljs.core.next(seq__23748__$1);
var G__23859 = null;
var G__23860 = (0);
var G__23861 = (0);
seq__23748 = G__23858;
chunk__23753 = G__23859;
count__23754 = G__23860;
i__23755 = G__23861;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23883 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23883) : cljs.core.deref.call(null,G__23883));
})()))){
var seq__23884_23904 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__23885_23905 = null;
var count__23886_23906 = (0);
var i__23887_23907 = (0);
while(true){
if((i__23887_23907 < count__23886_23906)){
var tag_23908 = chunk__23885_23905.cljs$core$IIndexed$_nth$arity$2(null,i__23887_23907);
var seq__23888_23909 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23908)));
var chunk__23889_23910 = null;
var count__23890_23911 = (0);
var i__23891_23912 = (0);
while(true){
if((i__23891_23912 < count__23890_23911)){
var button_23913 = chunk__23889_23910.cljs$core$IIndexed$_nth$arity$2(null,i__23891_23912);
var G__23892_23914 = button_23913;
var G__23893_23915 = "click";
goog.events.removeAll(G__23892_23914,G__23893_23915);

var G__23916 = seq__23888_23909;
var G__23917 = chunk__23889_23910;
var G__23918 = count__23890_23911;
var G__23919 = (i__23891_23912 + (1));
seq__23888_23909 = G__23916;
chunk__23889_23910 = G__23917;
count__23890_23911 = G__23918;
i__23891_23912 = G__23919;
continue;
} else {
var temp__4425__auto___23920 = cljs.core.seq(seq__23888_23909);
if(temp__4425__auto___23920){
var seq__23888_23921__$1 = temp__4425__auto___23920;
if(cljs.core.chunked_seq_QMARK_(seq__23888_23921__$1)){
var c__18976__auto___23922 = cljs.core.chunk_first(seq__23888_23921__$1);
var G__23923 = cljs.core.chunk_rest(seq__23888_23921__$1);
var G__23924 = c__18976__auto___23922;
var G__23925 = cljs.core.count(c__18976__auto___23922);
var G__23926 = (0);
seq__23888_23909 = G__23923;
chunk__23889_23910 = G__23924;
count__23890_23911 = G__23925;
i__23891_23912 = G__23926;
continue;
} else {
var button_23927 = cljs.core.first(seq__23888_23921__$1);
var G__23894_23928 = button_23927;
var G__23895_23929 = "click";
goog.events.removeAll(G__23894_23928,G__23895_23929);

var G__23930 = cljs.core.next(seq__23888_23921__$1);
var G__23931 = null;
var G__23932 = (0);
var G__23933 = (0);
seq__23888_23909 = G__23930;
chunk__23889_23910 = G__23931;
count__23890_23911 = G__23932;
i__23891_23912 = G__23933;
continue;
}
} else {
}
}
break;
}

var G__23934 = seq__23884_23904;
var G__23935 = chunk__23885_23905;
var G__23936 = count__23886_23906;
var G__23937 = (i__23887_23907 + (1));
seq__23884_23904 = G__23934;
chunk__23885_23905 = G__23935;
count__23886_23906 = G__23936;
i__23887_23907 = G__23937;
continue;
} else {
var temp__4425__auto___23938 = cljs.core.seq(seq__23884_23904);
if(temp__4425__auto___23938){
var seq__23884_23939__$1 = temp__4425__auto___23938;
if(cljs.core.chunked_seq_QMARK_(seq__23884_23939__$1)){
var c__18976__auto___23940 = cljs.core.chunk_first(seq__23884_23939__$1);
var G__23941 = cljs.core.chunk_rest(seq__23884_23939__$1);
var G__23942 = c__18976__auto___23940;
var G__23943 = cljs.core.count(c__18976__auto___23940);
var G__23944 = (0);
seq__23884_23904 = G__23941;
chunk__23885_23905 = G__23942;
count__23886_23906 = G__23943;
i__23887_23907 = G__23944;
continue;
} else {
var tag_23945 = cljs.core.first(seq__23884_23939__$1);
var seq__23896_23946 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23945)));
var chunk__23897_23947 = null;
var count__23898_23948 = (0);
var i__23899_23949 = (0);
while(true){
if((i__23899_23949 < count__23898_23948)){
var button_23950 = chunk__23897_23947.cljs$core$IIndexed$_nth$arity$2(null,i__23899_23949);
var G__23900_23951 = button_23950;
var G__23901_23952 = "click";
goog.events.removeAll(G__23900_23951,G__23901_23952);

var G__23953 = seq__23896_23946;
var G__23954 = chunk__23897_23947;
var G__23955 = count__23898_23948;
var G__23956 = (i__23899_23949 + (1));
seq__23896_23946 = G__23953;
chunk__23897_23947 = G__23954;
count__23898_23948 = G__23955;
i__23899_23949 = G__23956;
continue;
} else {
var temp__4425__auto___23957__$1 = cljs.core.seq(seq__23896_23946);
if(temp__4425__auto___23957__$1){
var seq__23896_23958__$1 = temp__4425__auto___23957__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23896_23958__$1)){
var c__18976__auto___23959 = cljs.core.chunk_first(seq__23896_23958__$1);
var G__23960 = cljs.core.chunk_rest(seq__23896_23958__$1);
var G__23961 = c__18976__auto___23959;
var G__23962 = cljs.core.count(c__18976__auto___23959);
var G__23963 = (0);
seq__23896_23946 = G__23960;
chunk__23897_23947 = G__23961;
count__23898_23948 = G__23962;
i__23899_23949 = G__23963;
continue;
} else {
var button_23964 = cljs.core.first(seq__23896_23958__$1);
var G__23902_23965 = button_23964;
var G__23903_23966 = "click";
goog.events.removeAll(G__23902_23965,G__23903_23966);

var G__23967 = cljs.core.next(seq__23896_23958__$1);
var G__23968 = null;
var G__23969 = (0);
var G__23970 = (0);
seq__23896_23946 = G__23967;
chunk__23897_23947 = G__23968;
count__23898_23948 = G__23969;
i__23899_23949 = G__23970;
continue;
}
} else {
}
}
break;
}

var G__23971 = cljs.core.next(seq__23884_23939__$1);
var G__23972 = null;
var G__23973 = (0);
var G__23974 = (0);
seq__23884_23904 = G__23971;
chunk__23885_23905 = G__23972;
count__23886_23906 = G__23973;
i__23887_23907 = G__23974;
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

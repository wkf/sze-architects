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
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true,cljs.core.array_seq([cljs.core.constant$keyword$fastclick,FastClick.attach(sze_architects.site.body)], 0));

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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23884 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23884) : cljs.core.deref.call(null,G__23884));
})()))){
var seq__23885_23906 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__23886_23907 = null;
var count__23887_23908 = (0);
var i__23888_23909 = (0);
while(true){
if((i__23888_23909 < count__23887_23908)){
var tag_23910 = chunk__23886_23907.cljs$core$IIndexed$_nth$arity$2(null,i__23888_23909);
var seq__23889_23911 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23910)));
var chunk__23890_23912 = null;
var count__23891_23913 = (0);
var i__23892_23914 = (0);
while(true){
if((i__23892_23914 < count__23891_23913)){
var button_23915 = chunk__23890_23912.cljs$core$IIndexed$_nth$arity$2(null,i__23892_23914);
var G__23893_23916 = button_23915;
var G__23894_23917 = "click";
goog.events.removeAll(G__23893_23916,G__23894_23917);

var G__23918 = seq__23889_23911;
var G__23919 = chunk__23890_23912;
var G__23920 = count__23891_23913;
var G__23921 = (i__23892_23914 + (1));
seq__23889_23911 = G__23918;
chunk__23890_23912 = G__23919;
count__23891_23913 = G__23920;
i__23892_23914 = G__23921;
continue;
} else {
var temp__4425__auto___23922 = cljs.core.seq(seq__23889_23911);
if(temp__4425__auto___23922){
var seq__23889_23923__$1 = temp__4425__auto___23922;
if(cljs.core.chunked_seq_QMARK_(seq__23889_23923__$1)){
var c__18976__auto___23924 = cljs.core.chunk_first(seq__23889_23923__$1);
var G__23925 = cljs.core.chunk_rest(seq__23889_23923__$1);
var G__23926 = c__18976__auto___23924;
var G__23927 = cljs.core.count(c__18976__auto___23924);
var G__23928 = (0);
seq__23889_23911 = G__23925;
chunk__23890_23912 = G__23926;
count__23891_23913 = G__23927;
i__23892_23914 = G__23928;
continue;
} else {
var button_23929 = cljs.core.first(seq__23889_23923__$1);
var G__23895_23930 = button_23929;
var G__23896_23931 = "click";
goog.events.removeAll(G__23895_23930,G__23896_23931);

var G__23932 = cljs.core.next(seq__23889_23923__$1);
var G__23933 = null;
var G__23934 = (0);
var G__23935 = (0);
seq__23889_23911 = G__23932;
chunk__23890_23912 = G__23933;
count__23891_23913 = G__23934;
i__23892_23914 = G__23935;
continue;
}
} else {
}
}
break;
}

var G__23936 = seq__23885_23906;
var G__23937 = chunk__23886_23907;
var G__23938 = count__23887_23908;
var G__23939 = (i__23888_23909 + (1));
seq__23885_23906 = G__23936;
chunk__23886_23907 = G__23937;
count__23887_23908 = G__23938;
i__23888_23909 = G__23939;
continue;
} else {
var temp__4425__auto___23940 = cljs.core.seq(seq__23885_23906);
if(temp__4425__auto___23940){
var seq__23885_23941__$1 = temp__4425__auto___23940;
if(cljs.core.chunked_seq_QMARK_(seq__23885_23941__$1)){
var c__18976__auto___23942 = cljs.core.chunk_first(seq__23885_23941__$1);
var G__23943 = cljs.core.chunk_rest(seq__23885_23941__$1);
var G__23944 = c__18976__auto___23942;
var G__23945 = cljs.core.count(c__18976__auto___23942);
var G__23946 = (0);
seq__23885_23906 = G__23943;
chunk__23886_23907 = G__23944;
count__23887_23908 = G__23945;
i__23888_23909 = G__23946;
continue;
} else {
var tag_23947 = cljs.core.first(seq__23885_23941__$1);
var seq__23897_23948 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23947)));
var chunk__23898_23949 = null;
var count__23899_23950 = (0);
var i__23900_23951 = (0);
while(true){
if((i__23900_23951 < count__23899_23950)){
var button_23952 = chunk__23898_23949.cljs$core$IIndexed$_nth$arity$2(null,i__23900_23951);
var G__23901_23953 = button_23952;
var G__23902_23954 = "click";
goog.events.removeAll(G__23901_23953,G__23902_23954);

var G__23955 = seq__23897_23948;
var G__23956 = chunk__23898_23949;
var G__23957 = count__23899_23950;
var G__23958 = (i__23900_23951 + (1));
seq__23897_23948 = G__23955;
chunk__23898_23949 = G__23956;
count__23899_23950 = G__23957;
i__23900_23951 = G__23958;
continue;
} else {
var temp__4425__auto___23959__$1 = cljs.core.seq(seq__23897_23948);
if(temp__4425__auto___23959__$1){
var seq__23897_23960__$1 = temp__4425__auto___23959__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23897_23960__$1)){
var c__18976__auto___23961 = cljs.core.chunk_first(seq__23897_23960__$1);
var G__23962 = cljs.core.chunk_rest(seq__23897_23960__$1);
var G__23963 = c__18976__auto___23961;
var G__23964 = cljs.core.count(c__18976__auto___23961);
var G__23965 = (0);
seq__23897_23948 = G__23962;
chunk__23898_23949 = G__23963;
count__23899_23950 = G__23964;
i__23900_23951 = G__23965;
continue;
} else {
var button_23966 = cljs.core.first(seq__23897_23960__$1);
var G__23903_23967 = button_23966;
var G__23904_23968 = "click";
goog.events.removeAll(G__23903_23967,G__23904_23968);

var G__23969 = cljs.core.next(seq__23897_23960__$1);
var G__23970 = null;
var G__23971 = (0);
var G__23972 = (0);
seq__23897_23948 = G__23969;
chunk__23898_23949 = G__23970;
count__23899_23950 = G__23971;
i__23900_23951 = G__23972;
continue;
}
} else {
}
}
break;
}

var G__23973 = cljs.core.next(seq__23885_23941__$1);
var G__23974 = null;
var G__23975 = (0);
var G__23976 = (0);
seq__23885_23906 = G__23973;
chunk__23886_23907 = G__23974;
count__23887_23908 = G__23975;
i__23888_23909 = G__23976;
continue;
}
} else {
}
}
break;
}

cljs.core.constant$keyword$fastclick.cljs$core$IFn$_invoke$arity$1((function (){var G__23905 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23905) : cljs.core.deref.call(null,G__23905));
})()).destroy();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,false);
} else {
return null;
}
});
sze_architects.site.start();

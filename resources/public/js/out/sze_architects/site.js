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
sze_architects.site.site = (function (){var G__23700 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23700) : cljs.core.atom.call(null,G__23700));
})();
}
sze_architects.site.get_element_by_tag = (function sze_architects$site$get_element_by_tag(tag){
return cljs.core.first((function (){var G__23702 = tag;
return goog.dom.getElementsByTagNameAndClass(G__23702);
})());
});
sze_architects.site.get_toggle_menu_buttons = (function sze_architects$site$get_toggle_menu_buttons(container){
var G__23705 = "toggle-menu";
var G__23706 = container;
return goog.dom.getElementsByClass(G__23705,G__23706);
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23748 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23748) : cljs.core.deref.call(null,G__23748));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

FastClick.attach(sze_architects.site.body);

var seq__23749 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sze_architects.site.header,sze_architects.site.footer], null));
var chunk__23754 = null;
var count__23755 = (0);
var i__23756 = (0);
while(true){
if((i__23756 < count__23755)){
var el = chunk__23754.cljs$core$IIndexed$_nth$arity$2(null,i__23756);
var seq__23757_23789 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23758_23790 = null;
var count__23759_23791 = (0);
var i__23760_23792 = (0);
while(true){
if((i__23760_23792 < count__23759_23791)){
var button_el_23793 = chunk__23758_23790.cljs$core$IIndexed$_nth$arity$2(null,i__23760_23792);
var G__23761_23794 = button_el_23793;
var G__23762_23795 = "click";
var G__23763_23796 = ((function (seq__23757_23789,chunk__23758_23790,count__23759_23791,i__23760_23792,seq__23749,chunk__23754,count__23755,i__23756,G__23761_23794,G__23762_23795,button_el_23793,el){
return (function (e){
var G__23764_23797 = el;
var G__23765_23798 = "show-menu";
goog.dom.classlist.toggle(G__23764_23797,G__23765_23798);

if(cljs.core.truth_((function (){var G__23766 = el;
var G__23767 = "show-menu";
return goog.dom.classlist.contains(G__23766,G__23767);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23757_23789,chunk__23758_23790,count__23759_23791,i__23760_23792,seq__23749,chunk__23754,count__23755,i__23756,G__23761_23794,G__23762_23795,button_el_23793,el))
;
goog.events.listen(G__23761_23794,G__23762_23795,G__23763_23796);

var G__23799 = seq__23757_23789;
var G__23800 = chunk__23758_23790;
var G__23801 = count__23759_23791;
var G__23802 = (i__23760_23792 + (1));
seq__23757_23789 = G__23799;
chunk__23758_23790 = G__23800;
count__23759_23791 = G__23801;
i__23760_23792 = G__23802;
continue;
} else {
var temp__4425__auto___23803 = cljs.core.seq(seq__23757_23789);
if(temp__4425__auto___23803){
var seq__23757_23804__$1 = temp__4425__auto___23803;
if(cljs.core.chunked_seq_QMARK_(seq__23757_23804__$1)){
var c__18977__auto___23805 = cljs.core.chunk_first(seq__23757_23804__$1);
var G__23806 = cljs.core.chunk_rest(seq__23757_23804__$1);
var G__23807 = c__18977__auto___23805;
var G__23808 = cljs.core.count(c__18977__auto___23805);
var G__23809 = (0);
seq__23757_23789 = G__23806;
chunk__23758_23790 = G__23807;
count__23759_23791 = G__23808;
i__23760_23792 = G__23809;
continue;
} else {
var button_el_23810 = cljs.core.first(seq__23757_23804__$1);
var G__23768_23811 = button_el_23810;
var G__23769_23812 = "click";
var G__23770_23813 = ((function (seq__23757_23789,chunk__23758_23790,count__23759_23791,i__23760_23792,seq__23749,chunk__23754,count__23755,i__23756,G__23768_23811,G__23769_23812,button_el_23810,seq__23757_23804__$1,temp__4425__auto___23803,el){
return (function (e){
var G__23771_23814 = el;
var G__23772_23815 = "show-menu";
goog.dom.classlist.toggle(G__23771_23814,G__23772_23815);

if(cljs.core.truth_((function (){var G__23773 = el;
var G__23774 = "show-menu";
return goog.dom.classlist.contains(G__23773,G__23774);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23757_23789,chunk__23758_23790,count__23759_23791,i__23760_23792,seq__23749,chunk__23754,count__23755,i__23756,G__23768_23811,G__23769_23812,button_el_23810,seq__23757_23804__$1,temp__4425__auto___23803,el))
;
goog.events.listen(G__23768_23811,G__23769_23812,G__23770_23813);

var G__23816 = cljs.core.next(seq__23757_23804__$1);
var G__23817 = null;
var G__23818 = (0);
var G__23819 = (0);
seq__23757_23789 = G__23816;
chunk__23758_23790 = G__23817;
count__23759_23791 = G__23818;
i__23760_23792 = G__23819;
continue;
}
} else {
}
}
break;
}

var G__23820 = seq__23749;
var G__23821 = chunk__23754;
var G__23822 = count__23755;
var G__23823 = (i__23756 + (1));
seq__23749 = G__23820;
chunk__23754 = G__23821;
count__23755 = G__23822;
i__23756 = G__23823;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__23749);
if(temp__4425__auto__){
var seq__23749__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__23749__$1)){
var c__18977__auto__ = cljs.core.chunk_first(seq__23749__$1);
var G__23824 = cljs.core.chunk_rest(seq__23749__$1);
var G__23825 = c__18977__auto__;
var G__23826 = cljs.core.count(c__18977__auto__);
var G__23827 = (0);
seq__23749 = G__23824;
chunk__23754 = G__23825;
count__23755 = G__23826;
i__23756 = G__23827;
continue;
} else {
var el = cljs.core.first(seq__23749__$1);
var seq__23750_23828 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23751_23829 = null;
var count__23752_23830 = (0);
var i__23753_23831 = (0);
while(true){
if((i__23753_23831 < count__23752_23830)){
var button_el_23832 = chunk__23751_23829.cljs$core$IIndexed$_nth$arity$2(null,i__23753_23831);
var G__23775_23833 = button_el_23832;
var G__23776_23834 = "click";
var G__23777_23835 = ((function (seq__23750_23828,chunk__23751_23829,count__23752_23830,i__23753_23831,seq__23749,chunk__23754,count__23755,i__23756,G__23775_23833,G__23776_23834,button_el_23832,el,seq__23749__$1,temp__4425__auto__){
return (function (e){
var G__23778_23836 = el;
var G__23779_23837 = "show-menu";
goog.dom.classlist.toggle(G__23778_23836,G__23779_23837);

if(cljs.core.truth_((function (){var G__23780 = el;
var G__23781 = "show-menu";
return goog.dom.classlist.contains(G__23780,G__23781);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23750_23828,chunk__23751_23829,count__23752_23830,i__23753_23831,seq__23749,chunk__23754,count__23755,i__23756,G__23775_23833,G__23776_23834,button_el_23832,el,seq__23749__$1,temp__4425__auto__))
;
goog.events.listen(G__23775_23833,G__23776_23834,G__23777_23835);

var G__23838 = seq__23750_23828;
var G__23839 = chunk__23751_23829;
var G__23840 = count__23752_23830;
var G__23841 = (i__23753_23831 + (1));
seq__23750_23828 = G__23838;
chunk__23751_23829 = G__23839;
count__23752_23830 = G__23840;
i__23753_23831 = G__23841;
continue;
} else {
var temp__4425__auto___23842__$1 = cljs.core.seq(seq__23750_23828);
if(temp__4425__auto___23842__$1){
var seq__23750_23843__$1 = temp__4425__auto___23842__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23750_23843__$1)){
var c__18977__auto___23844 = cljs.core.chunk_first(seq__23750_23843__$1);
var G__23845 = cljs.core.chunk_rest(seq__23750_23843__$1);
var G__23846 = c__18977__auto___23844;
var G__23847 = cljs.core.count(c__18977__auto___23844);
var G__23848 = (0);
seq__23750_23828 = G__23845;
chunk__23751_23829 = G__23846;
count__23752_23830 = G__23847;
i__23753_23831 = G__23848;
continue;
} else {
var button_el_23849 = cljs.core.first(seq__23750_23843__$1);
var G__23782_23850 = button_el_23849;
var G__23783_23851 = "click";
var G__23784_23852 = ((function (seq__23750_23828,chunk__23751_23829,count__23752_23830,i__23753_23831,seq__23749,chunk__23754,count__23755,i__23756,G__23782_23850,G__23783_23851,button_el_23849,seq__23750_23843__$1,temp__4425__auto___23842__$1,el,seq__23749__$1,temp__4425__auto__){
return (function (e){
var G__23785_23853 = el;
var G__23786_23854 = "show-menu";
goog.dom.classlist.toggle(G__23785_23853,G__23786_23854);

if(cljs.core.truth_((function (){var G__23787 = el;
var G__23788 = "show-menu";
return goog.dom.classlist.contains(G__23787,G__23788);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23750_23828,chunk__23751_23829,count__23752_23830,i__23753_23831,seq__23749,chunk__23754,count__23755,i__23756,G__23782_23850,G__23783_23851,button_el_23849,seq__23750_23843__$1,temp__4425__auto___23842__$1,el,seq__23749__$1,temp__4425__auto__))
;
goog.events.listen(G__23782_23850,G__23783_23851,G__23784_23852);

var G__23855 = cljs.core.next(seq__23750_23843__$1);
var G__23856 = null;
var G__23857 = (0);
var G__23858 = (0);
seq__23750_23828 = G__23855;
chunk__23751_23829 = G__23856;
count__23752_23830 = G__23857;
i__23753_23831 = G__23858;
continue;
}
} else {
}
}
break;
}

var G__23859 = cljs.core.next(seq__23749__$1);
var G__23860 = null;
var G__23861 = (0);
var G__23862 = (0);
seq__23749 = G__23859;
chunk__23754 = G__23860;
count__23755 = G__23861;
i__23756 = G__23862;
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
var seq__23885_23905 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__23886_23906 = null;
var count__23887_23907 = (0);
var i__23888_23908 = (0);
while(true){
if((i__23888_23908 < count__23887_23907)){
var tag_23909 = chunk__23886_23906.cljs$core$IIndexed$_nth$arity$2(null,i__23888_23908);
var seq__23889_23910 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23909)));
var chunk__23890_23911 = null;
var count__23891_23912 = (0);
var i__23892_23913 = (0);
while(true){
if((i__23892_23913 < count__23891_23912)){
var button_23914 = chunk__23890_23911.cljs$core$IIndexed$_nth$arity$2(null,i__23892_23913);
var G__23893_23915 = button_23914;
var G__23894_23916 = "click";
goog.events.removeAll(G__23893_23915,G__23894_23916);

var G__23917 = seq__23889_23910;
var G__23918 = chunk__23890_23911;
var G__23919 = count__23891_23912;
var G__23920 = (i__23892_23913 + (1));
seq__23889_23910 = G__23917;
chunk__23890_23911 = G__23918;
count__23891_23912 = G__23919;
i__23892_23913 = G__23920;
continue;
} else {
var temp__4425__auto___23921 = cljs.core.seq(seq__23889_23910);
if(temp__4425__auto___23921){
var seq__23889_23922__$1 = temp__4425__auto___23921;
if(cljs.core.chunked_seq_QMARK_(seq__23889_23922__$1)){
var c__18977__auto___23923 = cljs.core.chunk_first(seq__23889_23922__$1);
var G__23924 = cljs.core.chunk_rest(seq__23889_23922__$1);
var G__23925 = c__18977__auto___23923;
var G__23926 = cljs.core.count(c__18977__auto___23923);
var G__23927 = (0);
seq__23889_23910 = G__23924;
chunk__23890_23911 = G__23925;
count__23891_23912 = G__23926;
i__23892_23913 = G__23927;
continue;
} else {
var button_23928 = cljs.core.first(seq__23889_23922__$1);
var G__23895_23929 = button_23928;
var G__23896_23930 = "click";
goog.events.removeAll(G__23895_23929,G__23896_23930);

var G__23931 = cljs.core.next(seq__23889_23922__$1);
var G__23932 = null;
var G__23933 = (0);
var G__23934 = (0);
seq__23889_23910 = G__23931;
chunk__23890_23911 = G__23932;
count__23891_23912 = G__23933;
i__23892_23913 = G__23934;
continue;
}
} else {
}
}
break;
}

var G__23935 = seq__23885_23905;
var G__23936 = chunk__23886_23906;
var G__23937 = count__23887_23907;
var G__23938 = (i__23888_23908 + (1));
seq__23885_23905 = G__23935;
chunk__23886_23906 = G__23936;
count__23887_23907 = G__23937;
i__23888_23908 = G__23938;
continue;
} else {
var temp__4425__auto___23939 = cljs.core.seq(seq__23885_23905);
if(temp__4425__auto___23939){
var seq__23885_23940__$1 = temp__4425__auto___23939;
if(cljs.core.chunked_seq_QMARK_(seq__23885_23940__$1)){
var c__18977__auto___23941 = cljs.core.chunk_first(seq__23885_23940__$1);
var G__23942 = cljs.core.chunk_rest(seq__23885_23940__$1);
var G__23943 = c__18977__auto___23941;
var G__23944 = cljs.core.count(c__18977__auto___23941);
var G__23945 = (0);
seq__23885_23905 = G__23942;
chunk__23886_23906 = G__23943;
count__23887_23907 = G__23944;
i__23888_23908 = G__23945;
continue;
} else {
var tag_23946 = cljs.core.first(seq__23885_23940__$1);
var seq__23897_23947 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23946)));
var chunk__23898_23948 = null;
var count__23899_23949 = (0);
var i__23900_23950 = (0);
while(true){
if((i__23900_23950 < count__23899_23949)){
var button_23951 = chunk__23898_23948.cljs$core$IIndexed$_nth$arity$2(null,i__23900_23950);
var G__23901_23952 = button_23951;
var G__23902_23953 = "click";
goog.events.removeAll(G__23901_23952,G__23902_23953);

var G__23954 = seq__23897_23947;
var G__23955 = chunk__23898_23948;
var G__23956 = count__23899_23949;
var G__23957 = (i__23900_23950 + (1));
seq__23897_23947 = G__23954;
chunk__23898_23948 = G__23955;
count__23899_23949 = G__23956;
i__23900_23950 = G__23957;
continue;
} else {
var temp__4425__auto___23958__$1 = cljs.core.seq(seq__23897_23947);
if(temp__4425__auto___23958__$1){
var seq__23897_23959__$1 = temp__4425__auto___23958__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23897_23959__$1)){
var c__18977__auto___23960 = cljs.core.chunk_first(seq__23897_23959__$1);
var G__23961 = cljs.core.chunk_rest(seq__23897_23959__$1);
var G__23962 = c__18977__auto___23960;
var G__23963 = cljs.core.count(c__18977__auto___23960);
var G__23964 = (0);
seq__23897_23947 = G__23961;
chunk__23898_23948 = G__23962;
count__23899_23949 = G__23963;
i__23900_23950 = G__23964;
continue;
} else {
var button_23965 = cljs.core.first(seq__23897_23959__$1);
var G__23903_23966 = button_23965;
var G__23904_23967 = "click";
goog.events.removeAll(G__23903_23966,G__23904_23967);

var G__23968 = cljs.core.next(seq__23897_23959__$1);
var G__23969 = null;
var G__23970 = (0);
var G__23971 = (0);
seq__23897_23947 = G__23968;
chunk__23898_23948 = G__23969;
count__23899_23949 = G__23970;
i__23900_23950 = G__23971;
continue;
}
} else {
}
}
break;
}

var G__23972 = cljs.core.next(seq__23885_23940__$1);
var G__23973 = null;
var G__23974 = (0);
var G__23975 = (0);
seq__23885_23905 = G__23972;
chunk__23886_23906 = G__23973;
count__23887_23907 = G__23974;
i__23888_23908 = G__23975;
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

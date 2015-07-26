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
sze_architects.site.site = (function (){var G__23698 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23698) : cljs.core.atom.call(null,G__23698));
})();
}
sze_architects.site.get_element_by_tag = (function sze_architects$site$get_element_by_tag(tag){
return cljs.core.first((function (){var G__23700 = tag;
return goog.dom.getElementsByTagNameAndClass(G__23700);
})());
});
sze_architects.site.get_toggle_menu_buttons = (function sze_architects$site$get_toggle_menu_buttons(container){
var G__23703 = "toggle-menu";
var G__23704 = container;
return goog.dom.getElementsByClass(G__23703,G__23704);
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23746 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23746) : cljs.core.deref.call(null,G__23746));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

FastClick.attach(sze_architects.site.body);

var seq__23747 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sze_architects.site.header,sze_architects.site.footer], null));
var chunk__23752 = null;
var count__23753 = (0);
var i__23754 = (0);
while(true){
if((i__23754 < count__23753)){
var el = chunk__23752.cljs$core$IIndexed$_nth$arity$2(null,i__23754);
var seq__23755_23787 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23756_23788 = null;
var count__23757_23789 = (0);
var i__23758_23790 = (0);
while(true){
if((i__23758_23790 < count__23757_23789)){
var button_el_23791 = chunk__23756_23788.cljs$core$IIndexed$_nth$arity$2(null,i__23758_23790);
var G__23759_23792 = button_el_23791;
var G__23760_23793 = "click";
var G__23761_23794 = ((function (seq__23755_23787,chunk__23756_23788,count__23757_23789,i__23758_23790,seq__23747,chunk__23752,count__23753,i__23754,G__23759_23792,G__23760_23793,button_el_23791,el){
return (function (e){
var G__23762_23795 = el;
var G__23763_23796 = "show-menu";
goog.dom.classlist.toggle(G__23762_23795,G__23763_23796);

if(cljs.core.truth_((function (){var G__23764 = el;
var G__23765 = "show-menu";
return goog.dom.classlist.contains(G__23764,G__23765);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23755_23787,chunk__23756_23788,count__23757_23789,i__23758_23790,seq__23747,chunk__23752,count__23753,i__23754,G__23759_23792,G__23760_23793,button_el_23791,el))
;
goog.events.listen(G__23759_23792,G__23760_23793,G__23761_23794);

var G__23797 = seq__23755_23787;
var G__23798 = chunk__23756_23788;
var G__23799 = count__23757_23789;
var G__23800 = (i__23758_23790 + (1));
seq__23755_23787 = G__23797;
chunk__23756_23788 = G__23798;
count__23757_23789 = G__23799;
i__23758_23790 = G__23800;
continue;
} else {
var temp__4425__auto___23801 = cljs.core.seq(seq__23755_23787);
if(temp__4425__auto___23801){
var seq__23755_23802__$1 = temp__4425__auto___23801;
if(cljs.core.chunked_seq_QMARK_(seq__23755_23802__$1)){
var c__18975__auto___23803 = cljs.core.chunk_first(seq__23755_23802__$1);
var G__23804 = cljs.core.chunk_rest(seq__23755_23802__$1);
var G__23805 = c__18975__auto___23803;
var G__23806 = cljs.core.count(c__18975__auto___23803);
var G__23807 = (0);
seq__23755_23787 = G__23804;
chunk__23756_23788 = G__23805;
count__23757_23789 = G__23806;
i__23758_23790 = G__23807;
continue;
} else {
var button_el_23808 = cljs.core.first(seq__23755_23802__$1);
var G__23766_23809 = button_el_23808;
var G__23767_23810 = "click";
var G__23768_23811 = ((function (seq__23755_23787,chunk__23756_23788,count__23757_23789,i__23758_23790,seq__23747,chunk__23752,count__23753,i__23754,G__23766_23809,G__23767_23810,button_el_23808,seq__23755_23802__$1,temp__4425__auto___23801,el){
return (function (e){
var G__23769_23812 = el;
var G__23770_23813 = "show-menu";
goog.dom.classlist.toggle(G__23769_23812,G__23770_23813);

if(cljs.core.truth_((function (){var G__23771 = el;
var G__23772 = "show-menu";
return goog.dom.classlist.contains(G__23771,G__23772);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23755_23787,chunk__23756_23788,count__23757_23789,i__23758_23790,seq__23747,chunk__23752,count__23753,i__23754,G__23766_23809,G__23767_23810,button_el_23808,seq__23755_23802__$1,temp__4425__auto___23801,el))
;
goog.events.listen(G__23766_23809,G__23767_23810,G__23768_23811);

var G__23814 = cljs.core.next(seq__23755_23802__$1);
var G__23815 = null;
var G__23816 = (0);
var G__23817 = (0);
seq__23755_23787 = G__23814;
chunk__23756_23788 = G__23815;
count__23757_23789 = G__23816;
i__23758_23790 = G__23817;
continue;
}
} else {
}
}
break;
}

var G__23818 = seq__23747;
var G__23819 = chunk__23752;
var G__23820 = count__23753;
var G__23821 = (i__23754 + (1));
seq__23747 = G__23818;
chunk__23752 = G__23819;
count__23753 = G__23820;
i__23754 = G__23821;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__23747);
if(temp__4425__auto__){
var seq__23747__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__23747__$1)){
var c__18975__auto__ = cljs.core.chunk_first(seq__23747__$1);
var G__23822 = cljs.core.chunk_rest(seq__23747__$1);
var G__23823 = c__18975__auto__;
var G__23824 = cljs.core.count(c__18975__auto__);
var G__23825 = (0);
seq__23747 = G__23822;
chunk__23752 = G__23823;
count__23753 = G__23824;
i__23754 = G__23825;
continue;
} else {
var el = cljs.core.first(seq__23747__$1);
var seq__23748_23826 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23749_23827 = null;
var count__23750_23828 = (0);
var i__23751_23829 = (0);
while(true){
if((i__23751_23829 < count__23750_23828)){
var button_el_23830 = chunk__23749_23827.cljs$core$IIndexed$_nth$arity$2(null,i__23751_23829);
var G__23773_23831 = button_el_23830;
var G__23774_23832 = "click";
var G__23775_23833 = ((function (seq__23748_23826,chunk__23749_23827,count__23750_23828,i__23751_23829,seq__23747,chunk__23752,count__23753,i__23754,G__23773_23831,G__23774_23832,button_el_23830,el,seq__23747__$1,temp__4425__auto__){
return (function (e){
var G__23776_23834 = el;
var G__23777_23835 = "show-menu";
goog.dom.classlist.toggle(G__23776_23834,G__23777_23835);

if(cljs.core.truth_((function (){var G__23778 = el;
var G__23779 = "show-menu";
return goog.dom.classlist.contains(G__23778,G__23779);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23748_23826,chunk__23749_23827,count__23750_23828,i__23751_23829,seq__23747,chunk__23752,count__23753,i__23754,G__23773_23831,G__23774_23832,button_el_23830,el,seq__23747__$1,temp__4425__auto__))
;
goog.events.listen(G__23773_23831,G__23774_23832,G__23775_23833);

var G__23836 = seq__23748_23826;
var G__23837 = chunk__23749_23827;
var G__23838 = count__23750_23828;
var G__23839 = (i__23751_23829 + (1));
seq__23748_23826 = G__23836;
chunk__23749_23827 = G__23837;
count__23750_23828 = G__23838;
i__23751_23829 = G__23839;
continue;
} else {
var temp__4425__auto___23840__$1 = cljs.core.seq(seq__23748_23826);
if(temp__4425__auto___23840__$1){
var seq__23748_23841__$1 = temp__4425__auto___23840__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23748_23841__$1)){
var c__18975__auto___23842 = cljs.core.chunk_first(seq__23748_23841__$1);
var G__23843 = cljs.core.chunk_rest(seq__23748_23841__$1);
var G__23844 = c__18975__auto___23842;
var G__23845 = cljs.core.count(c__18975__auto___23842);
var G__23846 = (0);
seq__23748_23826 = G__23843;
chunk__23749_23827 = G__23844;
count__23750_23828 = G__23845;
i__23751_23829 = G__23846;
continue;
} else {
var button_el_23847 = cljs.core.first(seq__23748_23841__$1);
var G__23780_23848 = button_el_23847;
var G__23781_23849 = "click";
var G__23782_23850 = ((function (seq__23748_23826,chunk__23749_23827,count__23750_23828,i__23751_23829,seq__23747,chunk__23752,count__23753,i__23754,G__23780_23848,G__23781_23849,button_el_23847,seq__23748_23841__$1,temp__4425__auto___23840__$1,el,seq__23747__$1,temp__4425__auto__){
return (function (e){
var G__23783_23851 = el;
var G__23784_23852 = "show-menu";
goog.dom.classlist.toggle(G__23783_23851,G__23784_23852);

if(cljs.core.truth_((function (){var G__23785 = el;
var G__23786 = "show-menu";
return goog.dom.classlist.contains(G__23785,G__23786);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23748_23826,chunk__23749_23827,count__23750_23828,i__23751_23829,seq__23747,chunk__23752,count__23753,i__23754,G__23780_23848,G__23781_23849,button_el_23847,seq__23748_23841__$1,temp__4425__auto___23840__$1,el,seq__23747__$1,temp__4425__auto__))
;
goog.events.listen(G__23780_23848,G__23781_23849,G__23782_23850);

var G__23853 = cljs.core.next(seq__23748_23841__$1);
var G__23854 = null;
var G__23855 = (0);
var G__23856 = (0);
seq__23748_23826 = G__23853;
chunk__23749_23827 = G__23854;
count__23750_23828 = G__23855;
i__23751_23829 = G__23856;
continue;
}
} else {
}
}
break;
}

var G__23857 = cljs.core.next(seq__23747__$1);
var G__23858 = null;
var G__23859 = (0);
var G__23860 = (0);
seq__23747 = G__23857;
chunk__23752 = G__23858;
count__23753 = G__23859;
i__23754 = G__23860;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23882 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23882) : cljs.core.deref.call(null,G__23882));
})()))){
var seq__23883_23903 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__23884_23904 = null;
var count__23885_23905 = (0);
var i__23886_23906 = (0);
while(true){
if((i__23886_23906 < count__23885_23905)){
var tag_23907 = chunk__23884_23904.cljs$core$IIndexed$_nth$arity$2(null,i__23886_23906);
var seq__23887_23908 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23907)));
var chunk__23888_23909 = null;
var count__23889_23910 = (0);
var i__23890_23911 = (0);
while(true){
if((i__23890_23911 < count__23889_23910)){
var button_23912 = chunk__23888_23909.cljs$core$IIndexed$_nth$arity$2(null,i__23890_23911);
var G__23891_23913 = button_23912;
var G__23892_23914 = "click";
goog.events.removeAll(G__23891_23913,G__23892_23914);

var G__23915 = seq__23887_23908;
var G__23916 = chunk__23888_23909;
var G__23917 = count__23889_23910;
var G__23918 = (i__23890_23911 + (1));
seq__23887_23908 = G__23915;
chunk__23888_23909 = G__23916;
count__23889_23910 = G__23917;
i__23890_23911 = G__23918;
continue;
} else {
var temp__4425__auto___23919 = cljs.core.seq(seq__23887_23908);
if(temp__4425__auto___23919){
var seq__23887_23920__$1 = temp__4425__auto___23919;
if(cljs.core.chunked_seq_QMARK_(seq__23887_23920__$1)){
var c__18975__auto___23921 = cljs.core.chunk_first(seq__23887_23920__$1);
var G__23922 = cljs.core.chunk_rest(seq__23887_23920__$1);
var G__23923 = c__18975__auto___23921;
var G__23924 = cljs.core.count(c__18975__auto___23921);
var G__23925 = (0);
seq__23887_23908 = G__23922;
chunk__23888_23909 = G__23923;
count__23889_23910 = G__23924;
i__23890_23911 = G__23925;
continue;
} else {
var button_23926 = cljs.core.first(seq__23887_23920__$1);
var G__23893_23927 = button_23926;
var G__23894_23928 = "click";
goog.events.removeAll(G__23893_23927,G__23894_23928);

var G__23929 = cljs.core.next(seq__23887_23920__$1);
var G__23930 = null;
var G__23931 = (0);
var G__23932 = (0);
seq__23887_23908 = G__23929;
chunk__23888_23909 = G__23930;
count__23889_23910 = G__23931;
i__23890_23911 = G__23932;
continue;
}
} else {
}
}
break;
}

var G__23933 = seq__23883_23903;
var G__23934 = chunk__23884_23904;
var G__23935 = count__23885_23905;
var G__23936 = (i__23886_23906 + (1));
seq__23883_23903 = G__23933;
chunk__23884_23904 = G__23934;
count__23885_23905 = G__23935;
i__23886_23906 = G__23936;
continue;
} else {
var temp__4425__auto___23937 = cljs.core.seq(seq__23883_23903);
if(temp__4425__auto___23937){
var seq__23883_23938__$1 = temp__4425__auto___23937;
if(cljs.core.chunked_seq_QMARK_(seq__23883_23938__$1)){
var c__18975__auto___23939 = cljs.core.chunk_first(seq__23883_23938__$1);
var G__23940 = cljs.core.chunk_rest(seq__23883_23938__$1);
var G__23941 = c__18975__auto___23939;
var G__23942 = cljs.core.count(c__18975__auto___23939);
var G__23943 = (0);
seq__23883_23903 = G__23940;
chunk__23884_23904 = G__23941;
count__23885_23905 = G__23942;
i__23886_23906 = G__23943;
continue;
} else {
var tag_23944 = cljs.core.first(seq__23883_23938__$1);
var seq__23895_23945 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23944)));
var chunk__23896_23946 = null;
var count__23897_23947 = (0);
var i__23898_23948 = (0);
while(true){
if((i__23898_23948 < count__23897_23947)){
var button_23949 = chunk__23896_23946.cljs$core$IIndexed$_nth$arity$2(null,i__23898_23948);
var G__23899_23950 = button_23949;
var G__23900_23951 = "click";
goog.events.removeAll(G__23899_23950,G__23900_23951);

var G__23952 = seq__23895_23945;
var G__23953 = chunk__23896_23946;
var G__23954 = count__23897_23947;
var G__23955 = (i__23898_23948 + (1));
seq__23895_23945 = G__23952;
chunk__23896_23946 = G__23953;
count__23897_23947 = G__23954;
i__23898_23948 = G__23955;
continue;
} else {
var temp__4425__auto___23956__$1 = cljs.core.seq(seq__23895_23945);
if(temp__4425__auto___23956__$1){
var seq__23895_23957__$1 = temp__4425__auto___23956__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23895_23957__$1)){
var c__18975__auto___23958 = cljs.core.chunk_first(seq__23895_23957__$1);
var G__23959 = cljs.core.chunk_rest(seq__23895_23957__$1);
var G__23960 = c__18975__auto___23958;
var G__23961 = cljs.core.count(c__18975__auto___23958);
var G__23962 = (0);
seq__23895_23945 = G__23959;
chunk__23896_23946 = G__23960;
count__23897_23947 = G__23961;
i__23898_23948 = G__23962;
continue;
} else {
var button_23963 = cljs.core.first(seq__23895_23957__$1);
var G__23901_23964 = button_23963;
var G__23902_23965 = "click";
goog.events.removeAll(G__23901_23964,G__23902_23965);

var G__23966 = cljs.core.next(seq__23895_23957__$1);
var G__23967 = null;
var G__23968 = (0);
var G__23969 = (0);
seq__23895_23945 = G__23966;
chunk__23896_23946 = G__23967;
count__23897_23947 = G__23968;
i__23898_23948 = G__23969;
continue;
}
} else {
}
}
break;
}

var G__23970 = cljs.core.next(seq__23883_23938__$1);
var G__23971 = null;
var G__23972 = (0);
var G__23973 = (0);
seq__23883_23903 = G__23970;
chunk__23884_23904 = G__23971;
count__23885_23905 = G__23972;
i__23886_23906 = G__23973;
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

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
sze_architects.site.header = sze_architects.site.get_element_by_tag("header");
sze_architects.site.footer = sze_architects.site.get_element_by_tag("footer");
sze_architects.site.scroll_y = (function sze_architects$site$scroll_y(by){
var scroll = (function (){return goog.dom.getDocumentScroll();
})();
return (new goog.fx.dom.Scroll(sze_architects.site.body,[scroll.x,scroll.y],[scroll.x,(scroll.y + by)],(200))).play();
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23749 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23749) : cljs.core.deref.call(null,G__23749));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true,cljs.core.array_seq([cljs.core.constant$keyword$fastclick,FastClick.attach(sze_architects.site.body)], 0));

if(cljs.core.truth_('ontouchstart' in window)){
} else {
var G__23750_23793 = sze_architects.site.body;
var G__23751_23794 = "no-touch";
var G__23752_23795 = true;
goog.dom.classlist.enable(G__23750_23793,G__23751_23794,G__23752_23795);
}

var seq__23753 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sze_architects.site.header,sze_architects.site.footer], null));
var chunk__23758 = null;
var count__23759 = (0);
var i__23760 = (0);
while(true){
if((i__23760 < count__23759)){
var el = chunk__23758.cljs$core$IIndexed$_nth$arity$2(null,i__23760);
var seq__23761_23796 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23762_23797 = null;
var count__23763_23798 = (0);
var i__23764_23799 = (0);
while(true){
if((i__23764_23799 < count__23763_23798)){
var button_el_23800 = chunk__23762_23797.cljs$core$IIndexed$_nth$arity$2(null,i__23764_23799);
var G__23765_23801 = button_el_23800;
var G__23766_23802 = "click";
var G__23767_23803 = ((function (seq__23761_23796,chunk__23762_23797,count__23763_23798,i__23764_23799,seq__23753,chunk__23758,count__23759,i__23760,G__23765_23801,G__23766_23802,button_el_23800,el){
return (function (e){
var G__23768_23804 = el;
var G__23769_23805 = "show-menu";
goog.dom.classlist.toggle(G__23768_23804,G__23769_23805);

if(cljs.core.truth_((function (){var G__23770 = el;
var G__23771 = "show-menu";
return goog.dom.classlist.contains(G__23770,G__23771);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23761_23796,chunk__23762_23797,count__23763_23798,i__23764_23799,seq__23753,chunk__23758,count__23759,i__23760,G__23765_23801,G__23766_23802,button_el_23800,el))
;
goog.events.listen(G__23765_23801,G__23766_23802,G__23767_23803);

var G__23806 = seq__23761_23796;
var G__23807 = chunk__23762_23797;
var G__23808 = count__23763_23798;
var G__23809 = (i__23764_23799 + (1));
seq__23761_23796 = G__23806;
chunk__23762_23797 = G__23807;
count__23763_23798 = G__23808;
i__23764_23799 = G__23809;
continue;
} else {
var temp__4425__auto___23810 = cljs.core.seq(seq__23761_23796);
if(temp__4425__auto___23810){
var seq__23761_23811__$1 = temp__4425__auto___23810;
if(cljs.core.chunked_seq_QMARK_(seq__23761_23811__$1)){
var c__18975__auto___23812 = cljs.core.chunk_first(seq__23761_23811__$1);
var G__23813 = cljs.core.chunk_rest(seq__23761_23811__$1);
var G__23814 = c__18975__auto___23812;
var G__23815 = cljs.core.count(c__18975__auto___23812);
var G__23816 = (0);
seq__23761_23796 = G__23813;
chunk__23762_23797 = G__23814;
count__23763_23798 = G__23815;
i__23764_23799 = G__23816;
continue;
} else {
var button_el_23817 = cljs.core.first(seq__23761_23811__$1);
var G__23772_23818 = button_el_23817;
var G__23773_23819 = "click";
var G__23774_23820 = ((function (seq__23761_23796,chunk__23762_23797,count__23763_23798,i__23764_23799,seq__23753,chunk__23758,count__23759,i__23760,G__23772_23818,G__23773_23819,button_el_23817,seq__23761_23811__$1,temp__4425__auto___23810,el){
return (function (e){
var G__23775_23821 = el;
var G__23776_23822 = "show-menu";
goog.dom.classlist.toggle(G__23775_23821,G__23776_23822);

if(cljs.core.truth_((function (){var G__23777 = el;
var G__23778 = "show-menu";
return goog.dom.classlist.contains(G__23777,G__23778);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23761_23796,chunk__23762_23797,count__23763_23798,i__23764_23799,seq__23753,chunk__23758,count__23759,i__23760,G__23772_23818,G__23773_23819,button_el_23817,seq__23761_23811__$1,temp__4425__auto___23810,el))
;
goog.events.listen(G__23772_23818,G__23773_23819,G__23774_23820);

var G__23823 = cljs.core.next(seq__23761_23811__$1);
var G__23824 = null;
var G__23825 = (0);
var G__23826 = (0);
seq__23761_23796 = G__23823;
chunk__23762_23797 = G__23824;
count__23763_23798 = G__23825;
i__23764_23799 = G__23826;
continue;
}
} else {
}
}
break;
}

var G__23827 = seq__23753;
var G__23828 = chunk__23758;
var G__23829 = count__23759;
var G__23830 = (i__23760 + (1));
seq__23753 = G__23827;
chunk__23758 = G__23828;
count__23759 = G__23829;
i__23760 = G__23830;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__23753);
if(temp__4425__auto__){
var seq__23753__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__23753__$1)){
var c__18975__auto__ = cljs.core.chunk_first(seq__23753__$1);
var G__23831 = cljs.core.chunk_rest(seq__23753__$1);
var G__23832 = c__18975__auto__;
var G__23833 = cljs.core.count(c__18975__auto__);
var G__23834 = (0);
seq__23753 = G__23831;
chunk__23758 = G__23832;
count__23759 = G__23833;
i__23760 = G__23834;
continue;
} else {
var el = cljs.core.first(seq__23753__$1);
var seq__23754_23835 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23755_23836 = null;
var count__23756_23837 = (0);
var i__23757_23838 = (0);
while(true){
if((i__23757_23838 < count__23756_23837)){
var button_el_23839 = chunk__23755_23836.cljs$core$IIndexed$_nth$arity$2(null,i__23757_23838);
var G__23779_23840 = button_el_23839;
var G__23780_23841 = "click";
var G__23781_23842 = ((function (seq__23754_23835,chunk__23755_23836,count__23756_23837,i__23757_23838,seq__23753,chunk__23758,count__23759,i__23760,G__23779_23840,G__23780_23841,button_el_23839,el,seq__23753__$1,temp__4425__auto__){
return (function (e){
var G__23782_23843 = el;
var G__23783_23844 = "show-menu";
goog.dom.classlist.toggle(G__23782_23843,G__23783_23844);

if(cljs.core.truth_((function (){var G__23784 = el;
var G__23785 = "show-menu";
return goog.dom.classlist.contains(G__23784,G__23785);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23754_23835,chunk__23755_23836,count__23756_23837,i__23757_23838,seq__23753,chunk__23758,count__23759,i__23760,G__23779_23840,G__23780_23841,button_el_23839,el,seq__23753__$1,temp__4425__auto__))
;
goog.events.listen(G__23779_23840,G__23780_23841,G__23781_23842);

var G__23845 = seq__23754_23835;
var G__23846 = chunk__23755_23836;
var G__23847 = count__23756_23837;
var G__23848 = (i__23757_23838 + (1));
seq__23754_23835 = G__23845;
chunk__23755_23836 = G__23846;
count__23756_23837 = G__23847;
i__23757_23838 = G__23848;
continue;
} else {
var temp__4425__auto___23849__$1 = cljs.core.seq(seq__23754_23835);
if(temp__4425__auto___23849__$1){
var seq__23754_23850__$1 = temp__4425__auto___23849__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23754_23850__$1)){
var c__18975__auto___23851 = cljs.core.chunk_first(seq__23754_23850__$1);
var G__23852 = cljs.core.chunk_rest(seq__23754_23850__$1);
var G__23853 = c__18975__auto___23851;
var G__23854 = cljs.core.count(c__18975__auto___23851);
var G__23855 = (0);
seq__23754_23835 = G__23852;
chunk__23755_23836 = G__23853;
count__23756_23837 = G__23854;
i__23757_23838 = G__23855;
continue;
} else {
var button_el_23856 = cljs.core.first(seq__23754_23850__$1);
var G__23786_23857 = button_el_23856;
var G__23787_23858 = "click";
var G__23788_23859 = ((function (seq__23754_23835,chunk__23755_23836,count__23756_23837,i__23757_23838,seq__23753,chunk__23758,count__23759,i__23760,G__23786_23857,G__23787_23858,button_el_23856,seq__23754_23850__$1,temp__4425__auto___23849__$1,el,seq__23753__$1,temp__4425__auto__){
return (function (e){
var G__23789_23860 = el;
var G__23790_23861 = "show-menu";
goog.dom.classlist.toggle(G__23789_23860,G__23790_23861);

if(cljs.core.truth_((function (){var G__23791 = el;
var G__23792 = "show-menu";
return goog.dom.classlist.contains(G__23791,G__23792);
})())){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
} else {
return null;
}
});})(seq__23754_23835,chunk__23755_23836,count__23756_23837,i__23757_23838,seq__23753,chunk__23758,count__23759,i__23760,G__23786_23857,G__23787_23858,button_el_23856,seq__23754_23850__$1,temp__4425__auto___23849__$1,el,seq__23753__$1,temp__4425__auto__))
;
goog.events.listen(G__23786_23857,G__23787_23858,G__23788_23859);

var G__23862 = cljs.core.next(seq__23754_23850__$1);
var G__23863 = null;
var G__23864 = (0);
var G__23865 = (0);
seq__23754_23835 = G__23862;
chunk__23755_23836 = G__23863;
count__23756_23837 = G__23864;
i__23757_23838 = G__23865;
continue;
}
} else {
}
}
break;
}

var G__23866 = cljs.core.next(seq__23753__$1);
var G__23867 = null;
var G__23868 = (0);
var G__23869 = (0);
seq__23753 = G__23866;
chunk__23758 = G__23867;
count__23759 = G__23868;
i__23760 = G__23869;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23895 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23895) : cljs.core.deref.call(null,G__23895));
})()))){
var temp__4425__auto___23920 = cljs.core.constant$keyword$fastclick.cljs$core$IFn$_invoke$arity$1((function (){var G__23896 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23896) : cljs.core.deref.call(null,G__23896));
})());
if(cljs.core.truth_(temp__4425__auto___23920)){
var fastclick_23921 = temp__4425__auto___23920;
fastclick_23921.destroy();
} else {
}

var G__23897_23922 = sze_architects.site.body;
var G__23898_23923 = "no-touch";
var G__23899_23924 = false;
goog.dom.classlist.enable(G__23897_23922,G__23898_23923,G__23899_23924);

var seq__23900_23925 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__23901_23926 = null;
var count__23902_23927 = (0);
var i__23903_23928 = (0);
while(true){
if((i__23903_23928 < count__23902_23927)){
var tag_23929 = chunk__23901_23926.cljs$core$IIndexed$_nth$arity$2(null,i__23903_23928);
var seq__23904_23930 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23929)));
var chunk__23905_23931 = null;
var count__23906_23932 = (0);
var i__23907_23933 = (0);
while(true){
if((i__23907_23933 < count__23906_23932)){
var button_23934 = chunk__23905_23931.cljs$core$IIndexed$_nth$arity$2(null,i__23907_23933);
var G__23908_23935 = button_23934;
var G__23909_23936 = "click";
goog.events.removeAll(G__23908_23935,G__23909_23936);

var G__23937 = seq__23904_23930;
var G__23938 = chunk__23905_23931;
var G__23939 = count__23906_23932;
var G__23940 = (i__23907_23933 + (1));
seq__23904_23930 = G__23937;
chunk__23905_23931 = G__23938;
count__23906_23932 = G__23939;
i__23907_23933 = G__23940;
continue;
} else {
var temp__4425__auto___23941 = cljs.core.seq(seq__23904_23930);
if(temp__4425__auto___23941){
var seq__23904_23942__$1 = temp__4425__auto___23941;
if(cljs.core.chunked_seq_QMARK_(seq__23904_23942__$1)){
var c__18975__auto___23943 = cljs.core.chunk_first(seq__23904_23942__$1);
var G__23944 = cljs.core.chunk_rest(seq__23904_23942__$1);
var G__23945 = c__18975__auto___23943;
var G__23946 = cljs.core.count(c__18975__auto___23943);
var G__23947 = (0);
seq__23904_23930 = G__23944;
chunk__23905_23931 = G__23945;
count__23906_23932 = G__23946;
i__23907_23933 = G__23947;
continue;
} else {
var button_23948 = cljs.core.first(seq__23904_23942__$1);
var G__23910_23949 = button_23948;
var G__23911_23950 = "click";
goog.events.removeAll(G__23910_23949,G__23911_23950);

var G__23951 = cljs.core.next(seq__23904_23942__$1);
var G__23952 = null;
var G__23953 = (0);
var G__23954 = (0);
seq__23904_23930 = G__23951;
chunk__23905_23931 = G__23952;
count__23906_23932 = G__23953;
i__23907_23933 = G__23954;
continue;
}
} else {
}
}
break;
}

var G__23955 = seq__23900_23925;
var G__23956 = chunk__23901_23926;
var G__23957 = count__23902_23927;
var G__23958 = (i__23903_23928 + (1));
seq__23900_23925 = G__23955;
chunk__23901_23926 = G__23956;
count__23902_23927 = G__23957;
i__23903_23928 = G__23958;
continue;
} else {
var temp__4425__auto___23959 = cljs.core.seq(seq__23900_23925);
if(temp__4425__auto___23959){
var seq__23900_23960__$1 = temp__4425__auto___23959;
if(cljs.core.chunked_seq_QMARK_(seq__23900_23960__$1)){
var c__18975__auto___23961 = cljs.core.chunk_first(seq__23900_23960__$1);
var G__23962 = cljs.core.chunk_rest(seq__23900_23960__$1);
var G__23963 = c__18975__auto___23961;
var G__23964 = cljs.core.count(c__18975__auto___23961);
var G__23965 = (0);
seq__23900_23925 = G__23962;
chunk__23901_23926 = G__23963;
count__23902_23927 = G__23964;
i__23903_23928 = G__23965;
continue;
} else {
var tag_23966 = cljs.core.first(seq__23900_23960__$1);
var seq__23912_23967 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_23966)));
var chunk__23913_23968 = null;
var count__23914_23969 = (0);
var i__23915_23970 = (0);
while(true){
if((i__23915_23970 < count__23914_23969)){
var button_23971 = chunk__23913_23968.cljs$core$IIndexed$_nth$arity$2(null,i__23915_23970);
var G__23916_23972 = button_23971;
var G__23917_23973 = "click";
goog.events.removeAll(G__23916_23972,G__23917_23973);

var G__23974 = seq__23912_23967;
var G__23975 = chunk__23913_23968;
var G__23976 = count__23914_23969;
var G__23977 = (i__23915_23970 + (1));
seq__23912_23967 = G__23974;
chunk__23913_23968 = G__23975;
count__23914_23969 = G__23976;
i__23915_23970 = G__23977;
continue;
} else {
var temp__4425__auto___23978__$1 = cljs.core.seq(seq__23912_23967);
if(temp__4425__auto___23978__$1){
var seq__23912_23979__$1 = temp__4425__auto___23978__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23912_23979__$1)){
var c__18975__auto___23980 = cljs.core.chunk_first(seq__23912_23979__$1);
var G__23981 = cljs.core.chunk_rest(seq__23912_23979__$1);
var G__23982 = c__18975__auto___23980;
var G__23983 = cljs.core.count(c__18975__auto___23980);
var G__23984 = (0);
seq__23912_23967 = G__23981;
chunk__23913_23968 = G__23982;
count__23914_23969 = G__23983;
i__23915_23970 = G__23984;
continue;
} else {
var button_23985 = cljs.core.first(seq__23912_23979__$1);
var G__23918_23986 = button_23985;
var G__23919_23987 = "click";
goog.events.removeAll(G__23918_23986,G__23919_23987);

var G__23988 = cljs.core.next(seq__23912_23979__$1);
var G__23989 = null;
var G__23990 = (0);
var G__23991 = (0);
seq__23912_23967 = G__23988;
chunk__23913_23968 = G__23989;
count__23914_23969 = G__23990;
i__23915_23970 = G__23991;
continue;
}
} else {
}
}
break;
}

var G__23992 = cljs.core.next(seq__23900_23960__$1);
var G__23993 = null;
var G__23994 = (0);
var G__23995 = (0);
seq__23900_23925 = G__23992;
chunk__23901_23926 = G__23993;
count__23902_23927 = G__23994;
i__23903_23928 = G__23995;
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

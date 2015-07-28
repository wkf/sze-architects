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
sze_architects.site.transition_end = ["transitionend","webkitTransitionEnd","msTransitionEnd","oTransitionEnd"];
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23776 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23776) : cljs.core.deref.call(null,G__23776));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(sze_architects.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true,cljs.core.array_seq([cljs.core.constant$keyword$fastclick,FastClick.attach(sze_architects.site.body)], 0));

if(cljs.core.not('ontouchstart' in window)){
var G__23777_23847 = sze_architects.site.body;
var G__23778_23848 = "no-touch";
var G__23779_23849 = true;
goog.dom.classlist.enable(G__23777_23847,G__23778_23848,G__23779_23849);
} else {
var seq__23780_23850 = cljs.core.seq((function (){var G__23784 = "image-card";
return goog.dom.getElementsByClass(G__23784);
})());
var chunk__23781_23851 = null;
var count__23782_23852 = (0);
var i__23783_23853 = (0);
while(true){
if((i__23783_23853 < count__23782_23852)){
var el_23854 = chunk__23781_23851.cljs$core$IIndexed$_nth$arity$2(null,i__23783_23853);
var G__23785_23855 = el_23854;
var G__23786_23856 = "click";
var G__23787_23857 = ((function (seq__23780_23850,chunk__23781_23851,count__23782_23852,i__23783_23853,G__23785_23855,G__23786_23856,el_23854){
return (function (){
var G__23788 = el_23854;
var G__23789 = "show-overlay";
return goog.dom.classlist.toggle(G__23788,G__23789);
});})(seq__23780_23850,chunk__23781_23851,count__23782_23852,i__23783_23853,G__23785_23855,G__23786_23856,el_23854))
;
goog.events.listen(G__23785_23855,G__23786_23856,G__23787_23857);

var G__23858 = seq__23780_23850;
var G__23859 = chunk__23781_23851;
var G__23860 = count__23782_23852;
var G__23861 = (i__23783_23853 + (1));
seq__23780_23850 = G__23858;
chunk__23781_23851 = G__23859;
count__23782_23852 = G__23860;
i__23783_23853 = G__23861;
continue;
} else {
var temp__4425__auto___23862 = cljs.core.seq(seq__23780_23850);
if(temp__4425__auto___23862){
var seq__23780_23863__$1 = temp__4425__auto___23862;
if(cljs.core.chunked_seq_QMARK_(seq__23780_23863__$1)){
var c__18975__auto___23864 = cljs.core.chunk_first(seq__23780_23863__$1);
var G__23865 = cljs.core.chunk_rest(seq__23780_23863__$1);
var G__23866 = c__18975__auto___23864;
var G__23867 = cljs.core.count(c__18975__auto___23864);
var G__23868 = (0);
seq__23780_23850 = G__23865;
chunk__23781_23851 = G__23866;
count__23782_23852 = G__23867;
i__23783_23853 = G__23868;
continue;
} else {
var el_23869 = cljs.core.first(seq__23780_23863__$1);
var G__23790_23870 = el_23869;
var G__23791_23871 = "click";
var G__23792_23872 = ((function (seq__23780_23850,chunk__23781_23851,count__23782_23852,i__23783_23853,G__23790_23870,G__23791_23871,el_23869,seq__23780_23863__$1,temp__4425__auto___23862){
return (function (){
var G__23793 = el_23869;
var G__23794 = "show-overlay";
return goog.dom.classlist.toggle(G__23793,G__23794);
});})(seq__23780_23850,chunk__23781_23851,count__23782_23852,i__23783_23853,G__23790_23870,G__23791_23871,el_23869,seq__23780_23863__$1,temp__4425__auto___23862))
;
goog.events.listen(G__23790_23870,G__23791_23871,G__23792_23872);

var G__23873 = cljs.core.next(seq__23780_23863__$1);
var G__23874 = null;
var G__23875 = (0);
var G__23876 = (0);
seq__23780_23850 = G__23873;
chunk__23781_23851 = G__23874;
count__23782_23852 = G__23875;
i__23783_23853 = G__23876;
continue;
}
} else {
}
}
break;
}
}

var seq__23795 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sze_architects.site.header,sze_architects.site.footer], null));
var chunk__23800 = null;
var count__23801 = (0);
var i__23802 = (0);
while(true){
if((i__23802 < count__23801)){
var el = chunk__23800.cljs$core$IIndexed$_nth$arity$2(null,i__23802);
var seq__23803_23877 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23804_23878 = null;
var count__23805_23879 = (0);
var i__23806_23880 = (0);
while(true){
if((i__23806_23880 < count__23805_23879)){
var button_el_23881 = chunk__23804_23878.cljs$core$IIndexed$_nth$arity$2(null,i__23806_23880);
var G__23807_23882 = button_el_23881;
var G__23808_23883 = "click";
var G__23809_23884 = ((function (seq__23803_23877,chunk__23804_23878,count__23805_23879,i__23806_23880,seq__23795,chunk__23800,count__23801,i__23802,G__23807_23882,G__23808_23883,button_el_23881,el){
return (function (e){
var G__23810_23885 = el;
var G__23811_23886 = "show-menu";
goog.dom.classlist.toggle(G__23810_23885,G__23811_23886);

if(cljs.core.truth_((function (){var G__23812 = el;
var G__23813 = "show-menu";
return goog.dom.classlist.contains(G__23812,G__23813);
})())){
var G__23814 = el;
var G__23815 = sze_architects.site.transition_end;
var G__23816 = ((function (seq__23803_23877,chunk__23804_23878,count__23805_23879,i__23806_23880,seq__23795,chunk__23800,count__23801,i__23802,G__23814,G__23815,G__23807_23882,G__23808_23883,button_el_23881,el){
return (function (){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
});})(seq__23803_23877,chunk__23804_23878,count__23805_23879,i__23806_23880,seq__23795,chunk__23800,count__23801,i__23802,G__23814,G__23815,G__23807_23882,G__23808_23883,button_el_23881,el))
;
return goog.events.listenOnce(G__23814,G__23815,G__23816);
} else {
return null;
}
});})(seq__23803_23877,chunk__23804_23878,count__23805_23879,i__23806_23880,seq__23795,chunk__23800,count__23801,i__23802,G__23807_23882,G__23808_23883,button_el_23881,el))
;
goog.events.listen(G__23807_23882,G__23808_23883,G__23809_23884);

var G__23887 = seq__23803_23877;
var G__23888 = chunk__23804_23878;
var G__23889 = count__23805_23879;
var G__23890 = (i__23806_23880 + (1));
seq__23803_23877 = G__23887;
chunk__23804_23878 = G__23888;
count__23805_23879 = G__23889;
i__23806_23880 = G__23890;
continue;
} else {
var temp__4425__auto___23891 = cljs.core.seq(seq__23803_23877);
if(temp__4425__auto___23891){
var seq__23803_23892__$1 = temp__4425__auto___23891;
if(cljs.core.chunked_seq_QMARK_(seq__23803_23892__$1)){
var c__18975__auto___23893 = cljs.core.chunk_first(seq__23803_23892__$1);
var G__23894 = cljs.core.chunk_rest(seq__23803_23892__$1);
var G__23895 = c__18975__auto___23893;
var G__23896 = cljs.core.count(c__18975__auto___23893);
var G__23897 = (0);
seq__23803_23877 = G__23894;
chunk__23804_23878 = G__23895;
count__23805_23879 = G__23896;
i__23806_23880 = G__23897;
continue;
} else {
var button_el_23898 = cljs.core.first(seq__23803_23892__$1);
var G__23817_23899 = button_el_23898;
var G__23818_23900 = "click";
var G__23819_23901 = ((function (seq__23803_23877,chunk__23804_23878,count__23805_23879,i__23806_23880,seq__23795,chunk__23800,count__23801,i__23802,G__23817_23899,G__23818_23900,button_el_23898,seq__23803_23892__$1,temp__4425__auto___23891,el){
return (function (e){
var G__23820_23902 = el;
var G__23821_23903 = "show-menu";
goog.dom.classlist.toggle(G__23820_23902,G__23821_23903);

if(cljs.core.truth_((function (){var G__23822 = el;
var G__23823 = "show-menu";
return goog.dom.classlist.contains(G__23822,G__23823);
})())){
var G__23824 = el;
var G__23825 = sze_architects.site.transition_end;
var G__23826 = ((function (seq__23803_23877,chunk__23804_23878,count__23805_23879,i__23806_23880,seq__23795,chunk__23800,count__23801,i__23802,G__23824,G__23825,G__23817_23899,G__23818_23900,button_el_23898,seq__23803_23892__$1,temp__4425__auto___23891,el){
return (function (){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
});})(seq__23803_23877,chunk__23804_23878,count__23805_23879,i__23806_23880,seq__23795,chunk__23800,count__23801,i__23802,G__23824,G__23825,G__23817_23899,G__23818_23900,button_el_23898,seq__23803_23892__$1,temp__4425__auto___23891,el))
;
return goog.events.listenOnce(G__23824,G__23825,G__23826);
} else {
return null;
}
});})(seq__23803_23877,chunk__23804_23878,count__23805_23879,i__23806_23880,seq__23795,chunk__23800,count__23801,i__23802,G__23817_23899,G__23818_23900,button_el_23898,seq__23803_23892__$1,temp__4425__auto___23891,el))
;
goog.events.listen(G__23817_23899,G__23818_23900,G__23819_23901);

var G__23904 = cljs.core.next(seq__23803_23892__$1);
var G__23905 = null;
var G__23906 = (0);
var G__23907 = (0);
seq__23803_23877 = G__23904;
chunk__23804_23878 = G__23905;
count__23805_23879 = G__23906;
i__23806_23880 = G__23907;
continue;
}
} else {
}
}
break;
}

var G__23908 = seq__23795;
var G__23909 = chunk__23800;
var G__23910 = count__23801;
var G__23911 = (i__23802 + (1));
seq__23795 = G__23908;
chunk__23800 = G__23909;
count__23801 = G__23910;
i__23802 = G__23911;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__23795);
if(temp__4425__auto__){
var seq__23795__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__23795__$1)){
var c__18975__auto__ = cljs.core.chunk_first(seq__23795__$1);
var G__23912 = cljs.core.chunk_rest(seq__23795__$1);
var G__23913 = c__18975__auto__;
var G__23914 = cljs.core.count(c__18975__auto__);
var G__23915 = (0);
seq__23795 = G__23912;
chunk__23800 = G__23913;
count__23801 = G__23914;
i__23802 = G__23915;
continue;
} else {
var el = cljs.core.first(seq__23795__$1);
var seq__23796_23916 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(el));
var chunk__23797_23917 = null;
var count__23798_23918 = (0);
var i__23799_23919 = (0);
while(true){
if((i__23799_23919 < count__23798_23918)){
var button_el_23920 = chunk__23797_23917.cljs$core$IIndexed$_nth$arity$2(null,i__23799_23919);
var G__23827_23921 = button_el_23920;
var G__23828_23922 = "click";
var G__23829_23923 = ((function (seq__23796_23916,chunk__23797_23917,count__23798_23918,i__23799_23919,seq__23795,chunk__23800,count__23801,i__23802,G__23827_23921,G__23828_23922,button_el_23920,el,seq__23795__$1,temp__4425__auto__){
return (function (e){
var G__23830_23924 = el;
var G__23831_23925 = "show-menu";
goog.dom.classlist.toggle(G__23830_23924,G__23831_23925);

if(cljs.core.truth_((function (){var G__23832 = el;
var G__23833 = "show-menu";
return goog.dom.classlist.contains(G__23832,G__23833);
})())){
var G__23834 = el;
var G__23835 = sze_architects.site.transition_end;
var G__23836 = ((function (seq__23796_23916,chunk__23797_23917,count__23798_23918,i__23799_23919,seq__23795,chunk__23800,count__23801,i__23802,G__23834,G__23835,G__23827_23921,G__23828_23922,button_el_23920,el,seq__23795__$1,temp__4425__auto__){
return (function (){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
});})(seq__23796_23916,chunk__23797_23917,count__23798_23918,i__23799_23919,seq__23795,chunk__23800,count__23801,i__23802,G__23834,G__23835,G__23827_23921,G__23828_23922,button_el_23920,el,seq__23795__$1,temp__4425__auto__))
;
return goog.events.listenOnce(G__23834,G__23835,G__23836);
} else {
return null;
}
});})(seq__23796_23916,chunk__23797_23917,count__23798_23918,i__23799_23919,seq__23795,chunk__23800,count__23801,i__23802,G__23827_23921,G__23828_23922,button_el_23920,el,seq__23795__$1,temp__4425__auto__))
;
goog.events.listen(G__23827_23921,G__23828_23922,G__23829_23923);

var G__23926 = seq__23796_23916;
var G__23927 = chunk__23797_23917;
var G__23928 = count__23798_23918;
var G__23929 = (i__23799_23919 + (1));
seq__23796_23916 = G__23926;
chunk__23797_23917 = G__23927;
count__23798_23918 = G__23928;
i__23799_23919 = G__23929;
continue;
} else {
var temp__4425__auto___23930__$1 = cljs.core.seq(seq__23796_23916);
if(temp__4425__auto___23930__$1){
var seq__23796_23931__$1 = temp__4425__auto___23930__$1;
if(cljs.core.chunked_seq_QMARK_(seq__23796_23931__$1)){
var c__18975__auto___23932 = cljs.core.chunk_first(seq__23796_23931__$1);
var G__23933 = cljs.core.chunk_rest(seq__23796_23931__$1);
var G__23934 = c__18975__auto___23932;
var G__23935 = cljs.core.count(c__18975__auto___23932);
var G__23936 = (0);
seq__23796_23916 = G__23933;
chunk__23797_23917 = G__23934;
count__23798_23918 = G__23935;
i__23799_23919 = G__23936;
continue;
} else {
var button_el_23937 = cljs.core.first(seq__23796_23931__$1);
var G__23837_23938 = button_el_23937;
var G__23838_23939 = "click";
var G__23839_23940 = ((function (seq__23796_23916,chunk__23797_23917,count__23798_23918,i__23799_23919,seq__23795,chunk__23800,count__23801,i__23802,G__23837_23938,G__23838_23939,button_el_23937,seq__23796_23931__$1,temp__4425__auto___23930__$1,el,seq__23795__$1,temp__4425__auto__){
return (function (e){
var G__23840_23941 = el;
var G__23841_23942 = "show-menu";
goog.dom.classlist.toggle(G__23840_23941,G__23841_23942);

if(cljs.core.truth_((function (){var G__23842 = el;
var G__23843 = "show-menu";
return goog.dom.classlist.contains(G__23842,G__23843);
})())){
var G__23844 = el;
var G__23845 = sze_architects.site.transition_end;
var G__23846 = ((function (seq__23796_23916,chunk__23797_23917,count__23798_23918,i__23799_23919,seq__23795,chunk__23800,count__23801,i__23802,G__23844,G__23845,G__23837_23938,G__23838_23939,button_el_23937,seq__23796_23931__$1,temp__4425__auto___23930__$1,el,seq__23795__$1,temp__4425__auto__){
return (function (){
return sze_architects.site.scroll_y(el.getBoundingClientRect().top);
});})(seq__23796_23916,chunk__23797_23917,count__23798_23918,i__23799_23919,seq__23795,chunk__23800,count__23801,i__23802,G__23844,G__23845,G__23837_23938,G__23838_23939,button_el_23937,seq__23796_23931__$1,temp__4425__auto___23930__$1,el,seq__23795__$1,temp__4425__auto__))
;
return goog.events.listenOnce(G__23844,G__23845,G__23846);
} else {
return null;
}
});})(seq__23796_23916,chunk__23797_23917,count__23798_23918,i__23799_23919,seq__23795,chunk__23800,count__23801,i__23802,G__23837_23938,G__23838_23939,button_el_23937,seq__23796_23931__$1,temp__4425__auto___23930__$1,el,seq__23795__$1,temp__4425__auto__))
;
goog.events.listen(G__23837_23938,G__23838_23939,G__23839_23940);

var G__23943 = cljs.core.next(seq__23796_23931__$1);
var G__23944 = null;
var G__23945 = (0);
var G__23946 = (0);
seq__23796_23916 = G__23943;
chunk__23797_23917 = G__23944;
count__23798_23918 = G__23945;
i__23799_23919 = G__23946;
continue;
}
} else {
}
}
break;
}

var G__23947 = cljs.core.next(seq__23795__$1);
var G__23948 = null;
var G__23949 = (0);
var G__23950 = (0);
seq__23795 = G__23947;
chunk__23800 = G__23948;
count__23801 = G__23949;
i__23802 = G__23950;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__23985 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23985) : cljs.core.deref.call(null,G__23985));
})()))){
var temp__4425__auto___24019 = cljs.core.constant$keyword$fastclick.cljs$core$IFn$_invoke$arity$1((function (){var G__23986 = sze_architects.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23986) : cljs.core.deref.call(null,G__23986));
})());
if(cljs.core.truth_(temp__4425__auto___24019)){
var fastclick_24020 = temp__4425__auto___24019;
fastclick_24020.destroy();
} else {
}

var G__23987_24021 = sze_architects.site.body;
var G__23988_24022 = "no-touch";
var G__23989_24023 = false;
goog.dom.classlist.enable(G__23987_24021,G__23988_24022,G__23989_24023);

var seq__23990_24024 = cljs.core.seq((function (){var G__23994 = "image-card";
return goog.dom.getElementsByClass(G__23994);
})());
var chunk__23991_24025 = null;
var count__23992_24026 = (0);
var i__23993_24027 = (0);
while(true){
if((i__23993_24027 < count__23992_24026)){
var el_24028 = chunk__23991_24025.cljs$core$IIndexed$_nth$arity$2(null,i__23993_24027);
var G__23995_24029 = el_24028;
var G__23996_24030 = "click";
goog.events.removeAll(G__23995_24029,G__23996_24030);

var G__24031 = seq__23990_24024;
var G__24032 = chunk__23991_24025;
var G__24033 = count__23992_24026;
var G__24034 = (i__23993_24027 + (1));
seq__23990_24024 = G__24031;
chunk__23991_24025 = G__24032;
count__23992_24026 = G__24033;
i__23993_24027 = G__24034;
continue;
} else {
var temp__4425__auto___24035 = cljs.core.seq(seq__23990_24024);
if(temp__4425__auto___24035){
var seq__23990_24036__$1 = temp__4425__auto___24035;
if(cljs.core.chunked_seq_QMARK_(seq__23990_24036__$1)){
var c__18975__auto___24037 = cljs.core.chunk_first(seq__23990_24036__$1);
var G__24038 = cljs.core.chunk_rest(seq__23990_24036__$1);
var G__24039 = c__18975__auto___24037;
var G__24040 = cljs.core.count(c__18975__auto___24037);
var G__24041 = (0);
seq__23990_24024 = G__24038;
chunk__23991_24025 = G__24039;
count__23992_24026 = G__24040;
i__23993_24027 = G__24041;
continue;
} else {
var el_24042 = cljs.core.first(seq__23990_24036__$1);
var G__23997_24043 = el_24042;
var G__23998_24044 = "click";
goog.events.removeAll(G__23997_24043,G__23998_24044);

var G__24045 = cljs.core.next(seq__23990_24036__$1);
var G__24046 = null;
var G__24047 = (0);
var G__24048 = (0);
seq__23990_24024 = G__24045;
chunk__23991_24025 = G__24046;
count__23992_24026 = G__24047;
i__23993_24027 = G__24048;
continue;
}
} else {
}
}
break;
}

var seq__23999_24049 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["header","footer"], null));
var chunk__24000_24050 = null;
var count__24001_24051 = (0);
var i__24002_24052 = (0);
while(true){
if((i__24002_24052 < count__24001_24051)){
var tag_24053 = chunk__24000_24050.cljs$core$IIndexed$_nth$arity$2(null,i__24002_24052);
var seq__24003_24054 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_24053)));
var chunk__24004_24055 = null;
var count__24005_24056 = (0);
var i__24006_24057 = (0);
while(true){
if((i__24006_24057 < count__24005_24056)){
var button_24058 = chunk__24004_24055.cljs$core$IIndexed$_nth$arity$2(null,i__24006_24057);
var G__24007_24059 = button_24058;
var G__24008_24060 = "click";
goog.events.removeAll(G__24007_24059,G__24008_24060);

var G__24061 = seq__24003_24054;
var G__24062 = chunk__24004_24055;
var G__24063 = count__24005_24056;
var G__24064 = (i__24006_24057 + (1));
seq__24003_24054 = G__24061;
chunk__24004_24055 = G__24062;
count__24005_24056 = G__24063;
i__24006_24057 = G__24064;
continue;
} else {
var temp__4425__auto___24065 = cljs.core.seq(seq__24003_24054);
if(temp__4425__auto___24065){
var seq__24003_24066__$1 = temp__4425__auto___24065;
if(cljs.core.chunked_seq_QMARK_(seq__24003_24066__$1)){
var c__18975__auto___24067 = cljs.core.chunk_first(seq__24003_24066__$1);
var G__24068 = cljs.core.chunk_rest(seq__24003_24066__$1);
var G__24069 = c__18975__auto___24067;
var G__24070 = cljs.core.count(c__18975__auto___24067);
var G__24071 = (0);
seq__24003_24054 = G__24068;
chunk__24004_24055 = G__24069;
count__24005_24056 = G__24070;
i__24006_24057 = G__24071;
continue;
} else {
var button_24072 = cljs.core.first(seq__24003_24066__$1);
var G__24009_24073 = button_24072;
var G__24010_24074 = "click";
goog.events.removeAll(G__24009_24073,G__24010_24074);

var G__24075 = cljs.core.next(seq__24003_24066__$1);
var G__24076 = null;
var G__24077 = (0);
var G__24078 = (0);
seq__24003_24054 = G__24075;
chunk__24004_24055 = G__24076;
count__24005_24056 = G__24077;
i__24006_24057 = G__24078;
continue;
}
} else {
}
}
break;
}

var G__24079 = seq__23999_24049;
var G__24080 = chunk__24000_24050;
var G__24081 = count__24001_24051;
var G__24082 = (i__24002_24052 + (1));
seq__23999_24049 = G__24079;
chunk__24000_24050 = G__24080;
count__24001_24051 = G__24081;
i__24002_24052 = G__24082;
continue;
} else {
var temp__4425__auto___24083 = cljs.core.seq(seq__23999_24049);
if(temp__4425__auto___24083){
var seq__23999_24084__$1 = temp__4425__auto___24083;
if(cljs.core.chunked_seq_QMARK_(seq__23999_24084__$1)){
var c__18975__auto___24085 = cljs.core.chunk_first(seq__23999_24084__$1);
var G__24086 = cljs.core.chunk_rest(seq__23999_24084__$1);
var G__24087 = c__18975__auto___24085;
var G__24088 = cljs.core.count(c__18975__auto___24085);
var G__24089 = (0);
seq__23999_24049 = G__24086;
chunk__24000_24050 = G__24087;
count__24001_24051 = G__24088;
i__24002_24052 = G__24089;
continue;
} else {
var tag_24090 = cljs.core.first(seq__23999_24084__$1);
var seq__24011_24091 = cljs.core.seq(sze_architects.site.get_toggle_menu_buttons(sze_architects.site.get_element_by_tag(tag_24090)));
var chunk__24012_24092 = null;
var count__24013_24093 = (0);
var i__24014_24094 = (0);
while(true){
if((i__24014_24094 < count__24013_24093)){
var button_24095 = chunk__24012_24092.cljs$core$IIndexed$_nth$arity$2(null,i__24014_24094);
var G__24015_24096 = button_24095;
var G__24016_24097 = "click";
goog.events.removeAll(G__24015_24096,G__24016_24097);

var G__24098 = seq__24011_24091;
var G__24099 = chunk__24012_24092;
var G__24100 = count__24013_24093;
var G__24101 = (i__24014_24094 + (1));
seq__24011_24091 = G__24098;
chunk__24012_24092 = G__24099;
count__24013_24093 = G__24100;
i__24014_24094 = G__24101;
continue;
} else {
var temp__4425__auto___24102__$1 = cljs.core.seq(seq__24011_24091);
if(temp__4425__auto___24102__$1){
var seq__24011_24103__$1 = temp__4425__auto___24102__$1;
if(cljs.core.chunked_seq_QMARK_(seq__24011_24103__$1)){
var c__18975__auto___24104 = cljs.core.chunk_first(seq__24011_24103__$1);
var G__24105 = cljs.core.chunk_rest(seq__24011_24103__$1);
var G__24106 = c__18975__auto___24104;
var G__24107 = cljs.core.count(c__18975__auto___24104);
var G__24108 = (0);
seq__24011_24091 = G__24105;
chunk__24012_24092 = G__24106;
count__24013_24093 = G__24107;
i__24014_24094 = G__24108;
continue;
} else {
var button_24109 = cljs.core.first(seq__24011_24103__$1);
var G__24017_24110 = button_24109;
var G__24018_24111 = "click";
goog.events.removeAll(G__24017_24110,G__24018_24111);

var G__24112 = cljs.core.next(seq__24011_24103__$1);
var G__24113 = null;
var G__24114 = (0);
var G__24115 = (0);
seq__24011_24091 = G__24112;
chunk__24012_24092 = G__24113;
count__24013_24093 = G__24114;
i__24014_24094 = G__24115;
continue;
}
} else {
}
}
break;
}

var G__24116 = cljs.core.next(seq__23999_24084__$1);
var G__24117 = null;
var G__24118 = (0);
var G__24119 = (0);
seq__23999_24049 = G__24116;
chunk__24000_24050 = G__24117;
count__24001_24051 = G__24118;
i__24002_24052 = G__24119;
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

(ns sze-architects.site
  (:require [goog.dom :as dom]
            [goog.dom.classlist :as classlist]
            [goog.events :as events]
            [cljsjs.dropkick]
            [cljsjs.fastclick])
  (:import (goog.fx.dom Scroll)))

(extend-type js/NodeList
  ISeqable
  (-seq [array] (array-seq array 0)))

(defonce site (atom {:running? false}))

(defn get-element-by-tag [tag]
  (first (dom/getElementsByTagNameAndClass tag)))

(defn get-toggle-menu-buttons [container]
  (dom/getElementsByClass "toggle-menu" container))

(def body
  (.-body js/document))

(def header
  (get-element-by-tag "header"))

(def footer
  (get-element-by-tag "footer"))

(defn get-scroll-container
  "https://groups.google.com/forum/#!msg/closure-library-discuss/8XhcwWP4Jks/OUbDyHICfUEJ"
  []
  (let [document-element (-> js/window .-document .-documentElement)]
    (set! (.-scrollTop document-element) 1)
    (if (= (.-scrollTop document-element) 1)
      (do
        (set! (.-scrollTop document-element) 0)
        document-element)
      body)))

(defn scroll-y [by]
  (let [scroll (dom/getDocumentScroll)
        container (get-scroll-container)]
    (.play (Scroll.
             container
             #js[(.-x scroll)
                 (.-y scroll)]
             #js[(.-x scroll)
                 (+ (.-y scroll) by)]
             500))))

(defn refresh-element
  "http://stackoverflow.com/a/17234319/102622"
  [el]
  (let [parent (.-parentNode el)
        sibling (.-nextSibling el)]
    (.removeChild parent el)
    (.setTimeout js/window #(.insertBefore parent el sibling) 0)))

(defn start
  "Start the site. Attempt to be idempotent."
  []
  (when-not (:running? @site)
    (swap! site assoc
      :running? true
      :dropkick (js/window.Dropkick.
                  "#project-field" #js{"mobile" true})
      :fastclick (.attach js/FastClick body))

    (if-not (js* "'ontouchstart' in window")
      (classlist/enable body "no-touch" true)
      (doseq [el (dom/getElementsByClass "image-card")]
        (events/listen el "click" #(classlist/toggle el "show-overlay"))))

    (doseq [el [header footer]
            button-el (get-toggle-menu-buttons el)]
      (events/listen
        button-el
        "click"
        (fn [e]
          (classlist/toggle el "show-menu")
          (when (classlist/contains el "show-menu")
            (scroll-y (-> el .getBoundingClientRect .-top))))))))

(defn stop
  "Stop the site. Attempt to be idempotent. Useful for interactive local development."
  []
  (when (:running? @site)
    (when-let [dropkick (:dropkick @site)]
      (.dispose dropkick))

    (when-let [fastclick (:fastclick @site)]
      (.destroy fastclick))

    (classlist/enable body "no-touch" false)
    (doseq [el (dom/getElementsByClass "image-card")]
      (events/removeAll el "click"))

    (doseq [tag ["header" "footer"]]
      (doseq [button (-> tag
                       get-element-by-tag
                       get-toggle-menu-buttons)]
        (events/removeAll button "click")))

    (swap! site assoc :running? false)))

(start)

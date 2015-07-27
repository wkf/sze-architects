(ns sze-architects.site
  (:require [goog.dom :as dom]
            [goog.dom.classlist :as classlist]
            [goog.events :as events]
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

(defn scroll-y [by]
  (let [scroll (dom/getDocumentScroll)]
    (.play (Scroll.
             body
             #js[(.-x scroll)
                 (.-y scroll)]
             #js[(.-x scroll)
                 (+ (.-y scroll) by)]
             200))))

(def header
  (get-element-by-tag "header"))

(def footer
  (get-element-by-tag "footer"))

(defn start
  "Start the site. Attempt to be idempotent."
  []
  (when-not (:running? @site)
    (swap! site assoc
      :running? true
      :fastclick (.attach js/FastClick body))

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
    (doseq [tag ["header" "footer"]]
      (doseq [button (-> tag
                       get-element-by-tag
                       get-toggle-menu-buttons)]
        (events/removeAll button "click")))

    (-> @site :fastclick .destroy)

    (swap! site assoc :running? false)))

(start)

(ns sze-architects.site
  (:require [goog.dom :as dom]
            [goog.dom.classlist :as classlist]
            [goog.events :as events]
            [cljsjs.fastclick])
  (:import (goog.fx.dom Scroll)))

(defonce site (atom {:running? false}))

(def body
  (.-body js/document))

(defn get-element-by-tag [tag]
  (aget (dom/getElementsByTagNameAndClass tag) 0))

(defn get-toggle-menu-button [container]
  (dom/getElementByClass "toggle-menu" container))

(defn scroll-y [by]
  (let [scroll (dom/getDocumentScroll)]
    (.play (Scroll.
             body
             #js[(.-x scroll)
                 (.-y scroll)]
             #js[(.-x scroll)
                 (+ (.-y scroll) by)]
             200))))

(defn start
  "Start the site. Attempt to be idempotent."
  []
  (when-not (:running? @site)
    (swap! site assoc :running? true)
    (.attach js/FastClick body)
    (doseq [tag ["header" "footer"]]
      (let [el (get-element-by-tag tag)]
        (events/listen
          (get-toggle-menu-button el)
          "click"
          (fn [e]
            (classlist/toggle body (str "show-" tag "-menu"))
            (when (classlist/contains body (str "show-" tag "-menu"))
              (scroll-y (-> el .getBoundingClientRect .-top)))))))))

(defn stop
  "Stop the site. Attempt to be idempotent. Useful for interactive local development."
  []
  (when (:running? @site)
    (doseq [tag ["header" "footer"]]
      (events/removeAll (-> tag
                          get-element-by-tag
                          get-toggle-menu-button) "click"))
    (swap! site assoc :running? false)))

(start)

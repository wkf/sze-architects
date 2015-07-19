(ns sze-architects.site
  (:require [goog.dom :as dom]
            [goog.dom.classes :as classes]
            [goog.events :as events]))

(defonce site (atom {:running? false}))

(defn find-body []
  (aget
    (dom/getElementsByTagNameAndClass "body") 0))

(defn find-toggle-menu-button [tag]
  (dom/getElementByClass
    "toggle-menu"
    (aget
      (dom/getElementsByTagNameAndClass tag) 0)))

(defn start
  "Start the site. Attempt to be idempotent."
  []
  (when-not (:running? @site)
    (swap! site assoc :running? true)
    (let [body (find-body)]
      (doseq [tag ["header" "footer"]]
        (events/listen
          (find-toggle-menu-button tag)
          "click"
          (fn [e]
            (classes/toggle body (str "show-" tag "-menu"))))))))

(defn stop
  "Stop the site. Attempt to be idempotent. Useful for interactive local development."
  []
  (when (:running? @site)
    (doseq [tag ["header" "footer"]]
      (events/removeAll (find-toggle-menu-button tag) "click"))
    (swap! site assoc :running? false)))

(start)

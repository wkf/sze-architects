(ns sze-architects.site
  (:require [goog.dom :as dom]
            [goog.dom.forms :as forms]
            [goog.dom.classlist :as classlist]
            [goog.json :as json]
            [goog.events :as events]

            [cljsjs.dropkick]
            [cljsjs.fastclick])
  (:import (goog.net XhrIo)
           (goog.fx.dom Scroll)))

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

(defn no-touch? []
  (classlist/contains body "no-touch"))

(defn touch? []
  (complement no-touch?))

(defn start-site! []
  (when-not (js* "'ontouchstart' in window")
    (classlist/enable body "no-touch" true))

  (if (no-touch?)
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
          (scroll-y (-> el .getBoundingClientRect .-top))))))

  {:fastclick
   (.attach js/FastClick body)})

(defn stop-site! [ctx]
  (classlist/enable body "no-touch" false)

  (when-let [fastclick (:fastclick ctx)]
    (.destroy fastclick))

  (doseq [el (dom/getElementsByClass "image-card")]
    (events/removeAll el "click"))

  (doseq [tag ["header" "footer"]]
    (doseq [button (-> tag
                     get-element-by-tag
                     get-toggle-menu-buttons)]
      (events/removeAll button "click"))))

(defn start-services-page! [])

(defn stop-services-page! [ctx])

(defn start-our-office-page! [])

(defn stop-our-office-page! [ctx])

(defn setup-google-map! []
  (when (empty?
          (dom/getElementsByTagNameAndClass
            "div" nil (first
                        (dom/getElementsByClass "map"))))

    (let [location #js{"lat" 26.419
                       "lng" -80.07443}
          place #js{"placeId" "ChIJmTlnc0jg2IgRgmFN1n6hckk"
                    "location" #js{"lat" 26.415324
                                   "lng" -80.07443}}
          map (google.maps.Map.
                (first (dom/getElementsByClass "map"))
                #js{"zoom" 14
                    "center" location
                    "draggable" (no-touch?)
                    "scrollwheel" false
                    "mapTypeControl" false
                    "streetViewControl" false})
          marker (google.maps.Marker.
                   #js{"map" map
                       "place" place})
          info-window (google.maps.InfoWindow.
                        #js{"content"
                            "<strong>Steven Z Epstein Architects</strong><br><br>700 NE 74th Street<br>Boca Raton, FL 33487<br><br><a href=\"https://www.google.com/maps/dir//Steven+Z+Epstein+Architects,+700+NE+74th+St,+Boca+Raton,+AL+33487/@26.4153235,-80.0744302,17z/data=!4m13!1m4!3m3!1s0x88d8e04873673999:0x4972a17ed64d6182!2sSteven+Z+Epstein+Architects!3b1!4m7!1m0!1m5!1m1!1s0x88d8e04873673999:0x4972a17ed64d6182!2m2!1d-80.0744302!2d26.4153235\">Get directions</a>"})]

      (.addListener marker "click"
        #(.panTo map location))

      (google.maps.event.addListenerOnce map "idle"
        #(.open info-window map marker))

      (events/listen js/window "resize"
        (fn []
          (.setTimeout js/window #(.panTo map location)))))))

(defn start-get-in-touch-page! []
  (let [form (get-element-by-tag "form")]
    (events/listen form "invalid"
      (fn [e]
        (classlist/enable body "form-invalid" true))
      true)
    (events/listen form "submit"
      (fn [e]
        (.preventDefault e)
        (if-not (.checkValidity form)
          (classlist/enable body "form-invalid" true)
          (.send XhrIo
            (.-action form)
            #(if (-> % .-target .isSuccess)
               (classlist/enable body "form-submitted" true)
               (classlist/enable body "form-failed" true))
            "POST"
            (json/serialize
              (.toObject (forms/getFormDataMap form))))))))

  (setup-google-map!)

  {:dropkick
   (js/window.Dropkick.
     "#project-field" #js{"mobile" true})})

(defn stop-get-in-touch-page! [ctx]
  (classlist/enable body "form-invalid" false)

  (let [form (get-element-by-tag "form")]
    (events/removeAll form "invalid")
    (events/removeAll form "submit"))

  (when-let [dropkick (:dropkick ctx)]
    (.dispose dropkick)))

(def pages
  [[#".*/services" start-services-page! stop-services-page!]
   [#".*/our-office" start-our-office-page! stop-our-office-page!]
   [#".*/get-in-touch" start-get-in-touch-page! stop-get-in-touch-page!]])

(defn page []
  (let [path (-> js/window .-location .-pathname)]
    (->>
      pages
      (filter
        (fn [[re _ _]]
          (re-matches re path)))
      first)))

(defn start-page! []
  (when-let [[_ start _] (page)] (start)))

(defn stop-page! [ctx]
  (when-let [[_ _ stop] (page)] (stop ctx)))

(defn start
  "Start the site. Attempt to be idempotent."
  []
  (when-not (:running? @site)
    (swap! site assoc
      :running? true
      :site (start-site!)
      :page (start-page!))))

(defn stop
  "Stop the site. Attempt to be idempotent. Useful for interactive local development."
  []
  (when (:running? @site)
    (stop-site! (:site @site))
    (stop-page! (:page @site))
    (reset! site {:running? false})))

(start)

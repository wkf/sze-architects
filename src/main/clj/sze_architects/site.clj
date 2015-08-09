(ns sze-architects.site
  (:gen-class)
  (:require [sze-architects.style :as style]
            [sze-architects.markup :as markup]
            [aviary.ship :as s]
            [aviary.figwheel :as fw]
            [aviary.filesystem :as fs]))

(def style-manifest-config
  {:pretty-print? false})

(def markup-manifest-config
  {:styles ["css/out/screen.css"
            "//fast.fonts.net/cssapi/f5a4bdc2-eb4a-40ed-b8fa-c53138c27cc2.css"
            "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"]
   :scripts ["js/out/main.js"]})

(defn style-manifest []
  (style/manifest style-manifest-config))

(defn markup-manifest []
  (markup/manifest {}))

(defn export []
  (fs/export
    {:path "resources/public"
     :resources ["assets"]
     :manifests {"css" style-manifest
                 "html" markup-manifest}})
  (fw/build-cljs
    {:source-paths ["src/main/cljs"]
     :build-options {:output-to "resources/public/js/out/main.js"
                     :output-dir "resources/public/js/out"
                     :optimizations :advanced
                     :pretty-print false}}))

(defn ship []
  (s/ship
    {:type :git
     :path "resources/public"}))

(defn -main [command & args]
  (condp = command
    ":ship" (ship)
    ":export" (export)
    (println "lein run [:ship|:export]"))
  (System/exit 0))

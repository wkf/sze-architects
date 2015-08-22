(ns sze-architects.markup
  (:require [clojure.edn :as edn]
            [clojure.string :as str]
            [net.cgrand.enlive-html :as html :refer [html defsnippet deftemplate]]))

;;; Helpers

(defn- render
  "Render an enlive template into an html string."
  [nodes] (str/join nodes))

(defn- edn-parser
  "Parse edn files into enlive-compatible nodes."
  [stream]
  (-> stream slurp edn/read-string html))

(defn- add-class
  "Allow classes to be keywords."
  [& classes]
  (->> classes (map name) (apply html/add-class)))

(defn- substitute
  "Substitute the selected node with `fragment' and add `classes'."
  [fragment & classes]
  (html/do->
    (html/substitute fragment)
    (apply add-class classes)))

;;; Snippets

(defsnippet logo
  "assets/img/logo.svg" [html/root] []
  [html/root] (html/wrap :div {:class "logo"}))

(defsnippet roof
  "assets/img/roof.svg" [html/root] []
  [html/root] (html/wrap :div {:class "roof"}))

(defsnippet hamburger {:parser edn-parser}
  "markup/icons.edn" [:.hamburger] [])

(defsnippet nav {:parser edn-parser}
  "markup/nav.edn" [:nav] []

  [:.roof] (substitute (roof))
  [:.hamburger] (substitute (hamburger)))

(defsnippet simple-contact-card {:parser edn-parser}
  "markup/cards.edn" [:.contact-card] []

  [html/root] (html/add-class "simple")
  [:p] (substitute nil)
  [:button] (substitute nil))

(defsnippet detailed-contact-card {:parser edn-parser}
  "markup/cards.edn" [:.contact-card] []

  [html/root] (html/add-class :detailed))

(defsnippet tagline-card {:parser edn-parser}
  "markup/cards.edn" [:.tagline-card] [])

(defsnippet services-card {:parser edn-parser}
  "markup/cards.edn" [:.services-card] [])

(defsnippet quote-card {:parser edn-parser}
  "markup/cards.edn" [:.quote-card] [])

(defsnippet image-card {:parser edn-parser}
  "markup/cards.edn" [:.image-card] [title src]
  [:h1] (html/content title)
  [:img] (html/set-attr :src src :alt ""))

(defsnippet home {:parser edn-parser}
  "markup/home.edn" [:main] [images]

  [:.simple-contact-card] (substitute (simple-contact-card) :full :left)
  [:.detailed-contact-card] (substitute (detailed-contact-card) :full :left)
  [:.tagline-card] (substitute (tagline-card) :third :left)
  [:.services-card] (substitute (services-card) :full :left)
  [:.quote-card] (substitute (quote-card) :third :left)
  [:.image-card-0] (substitute (apply image-card (nth images 0)) :full :left)
  [:.image-card-1] (substitute (apply image-card (nth images 1)) :third :right)
  [:.image-card-2] (substitute (apply image-card (nth images 2)) :half :right :rectangle)
  [:.image-card-3] (substitute (apply image-card (nth images 3)) :half :right)
  [:.image-card-4] (substitute (apply image-card (nth images 4)) :third :left)
  [:.image-card-5] (substitute (apply image-card (nth images 5)) :full :right)
  [:.image-card-6] (substitute (apply image-card (nth images 6)) :third :right :extra))

(defsnippet services {:parser edn-parser}
  "markup/services.edn" [:main] [])

(defsnippet our-office {:parser edn-parser}
  "markup/our-office.edn" [:main] [])

(defsnippet get-in-touch {:parser edn-parser}
  "markup/get-in-touch.edn" [:main] [])

;;; Templates

(deftemplate page {:parser edn-parser}
  "markup/page.edn"

  [{:keys [scripts requires styles base]} title content]

  [html/root] (html/before {:type :dtd :data ["html"]})
  [:title] (html/content title)
  [:head] (html/prepend
            (map
              #(html [:link {:type "text/css" :rel "stylesheet" :href %}]) styles))
  [:head] (html/append (html [:base {:href (or base ".")}]))
  [:body] (html/append
            (map
              #(html [:script {:type "text/javascript" :src %}]) scripts)
            (map
              #(html [:script {:type "text/javascript"} (str "goog.require('" % "')")]) requires))
  [:.logo] (substitute (logo))
  [:nav] (substitute (nav))
  [:main] (substitute (html content)))

;;; Content

(def home-images
  [["Additon & Remodel in Watermill, NY" "img/square-1.jpg"]
   ["Additon & Remodel in Watermill, NY" "img/square-2.jpg"]
   ["Additon & Remodel in Watermill, NY" "img/rectangle-1.jpg"]
   ["Additon & Remodel in Watermill, NY" "img/square-3.jpg"]
   ["Additon & Remodel in Watermill, NY" "img/square-2.jpg"]
   ["Additon & Remodel in Watermill, NY" "img/square-1.jpg"]
   ["Additon & Remodel in Watermill, NY" "img/square-3.jpg"]])

;;; Pages

(def pages
  [["SZE Architects" "" home home-images]
   ["SZE Architects - Services" "services" services]
   ["SZE Architects - Our Office" "our-office" our-office]
   ["SZE Architects - Get in Touch" "get-in-touch" get-in-touch]])

(defn manifest [config]
  (->>
    pages
    (map (fn [[title path snippet & content]]
           [path #(render (page config title (apply snippet content)))]))
    (into {})))

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
  #{[:h1] [:p] [:button] [:.fax]} nil)

(defsnippet detailed-contact-card {:parser edn-parser}
  "markup/cards.edn" [:.contact-card] []

  [html/root] (html/add-class "detailed")
  #{[:h1] [:.fax] [:.come-on-by]} nil)

(defsnippet get-in-touch-contact-card {:parser edn-parser}
  "markup/cards.edn" [:.contact-card] []

  [html/root] (html/add-class "get-in-touch")
  #{[:button] [:.talk-to-us]} nil)

(defsnippet tagline-card {:parser edn-parser}
  "markup/cards.edn" [:.tagline-card] [])

(defsnippet services-card {:parser edn-parser}
  "markup/cards.edn" [:.services-card] [])

(defsnippet quote-card {:parser edn-parser}
  "markup/cards.edn" [:.quote-card] [])

(defsnippet map-card {:parser edn-parser}
  "markup/cards.edn" [:.map-card] [])

(defsnippet facebook-card {:parser edn-parser}
  "markup/cards.edn" [:.facebook-card] [])

(defsnippet image-card {:parser edn-parser}
  "markup/cards.edn" [:.image-card] [title src]
  [:h1] (html/content title)
  [:img] (html/set-attr :src src :alt ""))

(defsnippet simple-image-card {:parser edn-parser}
  "markup/cards.edn" [:.image-card] [src]
  [:.overlay] nil
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
  "markup/get-in-touch.edn" [:main] [images]

  [:.map-card] (substitute (map-card))
  [:.contact-card] (substitute (get-in-touch-contact-card) :full :left)
  [:.facebook-card] (substitute (facebook-card))

  [:.image-card-0] (substitute (simple-image-card (nth images 0)))
  [:.image-card-1] (substitute (simple-image-card (nth images 1))))

;;; Templates

(deftemplate page {:parser edn-parser}
  "markup/page.edn"

  [{:keys [scripts requires styles]} title content]

  [html/root] (html/before {:type :dtd :data ["html"]})
  [:title] (html/content title)
  [:head] (html/prepend
            (map
              #(html [:link {:type "text/css" :rel "stylesheet" :href %}]) styles))
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

(def google-api-key
  "AIzaSyAVxaq9DkcHq38ZyPbKLaKzkBl5kg8ejs0")

(def get-in-touch-images
  ["img/contact-1.jpg"
   "img/contact-2.jpg"])

;;; Pages

(def pages
  [{:title "SZE Architects"
    :path ""
    :snippet home
    :content [home-images]}
   {:title "SZE Architects - Services"
    :path "services"
    :snippet services}
   {:title "SZE Architects - Our Office"
    :path "our-office"
    :snippet our-office}
   {:title "SZE Architects - Get in Touch" :path "get-in-touch"
    :scripts [(str "//maps.googleapis.com/maps/api/js?key=" google-api-key)]
    :snippet get-in-touch
    :content [get-in-touch-images]}])

(defn manifest [config]
  (->>
    pages
    (map (fn [{:keys [title path scripts snippet content] :as spec}]
           [path (fn []
                   (render (page (merge-with #(concat %2 %1) config spec) title (apply snippet content))))]))
    (into {})))

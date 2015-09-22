(ns sze-architects.markup
  (:require [clojure.edn :as edn]
            [clojure.string :as str]
            [markdown.core :as markdown]
            [net.cgrand.tagsoup :as tagsoup]
            [net.cgrand.enlive-html :as html :refer [html defsnippet deftemplate]])
  (:import (java.io StringReader)))

;;; Helpers

(defn- render
  "Render an enlive template into an html string."
  [nodes] (str/join nodes))

(defn- edn-parser
  "Parse edn files into enlive-compatible nodes."
  [stream]
  (-> stream slurp edn/read-string html))

(defn- markdown-parser [stream]
  (with-open [stream (StringReader.
                       (-> stream
                         slurp
                         markdown/md-to-html-string))]
    (-> stream
      tagsoup/parser
      (html/select [:body :> :*]))))

(defn content [path]
  (fn []
    (->>
      (html/html-resource
        path {:parser markdown-parser})
      (partition-by
        (comp #{:hr} :tag))
      (remove
        (comp #{:hr} :tag first)))))

(defmacro defcontent [n & forms]
  `(def ~n (content ~@forms)))

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

(defsnippet small-detailed-contact-card {:parser edn-parser}
  "markup/cards.edn" [:.contact-card] []

  [html/root] (html/add-class "detailed")
  #{[:h1] [:.fax] [:.come-on-by]} nil

  [:.contact-card] (html/do->
                     (html/remove-class "contact-card")
                     (html/add-class "small-contact-card")))

(defsnippet get-in-touch-contact-card {:parser edn-parser}
  "markup/cards.edn" [:.contact-card] []

  [html/root] (html/add-class "get-in-touch")
  #{[:button] [:.talk-to-us]} nil

  [:.address] (html/append
                (html [:div.address-3 [:span (char 160)]])))

(defsnippet tagline-card {:parser edn-parser}
  "markup/cards.edn" [:.tagline-card] [])

(defsnippet services-card {:parser edn-parser}
  "markup/cards.edn" [:.services-card] [])

(defsnippet quote-card {:parser edn-parser}
  "markup/cards.edn" [:.quote-card] [quote citation]

  [:cite] (html/content (str "–" citation))
  [:blockquote :p] (html/content quote))

(defsnippet map-card {:parser edn-parser}
  "markup/cards.edn" [:.map-card] [])

(defsnippet facebook-card {:parser edn-parser}
  "markup/cards.edn" [:.facebook-card] [])

(defsnippet form-card {:parser edn-parser}
  "markup/cards.edn" [:.form-card] [])

(defsnippet copy-card {:parser edn-parser}
  "markup/cards.edn" [:.copy-card] [copy]
  [:div] (html/content copy))

(defsnippet statement-card {:parser edn-parser}
  "markup/cards.edn" [:.statement-card] [statement]
  [:h1] (html/content statement))

(defsnippet service-list-card {:parser edn-parser}
  "markup/cards.edn" [:.copy-card] [copy]
  [:div] (html/content copy)
  [:.copy-card] (html/do->
                  (html/remove-class "copy-card")
                  (html/add-class "service-list-card")))

(defsnippet client-list-card {:parser edn-parser}
  "markup/cards.edn" [:.client-list-card] [copy]
  [:div.left] (html/content (take 4 copy))
  [:div.right] (html/content (drop 4 copy))
  [:.client-list-card] (html/add-class "copy-card"))

(defsnippet image-card {:parser edn-parser}
  "markup/cards.edn" [:.image-card] [title src]
  [:h1] (html/content title)
  [:img] (html/set-attr :src src :alt ""))

(defsnippet simple-image-card {:parser edn-parser}
  "markup/cards.edn" [:.simple-image-card] [src]
  [:img] (html/set-attr :src src :alt ""))

(defsnippet home {:parser edn-parser}
  "markup/home.edn" [:main] [images quotes]

  [:.simple-contact-card] (substitute (simple-contact-card) :full :left)
  [:.detailed-contact-card] (substitute (detailed-contact-card) :full :left)
  [:.tagline-card] (substitute (tagline-card) :third :left)
  [:.services-card] (substitute (services-card) :full :left)
  [:.quote-card] (substitute (apply quote-card (nth quotes 0)) :third :left)
  [:.image-card-0] (substitute (apply image-card (nth images 0)) :full :left)
  [:.image-card-1] (substitute (apply image-card (nth images 1)) :third :right)
  [:.image-card-2] (substitute (apply image-card (nth images 2)) :half :right :rectangle)
  [:.image-card-3] (substitute (apply image-card (nth images 3)) :half :right)
  [:.image-card-4] (substitute (apply image-card (nth images 4)) :third :left)
  [:.image-card-5] (substitute (apply image-card (nth images 5)) :full :right)
  [:.image-card-6] (substitute (apply image-card (nth images 6)) :third :right :extra))

(defcontent services-copy "content/services.md")

(defsnippet services {:parser edn-parser}
  "markup/services.edn" [:main] [images quotes]

  [:.detailed-contact-card] (substitute (small-detailed-contact-card))
  [:.quote-card] (substitute (apply quote-card (nth quotes 0)))
  [:.image-card-0] (substitute (simple-image-card (nth images 0)) :image-card-0)
  [:.image-card-1] (substitute (simple-image-card (nth images 1)) :image-card-1)
  [:.service-list-card] (substitute (service-list-card (nth (services-copy) 0)))
  [:.copy-card-0] (substitute (copy-card (nth (services-copy) 1)) :copy-card-0)
  [:.copy-card-1] (substitute (copy-card (nth (services-copy) 2)))
  [:.copy-card-2] (substitute (copy-card (nth (services-copy) 3))))

(defcontent our-office-copy "content/our-office.md")

(defsnippet our-office {:parser edn-parser}
  "markup/our-office.edn" [:main] [images]

  [:.detailed-contact-card] (substitute (detailed-contact-card))
  [:.image-card-0] (substitute (simple-image-card (nth images 0)) :image-card-0)
  [:.image-card-1] (substitute (simple-image-card (nth images 1)))
  [:.image-card-2] (substitute (simple-image-card (nth images 2)))
  [:.image-card-3] (substitute (simple-image-card (nth images 3)))
  [:.image-card-4] (substitute (simple-image-card (nth images 4)) :image-card-4)
  [:.copy-card-0] (substitute (copy-card (nth (our-office-copy) 0)))
  [:.copy-card-1] (substitute (copy-card (nth (our-office-copy) 1)))
  [:.copy-card-2] (substitute (copy-card (nth (our-office-copy) 2)) :copy-card-2)
  [:.copy-card-3] (substitute (copy-card (nth (our-office-copy) 3)))
  [:.copy-card-4] (substitute (copy-card (nth (our-office-copy) 4)))
  [:.client-list-card] (substitute (client-list-card (nth (our-office-copy) 5)))
  [:.statement-card-0] (substitute (statement-card "Welcome to our office."))
  [:.statement-card-1] (substitute (statement-card "We've been in business for over 25 years.")))


(defsnippet get-in-touch {:parser edn-parser}
  "markup/get-in-touch.edn" [:main] [images]

  [:.map-card] (substitute (map-card))
  [:.contact-card] (substitute (get-in-touch-contact-card))
  [:.facebook-card] (substitute (facebook-card))
  [:.form-card] (substitute (form-card))

  [:.image-card-0] (substitute (simple-image-card (nth images 0)) :image-card-0)
  [:.image-card-1] (substitute (simple-image-card (nth images 1)) :image-card-1))

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

(def home-quotes
  [["I have been working with Steve and Claudia for almost 20 years now and they are my architects of choice."
    "Frank Litrento, Construction Solutions & Services"]])

(def google-api-key
  "AIzaSyAVxaq9DkcHq38ZyPbKLaKzkBl5kg8ejs0")

(def get-in-touch-images
  ["img/contact-1.jpg"
   "img/contact-2.jpg"])

(def services-images
  ["http://placehold.it/450x450"
   "http://placehold.it/960x290"])

(def services-quotes
  [["Steve made wonderful recommendations towards realizing our dreams and meeting our remodel/expansion needs. His expertise allowed him to envision ideas and make suggestions that frankly we would never have thought of...I am honored to give Steve and Claudia Epstein my highest recommendation without any reservations.  He is a master of his profession."
    "Daryl Wilmoth, Boca Raton, FL"]])

(def our-office-images
  ["http://placehold.it/460x460"
   "http://placehold.it/460x460"
   "http://placehold.it/291x291"
   "http://placehold.it/291x291"
   "http://placehold.it/300x331"])

;;; Pages

(def pages
  [{:title "SZE Architects"
    :path ""
    :snippet home
    :content [home-images home-quotes]}
   {:title "SZE Architects - Services"
    :path "services"
    :snippet services
    :content [services-images services-quotes]}
   {:title "SZE Architects - Our Office"
    :path "our-office"
    :snippet our-office
    :content [our-office-images]}
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

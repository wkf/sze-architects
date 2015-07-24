(ns sze-architects.markup
  (:require [clojure.string :as str]
            [net.cgrand.enlive-html :as html :refer [html defsnippet]]))

(def defaults
  {:title "SZE Architects"
   :styles ["css/out/screen.css"
            "//fast.fonts.net/cssapi/f5a4bdc2-eb4a-40ed-b8fa-c53138c27cc2.css"
            "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"]
   :scripts ["js/out/main.js"]})

(defn html5 [& nodes]
  (apply html {:type :dtd :data ["html"]} nodes))

(defn render [nodes] (str/join nodes))

(defsnippet logo
  "assets/img/logo.svg" [html/root] []
  [html/root] (html/wrap :div {:class "logo"}))

(defsnippet roof
  "assets/img/roof.svg" [html/root] []
  [html/root] (html/wrap :div {:class "roof"}))

(defsnippet hamburger
  "assets/img/hamburger.svg" [html/root] []
  [html/root] (html/wrap :div {:class "hamburger"}))

(def residential-projects
  [[:li
    [:a {:href "/new-homes"} "New Homes"]]
   [:li
    [:a {:href "/additions"} "Additions"]]
   [:li
    [:a {:href "/remodels"} "Remodels"]]
   [:li
    [:a {:href "/condominiums"} "Condominiums"]]])

(def commercial-projects
  [[:li
    [:a {:href "/commercial"} "Commercial"]]
   [:li
    [:a {:href "/offices"} "Offices"]]
   [:li
    [:a {:href "/retail"} "Retail"]]
   [:li
    [:a {:href "/restaurants"} "Restaurants"]]])

(defn menu []
  [:div.menu
   [:button.toggle-menu
    [:span "Menu"]
    (hamburger)]
   [:nav
    [:div.row-0
     [:div.column-0
      [:ul.main-nav
       [:li
        [:a {:href "/"} "Home"]]
       " "
       [:li
        [:a {:href "/our-office"} "Our Office"]]
       " "
       [:li
        [:a {:href "/services"} "Services"]]
       " "
       [:li
        [:a {:href "/get-in-touch"} "Get in Touch"]]
       [:li.space " "]
       [:li.portfolio-link
        [:a {:href "/portfolio"} "Portfolio"]
        [:button.toggle-menu (hamburger)]]
       [:li.facebook
        [:a {:href "/facebook"}
         [:span.fa.fa-facebook]
         [:span "facebook"]]]]]]
    [:div.medium-drawer
     [:span.portfolio-label "Portfolio:"]
     " "
     [:div.row-1
      (vec
        (concat [:ul.sub-nav.column-1]
          (butlast (interleave residential-projects (repeat " ")))))]
     " "
     [:span.divider]
     " "
     [:div.row-2
      (vec
        (concat [:ul.sub-nav.column-2]
          (butlast (interleave commercial-projects (repeat " ")))))]]]])

(defn header []
  [:header
   (logo)
   (menu)])

(def contact-info
  [[:div.links
    [:div.phone
     [:span
      [:a {:href "tel:+15619999290"} "(561)999-9290"]]]
    [:div.email
     [:span
      [:a {:href "mailto:info@szearchitects.com"} "info@szearchitects.com"]]]]
   [:div.address
    [:div.address-1
     [:span "700 NE 74th St"]]
    [:div.address-2
     [:span "Boca Raton, FL 33487"]]]])

(defn small-contact-card []
  (vec
    (concat [:section.contact-card]
      contact-info)))

(defn large-contact-card []
  (vec
    (concat [:section.contact-card
       [:p
        "We still respect the time-honored traditions of good business. "
        [:em "Talk to us, not to our voicemail."]]]
      contact-info
      [[:button
        [:em "Send us a Message"]
        [:em.continued " to Start your Project Today"]]])))

(defn tagline-card []
  [:section.tagline-card
   [:div.square
    [:h1 "Building Connections."]
    [:h2 "Steven Z Epstein Architects practices real architecture for real people."]
    [:p
     [:a {:href "/about"} "Learn about us"]]]])

(defn services-card []
  [:section.services-card
   [:div.square
    [:p "We take projects from concept to reality, respecting styles and budgets. Our clients range from small contractors to growing families, and hopefully you."]
    [:p
     [:a {:href "/services"} "Browse our services"]]]])

(defn quote-card []
  [:section.quote-card
   [:div.square
    [:blockquote
     [:div.fa.fa-quote-left]
     [:p "I have been working with Steve and Claudia for almost 20 years now and they are my architects of choice." ]
     [:div.fa.fa-quote-right]
     [:cite "–Frank Litrento, Construction Solutions & Services"]]]])

(defn featured-image [title src]
  [:section.featured-image
   [:div.overlay
    [:h1 title]]
   [:img {:src src :alt ""}]])

(defn shrink-featured-image [title src]
  (assoc
    (featured-image title src) 0 :section.featured-image.shrink))

(defn footer []
  [:footer
   (menu)
   [:div.facebook
    [:a {:href "https://www.facebook.com/pages/Steven-Z-Epstein-Architects/101676946574474"}
     [:span.fa.fa-facebook]
     "facebook"]]
   [:div.copyright
    [:small "© 2015 Steven Z Epstein Architects."]]])

(defn home []
  (html5
    [:html
     [:head
      [:meta {:charset "UTF-8"}]
      [:meta
       {:name "viewport"
        :content "width=device-width, initial-scale=1"}]
      [:title]]
     [:body
      [:div.vertical-line]
      (header)
      [:main
       (small-contact-card)
       (featured-image "Custom Home" "img/square-1.jpg")
       (tagline-card)
       (shrink-featured-image "Custom Home" "img/square-2.jpg")
       (services-card)
       (featured-image "Custom Home" "img/rectangle-1.jpg")
       (featured-image "Custom Home" "img/square-3.jpg")
       (quote-card)
       (shrink-featured-image "Custom Home" "img/square-2.jpg")
       (featured-image "Custom Home" "img/square-1.jpg")
       (large-contact-card)]
      (footer)]]))

(defn main []
  (html "!"))

(html/deftemplate page
  (home)

  [{:keys [title scripts requires styles]} content]

  [:title] (html/content title)
  [:head] (html/prepend
            (map
              #(html [:link {:type "text/css" :rel "stylesheet" :href %}]) styles))
  [:body] (html/append
            (map
              #(html [:script {:type "text/javascript" :src %}]) scripts)
            (map
              #(html [:script {:type "text/javascript"} (str "goog.require('" % "')")]) requires)))

(defn manifest [config]
  (let [config (merge defaults config)]
    {"" #(render (page config (main)))}))

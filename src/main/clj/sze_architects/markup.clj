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

(defn classes->str [classes]
  (->> classes
    (map name)
    (str/join " ")))

(defsnippet logo
  "assets/img/logo.svg" [html/root] []
  [html/root] (html/wrap :div {:class "logo"}))

(defsnippet roof
  "assets/img/roof.svg" [html/root] []
  [html/root] (html/wrap :div {:class "roof"}))

(defn hamburger []
  [:div.hamburger
   [:div.top
    [:div.line]]
   [:div.middle
    [:div.line]]
   [:div.bottom
    [:div.line]]])

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

(defn nav []
  [:nav
   [:button.toggle-menu
    [:span "Menu"] (hamburger)]
   [:div.primary-drawer
    [:div.row
     [:div.column
      [:ul.primary-menu
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
       [:li.facebook-link
        [:a {:href "/facebook"}
         [:span.fa.fa-facebook]
         [:span "facebook"]]]]]]
    [:div.portfolio-drawer
     (roof)
     [:span.portfolio-link
      [:a {:href "/portfolio"} "Portfolio:"]]
     " "
     [:div.row
      (vec
        (concat [:ul.portfolio-menu.column]
          (butlast (interleave residential-projects (repeat " ")))))]
     " "
     [:span.divider]
     " "
     [:div.row
      (vec
        (concat [:ul.portfolio-menu.column]
          (butlast (interleave commercial-projects (repeat " ")))))]]]])

(defn header []
  [:header (logo) (nav)])

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

(defn simple-contact-card []
  (vec
    (concat [:section.card.contact-card.simple.full.left]
      contact-info)))

(defn detailed-contact-card []
  (vec
    (concat [:section.card.contact-card.detailed.full.left
             [:p
              "We still respect the time-honored traditions of good business. "
              [:em "Talk to us, not to our voicemail."]]]
      contact-info
      [[:button
        [:em "Send us a Message"]
        [:em.continued " to Start your Project Today"]]])))

(defn tagline-card []
  [:section.card.tagline-card.third.left
   [:div
    [:h1 "Building Connections."]
    [:h2 "Steven Z Epstein Architects practices real architecture for real people."]
    [:p
     [:a {:href "/about"} "Learn about us"]]]])

(defn services-card []
  [:section.card.services-card.full.left
   [:div
    [:p "We take projects from concept to reality, respecting styles and budgets. Our clients range from small contractors to growing families, and hopefully you."]
    [:p
     [:a {:href "/services"} "Browse our services"]]]])

(defn quote-card []
  [:section.card.quote-card.third.left
   [:div
    [:blockquote
     [:div.fa.fa-quote-left]
     [:p "I have been working with Steve and Claudia for almost 20 years now and they are my architects of choice." ]
     [:div.fa.fa-quote-right]
     [:cite "–Frank Litrento, Construction Solutions & Services"]]]])

(defn image-card [title src & classes]
  [:section
   {:class (classes->str
             (conj classes :card :image-card))}
   [:div.overlay
    [:h1 title]
    [:button
     [:em "See the Project"]]]
   [:div.mask
    [:img {:src src :alt ""}]]])

(defn footer []
  [:footer
   (nav)
   [:div.facebook-link
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
      [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
      [:meta
       {:name "viewport"
        :content "width=device-width, initial-scale=1"}]
      [:title]]
     [:body
      [:div.vertical-line]
      (header)
      [:main
       (simple-contact-card)
       [:div.cards.row.thirds
        [:div
         (image-card "Additon & Remodel in Watermill, NY" "img/square-1.jpg" :full :left)
         [:div.cards.column.right.third
          (tagline-card)
          (image-card "Additon & Remodel in Watermill, NY" "img/square-2.jpg" :third :right)]]]
       [:div.cards.row.halves
        [:div
         [:div.cards.column.left.half
          (services-card)
          (image-card "Additon & Remodel in Watermill, NY" "img/rectangle-1.jpg" :half :right :rectangle)]
         (image-card "Additon & Remodel in Watermill, NY" "img/square-3.jpg" :half :right)]]
       [:div.cards.row.thirds
        [:div
         [:div.cards.column.left.third
          (quote-card)
          (image-card "Additon & Remodel in Watermill, NY" "img/square-2.jpg" :third :left)]
         (image-card "Additon & Remodel in Watermill, NY" "img/square-1.jpg" :full :right)]]
       [:div.cards.row.fixed
        [:div
         (detailed-contact-card)
         (image-card "Additon & Remodel in Watermill, NY" "img/square-3.jpg" :third :right :extra)]]]
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

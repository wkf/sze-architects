(ns sze-architects.style
  (:require [garden.core :refer [css]]
            [garden.units :refer [px em percent]]
            [garden.color :as color :refer [rgb rgb? rgba]]))

(def red "#ef4639")
(def green "#39bb99")
(def black "#000000")
(def white "#ffffff")
(def gray "#bfbfbf")

(def avenir-book "'Avenir LT W01 45 Book'")
(def avenir-book-oblique "'AvenirLTW01-45BookObliq'")
(def lubalin-graph-book "'ITCLubalinGraphW01-Bk'")

(def reset
  [[:*
    {:background [[:none :repeat :scroll 0 0 :transparent]]
     :border [[:medium :none]]
     :border-spacing 0
     :color "black"
     :font-weight :normal
     :list-style [[:none :outside :none]]
     :margin 0
     :padding 0
     :text-align :left
     :text-decoration :none
     :text-indent 0}]
   [:li
    {:list-style-type :none}]
   ["input::-moz-focus-inner"
    "button::-moz-focus-inner"
    {:border 0
     :padding 0}]
   [:button:focus
    {:outline 0}]])

(def defaults
  [[:html
    {:box-sizing :border-box}]
   [:*
    :*:after
    :*:before
    {:box-sizing :inherit}]
   [:body
    {:margin 0
     :padding 0}]
   [:a
    :a:hover
    :a:active
    :a:visited {:text-decoration :none}]])

(def fonts
  [[:body
    {:font-size (px 22)
     :font-family avenir-book}]
   [:h1
    {:font-family lubalin-graph-book}]
   [:h2
    :h3
    {:font-family avenir-book}]
   [:em
    {:font-style :normal
     :font-family avenir-book-oblique}]
   [:small
    {:font-family avenir-book
     :font-size (px 16)}]
   [:h1
    {:color black
     ;; :font-size (px 42)
     :font-size (px 36)
     :line-height (px 43)
     }]
   [:h2
    {:color black
     ;; :font-size (px 32)
     :font-size (px 24)
     :line-height (px 32)
     }]
   [:h3
    {:color black
     :font-size (px 22)}]
   [:p
    {:font-size (px 21)
     :line-height (px 27)}]
   [:button
    {:color black
     :font-size (px 24)
     :font-family avenir-book}]
   ["::selection" {:color white
                   :background green}]])

(defn link []
  [:&
   {:cursor :pointer
    :position :relative}
   [:&:before
    {:content "''"
     :position :absolute
     :left 0
     :right 0
     :bottom 0
     :height (px 1)
     :background white
     :transform "scaleX(1)"
     :transition [[:all "250ms" :ease]]}]
   [:&:hover:before
    {:transform "scaleX(1.1)"}]])

(def common
  [[:a (link)]])

(defn underline
  ([color]
   (underline color 0))
  ([color offset]
   [:&:after
    {:content "''"
     :height (px 1)
     :background-color color
     :opacity 0.4
     :position :absolute
     :left 0
     :right 0
     :display :block
     :margin-top offset}]))

(def header
  [[:header
    {:padding-top (px 25)}]

   [:.logo {:width (px 182)
            :margin [[0 :auto (px 28)]]}]])

(defn column
  ([n]
   (column n 0))
  ([n gutter]
   (let [columns (denominator n)]
     [:&
      {:width (format "calc(99.99%% * %1$s - (%2$spx - %2$spx * %1$s))" n gutter)}
      ["&:nth-child(n)"
       {:float :left
        :clear :none
        :margin-right (px gutter)}]
      ["&:last-child"
       {:margin-right 0}]
      [(format "&:nth-child(%sn)" columns)
       {:float :right
        :margin-right 0}]
      [(format "&:nth-child(%sn + 1)" columns)
       {:clear :left}]])))

(defn clearfix []
  [:&
   {"*zoom" 1}
   [:&:before :&:after
    {:content "' '"
     :display :table}]
   [:&:after
    {:clear :both}]])

(def menu
  [[:body.show-header-menu
    [:header
     [:nav
      {:max-height (px 2000)}]]]

   [:body.show-footer-menu
    [:footer
     [:nav
      {:max-height (px 2000)}]]]

   [:.menu
    (underline green (px -1))
    [:button
     (link)
     {:display :block
      :margin [[0 :auto]]}
     [:&:before
      {:background green}]
     [:.hamburger
      {:width (px 22)
       :height (px 22)
       :position :relative
       :top (px 2)
       :bottom 0
       :display :inline-block
       :margin-left (px 12)}]]

    [:nav
     {:position :relative
      :background green
      :padding-left (px 20)
      :padding-right (px 20)
      :max-height 0
      :overflow :hidden
      :transition [[:max-height "1000ms" :ease]]}

     [:a
      {:color white}]

     [:ul.main-nav
      {:font-size (px 24)
       :line-height (px 29)}
      [:li
       {:margin-top (px 20)}

       (underline white (px -1))]]

     (clearfix)
     [:ul.sub-nav
      (column 1/2)
      {:font-size (px 19)
       :line-height (px 23)
       :margin-top (px 10)
       :margin-bottom (px 30)}
      [:.portfolio
       {:display :none}]
      [:&.column-1
       {:float :left}]
      [:&.column-2
       {:float :right
        :position :relative
        :padding-left (px 25)}
       [:&:before
        {:content "''"
         :opacity 0.4
         :background-color white
         :position :absolute
         :top (px 20)
         :bottom (px -10)
         :left 0
         :width (px 1)}]]
      [:li
       {:margin-top (px 10)}]]
     [:.facebook :.roof :.hamburger
      {:display :none}]]]])

(def contact-card
  [[:.contact-card
    {:background-color green
     :padding [[(px 10) (px 20)]]}
    [:p :em
     {:color white
      :font-size (px 24)
      :line-height (px 32)}]
    [:p
     {:margin-top (px 18)
      :margin-bottom (px 25)}]
    [:a :span
     {:color white
      :font-size (px 21)
      :line-height (px 40)
      :font-family lubalin-graph-book}]
    [:a:before
     {:bottom (px 4)}]
    [:span
     (underline white (px -12))]

    [:button
     {:cursor :pointer
      :width (percent 100)
      :color red
      :font-size (px 18)
      :font-family avenir-book-oblique
      :text-align :center
      :background white
      :padding-top (px 12)
      :padding-bottom (px 10)
      :margin-top (px 30)
      :margin-bottom (px 30)
      :border-bottom [[(px 5) :solid gray]]}]]])

(defn with-alpha [color alpha]
  (let [color (if (rgb? color) color (color/hex->rgb color))]
    (color/as-color
      (assoc color :alpha alpha))))

(def featured-image
  [[:.featured-image
    {:width (percent 100)
     :overflow :hidden
     :text-align :center
     :position :relative
     :margin-top (px 20)
     :margin-bottom (px 20)}
    [:&:hover
     [:.overlay
      {:opacity 1}]
     [:img
      {:transform "scale(1.2)"}]]
    [:img :.overlay
     {:transition [[:all "250ms" :ease]]}]
    [:img
     {:width (percent 100)
      :transform "scale(1.1)"}]
    [:.overlay
     {:opacity 0
      :position :absolute
      :top 0
      :left 0
      :right 0
      :bottom 0
      :z-index 9999
      :background-color (with-alpha green 0.70)
      :padding [[(px 30) (px 20)]]}
     [:h1
      {:color white}]]]])

(defn square []
  [:&
   {:position :relative
    :width (percent 100)
    :overflow :hidden}
   [:&:before
    {:content "''"
     :display :block
     :padding-top (percent 100)}]
   [:div.square
    {:position :absolute
     :top 0
     :left 0
     :right 0
     :bottom 0}]])

(def tagline-card
  [[:.tagline-card
    {:background-color green}
    (square)
    [:div.square
     {:padding [[(px 30) (px 20)]]}]
    [:h1 :h2
     {:color white}]
    [:h1
     {:margin-bottom (px 30)}]]])

(def services-card
  [[:.services-card
    {:border [[(px 1) (with-alpha green 0.6) :solid]]}
    (square)
    [:div.square
     {:padding [[(px 30) (px 20)]]}]
    [:a
     {:color red
      :font-size (px 18)
      :font-family avenir-book-oblique}
     [:&:before
      {:background red
       :transform "translateY(0)"}]
     [:&:hover:before
      {:transform "translateY(2px)"}]]
    [:p
     {:margin-bottom (px 30)}]]])

(def quote-card
  [[:.quote-card
    {:border [[(px 1) (with-alpha green 0.6) :solid]]}
    (square)
    [:div.square
     {:padding [[(px 30) (px 20)]]}]
    [:.fa-quote-left
     :.fa-quote-right
     {:color (with-alpha green 0.6)
      :width (percent 100)
      :text-align :center}]
    [:p
     {:margin-top (px 15)
      :margin-bottom (px 15)}]
    [:cite
     {:margin-top (px 20)
      :display :inline-block
      :font-size (px 18)
      :font-family avenir-book-oblique
      :font-style :normal
      :line-height (px 31)}]]])

(def footer
  [[:footer
    [:.facebook
     {:text-align :center
      :margin-top (px 20)
      :margin-bottom (px 20)}
     [:a
      {:font-size (px 24)}
      [:&:before
       {:background green}]]
     [:.fa-facebook
      {:padding-right (px 6)
       :color white
       :position :relative
       :bottom (px -4)
       :text-shadow [[(px -1) 0 green]
                     [0 (px 1) green]
                     [(px 1) 0 green]
                     [0 (px -1) green]]}]
     (underline green (px -1))]
    [:.copyright
     {:text-align :center
      :margin-top (px 20)
      :margin-bottom (px 20)}]]])

(def main
  [[:main
    {:padding (px 20)}]])

(def screen
  (concat
    reset
    defaults
    common
    fonts
    header
    footer
    menu
    main
    contact-card
    featured-image
    tagline-card
    services-card
    quote-card))

(defn manifest [config]
  {"css/out/screen.css" #(css (merge
                                {:vendors ["webkit" "moz"]
                                 :auto-prefix #{:transform
                                                :transform-origin
                                                :transition
                                                :transition-property
                                                :transition-duration
                                                :transition-timing-function
                                                :backface-visibility}}
                                config)
                           screen)})

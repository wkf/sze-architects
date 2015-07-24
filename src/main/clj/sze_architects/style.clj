(ns sze-architects.style
  (:require [garden.core :refer [css]]
            [garden.units :refer [px em percent]]
            [garden.color :as color :refer [rgb rgb? rgba]]
            [garden.stylesheet :refer [at-media]]))

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

(defn at-medium [& rules]
  (at-media
    {:min-width (px 768)}
    (apply vector :& rules)))

(defn at-large [& rules]
  (at-media
    {:min-width (px 1024)}
    (apply vector :& rules)))

(defn at-huge [& rules]
  (at-media
    {:min-width (px 1280)}
    (apply vector :& rules)))

(defn with-alpha [color alpha]
  (let [color (if (rgb? color) color (color/hex->rgb color))]
    (color/as-color
      (assoc color :alpha alpha))))

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
  [[:html
    {:min-height (percent 100)
     :position :relative}]
   [:body
    {:height (percent 100)}]
   [:a (link)]])

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

(defn column
  ([n]
   (column n 0))
  ([n gutter]
   (let [columns (denominator n)]
     [:&
      {:width (if (zero? gutter)
                (format "calc(99.99%% * %1$s)" n)
                (format "calc(99.99%% * %1$s - (%2$spx - %2$spx * %1$s))" n gutter))}
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

(def hamburger
  [:.hamburger
   {:width (px 22)
    :height (px 22)
    :position :relative
    :overflow :hidden
    :top (px 2)
    :bottom 0
    :display :inline-block
    :margin-left (px 12)}
   [:svg
    [:line
     {:transition [[:all "250ms" :ease]]
      :transform "rotate(0) translate(0, 0)"
      :transform-origin [[(percent 50) (percent 50)]]}]]])

(def hamburger-to-x
  [:.hamburger
   [:svg
    [:line
     ["&:last-child"
      {:transform "translateX(24px)"}]
     ["&:nth-child(1)"
      {:transform "rotate(-45deg) translate(-5px, 5px)"}]
     ["&:nth-child(2)"
      {:transform "rotate(45deg) translate(-5px, -5px)"}]]]])

(def header
  [[:header
    {:padding-top (px 25)}
    (at-medium
      {:padding [[(px 40) 0 0]]})
    (at-large
      {:padding-top (px 25)})]

   [:.logo
    {:width (px 182)
     :margin [[0 :auto (px 28)]]}
    (at-large
      {:float :left
       :margin-top (px 38)
       :margin-left (px 30)
       :margin-bottom (px -57)
       :width (px 242)
       :z-index 2
       :position :relative})]])

(def menu
  [[:.menu
    (underline green (px -1))
    (at-medium
      (underline green (px -1)))
    (at-large
      (underline green (px -2)))
    [:button
     (link)
     {:display :block
      :margin [[0 :auto]]}
     [:&:before
      {:background green}]
     hamburger
     (at-medium
       {:display :none})]

    [:nav
     {:position :relative
      :background green
      :padding-left (px 20)
      :padding-right (px 20)
      :max-height 0
      :overflow :hidden
      :transition [[:max-height "500ms" :ease]]}
     [:a
      {:color white}]

     [:ul.main-nav
      {:font-size (px 24)
       :line-height (px 29)}
      [:li
       {:margin-top (px 20)}
       (underline white (px -1))]
      [:li.space
       {:display :none}]
      (at-medium
        {:text-align :justify
         :line-height 0
         :margin-bottom (px -7)
         :padding-left (px 70)
         :padding-right (px 70)}
        [:.facebook
         {:display :none}]
        [:li
         {:display :inline-block
          :vertical-align :bottom}
         [:&:after
          {:line-height 0
           :visibility :hidden}]]
        [:li.space
         {:display :inline}]
        [:&:after
         {:content "''"
          :width (percent 100)
          :display :inline-block
          :font-size 0
          :line-height 0}]
        [:a :button :span
         {:color black
          :text-align :left
          :display :inline-block
          :line-height (px 29)}
         [:&:before
          {:background green}]])
      (at-large
        {:float :right
         :text-align :left
         :padding-right (px 30)}
        [:.portfolio-link :li.space
         {:display :none}]
        [:li
         {:padding-left (px 20)}])]

     [:.row-0
      (at-large
        (underline green (px -1)))]

     [:.column-0
      (at-large
        (clearfix))]

     [:.row-1
      (at-medium
        (underline white (px -17)))
      (at-large
        (underline white (px -25)))]

     [:.row-2
      (at-medium
        {:margin-bottom (px 30)}
        (underline white (px -17)))]

     (clearfix)

     [:.facebook :.hamburger
      {:display :none}]

     [:ul.sub-nav
      {:font-size (px 19)
       :line-height (px 23)}]

     [:.divider
      {:width (px 14)
       :height (px 14)
       :background (with-alpha green 0.6)
       :position :relative
       :bottom (px -4)
       :display :none}]

     [:.portfolio-label
      {:display :none
       :font-size (px 24)
       :line-height (px 29)}
      (at-large
        {:display :inline})]

     [:.medium-drawer
      [:ul.sub-nav
       {:width (percent 50)
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
        {:margin-top (px 10)}]

      (at-medium
        (clearfix)
        {:width (percent 100)
         :margin-top (px 15)
         :margin-bottom (px 15)
         :padding-left (px 70)
         :padding-right (px 70)}
        [:&.column-1
         :&.column-2
         {:float :none
          :padding-left (px 70)}]
        [:li
         {:float :left
          :padding-right (px 25)}])

       (at-large
         [:&:before :&:after
          {:content :none}]
         {:width :auto
          :margin-top (px 15)
          :margin-bottom (px 15)
          :padding-left 0
          :padding-right 0}
         [:&.column-1
          :&.column-2
          {:float :none
           :padding-left 0}]
         [:li
          {:float :none
           :padding 0
           :display :inline-block}])]

      (at-medium
        (clearfix)
        {:max-height 0
         :width (percent 100)
         :background green
         :transition [[:max-height "500ms" :ease]]})

      (at-large
        {:background white
         :max-height :none
         :line-height 0
         :text-align :justify
         :padding [[(px 15) (px 30) 0]]}
        [:&:after
         {:content "''"
          :width (percent 100)
          :display :inline-block
          :line-height 0}]
        [:a
         {:color black}
         [:&:before
          {:background green}]]
        [:.row-1 :.row-2 :.column-1 :.column-2
         {:display :inline}]
        [:.divider
         {:display :inline-block}])]

     (at-medium
       {:background white
        :max-height (px 450)
        :padding 0}
       hamburger)

     (at-large
       {:clear :both}
       [:&:after
        {:margin-top (px -8)}])]

    (at-large
      {:position :relative})]

   [:header.show-menu
    :footer.show-menu
    [:nav
     {:max-height (px 450)}]
    hamburger-to-x
    (at-medium
      [:.medium-drawer
       {:max-height (px 130)}])
    (at-large
      [:.medium-drawer
       {:max-height :none}])]])

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
      :text-align :center
      :background white
      :padding-top (px 12)
      :padding-bottom (px 10)
      :margin-top (px 30)
      :margin-bottom (px 30)
      :border-bottom [[(px 5) :solid gray]]}
     [:em
      {:color red
       :font-size (px 18)}]
     [:em.continued
      {:display :none}]]
    (at-medium
      {:margin-top (px 20)
       :padding {:left (px 40)
                 :right (px 40)
                 :bottom (px 15)}}
      [:.links :.address
       {:width (percent 50)
        :display :inline-block}]
      [:.address
       {:padding-left (px 15)}]
      [:button
       [:em.continued
        {:display :inline}]])]])

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
      {:color white}]]
    (at-medium
      {:margin {:top (px 40)
                :bottom (px 40)}}
      [:&.shrink
       {:margin-top 0
        :margin-bottom 0
        :width "calc(50% - 20px)"
        :display :inline-block}])]])

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

(defn card-link [color]
  [:a
   {:color color
    :font-size (px 18)
    :font-family avenir-book-oblique}
   [:&:before
    {:background color
     :transform "translateY(0)"}]
   [:&:hover:before
    {:transform "translateY(2px)"}]])

(def tagline-card
  [[:.tagline-card
    {:background-color green}
    (square)
    [:div.square
     {:padding [[(px 30) (px 20)]]}]
    [:h1 :h2
     {:color white}]
    [:h1
     {:margin-bottom (px 30)}]
    [:h2
     {:margin-bottom (px 30)}]
    (card-link white)
    (at-medium
      {:margin {:top 0
                :right (px 40)
                :bottom 0}
       :width "calc(50% - 20px)"
       :display :inline-block})]])

(def services-card
  [[:.services-card
    {:border [[(px 1) (with-alpha green 0.6) :solid]]}
    (square)
    [:div.square
     {:padding [[(px 30) (px 20)]]}]
    (card-link red)
    [:p
     {:margin-bottom (px 30)}]
    (at-medium
      {:margin-top (px 40)}
      [:&:before
       {:padding-top (percent 50)}])]])

(def quote-card
  [[:.quote-card
    {:border [[(px 1) (with-alpha green 0.6) :solid]]}
    (square)
    [:div.square
     {:padding [[(px 30) (px 20)]]}]
    [:.fa-quote-left
     :.fa-quote-right
     {:color (with-alpha green 0.4)
      :width (percent 100)
      :text-align :center}]
    [:p
     {:margin-top (px 15)
      :margin-bottom (px 15)}]
    [:cite
     {:margin-top (px 20)
      :display :inline-block
      :font-size (px 18)
      :line-height (px 26)
      :font-family avenir-book-oblique
      :font-style :normal}]
    (at-medium
      {:margin {:top 0
                :right (px 40)
                :bottom 0}
       :width "calc(50% - 20px)"
       :display :inline-block})]])

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
      :margin-bottom (px 20)}]
    (at-medium
      (clearfix)
      {:margin-bottom (px 20)}
      [:.facebook
       {:float :left
        :padding-left (px 70)}]
      [:.copyright
       {:float :right
        :padding-right (px 70)}])]])

(def main
  [[:main
    {:padding (px 20)}
    (at-medium
      {:padding-left (px 70)
       :padding-right (px 70)})
    (at-large
      {:padding-left (px 30)
       :padding-right (px 30)})]])

(def vertical-line
  [[:.vertical-line
    {:display :none}
    (at-medium
      {:display :block
       :position :absolute
       :margin-left (px 70)
       :margin-right (px 70)
       :width (px 1)
       :height (percent 100)
       :background (with-alpha green 0.4)
       :z-index 3})
    (at-large
      {:margin-left (px 30)
       :margin-right (px 30)})]])

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
    quote-card
    vertical-line))

(defn manifest [config]
  {"css/out/screen.css" #(css (merge
                                {:vendors ["webkit" "moz"]
                                 :auto-prefix #{:transform
                                                :transform-origin
                                                :transition
                                                :transition-property
                                                :transition-duration
                                                :transition-timing-function
                                                :backface-visibility
                                                :justify-content}}
                                config)
                           screen)})

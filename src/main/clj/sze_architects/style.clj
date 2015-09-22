(ns sze-architects.style
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]
            [clojure.string :as str]
            [garden.color :as color :refer [rgb rgb? rgba]]
            [garden.core :refer [css]]
            [garden.stylesheet :refer [at-media]]
            [garden.units :refer [px em percent] :as units]))

(def red "#ef4639")
(def light-red "#ff6f6c")
(def green "#39bb99")
(def dark-green "#1c9371")
(def black "#000000")
(def white "#ffffff")
(def gray "#bfbfbf")
(def blue "#3b5998")
(def dark-blue "#2e4b7f")

(def avenir-book ["'Avenir LT W01 45 Book'" "Arial" "'Helvetica Neue'" "sans-serif"])
(def avenir-book-oblique ["'AvenirLTW01-45BookObliq'" "Arial" "'Helvetica Neue'" "sans-serif"])
(def lubalin-graph-book ["'ITCLubalinGraphW01-Bk'" "'Courier New'" "Courier" "monospace"])

(def reset
  [[:*
    {:background [[:none :repeat :scroll 0 0 :transparent]]
     :border [[:medium :none]]
     :border-spacing 0
     :color :black
     :font-weight :normal
     :list-style [[:none :outside :none]]
     :margin 0
     :padding 0
     :text-align :left
     :text-decoration :none
     :text-indent 0}]
   [:a :a:hover
    {:color :black}]
   [:fieldset
    {:border [[:medium :none]]}]
   [:body
    {:line-height :normal}]
   [:ul
    {:padding 0}]
   [:li
    {:list-style-type :none}]
   ["input::-moz-focus-inner"
    "button::-moz-focus-inner"
    {:border 0
     :padding 0}]
   [:button
    {:border 0
     :background :none}]
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
    {:font-weight :normal
     :font-family lubalin-graph-book}]
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
     :font-size (px 36)
     :line-height (px 43)}]
   [:h2
    {:color black
     :font-size (px 24)
     :line-height (px 32)}]
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

(def max-width (px 1600))

(def medium-breakpoint (px 768))

(def large-breakpoint (px 1100))

(defn at-size [size & rules]
  (at-media
    {:min-width size}
    (apply vector :& rules)))

(def at-medium
  (partial at-size medium-breakpoint))

(def at-large
  (partial at-size large-breakpoint))

(defn in-size [min max & rules]
  (at-media
    {:min-width min
     :max-width max}
    (apply vector :& rules)))

(def in-small
  (partial in-size
    (px 0) (units/px- medium-breakpoint 1)))

(def in-medium
  (partial in-size
    medium-breakpoint (units/px- large-breakpoint 1)))

(defn with-alpha [color alpha]
  (let [color (if (rgb? color) color (color/hex->rgb color))]
    (color/as-color
      (assoc color :alpha alpha))))

(defn link []
  [:&
   {:cursor :pointer
    :position :relative
    :transition [[:all "200ms" :ease]]}
   [:&:before
    {:content "''"
     :position :absolute
     :left 0
     :right 0
     :bottom 0
     :height (px 1)
     :background white
     :transform "translateY(0)"
     :transition [[:all "200ms" :ease]]}]
   [:&:hover
    [:&:before
     {:transform "translateY(1px)"}]]])

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

(defn clearfix []
  [:&
   {"*zoom" 1}
   [:&:before :&:after
    {:content "' '"
     :display :table}]
   [:&:after
    {:clear :both}]])

(def common
  [[:html
    {:min-height (percent 100)
     :position :relative}]
   [:body
    {:height (percent 100)}]
   [:a (link)]])

(def hamburger
  [:.hamburger
   {:width (px 22)
    :height (px 22)
    :position :relative
    :overflow :hidden
    :top (px 2)
    :bottom 0
    :display :inline-block}
   [:.line
    {:background green}]
   [:.top :.middle :.bottom :.line
    {:position :absolute
     :width (px 18)
     :height (px 2)
     :transition [[:all "300ms" :ease]]}]
   [:.top
    {:transform "translate(2px, 7px)"}
    [:.line
     {:transform-origin [[(percent 100) 0]]}]]
   [:.middle
    {:transform "translate(2px, 13px)"}]
   [:.bottom
    {:transform "translate(2px, 19px)"}
    [:.line
     {:transform-origin [[(percent 100)
                          (percent 100)]]}]]])

(def hamburger-to-x
  [:.hamburger
   [:.top
    {:transform "translate(-2px, 7px)"}
    [:.line
     {:transform "rotate(-45deg)"}]]
   [:.middle
    {:transform "translate(-2px, 13px)"}
    [:.line
     {:transform "translate(24px, 0)"}]]
   [:.bottom
    {:transform "translate(-2px, 19px)"}
    [:.line
     {:transform "rotate(45deg)"}]]])

(def header
  [[:header
    {:padding-top (px 25)}
    [:.logo
     {:width (px 182)
      :margin [[0 :auto (px 14)]]}]
    (at-medium
      {:padding [[(px 40) 0 0]]}
      [:.logo
       {:margin-bottom (px -28)}])
    (at-large
      {:padding-top (px 25)
       :max-width max-width
       :margin {:left :auto
                :right :auto}}
      [:.logo
       {:float :left
        :margin-top (px 38)
        :margin-left (px 68)
        :margin-bottom (px -81)
        :width (px 242)
        :z-index 2
        :position :relative}])]])

(def nav
  [[:nav
    (underline green (px -1))
    [:button
     (link)
     hamburger
     {:display :block
      :margin [[0 :auto]]}
     [:&:before
      {:background green}]]
    [:button.toggle-menu
     [:span
      {:padding-right (px 12)}]]
    (at-medium
      (underline green (px -1))
      [:button
       {:display :none}])
    (at-large
      (underline green (px -1)))]

   [:header
    [:.primary-drawer
     [:ul.primary-menu
      [:.facebook-link
       {:display :none}]]]]

   (at-large
     [:footer
      [:.portfolio-drawer
       [:.roof
        {:display :block}]
       [:.portfolio-link
        {:padding-left (px 30)}]]])

   [:header.show-menu
    :footer.show-menu
    [:.primary-drawer
     {:max-height (px 450)}]
    hamburger-to-x
    (at-medium
      [:.portfolio-drawer
       {:max-height (px 130)}])
    (at-large
      [:.portfolio-drawer
       {:max-height :none}])]])

(def primary-drawer
  [[:.primary-drawer
    (clearfix)
    {:background green
     :padding-left (px 20)
     :padding-right (px 20)
     :max-height 0
     :overflow :hidden
     :transition [[:max-height "500ms" :ease]]
     :position :relative}

    [:a
     {:color white}]

    [:.facebook-link :.hamburger
     {:display :none}]

    [:ul.primary-menu
     {:font-size (px 24)
      :line-height (px 29)}
     [:li
      {:margin-top (px 20)}
      (underline white (px -1))]
     [:li.space
      {:display :none}]]

    [:.portfolio-link
     [:button
      {:display :none}]]

    (at-medium
      hamburger
      {:background :none
       :height :auto
       :max-height (px 450)
       :padding 0
       :position :static
       :overflow :visible}
      [:ul.primary-menu
       {:text-align :justify
        :line-height 0
        :margin-bottom (px -7)
        :padding-left (px 70)
        :padding-right (px 70)}
       [:.portfolio-link
        [:a
         {:margin-right (px 12)}]]
       [:.facebook-link
        {:display :none}]
       [:li :a
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
        [:&:hover
         {:color red}]
        [:&:before
         {:background green}]]]
      [:.portfolio-link
       [:button
        {:display :block}]])

    (at-large
      {:clear :both}
      [:&:after
       {:margin-top (px -8)}]
      [:.row
       (underline green (px -1))]
      [:.column
       (clearfix)]
      [:ul.primary-menu
       {:float :right
        :text-align :left}
       [:.portfolio-link :li.space
        {:display :none}]
       [:.facebook-link
        {:display :inline-block}
        [:.fa-facebook:before
         {:color (with-alpha green 0.4)
          :background white
          :padding-right (px 15)}]]
       [:li
        {:padding-left (px 20)}]])]])

(def portfolio-drawer
  [[:.portfolio-drawer
    {:position :relative}

    [:ul.portfolio-menu
     {:font-size (px 19)
      :line-height (px 23)
      :width (percent 50)
      :margin-top (px 10)
      :margin-bottom (px 30)}

     [:li
      {:margin-top (px 10)}]]

    [:.row
     [:.column
      {:float :left}]]

    [:.row:last-child
     [:.column
      {:float :right
       :position :relative
       :padding-left (px 25)}
      [:&:before
       {:content "''"
        :opacity 0.4
        :background white
        :position :absolute
        :top (px 20)
        :bottom (px -10)
        :left 0
        :width (px 1)}]]]

    [:.portfolio-link
     {:display :none
      :font-size (px 24)
      :line-height (px 23)}]

    [:.roof
     {:display :none
      :width (px 53)
      :position :absolute
      :top (px -3)
      :bottom 0
      :left (px 20)
      :z-index 10}]

    [:.divider
     {:width (px 14)
      :height (px 14)
      :background (with-alpha green 0.6)
      :position :relative
      :bottom (px -4)
      :display :none}]

    (at-medium
      (clearfix)
      {:max-height 0
       :width (percent 100)
       :background green
       :transition [[:max-height "500ms" :ease]]
       :overflow :hidden}
      [:ul.portfolio-menu
       (clearfix)
       {:width (percent 100)
        :margin-top (px 15)
        :margin-bottom (px 15)
        :padding-left (px 70)
        :padding-right (px 70)}
       [:li
        {:float :left
         :padding-right (px 25)}]]
      [:.row :.row:last-child
       (underline white (px -17))
       [:.column
        {:float :none
         :padding-left (px 70)}]]
      [:.row:last-child
       {:margin-bottom (px 30)}])

    (at-large
      {:background :none
       :max-height :none
       :line-height 0
       :text-align :justify
       :padding [[(px 15) (px 70) 0]]}
      [:&:after
       {:content "''"
        :width (percent 100)
        :display :inline-block
        :line-height 0}]
      [:a
       {:color black}
       [:&:hover
        {:color red}]
       [:&:before
        {:background green}]]
      [:.divider
       {:display :inline-block}]
      [:ul.portfolio-menu
       [:&:before :&:after
        {:content :none}]
       {:width :auto
        :margin-top (px 15)
        :margin-bottom (px 15)
        :padding-left 0
        :padding-right 0}
       [:li
        {:float :none
         :padding 0
         :display :inline-block}]]
      [:.row :.column
       {:display :inline}]
      [:.row :.row:last-child
       [:&:after
        {:content :none}]
       [:.column
        {:float :none
         :padding-left 0}]]
      [:.portfolio-link
       {:display :inline-block}
       [:a:before
        {:bottom (px 2)}]])]])

(defn aspect
  ([]
   (aspect (percent 100)))
  ([p]
   (aspect p "> div"))
  ([p sel]
   [[:&
     {:position :relative
      :width (percent 100)
      :overflow :hidden}
     [:&:before
      {:content "''"
       :display :block
       :padding-top p}]
     [sel
      {:position :absolute
       :top 0
       :left 0
       :right 0
       :bottom 0}]]]))

(defn card-link [color]
  [:a
   {:color color
    :font-size (px 18)
    :font-family avenir-book-oblique}
   [:&:before
    {:background color
     :transform "scaleY(1) translateY(0)"}]
   [:&:hover:before
    {:transform "scaleY(2) translateY(1px)"}]])

(defn card-button []
  [:button
   {:cursor :pointer
    :width (percent 100)
    :text-align :center
    :background white
    :padding-top (px 12)
    :padding-bottom (px 10)
    :margin-top (px 30)
    :margin-bottom (px 30)
    :border-bottom [[(px 5) :solid gray]]
    :transition [[:all "200ms" :ease]]}
   [:&:hover
    {:background light-red
     :border-bottom-color red}
    [:em
     {:color white}]]
   [:em
    {:color red
     :font-size (px 18)
     :transition [[:all "200ms" :ease]]}]
   [:em.continued
    {:display :none}]])

(def main
  [[:main
    (clearfix)
    {:padding [[0 (px 20)]]
     :margin [[(px 20) 0 (px 10)]]
     :display :block}
    (at-medium
      {:padding [[0 (px 70)]]
       :margin-bottom 0})
    (at-large
      {:padding [[0 (px 70)]]
       :max-width max-width
       :margin {:left :auto
                :right :auto}})]])

(def card
  [[:.card
    (aspect)
    {:width (percent 100)
     :margin {:top (px 10)
              :bottom (px 10)}}
    [:&.left
     {:float :left}]
    [:&.right
     {:float :right}]
    (at-medium
      {:margin {:top (px 20)
                :bottom (px 20)}}
      [:&.third
       {:width "calc(50% - 20px)"}]
      [:&.rectangle
       [:&:before
        {:padding-top "calc(50% - 22px)"}]])
    (at-large
      [:&.full
       {:width "calc(66.6666667% - 20px)"}]
      [:&.half
       {:width "calc(50% - 20px)"}]
      [:&.third
       {:width "calc(33.3333333% - 20px)"}])]])

(def cards
  [[:.cards
    {:float :left
     :width (percent 100)}
    (at-medium
      [:&.row
       ["> div > .card.image-card.full > div"
        "> div > .card.image-card.half > div"
        {:padding (px 70)}
        [:h1
         {:font-size (px 48)
          :line-height (px 58)}]]]
      [:&.column
       [:&.third
        [:.card:before
         {:padding-top (percent 140)}]]])
    (at-size (px 860)
      [:&.column
       [:&.third
        [:.card:before
         {:padding-top (percent 130)}]]])
    (at-size (px 940)
      [:&.column
       [:&.third
        [:.card:before
         {:padding-top (percent 100)}]]])
    (at-large
      [:&.row
       [:&.row.fixed
        (aspect (px 372))]
       [:&.row.halves
        (aspect "calc(60% - -20px)")]
       [:&.row.thirds
        (aspect "calc(83% - -40px)")]
       ["> div"
        ["> *:first-child"
         {:margin-right (px 40)}]
        ["> .card"
         "> .cards"
         {:height "calc(100% - 40px)"}
         ["> .card"
          {:height "calc(50% - 20px)"}]]]]
      [:&.left
       {:float :left}]
      [:&.half
       {:width "calc(50% - 20px)"}
       [:.card
        {:width (percent 100)}]]
      [:&.third
       {:width "calc(33.3333333% - 20px)"}
       [:.card
        {:width (percent 100)}]])
    (at-size (px 1290)
      [:&.row
       [:&.row.halves
        (aspect "calc(50% - -20px)")]
       [:&.row.thirds
        (aspect "calc(66.6666667% - -40px)")]])]])

(def contact-card-at-small
  [:&
   (card-button)
   {:position :static
    :background green
    :padding [[(px 10) (px 20)]]}
   [:&:before
    {:content :none}]
   [:&.get-in-touch
    {:padding-bottom (px 27)}]
   ["> div"
    {:position :static}]
   [:h1
    {:color white}]
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
   [:.address-3
    {:display :none}]])

(def small-contact-card
  [[:.small-contact-card
    contact-card-at-small
    (at-medium
      {:padding [[(px 40) (px 40) (px 15)]]})]])

(def contact-card
  [[:.contact-card
    contact-card-at-small
    (at-medium
      {:margin-top (px 20)
       :padding {:left (px 40)
                 :right (px 40)
                 :bottom (px 15)}}
      [:.links :.address
       {:width (percent 50)
        :display :inline-block}
       [:a:before
        {:z-index 2}]]
      [:.address
       {:padding-left (px 15)}
       [:span:after
        {:background green}]]
      [:button
       [:em.continued
        {:display :inline}]]
      [:.address-3
       {:display :block}])
    (at-large
      [:&.simple
       {:display :none}]
      [:.address
       [:span:after
        {:content :none}]])]])

(def image-card
  [[:.image-card
    (card-button)
    {:width (percent 100)
     :position :relative
     :border [[(px 1) :solid (with-alpha green 0.4)]]}
    [:&.extra
     {:display :none}]
    [:&.show-overlay
     [:&.rectangle
      ]
     [:.overlay
      {:opacity 1}]
     [:img
      {:transform "scale(1.75)"}]
     [:button
      {:display :block}]]
    [:&.rectangle
     [:&.show-overlay
      [:img
       {:transform "scale(2.58)"}]]
     [:img
      {:transform "scale(2.5)"}]]
    [:img :.overlay
     {:transition [[:all "200ms" :ease]]}]
    [:img
     {:width (percent 100)
      :transform "scale(1.7)"
      :transform-origin [[(percent 50) (percent 25)]]}]
    [:button
     {:display :none}]
    [:.mask
     {:height (percent 100)
      :overflow :hidden
      :position :absolute
      :top 0
      :left 0
      :right 0
      :bottom 0}]
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
      [:.overlay
       {:padding (px 35)}]
      [:&.rectangle
       [:&.show-overlay
        [:img
         {:transform "scale(1.75)"}]]
       [:img
        {:transform "scale(1.7)"}]])
    (at-large
      [:&.extra
       {:display :block}]
      [:.overlay
       {:padding (px 35)}])]
   [:.no-touch
    [:.image-card
     [:&.rectangle
      [:&:hover
       [:img
        {:transform "scale(2.58)"}]]]
     [:&:hover
      [:.overlay
       {:opacity 1}]
      [:img
       6      {:transform "scale(1.75)"}]
      [:button
       {:display :block}]]
     (at-medium
       [:&.rectangle:hover
        [:img
         {:transform "scale(1.75)"}]])]]])

(def simple-image-card
  [[:.simple-image-card
    {:border [[(px 1) :solid (with-alpha green 0.4)]]}
    [:&:before
     {:content :none}]
    [:img
     {:display :block
      :width (percent 100)
      :transform "scale(1.01)"}]]])

(def tagline-card
  [[:.tagline-card
    {:background-color green}
    ["> div"
     {:padding [[(px 30) (px 20)]]}]
    [:h1 :h2
     {:color white}]
    [:h1
     {:margin-bottom (px 30)}]
    [:h2
     {:margin-bottom (px 30)}]
    (card-link white)
    (at-medium
      {:margin-right (px 40)}
      ["> div"
       {:padding (px 35)}])
    (at-large
      ["> div"
       {:padding (px 35)}])]])

(def services-card
  [[:.services-card
    {:border [[(px 1) (with-alpha green 0.6) :solid]]}
    ["> div"
     {:padding [[(px 30) (px 20)]]}]
    (card-link red)
    [:p
     {:margin-bottom (px 30)}]
    (at-medium
      [:&:before
       {:padding-top "calc(40% - 20px)"}]
      ["> div"
       {:padding (px 35)}])
    (at-large
      {:width "calc(50% - 20px)"}
      ["> div"
       {:padding (px 35)}])]])

(def quote-card
  [[:.quote-card
    {:border [[(px 1) (with-alpha green 0.6) :solid]]}
    ["> div"
     {:padding [[(px 30) (px 20)]]}]
    [:.fa-quote-left
     :.fa-quote-right
     {:color (with-alpha green 0.4)
      :width (percent 100)
      :text-align :center}]
    [:p
     {:margin-top (px 15)
      :margin-bottom (px 15)}]
    [:blockquote
     {:margin 0}]
    [:cite
     {:margin-top (px 20)
      :display :inline-block
      :font-size (px 18)
      :line-height (px 26)
      :font-family avenir-book-oblique
      :font-style :normal}]
    (at-medium
      {:margin-right (px 40)}
      ["> div"
       {:padding (px 35)}])
    (at-large
      ["> div"
       {:padding (px 35)}])]])

(defn input-placeholder [& rules]
  (mapv
    #(apply vector % rules)
    ["::input-placeholder"
     ":-moz-placeholder"
     "::-moz-placeholder"
     ":-ms-input-placeholder"
     "::-webkit-input-placeholder"]))

(def form-card
  [(input-placeholder
     {:color gray
      :font-family avenir-book-oblique})
   ["::-webkit-validation-bubble-message"
    {:display :none}]
   [:.form-card
    {:overflow :visible
     :padding [[(px 10) (px 20) 0]]
     :border [[(px 1) (with-alpha green 0.4) :solid]]}
    (card-button)
    [:p
     {:font-size (px 18)
      :line-height (px 28)}]
    [:button
     {:margin-bottom (px 25)
      :background green
      :border-bottom-color dark-green}
     [:em
      {:color white}]]
    [:&:before
     {:content :none}]
    ["> div"
     {:position :relative}]
    [:fieldset
     {:margin 0
      :padding 0}
     [:p:first-child
      {:margin-top (px 10)}]
     [:p:last-child
      {:margin-bottom 0}]]
    [:label
     {:font-size (px 18)
      :font-family lubalin-graph-book}]
    [:input :textarea
     {:display :block
      :width (percent 100)
      :font-size (px 18)
      :font-family avenir-book
      :margin-top (px 5)
      :padding [[(px 4) (px 10)]]
      :border [[(px 2) :solid (with-alpha green 0.4)]]
      :border-radius 0
      :-webkit-appearance :none}
     [:&:active :&:focus :&:hover
      {:outline :none
       :border-color green}]]
    [:textarea
     {:min-height (px 100)}]
    [:.overlay
     {:position :absolute
      :transition [[:all "200ms" :ease]]
      :padding [[(px 10) (px 20) 0]]
      :top 0
      :bottom 0
      :left 0
      :right 0
      :background green
      :z-index -1
      :opacity 0}
     [:h1
      {:color white}]]
    [:small
     {:color gray}
     [:&.error
      {:color red
       :max-height 0
       :margin-top (px 20)
       :overflow :hidden
       :display :block
       :transition [[:all "200ms" :ease]]}]]
    (in-small
      {:max-height (px 800)})
    (at-medium
      [:p
       (clearfix)]
      [:label
       {:position :relative
        :top (px 8)}]
      [:input
       :textarea
       {:float :right
        :width (percent 80)}]
      ["label[for=\"note-field\"]"
       {:width (px 60)
        :display :inline-block}])]
   [:.form-invalid
    [:.form-card
     [:input :textarea
      [:&:invalid
       {:border-color light-red}]]
     [:small.error
      {:max-height (px 20)}]]]
   [:.form-submitted
    [:.form-card
     [:.overlay
      {:z-index 10
       :opacity 1}]
     (in-small
       {:overflow :hidden
        :max-height (px 258)
        :transition [[:max-height "500ms" :ease]]})]]])

(def map-card
  [[:.map-card
    [:.map
     {:width (percent 100)
      :height (percent 100)
      :border [[(px 1) (with-alpha green 0.4) :solid]]}
     [:a
      {:color red
       :font-style :italic
       :text-decoration :underline}]]
    (at-large
      {:height (percent 100)}
      [:&:before
       {:content :none}])]])

(def facebook-card
  [[:.facebook-card
    {:cursor :pointer
     :transition [[:all "200ms" :ease]]
     :background blue}
    [:&:hover
     {:background dark-blue}]
    [:&:before
     {:content :none}]
    ["> div"
     ;; (clearfix)
     {:position :static
      :padding [[(px 35) (px 20)]]
      :display :inline-block
      :text-align :center
      :width (percent 100)}]
    [:a
     {:max-width (px 215)
      :text-align :left
      :display :inline-block}
     [:&:before
      {:content :none}]]
    [:h1
     {:color white
      :font-size (px 32)
      :width (percent 75)
      :margin 0
      :display :inline-block}]
    [:span.fa
     {:width (percent 25)
      :position :relative
      :top (px -8)
      :font-size (px 66)
      :display :inline-block
      :color (with-alpha white 0.4)}]
    (in-size (px 500) (units/px- medium-breakpoint 1)
      [:a
       {:max-width (px 415)}]
      [:h1
       {:width (percent 90)
        :position :relative
        :top (px -6)
        :left (px 6)}]
      [:span.fa
       {:width (percent 10)
        :font-size (px 66)
        :position :relative
        :left (px -12)
        :top (px 8)}])]])

(def dropkick
  [[:.dk-select
    {:width (percent 100)}
    (at-medium
      {:float :right
       :width (percent 80)
       :padding-top (px 4)})]
   [:.dk-select-open-down
    {:margin-bottom (px 2)}
    [:.dk-selected :.dk-selected:focus
     {:border-color green
      :border-bottom-width 0}
     [:&:before
      {:border-bottom-color green}]]
    [:.dk-select-options
     {:padding 0
      :border-width (px 2)
      :border-top-width 0
      :border-radius 0
      :border-color green
      :max-height (em 12)
      :opacity 1}]]
   [:.dk-selected
    {:padding-top (px 2)
     :padding-bottom (px 1)
     :margin 0
     :font-size (px 18)
     :line-height (px 26)
     :border-width (px 2)
     :border-radius 0
     :border-color (with-alpha green 0.4)}
    [:&:before
     {:border-top-color (with-alpha green 0.4)}]
    [:&:after
     {:border :none}]
    [:&:hover
     {:border-color green}
     [:&:before
      {:border-top-color green}]]]
   [:.dk-selected:focus
    {:border-color green}
    [:&:before
     {:border-top-color green}]]
   [".dk-selected:not([aria-activedescendant])"
    {:color gray
     :font-family avenir-book-oblique}]
   [:.dk-option-disabled
    {:display :none}]
   [:.dk-option-selected
    {:background-color green}]
   [:.dk-select
    [:.dk-select-options
     {:display :block
      :overflow :hidden}]]
   [:.dk-select-options
    {:display :inline-block
     :max-height 0
     :border-width 0
     :border-radius 0
     :margin [[(em 0.25) 0]]
     :padding 0
     :opacity 0
     :overflow :hidden
     :transition [[:max-height "200ms" :ease]
                  [:opacity "200ms" :ease]]}
    [:.dk-option-highlight
     {:background-color green}]]
   [:.dk-option
    {:font-size (px 18)
     :line-height (px 26)}]])

(def service-list-card
  [[:.service-list-card
    {:color white
     :background green}
    ["> div"
     {:padding [[(px 26) (px 20) (px 30)]]
      :position :static}]
    [:&:before
     {:content :none}]
    [:h1
     {:color white
      :margin-top 0
      :margin-bottom (px 20)}]
    [:ul
     {:margin 0}]
    [:li
     {:font-size (px 16)
      :line-height (px 22)
      :padding-left (em 1)
      :text-indent (em -1)}
     [:&:before
      {:content "'• '"}]]]])

(def copy-card
  [[:.copy-card
    (card-link red)
    {:border [[(px 1) (with-alpha green 0.4) :solid]]}
    ["> div"
     {:padding [[(px 30) (px 20) (px 10)]]
      :position :static}]
    [:&:before
     {:content :none}]
    [:h1
     {:color (with-alpha green 0.6)
      :font-size (px 36)
      :line-height (px 43)
      :font-weight :normal
      :margin-bottom 0}]
    [:h2
     {:font-family lubalin-graph-book
      :font-size (px 21)
      :line-height (px 32)
      :font-weight :normal
      :margin-top 0}]
    [:h3
     {:font-family avenir-book-oblique
      :font-size (px 21)
      :line-height (px 28)
      :font-weight :normal
      :margin-top 0}]
    [:h4
     {:font-family lubalin-graph-book
      :font-size (px 21)
      :line-height (px 32)
      :font-weight :normal
      :margin-bottom 0}]
    ["*:first-child"
     {:margin-top 0}]
    [:p
     {:font-size (px 16)
      :line-height (px 22)}]
    [:li
     {:font-size (px 16)
      :line-height (px 22)
      :padding-left (em 1)
      :text-indent (em -1)}
     [:&:before
      {:color (with-alpha green 0.6)
       :content "'• '"}]]]])

(def client-list-card
  [[:.client-list-card
    (in-medium
      [:.left
       :.right
       {:display :inline-block
        :width "calc(50% - 40px)"
        :vertical-align :top}]
      [:.left
       {:margin-right (px 80)}])]])

(def statement-card
  [[:.statement-card
    {:background green}
    ["> div"
     {:padding [[(px 30) (px 20) (px 10)]]
      :position :static}]
    [:&:before
     {:content :none}]
    [:h1
     {:color white
      :font-family lubalin-graph-book
      :font-size (px 36)
      :line-height (px 43)
      :font-weight :normal
      :margin-top 0}]]])

(def footer
  [[:footer
    ["> .facebook-link"
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
      ["> .facebook-link"
       {:float :left
        :padding-left (px 70)}]
      [:.copyright
       {:float :right
        :padding-right (px 70)}])
    (at-large
      {:margin {:left :auto
                :right :auto}
       :max-width max-width}
      [" > .facebook-link"
       {:display :none}]
      [:.copyright
       {:margin-bottom  (px 40)}])]])

(def vertical-line
  [[:.vertical-line
    {:display :none}
    (at-medium
      {:display :block
       :position :absolute
       :margin-left (px 70)
       :margin-right (px 70)
       :width "calc(100% - 140px)"
       :height (percent 100)
       :border-left [[(px 1) :solid (with-alpha green 0.4)]]
       :z-index -1})
    (at-large
      {:max-width (units/px- max-width (px 140))
       :left 0
       :right 0
       :margin {:left :auto
                :right :auto}})]])

(def get-in-touch
  [[:main.get-in-touch
    (in-small

      [:.card
       {:margin-top (px 20)
        :margin-bottom (px 20)}]

      [:.simple-image-card
       (aspect)
       [:img
        {:position :absolute
         :top 0
         :bottom 0
         :left 0
         :right 0}]])

    (in-medium
      (clearfix)

      [:.column-0
       :.column-1
       :.column-2
       :.column-3
       {:float :left}]

      [:.column-1
       :.column-2
       {:width "calc(50% - 20px)"}]

      [:.column-1
       {:margin-right (px 20)}]

      [:.column-2
       {:margin-left (px 20)}]

      [:.column-3
       {:width (percent 100)}]

      [:.image-card-0
       {:height "calc(100% - 236px)"}]

      [:.facebook-card
       {:margin-top (px 40)}]

      [:.image-card-1
       {:height "calc(100% - 40px)"}]

      [:.map-card
       {:max-height (px 300)
        :margin-top (px 40)}])

    (in-size
      medium-breakpoint
      (units/px+ medium-breakpoint 200)
      [:.column-1
       :.column-2
       {:height (px 600)}])

    (in-size
      (units/px+ medium-breakpoint 201)
      (units/px- large-breakpoint 1)
      [:.column-1
       :.column-2
       {:height (px 800)}])

    (at-large
      [:.column-0
       :.column-1
       {:float :left
        :height (px 794)}]

      [:.column-2
       :.column-3
       {:float :left
        :height (px 632)
        :margin-top (px 20)}]

      [:.column-0
       {:display :table}]

      [:.card-wrap
       {:display :table-row}]

      [".card-wrap:nth-child(1)"
       {:height 0}]

      [:.column-0
       {:width "calc(100% - 372px - 40px)"
        :margin-right (px 40)}]

      [:.column-1
       {:width (px 372)}]

      [:.facebook-card
       {:margin-top (px 40)}]

      [:.map-card
       {:height "calc(100% - 20px)"}]

      [:.column-2
       {:width "calc(100% - 628px - 40px)"
        :margin-right (px 40)}]

      [:.column-3
       {:width (px 628)}]

      [:.image-card-1
       {:height (px 610)}])]])

(def services
  [[:main.services
    [:.card
     {:margin-top (px 20)
      :margin-bottom (px 20)}]
    [:.quote-card
     {:display :none}
     ["> div"
      {:position :static}]
     [:&:before
      {:content :none}]]
    [:.column-1
     [:.image-card-0
      {:display :none}]]
    [:.column-2
     [:.copy-card-0
      :.image-card-1
      {:display :none}]]
    [:.column-4
     [:.image-card-0
      {:display :none}]]
    (in-medium
      [:.column-1
       [:.copy-card-0
        {:display :none}]
       [:.image-card-0
        {:display :block}]]
      [:.column-2
       [:.image-card-0
        {:display :none}]
       [:.copy-card-0
        {:display :block}]]
      [:.card
       {:margin-top (px 30)
        :margin-bottom (px 30)}]
      [:.column-0
       :.column-1
       {:display :inline-block
        :width "calc(50% - 15px)"
        :vertical-align :top}
       [:.card
        {:min-height (px 340)
         :margin-bottom 0}
        [:img
         {:width :auto
          :height (percent 100)}]
        ["> div" :img
         {:position :absolute
          :top 0
          :bottom 0
          :left 0
          :right 0}]
        [:&:before
         {:content "''"}]]]
      [:.column-0
       {:margin-right (px 30)}])
    (at-large
      [:.column-2
       [:.image-card-0
        {:display :none}]
       [:.image-card-1
        {:display :block}]]
      [:.column-4
       [:.image-card-0
        {:display :block}]
       [:.image-card-1
        {:display :none}]]
      [:.quote-card
       {:display :block}]
      [:.card
       {:margin-top (px 40)
        :margin-bottom 0}]
      [:.column-0
       :.column-1
       :.column-3
       :.column-4
       :.column-5
       :.column-6
       {:display :inline-block
        :vertical-align :top}]
      [:.column-0
       {:width "calc(33.3333333% - 20px)"
        :margin-right (px 40)}]
      [:.column-1
       {:width "calc(66.6666667% - 20px)"}]
      [:.column-3
       :.column-5
       {:width "calc(50% - 20px)"
        :margin-right (px 40)}]
      [:.column-4
       :.column-6
       {:width "calc(50% - 20px)"}]
      [:.column-0
       :.column-1
       [:.card
        {:height (px 338)}]]
      [:.column-3
       [:.card
        {:height (px 1067)}]]
      [:.column-4
       [:.card:first-child
        {:height (px 627)}]
       [:.image-card-0
        {:max-height (px 400)}
        [:img
         {:transform "translateY(-5%)"}]]]
      [:.column-5
       :.column-6
       [:.card
        {:height (px 475)}]])
    (at-size (px 1200)
      [:.column-3
       [:.card
        {:height (px 978)}]]
      [:.column-4
       [:.card:first-child
        {:height (px 580)}]
       [:.image-card-0
        {:max-height (px 358)}
        [:img
         {:transform "translateY(-15%)"}]]])
    (at-size (px 1300)
      [:.column-3
       [:.card
        {:height (px 880)}]]
      [:.column-4
       [:.card:first-child
        {:height (px 580)}]
       [:.image-card-0
        {:max-height (px 260)}
        [:img
         {:transform "translateY(-27%)"}]]])
    (at-size (px 1600)
      [:.column-3
       [:.card
        {:height (px 770)}]]
      [:.column-4
       [:.card:first-child
        {:height (px 490)}]
       [:.image-card-0
        {:max-height (px 240)}
        [:img
         {:transform "translateY(-33%)"}]]])]])

(def our-office
  [[:main.our-office
    [:.card
     {:margin-top (px 20)
      :margin-bottom (px 20)}]
    [:.column-1
     [:.image-card-0
      {:display :none}]]
    [:.image-card-4
     {:display :none}]
    (in-medium
      [:.column-0
       :.column-2
       [:.image-card-0
        {:display :none}]
       [:.card:first-child
        :.card:last-child
        {:margin-bottom (px 30)}]]
      [:.column-1
       {:margin [[(px 30) 0]]}
       [:.image-card-0
        {:display :inline-block}]
       [:.card
        {:display :inline-block
         :width "calc(50% - 15px)"
         :margin 0}
        [:&:first-child
         {:margin-right (px 30)}]]]
      [:.column-3
       :.column-4
       {:display :inline-block
        :width "calc(50% - 15px)"
        :vertical-align :top}
       [:&.column-3
        {:margin-right (px 30)}]
       [:.card:first-child
        {:margin [[0 0 (px 30)]]}]
       [:.card:last-child
        {:position :relative
         :margin-bottom 0
         :min-height (px 428)}
        ["> div"
         {:position :absolute}]
        [:&:before
         {:content "''"}]]]
      [:.column-5
       :.column-6
       [:.card
        {:margin [[(px 30) 0]]}]]
      [:.detailed.contact-card
       {:margin-bottom 0}])]])

(def screen
  (concat
    reset
    defaults
    common
    fonts
    vertical-line
    header
    nav
    primary-drawer
    portfolio-drawer
    main
    card
    cards
    contact-card
    image-card
    simple-image-card
    tagline-card
    services-card
    quote-card
    form-card
    facebook-card
    map-card
    get-in-touch
    dropkick
    service-list-card
    client-list-card
    copy-card
    statement-card
    small-contact-card
    services
    our-office
    footer))

(defn manifest [config]
  {"css/out/screen.css" (fn []
                          (str
                            (slurp (io/resource "cljsjs/dropkick/common/dropkick.css"))
                            \n
                            (css (merge
                                   {:vendors ["webkit" "moz" "ms" "o"]
                                    :auto-prefix #{:transform
                                                   :transform-origin
                                                   :transition
                                                   :transition-property
                                                   :transition-duration
                                                   :transition-timing-function
                                                   :backface-visibility
                                                   :justify-content}}
                                   config)
                              screen)))})

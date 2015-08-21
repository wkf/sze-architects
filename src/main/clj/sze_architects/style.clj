(ns sze-architects.style
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]
            [clojure.string :as str]
            [garden.color :as color :refer [rgb rgb? rgba]]
            [garden.core :refer [css]]
            [garden.stylesheet :refer [at-media]]
            [garden.units :refer [px em percent] :as units])
  (:import (jodd.csselly CSSelly CssSelector Combinator Selector$Type)))

(def red "#ef4639")
(def light-red "#ff6f6c")
(def green "#39bb99")
(def dark-green "#1c9371")
(def black "#000000")
(def white "#ffffff")
(def gray "#bfbfbf")

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
      :margin [[0 :auto (px 28)]]}]
    (at-medium
      {:padding [[(px 40) 0 0]]})
    (at-large
      {:padding-top (px 25)
       :max-width max-width
       :margin {:left :auto
                :right :auto}}
      [:.logo
       {:float :left
        :margin-top (px 38)
        :margin-left (px 68)
        :margin-bottom (px -57)
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
         {:padding-top (percent 130)}]]])
    (at-size (px 860)
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

(def contact-card
  [[:.contact-card
    (card-button)
    {:position :static
     :background green
     :padding [[(px 10) (px 20)]]}
    [:&:before
     {:content :none}]
    ["> div"
     {:position :static}]
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
        {:display :inline}]])
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
     :text-align :center
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
     {:color (with-alpha green 0.4)
      :font-family avenir-book-oblique})
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
      :border [[(px 2) :solid (with-alpha green 0.4)]]}
     [:&:active :&:focus :&:hover
      {:outline :none
       :border-color green}]]
    [:textarea
     {:min-height (px 100)}]]])

(def dropkick
  [[:.dk-select
    {:width (percent 100)}]
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
      :border-color green}]]
   [:.dk-selected
    {:padding-top (px 2)
     :padding-bottom (px 1)
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
    {:color (with-alpha green 0.4)
     :font-family avenir-book-oblique}]
   [:.dk-option-disabled
    {:display :none}]
   [:.dk-option-selected
    {:background-color green}]
   [:.dk-select-options
    [:.dk-option-highlight
     {:background-color green}]]
   [:.dk-option
    {:font-size (px 18)
     :line-height (px 26)}]])

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
    tagline-card
    services-card
    quote-card
    form-card
    dropkick
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

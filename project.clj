(defproject sze-architects "0.1.0-SNAPSHOT"
  :description "FIXME: Write a description."
  :url "FIXME: Add a URL."
  :scm {:name "git"
        :url "FIXME: Add a URL."}
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :main sze-architects.site
  :source-paths ["src/main/clj"
                 "src/main/cljs"]
  :resource-paths ["resources"
                   "lib/dropkick-2.1.7-0.jar"
                   "lib/fastclick-1.0.6-0.jar"]
  :dependencies [[org.clojure/clojure "1.7.0-RC2"]
                 [org.clojure/clojurescript "0.0-3308"]
                 [aviary "0.1.17"]
                 [enlive "1.1.5"]
                 [garden "1.2.5"]
                 [markdown-clj "0.9.66"]
                 [cljsjs/google-maps "3.18-1"]
                 #_[cljsjs/dropkick "2.1.7-0"]
                 #_[cljsjs/fastclick "1.0.6-0"]]
  :profiles {:dev {:source-paths ["src/dev/clj"
                                  "src/dev/cljs"]
                   :dependencies [[weasel "0.5.0"]
                                  [com.cemerick/piggieback "0.1.5"]]
                   :repl-options {:init (sze-architects.dev/start)
                                  :init-ns sze-architects.dev
                                  :nrepl-middleware
                                  [cemerick.piggieback/wrap-cljs-repl]}}}
  :aliases {"ship" ["run" ":ship"]
            "export" ["run" ":export"]})

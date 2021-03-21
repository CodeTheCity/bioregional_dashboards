(ns river-course-tool.osm
  (:require [clojure.pprint :as pp]
            [clojure.java.io :as io]
            [clojure.xml :as xml]
            [clojure.zip :as zip]
            [clojure.data.json :as json]
            [clj-http.client :as http]
            [taoensso.timbre :as log])
  (:import [java.io ByteArrayInputStream FileWriter]))


(def osm-root "https://www.openstreetmap.org/api/0.6/")

(defn fetch [osm-id]
  (let [osm-url (str osm-root osm-id)]
    (log/debugf "Fetching %s" osm-url)
    (->> osm-url
         http/get
         :body
         .getBytes
         ByteArrayInputStream.
         io/input-stream
         xml/parse
         zip/xml-zip)))


(defn way->node-ids [m]
  (->> m
       first
       :content
       first
       :content
       (filter #(= :nd (:tag %)))                           ;; just :nd objects
       (map #(-> % :attrs :ref))
       (map #(str "node/" %))))


(defn node->latlon [m]
  (let [m' (-> m
               first
               :content
               first
               :attrs
               (select-keys [:lat :lon]))]
    (try
      {:lat (-> m' :lat bigdec double)
       :lon (-> m' :lon bigdec double)}
      (catch Throwable t
        (do
          (log/warn "bad latitude-longitude data in node: %s" m')
          nil)))))


(defn dispatch [m]
  (let [type (->> m first :content first :tag)]
    (condp = type
      :way (let [id (-> m first :content first :attrs :id)
                 node-ids (way->node-ids m)]
             (log/infof "way/%s has %s nodes" id (count node-ids))
             (->> node-ids
                  (map #(fetch %))
                  (map #(node->latlon %))
                  (remove nil?)))
      :node (node->latlon m)
      (log/errorf "Unexpected type: %s" type))))


(defn osm-ids->latlons [osm-ids]
  (->> osm-ids
       (map #(dispatch (fetch %)))
       flatten))

(defn latlon->feature [m]
  {:type "Feature"
   :geometry {:type "Point"
              :coordinates [(:lon m) (:lat m)]}
   :properties {}})

(defn latlons->FeatureCollection [coll]
  {:type "FeatureCollection"
   :features (map latlon->feature coll)})

(defn write-geojson-file [file m]
  (io/make-parents file)
  (binding [*out* (FileWriter. file)]
    (json/pprint m)))



(def teith-osm-ids ["way/95207649"
                    "way/144629109"
                    "way/144629115"
                    "way/61919932"])

(defn teith [_]
  (log/set-level! :info)
  (log/infof "teith has %s parts" (count teith-osm-ids))
  (let [latlons (osm-ids->latlons teith-osm-ids)]
    (log/infof "teith has %s latlons" (count latlons))
    (->> latlons
         latlons->FeatureCollection
         (write-geojson-file "teith.json"))))


(def leven-osm-ids ["way/39591139"
                    "way/59704593"
                    "way/262580376"
                    "way/262580375"
                    "way/262580375"
                    "way/262580374"
                    "way/262580373"
                    "way/10598541"
                    "way/573730168"
                    "way/573730167"
                    "way/573730165"
                    "way/573730164"
                    "way/133128215"])

(defn leven [_]
  (log/set-level! :info)
  (log/infof "leven has %s parts" (count leven-osm-ids))
  (let [latlons (osm-ids->latlons leven-osm-ids)]
    (log/infof "leven has %s latlons" (count latlons))
    (->> latlons
         latlons->FeatureCollection
         (write-geojson-file "leven.json"))))

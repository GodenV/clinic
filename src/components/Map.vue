<template>
    <yandex-map
  :coords="[54.62896654088406, 39.731893822753904]"
  zoom="10"
  style="height: 600px;"
  :cluster-options="{
    1: {clusterDisableClickZoom: true}
  }"
>

    <ymap-marker
            marker-id="1"
      marker-type="placemark"
      :coords="[54.6, 39.8]"
      hint-content="Hint content 1"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
      :icon="{color: 'blue', glyph: 'heart'}"
      cluster-name="1"
    ></ymap-marker>

</yandex-map>
</template>

<script>
    import {yandexMap, ymapMarker} from 'vue-yandex-maps'

    export default {
        name: "Map",
        components: {yandexMap, ymapMarker},
        data() {
            return {
                settings: {
                    apiKey: 'b69c2ffe-6ccc-4ace-beea-55eba5a30849',
                    lang: 'ru_RU',
                    coordorder: 'latlong',
                    version: '2.1'
                },
                placemarks: [
      {
        coords: [54.8, 39.8],
        properties: {}, // define properties here
        options: {}, // define options here
        clusterName: "1",
        callbacks: { click: function() {} }
      }
    ]
            }
        },
    }
</script>

<style lang="scss">

</style>
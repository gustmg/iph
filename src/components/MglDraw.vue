<template> </template>
<script>
    import MapboxDraw from '@mapbox/mapbox-gl-draw'
    import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
    export default {
        inject: ['mapbox', 'map', 'actions'],

        created() {
            this.map.doubleClickZoom.disable()
            var Draw = new MapboxDraw()
            this.map.addControl(Draw, 'bottom-right')
        },
    }
</script>

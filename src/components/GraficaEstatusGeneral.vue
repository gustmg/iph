<template>
    <apexchart width="90%" type="radialBar" :options="options" :series="series" :labels="labels"></apexchart>
</template>

<script>
    export default {
        data() {
            return {
                chart: {
                    height: 280,
                    type: 'radialBar',
                },
                series: [67, 84, 97, 61],
                options: {
                    radialBar: {
                        dataLabels: {
                            total: {
                                show: true,
                                label: 'TOTAL',
                            },
                        },
                    },
                },
                labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D'],
            }
        },
    }
</script>

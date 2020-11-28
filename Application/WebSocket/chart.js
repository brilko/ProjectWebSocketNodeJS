const { mixins, Line } = VueChartJs,
      { reactiveProp } = mixins;

const LineChart = {
    extends: Line,
    mixins: [reactiveProp],
    props: ['chartData'],
    mounted () {
        this.renderChart(this.chartData, this.options);
    },
    computed: {
        options() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    // yAxes: [{
                    //     ticks: {
                    //         min: 0,
                    //         max: 100,
                    //         stepSize: 1
                    //     }
                    // }],
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                }
            };
        }
    }
};

let ctx;
let gradient;

window.addEventListener('DOMContentLoaded', () => {
    ctx = document.querySelector('#line-chart').getContext('2d');
    gradient = ctx.createLinearGradient(10, 0, document.documentElement.clientWidth, 0);
    
    // Add three color stops
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');
});

const vm = new Vue({
    el: '.app',
    components: {
        LineChart
    },
    data () {
        return {
            datacollection: null
        };
    },
    mounted () {
        this.fillData();
    },
    methods: {
        fillData (data) {
            this.datacollection = {
                labels: [...Array(500).keys()],
                datasets: [
                            {
                                label: 'Sensor',
                                borderColor: gradient,
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                data
                            }
                        ]
            };
        },
    },
    computed: {
        myStyles () {
            return {
                height: document.documentElement.clientHeight - 50 + 'px',
                position: 'relative'
            };
        }
    }
});
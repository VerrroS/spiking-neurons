const svg_canvas = document.getElementById('svg_canvas')
let neurons = [];
const neurons_nodes = document.getElementsByClassName('neuron');

// creating the neurons
//for (i = 0; i < 10; i++) {
//    neurons.push(new Neuron(i*5 + (Math.random() * 10), i*5+ (Math.random() * 10), i));
//}

neurons.push(new Neuron(10, 10, 0));
neurons.push(new Neuron(20, 20, 1));
neurons.push(new Neuron(10, 30, 2));

neurons[1].add_link(0);
neurons[2].add_link(1);

function setPlotActive() {
    neuron_id = this.dataset.id;
    neurons.forEach(element => {
        if (element.id == neuron_id) {
            element.plotActive = true;
        }
        else {
            element.plotActive = false;
        }
});}

Array.from(neurons_nodes).forEach(element => {
    element.addEventListener("click", setPlotActive)});
const svg_canvas = document.getElementById('svg_canvas')
let neurons = [];
const neurons_nodes = document.getElementsByClassName('neuron');
const center = 60

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// creating the neurons
//for (i = 0; i < 5; i++) {
//    neurons.push(new Neuron(center + random(-i*5, i*5), center + random(-i*5, i*5), i));
//    neurons[i].add_link(random(0, neurons.length - 1));
//}

neurons.push(new Neuron(center, center, 0));
neurons.push(new Neuron(center + 20, center + 20, 1));

neurons[1].add_link(0);

function spike_neuron() {
    neuron_id = this.dataset.id;
    neurons.forEach(element => {
        if (element.id == neuron_id) {
            element.spike();
        }
    });
}

function setPlotActive() {
    console.log(this.dataset.id);
    neuron_id = this.dataset.id;
    neurons.forEach(element => {
        if (element.id == neuron_id) {
            element.plotActive = true;
        }
        else {
            element.plotActive = false;
        }
    });
    neurons[neuron_id].displayPlot();
}

Array.from(neurons_nodes).forEach(element => {
    element.addEventListener("click", setPlotActive)});

Array.from(neurons_nodes).forEach(element => {
    element.addEventListener("dblclick", spike_neuron)});
const svg_canvas = document.getElementById('svg_canvas')
let neurons = [];
let neurons_nodes = [];
const inputs = document.getElementsByTagName('input');
const form = document.getElementById('form');
const helpIcon = document.getElementsByClassName("help-icon");
const width = 150;
const height = 150;
puffer = 5;
var d = document.getElementById("d-timer");
const dTimer = new Stopwatch(d, {
    delay: 1000
});
const chance = (percentage) => Math.random() * 100 < percentage;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetNeurons() {
    dTimer.reset();
    deleteNeurons();
    let number = document.getElementById('neuron_numb').value;
    let tau = document.getElementById('tau').value;
    let synaptic_weight =document.getElementById('synaptic_weight').value;
    let spike_threshold = document.getElementById('spike_threshold').value;
    let rest = document.getElementById('rest').value;
    let link_chance = document.getElementById('link_chance').value;
    for (i = 0; i < number; i++) {
        coords = checkoverlap();
        neurons.push(
            new Neuron(
                coords.x, 
                coords.y,
                i,
                tau,
                synaptic_weight,
                spike_threshold,
                rest
                )
            )
    }
    neurons.forEach(element => {
        linkNeurons(element, link_chance);
    });
    neurons_nodes = document.getElementsByClassName('neuron');
    Array.from(neurons_nodes).forEach(element => {
        element.addEventListener("click", setPlotActive)});
    
    Array.from(neurons_nodes).forEach(element => {
        element.addEventListener("dblclick", spike_neuron)});
};

function linkNeurons(element, link_chance){
    neurons.forEach(element2 => {
        link = chance(link_chance);
        if (element.id != element2.id && link == true) {
            element.addLink(element2);
        }
    });
}

function checkoverlap(){
    overlap = false;
    let x = random(puffer, width - puffer);
    let y = random(puffer, height - puffer);
    neurons.forEach(element => {
        if (element.x == x || element.y == y) {
            checkoverlap();
        }
    });
    return {x: x, y: y};
}

function deleteNeurons(){
    Array.from(neurons).forEach(element => {
        delete element;
        neurons.pop();
    });
    
    Array.from(document.getElementsByClassName('svg_element')).forEach(element => {
        svg_canvas.removeChild(element);
    });
}


function spike_neuron() {
    neuron_id = this.dataset.id;
    neurons.forEach(element => {
        if (element.id == neuron_id) {
            element.spike();
        }
    });
}


function clearPlot(){
    plot.innerHTML = "";
}


function setPlotActive() {
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
    Array.from(neurons_nodes).forEach(element => {
        if (element.dataset.id == neuron_id) {
            neurons_nodes[neuron_id].classList.add("neuron_active");
        }
        else {
            neurons_nodes[element.dataset.id].classList.remove("neuron_active");
        }
})}

resetNeurons();

Array.from(inputs).forEach(element => {
    element.addEventListener("change", resetNeurons)});

Array.from(helpIcon).forEach(element => {
    if (isTouchDevice()){
        element.addEventListener("click", openHelper)
    }
    else{
        element.addEventListener("mouseover", openHelper),
        element.addEventListener("mouseout", openHelper)
    }
    });

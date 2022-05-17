const svg_canvas = document.getElementById('svg_canvas')
let neurons = [];
let neurons_nodes = [];
const inputs = document.getElementsByTagName('input');
const form = document.getElementById('form');
const helpIcon = document.getElementsByClassName("help-icon");
const width = 150;
const height = 150;
const neuron_sound = new Audio('blop.mp3');
const sound_toggler = document.getElementById("sound_toggler");
soundOn = false;
const ranges = document.getElementsByClassName('range');
puffer = 5;
const chance = (percentage) => Math.random() * 100 < percentage;
const info = document.getElementById('info');
const close_info = document.getElementById('close');

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetNeurons() {
    reset();
    deleteNeurons();
    let number = document.getElementById('neuron_numb').value;
    let leakage = document.getElementById('leakage').value;
    let synaptic_weight =document.getElementById('synaptic_weight').value;
    let spike_threshold = document.getElementById('spike_threshold').value;
    let link_chance = document.getElementById('link_chance').value;
    for (i = 0; i < number; i++) {
        coords = {x: random(puffer, width - puffer), y: random(puffer, width - puffer)};
        neurons.push(
            new Neuron(
                coords.x, 
                coords.y,
                i,
                leakage,
                synaptic_weight,
                spike_threshold,
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

function closeInfo() {
    info.style.display = "none";
}

function setPlotActive() {
    displayElement("none", plot_nonactive);
    displayElement("block", plot_active);
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

sound_toggler.addEventListener("click", toggleSound);

Array.from(inputs).forEach(element => {
    element.addEventListener("change", resetNeurons)});

Array.from(ranges).forEach(element => {
    element.addEventListener("input", setNumber)});

Array.from(helpIcon).forEach(element => {
    if (isTouchDevice()){
        element.addEventListener("click", openHelper)
    }
    else{
        element.addEventListener("mouseover", openHelper),
        element.addEventListener("mouseout", openHelper)
    }
    });

close_info.addEventListener("click", closeInfo);
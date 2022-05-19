const plot = document.getElementById('plot');

rest = 0;
neuron_radius = 3;
const svgns = "http://www.w3.org/2000/svg";
var layout = {
    xaxis: {
        title: {
          text: 'Zeit [s]',
        }
    },
    yaxis: {
        title: {
            text: 'potential [V]',
        }
    }
}



class Neuron {
    constructor(x, y, neuron_id, leakage, synaptic_weight, spike_threshold){
        this.x = x;
        this.y = y;
        this.id = neuron_id;
        this.outgoing_links = [];
        this.rest = rest;
        this.potential = this.rest;
        this.leakage = parseFloat(leakage);
        this.synaptic_weight = parseFloat(synaptic_weight);
        this.spike_threshold = parseFloat(spike_threshold);
        this.timestep = 1;
        this.circle = document.createElementNS(svgns, "circle");
        this.circle.classList.add("neuron");
        this.circle.classList.add("svg_element");
        this.circle.dataset.id = neuron_id;
        this.circle.setAttribute("cx", x);
        this.circle.setAttribute("cy", y);
        this.circle.setAttribute("r", neuron_radius);
        svg_canvas.appendChild(this.circle);
        this.vs = [];
        this.dt = [];
        this.trace = {
            y: this.vs,
            x: this.dt,
            type: 'scatter',
        }
        this.plotActive = false;
        this.alpha = Math.exp(this.timestep*-1/this.leakage);
    }

    spike(){
        this.potential = 4.0;
        neurons_nodes[this.id].classList.add("spiked");
        if (soundOn){
            neuron_sound.play();
        }
        this.outgoing_links.forEach(element => {
            element.potential += this.synaptic_weight;
        });
    }

    displayPlot() {
        let data = [this.trace];
        if (this.plotActive) {
            Plotly.newPlot(plot, data, layout);
        }

    }


    addLink(link) {
        this.outgoing_links.push(link);
        let arrow = document.createElementNS(svgns, "line");
        arrow.setAttribute("x1", this.x-neuron_radius/2);
        arrow.setAttribute("y1", this.y - neuron_radius/2);
        arrow.setAttribute("x2", link.x - neuron_radius/2);
        arrow.setAttribute("y2", link.y - neuron_radius/2);
        arrow.setAttribute("stroke", "#5cceee");
        arrow.setAttribute("stroke-width", "0.5");
        arrow.setAttribute("marker-end", "url(#arrow)");
        arrow.classList.add("svg_element");
        svg_canvas.prepend(arrow);
    }

    update(dt){
        // calculate new potential
        this.dt.push(dt);
        this.potential = this.potential * this.alpha;
        if (this.potential >= this.spike_threshold) {
            this.spike();
            this.vs.push(this.potential);
            this.potential = this.rest;
        }
        else {
            neurons_nodes[this.id].classList.remove("spiked");
            this.vs.push(this.potential);
        }
        this.displayPlot();
    }

    clear() {
        this.potential = this.rest;
        this.vs = [];
        this.dt = [];
        this.trace = {
            y: this.vs,
            x: this.dt,
            type: 'scatter',
        }
        neurons_nodes[this.id].classList.remove("spiked");
        let data = [this.trace];
        this.plotActive = false;
    }
}


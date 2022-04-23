const plot = document.getElementById('plot');


neuron_radius = 3;
// variable for the namespace 
const svgns = "http://www.w3.org/2000/svg";
tau = 1.0
synaptic_weight = 0.2;
spike_threshold = 2.0;
reset = 1.0;
init = 1.0;

class Neuron {
    constructor(x, y, neuron_id){
        this.x = x;
        this.y = y;
        this.id = neuron_id;
        this.outgoing_links = [];
        this.potential = init;
        this.circle = document.createElementNS(svgns, "circle");
        this.circle.classList.add("neuron");
        this.circle.dataset.id = neuron_id;
        this.circle.setAttribute("cx", x);
        this.circle.setAttribute("cy", y);
        this.circle.setAttribute("r", neuron_radius);
        this.circle.setAttribute("fill", "#5cceee");
        svg_canvas.appendChild(this.circle);
        this.vs = [];
        this.dt = [];
        this.trace = {
            y: this.vs,
            x: this.dt,
            type: 'scatter',
        }
        this.plotActive = false;
    }

    spike(){
        this.potential = 4.0;
        this.circle.setAttribute("fill", "#f5015b");
        this.outgoing_links.forEach(element => {
            neurons[element].potential += synaptic_weight;
        });
    }

    displayPlot() {
        let data = [this.trace];
        if (this.plotActive) {
            Plotly.newPlot(plot, data);
        }
    }



    add_link(link) {
        this.outgoing_links.push(link);
        let arrow = document.createElementNS(svgns, "line");
        arrow.setAttribute("x1", this.x);
        arrow.setAttribute("y1", this.y);
        arrow.setAttribute("x2", neurons[link].x);
        arrow.setAttribute("y2", neurons[link].y);
        arrow.setAttribute("stroke", "#5cceee");
        arrow.setAttribute("stroke-width", "1");
        svg_canvas.appendChild(arrow);
    }

    update(dt){
        // calculate new potential
        this.dt.push(dt);
        let alpha = Math.exp(-dt/tau);
        this.potential = this.potential * alpha;
        if (this.potential >= spike_threshold) {
            this.spike();
            this.vs.push(this.potential);
            this.potential = reset;
        }
        else {
            this.circle.setAttribute("fill", "#5cceee");
            this.vs.push(this.potential);
        }
        this.displayPlot();
    }

    clear() {
        this.potential = init;
        this.vs = [];
        this.dt = [];
        this.trace = {
            y: this.vs,
            x: this.dt,
            type: 'scatter',
        }
        let data = [this.trace];
    }
}
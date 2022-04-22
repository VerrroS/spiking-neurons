const plot = document.getElementById('plot');

neuron_radius = 5;
// variable for the namespace 
const svgns = "http://www.w3.org/2000/svg";
tau = 2.0
v0 = -60.0

class Neuron {
    constructor(x, y, neuron_id){
        this.x = x;
        this.y = y;
        this.id = neuron_id;
        this.incoming_links = [];
        this.current = -10.0;
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

    add_link(link) {
        neurons[link].incoming_links.push(this.id);
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
        // get current from incoming links
        this.incoming_links.forEach(element => {
            this.current += neurons[element].current;
        });
        // calculate new current
        this.vs.push(this.current);
        this.dt.push(dt);
        let dv = (this.current - v0) / tau;
        this.current += dv * dt;
        if (this.current >= 10.0) {
            this.current = -10;
            this.circle.setAttribute("fill", "#7cwefe");
        }
        else {
            this.circle.setAttribute("fill", "#5cceee");
        }
        let data = [this.trace];
        if (this.plotActive) {
            Plotly.newPlot(plot, data);
        }
    }

    clear() {
        this.current = -10.0;
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
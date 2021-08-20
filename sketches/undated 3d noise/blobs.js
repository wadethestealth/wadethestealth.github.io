class BlobVertex {
    constructor(vertices, index) {
        this.vertices = vertices;
        this.index = index;
    }

    get x() {
        return this.vertices[this.index];
    }

    get y() {
        return this.vertices[this.index+1];
    }

    get z() {
        return this.vertices[this.index+2];
    }

    set x(x) {
        this.vertices[this.index] = x;
    }

    set y(y) {
        this.vertices[this.index+1] = y;
    }

    set z(z) {
        this.vertices[this.index+2] = z;
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    offset(offset) {
        this.x += offset.x;
        this.y += offset.y;
        this.z += offset.z;
        return this;
    }

    toVertex() {
        return new Vertex(this.x,this.y,this.z);
    }
}

class Vertex {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    offset(offset) {
        this.x += offset.x;
        this.y += offset.y;
        this.z += offset.z;
        return this;
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//Create a PointLight and turn on shadows for the light
let light = new THREE.PointLight( 0xddddff, 1, 0);
light.position.set( 10, 10, 10 );
light.castShadow = true; // default false
scene.add( light );

//Create a PointLight and turn on shadows for the light
light = new THREE.PointLight( 0xffeecc, 1, 0);
light.position.set( -10, 10, 10 );
light.castShadow = true; // default false
scene.add( light );

light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add(light);

//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry( 1, 30, 30 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xaeaeae, roughness: 0 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true;
scene.add( sphere );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const vertices = sphereGeometry.attributes.position.array;

const noise = new Noise();
const noiseSettings = {
    strength: .1,
    baseRoughness: 10,
    roughness: 1,
    persistence: .5,
    center: {x:0, y:0, z:0},
    numLayers: 1,
    minValue: 0
}

const noiseFilter = {
    evaluate: function(point) {
        let noiseValue = 0;
        let frequency = noiseSettings.baseRoughness;
        let amplitude = 1;
        for (let i = 0; i < noiseSettings.numLayers; i++)
        {
            let v = noise.evaluate(point.scale(frequency).offset(noiseSettings.center));
            noiseValue += (v + 1) * .5 * amplitude;
            frequency *= noiseSettings.roughness;
            amplitude *= noiseSettings.persistence;
        }

        noiseValue = Math.max(0, noiseValue - noiseSettings.minValue);
        return noiseValue * noiseSettings.strength;
    }
}

for ( let i = 0; i < vertices.length; i+=3) {
    const point = new BlobVertex(vertices, i);

    const elev = (noiseFilter.evaluate(point.toVertex()));
    point.scale(1+elev).scale(1);
}

sphereGeometry.computeFaceNormals();

const animate = function () {
	requestAnimationFrame( animate );
    sphere.rotateX(-0.005);
	renderer.render( scene, camera );
};

animate();
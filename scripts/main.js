import * as THREE from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';

import {vertexShader} from './shaders/vertex.glsl.js';
import {fragmentShader} from './shaders/fragment.glsl.js';

const desktop = document.getElementById("desktop");

let cameraX = -1;
let cameraY = -1;

function initializeDocumentListeners() {
	document.addEventListener('mousemove', function(event) {
		cameraX = event.clientX;
		cameraY = event.clientY;
	});
	document.addEventListener('touchmove', function(event) {
		if (event.touches.length < 1) {
			return;
		}
		cameraX = event.touches.item(0).clientX;
		cameraY = event.touches.item(0).clientY;
	});
}
initializeDocumentListeners();

const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, desktop.clientWidth / desktop.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
const composer = new EffectComposer(renderer);

renderer.setSize(desktop.clientWidth, desktop.clientHeight);
renderer.setClearColor('#000000', 0);
desktop.appendChild(renderer.domElement);

const dirLight = new THREE.DirectionalLight('#efefef', 1.0);
dirLight.position.set(2, 2, 2);
const ambLight = new THREE.AmbientLight('#efefef', 0.1);

const uniforms = {
	uTime: { type: "f", value: 1.0 },
}

const geometry = new THREE.IcosahedronGeometry(2.5, 50);
const material = new THREE.ShaderMaterial({
	uniforms,
    vertexShader,
    fragmentShader,
    // wireframe: true,
});
const blob = new THREE.Mesh(geometry, material);

dirLight.lookAt(blob.position);

scene.add(blob);
scene.add(dirLight);
scene.add(ambLight);

camera.position.z = 5;

composer.addPass(new RenderPass(scene, camera));

function animate() {
	requestAnimationFrame(animate);
	uniforms.uTime.value = clock.getElapsedTime() / 10;

	blob.rotation.x += 0.002;
	blob.rotation.y += 0.002;
	camera.position.x = (cameraX/window.innerWidth - 0.5) * -10;
	camera.position.y = (cameraY/window.innerHeight - 0.5) * 10;
	camera.lookAt(blob.position);

	composer.render();
}

animate();
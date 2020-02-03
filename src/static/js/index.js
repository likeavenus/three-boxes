import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

(()=> {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    const pageWrapper = document.querySelector('.page__wrapper');
    renderer.setSize( window.innerWidth, window.innerHeight );
    pageWrapper.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(geometry);

    for (let i = 0; i < geometry.faces.length; i++) {
        geometry.faces[i].color.setHex(0xff0000 )
    }
    console.log(geometry);
    console.log(cube);
    scene.add(cube);

    camera.position.z = 10;

    const controls = new OrbitControls(camera, renderer.domElement);
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
})();

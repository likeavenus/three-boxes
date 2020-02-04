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
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00, vertexColors: THREE.FaceColors});
    const colorHSL = {};

    const cubesArr = [
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
        new THREE.Mesh(geometry, material),
    ];

    let marginX = 0;
    let marginY = 0;
    for (let i = 0; i < cubesArr.length; i++) {
        if (i !== 0 && i % 5 === 0) {
            marginX = 0;
            marginY += 1;
        }
        cubesArr[i].position.x += marginX * 2;
        cubesArr[i].position.y = marginY * 2;

        scene.add(cubesArr[i]);
        marginX += 1;
    }

    console.log(cubesArr);

    material.color.getHSL( colorHSL );
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = -10;


    camera.position.z = 21;
    scene.children[0].geometry.faces[0].color.setHSL(1, colorHSL.s, colorHSL.l);
    scene.children[0].geometry.faces[1].color.setHSL(colorHSL.h, colorHSL.s, colorHSL.l);

    const controls = new OrbitControls(camera, renderer.domElement);
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // geometry.elementsNeedUpdate = true;
    }
    animate();
})();

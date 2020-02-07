import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default function three() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const numElem = document.querySelector('#num');
    const colorElem = document.querySelector('#color');

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let INTERSECTED;

    const renderer = new THREE.WebGLRenderer();
    const pageWrapper = document.querySelector('.page__wrapper');
    renderer.setSize( window.innerWidth, window.innerHeight );
    pageWrapper.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({color: 0x00ff00, vertexColors: THREE.FaceColors});
    const colorHSL = {};

    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 ).normalize();


    const cubesArr = [];
    function createBoxes() {
        const limit = 25;
        for (let i = 0; i < limit; i++) {
            cubesArr.push(new THREE.Mesh(geometry, material))
        }
        return cubesArr;
    }

    createBoxes();


    let marginX = 0;
    let marginY = 0;
    for (let i = 0; i < cubesArr.length; i++) {
        if (i !== 0 && i % 5 === 0) {
            marginX = 0;
            marginY += 1;
        }
        cubesArr[i].position.x += marginX * 2;
        cubesArr[i].position.y = marginY * 2;
        cubesArr[i].name = i + 1;
        scene.add(cubesArr[i]);
        marginX += 1;
    }


    material.color.getHSL( colorHSL );
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = -10;
    scene.add(light);


    camera.position.z = 21;


    function onClick(event) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }


    const controls = new OrbitControls(camera, renderer.domElement);
    function animate() {
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects( scene.children );

        if (intersects.length) {

            if (INTERSECTED !== intersects[0].object) {
                if (INTERSECTED) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

                INTERSECTED = intersects[0].object;

                numElem.innerHTML = intersects[0].object.name;
            }

        } else {
            numElem.innerHTML = '';
            INTERSECTED = null;
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        geometry.elementsNeedUpdate = true;
    }
    window.addEventListener( 'click', onClick, false );
    animate();

}

import React, {useEffect , useRef} from 'react'
import './Agatsya.css'
import agatsya_pic2 from '../../assets/SAC2021/Agatsya_pic2.png'
import subs1 from '../../assets/SAC2021/subs1.png'
import subs2 from '../../assets/SAC2021/subs2.png'
import subs3 from '../../assets/SAC2021/subs3.png'
import subs4 from '../../assets/SAC2021/subs4.png'
import pimac from '../../assets/SAC2021/pimac.png'
import Zoom from "react-reveal/Zoom"
import Fade from "react-reveal/Fade"
import SAC21small from '../../sections/Slideshows/sac21small/SAC21small.js'
import SAC21SlideBig from '../../sections/Slideshows/SAC21SlideBig.js'
import AOS from "aos";
import "aos//dist/aos.css"
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import glbPath from "./Rocket.glb";
import { useMediaQuery } from 'react-responsive';

const subArray = [
    {
        id : 1,
        title : "Aerostructures",
        image : subs1,
        desc1 : "Aerostructures comprise the designing and manufacturing of the main rocket body. It is an essential aspect of rocketry since it determines the structural integrity and topology of the various subsystems.",
        desc2 : "The workflow of this department consists of CAD modelling, extensive structural dynamic and static analyses, design optimization, composite manufacturing, CNC machining and assembly of the airframe.",
        desc3 : ""
    },

    {
        id : 2,
        title : "Aerodynamics",
        image : subs2,
        desc1 : "An aerodynamics engineer optimizes the rocket's profile to ensure better flight performance by analyzing the flow of air around the rocket. The department tries to ensure that the rocket endures maximum aerodynamic loads aiding to a flawless flight profile.",
        desc2 : "They predict the rocket's flight path and design the efficient subsystems required to help it to reach the desired apogee and allow us to recover the rocket successfully.",
        desc3 : ""
    },

    {
        id : 3,
        title : "Avionics",
        image : subs3,
        desc1 : "The avionics system includes the electronics and communication systems associated with the rocket. It acts as the functional brain of the rocket that gathers atmospheric data and measures rocket parameters using sensors, uses them to calculate altitude and orientation, and relay the data to the ground station.",
        desc2 : "Sensor fusion techniques and control algorithms are implemented using microcontrollers to facilitate in-flight stability of the rocket.",
        desc3 : "",
    },

    {
        id : 4,
        title : "Payload",
        image : subs4,
        desc1 : "The payload is the carrying capacity of a rocket. It can be either functional or non functional. Functional payloads generally include satellites and space probes that are carried to certain altitudes by the rocket. They are intended to perform scientific experimentation or technical demonstration. ",
        desc2 : "Our rocket Agatsya carries a functional payload that we named PiMAC which demonstrates a pitch correction technology developed by the team."
    }
]


const renderSubs = (subsystem) => {
    return(
        <div key = {subsystem.id}>
            <SubsCard
                title = {subsystem.title}
                image = {subsystem.image}
                desc1 = {subsystem.desc1}
                desc2 = {subsystem.desc2}
                desc3 = {subsystem.desc3}
            />
        </div>
    )
}

const SubsCard = (props) => {
    
    return(

        <div className = 'subs-card' data-aos="fade-up">
            <div className = 'subs-head'>{props.title}</div>
            <Fade><div className = 'subs-img'><img src = {props.image}></img></div></Fade>
            <div className = 'subs-content'>
                <div className = 'subs-desc'>{props.desc1}</div><br/>
                <div className = 'subs-desc'>{props.desc2}</div><br/>
                <div className = 'subs-desc'>{props.desc3}</div><br/>
            </div>
            
        </div>
    )
}

const Agatsya = () => {

    const mountRef = useRef(null);
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 1199 })
        return isMobile ? children : null
      }
      const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 1200 })
        return isDesktop ? children : null
      }

    useEffect(() => {
        
        const { current } = mountRef;
        console.log("current", current);
        // If we don't have the DOM element yet, wait for it
        if (!current) {
            return;
        }

    var scene, camera, renderer, hemiLight, box, composer, sphereCamera;
    
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
           
    var pivot = new THREE.Group();
    var shadow = new THREE.Object3D();

    var init = function () {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x353535);
        camera = new THREE.PerspectiveCamera(0.5 ,window.innerWidth/window.innerHeight,1,60000);
        camera.rotation.y = 45/180*Math.PI;
        camera.position.x = 2500;
        camera.position.y = 5500;
        camera.position.z = 10000;

        renderer = new THREE.WebGLRenderer({antialias:true});
        
        renderer.toneMapping = THREE.ReinhardToneMapping;
        shadow.castShadow = true;

        renderer.setSize(window.innerWidth*0.66,window.innerHeight*0.8);
        current.appendChild(renderer.domElement);

        var controls = new OrbitControls(camera,renderer.domElement);
        controls.maxDistance = 100;
        
        var pointlight1 = new THREE.PointLight(0x062d89,30,350,1000);
        pointlight1.position.set(0,0,5.5);
       // scene.add(pointlight1);

        controls.target.set(0,0,0);
        controls.update();

        controls.addEventListener('change', renderer);
        
        var directionalLight = new THREE.DirectionalLight(0xffffff,5);
        directionalLight.position.set(2,1,1);
        var helper = new THREE.DirectionalLightHelper(directionalLight, 0.1);
       // directionalLight.add(helper);

        var directionalLight2 = new THREE.DirectionalLight(0xffffff,5);
        directionalLight2.position.set(2,1,-1);
        var helper2 = new THREE.DirectionalLightHelper(directionalLight2, 0.1);
       // directionalLight2.add(helper2);

        scene.add(directionalLight);
        scene.add(directionalLight2);
        var light = new THREE.PointLight(0xc4c4c4,10);
        light.position.set(0,300,500);
        scene.add(light);
        var light2 = new THREE.PointLight(0xc4c4c4,10);
        light2.position.set(500,100,0);
        scene.add(light2);
        var light3 = new THREE.PointLight(0xc4c4c4,10);
        light3.position.set(0,0,10);
        scene.add(light3);
        var light4 = new THREE.PointLight(0xc4c4c4,10);
        light4.position.set(-500,300,500);
        scene.add(light4);

        var loader = new GLTFLoader();
        loader.load(glbPath, (glb) => {
            var model = glb.scene;
            for(let i=0; i<50;i++){
           THREE.SceneUtils.attach(glb.scene.children[i], scene, model);}
            model.scale.set(0.65,0.65,0.65);

            box = new THREE.Box3().setFromObject(model);
            var vector = new THREE.Vector3();
            box.getCenter(vector);
            model.position.set(-vector.x, -vector.y, -vector.z);
       
            scene.add( pivot );
            pivot.add( model );
            animate();
        });

        window.addEventListener( 'resize', onWindowResize , false);

    }

    var onWindowResize = function () {

         camera.aspect = window.innerWidth/window.innerHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(window.innerWidth*0.66,window.innerHeight*0.8);

 }


    var animate = function () {

        pivot.rotation.y += 0.01;
        renderer.render(scene,camera);
        requestAnimationFrame(animate);

    }
    init();

       return () => current.removeChild( renderer.domElement);
      }, []);

    return(
        <div className = 'Agatsya'>
            {/* AGASYTA MODEL_--------------------- */}
            <div className = 'agat-head'>agatsya</div>
            <div className = 'agat-grid'>
                <div className = 'agat-detail-card'>
                <div className = 'agat-details'>
                    <div className = 'agat-params'>
                        <div className = 'myParam'>Height</div>
                        <div className = 'myParam-value'> 9.7ft</div>
                    </div>

                    <div className = 'agat-params'>
                        <div className = 'myParam'>Diameter</div>
                        <div className = 'myParam-value'> 6 in</div>
                    </div>

                    <div className = 'agat-params'>
                        <div className = 'myParam'>Mass</div>
                        <div className = 'myParam-value'>24.69 kg</div>
                    </div>

                    <div className = 'agat-params'>
                        <div className = 'myParam'>Max Thrust</div>
                        <div className = 'myParam-value'>6805.2 N</div>
                    </div>

                    <div className = 'agat-params'>
                        <div className = 'myParam'>Max Velocity</div>
                        <div className = 'myParam-value'>988 km/h</div>
                    </div>

                    <div className = 'agat-params'>
                        <div className = 'myParam'>Target Apogee</div>
                        <div className = 'myParam-value'>10,000 ft</div>
                    </div>

                    <div className = 'agat-params'>
                        <div className = 'myParam'>Payload Mass</div>
                        <div className = 'myParam-value'>4.08 kg</div>
                    </div>
                </div>
                </div>

                <Mobile>
                <div className = 'agat-model'>
                    <Fade><img src = {agatsya_pic2}></img></Fade>
                </div>
                </Mobile>
                
                <Desktop>
                   <div  ref = {mountRef} className = 'agat-model'></div> 
                </Desktop>

            </div>


            {/* AGATSYA SUBSYTEMS */}
            <div className = 'agat-head'>subsytems</div>
            
            
            <div className = 'agat-subs-grid'>
                {subArray.map(renderSubs)}    
            </div>


            {/* PIMAC------------------------ */}
            <div className = 'pimac-head'>pimac</div>

            <div className = 'pimac'>
                <div className = 'pimac-desc'>
                The payload carried by Agatsya is named PiMAC which stands for Pitch Measurement And Control. PiMAC comprises an Inertial Measurement Unit (IMU), a microcontroller and a gimbal. The purpose of PiMAC is to measure the rocket’s pitch angle using the IMU as it ascends and make corrections to it based on a predefined trajectory. The corrections are made on a custom gimbal that is set up inside the payload structure which doesn’t affect the actual rocket’s flight. The working of PiMAC can be extended to landing of the rocket contributing to the Thrust Vector Control (TVC) technology implemented in landing rockets. PiMAC weighs 4.08 kg (9 lbs). 
                </div>
                <div className = 'pimac-pic'>
                    <Zoom><img src = {pimac}></img></Zoom>
                </div>

            </div>
            
            <SAC21small/>
            <SAC21SlideBig/>
            <br/><br/><br/><br/><br/>

        </div>
    )
}

export default Agatsya
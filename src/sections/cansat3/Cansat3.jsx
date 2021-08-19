import './Cansat3.css'
import React,{ useState , useEffect , useRef} from 'react';
import { Container, Row, Col, Carousel, CarouselItem } from 'react-bootstrap';
import { data3 } from '../../constants/cansat_constants';
import conops from "../../assets/projects/conops_2021.jpg"
import pic1 from '../../assets/projects/7.jpg'
import pic2 from '../../assets/projects/Image3.jpg'
import pic3 from '../../assets/projects/IMG_20191005_094851.jpg'
import logo from "../../assets/projects/cansatlogo.png"
import Modal_show from "../../components/Modal/modal_show"
import Fade from 'react-reveal/Fade'
import CSat21Slide from '../Slideshows/csat21small/CSat21Slide.js'
import CSat21SlideBig from '../Slideshows/CSat21SlideBig';
import csatImg from '../../assets/projects/image_2021-07-05_234100 1.png'
import payloadImg from '../../assets/projects/CanSat_Payload 1.png'
import AOS from "aos";
import "aos//dist/aos.css"
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gltfPath from "./scene.gltf";
import { useMediaQuery } from 'react-responsive';

const Cansat3 = () => {
    const mountRef = useRef(null);
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 1199 })
        return isMobile ? children : null
      }
      const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth:  1200 })
        return isDesktop ? children : null
      }

    useEffect(()=>{
        AOS.init({duration:2000});

        const { current } = mountRef;
        console.log("current", current);
        // If we don't have the DOM element yet, wait for it
        if (!current) {
            return;
        }
        var scene, camera, renderer, rotation = [], hemiLight, box, composer;
               
        var pivot = new THREE.Group();
                
        var init = function () {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xC6C6C6);
            camera = new THREE.PerspectiveCamera(0.5 ,window.innerWidth/window.innerHeight,1,60000);
            camera.rotation.y = 45/180*Math.PI;
            camera.position.x = 2000;
            camera.position.y = 5000;
            camera.position.z = 10000;

    
            renderer = new THREE.WebGLRenderer({antialias:true});
            
            renderer.toneMapping = THREE.ReinhardToneMapping;
    
            renderer.setSize(window.innerWidth*0.62,window.innerHeight*0.8);
            current.appendChild(renderer.domElement);
    
            var controls = new OrbitControls(camera,renderer.domElement);
            controls.maxDistance = 100;
            
            var pointlight1 = new THREE.PointLight(0x062d89,30,350,1000);
            pointlight1.position.set(0,0,5.5);
           // scene.add(pointlight1);
    
            controls.target.set(0,0,0);
            controls.update();
    
            controls.addEventListener('change', renderer);
            var hlight = new THREE.AmbientLight (0x404040,1000);
            scene.add(hlight);
            var directionalLight = new THREE.DirectionalLight(0xffffff,100);
            directionalLight.position.set(0,1,0);
            directionalLight.castShadow = true;
           // scene.add(directionalLight);
            var light = new THREE.PointLight(0xc4c4c4,10);
            light.position.set(0,300,500);
            scene.add(light);
            var light2 = new THREE.PointLight(0xc4c4c4,10);
            light2.position.set(500,100,0);
            scene.add(light2);
            var light3 = new THREE.PointLight(0xc4c4c4,10);
            light3.position.set(0,100,-500);
            scene.add(light3);
            var light4 = new THREE.PointLight(0xc4c4c4,10);
            light4.position.set(-500,300,500);
            scene.add(light4);
    
            var loader = new GLTFLoader();
            loader.load(gltfPath, (gltf) => {
                var model = gltf.scene;
                for(let i=0; i<35;i++){
               // scene.add(gltf.scene.children[i]);}
               THREE.SceneUtils.attach(gltf.scene.children[i], scene, model);}
                model.scale.set(1.85,1.85,1.85);
            
               // model.position.set(0,0,0);
    
                box = new THREE.Box3().setFromObject(model);
                var vector = new THREE.Vector3();
                box.getCenter(vector);
                model.position.set(-vector.x, -vector.y, -vector.z);
    
                scene.add( pivot );
                pivot.add( model );
    
                rotation.push(model);
                //scene.add(gltf.scene);
                animate();
            });
    
            window.addEventListener( 'resize', onWindowResize , false);
    
        }
    
        var onWindowResize = function () {
    
             camera.aspect = window.innerWidth / window.innerHeight;
             camera.updateProjectionMatrix();
             renderer.setSize(window.innerWidth*0.62,window.innerHeight*0.8);;
    
     }
    
        var animate = function () {
    
             rotation.forEach(p => {
             pivot.rotation.y += 0.01;
             });
    
            renderer.render(scene,camera);
            requestAnimationFrame(animate);
    
        }
        init();
    
       return () => current.removeChild( renderer.domElement);
    },[]);

    return(
        <div className = 'our-cansat1'>
            <div className = 'cansat1-heading'>Cansat 2021</div>
            {/* <br/> */}
            
            {/* <Modal_show /> */}
            <div className = "abt-csat">
                <div className="abt-csat-head">WHAT IS THE CANSAT COMPETITION</div>
                <div className="abt-csat-text">The CanSat competition is organized by American Astronautical Society (AAS) and recognized by NASA Goddard. A CanSat is the simulation of a satellite prototype in the shape of a canister, used as a means to impart relevant space technology knowledge and skills to students. The CanSat competition is held in Texas where a unique mission statement is designed every year for the students. Top 40 university teams across the globe compete, design and launch their CanSat prototypes after getting shortlisted through the rigorous preliminary rounds. For more details: <a href="http://www.cansatcompetition.com/index.html">http://www.cansatcompetition.com/index.html</a>
                </div>
            </div>
            <Container>
                    <Row>
                    <Mobile>
                    <div className="data_back2">
                        {
                            data3.map((link) =>
                                <Col xs={12} >
                                <h4 className="text-heading offset-md-2 col-xs-12 col-md-8 ">{link.title}</h4>
                                        <div ><p className=" cansat1p justify-content">{link.info1}</p></div>
                                            <ul className="cansat1ul">
                                                <li className=" cansat1li ">{link.info2}</li>
                                                <li className=" cansat1li justify-content">{link.info3}</li>
                                                <li className="cansat1li justify-content">{link.info4}</li>
                                                <li className="cansat1li justify-content">{link.info5}</li>
                                                <li className="cansat1li justify-content">{link.info6}</li>
                                                <li className="cansat1li justify-content">{link.info7}</li>

                                            </ul>
                                       
                                       

                                </Col>
                            )
                        }
                        </div>
                        </Mobile>
                        <Desktop>
                        <div className="data_back1">
                        {
                            data3.map((link) =>
                                <Col xs={12} >
                                <h4 className="text-heading offset-md-2 col-xs-12 col-md-8">{link.title}</h4>
                                        <div ><p className=" cansat1p justify-content">{link.info1}</p></div>
                                            <ul className="cansat1ul">
                                                <li className=" cansat1li ">{link.info2}</li>
                                                <li className=" cansat1li justify-content">{link.info3}</li>
                                                <li className="cansat1li justify-content">{link.info4}</li>
                                                <li className="cansat1li justify-content">{link.info5}</li>
                                                <li className="cansat1li justify-content">{link.info6}</li>
                                                <li className="cansat1li justify-content">{link.info7}</li>

                                            </ul>
                                       
                                       

                                </Col>
                            )
                        }
                        </div>

                        </Desktop>
                        </Row>
                        <Row>
                        <Col xs={12}>
                        <Fade><img className="cansat1img" src={conops}/></Fade>
                        </Col>

                        </Row>
                        
                    </Container>
                    <Fade>
                    <Row>
                    {/* <div className = 'present-cansat'> */}
                    
                        <Mobile>
                        <Col  md={12} sm={12}xs={12} className=" mh-100">
                        <div  data-aos="fade-right"><img className = "ploadImg" src={payloadImg}></img></div>
                    </Col>    
                    <Col md={12} sm={12} xs={12} className=" mh-100" >
                        <div data-aos="fade-left">
                        <img className = "csatImg " src={csatImg}></img>
                        </div>
                        </Col>
                        </Mobile>

                        <Desktop>
                        <Col lg={4} md={12} sm={12}xs={12}>
                        <div  data-aos="fade-right"><img className = "ploadImg" src={payloadImg}></img></div>
                    </Col>    
                    <Col lg={8}  md={12} sm={12} xs={12} class=" ml-xs-5 " >
                        <div ref={mountRef} data-aos="fade-left" >
                        </div>
                        </Col>
                        </Desktop>
                    {/* </div> */}
                    </Row>
                    </Fade>
                    <br/><br/><br/><br/><br/>
                    
                    <CSat21Slide/>
                    
                    <CSat21SlideBig/>
                    <br/><br/><br/><br/><br/>

    </div>
        

    )
}

export default Cansat3
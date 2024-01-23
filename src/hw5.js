import {OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 'ForestGreen' );




function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


/**
 * 	******************************************    Goal CREATION PART   ****************************
 */



// Add here the rendering of your goal
const goal = new THREE.Group();
const skeleton = new THREE.Group();

//create Skeleton
let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
let height = 9;
let radialSegments = 32;


//Crossbar
const crossbarGeometry = new THREE.CylinderGeometry(1, 1, 21, radialSegments);
const crossbar = new THREE.Mesh(crossbarGeometry, material);
const crossbarMatrix = new THREE.Matrix4()
crossbarMatrix.set( 0, -1, 0, 0,
					0, 0, -1, 9, 
					1, 0, 0, 0,
					0,0,0,1 );
crossbar.applyMatrix4(crossbarMatrix)
skeleton.add(crossbar)

//post Right
const posts1Geometry = new THREE.CylinderGeometry(1, 1, height, radialSegments);
const posts1 = new THREE.Mesh(posts1Geometry, material);
const translationMatrix1 = new THREE.Matrix4().makeTranslation(10,4.5, 0);
posts1.applyMatrix4(translationMatrix1);
skeleton.add(posts1);

//Rings To posts Right
const ringPostGeometryRight = new THREE.TorusGeometry(1, 1, 16, 50)
const ringPostRight = new THREE.Mesh(ringPostGeometryRight,material);
const ringPostRightMatrix = new THREE.Matrix4()
ringPostRightMatrix.set( 1, 0, 0, 10,
						0, Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 
						0, Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0,
						0,0,0,1 );
ringPostRight.applyMatrix4(ringPostRightMatrix)
skeleton.add(ringPostRight)


//post Left
const posts2Geometry = new THREE.CylinderGeometry(1, 1, height, radialSegments);
const posts2 = new THREE.Mesh(posts2Geometry, material);
const translationMatrix2 = new THREE.Matrix4().makeTranslation(-10, 4.5, 0);
posts2.applyMatrix4(translationMatrix2);
skeleton.add(posts2);

//Rings To posts Left
const ringPostGeometryLeft = new THREE.TorusGeometry(1, 1, 16, 50)
const ringPostLeft = new THREE.Mesh(ringPostGeometryLeft,material);
const ringPostLeftMatrix = new THREE.Matrix4()
ringPostLeftMatrix.set( 1, 0, 0, -10,
						0, Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 
						0, Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0,
						0,0,0,1 );
ringPostLeft.applyMatrix4(ringPostLeftMatrix)
skeleton.add(ringPostLeft)


//Back supports Right
const backSupportsGeometryR = new THREE.CylinderGeometry(1, 1, 14, radialSegments);
const backSupportsR = new THREE.Mesh(backSupportsGeometryR, material);
const backSupportsMatrixR = new THREE.Matrix4()
backSupportsMatrixR.set( 1, 0, 0, 10,
						0, Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 4.5, 
						0, Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4)*9,
						0,0,0,1 );
backSupportsR.applyMatrix4(backSupportsMatrixR);
skeleton.add(backSupportsR);

//Rings To Back supports Right
const ringbackSupportsGeometryR = new THREE.TorusGeometry(1, 1, 16, 50)
const ringbackSupportsR = new THREE.Mesh(ringbackSupportsGeometryR, material);
const ringbackSupportsMatrixR = new THREE.Matrix4()
ringbackSupportsMatrixR.set( 1, 0, 0, 10,
							0, Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 
							0, Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), -11,
							0,0,0,1 );
ringbackSupportsR.applyMatrix4(ringbackSupportsMatrixR);
skeleton.add(ringbackSupportsR);


//Back supports Left
const backSupportsGeometryL = new THREE.CylinderGeometry(1, 1, 14, radialSegments);
const backSupportsL = new THREE.Mesh(backSupportsGeometryL, material);
const backSupportsMatrixL = new THREE.Matrix4()
backSupportsMatrixL.set( 1, 0, 0, -10,
						0, Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 4.5, 
						0, Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4)*9,
						0,0,0,1 );
backSupportsL.applyMatrix4(backSupportsMatrixL);
skeleton.add(backSupportsL);

//Rings To Back supports Left
const ringbackSupportsGeometryL = new THREE.TorusGeometry(1, 1, 16, 50)
const ringbackSupportsL = new THREE.Mesh(ringbackSupportsGeometryL, material);
const ringbackSupportsMatrixL = new THREE.Matrix4()
ringbackSupportsMatrixL.set( 1, 0, 0, -10,
						0, Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 
						0, Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), -11,
						0,0,0,1 );
ringbackSupportsL.applyMatrix4(ringbackSupportsMatrixL);
skeleton.add(ringbackSupportsL);


//Nets Goal Right
// Define the vertices of the triangle
const verticesR = [
	new THREE.Vector3(10, 0, 0),  // Vertex 1 
	new THREE.Vector3(10, 0, -11),  // Vertex 2 
	new THREE.Vector3(10, 9, 0)   // Vertex 3
  ];
  
  // Create a new BufferGeometry
  const geometry1 = new THREE.BufferGeometry();
  
  // Set the vertices of the triangle
  const positions = [];
  verticesR.forEach(vertex => {
	positions.push(vertex.x, vertex.y, vertex.z);
  });
  geometry1.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
  // Create a material for the triangle
  const material1 = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide });

  
  // Create a mesh using the geometry and material
  const netRight = new THREE.Mesh(geometry1, material1);
  
  // Add the triangle to the scene
  scene.add(netRight);
  


//Nets Goal Right
// Define the vertices of the triangle
const verticesL = [
	new THREE.Vector3(-10, 0, 0),  // Vertex 1 
	new THREE.Vector3(-10, 0, -11),  // Vertex 2 
	new THREE.Vector3(-10, 9, 0)   // Vertex 3
  ];
  
  // Create a new BufferGeometry
  const geometry2 = new THREE.BufferGeometry();
  
  // Set the vertices of the triangle
  const positions2 = [];
  verticesL.forEach(vertex => {
	positions2.push(vertex.x, vertex.y, vertex.z);
  });
  geometry2.setAttribute('position', new THREE.Float32BufferAttribute(positions2, 3));
  
  // Create a material for the triangle
  const material2 = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide });

  
  // Create a mesh using the geometry and material
  const netLeft = new THREE.Mesh(geometry2, material2);
  
  // Add the triangle to the scene
  scene.add(netLeft);
  

//Nets Goal Back
const geometryBack = new THREE.PlaneGeometry( 10, 10 );
const materialBack = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide });
const netBack = new THREE.Mesh( geometryBack, materialBack );
const netBackMatrix = new THREE.Matrix4() 
netBackMatrix.set(1, 0, 0, 10,
					0, 1, 0, 
					0,1, 1,
					0,0,0,1 );
netBack.applyMatrix4(netBackMatrix);
scene.add(netBack);






/**
 * ******************************     Goal IS DONE!!!!! ***********************************
 */
goal.add(skeleton)
scene.add(goal)
/**
 * ******************************    Ball CREATION PART!!!!! ***********************************
 */
const geometry = new THREE.SphereGeometry( 1, 32, 16 );
const ballMaterial = new THREE.MeshBasicMaterial({color:'black'})  
const ball = new THREE.Mesh( geometry, ballMaterial ); 
const ballMatrix = new THREE.Matrix4().makeTranslation(0,0,5)
ball.applyMatrix4(ballMatrix)
scene.add( ball );

/**
 * ******************************    Ball CREATION DONE!!!!! ***********************************
 */

// This defines the initial distance of the camera
const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0,0,5);
camera.applyMatrix4(cameraTranslate)

renderer.render( scene, camera );

const controls = new OrbitControls( camera, renderer.domElement );

/** 
*/

let isOrbitEnabled = true;
///
let zControl = false;
///
let yControl = false;
let scalegoal = false;




const toggleOrbit = (e) => {
	switch(e.key){
		case "o":
			isOrbitEnabled = !isOrbitEnabled;
			break;
		case "w":
			scene.traverse(function (node) {
				if (node.isMesh) {
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
		case "1":
			yControl = !yControl;
			
			break;
		case "2":
			zControl = !zControl;
			break;
		case "3":
			scalegoal = !scalegoal;

			// Shrink the goal object by 5% in each axis when '3' key is pressed
			if (scalegoal) {
				const shrinkFactor = 0.95; // 5% shrinkage
				goal.scale.multiplyScalar(shrinkFactor);
			}
			break;
		case "ArrowDown": // increase speed
			
			break;
		case "ArrowUp": // decrease speed
			
			break;

	}
}





const makeRotationMats = (yOrZ) =>{
	const goalPosition = goal.getWorldPosition()
	let ballVector = ball.getWorldPosition().sub(goalPosition)

	let goalToOriginTranslation = new THREE.Matrix4().makeTranslation(-goalPosition.x,-goalPosition.y,-goalPosition.z)
	let goalToOriginTranslation_Inverse = new THREE.Matrix4().getInverse(goalToOriginTranslation)

	let thetaX =  ballVector.angleTo(new THREE.Vector3(ballVector.x,ballVector.y,0))
	const alignXRotationMat = new THREE.Matrix4().makeRotationX(thetaX)
	let thetaY =  ballVector.angleTo(new THREE.Vector3(ballVector.x,0,ballVector.z))
	const alignYRotationMat = new THREE.Matrix4().makeRotationY(thetaY)
	let thetaZ =  ballVector.angleTo(new THREE.Vector3(0,ballVector.y,ballVector.z))
	const alignZRotationMat = new THREE.Matrix4().makeRotationY(thetaZ)
	let ans;
	if(yOrZ){
		let rotate = new THREE.Matrix4().makeRotationZ(-0.01)
		let yInv = new THREE.Matrix4().getInverse(alignYRotationMat)
		let xInv = new THREE.Matrix4().getInverse(alignXRotationMat)	
		ans = goalToOriginTranslation_Inverse .multiply(xInv.multiply(yInv.multiply(rotate.multiply(alignYRotationMat.multiply(alignXRotationMat.multiply(goalToOriginTranslation))))))
	} else {
		let rotate = new THREE.Matrix4().makeRotationY(-0.01)
		let zInv = new THREE.Matrix4().getInverse(alignZRotationMat)
		let xInv = new THREE.Matrix4().getInverse(alignXRotationMat)
		ans = goalToOriginTranslation_Inverse.multiply(xInv.multiply(zInv.multiply(rotate.multiply(alignZRotationMat.multiply(alignXRotationMat.multiply(goalToOriginTranslation))))))

	}
	return ans
}

let yRotation = makeRotationMats(true)

let zRotation = makeRotationMats(false)

/////



document.addEventListener('keydown',toggleOrbit)

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function animate() {

	requestAnimationFrame( animate );
	if (yControl){ //press 1 to active y-aix
		ball.applyMatrix4(yRotation)
	} 
	if (zControl){ //press 2 to active z-aix
		ball.applyMatrix4(zRotation)		
	}
	

	
	
	controls.enabled = isOrbitEnabled;
	controls.update();
	renderer.render( scene, camera );
  

}
animate()
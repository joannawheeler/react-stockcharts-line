var renderer, scene, camera, dots;
var ww = 600,
    wh = 600;

var width = document.body.offsetWidth;

if(width < 321) {
    ww = 300,
        wh = 300;
} else if(width < 416) {
    ww = 340,
        wh = 340;
} else  if(width < 1025) {
    ww = 540,
        wh = 540;
} else if(width < 1281) {
    ww = 640,
    wh = 640;
}

var density = 500;
var mouse = {x:1,y:1};

function init(){

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("canvas"),
        antialias: true,
        alpha: true
    });
    renderer.setClearColor(0xffc40c,0);
    renderer.setSize(ww, wh);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
    camera.position.z = 500;
    scene.add(camera);

    var geometry = new THREE.Geometry();
    for(var i=0;i<density;i++){
        geometry.vertices.push(new THREE.Vector3(0,0,0));
    }
    var material = new THREE.PointsMaterial({color: 0x46B048, size:5, transparent:true, opacity:1});
    star = new THREE.Points(geometry, material);
    scene.add(star);

    var geometry = new THREE.SphereGeometry( 200, 20, 20 );
    var material = new THREE.MeshBasicMaterial( {color: 0x46B048, transparent:true, opacity:0.25, wireframe:true} );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    /*if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.addEventListener("mousemove", onMousemove);
    }*/

    //window.addEventListener("resize", onResize);

    requestAnimationFrame(render);
}


function onResize(){
    ww = window.innerWidth;
    wh = window.innerHeight;
    camera.aspect = ww / wh;
    camera.updateProjectionMatrix();
    renderer.setSize( ww, wh );
}


function onMousemove(e){
    mouse.x = e.clientX/ww;
    mouse.y = e.clientY/wh;
}

function createStar(a){

    for(var i=0;i<density;i++){
        var theta = (i/density) * (mouse.x*100);
        var delta = (i / density - 0.5) * Math.PI * (mouse.y);
        var x = 200 * Math.cos(delta) * Math.cos(theta);
        var y = 200 * Math.cos(delta) * Math.sin(theta);
        var z = 200 * Math.sin(delta);

        star.geometry.vertices[i].x = x;
        star.geometry.vertices[i].y = y;
        star.geometry.vertices[i].z = z;
    }
    star.geometry.verticesNeedUpdate = true;

}


function render(a){
    requestAnimationFrame(render);

    star.rotation.x += 0.004;
    star.rotation.y += 0.004;
    star.rotation.z -= 0.004;

    sphere.rotation.x += 0.004;
    sphere.rotation.y += 0.004;
    sphere.rotation.z -= 0.004;
    createStar(a);

    renderer.render(scene, camera);
}

init();

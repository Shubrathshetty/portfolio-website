// ===== Three.js 3D Sci-Fi Outpost Background =====
// Uses global THREE from CDN (no ES module imports)

(function () {
    const canvas = document.getElementById('threeBgCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // ===== Scene Setup =====
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030308, 0.025);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030308);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    camera.position.set(0, 3.5, 9);
    camera.lookAt(0, 1.2, 0);

    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2(-999, -999);

    // ===== STAR DOME (vast starry sky overhead) =====
    const starCount = 5000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 60 + Math.random() * 60;
        starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        starPos[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta));
        starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeom, new THREE.PointsMaterial({
        color: 0xffffff, size: 0.12, transparent: true, opacity: 0.75, sizeAttenuation: true,
    }));
    scene.add(stars);

    // ===== GROUND — distant planet surface =====
    const gridHelper = new THREE.GridHelper(80, 80, 0x111128, 0x0a0a18);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(80, 80),
        new THREE.MeshStandardMaterial({ color: 0x060610, roughness: 0.95, metalness: 0.1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.51;
    ground.receiveShadow = true;
    scene.add(ground);

    // ===== OUTPOST PLATFORM =====
    const platMat = new THREE.MeshStandardMaterial({ color: 0x12122a, metalness: 0.7, roughness: 0.3 });

    // Main hexagonal platform
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.5, 0.15, 6), platMat);
    platform.position.set(0, -0.35, 0);
    platform.receiveShadow = true;
    scene.add(platform);

    // Glowing inner ring
    const innerRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.2, 0.04, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0x2244aa, transparent: true, opacity: 0.25 })
    );
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = -0.26;
    scene.add(innerRing);

    // Outer accent ring
    const outerRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.3, 0.02, 8, 64),
        new THREE.MeshBasicMaterial({ color: 0x1a2255, transparent: true, opacity: 0.15 })
    );
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = -0.27;
    scene.add(outerRing);

    // Support pillars at platform edges
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x0e0e25, metalness: 0.8, roughness: 0.3 });
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 6), pillarMat);
        pillar.position.set(Math.cos(angle) * 3.1, 0.25, Math.sin(angle) * 3.1);
        scene.add(pillar);

        // Top beacon light
        const beacon = new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0x3366ff, transparent: true, opacity: 0.6 })
        );
        beacon.position.set(Math.cos(angle) * 3.1, 0.85, Math.sin(angle) * 3.1);
        scene.add(beacon);
    }

    // ===== MODULAR WORKSTATION =====
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x1a1a35, metalness: 0.8, roughness: 0.25 });

    // Desk
    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 0.8), metalMat);
    desk.position.set(0, 0.7, -0.4);
    desk.castShadow = true;
    scene.add(desk);

    // Desk legs
    const legGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.75, 8);
    [[-0.75, -0.2], [0.75, -0.2], [-0.75, -0.75], [0.75, -0.75]].forEach(function (pos) {
        const leg = new THREE.Mesh(legGeom, metalMat);
        leg.position.set(pos[0], 0.3, pos[1]);
        scene.add(leg);
    });

    // Side monitors (floating holographic screens)
    var holoMat = new THREE.MeshBasicMaterial({
        color: 0x1a3366, transparent: true, opacity: 0.15, side: THREE.DoubleSide,
    });
    var holoScreen1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.35), holoMat);
    holoScreen1.position.set(-1.1, 1.0, -0.5);
    holoScreen1.rotation.y = 0.4;
    scene.add(holoScreen1);

    var holoScreen2 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.35), holoMat.clone());
    holoScreen2.position.set(1.1, 1.0, -0.5);
    holoScreen2.rotation.y = -0.4;
    scene.add(holoScreen2);

    // Holo screen borders (glowing lines)
    var holoBorderMat = new THREE.MeshBasicMaterial({ color: 0x3366ff, transparent: true, opacity: 0.3 });
    [holoScreen1, holoScreen2].forEach(function (screen) {
        var border = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.005, 4, 4), holoBorderMat.clone());
        border.position.copy(screen.position);
        border.rotation.copy(screen.rotation);
        scene.add(border);
    });

    // ===== LAPTOP =====
    // Base
    var laptopBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.025, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x18183a, metalness: 0.85, roughness: 0.15 })
    );
    laptopBase.position.set(0, 0.75, -0.4);
    scene.add(laptopBase);

    // Screen (glowing)
    var screenMat = new THREE.MeshStandardMaterial({
        color: 0x0a1530, emissive: 0x1a3060, emissiveIntensity: 1.2, metalness: 0.4, roughness: 0.3,
    });
    var laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.35, 0.012), screenMat);
    laptopScreen.position.set(0, 0.94, -0.58);
    laptopScreen.rotation.x = -0.12;
    scene.add(laptopScreen);

    // ===== CHAIR =====
    var chairMat = new THREE.MeshStandardMaterial({ color: 0x111128, metalness: 0.6, roughness: 0.4 });
    var chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.45), chairMat);
    chairSeat.position.set(0, 0.45, 0.35);
    scene.add(chairSeat);
    var chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.5, 0.04), chairMat);
    chairBack.position.set(0, 0.72, 0.57);
    scene.add(chairBack);
    var chairPole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.48, 8), metalMat);
    chairPole.position.set(0, 0.2, 0.35);
    scene.add(chairPole);

    // ===== DEVELOPER FIGURE (simple abstract) =====
    // Head
    var devHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x2a2a48, metalness: 0.3, roughness: 0.6 })
    );
    devHead.position.set(0, 1.15, 0.35);
    scene.add(devHead);

    // Torso
    var devTorso = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.3, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x1a1a38, metalness: 0.4, roughness: 0.5 })
    );
    devTorso.position.set(0, 0.88, 0.38);
    scene.add(devTorso);

    // Arms reaching toward laptop
    var armMat = new THREE.MeshStandardMaterial({ color: 0x222244, metalness: 0.3, roughness: 0.5 });
    var leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.35, 8), armMat);
    leftArm.position.set(-0.18, 0.78, 0.05);
    leftArm.rotation.x = -0.8;
    leftArm.rotation.z = 0.2;
    scene.add(leftArm);

    var rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.35, 8), armMat);
    rightArm.position.set(0.18, 0.78, 0.05);
    rightArm.rotation.x = -0.8;
    rightArm.rotation.z = -0.2;
    scene.add(rightArm);

    // ===== HOLOGRAPHIC DATA ORBS =====
    var orbs = [];
    var orbGroup = new THREE.Group();
    scene.add(orbGroup);

    var orbConfigs = [
        { color: 0x4488ff, r: 2.8, h: 1.8, speed: 0.18 },
        { color: 0x44ccff, r: 3.4, h: 2.4, speed: 0.14 },
        { color: 0x6666ff, r: 2.2, h: 3.0, speed: 0.22 },
        { color: 0x8844ff, r: 3.8, h: 1.4, speed: 0.12 },
        { color: 0x44ffbb, r: 2.6, h: 2.8, speed: 0.20 },
        { color: 0x6688ff, r: 3.0, h: 2.0, speed: 0.16 },
        { color: 0x88aaff, r: 3.6, h: 3.2, speed: 0.10 },
        { color: 0xaa66ff, r: 2.0, h: 1.6, speed: 0.24 },
    ];

    orbConfigs.forEach(function (cfg, i) {
        var size = 0.1 + Math.random() * 0.06;
        var orbMat = new THREE.MeshStandardMaterial({
            color: cfg.color, emissive: cfg.color, emissiveIntensity: 0.6,
            transparent: true, opacity: 0.8, metalness: 0.3, roughness: 0.2,
        });
        var orb = new THREE.Mesh(new THREE.SphereGeometry(size, 16, 16), orbMat);

        // Ring around orb
        var ring = new THREE.Mesh(
            new THREE.TorusGeometry(size + 0.08, 0.008, 8, 32),
            new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.3 })
        );
        orb.add(ring);

        // Inner glow core
        var glow = new THREE.Mesh(
            new THREE.SphereGeometry(size * 0.5, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
        );
        orb.add(glow);

        orb.userData = {
            angle: (i / 8) * Math.PI * 2,
            radius: cfg.r,
            height: cfg.h,
            speed: cfg.speed,
            ring: ring, glow: glow,
            baseScale: 1, targetScale: 1,
            baseEmissive: 0.6, targetEmissive: 0.6,
        };

        orbGroup.add(orb);
        orbs.push(orb);
    });

    // ===== FLOATING DUST PARTICLES =====
    var dustCount = 500;
    var dustPos = new Float32Array(dustCount * 3);
    for (var i = 0; i < dustCount * 3; i += 3) {
        dustPos[i] = (Math.random() - 0.5) * 30;
        dustPos[i + 1] = Math.random() * 12;
        dustPos[i + 2] = (Math.random() - 0.5) * 30;
    }
    var dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    var dust = new THREE.Points(dustGeom, new THREE.PointsMaterial({
        color: 0x6677aa, size: 0.025, transparent: true, opacity: 0.3, sizeAttenuation: true,
    }));
    scene.add(dust);

    // ===== LIGHTS =====
    // Ambient (very dim — faint starlight)
    scene.add(new THREE.AmbientLight(0x0a0a20, 0.4));

    // Laptop screen glow (blue)
    var screenLight = new THREE.PointLight(0x3355cc, 2, 6);
    screenLight.position.set(0, 1.2, -0.5);
    screenLight.castShadow = true;
    scene.add(screenLight);

    // Overhead starlight
    var overheadLight = new THREE.DirectionalLight(0x334477, 0.4);
    overheadLight.position.set(3, 12, 4);
    overheadLight.castShadow = true;
    scene.add(overheadLight);

    // Blue rim light
    var rimLight = new THREE.PointLight(0x223388, 0.6, 20);
    rimLight.position.set(-6, 6, -6);
    scene.add(rimLight);

    // Faint warm accent
    var warmLight = new THREE.PointLight(0x553322, 0.3, 15);
    warmLight.position.set(5, 4, 5);
    scene.add(warmLight);

    // ===== EVENTS =====
    window.addEventListener('mousemove', function (e) {
        targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseVec.x = targetMouse.x;
        mouseVec.y = targetMouse.y;
    });

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ===== ANIMATION LOOP =====
    function animate() {
        requestAnimationFrame(animate);
        var t = clock.getElapsedTime();

        // Smooth mouse follow
        mouse.x += (targetMouse.x - mouse.x) * 0.03;
        mouse.y += (targetMouse.y - mouse.y) * 0.03;

        // Camera parallax
        camera.position.x = mouse.x * 1.2;
        camera.position.y = 3.5 + mouse.y * 0.6;
        camera.lookAt(0, 1.2, 0);

        // Stars slow rotation
        stars.rotation.y = t * 0.003;

        // Platform ring glow pulse
        innerRing.material.opacity = 0.2 + Math.sin(t * 1.2) * 0.08;
        outerRing.material.opacity = 0.12 + Math.sin(t * 0.8 + 1) * 0.05;

        // Beacon pillars pulse
        // (beacons handled via simple emissive — no per-frame needed)

        // Holographic screens flicker
        holoScreen1.material.opacity = 0.12 + Math.sin(t * 3.5) * 0.04;
        holoScreen2.material.opacity = 0.12 + Math.sin(t * 3.5 + 1.5) * 0.04;

        // Raycaster for orb hover interactivity
        raycaster.setFromCamera(mouseVec, camera);
        var hits = raycaster.intersectObjects(orbs);

        // Reset all orbs
        orbs.forEach(function (orb) {
            orb.userData.targetScale = 1;
            orb.userData.targetEmissive = 0.6;
        });

        // Highlight hovered orb — it pulses bigger and glows
        if (hits.length > 0) {
            var hit = hits[0].object;
            hit.userData.targetScale = 1.8;
            hit.userData.targetEmissive = 2.5;
        }

        // Animate orbiting orbs
        orbs.forEach(function (orb, i) {
            var d = orb.userData;
            var orbAngle = d.angle + t * d.speed * 0.4;

            orb.position.x = Math.cos(orbAngle) * d.radius;
            orb.position.z = Math.sin(orbAngle) * d.radius;
            orb.position.y = d.height + Math.sin(t * 0.6 + i * 0.9) * 0.25;

            // Smooth scale transition
            d.baseScale += (d.targetScale - d.baseScale) * 0.07;
            orb.scale.setScalar(d.baseScale);

            // Smooth emissive glow transition
            d.baseEmissive += (d.targetEmissive - d.baseEmissive) * 0.07;
            orb.material.emissiveIntensity = d.baseEmissive;

            // Ring spin
            d.ring.rotation.x = t * 2.5 + i;
            d.ring.rotation.y = t * 1.8 + i * 0.5;

            // Pulsing opacity
            orb.material.opacity = 0.7 + Math.sin(t * 2.2 + i * 0.7) * 0.15;
            d.glow.material.opacity = 0.2 + Math.sin(t * 3 + i) * 0.15;
        });

        // Dust particles drift
        dust.rotation.y = t * 0.006;

        // Laptop screen glow pulse
        screenLight.intensity = 2 + Math.sin(t * 1.5) * 0.4;
        screenMat.emissiveIntensity = 1.2 + Math.sin(t * 1.5) * 0.3;

        renderer.render(scene, camera);
    }

    animate();
})();

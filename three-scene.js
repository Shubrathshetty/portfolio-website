// ===== Extravagant DevOps CI/CD Cloud Grid & Holographic Topology =====
// High-tech cyber-infrastructure visualizer with laser pipelines, 
// multi-tier glowing Kubernetes nodes, trailing data streams, and interactive particle field.

(function () {
    const canvas = document.getElementById('threeBgCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== Scene Setup =====
    const scene = new THREE.Scene();
    const bgColor = 0x06070a; // Deep cyber slate
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.018);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 7, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(bgColor);

    // Dynamic mouse parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ===== COLOR PALETTE =====
    const EMERALD = 0x10b981; // Healthy / Deploy Success
    const CYAN = 0x06b6d4;    // Traffic / Telemetry
    const VIOLET = 0x8b5cf6;  // Auth / Cryptography
    const GRID_COLOR = 0x181e2b;
    const HIGHLIGHT_COLOR = 0x1e3a5f;

    // ===== 1. DUAL DYNAMIC CYBER GRID FLOORS =====
    // Bottom grid (datacenter rack floor)
    const floorGrid = new THREE.GridHelper(90, 45, CYAN, GRID_COLOR);
    floorGrid.position.y = -5;
    floorGrid.material.transparent = true;
    floorGrid.material.opacity = 0.4;
    worldGroup.add(floorGrid);

    // Overhead ceiling matrix (cloud ceiling)
    const ceilingGrid = new THREE.GridHelper(90, 45, EMERALD, GRID_COLOR);
    ceilingGrid.position.y = 12;
    ceilingGrid.material.transparent = true;
    ceilingGrid.material.opacity = 0.22;
    worldGroup.add(ceilingGrid);

    // ===== 2. KUBERNETES & CLUSTER TOPOLOGY NODES =====
    const clusterNodes = [
        { x: -16, y: 2.0, z: -1, color: CYAN,    name: 'Git Webhook',       size: 1.2, rings: 2 },
        { x: -8,  y: 4.5, z: -3, color: EMERALD, name: 'CI Build Master',   size: 1.4, rings: 3 },
        { x: -8,  y: -1.0, z: 2, color: VIOLET,  name: 'Security & SAST',   size: 1.1, rings: 2 },
        { x: 0,   y: 1.5,  z: 0, color: EMERALD, name: 'Artifact Registry', size: 1.8, rings: 3 },
        { x: 8,   y: 4.0, z: -3, color: CYAN,    name: 'K8s Ingress Mesh',  size: 1.4, rings: 3 },
        { x: 8,   y: -1.5, z: 2, color: EMERALD, name: 'Worker ReplicaSet', size: 1.2, rings: 2 },
        { x: 16,  y: 2.0,  z: 0, color: EMERALD, name: 'Edge CDN / Live',   size: 1.6, rings: 3 },
        // Secondary auxiliary pods
        { x: -3,  y: -3.0, z: -2, color: CYAN,   name: 'Metrics Collector', size: 0.8, rings: 1 },
        { x: 3,   y: 5.2,  z: 1,  color: VIOLET, name: 'Secret Vault',      size: 0.9, rings: 1 },
    ];

    const nodeObjects = [];
    const coreGeom = new THREE.DodecahedronGeometry(1, 1);
    const podShellGeom = new THREE.IcosahedronGeometry(1.35, 1);

    clusterNodes.forEach((node) => {
        const nodeGroup = new THREE.Group();
        nodeGroup.position.set(node.x, node.y, node.z);

        // Core glowing crystal
        const coreMat = new THREE.MeshBasicMaterial({
            color: node.color,
            wireframe: false,
            transparent: true,
            opacity: 0.85
        });
        const coreMesh = new THREE.Mesh(coreGeom, coreMat);
        coreMesh.scale.setScalar(node.size * 0.75);
        nodeGroup.add(coreMesh);

        // Outer Wireframe Container Shield
        const shellMat = new THREE.MeshBasicMaterial({
            color: node.color,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const shellMesh = new THREE.Mesh(podShellGeom, shellMat);
        shellMesh.scale.setScalar(node.size);
        nodeGroup.add(shellMesh);

        // Holographic orbital rings
        const rings = [];
        for (let r = 0; r < node.rings; r++) {
            const radius = node.size * (1.5 + r * 0.35);
            const ringGeom = new THREE.TorusGeometry(radius, 0.025, 6, 40);
            const ringMat = new THREE.MeshBasicMaterial({
                color: node.color,
                transparent: true,
                opacity: 0.5 - r * 0.12
            });
            const ring = new THREE.Mesh(ringGeom, ringMat);
            ring.rotation.x = Math.random() * Math.PI;
            ring.rotation.y = Math.random() * Math.PI;
            nodeGroup.add(ring);
            rings.push({ mesh: ring, rotX: (r + 1) * 0.012, rotY: (r + 1) * 0.015 });
        }

        // Vertical beacon beam connecting node to floor
        const beamGeom = new THREE.CylinderGeometry(0.02, 0.02, 14, 8);
        const beamMat = new THREE.MeshBasicMaterial({
            color: node.color,
            transparent: true,
            opacity: 0.15
        });
        const beam = new THREE.Mesh(beamGeom, beamMat);
        beam.position.y = -5;
        nodeGroup.add(beam);

        worldGroup.add(nodeGroup);
        nodeObjects.push({
            group: nodeGroup,
            core: coreMesh,
            shell: shellMesh,
            rings,
            baseScale: node.size,
            seed: Math.random() * 10
        });
    });

    // ===== 3. LASER PIPELINE ARCS (CI/CD Data Corridors) =====
    const connections = [
        [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6],
        [7, 3], [8, 4], [2, 7]
    ];

    const pipelineCurves = [];
    const laserMat = new THREE.LineBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.65
    });

    connections.forEach(([i1, i2]) => {
        const p1 = clusterNodes[i1];
        const p2 = clusterNodes[i2];
        const midX = (p1.x + p2.x) * 0.5;
        const midY = (p1.y + p2.y) * 0.5 + 1.8; // soaring arch
        const midZ = (p1.z + p2.z) * 0.5;

        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(p1.x, p1.y, p1.z),
            new THREE.Vector3(midX, midY, midZ),
            new THREE.Vector3(p2.x, p2.y, p2.z)
        );
        pipelineCurves.push(curve);

        const points = curve.getPoints(40);
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geom, laserMat);
        worldGroup.add(line);
    });

    // ===== 4. LUMINESCENT DATA PACKETS WITH GLOW TRAILS =====
    const packetCount = 60; // Denser stream of packets
    const packets = [];
    const packetGeom = new THREE.SphereGeometry(0.18, 10, 10);

    for (let i = 0; i < packetCount; i++) {
        const curveIdx = Math.floor(Math.random() * pipelineCurves.length);
        const isEmerald = Math.random() > 0.35;
        const packetMat = new THREE.MeshBasicMaterial({
            color: isEmerald ? EMERALD : CYAN,
            transparent: true,
            opacity: 0.95
        });
        const mesh = new THREE.Mesh(packetGeom, packetMat);
        worldGroup.add(mesh);

        packets.push({
            mesh,
            curveIdx,
            progress: Math.random(),
            speed: 0.0035 + Math.random() * 0.007
        });
    }

    // ===== 5. VAST FLOATING TELEMETRY NEBULA (500 Particles) =====
    const nebulaCount = 550;
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    const cEmerald = new THREE.Color(EMERALD);
    const cCyan = new THREE.Color(CYAN);
    const cDim = new THREE.Color(0x3f3f46);

    for (let i = 0; i < nebulaCount; i++) {
        nebulaPos[i * 3]     = (Math.random() - 0.5) * 80;
        nebulaPos[i * 3 + 1] = (Math.random() - 0.5) * 35;
        nebulaPos[i * 3 + 2] = (Math.random() - 0.5) * 45 - 5;

        const randChoice = Math.random();
        const col = randChoice > 0.6 ? cEmerald : (randChoice > 0.25 ? cCyan : cDim);
        nebulaColors[i * 3]     = col.r;
        nebulaColors[i * 3 + 1] = col.g;
        nebulaColors[i * 3 + 2] = col.b;
    }

    const nebulaGeom = new THREE.BufferGeometry();
    nebulaGeom.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeom.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMat = new THREE.PointsMaterial({
        size: 0.22,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
    });
    const nebula = new THREE.Points(nebulaGeom, nebulaMat);
    worldGroup.add(nebula);

    // ===== 6. RESIZE HANDLER =====
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ===== 7. ANIMATION LOOP =====
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        // Mouse smooth lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        if (!prefersReducedMotion) {
            // Dynamic Camera Pan & Drift
            camera.position.x = mouse.x * 3.5;
            camera.position.y = 7 + (-mouse.y * 2.2) + Math.sin(time * 0.4) * 0.5;
            camera.lookAt(0, 1.0, 0);

            // Flow grid floors backward (endless runway illusion)
            floorGrid.position.z = (time * 1.5) % 2;
            ceilingGrid.position.z = -(time * 1.5) % 2;

            // Gentle cluster rotation
            worldGroup.rotation.y = Math.sin(time * 0.12) * 0.1;

            // Animate each Cluster Node & its Orbital Rings
            nodeObjects.forEach((node) => {
                node.shell.rotation.x += 0.012;
                node.shell.rotation.y += 0.018;

                // Pulsing energy core
                const pulse = Math.sin(time * 2.5 + node.seed) * 0.12 + 1;
                node.core.scale.setScalar(node.baseScale * 0.75 * pulse);

                // Spin orbital rings
                node.rings.forEach((r) => {
                    r.mesh.rotation.x += r.rotX;
                    r.mesh.rotation.y += r.rotY;
                });
            });

            // Fast stream of CI/CD data packets
            packets.forEach((pkt) => {
                pkt.progress += pkt.speed;
                if (pkt.progress >= 1) {
                    pkt.progress = 0;
                    pkt.curveIdx = Math.floor(Math.random() * pipelineCurves.length);
                }
                const pt = pipelineCurves[pkt.curveIdx].getPoint(pkt.progress);
                pkt.mesh.position.copy(pt);
            });

            // Nebula particles slow swirl
            nebula.rotation.y = time * 0.02;
        }

        renderer.render(scene, camera);
    }

    animate();
})();

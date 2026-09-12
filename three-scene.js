// ===== DevOps / CI/CD Cloud Pipeline 3D Background =====
// Replaces the generic sci-fi outpost with an interactive cloud topology,
// container cluster nodes, and pulsing CI/CD data packets flowing along pipelines.

(function () {
    const canvas = document.getElementById('threeBgCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== Scene & Renderer Setup =====
    const scene = new THREE.Scene();
    const bgColor = 0x09090b; // shadcn Zinc dark background
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.022);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(bgColor);

    // ===== Interactive Mouse Parallax =====
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // ===== TOPOLOGY / CLOUD ARCHITECTURE NODES =====
    const pipelineGroup = new THREE.Group();
    scene.add(pipelineGroup);

    // Grid Floor representing Server Rack / Datacenter mesh
    const grid = new THREE.GridHelper(60, 40, 0x27272a, 0x141417);
    grid.position.y = -3.5;
    pipelineGroup.add(grid);

    // Colors: Emerald (healthy/success), Cyan (traffic/docker), Slate/Muted (infra border)
    const EMERALD = 0x10b981;
    const CYAN = 0x06b6d4;
    const NODE_BORDER = 0x27272a;

    // Node definitions representing a CI/CD Pipeline & Kubernetes Cluster:
    // [Source Code] -> [Build / CI Runner] -> [Container Registry] -> [K8s Cluster Nodes] -> [API Gateway / Prod]
    const nodeCoords = [
        { x: -14, y: 1.5, z: 0, name: 'Git Repo / Webhook', color: CYAN, size: 0.9 },
        { x: -7,  y: 3.0, z: -3, name: 'CI Build Runner', color: EMERALD, size: 1.1 },
        { x: -7,  y: -0.5, z: 2, name: 'Test & Lint Worker', color: CYAN, size: 0.85 },
        { x: 0,   y: 1.2, z: 0, name: 'Container Registry / Docker', color: EMERALD, size: 1.3 },
        { x: 7,   y: 3.5, z: -2, name: 'K8s Ingress Controller', color: CYAN, size: 1.0 },
        { x: 7,   y: -1.0, z: 3, name: 'Pod Replica / Worker', color: EMERALD, size: 0.9 },
        { x: 14,  y: 1.5, z: 0, name: 'Production / High Availability', color: EMERALD, size: 1.2 }
    ];

    const nodeMeshes = [];
    const nodeGeom = new THREE.IcosahedronGeometry(1, 1);
    const wireGeom = new THREE.IcosahedronGeometry(1.2, 1);

    nodeCoords.forEach((n) => {
        const nodeSubGroup = new THREE.Group();
        nodeSubGroup.position.set(n.x, n.y, n.z);

        // Core Glowing Node
        const coreMat = new THREE.MeshBasicMaterial({
            color: n.color,
            wireframe: false,
            transparent: true,
            opacity: 0.85
        });
        const core = new THREE.Mesh(nodeGeom, coreMat);
        core.scale.setScalar(n.size);
        nodeSubGroup.add(core);

        // Outer Wireframe Shield / Container Pod Shell
        const wireMat = new THREE.MeshBasicMaterial({
            color: n.color,
            wireframe: true,
            transparent: true,
            opacity: 0.28
        });
        const wire = new THREE.Mesh(wireGeom, wireMat);
        wire.scale.setScalar(n.size);
        nodeSubGroup.add(wire);

        // Orbiting Ring around major nodes
        const ringGeom = new THREE.RingGeometry(n.size * 1.4, n.size * 1.48, 24);
        const ringMat = new THREE.MeshBasicMaterial({
            color: n.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.35
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = Math.PI / 2;
        nodeSubGroup.add(ring);

        pipelineGroup.add(nodeSubGroup);
        nodeMeshes.push({ group: nodeSubGroup, core, wire, ring, baseScale: n.size });
    });

    // ===== PIPELINE CONNECTIONS (Curves connecting CI/CD stages) =====
    const connectionPairs = [
        [0, 1], [0, 2], // Git to CI Build and Tests
        [1, 3], [2, 3], // Build & Test to Registry
        [3, 4], [3, 5], // Registry to Ingress and Pods
        [4, 6], [5, 6]  // Ingress & Pods to Prod
    ];

    const pipelineCurves = [];
    const tubeMaterial = new THREE.LineBasicMaterial({
        color: 0x27272a,
        transparent: true,
        opacity: 0.55
    });

    connectionPairs.forEach(([fromIdx, toIdx]) => {
        const p1 = nodeCoords[fromIdx];
        const p2 = nodeCoords[toIdx];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 + 1.2; // slight arch
        const midZ = (p1.z + p2.z) / 2;

        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(p1.x, p1.y, p1.z),
            new THREE.Vector3(midX, midY, midZ),
            new THREE.Vector3(p2.x, p2.y, p2.z)
        );
        pipelineCurves.push(curve);

        const points = curve.getPoints(32);
        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeom, tubeMaterial);
        pipelineGroup.add(line);
    });

    // ===== PULSING DATA PACKETS / DEPLOYMENT PAYLOADS =====
    // Small glowing spheres traveling along the CI/CD pipeline curves
    const packetCount = 28;
    const packets = [];
    const packetGeom = new THREE.SphereGeometry(0.12, 8, 8);

    for (let i = 0; i < packetCount; i++) {
        const curveIdx = Math.floor(Math.random() * pipelineCurves.length);
        const isSuccess = Math.random() > 0.25; // mostly green success packets, some cyan
        const packetMat = new THREE.MeshBasicMaterial({
            color: isSuccess ? EMERALD : CYAN,
            transparent: true,
            opacity: 0.95
        });
        const packetMesh = new THREE.Mesh(packetGeom, packetMat);
        pipelineGroup.add(packetMesh);

        packets.push({
            mesh: packetMesh,
            curveIdx: curveIdx,
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.005
        });
    }

    // ===== BACKGROUND TELEMETRY PARTICLES (Cloud Cluster atmosphere) =====
    const particleCount = 200;
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePos[i] = (Math.random() - 0.5) * 50;
        particlePos[i + 1] = (Math.random() - 0.5) * 20;
        particlePos[i + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
        color: 0x52525b,
        size: 0.15,
        transparent: true,
        opacity: 0.4
    });
    const cloudParticles = new THREE.Points(particleGeom, particleMat);
    pipelineGroup.add(cloudParticles);

    // ===== RESIZE HANDLER =====
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ===== ANIMATION LOOP =====
    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Mouse smooth lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Subtle camera tilt following cursor & natural float
        if (!prefersReducedMotion) {
            camera.position.x = mouse.x * 2.5;
            camera.position.y = 8 + (-mouse.y * 1.5) + Math.sin(time * 0.5) * 0.3;
            camera.lookAt(0, 0.5, 0);

            // Gently rotate entire cluster
            pipelineGroup.rotation.y = Math.sin(time * 0.15) * 0.08;

            // Animate each cluster node
            nodeMeshes.forEach((n, idx) => {
                n.wire.rotation.x += 0.01;
                n.wire.rotation.y += 0.015;
                n.ring.rotation.z += 0.008;

                // Breathing pulse effect
                const pulse = Math.sin(time * 2 + idx) * 0.08 + 1;
                n.core.scale.setScalar(n.baseScale * pulse);
            });

            // Move CI/CD data packets along pipeline curves
            packets.forEach((pkt) => {
                pkt.progress += pkt.speed;
                if (pkt.progress >= 1) {
                    pkt.progress = 0;
                    pkt.curveIdx = Math.floor(Math.random() * pipelineCurves.length);
                }
                const pt = pipelineCurves[pkt.curveIdx].getPoint(pkt.progress);
                pkt.mesh.position.copy(pt);
            });
        }

        renderer.render(scene, camera);
    }

    animate();
})();

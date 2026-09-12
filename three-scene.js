// ===== Futuristic Neural Cloud & High-Velocity CI/CD Mesh =====
// A cutting-edge, organic yet architectural DevOps visualization:
// Features a dynamic cyber wave mesh, floating holographic container cubes, 
// glowing neural interconnects, and high-velocity pulse telemetry in Emerald & Cyan.

(function () {
    const canvas = document.getElementById('threeBgCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== Scene Setup =====
    const scene = new THREE.Scene();
    const bgColor = 0x07090e; // Matches theme background
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.02);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 26);
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

    // Dynamic mouse parallax tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ===== COLOR PALETTE (Identical theme match) =====
    const EMERALD = 0x10b981; // DevOps Green
    const CYAN = 0x06b6d4;    // Cloud Blue
    const VIOLET = 0x8b5cf6;  // Microservice Violet
    const SLATE = 0x1e293b;   // Border slate

    // ===== 1. SINE WAVE DIGITAL TERRAIN (Continuous Undulating Mesh) =====
    // Represents continuous streaming data and autoscaling cloud infrastructure
    const gridRows = 45;
    const gridCols = 45;
    const planeGeom = new THREE.PlaneGeometry(80, 80, gridCols - 1, gridRows - 1);
    planeGeom.rotateX(-Math.PI / 2);
    planeGeom.translate(0, -6.5, 0);

    const planeMat = new THREE.MeshBasicMaterial({
        color: CYAN,
        wireframe: true,
        transparent: true,
        opacity: 0.28
    });
    const waveMesh = new THREE.Mesh(planeGeom, planeMat);
    worldGroup.add(waveMesh);

    const posAttr = planeGeom.attributes.position;
    const originalPositions = posAttr.array.slice();

    // ===== 2. HOLOGRAPHIC CONTAINER CUBES (Microservices & Pods) =====
    // Floating semi-transparent cubes rotating in cluster patterns
    const podCount = 14;
    const pods = [];
    const cubeGeom = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const cubeWireGeom = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    const podCoordinates = [
        { x: -15, y: 3, z: -2, col: CYAN },
        { x: -11, y: 7, z: -6, col: EMERALD },
        { x: -9, y: -2, z: 2, col: VIOLET },
        { x: -5, y: 4, z: -3, col: CYAN },
        { x: -3, y: 1, z: 1, col: EMERALD },
        { x: 0, y: 6, z: -4, col: EMERALD },
        { x: 3, y: 0, z: 3, col: CYAN },
        { x: 6, y: 5, z: -2, col: EMERALD },
        { x: 9, y: -1, z: 1, col: VIOLET },
        { x: 12, y: 4, z: -5, col: CYAN },
        { x: 15, y: 1, z: 0, col: EMERALD },
        { x: -1, y: -4, z: 4, col: CYAN },
        { x: 8, y: -3, z: -2, col: EMERALD },
        { x: -7, y: -4, z: -1, col: VIOLET }
    ];

    podCoordinates.forEach((p, idx) => {
        const podGroup = new THREE.Group();
        podGroup.position.set(p.x, p.y, p.z);

        // Inner solid glowing pod
        const coreMat = new THREE.MeshBasicMaterial({
            color: p.col,
            transparent: true,
            opacity: 0.65
        });
        const core = new THREE.Mesh(cubeGeom, coreMat);
        podGroup.add(core);

        // Outer wireframe edge shell
        const wireMat = new THREE.MeshBasicMaterial({
            color: p.col,
            wireframe: true,
            transparent: true,
            opacity: 0.9
        });
        const wire = new THREE.Mesh(cubeWireGeom, wireMat);
        podGroup.add(wire);

        worldGroup.add(podGroup);
        pods.push({
            group: podGroup,
            core,
            wire,
            rotSpeedX: 0.008 + (idx % 4) * 0.004,
            rotSpeedY: 0.012 + (idx % 3) * 0.005,
            floatSeed: idx * 0.8,
            baseY: p.y
        });
    });

    // ===== 3. DYNAMIC INTER-SERVICE PIPELINES (Glowing Network Arcs) =====
    const networkEdges = [
        [0, 1], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8],
        [7, 9], [8, 10], [11, 4], [12, 8], [13, 2], [3, 0], [7, 10]
    ];

    const pipelineCurves = [];
    const edgeMaterial = new THREE.LineBasicMaterial({
        color: EMERALD,
        transparent: true,
        opacity: 0.45
    });

    networkEdges.forEach(([fromIdx, toIdx]) => {
        const p1 = podCoordinates[fromIdx];
        const p2 = podCoordinates[toIdx];
        const midX = (p1.x + p2.x) * 0.5;
        const midY = (p1.y + p2.y) * 0.5 + 1.2;
        const midZ = (p1.z + p2.z) * 0.5;

        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(p1.x, p1.y, p1.z),
            new THREE.Vector3(midX, midY, midZ),
            new THREE.Vector3(p2.x, p2.y, p2.z)
        );
        pipelineCurves.push(curve);

        const pts = curve.getPoints(28);
        const geom = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(geom, edgeMaterial);
        worldGroup.add(line);
    });

    // ===== 4. HIGH-VELOCITY PULSING DATA STREAMS =====
    const packetCount = 48;
    const packets = [];
    const packetGeom = new THREE.SphereGeometry(0.16, 8, 8);

    for (let i = 0; i < packetCount; i++) {
        const curveIdx = Math.floor(Math.random() * pipelineCurves.length);
        const isCyan = Math.random() > 0.5;
        const packetMat = new THREE.MeshBasicMaterial({
            color: isCyan ? CYAN : EMERALD,
            transparent: true,
            opacity: 0.95
        });
        const mesh = new THREE.Mesh(packetGeom, packetMat);
        worldGroup.add(mesh);

        packets.push({
            mesh,
            curveIdx,
            progress: Math.random(),
            speed: 0.005 + Math.random() * 0.008
        });
    }

    // ===== 5. SWARM PARTICLES (Ambient Telemetry Atmosphere) =====
    const swarmCount = 350;
    const swarmPositions = new Float32Array(swarmCount * 3);
    const swarmColors = new Float32Array(swarmCount * 3);

    const cEmerald = new THREE.Color(EMERALD);
    const cCyan = new THREE.Color(CYAN);
    const cSlate = new THREE.Color(SLATE);

    for (let i = 0; i < swarmCount; i++) {
        swarmPositions[i * 3]     = (Math.random() - 0.5) * 70;
        swarmPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
        swarmPositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;

        const rnd = Math.random();
        const col = rnd > 0.6 ? cEmerald : (rnd > 0.25 ? cCyan : cSlate);
        swarmColors[i * 3]     = col.r;
        swarmColors[i * 3 + 1] = col.g;
        swarmColors[i * 3 + 2] = col.b;
    }

    const swarmGeom = new THREE.BufferGeometry();
    swarmGeom.setAttribute('position', new THREE.BufferAttribute(swarmPositions, 3));
    swarmGeom.setAttribute('color', new THREE.BufferAttribute(swarmColors, 3));

    const swarmMat = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: true
    });
    const swarm = new THREE.Points(swarmGeom, swarmMat);
    worldGroup.add(swarm);

    // ===== 6. RESIZE LISTENER =====
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
            // Camera subtle floating & dynamic pan
            camera.position.x = mouse.x * 3.5;
            camera.position.y = 6 + (-mouse.y * 2.0) + Math.sin(time * 0.4) * 0.4;
            camera.lookAt(0, 0.5, 0);

            // Animate Digital Wave Terrain
            const positions = posAttr.array;
            for (let i = 0; i < positions.length; i += 3) {
                const ox = originalPositions[i];
                const oz = originalPositions[i + 2];
                // Smooth dual-harmonic undulating wave
                positions[i + 1] = originalPositions[i + 1] + 
                    Math.sin(ox * 0.15 + time * 1.6) * 1.2 + 
                    Math.cos(oz * 0.15 + time * 1.2) * 1.0;
            }
            posAttr.needsUpdate = true;

            // Animate Container Pods (Floating & Spinning)
            pods.forEach((p) => {
                p.wire.rotation.x += p.rotSpeedX;
                p.wire.rotation.y += p.rotSpeedY;
                p.core.rotation.x -= p.rotSpeedX * 0.5;
                p.core.rotation.y -= p.rotSpeedY * 0.5;

                // Gentle vertical hover
                p.group.position.y = p.baseY + Math.sin(time * 1.8 + p.floatSeed) * 0.4;
            });

            // Stream CI/CD data packets across pipelines
            packets.forEach((pkt) => {
                pkt.progress += pkt.speed;
                if (pkt.progress >= 1) {
                    pkt.progress = 0;
                    pkt.curveIdx = Math.floor(Math.random() * pipelineCurves.length);
                }
                const pt = pipelineCurves[pkt.curveIdx].getPoint(pkt.progress);
                pkt.mesh.position.copy(pt);
            });

            // Rotate ambient telemetry swarm
            swarm.rotation.y = time * 0.015;
            worldGroup.rotation.y = Math.sin(time * 0.1) * 0.06;
        }

        renderer.render(scene, camera);
    }

    animate();
})();

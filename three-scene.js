// ===== Three.js 3D Hero Scene =====
import * as THREE from 'three';

class HeroScene {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        if (!this.canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
        });

        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.objects = [];
        this.particles = null;
        this.clock = new THREE.Clock();
        this.currentTheme = this.isDark() ? 'dark' : 'light';

        this.init();
    }

    isDark() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    getWireColor() {
        return this.isDark() ? 0xffffff : 0x000000;
    }

    getParticleColor() {
        return this.isDark() ? 0xffffff : 0x000000;
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.camera.position.z = 6;

        this.createObjects();
        this.createParticles();
        this.createRings();
        this.addEventListeners();
        this.animate();
    }

    createObjects() {
        const color = this.getWireColor();

        const makeMaterial = (opacity = 0.12) =>
            new THREE.MeshBasicMaterial({
                color,
                wireframe: true,
                transparent: true,
                opacity,
            });

        // Large Torus — the main "silver ring"
        const torusGeom = new THREE.TorusGeometry(2, 0.3, 20, 60);
        this.torus = new THREE.Mesh(torusGeom, makeMaterial(0.18));
        this.torus.position.set(3, 0.5, -3);
        this.scene.add(this.torus);
        this.objects.push({ mesh: this.torus, baseY: 0.5, speed: 0.3, amp: 0.3, phase: 0 });

        // Icosahedron
        const icoGeom = new THREE.IcosahedronGeometry(1.2, 1);
        this.ico = new THREE.Mesh(icoGeom, makeMaterial(0.1));
        this.ico.position.set(-3, -0.5, -2);
        this.scene.add(this.ico);
        this.objects.push({ mesh: this.ico, baseY: -0.5, speed: 0.7, amp: 0.25, phase: 1 });

        // Octahedron
        const octGeom = new THREE.OctahedronGeometry(0.9, 0);
        this.oct = new THREE.Mesh(octGeom, makeMaterial(0.14));
        this.oct.position.set(1, 2.5, -4);
        this.scene.add(this.oct);
        this.objects.push({ mesh: this.oct, baseY: 2.5, speed: 0.6, amp: 0.2, phase: 2 });

        // Dodecahedron
        const dodGeom = new THREE.DodecahedronGeometry(0.7, 0);
        this.dod = new THREE.Mesh(dodGeom, makeMaterial(0.1));
        this.dod.position.set(-2, 2, -2.5);
        this.scene.add(this.dod);
        this.objects.push({ mesh: this.dod, baseY: 2, speed: 0.4, amp: 0.3, phase: 3 });

        // Small Tetrahedron
        const tetGeom = new THREE.TetrahedronGeometry(0.5, 0);
        this.tet = new THREE.Mesh(tetGeom, makeMaterial(0.12));
        this.tet.position.set(2, -2, -1.5);
        this.scene.add(this.tet);
        this.objects.push({ mesh: this.tet, baseY: -2, speed: 0.8, amp: 0.2, phase: 4 });

        // Sphere (small accent)
        const sphereGeom = new THREE.SphereGeometry(0.4, 16, 16);
        this.sphere = new THREE.Mesh(sphereGeom, makeMaterial(0.08));
        this.sphere.position.set(-1, -2.5, -3);
        this.scene.add(this.sphere);
        this.objects.push({ mesh: this.sphere, baseY: -2.5, speed: 0.5, amp: 0.15, phase: 5 });
    }

    createRings() {
        const color = this.getWireColor();
        const ringMaterial = new THREE.MeshBasicMaterial({
            color,
            wireframe: true,
            transparent: true,
            opacity: 0.06,
        });

        // Large background ring
        const ring1Geom = new THREE.TorusGeometry(4, 0.05, 8, 80);
        this.ring1 = new THREE.Mesh(ring1Geom, ringMaterial.clone());
        this.ring1.position.set(0, 0, -5);
        this.scene.add(this.ring1);

        // Medium ring
        const ring2Geom = new THREE.TorusGeometry(3, 0.03, 8, 60);
        this.ring2 = new THREE.Mesh(ring2Geom, ringMaterial.clone());
        this.ring2.position.set(0, 0, -4);
        this.scene.add(this.ring2);
    }

    createParticles() {
        const count = 300;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 18;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.025,
            color: this.getParticleColor(),
            transparent: true,
            opacity: 0.35,
            sizeAttenuation: true,
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    updateColors() {
        const newTheme = this.isDark() ? 'dark' : 'light';
        if (newTheme === this.currentTheme) return;
        this.currentTheme = newTheme;

        const wireColor = this.getWireColor();
        const particleColor = this.getParticleColor();

        this.objects.forEach(({ mesh }) => {
            mesh.material.color.setHex(wireColor);
        });

        if (this.ring1) this.ring1.material.color.setHex(wireColor);
        if (this.ring2) this.ring2.material.color.setHex(wireColor);

        if (this.particles) {
            this.particles.material.color.setHex(particleColor);
        }
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();

        // Smooth mouse follow
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.04;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.04;

        // Camera parallax
        this.camera.position.x = this.mouse.x * 0.8;
        this.camera.position.y = this.mouse.y * 0.5;
        this.camera.lookAt(0, 0, -2);

        // Animate objects — float + rotate
        this.objects.forEach(({ mesh, baseY, speed, amp, phase }, i) => {
            mesh.rotation.x = time * (0.2 + i * 0.05);
            mesh.rotation.y = time * (0.15 + i * 0.07);
            mesh.rotation.z = time * (0.1 + i * 0.03);
            mesh.position.y = baseY + Math.sin(time * speed + phase) * amp;
        });

        // Rings — slow spin in different axes
        if (this.ring1) {
            this.ring1.rotation.x = Math.PI * 0.4 + time * 0.08;
            this.ring1.rotation.y = time * 0.05;
        }
        if (this.ring2) {
            this.ring2.rotation.x = Math.PI * 0.55 + time * 0.06;
            this.ring2.rotation.z = time * 0.04;
        }

        // Particles slow rotation
        if (this.particles) {
            this.particles.rotation.y = time * 0.015;
            this.particles.rotation.x = time * 0.008;
        }

        // Check theme changes
        this.updateColors();

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize
new HeroScene();

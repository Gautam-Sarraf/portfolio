import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { spaceAudio } from '../utils/audio';

interface SpaceCanvasProps {
  mode: string;
  selectedSkill: string | null;
  selectedTimelineIndex: number;
  onPlanetClick?: (skillName: string) => void;
}

export const SKILL_PLANETS = [
  { name: 'React', color: '#00f0ff', size: 0.8, distance: 5, speed: 0.01 },
  { name: 'TypeScript', color: '#007acc', size: 0.65, distance: 7, speed: 0.008 },
  { name: 'Python', color: '#ffcc00', size: 0.75, distance: 9, speed: 0.006 },
  { name: 'FastAPI', color: '#009688', size: 0.55, distance: 11, speed: 0.012 },
  { name: 'OpenAI', color: '#ff0080', size: 0.8, distance: 13, speed: 0.005 },
  { name: 'LangChain', color: '#00ff88', size: 0.7, distance: 15, speed: 0.007 },
  { name: 'MongoDB', color: '#4db33d', size: 0.65, distance: 17, speed: 0.004 },
  { name: 'Docker', color: '#2496ed', size: 0.6, distance: 19, speed: 0.009 },
  { name: 'AWS', color: '#ff9900', size: 0.7, distance: 21, speed: 0.003 },
];

export const TIMELINE_STATIONS = [
  { label: 'CSE Student', year: '2022', z: 0, color: '#ffcc00' },
  { label: 'Operations Lead', year: '2023', z: -15, color: '#ff6c00' },
  { label: 'Web Dev Intern', year: '2024', z: -30, color: '#00ff88' },
  { label: 'AI Freelancer', year: '2024', z: -45, color: '#ff0080' },
  { label: 'Frontend Engineer', year: '2025', z: -60, color: '#00f0ff' },
];

const SpaceCanvas: React.FC<SpaceCanvasProps> = ({
  mode,
  selectedSkill,
  selectedTimelineIndex,
  onPlanetClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 3D references
  const aiCoreRef = useRef<THREE.Group | null>(null);
  const skillGalaxyRef = useRef<THREE.Group | null>(null);
  const timelineGroupRef = useRef<THREE.Group | null>(null);
  const starFieldRef = useRef<THREE.Points | null>(null);
  
  // Planet mesh dictionary for projection / hovering
  const planetMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse moves for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffd8, 2, 50);
    pointLight1.position.set(0, 0, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff2e93, 2, 50);
    pointLight2.position.set(5, 5, -5);
    scene.add(pointLight2);

    // ==========================================
    // 1. STARFIELD & COSMIC DUST
    // ==========================================
    const starCount = 3000;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Position inside sphere
      const r = Math.random() * 200 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Star tinting (space colors: white, cyan, pink)
      const colorType = Math.random();
      if (colorType < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // White
      } else if (colorType < 0.8) {
        colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1; // Cyan
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 0.8; // Pink/Purple
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom star material
    const starMaterial = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
    starFieldRef.current = starField;

    // ==========================================
    // 2. AI CORE (LOBBY ENGINE)
    // ==========================================
    const aiCore = new THREE.Group();
    aiCore.position.set(0, 0, 0);
    scene.add(aiCore);
    aiCoreRef.current = aiCore;

    // Inner wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00ffd8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    aiCore.add(innerSphere);

    // Orbiting rings
    const rings: THREE.Mesh[] = [];
    const ringCount = 3;
    const ringColors = [0x00ffd8, 0xff2e93, 0xa855f7];
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.TorusGeometry(2.2 + i * 0.4, 0.04, 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[i],
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      // Stagger rotation
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      aiCore.add(ring);
      rings.push(ring);
    }

    // Concentric outer particle ring
    const coreParticlesGeo = new THREE.BufferGeometry();
    const corePCount = 300;
    const corePPos = new Float32Array(corePCount * 3);
    for (let i = 0; i < corePCount; i++) {
      const angle = (i / corePCount) * Math.PI * 2;
      const radius = 3.8 + (Math.random() - 0.5) * 0.4;
      corePPos[i * 3] = Math.cos(angle) * radius;
      corePPos[i * 3 + 1] = Math.sin(angle) * radius;
      corePPos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    coreParticlesGeo.setAttribute('position', new THREE.BufferAttribute(corePPos, 3));
    const corePMaterial = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const coreParticles = new THREE.Points(coreParticlesGeo, corePMaterial);
    aiCore.add(coreParticles);

    // ==========================================
    // 3. SKILL GALAXY (SYSTEM AT X: 30)
    // ==========================================
    const skillGalaxy = new THREE.Group();
    skillGalaxy.position.set(30, 0, 0);
    scene.add(skillGalaxy);
    skillGalaxyRef.current = skillGalaxy;

    // Solar Center (Glowing hollow orb)
    const sunGeo = new THREE.SphereGeometry(1.8, 16, 16);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xff2e93,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    skillGalaxy.add(sun);

    // Create tech planets
    const meshesMap = new Map<string, THREE.Mesh>();
    SKILL_PLANETS.forEach(plan => {
      const planetPivot = new THREE.Group();
      // Orbit tilt
      planetPivot.rotation.x = Math.random() * 0.4 - 0.2;
      planetPivot.rotation.z = Math.random() * 0.4 - 0.2;
      skillGalaxy.add(planetPivot);

      const geom = new THREE.SphereGeometry(plan.size, 16, 16);
      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(plan.color),
        emissive: new THREE.Color(plan.color),
        emissiveIntensity: 0.4,
        shininess: 30,
        flatShading: true,
      });

      const planetMesh = new THREE.Mesh(geom, mat);
      planetMesh.position.set(plan.distance, 0, 0);
      planetPivot.add(planetMesh);
      meshesMap.set(plan.name, planetMesh);

      // Add a dotted orbit line
      const orbitGeo = new THREE.BufferGeometry();
      const orbitPoints = 128;
      const orbitPos = new Float32Array(orbitPoints * 3);
      for (let j = 0; j < orbitPoints; j++) {
        const theta = (j / orbitPoints) * Math.PI * 2;
        orbitPos[j * 3] = Math.cos(theta) * plan.distance;
        orbitPos[j * 3 + 1] = 0;
        orbitPos[j * 3 + 2] = Math.sin(theta);
      }
      orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
      });
      const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
      planetPivot.add(orbitLine);
    });
    planetMeshesRef.current = meshesMap;

    // ==========================================
    // 4. TIMELINE JOURNEY (STATIONS AT Z: -50)
    // ==========================================
    const timelineGroup = new THREE.Group();
    timelineGroup.position.set(0, 0, -50);
    scene.add(timelineGroup);
    timelineGroupRef.current = timelineGroup;

    // Create Station meshes
    TIMELINE_STATIONS.forEach((station, sIdx) => {
      const stationGroup = new THREE.Group();
      stationGroup.position.set(
        Math.sin(sIdx * 1.5) * 6, // Curve back and forth
        Math.cos(sIdx * 1.5) * 3,
        station.z
      );

      // holographic diamond geometry representing station core
      const geom = new THREE.OctahedronGeometry(1.2);
      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(station.color),
        emissive: new THREE.Color(station.color),
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const mesh = new THREE.Mesh(geom, mat);
      stationGroup.add(mesh);

      // Rotating station ring
      const ringGeo = new THREE.TorusGeometry(1.8, 0.05, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
      });
      const outerRing = new THREE.Mesh(ringGeo, ringMat);
      outerRing.rotation.x = Math.PI / 2;
      stationGroup.add(outerRing);

      timelineGroup.add(stationGroup);
    });

    // Draw lines between stations
    const pathGeo = new THREE.BufferGeometry();
    const pathPoints: THREE.Vector3[] = [];
    TIMELINE_STATIONS.forEach((station, sIdx) => {
      pathPoints.push(new THREE.Vector3(
        Math.sin(sIdx * 1.5) * 6,
        Math.cos(sIdx * 1.5) * 3,
        station.z
      ));
    });
    pathGeo.setFromPoints(pathPoints);
    const pathMat = new THREE.LineBasicMaterial({
      color: 0x00ffd8,
      transparent: true,
      opacity: 0.25,
    });
    const pathLine = new THREE.Line(pathGeo, pathMat);
    timelineGroup.add(pathLine);

    // ==========================================
    // 5. ANIMATION RENDERING LOOP
    // ==========================================
    let frame = 0;
    const targetCameraPos = new THREE.Vector3(0, 0, 8);
    const targetCameraLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      frame++;
      
      // Update mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Subtle rotations
      starField.rotation.y = frame * 0.0002;
      starField.rotation.x = frame * 0.0001;

      // Animate AI Core
      if (aiCore) {
        aiCore.rotation.y = frame * 0.005;
        aiCore.rotation.z = frame * 0.002;
        innerSphere.rotation.x = frame * 0.008;
        rings.forEach((ring, idx) => {
          ring.rotation.x += 0.002 * (idx + 1);
          ring.rotation.y -= 0.003 * (idx + 1);
        });
        coreParticles.rotation.z -= 0.003;
      }

      // Animate Tech Skill Galaxy
      if (skillGalaxy) {
        skillGalaxy.rotation.y = frame * 0.001; // Entire galaxy rot
        // Rotate planets on pivot axes
        skillGalaxy.children.forEach(child => {
          if (child instanceof THREE.Group && child !== sun) {
            // Find planet child mesh
            child.children.forEach(cPlanet => {
              if (cPlanet instanceof THREE.Mesh) {
                cPlanet.rotation.y += 0.01;
              }
            });
            // Rotate pivot representing orbital movement
            child.rotation.y += 0.003;
          }
        });
        sun.rotation.y -= 0.005;
      }

      // Animate Timeline Stations
      if (timelineGroup) {
        timelineGroup.children.forEach(child => {
          if (child instanceof THREE.Group) {
            // Rotate octahedron station
            child.children[0].rotation.y += 0.008;
            child.children[0].rotation.x += 0.004;
            // Oscillate floating
            child.position.y += Math.sin(frame * 0.02 + child.position.z) * 0.004;
          }
        });
      }

      // ==========================================
      // CAMERA ROUTING CONTROLLER (LERP SYSTEM)
      // ==========================================
      switch (mode) {
        case 'intro':
          targetCameraPos.set(0 + mouseRef.current.x * 1.5, 0 + mouseRef.current.y * 1.5, 8);
          targetCameraLookAt.set(0, 0, 0);
          break;
        case 'missions':
          targetCameraPos.set(-4.5 + mouseRef.current.x * 1, 2.5 + mouseRef.current.y * 1, 14);
          targetCameraLookAt.set(-1, 0.5, 0);
          break;
        case 'skills':
          // Move camera to Skill Galaxy center
          targetCameraPos.set(30 + mouseRef.current.x * 2, 0 + mouseRef.current.y * 2, 14);
          targetCameraLookAt.set(30, 0, 0);

          // Focus on specific planet if selected
          if (selectedSkill) {
            const focusedPlanet = meshesMap.get(selectedSkill);
            if (focusedPlanet) {
              const worldPos = new THREE.Vector3();
              focusedPlanet.getWorldPosition(worldPos);
              
              // Frame the selected planet nicely
              targetCameraPos.copy(worldPos).add(new THREE.Vector3(0, 0, 3));
              targetCameraLookAt.copy(worldPos);
            }
          }
          break;
        case 'timeline':
          // Find selected station coordinates
          const activeStation = TIMELINE_STATIONS[selectedTimelineIndex];
          if (activeStation) {
            const stationZOffset = activeStation.z;
            const stationCurveX = Math.sin(selectedTimelineIndex * 1.5) * 6;
            const stationCurveY = Math.cos(selectedTimelineIndex * 1.5) * 3;

            targetCameraPos.set(
              stationCurveX + mouseRef.current.x * 1,
              stationCurveY + mouseRef.current.y * 1,
              -50 + stationZOffset + 6 // Float slightly in front
            );
            targetCameraLookAt.set(stationCurveX, stationCurveY, -50 + stationZOffset);
          }
          break;
        case 'contact':
          targetCameraPos.set(4 + mouseRef.current.x * 1.5, -2 + mouseRef.current.y * 1.5, 11);
          targetCameraLookAt.set(1.5, -0.5, 0);
          break;
        default:
          targetCameraPos.set(0, 0, 8);
          targetCameraLookAt.set(0, 0, 0);
      }

      // Smooth interpolation
      camera.position.lerp(targetCameraPos, 0.05);
      
      // Interpolate lookAt target
      const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
      const lookAtLerp = new THREE.Vector3().lerpVectors(currentLookAt, targetCameraLookAt, 0.05);
      camera.lookAt(lookAtLerp);

      // Render
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Cleanup WebGL Context
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        containerRef.current?.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
      
      scene.traverse((object: any) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [mode, selectedSkill, selectedTimelineIndex]);

  // Click handler to shoot raycast for planets
  const handleContainerClick = (e: React.MouseEvent) => {
    if (!cameraRef.current || !sceneRef.current || !onPlanetClick) return;

    // Calculate mouse raycast positions
    const rect = rendererRef.current?.domElement.getBoundingClientRect();
    if (!rect) return;
    const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mx, my), cameraRef.current);

    // Get intersections of planets
    const targetMeshes: THREE.Object3D[] = [];
    planetMeshesRef.current.forEach(mesh => targetMeshes.push(mesh));

    const intersects = raycaster.intersectObjects(targetMeshes);
    if (intersects.length > 0) {
      // Find the name of the intersected planet mesh
      const hitMesh = intersects[0].object as THREE.Mesh;
      let planetName = '';
      planetMeshesRef.current.forEach((mesh, name) => {
        if (mesh === hitMesh) planetName = name;
      });

      if (planetName) {
        spaceAudio.playWarp();
        onPlanetClick(planetName);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: mode === 'skills' ? 'auto' : 'none', // Only capture clicks on skills mode
      }}
    />
  );
};

export default SpaceCanvas;

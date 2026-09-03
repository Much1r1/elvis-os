import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import type { RegionId, WorldNode, RegionLandmarkType } from '../types/portfolio';
import { WORLD_TOPOLOGY_EDGES } from '../data/worldNodes';
import { playClickSound } from '../utils/audio';

interface WorldCanvasProps {
  nodes: WorldNode[];
  activeNodeId: RegionId | null;
  onSelectNode: (id: RegionId | null) => void;
  hoveredNodeId: RegionId | null;
  onHoverNode: (id: RegionId | null) => void;
}

interface ScreenNodePosition {
  id: RegionId;
  title: string;
  code: string;
  color: string;
  x: number;
  y: number;
  visible: boolean;
}

// Helper to construct region landmark 3D objects
function createRegionLandmark(landmarkType: RegionLandmarkType, colorHex: number): THREE.Group {
  const group = new THREE.Group();

  switch (landmarkType) {
    case 'organic_core': {
      // IDENTITY: Concentric glowing spheres & smooth orbital rings
      const sphereGeo = new THREE.SphereGeometry(0.35, 24, 24);
      const sphereMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.name = 'coreShape';
      group.add(sphere);

      const innerGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.85 });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      group.add(inner);

      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.015, 12, 32),
        new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.6 })
      );
      ring1.name = 'ring1';
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(0.65, 0.01, 12, 32),
        new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.4 })
      );
      ring2.name = 'ring2';
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);
      break;
    }

    case 'architectural_cube': {
      // SYSTEMS: Wireframe lattice cube enclosing an inner octahedron
      const boxGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
      const boxMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.name = 'coreShape';
      group.add(box);

      const octGeo = new THREE.OctahedronGeometry(0.32);
      const octMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.8 });
      const oct = new THREE.Mesh(octGeo, octMat);
      oct.name = 'innerShape';
      group.add(oct);

      const frameGeo = new THREE.TorusGeometry(0.58, 0.012, 4, 4);
      const frameMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.5 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.name = 'ring1';
      frame.rotation.x = Math.PI / 2;
      group.add(frame);
      break;
    }

    case 'neural_network': {
      // NEURAL CORE: Synaptic cluster of nodes interconnected
      const centralGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const centralMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.9 });
      const central = new THREE.Mesh(centralGeo, centralMat);
      central.name = 'coreShape';
      group.add(central);

      const synGroup = new THREE.Group();
      synGroup.name = 'synapses';
      const satGeo = new THREE.SphereGeometry(0.07, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true });

      const count = 6;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = 0.48;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle * 2) * 0.15;
        const z = Math.sin(angle) * radius;

        const sat = new THREE.Mesh(satGeo, satMat);
        sat.position.set(x, y, z);
        synGroup.add(sat);

        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(x, y, z));
      }
      group.add(synGroup);

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.4 });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      group.add(lines);
      break;
    }

    case 'modular_labs': {
      // PROJECT LABS: Array of floating modular blocks
      const labGroup = new THREE.Group();
      labGroup.name = 'blocks';
      const blockGeo = new THREE.BoxGeometry(0.26, 0.26, 0.26);
      const blockMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true });

      const offsets = [
        [-0.22, 0.22, 0],
        [0.22, -0.15, 0.12],
        [-0.1, -0.22, -0.18],
        [0.2, 0.2, -0.1]
      ];

      offsets.forEach(([x, y, z]) => {
        const block = new THREE.Mesh(blockGeo, blockMat);
        block.position.set(x, y, z);
        labGroup.add(block);
      });
      group.add(labGroup);

      const centerCore = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.18),
        new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.85 })
      );
      centerCore.name = 'coreShape';
      group.add(centerCore);
      break;
    }

    case 'operational_gear': {
      // WORKSTATION: Dual nested gear reticles
      const gear1 = new THREE.Mesh(
        new THREE.TorusGeometry(0.52, 0.02, 8, 32),
        new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.7 })
      );
      gear1.name = 'ring1';
      gear1.rotation.x = Math.PI / 2;
      group.add(gear1);

      const gear2 = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.015, 6, 24),
        new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true })
      );
      gear2.name = 'ring2';
      gear2.rotation.y = Math.PI / 4;
      group.add(gear2);

      const inner = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.9 })
      );
      inner.name = 'coreShape';
      group.add(inner);
      break;
    }

    case 'data_monolith': {
      // ARCHIVE: Stack of 3 glowing data disc platters
      const stackGroup = new THREE.Group();
      stackGroup.name = 'platters';
      const discGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.06, 24);
      const discMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true });

      [-0.22, 0, 0.22].forEach(y => {
        const disc = new THREE.Mesh(discGeo, discMat);
        disc.position.y = y;
        stackGroup.add(disc);
      });
      group.add(stackGroup);

      const colGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.55, 12);
      const colMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.8 });
      const col = new THREE.Mesh(colGeo, colMat);
      col.name = 'coreShape';
      group.add(col);
      break;
    }

    case 'beacon_gateway': {
      // COMMUNICATION HUB: Vertical beacon antenna spire
      const coneGeo = new THREE.ConeGeometry(0.25, 0.7, 16);
      const coneMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.name = 'coreShape';
      cone.position.y = 0.1;
      group.add(cone);

      const tipGeo = new THREE.SphereGeometry(0.1, 12, 12);
      const tipMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.9 });
      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.y = 0.5;
      group.add(tip);

      const wave1 = new THREE.Mesh(
        new THREE.RingGeometry(0.35, 0.38, 32),
        new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
      );
      wave1.name = 'ring1';
      wave1.rotation.x = Math.PI / 2;
      wave1.position.y = -0.25;
      group.add(wave1);
      break;
    }
  }

  return group;
}

export function WorldCanvas({
  nodes,
  activeNodeId,
  onSelectNode,
  hoveredNodeId,
  onHoverNode,
}: WorldCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [screenPositions, setScreenPositions] = useState<ScreenNodePosition[]>([]);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodeMeshesRef = useRef<Map<RegionId, THREE.Group>>(new Map());
  const pulseMeshesRef = useRef<{ mesh: THREE.Mesh; fromPos: THREE.Vector3; toPos: THREE.Vector3; speed: number }[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-100, -100));

  // Controls & Camera State
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ theta: 0, phi: 0.2 });
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 8.5));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Recalculate camera target position on activeNodeId change
  useEffect(() => {
    if (activeNodeId) {
      const activeNode = nodes.find(n => n.id === activeNodeId);
      if (activeNode) {
        targetLookAtRef.current.set(
          activeNode.position.x,
          activeNode.position.y,
          activeNode.position.z
        );
        targetCameraPosRef.current.set(
          activeNode.position.x * 1.15,
          activeNode.position.y * 1.15 + 0.2,
          activeNode.position.z + 3.2
        );
      }
    } else {
      targetLookAtRef.current.set(0, 0, 0);
      const theta = cameraRotationRef.current.theta;
      const phi = cameraRotationRef.current.phi;
      const dist = 8.5;
      targetCameraPosRef.current.set(
        dist * Math.sin(theta) * Math.cos(phi),
        dist * Math.sin(phi),
        dist * Math.cos(theta) * Math.cos(phi)
      );
    }
  }, [activeNodeId, nodes]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const fogExp = new THREE.FogExp2(0x05080c, 0.04);
    scene.fog = fogExp;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 8.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainPointLight = new THREE.PointLight(0x00e5ff, 2.5, 25);
    mainPointLight.position.set(0, 3, 5);
    scene.add(mainPointLight);

    const fillPointLight = new THREE.PointLight(0xa855f7, 1.5, 20);
    fillPointLight.position.set(-4, -2, 3);
    scene.add(fillPointLight);

    // Dual Spatial Grids (Floor + Ceiling Horizon)
    const floorGrid = new THREE.GridHelper(40, 50, 0x00e5ff, 0x0f172a);
    floorGrid.position.y = -4.5;
    scene.add(floorGrid);

    const ceilingGrid = new THREE.GridHelper(40, 50, 0x38bdf8, 0x0f172a);
    ceilingGrid.position.y = 6.5;
    scene.add(ceilingGrid);

    // Distant Bounding Wireframe Polyhedron
    const distantIcosaGeo = new THREE.IcosahedronGeometry(18, 1);
    const distantIcosaMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const distantPolyhedron = new THREE.Mesh(distantIcosaGeo, distantIcosaMat);
    scene.add(distantPolyhedron);

    // Background Particle Field (Layer 1: Ambient Dust, Layer 2: Glowing Data Dots)
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 40;
      particlePositions[i + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i + 2] = (Math.random() - 0.5) * 40;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // Create Landmark Meshes for all World Nodes
    const nodeMap = new Map<RegionId, THREE.Group>();
    const nodePositionsMap = new Map<RegionId, THREE.Vector3>();

    nodes.forEach(node => {
      const colorHex = parseInt(node.color.replace('#', '0x'), 16);
      const group = createRegionLandmark(node.landmarkType, colorHex);
      const pos = new THREE.Vector3(node.position.x, node.position.y, node.position.z);
      group.position.copy(pos);
      group.userData = { nodeId: node.id, colorHex };

      scene.add(group);
      nodeMap.set(node.id, group);
      nodePositionsMap.set(node.id, pos);
    });

    nodeMeshesRef.current = nodeMap;

    // Build Interconnected Topology Lines & Data Pulses
    const pulseList: { mesh: THREE.Mesh; fromPos: THREE.Vector3; toPos: THREE.Vector3; speed: number }[] = [];

    WORLD_TOPOLOGY_EDGES.forEach(edge => {
      const fromPos = nodePositionsMap.get(edge.from);
      const toPos = nodePositionsMap.get(edge.to);

      if (fromPos && toPos) {
        // Line Geometry
        const lineGeo = new THREE.BufferGeometry().setFromPoints([fromPos, toPos]);
        const lineMat = new THREE.LineDashedMaterial({
          color: 0x00e5ff,
          dashSize: 0.25,
          gapSize: 0.15,
          opacity: 0.3,
          transparent: true,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        line.computeLineDistances();
        scene.add(line);

        // Animated Traveling Data Pulse Particle
        const pulseGeo = new THREE.SphereGeometry(0.045, 8, 8);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.9,
        });
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
        scene.add(pulseMesh);

        pulseList.push({
          mesh: pulseMesh,
          fromPos,
          toPos,
          speed: edge.pulseSpeed || 1.0,
        });
      }
    });

    pulseMeshesRef.current = pulseList;

    // Render Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Slow environmental ambient movement
      particles.rotation.y = time * 0.015;
      distantPolyhedron.rotation.x = time * 0.005;
      distantPolyhedron.rotation.y = time * 0.008;

      // Dynamic Fog adjust based on viewing state
      if (scene.fog && scene.fog instanceof THREE.FogExp2) {
        const targetDensity = activeNodeId ? 0.065 : 0.04;
        scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, targetDensity, 0.05);
      }

      // Animate Region Landmark Motions
      nodeMap.forEach((group, id) => {
        const isHovered = hoveredNodeId === id;
        const isActive = activeNodeId === id;

        // Landmark specific internal rotations
        const ring1 = group.getObjectByName('ring1');
        if (ring1) ring1.rotation.z = time * 0.5;

        const ring2 = group.getObjectByName('ring2');
        if (ring2) ring2.rotation.x = time * 0.4;

        const coreShape = group.getObjectByName('coreShape');
        if (coreShape) coreShape.rotation.y = time * 0.3;

        const synapses = group.getObjectByName('synapses');
        if (synapses) synapses.rotation.z = -time * 0.3;

        const blocks = group.getObjectByName('blocks');
        if (blocks) blocks.rotation.y = time * 0.25;

        const platters = group.getObjectByName('platters');
        if (platters) platters.rotation.y = -time * 0.2;

        // Float motion offset
        const initialY = nodes.find(n => n.id === id)?.position.y ?? 0;
        group.position.y = initialY + Math.sin(time * 1.5 + group.position.x * 2) * 0.07;

        // Scale & Opacity Lerp on hover or selection
        let targetScale = 1.0;
        if (activeNodeId) {
          targetScale = isActive ? 1.25 : 0.65;
        } else if (isHovered) {
          targetScale = 1.18;
        }

        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      });

      // Animate Topology Live Data Pulses
      pulseList.forEach(pulse => {
        const progress = (time * pulse.speed * 0.6) % 1.0;
        pulse.mesh.position.lerpVectors(pulse.fromPos, pulse.toPos, progress);
      });

      // Camera lerp towards target
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPosRef.current, 0.05);
        currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
        cameraRef.current.lookAt(currentLookAtRef.current);

        // Project 3D node positions to HTML Screen Coordinates
        const newScreenPositions: ScreenNodePosition[] = [];
        nodes.forEach(node => {
          const group = nodeMap.get(node.id);
          if (group) {
            const tempV = new THREE.Vector3();
            group.getWorldPosition(tempV);
            tempV.project(cameraRef.current!);

            const x = (tempV.x * 0.5 + 0.5) * width;
            const y = (-(tempV.y * 0.5) + 0.5) * height;
            const visible = tempV.z < 1.0;

            newScreenPositions.push({
              id: node.id,
              title: node.title,
              code: node.code,
              color: node.color,
              x,
              y,
              visible,
            });
          }
        });
        setScreenPositions(newScreenPositions);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, [nodes, activeNodeId, hoveredNodeId]);

  // Drag Orbit Controls & Hover Raycasting
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeNodeId) return; // Freeze manual orbit rotation when detailed in a node
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = mountRef.current;
    if (!container) return;

    // Raycast hover calculation
    const rect = container.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (cameraRef.current && sceneRef.current) {
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children, true);

      let foundNodeId: RegionId | null = null;
      for (const hit of intersects) {
        let parent: THREE.Object3D | null = hit.object;
        while (parent && parent !== sceneRef.current) {
          if (parent.userData?.nodeId) {
            foundNodeId = parent.userData.nodeId as RegionId;
            break;
          }
          parent = parent.parent;
        }
        if (foundNodeId) break;
      }

      if (foundNodeId !== hoveredNodeId) {
        onHoverNode(foundNodeId);
        if (foundNodeId) {
          playClickSound(1100, 0.015);
        }
      }
    }

    // Camera Orbit Rotation Drag
    if (isDraggingRef.current && !activeNodeId) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cameraRotationRef.current.theta -= deltaX * 0.005;
      cameraRotationRef.current.phi = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 3, cameraRotationRef.current.phi + deltaY * 0.005)
      );

      const dist = 8.5;
      const theta = cameraRotationRef.current.theta;
      const phi = cameraRotationRef.current.phi;

      targetCameraPosRef.current.set(
        dist * Math.sin(theta) * Math.cos(phi),
        dist * Math.sin(phi),
        dist * Math.cos(theta) * Math.cos(phi)
      );

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }
  }, [activeNodeId, hoveredNodeId, onHoverNode]);

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleNodeClick = (id: RegionId) => {
    playClickSound(950, 0.03);
    onSelectNode(id);
  };

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 2D Monospace Screen Labels Overlaid on 3D Region Landmarks */}
      {screenPositions.map(pos => {
        if (!pos.visible) return null;
        const isHovered = hoveredNodeId === pos.id;
        const isActive = activeNodeId === pos.id;

        return (
          <div
            key={pos.id}
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(pos.id);
            }}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute z-10 flex flex-col items-center cursor-pointer transition-all duration-300 pointer-events-auto ${
              isActive
                ? 'scale-110 opacity-100 ring-2 ring-cyan-400 rounded-lg p-2 bg-slate-950/85 shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                : isHovered
                ? 'scale-105 opacity-100'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            {/* Target Beacon Reticle */}
            <div
              className="w-8 h-8 rounded-full border border-dashed flex items-center justify-center mb-1 transition-transform"
              style={{
                borderColor: pos.color,
                boxShadow: isHovered || isActive ? `0 0 18px ${pos.color}` : 'none',
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: pos.color }}
              />
            </div>

            {/* Region Title Tag */}
            <div className="glass-panel px-2.5 py-1 rounded text-[10px] sm:text-xs font-mono tracking-widest uppercase flex items-center gap-1.5 border border-white/10 shadow-lg">
              <span className="text-slate-400 font-normal">{pos.code}</span>
              <span className="font-bold text-slate-100">{pos.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import type { RegionId, WorldNode } from '../types/portfolio';
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
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-100, -100));

  // Controls state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ theta: 0, phi: 0.2 });
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 8.5));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Handle camera position recalculation based on activeNodeId
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
          activeNode.position.x * 1.2,
          activeNode.position.y * 1.2 + 0.3,
          activeNode.position.z + 3.8
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
    scene.fog = new THREE.FogExp2(0x05080c, 0.08);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 8.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 2, 20);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // Grid Floor / Background Plane
    const gridHelper = new THREE.GridHelper(30, 40, 0x00e5ff, 0x1e293b);
    gridHelper.position.y = -4;
    scene.add(gridHelper);

    // Background Particle Field
    const particleCount = 800;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 35;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // Create World Nodes and Connection Beams
    const nodeMap = new Map<RegionId, THREE.Group>();
    const identityNode = nodes.find(n => n.id === 'identity');

    nodes.forEach(node => {
      const group = new THREE.Group();
      group.position.set(node.position.x, node.position.y, node.position.z);
      group.userData = { nodeId: node.id };

      const colorHex = parseInt(node.color.replace('#', '0x'), 16);

      // Core Sphere
      const sphereGeo = new THREE.SphereGeometry(0.35, 24, 24);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.name = 'coreSphere';
      group.add(sphere);

      // Inner glowing core
      const innerGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.8,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      group.add(inner);

      // Outer Orbital Ring
      const ringGeo = new THREE.TorusGeometry(0.55, 0.015, 12, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.name = 'orbitalRing';
      ring.rotation.x = Math.PI / 3;
      group.add(ring);

      scene.add(group);
      nodeMap.set(node.id, group);

      // Connect each node to identity node with a subtle energy line
      if (identityNode && node.id !== 'identity') {
        const points = [
          new THREE.Vector3(identityNode.position.x, identityNode.position.y, identityNode.position.z),
          new THREE.Vector3(node.position.x, node.position.y, node.position.z)
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineDashedMaterial({
          color: colorHex,
          dashSize: 0.2,
          gapSize: 0.1,
          opacity: 0.35,
          transparent: true,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        line.computeLineDistances();
        scene.add(line);
      }
    });

    nodeMeshesRef.current = nodeMap;

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotate particle cloud gently
      particles.rotation.y = time * 0.02;

      // Animate Nodes (Pulse & Orbit)
      nodeMap.forEach((group, id) => {
        const ring = group.getObjectByName('orbitalRing');
        if (ring) {
          ring.rotation.z = time * (id === 'identity' ? 0.8 : 0.4);
        }
        const sphere = group.getObjectByName('coreSphere');
        if (sphere) {
          sphere.rotation.y = time * 0.3;
        }

        // Float motion
        const initialY = nodes.find(n => n.id === id)?.position.y ?? 0;
        group.position.y = initialY + Math.sin(time * 1.5 + group.position.x) * 0.06;
      });

      // Smooth camera interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPosRef.current, 0.05);
        currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
        cameraRef.current.lookAt(currentLookAtRef.current);

        // Project 3D node positions to 2D HTML coordinates
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

    // Handle Window Resize
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
  }, [nodes]);

  // Mouse Orbit Drag Controls & Hover Raycasting
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeNodeId) return; // Disable free rotation when viewing a node detail
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = mountRef.current;
    if (!container) return;

    // Update normalized mouse coordinates for raycasting
    const rect = container.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast hover check
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

    // Camera Rotation Dragging
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
      {/* 2D Monospace Screen Labels Overlaid on 3D Nodes */}
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
                ? 'scale-110 opacity-100 ring-2 ring-cyan-400 rounded-lg p-2 bg-slate-950/80'
                : isHovered
                ? 'scale-105 opacity-100'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            {/* Target Beacon Circle */}
            <div
              className="w-8 h-8 rounded-full border border-dashed flex items-center justify-center mb-1 transition-transform"
              style={{
                borderColor: pos.color,
                boxShadow: isHovered || isActive ? `0 0 15px ${pos.color}` : 'none',
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
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

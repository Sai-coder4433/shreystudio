import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { TextureLoader, Mesh, DoubleSide } from 'three';
import * as THREE from 'three';
import { PhotoItem } from '../types';

interface CylinderCarouselProps {
  photos: PhotoItem[];
  scrollProgress: number;
  triggerEntry: boolean;
  onEntryComplete?: () => void;
  onHoverPhoto?: (photo: PhotoItem | null) => void;
  onSelectPhoto?: (photo: PhotoItem) => void;
}

// 3D Perspective Grid Floor with Distance Fade Shader for Clean White Canvas
const GridFloorShader = {
  uniforms: {
    uColor: { value: new THREE.Color('#f8fafc') },
    uLineColor: { value: new THREE.Color('#cbd5e1') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vWorldPos;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vWorldPos;
    uniform vec3 uColor;
    uniform vec3 uLineColor;

    void main() {
      // Create grid pattern based on world coordinates
      vec2 coord = vWorldPos.xz * 0.8;
      vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
      float line = min(grid.x, grid.y);
      float c = 1.0 - min(line, 1.0);

      // Smooth distance fog/fade
      float dist = length(vWorldPos.xz);
      float fade = smoothstep(30.0, 3.5, dist);

      // Radial grid mask for crisp light gallery floor
      float alpha = c * fade * 0.35;
      if (alpha < 0.005) discard;

      vec3 finalColor = mix(uColor, uLineColor, c * 0.95);
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

function PerspectiveGridFloor() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(GridFloorShader.uniforms),
      vertexShader: GridFloorShader.vertexShader,
      fragmentShader: GridFloorShader.fragmentShader,
      transparent: true,
      side: DoubleSide,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} material={material}>
      <planeGeometry args={[80, 80, 1, 1]} />
    </mesh>
  );
}

// Custom Shader for Photo Card with 12px Rounded Corners, Crisp Thin Border & Pure Image Brightness
const PhotoCardShader = {
  uniforms: {
    uTexture: { value: null },
    uHover: { value: 0.0 },
    uBrightness: { value: 1.0 },
    uOpacity: { value: 1.0 },
    uBorderWidth: { value: 0.018 },
    uCornerRadius: { value: 0.055 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uBrightness;
    uniform float uOpacity;
    uniform float uBorderWidth;
    uniform float uCornerRadius;
    varying vec2 vUv;

    // Signed Distance Function for Rounded Rectangle
    float sdRoundedBox(in vec2 p, in vec2 b, in float r) {
      vec2 q = abs(p) - b + r;
      return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
    }

    void main() {
      vec2 uv = vUv;
      
      // Map UV [0,1] to centered coordinates [-0.5, 0.5]
      vec2 p = uv - 0.5;
      vec2 boxSize = vec2(0.5, 0.5);
      
      float dist = sdRoundedBox(p, boxSize, uCornerRadius);
      
      // Cut out outside corners smoothly (anti-aliased)
      float cornerAlpha = 1.0 - smoothstep(-0.002, 0.003, dist);
      if (cornerAlpha < 0.02) discard;

      // Calculate thin border
      float innerDist = dist + uBorderWidth;
      float isBorder = 1.0 - smoothstep(-0.003, 0.003, innerDist);

      // Sample texture
      vec4 texColor = texture2D(uTexture, uv);
      
      // Pure, vivid, un-darkened texture brightness
      vec3 finalTex = texColor.rgb * uBrightness;

      // Add subtle hover highlight
      finalTex += vec3(0.08) * uHover;

      // Mix texture with crisp clean subtle border
      vec3 finalColor = mix(finalTex, vec3(0.08, 0.08, 0.12), isBorder * 0.3);

      float finalAlpha = cornerAlpha * uOpacity;
      if (finalAlpha < 0.01) discard;

      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `,
};

const textureCache = new Map<string, THREE.Texture>();
let fallbackTexture: THREE.Texture | null = null;

function getFallbackTexture(): THREE.Texture {
  if (fallbackTexture) return fallbackTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 64, 96);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 4, 56, 88);
  }
  fallbackTexture = new THREE.CanvasTexture(canvas);
  fallbackTexture.colorSpace = THREE.SRGBColorSpace;
  return fallbackTexture;
}

interface CardMeshProps {
  photo: PhotoItem;
  index: number;
  total: number;
  radius: number;
  cardWidth: number;
  cardHeight: number;
  rotationRef: React.MutableRefObject<number>;
  entryProgressRef: React.MutableRefObject<number>;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onHoverPhoto?: (photo: PhotoItem | null) => void;
  onSelectPhoto?: (photo: PhotoItem) => void;
  justDraggedRef: React.MutableRefObject<boolean>;
}

const CardMesh: React.FC<CardMeshProps> = ({
  photo,
  index,
  total,
  radius,
  cardWidth,
  cardHeight,
  rotationRef,
  entryProgressRef,
  hoveredId,
  setHoveredId,
  onHoverPhoto,
  onSelectPhoto,
  justDraggedRef,
}) => {
  const meshRef = useRef<Mesh>(null!);
  const shadowMeshRef = useRef<Mesh>(null!);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const hoverFactor = useRef(0);
  const currentScale = useRef(1.0);

  // Load and cache texture cleanly
  useEffect(() => {
    let isMounted = true;
    if (textureCache.has(photo.url)) {
      setTexture(textureCache.get(photo.url)!);
      return;
    }

    const loader = new TextureLoader();
    loader.load(
      photo.url,
      (tex) => {
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        textureCache.set(photo.url, tex);
        if (isMounted) {
          setTexture(tex);
        }
      },
      undefined,
      () => {
        if (isMounted) {
          setTexture(getFallbackTexture());
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, [photo.url]);

  // Shader material clone for unique uniform state
  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(PhotoCardShader.uniforms),
      vertexShader: PhotoCardShader.vertexShader,
      fragmentShader: PhotoCardShader.fragmentShader,
      transparent: true,
      side: DoubleSide,
    });
    return mat;
  }, []);

  const isHovered = hoveredId === photo.id;

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Live continuous rotation from ref
    const currentRotation = rotationRef.current;

    // Calculate base angle on the cylindrical ring
    const baseAngle = (index / total) * Math.PI * 2;
    
    // Normalize angle to [-PI, PI] relative to camera front
    let currentAngle = (baseAngle + currentRotation) % (Math.PI * 2);
    if (currentAngle > Math.PI) currentAngle -= Math.PI * 2;
    if (currentAngle < -Math.PI) currentAngle += Math.PI * 2;

    // Live smooth entry progress calculation
    const rawProgress = Math.min(1.0, entryProgressRef.current);
    const easedEntry = 1.0 - Math.pow(1.0 - rawProgress, 3);

    // Cosine of angle relative to camera front (+Z)
    const cosAngle = Math.cos(currentAngle);

    // FRONT ARC MASKING: Cards visible across screen width
    const frontArcFactor = THREE.MathUtils.smoothstep(cosAngle, -0.3, 0.25);

    // Target Hover factor
    const targetHover = isHovered && frontArcFactor > 0.4 ? 1.0 : 0.0;
    hoverFactor.current = THREE.MathUtils.lerp(hoverFactor.current, targetHover, delta * 12);

    // Scale & Hover boost
    const entryScaleBoost = THREE.MathUtils.lerp(0.7, 1.0, easedEntry);
    const targetScale = entryScaleBoost * (1.0 + hoverFactor.current * 0.08);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 10);

    // INWARD CONCAVE CYLINDER ARC POSITIONS:
    const posX = Math.sin(currentAngle) * radius;
    const posZ = -Math.cos(currentAngle) * radius;

    // Card Rotation around Y to face inward towards camera line of sight
    const rotY = -currentAngle;

    // 3D Roll-up entry effect
    const rollYOffset = (1.0 - easedEntry) * -3.2;
    const rollPitch = (1.0 - easedEntry) * -0.5;

    meshRef.current.position.set(posX, rollYOffset + 0.1, posZ);
    meshRef.current.rotation.set(rollPitch, rotY, 0);
    meshRef.current.scale.set(cardWidth * currentScale.current, cardHeight * currentScale.current, 1);

    // Shadow on grid floor plane
    if (shadowMeshRef.current) {
      shadowMeshRef.current.position.set(posX, -2.38, posZ);
      shadowMeshRef.current.rotation.set(-Math.PI / 2, 0, rotY);
      shadowMeshRef.current.scale.set(cardWidth * 1.1 * currentScale.current, cardHeight * 0.4 * currentScale.current, 1);
    }

    const depthBrightness = 1.05;
    const targetOpacity = frontArcFactor * easedEntry;

    // Update shader uniforms
    if (material) {
      material.uniforms.uTexture.value = texture || getFallbackTexture();
      material.uniforms.uHover.value = hoverFactor.current;
      material.uniforms.uBrightness.value = depthBrightness;
      material.uniforms.uOpacity.value = targetOpacity;
    }
  });

  return (
    <group>
      {/* Floor Shadow Plane */}
      <mesh ref={shadowMeshRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* Main Vertical Photo Card Plane */}
      <mesh
        ref={meshRef}
        material={material}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredId(photo.id);
          onHoverPhoto?.(photo);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredId(null);
          onHoverPhoto?.(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (justDraggedRef.current) return;
          onSelectPhoto?.(photo);
        }}
      >
        <planeGeometry args={[1, 1, 16, 16]} />
      </mesh>
    </group>
  );
};

// Scene Controller managing Camera, Concave Arc Rotation, Timed Entry, Smooth Dragging
const CylinderScene: React.FC<CylinderCarouselProps> = ({
  photos,
  scrollProgress,
  triggerEntry,
  onEntryComplete,
  onHoverPhoto,
  onSelectPhoto,
}) => {
  const { camera, viewport } = useThree();
  const carouselGroupRef = useRef<THREE.Group>(null!);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Roll-in entry progress ref (0.0 -> 1.0)
  const entryProgressRef = useRef(0);
  const entryStarted = useRef(false);
  const entryFinished = useRef(false);

  // Live endless rotation angle ref
  const rotationRef = useRef(0);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const justDraggedRef = useRef(false);

  // Dense array of photos for seamless continuous panoramic ring
  const densePhotos = useMemo(() => {
    return [
      ...photos,
      ...photos.map((p) => ({ ...p, id: `${p.id}-dup1` })),
    ];
  }, [photos]);

  const isMobile = viewport.width < 6.2;
  const isTablet = viewport.width >= 6.2 && viewport.width < 10.5;

  // Responsive geometry & camera config
  const config = useMemo(() => {
    if (isMobile) {
      // Mobile: Cards are larger, closer, and visible around the subject
      return {
        radius: 5.8,
        cardWidth: 1.18,
        cardHeight: 1.72,
        camZ: 7.9,
        camY: 0.30,
        groupY: 0.18,
      };
    }
    if (isTablet) {
      return {
        radius: 7.2,
        cardWidth: 1.40,
        cardHeight: 2.05,
        camZ: 8.2,
        camY: 0.36,
        groupY: 0.26,
      };
    }
    // Laptop / Desktop:
    return {
      radius: 8.5,
      cardWidth: 1.68,
      cardHeight: 2.44,
      camZ: 7.9,
      camY: 0.38,
      groupY: 0.35,
    };
  }, [isMobile, isTablet]);

  // Touch and Pointer Drag event listeners
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastTime = 0;
    let isHorizontalGesture = false;
    let totalMoved = 0;

    const onStart = (clientX: number, clientY: number) => {
      isDragging.current = true;
      startX = clientX;
      startY = clientY;
      lastX = clientX;
      lastTime = performance.now();
      totalMoved = 0;
      isHorizontalGesture = false;
      velocity.current = 0;
    };

    const onMove = (clientX: number, clientY: number, cancelable: boolean, preventDefault?: () => void) => {
      if (!isDragging.current) return;
      const dx = clientX - lastX;
      const dy = clientY - startY;
      const totalDx = clientX - startX;
      totalMoved += Math.abs(dx);

      if (!isHorizontalGesture && (Math.abs(totalDx) > 7 || Math.abs(dy) > 7)) {
        if (Math.abs(totalDx) > Math.abs(dy) * 0.75) {
          isHorizontalGesture = true;
        } else {
          // Vertical swipe: let the page scroll naturally
          isDragging.current = false;
          return;
        }
      }

      if (isHorizontalGesture) {
        if (cancelable && preventDefault) {
          preventDefault();
        }

        const sensitivity = isMobile ? 0.0044 : 0.0024;
        const angleDelta = dx * sensitivity;
        rotationRef.current += angleDelta;

        const now = performance.now();
        const dt = Math.max(10, now - lastTime);
        const instantV = (angleDelta / dt) * 16.666;
        velocity.current = velocity.current * 0.3 + instantV * 0.7;

        lastX = clientX;
        lastTime = now;
      }
    };

    const onEnd = () => {
      if (!isDragging.current && !isHorizontalGesture) return;
      isDragging.current = false;

      if (totalMoved > 10 || isHorizontalGesture) {
        justDraggedRef.current = true;
        setTimeout(() => {
          justDraggedRef.current = false;
        }, 250);
      }

      // Clamp max release velocity for natural flick momentum
      velocity.current = Math.max(-0.06, Math.min(0.06, velocity.current));
      isHorizontalGesture = false;
    };

    // Pointer events for desktop mouse / pen
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest('button') || target?.closest('a') || target?.closest('nav')) return;
      onStart(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      onMove(e.clientX, e.clientY, e.cancelable, () => e.preventDefault());
    };

    const handlePointerUp = () => {
      onEnd();
    };

    // Touch events for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const target = e.target as HTMLElement;
        if (target?.closest('button') || target?.closest('a') || target?.closest('nav')) return;
        onStart(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        onMove(touch.clientX, touch.clientY, e.cancelable, () => {
          if (e.cancelable) e.preventDefault();
        });
      }
    };

    const handleTouchEnd = () => {
      onEnd();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isMobile]);

  // Fast auto-entry failsafe: starts roll-in after 150ms so background photos appear immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      entryStarted.current = true;
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useFrame((_, delta) => {
    // Fast, crisp roll-in entry (reaches full height in ~0.8s instead of 1.8s)
    if ((triggerEntry || entryStarted.current) && !entryFinished.current) {
      entryStarted.current = true;
      entryProgressRef.current += delta / 0.8;
      if (entryProgressRef.current >= 1.0) {
        entryProgressRef.current = 1.0;
        entryFinished.current = true;
        onEntryComplete?.();
      }
    }

    // Clamp delta to prevent sudden jump during frame drops or tab unfocus
    const dt = Math.min(delta, 0.04);

    // Continuous ambient drift (1 full revolution every 35s - lively, energetic & smooth)
    const baseAutoSpeed = (Math.PI * 2) / 35;

    if (!isDragging.current) {
      // Natural momentum inertia decay after swipe/flick
      velocity.current *= 0.95;
      if (Math.abs(velocity.current) < 0.00005) {
        velocity.current = 0;
      }
      // Always rotate endlessly frame by frame
      rotationRef.current += dt * baseAutoSpeed + velocity.current;
    }

    // Camera positioning tailored for laptop vs mobile
    camera.position.set(0, config.camY, config.camZ);
    camera.lookAt(0, -0.2, -6.0);
  });

  return (
    <group ref={carouselGroupRef} position={[0, config.groupY, 0]}>
      {/* 3D Perspective Grid Floor */}
      <PerspectiveGridFloor />

      {/* Concave Cylindrical Photo Cards */}
      {densePhotos.map((photo, index) => (
        <CardMesh
          key={photo.id}
          photo={photo}
          index={index}
          total={densePhotos.length}
          radius={config.radius}
          cardWidth={config.cardWidth}
          cardHeight={config.cardHeight}
          rotationRef={rotationRef}
          entryProgressRef={entryProgressRef}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          onHoverPhoto={onHoverPhoto}
          onSelectPhoto={onSelectPhoto}
          justDraggedRef={justDraggedRef}
        />
      ))}
    </group>
  );
};

export const CylinderCarousel: React.FC<CylinderCarouselProps> = ({
  photos,
  scrollProgress,
  triggerEntry,
  onEntryComplete,
  onHoverPhoto,
  onSelectPhoto,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none pointer-events-auto z-10 touch-pan-y">
      <Canvas
        camera={{ position: [0, 0.4, 8.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={2.0} />
        <directionalLight position={[0, 10, 10]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-10, 5, -5]} intensity={0.6} color="#ffffff" />
        <CylinderScene
          photos={photos}
          scrollProgress={scrollProgress}
          triggerEntry={triggerEntry}
          onEntryComplete={onEntryComplete}
          onHoverPhoto={onHoverPhoto}
          onSelectPhoto={onSelectPhoto}
        />
      </Canvas>
    </div>
  );
};

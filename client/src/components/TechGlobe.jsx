import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * All skill / tool logos — real CDN SVGs.
 */
const TECH_ITEMS = [
  { name: "Python",          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "JavaScript",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "C++",             logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java",            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "React",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Node.js",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invertDark: true },
  { name: "MongoDB",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "SQL",             logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "Tailwind CSS",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git",             logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub",          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invertDark: true },
  { name: "VS Code",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Pandas",          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "NumPy",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
  { name: "Matplotlib",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
  { name: "scikit-learn",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Power BI",        logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
  { name: "MySQL",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Postman",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "HTML5",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3",            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "Figma",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Seaborn",         logo: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
  { name: "Redux",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" },
  { name: "Docker",          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "LeetCode",        logo: "https://cdn.simpleicons.org/leetcode/FFA116" },
  { name: "GeeksforGeeks",   logo: "https://cdn.simpleicons.org/geeksforgeeks/2F8D46" },
];

/* ── Fibonacci sphere: evenly distributes N points on a sphere ── */
/* Uses (i + 0.5) offset so no point lands exactly at a pole       */
function fibonacciSphere(count) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - ((i + 0.5) / count) * 2;   // offset avoids poles
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push({ x, y, z });
  }
  return points;
}

export function TechGlobe({ size = 420 }) {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const pointsRef = useRef(fibonacciSphere(TECH_ITEMS.length));
  const rotationRef = useRef({ x: -0.25, y: 0 }); // slight tilt for 3D depth
  const velocityRef = useRef({ x: 0, y: 0.003 }); // continuous left-to-right rotation
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, name: "", x: 0, y: 0 });

  const radius = size * 0.42; // sphere radius — icons sit ON the sphere surface

  /* ── Rotate a point around X and Y axes ── */
  const project = useCallback((point, rotX, rotY) => {
    // Rotate around Y axis (left-right)
    let x = point.x * Math.cos(rotY) - point.z * Math.sin(rotY);
    let z = point.x * Math.sin(rotY) + point.z * Math.cos(rotY);
    let y = point.y;

    // Rotate around X axis (tilt)
    const y2 = y * Math.cos(rotX) - z * Math.sin(rotX);
    const z2 = y * Math.sin(rotX) + z * Math.cos(rotX);

    return { x, y: y2, z: z2 };
  }, []);

  /* ── Animation loop ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".globe-item");

    function animate() {
      const rot = rotationRef.current;
      const vel = velocityRef.current;

      if (!draggingRef.current) {
        rot.y += vel.y;
        rot.x += vel.x;
        // Dampen x velocity toward 0 (auto-rotate is only Y for left-to-right)
        vel.x *= 0.96;
        // Gently restore Y velocity to auto-rotate speed
        vel.y += (0.003 - vel.y) * 0.01;
      }

      const points = pointsRef.current;
      for (let i = 0; i < points.length; i++) {
        const p = project(points[i], rot.x, rot.y);

        // z ranges from -1 to 1 after rotation
        const zNorm = (p.z + 1) / 2; // 0 (back) → 1 (front)

        // ── FRONT vs BACK differentiation ──
        // Front items: full size & opacity. Back items: smaller, faded
        const scale = 0.5 + 0.5 * zNorm;           // 0.5 → 1.0
        const opacity = 0.15 + 0.85 * zNorm;       // 0.15 (very faded back) → 1.0 (full front)
        const blur = zNorm < 0.3 ? (0.3 - zNorm) * 3 : 0; // subtle blur for far back items
        const zIndex = Math.round(zNorm * 100);

        const px = p.x * radius;
        const py = p.y * radius;

        const item = items[i];
        if (item) {
          item.style.transform = `translate(${px}px, ${py}px) scale(${scale})`;
          item.style.opacity = opacity;
          item.style.zIndex = zIndex;
          item.style.filter = blur > 0.2 ? `blur(${blur}px)` : "none";
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [radius, project]);

  /* ── Pointer handlers for drag interaction ── */
  const handlePointerDown = useCallback((e) => {
    draggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    containerRef.current?.setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    rotationRef.current.y += dx * 0.005;
    rotationRef.current.x += dy * 0.005;

    // Store velocity for momentum after release (gentle)
    velocityRef.current = { x: dy * 0.0008, y: dx * 0.0008 };
  }, []);

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  /* ── Tooltip on hover ── */
  const handleItemEnter = useCallback((e, name) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      name,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 30,
    });
  }, []);

  const handleItemMove = useCallback((e, name) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 30,
    }));
  }, []);

  const handleItemLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="tech-globe-container"
      style={{ width: size, height: size }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Subtle sphere boundary ring */}
      <div className="globe-sphere-ring" style={{
        width: radius * 2 + 20,
        height: radius * 2 + 20,
      }} />

      {TECH_ITEMS.map((tech, i) => (
        <div
          key={tech.name}
          className="globe-item"
          onMouseEnter={(e) => handleItemEnter(e, tech.name)}
          onMouseMove={(e) => handleItemMove(e, tech.name)}
          onMouseLeave={handleItemLeave}
        >
          <img
            src={tech.logo}
            alt={tech.name}
            className={`globe-logo${tech.invertDark ? " globe-logo-invert" : ""}`}
            draggable={false}
          />
        </div>
      ))}

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="globe-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}

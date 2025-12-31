"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroContainerSVG() {
  const [svgContent, setSvgContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Inject CSS animations
    const styleId = "hero-svg-animations";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUpWithPause {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          13.04% {
            opacity: 1;
            transform: translateY(0);
          }
          13.05%, 100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes lineFill {
          to {
            stroke-dashoffset: 0;
          }
        }

        .fade-up {
          animation: fadeUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .line-fill {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: lineFill 1s ease-out forwards;
        }

        /* Main animation */
        #Main {
          animation: fadeUp 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }

        /* Dragging animations */
        #Dragging-Content-Line-1, #Dragging-Content-Line-2, #Dragging-Content-Line-3 {
          animation: fadeUpWithPause 4.6s ease-out 0.3s both;
          opacity: 0;
        }

        #Dragging-Cursor {
          animation: fadeUp 0.6s ease-out 0.5s forwards;
          opacity: 0;
        }

        #Dragging-Cursor-Title {
          animation: fadeUp 0.6s ease-out 0.7s forwards;
          opacity: 0;
        }

        /* Variable animations */
        #Variable-AI-Text-Block {
          animation: fadeUp 0.6s ease-out 0.9s forwards;
          opacity: 0;
        }

        #Variable-AI-Image-Block {
          animation: fadeUp 0.6s ease-out 1.1s forwards;
          opacity: 0;
        }

        /* Element animations */
        #Element-1 {
          animation: fadeUp 0.6s ease-out 1.3s forwards;
          opacity: 0;
        }

        #Element-2 {
          animation: fadeUp 0.6s ease-out 1.4s forwards;
          opacity: 0;
        }

        #Element-3 {
          animation: fadeUp 0.6s ease-out 1.5s forwards;
          opacity: 0;
        }

        #Element-4 {
          animation: fadeUp 0.6s ease-out 1.6s forwards;
          opacity: 0;
        }

        /* Line and Block animations - stroke-dasharray will be set via JS */
        #Line-1 {
          animation: lineFill 1s ease-out 1.8s forwards;
        }

        #Block-1 {
          animation: fadeIn 0.6s ease-out 2.8s forwards;
          opacity: 0;
        }

        #Line-2 {
          animation: lineFill 1s ease-out 2s forwards;
        }

        #Block-2 {
          animation: fadeIn 0.6s ease-out 3s forwards;
          opacity: 0;
        }

        #Line-3 {
          animation: lineFill 1s ease-out 2.2s forwards;
        }

        #Block-3 {
          animation: fadeIn 0.6s ease-out 3.2s forwards;
          opacity: 0;
        }

        #Line-4 {
          animation: lineFill 1s ease-out 2.4s forwards;
        }

        #Block-4 {
          animation: fadeIn 0.6s ease-out 3.4s forwards;
          opacity: 0;
        }

        #Line-5 {
          animation: lineFill 1s ease-out 2.6s forwards;
        }

        #Block-5 {
          animation: fadeIn 0.6s ease-out 3.6s forwards;
          opacity: 0;
        }

        #Line-6 {
          animation: lineFill 1s ease-out 2.8s forwards;
        }

        #Block-6, #Block-6-bg, #Block-6-text {
          animation: fadeIn 0.6s ease-out 3.8s forwards;
          opacity: 0;
        }

        img[src*="hero-container.svg"],
        img[alt="hero container"] {
          animation: fadeIn 1s ease-out;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `;
      document.head.appendChild(style);
    }

    // Try hero-container.svg first, fallback to hero-illustration.svg
    fetch("/hero-container.svg")
      .then((res) => {
        if (!res.ok) {
          // Fallback to hero-illustration.svg
          return fetch("/hero-container.svg");
        }
        return res;
      })
      .then((res) => res.text())
      .then((text) => {
        // Parse and modify the SVG to add className
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svgElement = doc.documentElement;

        svgElement.setAttribute("class", "w-full h-full object-contain");
        svgElement.setAttribute("style", "position: absolute; inset: 0;");

        // Calculate actual path lengths for lines
        const calculatePathLength = (pathElement: SVGPathElement): number => {
          try {
            return pathElement.getTotalLength();
          } catch {
            // Fallback: estimate based on viewBox or use a default
            return 1000;
          }
        };

        // Apply line animations with calculated lengths
        const lines = ["Line-1", "Line-2", "Line-3", "Line-4", "Line-5", "Line-6"];
        let foundLines = 0;
        lines.forEach((lineId) => {
          const lineElement = doc.getElementById(lineId);
          if (lineElement && lineElement instanceof SVGPathElement) {
            const length = calculatePathLength(lineElement);
            lineElement.style.strokeDasharray = `${length}`;
            lineElement.style.strokeDashoffset = `${length}`;
            foundLines++;
          }
        });

        // Ensure all animated elements have initial opacity set
        const animatedElements = [
          "Main",
          "Dragging-Content-Line-1",
          "Dragging-Content-Line-2",
          "Dragging-Content-Line-3",
          "Dragging-Cursor",
          "Dragging-Cursor-Title",
          "Variable-AI-Text-Block",
          "Variable-AI-Image-Block",
          "Element-1",
          "Element-2",
          "Element-3",
          "Element-4",
          "Block-1",
          "Block-2",
          "Block-3",
          "Block-4",
          "Block-5",
          "Block-6",
          "Block-6-bg",
          "Block-6-text",
        ];

        let foundElements = 0;
        animatedElements.forEach((elementId) => {
          const element = doc.getElementById(elementId);
          if (element) {
            element.style.opacity = "0";
            foundElements++;
          }
        });

        // Debug: log if elements are missing
        if (foundElements === 0 && foundLines === 0) {
          console.warn("HeroContainerSVG: No animation elements found. The SVG may not have the required IDs (Main, Line-1, Block-1, etc.). Animation may not work.");
        } else {
          console.log(`HeroContainerSVG: Found ${foundElements} animated elements and ${foundLines} lines`);
        }

        setSvgContent(svgElement.outerHTML);
      })
      .catch((err) => {
        console.error("Failed to load SVG:", err);
        // Try fallback
        fetch("/hero-illustration.svg")
          .then((res) => res.text())
          .then((text) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "image/svg+xml");
            const svgElement = doc.documentElement;
            svgElement.setAttribute("class", "w-full h-full object-contain");
            svgElement.setAttribute("style", "position: absolute; inset: 0;");
            setSvgContent(svgElement.outerHTML);
          })
          .catch((fallbackErr) => console.error("Failed to load fallback SVG:", fallbackErr));
      });

    // Cleanup function
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Start animation loop when SVG content is loaded
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    // Function to restart all animations
    const restartAnimations = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const svg = container.querySelector("svg");
      if (!svg) return;

      // Total animation duration calculation:
      // Dragging-Content-Line animations: 0.3s delay + 4.6s duration (0.6s animation + 4s pause) = 4.9s total
      // Last block animation ends at: 3.8s + 0.6s = 4.4s
      // Wait for the longest animation to complete including pause: 4.9s + small buffer = 5.2s
      const totalDuration = 5200; // 5.2 seconds in milliseconds to ensure pause completes before restart

      // Reset all animated elements
      const animatedElementIds = [
        "Main",
        "Dragging-Content-Line-1",
        "Dragging-Content-Line-2",
        "Dragging-Content-Line-3",
        "Dragging-Cursor",
        "Dragging-Cursor-Title",
        "Variable-AI-Text-Block",
        "Variable-AI-Image-Block",
        "Element-1",
        "Element-2",
        "Element-3",
        "Element-4",
        "Block-1",
        "Block-2",
        "Block-3",
        "Block-4",
        "Block-5",
        "Block-6",
        "Block-6-bg",
        "Block-6-text",
      ];

      const lines = ["Line-1", "Line-2", "Line-3", "Line-4", "Line-5", "Line-6"];

      // Reset all elements to initial state
      // Elements with fadeUp animation need transform reset
      const fadeUpElements = [
        "Main",
        "Dragging-Content-Line-1",
        "Dragging-Content-Line-2",
        "Dragging-Content-Line-3",
        "Dragging-Cursor",
        "Dragging-Cursor-Title",
        "Variable-AI-Text-Block",
        "Variable-AI-Image-Block",
        "Element-1",
        "Element-2",
        "Element-3",
        "Element-4",
      ];

      // Elements with fadeIn animation (just opacity)
      const fadeInElements = [
        "Block-1",
        "Block-2",
        "Block-3",
        "Block-4",
        "Block-5",
        "Block-6",
        "Block-6-bg",
        "Block-6-text",
      ];

      // Reset fadeUp elements (with transform)
      fadeUpElements.forEach((id) => {
        const element = svg.getElementById(id);
        if (element && element instanceof SVGElement) {
          element.style.animation = "none";
          element.style.opacity = "0";
          element.style.transform = "translateY(20px)";

          // Force reflow
          if (element instanceof HTMLElement) {
            void element.offsetHeight;
          } else if ("getBBox" in element && typeof element.getBBox === "function") {
            // For SVG elements that support getBBox
            try {
              void element.getBBox();
            } catch {
              // Ignore if getBBox fails
            }
          }

          // Restore animation
          element.style.animation = "";
        }
      });

      // Reset fadeIn elements (opacity only)
      fadeInElements.forEach((id) => {
        const element = svg.getElementById(id);
        if (element && element instanceof SVGElement) {
          element.style.animation = "none";
          element.style.opacity = "0";

          // Force reflow
          if (element instanceof HTMLElement) {
            void element.offsetHeight;
          } else if ("getBBox" in element && typeof element.getBBox === "function") {
            // For SVG elements that support getBBox
            try {
              void element.getBBox();
            } catch {
              // Ignore if getBBox fails
            }
          }

          // Restore animation
          element.style.animation = "";
        }
      });

      // Reset lines
      lines.forEach((id) => {
        const lineElement = svg.getElementById(id);
        if (lineElement && lineElement instanceof SVGPathElement) {
          try {
            const length = lineElement.getTotalLength();
            lineElement.style.animation = "none";
            lineElement.style.strokeDasharray = `${length}`;
            lineElement.style.strokeDashoffset = `${length}`;

            // Force reflow - SVGPathElement doesn't have offsetHeight, use getBBox instead
            lineElement.getBBox();

            // Restore animation
            lineElement.style.animation = "";
          } catch (e) {
            // Ignore errors
          }
        }
      });

      // Schedule next restart
      animationTimeoutRef.current = setTimeout(() => {
        restartAnimations();
      }, totalDuration);
    };

    // Wait for SVG to be rendered, then start the loop
    const timeout = setTimeout(() => {
      restartAnimations();
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [svgContent]);

  if (!svgContent) {
    return null;
  }

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
}


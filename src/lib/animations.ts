
import { useEffect } from "react";

export const useRevealAnimation = () => {
  useEffect(() => {
    // Select all elements with data-reveal attribute
    const reveals = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.add("opacity-100");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    reveals.forEach((reveal) => {
      // Initially hide elements
      reveal.classList.add("opacity-0");
      observer.observe(reveal);
    });

    return () => {
      reveals.forEach((reveal) => {
        observer.unobserve(reveal);
      });
    };
  }, []);
};

export const staggeredAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

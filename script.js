import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const smoothStep = (p) => p * p * (3 - 2 * p);

  if (window.innerWidth > 1000) {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "75% top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const heroCardsContainerOpacity = gsap.utils.interpolate(
          1,
          0.5,
          smoothStep(progress)
        );
        gsap.set(".hero-cards", {
          opacity: heroCardsContainerOpacity,
        });

        ["#hero-card-1", "#hero-card-2", "#hero-card-3", "#hero-card-4", "#hero-card-5","#hero-card-6"].forEach(
          (cardId, index) => {
            const delay = index * 0.9;
            const cardProgress = gsap.utils.clamp(
              0,
              1,
              (progress - delay * 0.1) / (1 - delay * 0.1)
            );

            const y = gsap.utils.interpolate(
              "0%",
              "350%",
              smoothStep(cardProgress)
            );
            const scale = gsap.utils.interpolate(
              1,
              0.75,
              smoothStep(cardProgress)
            );

            const spreadX = ["180%", "108%", "36%", "-36%", "-108%", "-180%"]; // 👈 추가: 카드 수에 따라 좌우 위치 지정
            const spreadRotate = [-18, -10.8, -3.6, 3.6, 10.8, 18];          // 👈 추가: 카드 수에 따라 회전 지정

            let x = gsap.utils.interpolate("0%", spreadX[index], smoothStep(cardProgress)); // 👈 수정함
            let rotation = gsap.utils.interpolate(0, spreadRotate[index], smoothStep(cardProgress));
            

            gsap.set(cardId, {
              y: y,
              x: x,
              rotation: rotation,
              scale: scale,
            });
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: ".services",
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      pin: ".services",
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: ".services",
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      onLeave: () => {
        const servicesSection = document.querySelector(".services");
        const servicesRect = servicesSection.getBoundingClientRect();
        const servicesTop = window.pageYOffset + servicesRect.top;

        gsap.set(".cards", {
          position: "absolute",
          top: servicesTop,
          left: 0,
          width: "100vw",
          height: "100vh",
        });
      },
      onEnterBack: () => {
        gsap.set(".cards", {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".services",
      start: "top bottom",
      end: `+=${window.innerHeight * 4}`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const headerProgress = gsap.utils.clamp(0, 1, progress / 0.9);
        const headerY = gsap.utils.interpolate(
          "400%",
          "0%",
          smoothStep(headerProgress)
        );
        gsap.set(".services-header", {
          y: headerY,
        });

        ["#card-1", "#card-2", "#card-3", "#card-4", "#card-5", "#card-6"].forEach((cardId, index) => {
          const delay = index * 0.5;
          const cardProgress = gsap.utils.clamp(
            0,
            1,
            (progress - delay * 0.1) / (0.9 - delay * 0.1)
          );

          const innerCard = document.querySelector(
            `${cardId} .flip-card-inner`
          );

          let y;
          if (cardProgress < 0.4) {
            const normalizedProgress = cardProgress / 0.4;
            y = gsap.utils.interpolate(
              "-100%",
              "50%",
              smoothStep(normalizedProgress)
            );
          } else if (cardProgress < 0.6) {
            const normalizedProgress = (cardProgress - 0.4) / 0.2;
            y = gsap.utils.interpolate(
              "50%",
              "0%",
              smoothStep(normalizedProgress)
            );
          } else {
            y = "0%";
          }

          let scale;
          if (cardProgress < 0.4) {
            const normalizedProgress = cardProgress / 0.4;
            scale = gsap.utils.interpolate(
              0.25,
              0.75,
              smoothStep(normalizedProgress)
            );
          } else if (cardProgress < 0.6) {
            const normalizedProgress = (cardProgress - 0.4) / 0.2;
            scale = gsap.utils.interpolate(
              0.75,
              1,
              smoothStep(normalizedProgress)
            );
          } else {
            scale = 1;
          }

          let opacity;
          if (cardProgress < 0.2) {
            const normalizedProgress = cardProgress / 0.2;
            opacity = smoothStep(normalizedProgress);
          } else {
            opacity = 1;
          }

            const spreadX = ["250%", "150%", "50%", "-50%", "-150%", "-250%"];  // 카드들이 펼쳐질 위치
            const spreadRotate = [-10, -6, 2, -2, 6, 10];      


          let x, rotate, rotationY;
          if (cardProgress < 0.6) {
            x = spreadX[index];
            rotate = spreadRotate[index];
            rotationY = 0;
          } else if (cardProgress < 1) {
              const normalized = smoothStep((cardProgress - 0.6) / 0.4);
              x = gsap.utils.interpolate(spreadX[index], "0%", normalized);
              rotate = gsap.utils.interpolate(spreadRotate[index], 0, normalized);
              rotationY = normalized * 180;
          } else {
            x = "0%";
            rotate = 0;
            rotationY = 180;
          }

          gsap.set(cardId, {
            opacity: opacity,
            y: y,
            x: x,
            rotate: rotate,
            scale: scale,
          });

          gsap.set(innerCard, {
            rotationY: rotationY,
          });
        });
      },
    });
  }
});

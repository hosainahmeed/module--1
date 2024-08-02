document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector("#main-scroll-container");

  const locomotiveScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
  });

  gsap.registerPlugin(ScrollTrigger);

  locomotiveScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locomotiveScroll.scrollTo(value, 0, 0)
        : locomotiveScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update());
  ScrollTrigger.refresh();

  let pages = document.querySelectorAll(".page");

  pages.forEach((e) => {
    ScrollTrigger.create({
      trigger: e,
      scroller: scrollContainer,
      start: "top center",
      end: "bottom center",
      // markers:true,
      onEnter: function () {
        document.body.setAttribute("theme", e.dataset.color);
      },
      onEnterBack: function () {
        document.body.setAttribute("theme", e.dataset.color);
      },
    });
  });

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page",
      scroller: scrollContainer,
      start: "top top",
      end: "center top",
      scrub: 1,
      // markers: true,
      pin: true,
      pinSpacing: false,
    },
  });

  gsap.to(".child", {
    y: 0,
    stagger: 0.1,
    opacity: 1,
  });
  tl.to(
    ".craft",
    {
      duration: 1,
      x: "-110%",
      opacity: 0,
      stagger: 0.5,
    },
    "1"
  );

  let textAnimates = document.querySelectorAll(".parent2");

  textAnimates.forEach((textAnimate) => {
    let textSplit = textAnimate.textContent.split("");
    let textCon = "";
    textSplit.forEach((e) => {
      if (e === " ") {
        textCon += `<span class="breakText">&nbsp;</span>`;
      } else {
        textCon += `<span class="breakText">${e}</span>`;
      }
    });

    textAnimate.innerHTML = textCon;
  });

  gsap.from(".breakText", {
    display: "inline-block",
    opacity: 0,
    y: "100%",
    stagger: 0.03,
    duration: 1,
  });
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({
    trigger: ".two",
    scroller: ".main",
    start: "top top",
    end: "150% 50%",
    // markers: true,
    scrub: true,
    pin: true,
    animation: gsap.to(".ldbg", {
      width: "95%",
      duration: 1,
    }),
  });

  let pDive = document.querySelectorAll(".pDive p");
        let pArray = Array.from(pDive);

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        let shuffledPArray = shuffle(pArray);

        gsap.registerPlugin(ScrollTrigger);
        let tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: ".three",
                scroller: ".main",
                start: "top top",
                end: "100% 50%",
                markers: true,
                scrub: true,
                pin: true,
            }
        });

        shuffledPArray.forEach((p, index) => {
            tl1.fromTo(p, {opacity: 0}, {opacity: 1, duration: 1}, index * 0.5);
        });
});

gsap.registerPlugin(ScrollTrigger);

const progress=document.getElementById("progress");
const navLinks=document.querySelector(".nav-links");
const menu=document.getElementById("menu");
const heroCup=document.getElementById("heroCup");
const journey=document.querySelector(".journey");
const journeyCup=document.getElementById("journeyCup");
const orbit=document.getElementById("journeyOrbit");
const sceneYear=document.getElementById("sceneYear");
const scenes=[...document.querySelectorAll(".scene")];
const dots=[...document.querySelectorAll(".dots i")];
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

menu.addEventListener("click",()=>navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max?scrollY/max*100:0)+"%";
},{passive:true});

if(!reduce){
  gsap.to(".ring-a",{rotation:360,duration:24,repeat:-1,ease:"none"});
  gsap.to(".ring-b",{rotation:-360,duration:16,repeat:-1,ease:"none"});

  gsap.to(heroCup,{
    y:-12,
    rotation:1.5,
    duration:2.8,
    yoyo:true,
    repeat:-1,
    ease:"sine.inOut"
  });

  gsap.timeline({
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:true
    }
  })
  .to(".hero-year",{x:140,scale:1.12},0)
  .to(".hero-copy",{y:-90,opacity:.2},0)
  .to(heroCup,{y:-120,scale:.86,rotation:7},0)
  .to(".ring-a",{scale:1.22,opacity:.25},0)
  .to(".ring-b",{scale:.76,opacity:.2},0);

  const labels=["1971","1981","1983","1987"];
  let last=-1;

  ScrollTrigger.create({
    trigger:journey,
    start:"top top",
    end:"bottom bottom",
    scrub:true,
    onUpdate:self=>{
      const idx=Math.min(3,Math.floor(self.progress*4));
      const local=self.progress*4-idx;

      if(idx!==last){
        last=idx;
        scenes.forEach((s,i)=>{
          s.classList.toggle("active",i===idx);
          gsap.to(s,{opacity:i===idx?1:0,y:i===idx?0:28,duration:.35,overwrite:true});
        });
        dots.forEach((d,i)=>d.classList.toggle("active",i===idx));
        sceneYear.textContent=labels[idx];
        gsap.fromTo(sceneYear,{opacity:.08,scale:.96},{opacity:1,scale:1,duration:.4});
      }

      gsap.set(journeyCup,{
        rotation:-8+self.progress*22,
        scale:1+Math.sin(local*Math.PI)*.12
      });
      gsap.set(orbit,{rotation:self.progress*220});
      gsap.set(sceneYear,{x:(self.progress-.5)*120});
    }
  });

  gsap.to(".big-6750",{
    x:80,
    rotation:-3,
    scrollTrigger:{trigger:".philippines",start:"top bottom",end:"bottom top",scrub:true}
  });
  gsap.from(".philippines-copy",{
    x:80,
    opacity:0,
    scrollTrigger:{trigger:".philippines",start:"top 72%",end:"top 35%",scrub:true}
  });

  gsap.to(".coffee",{x:140,scrollTrigger:{trigger:".words",start:"top bottom",end:"bottom top",scrub:true}});
  gsap.to(".craft",{x:-120,scrollTrigger:{trigger:".words",start:"top bottom",end:"bottom top",scrub:true}});
  gsap.to(".connection",{x:180,scrollTrigger:{trigger:".words",start:"top bottom",end:"bottom top",scrub:true}});
  gsap.to(".center-cup",{rotation:8,scale:1.08,scrollTrigger:{trigger:".words",start:"top 70%",end:"bottom 30%",scrub:true}});

  gsap.fromTo(".final-ring",{scale:.55,rotation:-40},{scale:1.08,rotation:30,scrollTrigger:{trigger:".finale",start:"top bottom",end:"center center",scrub:true}});
}

function pulseCup(){
  if(reduce)return;
  gsap.fromTo(heroCup,{scale:1},{scale:1.1,duration:.18,yoyo:true,repeat:1,ease:"power2.out"});
  gsap.fromTo(".cup-glow",{scale:.4,opacity:.8},{scale:2.5,opacity:0,duration:.8,ease:"power2.out"});
}
heroCup.addEventListener("click",pulseCup);
heroCup.addEventListener("keydown",e=>{
  if(e.key==="Enter"||e.key===" "){e.preventDefault();pulseCup();}
});

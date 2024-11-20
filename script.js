function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true
    });
    const backToTheTop = document.querySelector(".backToTheTop");
    backToTheTop.addEventListener("click",()=>{
        locoScroll.scrollTo(0)
    })
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotive()


function menuAnimation() {
    let phoneMenu = document.querySelector(".phone-menu");
    let menuIcon = document.querySelector("#menuIcon");
    let closeIcon = document.querySelector(".inner-menu i")

    let tl = gsap.timeline()
    tl.to(phoneMenu, {
        x: 0,
        duration: 1
    })
    tl.to(".inner-menu", {
        x: 0,
        duration: 1
    }, "-=.8")
    tl.from(".inner-menu i", {
        opacity: 0,
        duration: .4
    })
    tl.from(".inner-menu a", {
        x: 50,
        opacity: 0,
        duration: .6,
        stagger: .2
    }, "-=.7")

    tl.pause()

    menuIcon.addEventListener("click", () => {
        tl.play()
    })
    closeIcon.addEventListener("click", () => {
        tl.reverse()
    })
}

function marqueAnimation() {
    window.addEventListener("wheel", (dets) => {
        if (dets.deltaY > 0) {
            gsap.to(".line", {
                transform: "translateX(calc(-200% - 64px))",
                duration: 7,
                repeat: -1,
                ease: "linear"
            });
        }
        else {
            gsap.to(".line", {
                transform: "translateX(calc(0% - 64px))",
                duration: 7,
                repeat: -1,
                ease: "linear"
            });
        }
    });
}

Shery.mouseFollower({
    skew: false,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
});
Shery.imageEffect(".work-images-box", {
    style: 6,
    gooey: true,
    config: { "noiseDetail": { "value": 6.87, "range": [0, 100] }, "distortionAmount": { "value": 0.38, "range": [0, 10] }, "scale": { "value": 36.36, "range": [0, 100] }, "speed": { "value": 0.79, "range": [0, 1] }, "zindex": { "value": "9996999", "range": [-9999999, 9999999] }, "aspect": { "value": 2.2050027947302495 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.15, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.84, "range": [0, 10] }, "metaball": { "value": 0.18, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 13.74, "range": [0, 100] } }

});



function navAnimation() {
    gsap.to("nav", {
        opacity: 0,
        scrollTrigger: {
            trigger: ".page1 nav",
            scroller: "main",
            start: "2% 0%",
            end: "1% 0%",
            scrub: true,
        }
    })
}

function page1AndLoaderAnimation() {
    let tl = gsap.timeline();
    tl.from("#loader-text-line1 h1", {
        y: "100%",
        duration: .8,
        opacity: 0
    })
    tl.from("#loader-text-line2 h1", {
        y: "100%",
        duration: .8,
        opacity: 0,
        delay: -.5
    })
    tl.to("#loader-text-line2 svg path", {
        strokeDashoffset: 0,
        duration: .8,
        opacity: 1,
        delay: -.5,
        onComplete: () => {
            gsap.to("#loader-text-line2 svg path", {
                fill: "#02a3a8",
                stroke: "transparent"
            })
        }
    });
    tl.to("#loader-text-line1 h1", {
        y: "-100%",
        duration: .8,
        opacity: 0,
        delay: .5
    })
    tl.to("#loader-text-line2 h1", {
        y: "100%",
        duration: .8,
        opacity: 0,
    }, "-=1")

    tl.from("#loader-text-line2 svg path", {
        opacity: 1
    }, "-=.3");
    tl.to(".loader-one", {
        y: "-100%",
        duration: 1
    })
    tl.to(".loader-two", {
        y: "-100%",
        duration: 1
    }, "-=.8")
    tl.to(".loader-three", {
        y: "-100%",
        duration: 1
    }, "-=.8")
    tl.to(".loader-container", {
        display: "none",
    })
    tl.from("nav", {
        opacity: 0,
        y: 50,
        duration: .8,
        delay: -1
    })
    tl.from("nav .elem", {
        x: 30,
        opacity: 0,
        duration: .8,
        stagger: .1,
        delay: -.5
    })
    tl.from(".page1 .first", {
        opacity: 0,
        y: 50,
        delay: -.2
        // duration:.7,
    })
    tl.from(".page1 .web-experience-text", {
        opacity: 0,
        duration: .5
    })
    tl.from(".page1 .web-experience-text span", {
        opacity: 0,
        duration: .5,
        stagger: .1
    }, "-=1")
    tl.from(".page1 .description p", {
        opacity: 0,
        y: 50,
        duration: .7,
    }, "-=.5")
    tl.from(".page1 .btn", {
        opacity: 0,
        scale: .5,
    }, "-=.5")

}



function allPagesMainHeadingAnimation() {
    let allPages = document.querySelectorAll(".page");

allPages.forEach((page) => {
    let pageHeading = page.querySelector(".main-heading");
    let splitedText = pageHeading.textContent.split("");
    let clutter = "";

    splitedText.forEach((char) => {
        if (char === " ") {
            clutter += `<span>&nbsp;</span>`;
        } else {
            clutter += `<span>${char}</span>`;
        }
    });

    pageHeading.innerHTML = clutter;



    gsap.from(pageHeading.querySelectorAll("span"), {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
            trigger: page,
            scroller: "main",
            start: "top 40%",
            end: "top 0%",
            scrub: true,
            // markers: true
        }
    });


});
}
allPagesMainHeadingAnimation()


let popUp = document.querySelector(".popup");

function validateName() {
    let name = document.getElementById("name").value;
    let nameError = document.querySelector(".name-error");
    let numbers = /[0-9]/g;
    let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (name.trim() === "") {
        nameError.textContent = "Please enter your name";
        nameError.style.color = "red"
        return false;
    }
    else if (numbers.test(name) || specialChars.test(name)) {
        nameError.textContent = "Invalid name";
        nameError.style.color = "red"
        return false
    }
    else if (name.length < 3 || name.length > 20) {
        nameError.textContent = "Name must be between 3 to 20 characters";
        nameError.style.color = "red"
        return false
    } else {
        nameError.innerHTML = `<i class="ri-checkbox-circle-fill"></i>`
        nameError.style.color = "green"
        return true;
    }
}

function validateEmail() {
    let email = document.getElementById("email").value;
    let emailError = document.querySelector(".email-error");
    let validEmailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim() === "") {
        emailError.textContent = "Email is required";
        emailError.style.color = "red"
        return false
    }
    else if (!validEmailFormat.test(email)) {
        emailError.textContent = "Invalid email";
        emailError.style.color = "red"
        return false
    } else if (email.length < 3) {
        emailError.textContent = "Invalid email";
        emailError.style.color = "red"
        return false
    }
    else {
        emailError.innerHTML = `<i class="ri-checkbox-circle-fill"></i>`
        emailError.style.color = "green"
        return true
    }
}

function validateSubject() {
    let subject = document.getElementById("subject").value;
    let subjectError = document.querySelector(".subject-error");
    let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (subject.trim() === "") {
        subjectError.textContent = "Subject is required";
        subjectError.style.color = "red"
        return false
    }
    else if (specialChars.test(subject)) {
        subjectError.textContent = "Subject must not contain special characters";
        subjectError.style.color = "red"
        return false
    }
    else if (subject.length < 3 || subject.length > 30) {
        subjectError.textContent = "Subject must be between 3 to 30 characters";
        subjectError.style.color = "red"
        return false
    }

    else {
        subjectError.innerHTML = `<i class="ri-checkbox-circle-fill"></i>`
        subjectError.style.color = "green"
        return true
    }
}

function validateMessage() {
    let message = document.getElementById("message").value;
    let messageError = document.querySelector(".message-error");
    let minimumMessageLength = 30;
    let lengthCounter = minimumMessageLength - message.length;
    if (message.trim() === "") {
        messageError.textContent = "Message is required";
        messageError.style.color = "red"
        return false
    } else if (lengthCounter > 0) {
        messageError.textContent = `Message must be at least ${lengthCounter} characters`;
        messageError.style.color = "red"
        return false
    }
    else {
        messageError.innerHTML = `<i class="ri-checkbox-circle-fill"></i>`
        messageError.style.color = "green"
        return true
    }
}

let popupBtn = document.querySelector(".popup button");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let subjectInput = document.getElementById("subject");
let messageInput = document.getElementById("message");
let popUpError = document.querySelector(".popup h6");
let popUpClose = document.querySelector(".popup i");
let nameError = document.querySelector(".name-error");
let emailError = document.querySelector(".email-error");
let subjectError = document.querySelector(".subject-error");
let messageError = document.querySelector(".message-error");
function submitForm() {
    if (validateName() && validateEmail() && validateSubject() && validateMessage()) {
        nameError.innerHTML = "";
        emailError.innerHTML = "";
        subjectError.innerHTML = "";
        messageError.innerHTML = "";

        
        gsap.to(popUp, {
            scale: 1,
            opacity: 1,
            duration: .6
        })
        const publicKey = "aWW3H3joGi9rsCpED"
        const serviceId = "service_iy0b8zc"
        const tamplateId = "template_94tazlk"
        emailjs.init(publicKey);
        const templateParams = {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value,
        };
        emailjs.send(serviceId, tamplateId, templateParams)
            .then(() => {
                popUpError.textContent = "Email sent successfully";
                popUpClose.classList.add("ri-checkbox-circle-fill");
                popUpClose.classList.remove("ri-close-circle-fill");
                popUpClose.style.color = "green"
                popupBtn.style.opacity = 1
            })
            .catch(() => {
                popUpError.textContent = "Error sending email";
                popUpClose.classList.remove("ri-checkbox-circle-fill");
                popUpClose.classList.add("ri-close-circle-fill");
                popUpClose.style.color = "red"
                popupBtn.style.opacity = 1
            });

        popupBtn.addEventListener("click", () => {
            gsap.to(popUp, {
                scale: 0,
                opacity: 0,
                duration: .6
            })
            nameInput.value = "";
            emailInput.value = "";
            subjectInput.value = "";
            messageInput.value = "";
        });
    }
    else {
        popUpClose.innerHTML = "";
        popUpError.textContent = "Please fill out all fields";
        popUpClose.classList.remove("ri-checkbox-circle-fill");
        popUpClose.classList.add("ri-close-circle-fill");
        popUpClose.style.color = "red";
        popupBtn.style.opacity = 1
        gsap.to(popUp, {
            scale: 1,
            opacity: 1,
            duration: .6
        })
  
        popupBtn.addEventListener("click", () => {
            gsap.to(popUp, {
                scale: 0,
                opacity: 0,
                duration: .6
            })
        });
    }
}
function gsapFinalAnimation(){
    let pages = document.querySelectorAll(".page");

pages.forEach((page) => {
    let minorHeadings = page.querySelectorAll(".minor-heading");
    let skillsItem = page.querySelectorAll(".skills-items .skill-box"); 
    let profileImg = page.querySelector(".profile-img");
    let xMove = page.querySelectorAll(".x-move");
    let testimonial = page.querySelector(".testimonial-container");
    let inputAnim = page.querySelectorAll(".input-anim ")
    let work1 = page.querySelector(".work1");
    let work2 = page.querySelector(".work2");
    let work3 = page.querySelector(".work3");
    let work4 = page.querySelector(".work4");
    let work5 = page.querySelector(".work5");
    const commonScrollTrigger = {
        trigger: page,
        scroller: "main",
        start: "top 40%",
        end: "top 0%",
        scrub: true,
    };

    minorHeadings.forEach((heading) => {
        gsap.from(heading, {
            y: 30,
            opacity: 0,
            duration: 1,
            scrollTrigger: { ...commonScrollTrigger } 
        });
    });
    if(skillsItem){
        gsap.from(skillsItem, {
            x: 30,
            opacity:0,
            duration:1,
            stagger:.15,
            scrollTrigger: {
                trigger: page,
                scroller: "main",
                start: "top 20%",
                end: "top -10%",
                scrub: true,
            }
        })
    }
   if(profileImg){
    gsap.from(".profile-img",{
        x:-80,
        opacity:0,
        duration:1.5,
        scrollTrigger:{
            trigger:page,
            scroller:"main",
            start:"top 5%",
        }
    })
   }
    if(xMove){
        gsap.from(xMove, {
            x:40,
            opacity:0,
            duration:1.5,
            stagger:.05,
            scrollTrigger:{
                trigger:page,
                scroller:"main",
                start:"top 5%",
                end:"top -10%",
            }
        })
    }
   if(testimonial){
    gsap.from(testimonial, {
        opacity:0,
        duration:.8,
        scrollTrigger:{ ...commonScrollTrigger } 
    })
   }
   if(inputAnim){
    gsap.from(inputAnim, {
        y:100,
        duration:1.5,
        stagger:.15,
        scrollTrigger:{ ...commonScrollTrigger } 
    })
   }
   // Define your breakpoints and conditions
ScrollTrigger.matchMedia({
    // Desktop condition
    "(min-width: 900px)": function () {
      const worklineOneScrollTrigger = {
        trigger: page,
        scroller: "main",
        start: "top 50%",
        end: "top 0%",
        scrub: 1.5,
      };
      const worklineTwoScrollTrigger = {
        trigger: page,
        scroller: "main",
        start: "top -25%",
        end: "top -40%",
        scrub: 1.5,
      };
      const worklineThreeScrollTrigger = {
        trigger: page,
        scroller: "main",
        start: "top -110%",
        end: "top -125%",
        scrub: 1.5,
        markers: true,
      };
  
      // Animations for desktop
      if (work1) {
        gsap.from(work1, {
          opacity: 0,
          x: "-100%",
          duration: 2,
          scrollTrigger: { ...worklineOneScrollTrigger },
        });
      }
      if (work2) {
        gsap.from(work2, {
          opacity: 0,
          x: "100%",
          duration: 2,
          scrollTrigger: { ...worklineOneScrollTrigger },
        });
      }
      if (work3) {
        gsap.from(work3, {
          opacity: 0,
          x: "-100%",
          duration: 2,
          scrollTrigger: { ...worklineTwoScrollTrigger },
        });
      }
      if (work4) {
        gsap.from(work4, {
          opacity: 0,
          x: "100%",
          duration: 2,
          scrollTrigger: { ...worklineTwoScrollTrigger },
        });
      }
      if (work5) {
        gsap.from(work5, {
          opacity: 0,
          x: "-100%",
          duration: 2,
          scrollTrigger: { ...worklineThreeScrollTrigger },
        });
      }
      
    },
    
  });
});
}


menuAnimation()
marqueAnimation()
navAnimation()
page1AndLoaderAnimation()
gsapFinalAnimation()


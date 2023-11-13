particlesJS("particles",{
    particles:{
        number:{
            value:100,
            density:{
                enable: true,
                value_area: 800

            }          
        },
        color:{
            value: "ffffff"
        },
        shape:{
            type:"circle",
            stroke:{
                width:0,
                color:"#000000"
            }
        },
        opacity:{
            value : 0.8,
            random: true,
            animation:{
                enable:true,
                speed:1,
                opacity_min:0,
                sync:false
            }
        },
        size:{ 
            value:3,
            random:true
        },
        line_linked:{
            enable: true,
            distance: 150,
            color:"#ffffff",
            opacity:0.4,
            width:1
        },
        move:{
            enable:true,
            speed:2,
            direction:"none",
            random:true,
            straight:false,
            out_mode:"out",
            bounce:false
        }
    },

    interactivity:{
        detectsOn:"canvas",
        events:{
            onHover:{
                enable:true,
                mode:"push"
            },
            onClick:{
                enable: true,
                mode:"push"
            },
            resize:true
        },
        modes:{
            repulse:{
                distance:100,
                duration:0.4
            },
            push:{
                particles_nb:4
            }
        }
    },
    retina_detect:true
});

function scrollToTop(){
    window.scrollTo({
        top:0,
    });
}

function scrollToDown(){
    window.scrollTo({
        top: document.body.scrollHeight, // Set the top property to the page's full height to scroll to the bottom
    });
}

window.addEventListener('scroll',function(){
    var scrollTopButton = document.querySelector('.scroll-top');
    var scrollDownButton = document.querySelector('.scroll-down');
    if(this.window.pageYOffset >200){
        scrollTopButton.style.display = 'block';
        scrollDownButton.style.display = 'block';
        } else{
            scrollTopButton.style.display = 'none';
            scrollDownButton.style.display = 'block'; // Need to hide here
        }
});


// JS function to scroll to bottom when error in Login -->

  // Define the scrollToPrivateSection function
  function scrollToPrivateSection() {
    const privateSection = document.getElementById("private");
    if (privateSection) {
    //   privateSection.scrollIntoView({ behavior: 'smooth' });
       privateSection.scrollIntoView();
}
  }
  
  // Check if error is defined and not equal to undefined
  const h2Element = document.getElementById("myH2");
  const h2Content = h2Element.innerHTML;
  //if (typeof error !== 'undefined') {
     if (h2Content.length > 5) { 
     window.addEventListener("load", scrollToPrivateSection);
   }









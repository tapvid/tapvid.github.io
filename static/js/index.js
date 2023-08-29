window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {

    set_source(0);
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
        var success_text = [
            "Stack 4 wooden objects on top of each other.",
            "Place the apple on the jello.",
            "Insert the 4 wooden objects into their sockets.",
            "Apply glue to a wooden block, push them together with another wooden block, and place them to the right of the white gear.",
            "Place the green juggling ball on top of the blue juggling ball.",
            "Attach the orange brick across the blue brick.",
            "Pick up the butter and place it in the hand.",
            "Pick up the tapir toy and bring it over to the side of the wooden robot.",
        ];
    	document.querySelector('#success-text').innerHTML=success_text[0];
        if (carousels[i].element.id=='results-carousel') {
          // Add listener to  event
          carousels[i].on('after:show', state => {
            console.log(state)
    		document.querySelector('#success-text').innerHTML=success_text[state.next%8];
          });
        }
        var failure_text = [
            "The 4 object stack fails as the compounded errors cause the final object to be placed in an unstable position. This happens as the controller doesn't have the ability to reason about the dynamics of the scene.",
            "As the second object is about to be placed, the important points get occluded. As the arm moves the object gets progressively smaller causing the controller to diverge as it looses tracking due to the scale change.",
            "While the apple can be picked up despite the occlusions, the sticker occludes the points which would be required to successfully place the apple.",
            "As the controllers tries to place the block besides the white gear it collides with the juggling ball, because there is no pathway to reason about clutter. The controllers ends up letting go of the object.",
            "As the orange block gets placed on top of the blue one it doesn't get placed sufficiently precisely and when it gets pushed down it slides to the side instead of clicking in.",
            "Even though the overall motion is executed correctly, the objects did not get placed accurately enough for them to be inserted into the holes.",
        ];
        document.querySelector('#failure-text').innerHTML=failure_text[0];
        if (carousels[i].element.id=='failure-carousel') {
          carousels[i].on('after:show', state => {
    		document.querySelector('#failure-text').innerHTML=failure_text[state.next%6];
          });
        }
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();

    //$('#interpolation-slider').on('input', function(event) {
    //  setInterpolationImage(this.value);
    //});
    //setInterpolationImage(0);
    //$('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    //bulmaSlider.attach();


})

function set_source(idx){
  data=[
    [
      "Place the apple on the jello.",
      "apple_on_jello_1.mp4",
      "apple_on_jello_10.mp4",
      "apple_on_jello_14.mp4",
    ],
    [
            "Stack 4 wooden objects on top of each other.",
            "four_block_stack_1.mp4",
            "four_block_stack_3.mp4",
            "four_block_stack_8.mp4",
    ],
    [
            "Insert the 4 wooden objects into their sockets.",
            "four_block_stencil_w2_38.mp4",
            "four_block_stencil_w2_47.mp4",
            "four_block_stencil_w2_49.mp4",
    ],
    [
            "Apply glue to a wooden block, push them together with another wooden block, and place them to the right of the white gear.",
            "gluing_11.mp4",
            "gluing_15.mp4",
            "gluing_17.mp4",
    ],
    [
            "Place the green juggling ball on top of the blue juggling ball.",
            "juggling_stack_2.mp4",
            "juggling_stack_25.mp4",
            "juggling_stack_29.mp4",
    ],
    [
            "Attach the orange brick across the blue brick.",
            "lego_stack_w3_2.mp4",
            "lego_stack_w3_11.mp4",
            "lego_stack_w3_12.mp4",
    ],
    [
            "Pick up the butter and place it in the hand.",
            "pass_butter_1.mp4",
            "pass_butter_20.mp4",
            "pass_butter_22.mp4",
    ],
    [
            "TODO",
            "precision_1.mp4",
            "precision_11.mp4",
            "precision_12.mp4",
    ],
    [
            "Pick up the tapir toy and bring it over to the side of the wooden robot.",
            "tapir_robot_v2_4.mp4",
            "tapir_robot_v2_14.mp4",
            "tapir_robot_v2_16.mp4",
    ],
  ]
  document.getElementById("text").innerHTML=data[idx][0];
  for (var i = 0; i<3; ++i){
    vid=document.getElementById("success_vid"+i);
    vid.getElementsByTagName('source')[0].src=("https://storage.googleapis.com/dm-tapnet/robotap/videos/success_gallery/"+data[idx][i+1]);
    vid.load();
  }
}


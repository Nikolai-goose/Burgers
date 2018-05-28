

/*Burgers__about-dropdown*/
$(".burgers__about")
    .click(function(){
        $(this).toggleClass("burgers__about-active");
    })
/*Burgers__about-dropdown*/

/*Team__accordeon*/
$(".team__accordeon__btn")
    .click(function(){
       
        if ($(this).parent().hasClass("team__accordeon__active")){
        $(this).parent().removeClass("team__accordeon__active")
       }
       else {
        $(this).parent().siblings().removeClass('team__accordeon__active');
        $(this).parent().toggleClass("team__accordeon__active"); 
       }

    })
/*Team__accordeon*/

/*Menu__accordeon*/
$('.menu__accordeon__trigger')
    .click(function(e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass('menu__accordeon-active')) {
            $this.next().removeClass('menu__accordeon-active');
        } 
        else {
            $this.parent().parent().find('li .menu__accordeon__content').removeClass('menu__accordeon-active');
            $this.next().toggleClass('menu__accordeon-active');
        }
    });
/*Menu__accordeon*/

/*Full-review*/
$(".rewiew__open").click(function(e){
    e.preventDefault();

    $( ".modal" ).css('display', 'flex');
})

$(".full-review__close").click(function(e){
    e.preventDefault();

    $(".modal").css('display', 'none');
})
/*Full-review*/

/*Fixed-menu*/
$('.fixed-menu__button').click(function() {
    $(this).toggleClass('active');
    $('.fixed-menu__overlay').toggleClass('active');
   });

$(".fixed-menu__link").click(function(){
    $('.fixed-menu__overlay').toggleClass('active');  
})
/*Fixed-menu*/

/*owl-corusel*/
let owlslider = () =>{
    const burgerCarousel = $(".burgers__list").owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        navText: ["", ""],
        navContainer: $[".burgers__control"]
    });

    $(".burgers__nav__btn-prev").click(function(e){
        e.preventDefault();
        burgerCarousel.trigger("prev.owl.carousel");
    });

    $(".burgers__nav__btn-next").click(function(e){
        e.preventDefault();
        burgerCarousel.trigger("next.owl.carousel");
    });
}   

$(document).ready(function(){
    owlslider();
});
/*owl-corusel*/

/*onepage-scroll*/
const sections = $(".section");
const display = $(".maincontent");
const fixedMenu = $('.nav-sidebar__item');
let inScroll = false;


const setActiveMenuItem = itemEq => {
 fixedMenu
    .eq(itemEq)
    .addClass('active')
    .siblings()
    .removeClass('active')
} 

const performTransition = sectionEq => {
  const position = `${sectionEq * -100}%`;
  const delay = parseInt(display.css('transition-duration'))*1000;
  if (inScroll) return;

  inScroll = true;

  sections
    .eq(sectionEq)
    .addClass("active")
    .siblings()
    .removeClass("active");

  display.css({
    transform: `translate(0, ${position})`,
    "-webkit-transform": `translate(0, ${position})`
  });

  setTimeout(() => {
    inScroll = false;
    setActiveMenuItem(sectionEq);
  }, delay + 300); 
};

const scrollToSection = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "up" && prevSection.length) {
    performTransition(prevSection.index());
  }

  if (direction === "down" && nextSection.length) {
    performTransition(nextSection.index());
  }
};

$(document).on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "down" : "up";

    scrollToSection(direction);
  },
  keydown: e => {
    switch (e.keyCode) {
      case 40:
        scrollToSection("down");
        break;

      case 38:
        scrollToSection("up");
        break;
    }
  },
  

  // touchstart touchend touchmove 
});


$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const target = parseInt($(e.currentTarget).attr('data-scroll-to'));


  performTransition(target);

})


/*onepage-scroll*/

/*hero__buton*/
$(".hero__arrow").click(function(e){
    e.preventDefault();

    display.css({
        transform: `translate(0, -100%)`,
        "-webkit-transform": `translate(0, -100%)`
    });
})
/*down-buton*/

/*AJAX form*/
var formCheck = (function(){
    
    var init = function(){
        _setupListeners();    
    };

    var _setupListeners = function(){
       $("#order-form").on('submit', _orderSubmit); 
    };

    var _showModal = function(){

    };

    var _orderSubmit = function(e){
        e.preventDefault();

        var form = $(e.target),
        data = form.serialize(),
        url = form.attr('action'),
        type = form.attr('method');

        request = $.ajax({
            type: 'POST',
            url: url,
            dataType : type,
            data: data
        });

        ajaxForm(form).done(function(msg) {
            var mes = msg.mes,
                status = msg.status;
            
            if (status === 'OK') {
                console.log('sucsess');
            } 
            else{
                console.log('error');
            }
        }).fail(function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });

    }

    return{
      init: init 
    };

})();


var ajaxForm = function (form) {
    var data = form.serialize(),
        url = form.attr('action');
    
    return $.ajax({
        type: 'POST',
        url: url,
        dataType : 'JSON',
        data: data
    })
};

formCheck.init(); 
/*AJAX form*/

/*map*/
ymaps.ready(init);


var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/content/map-burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
            '</div>'
        ]
    },
    {
        latitude: 59.88,
        longitude: 30.31,
        hintContent: '<div class="map__hint">Заставская улица, 44</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/content/map-burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: Заставская улица, 44',
            '</div>'
        ]
    },
    {
        latitude: 59.94,
        longitude: 30.38,
        hintContent: '<div class="map__hint">Кавалергардская улица, 20</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/content/map-burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: Кавалергардская улица, 20',
            '</div>'
        ]
    }
],
    geoObjects= [];

function init() {
    var map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/content/map-marker.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
                iconImageClipRect: [[415, 0], [461, 57]]
            });
    }

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: 'img/content/map-burger.png',
                size: [100, 100],
                offset: [-50, -50]
            }
        ],
        clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
clusterer.add(geoObjects);
}
/*map*/



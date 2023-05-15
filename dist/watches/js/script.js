/* var name = "Ivan"; не используется

let number =7;
const pi =3,14; 
*/

// number
// string
// true/false
// null
// une rfined
// symbol

/* let obj = {
    name: 'apple',
    color: 'green',
    weight:'200',
}

console.log(number); */

/* let answer = confirm("do u have 18?");
console.log(answer); */

/* let answer = promt("do u have 18?", "");
console.log(answer); */

/* let isChecked = true,
    isClose = false; */

/* console.log(isChecked && isClose);  */
/* console.log(isChecked || isClose); */

/* if(2*1 == 8*1){
    console.log('true expression')
}else{
    console.log('false expression')
} */

/* let answer = confirm("do u have 18?");
if(answer){
    console.log('acces ok')
}else{
    console.log('acees not allowed')
} */

/* const num = 50;

if (num < 48) {
    console.log('wrong')
}else if(num > 100) {
    console.log('to much')
}else{
    console.log('correct')
} */


/* for(let i =1; i < 8; i++){
    console.log(i);
} */

/* function logging (a, b) {
    console.log(a + b)
}
logging(3,5);

logging(44,5); */


                                                        //jQuerry carousel
$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1100,
        /* adaptiveHeight: true, */
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/left_solid_980.svg" ></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right_solid_982.svg" ></button>',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true,
                    autoplay: true,
                }  
            }
        ]
    });
                                    //https://denis-creative.com/jquery-tabs/
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

   /*  $('.catalog-item__link').each(function(i){
        $(this).on('click', function(e) {
            e.preventDefault(); //предотвратить стандартное поведение браузера
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); //что будет при клике
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });

    $('.catalog-item__back').each(function(i){
        $(this).on('click', function(e) {
            e.preventDefault(); //предотвратить стандартное поведение браузера
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); //что будет при клике
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    }); */
                                    // оптимизация ниже
    function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault(); //предотвратить стандартное поведение браузера
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); //что будет при клике
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


                                         //Js carousel

    /* let slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: true
    });  */

                            // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thx').fadeOut('slow')
    });
    /*  $('.button_mini').on('click', function(){
        $('.overlay, #order').fadeIn('slow');
    }); */

    $('.button_mini').each(function(i) { 
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // валидация форм и оптимизация

   /*  $('#consultation-forms').validate();
    $('#consultation form').validate();
    $('#order form').validate({
        rules: {
            name:  {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email:true
            }
        },
        messages: {
            name: {
                required: "Please specify your name",
                minlength: jQuery.validator.format("At least {0} characters required!")
            },
            phone: "Please set u phone number",
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }
        }
    }); */
            //оптимизация через функцию

    function validationForm(form) {
        $(/* '#order form' */ form).validate({
            rules: {
                name:  {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email:true
                }
            },
            messages: {
                name: {
                    required: "Please specify your name",
                    minlength: jQuery.validator.format("At least {0} characters required!")
                },
                phone: "Please set u phone number",
                email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                }
            }
        });
    };
    validationForm('#consultation-forms');
    validationForm('#consultation form');
    validationForm('#order form');

    //masks (нужно убрать у импутов type="number")

    $('input[name=phone]').mask("+34 999-999-999");

    //работа с серверной частью
                                                                //отменяем стандартное поведение браузера (технология Ajax без перезагрузки браузера) отправка форм на сайт
    $('form').submit(function(e){ 
        e.preventDefault();

        if (!$(this).valid()) {
        return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thx').fadeIn('slow');


            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scroll and pageUp

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
        //smooth scrol

    $("a[href=#]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init(); // подключение анимации https://github.com/graingert/wow https://wowjs.uk/docs.html
});
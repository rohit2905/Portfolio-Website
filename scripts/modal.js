$(document).ready(function(){

  // MODAL
  var modalText = {
    booktalks: {
      title: 'BookTalks',
      tag: 'Pet Project',
      detail: 'In this project, you’ll build a book review website. Users will be able to register for your website and then log in using their username and password. Once they log in, they will be able to search for books, leave reviews for individual books, and see the reviews made by other people. You’ll also use the a third-party API by Goodreads, another book review website, to pull in ratings from a broader audience. Finally, users will be able to query for book details and book reviews programmatically via your website’s API.',
      link: 'http://book09.herokuapp.com/'
    },
    fooddetection: {
      title: 'Food Detection',
      tag: 'Pet Project',
      detail: 'Recognize Food items, Dishes and ingredients of dish.',
    link: 'http://ec2-34-229-171-219.compute-1.amazonaws.com/'
    },
    facedetection: {
      title: 'Face Count',
      tag: 'Pet Project',
      detail: 'Count number of faces in an image using API calls.',
      link: 'http://ec2-54-87-39-138.compute-1.amazonaws.com/'
    },
    patterndetection: {
      title: 'Pattern and Texture',
      tag: 'Pet Project',
      detail: 'Recognize the type of pattern and texture in an image.',
      link: 'http://ec2-3-83-217-19.compute-1.amazonaws.com/'
    },
    portfolio: {
      title: 'Micro-experience',
      tag: 'Projects by Crio.do',
      detail: 'This is a portfolio issued by Crio.do, crio is a platform where users experience the real time developers by completing assigned real time projects. Visit site to check on each individual project description.',
      link: 'https://criodo.github.io/Crio-Launch-Feb-2020-krohitgoud/'
    },
    htmlcss: {
      title: 'My Website',
      tag: 'Pet Project',
      detail: 'A simple website consists of static web pages.',
      link: 'https://rohit2905.github.io/htmlcss/'
    },
    wiki: {
      title: 'Project Wiki',
      tag: 'Pet Project',
      detail: 'Project Wiki is a wikipedia where user can create content, edit content and also able to search for available wiki pages.',
      link: 'http://wiki09.herokuapp.com'
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 750,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('"+window.location.href+"style/../img/slides/" + id + '-' + index + ".JPG') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})

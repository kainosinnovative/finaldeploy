function slideshow() {
alert("hi");

    $(".regular").slick({
      dots: true,
      infinite: false,
      vertical: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 500,
          settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          }
        }
      ]        
    });
  };
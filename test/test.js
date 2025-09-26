var val = require('../libs/unalib');
var assert = require('assert');


describe('unalib', function(){


  describe('funcion is_valid_phone', function(){

    it('deberia devolver true para 8297-8547', function(){

      assert.equal(val.is_valid_phone('8297-8547'), true);

    });

    it('deberia devolver false para 8297p-8547', function(){

      assert.equal(val.is_valid_phone('8297p-8547'), false);

    });

  });


  describe('funcion is_valid_url_image', function(){

    it('deberia devolver true para http://image.com/image.jpg', function(){

      assert.equal(val.is_valid_url_image('http://image.com/image.jpg'), true);

    });

    it('deberia devolver true para http://image.com/image.gif', function(){

      assert.equal(val.is_valid_url_image('http://image.com/image.gif'), true);

    });
    
  });

  describe('funcion is_valid_yt_video', function(){

    it('deberia devolver true para http://image.com/image.jpg', function(){

      assert.equal(val.is_valid_yt_video('https://www.youtube.com/watch?v=qYwlqx-JLok'), true);

    });

  });

  describe('detects valid image urls', function() {
    let validUrls = [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Falchetron.com%2Fcdn%2Fdog-7d616eb5-a01e-45f7-8b59-31fd465a0ef-resize-750.jpeg&f=1&nofb=1&ipt=fc1fe774f3e159fb337856aff386766e8eb7a757e6dcee901e645e08059305c2",
      "https://www.gstatic.com/webp/gallery3/1.sm.png",
      "https://pixabay.com/images/download/people-2944065_640.jpg?attachment",
      "https://via.placeholder.com/300/09f/fff.png",
    ]

    let invalidUrls = [
      "https://www.google.com",
      "https://www.duckduckgo.com",
    ]

    validUrls.forEach(url => {
      it(`${url } is valid`, () => { assert(val.is_valid_url_image(url)) })
    })

    invalidUrls.forEach(url => {
      it(`${url } is invalid`, () => { assert(!val.is_valid_url_image(url)) })
    })
  });

  describe("detects valid youtube urls", () => {
    let validUrls = [
      "https://www.youtube.com/watch?v=e8cM_EzjmHo",
      "https://www.youtube.com/watch?v=NRIqaGDUt00",
      "https://youtu.be/HlGErt9s26Q"
    ];

    let invalidUrls = [
      "https://www.google.com",
      "https://www.youtube.rom"
    ]

    validUrls.forEach(url => {
      it(`${url} is valid`, () => { assert(val.is_valid_yt_video(url)) })
    })

    invalidUrls.forEach(url => {
      it(`${url} is invalid`, () => { assert(!val.is_valid_yt_video(url)) })
    })
  })


  describe("escapa scripts", () => {
    let injectionAttempt = "<script>alert('Inyección!!!');</script>";

    injectionAttempt = JSON.parse(val.validateMessage({mensaje: injectionAttempt})).mensaje;

    it("does not contain html tags", () => {  
      assert(!injectionAttempt.includes("<script>"));
    })
  })
});








// modulo de ejemplo.

module.exports = {


    // logica que valida si un telefono esta correcto...
    is_valid_phone: function (phone) {
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
  
      // validacion Regex
      try {
        isValid = re.test(phone);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },

    is_valid_url: function(url ){
      var isValid = false;

      var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

      try {
        isValid = regex.test(url);
      } catch (e){
        console.log(e)
      } finally {
        return isValid;
      }
    },
  
    is_valid_url_image: function (url) {
  
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;
  
      // validacion Regex
      try {
        isValid = re.test(url);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    is_valid_yt_video: function (url) {
  
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/i;
  
      // validacion Regex
      try {
        isValid = re.test(url);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    getUrlTag: function(url) {
      return `<a href="${url}">${url}</a>`
    },
    getYTVideoId: function(url){
  
      return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];
    },
  
    getEmbeddedCode: function (url){
      var id = this.getYTVideoId(url);
      var code = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      return code;
    },
  
    getImageTag: function(url){
      var tag = '<img src="'+url+'" style="max-height: 400px;max-width: 400px;">';
      return tag;
    },

    urlStringReplacement: function(url) {
      if (this.is_valid_url_image(url)) {
        return this.getImageTag(url)
      }

      if (this.is_valid_yt_video(url)) {
        return this.getEmbeddedCode(url)
      }

      return `<a href="${url}">${url}</a>`
    },
    
    encodeHTMLEntities: function(str) {
      return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
    },

    validateMessage: function(msg) {
      // Handle invalid input
      if (!msg || typeof msg !== 'string') {
        return JSON.stringify({ mensaje: '' });
      }

      try {
        var obj = JSON.parse(msg);
        obj.mensaje = this.encodeHTMLEntities(obj.mensaje);
        
      if(this.is_valid_url_image(obj.mensaje)){
        console.log("Es una imagen!")
        obj.mensaje = this.getImageTag(obj.mensaje);
      }
      else if(this.is_valid_yt_video(obj.mensaje)){
        console.log("Es un video!")
        obj.mensaje = this.getEmbeddedCode(obj.mensaje);
      }
      else if (this.is_valid_url(obj.mensaje)){
        console.log("Es una url")
        obj.mensaje = this.getUrlTag(obj.mensaje);
      }
      else{
        console.log("Es un texto!")
      }
      
      return JSON.stringify(obj);
      } catch (e) {
        console.log('Error processing message:', e);
        return JSON.stringify({ mensaje: msg }); // Return original message on error
      }
    }
  
  
  
    
    
  
  // fin del modulo
  };
  

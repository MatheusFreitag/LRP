$(function() {

  Dropzone.autoDiscover = false;
  var cleanFilename = function (name) {
    return name.replace(/\s+/g, '');
  };

  $("div#myDropzone").dropzone({
    url: "upload.php",
    renameFilename: cleanFilename,
    maxFiles: 1,
    thumbnailWidth: 150,
    thumbnailHeight: 170,
    maxfilesexceeded: function (file) {
      this.removeAllFiles();
      this.addFile(file);
    },
    accept: function (file, done) {
      if ((file.type).toLowerCase() != "image/jpg" &&
        (file.type).toLowerCase() != "image/gif" &&
        (file.type).toLowerCase() != "image/jpeg" &&
        (file.type).toLowerCase() != "image/png"
        ) {
        this.removeAllFiles();
      alert("Invalid file");
    }
    else {
      done();
      $(".picturePath").val($(".dz-filename").text());
    }
  }

  });

});

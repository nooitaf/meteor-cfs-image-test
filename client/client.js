
// Collection

var imagesOriginal  = new FS.Store.FileSystem("images-original");
var images1024      = new FS.Store.FileSystem("images-1024");
var images512       = new FS.Store.FileSystem("images-512");
var images256       = new FS.Store.FileSystem("images-256");
var images64        = new FS.Store.FileSystem("images-64");

Images = new FS.Collection("images", {
  stores: [
    images64,
    images256,
    images512,
    images1024,
    imagesOriginal
  ],
  filter: {
    allow: {
      contentTypes: ['image/jpeg']
    }
  }
});

Meteor.subscribe('images');


// Uploader

Template.uploader.events = {
  'change .fileUploader': function(event, temp) {
    console.log('files changed');
    FS.Utility.eachFile(event, function(file) {
      var fileObj = new FS.File(file);
      //fileObj.metadata = { owner: Meteor.userId() };
      Images.insert(fileObj);
    });
  }
};


// Grid

Template.grid.images = function() {
  return Images.find({}, { sort: { uploadedAt:-1 } });
};

Template.grid.events({
  'click .remove': function(e,t){
    e.stopPropagation();
    e.preventDefault();
    Images.remove(this._id);
  }
});




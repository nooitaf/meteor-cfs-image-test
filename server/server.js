
var imagesOriginal = new FS.Store.FileSystem("images-original", {});

var images1024 = new FS.Store.FileSystem("images-1024", {
  path: "~/storage/test/images/x1024", 
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('1024', '1024').stream().pipe(writeStream);
  }
});

var images512 = new FS.Store.FileSystem("images-512", {
  path: "~/storage/test/images/x512", 
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('512', '512').stream().pipe(writeStream);
  }
});

var images256 = new FS.Store.FileSystem("images-256", {
  path: "~/storage/test/images/x256", 
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('256', '256').stream().pipe(writeStream);
  }
});

var images64 = new FS.Store.FileSystem("images-64", {
  path: "~/storage/test/images/x64", 
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('64', '64').stream().pipe(writeStream);
  }
});

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


Images.allow({
    insert: function(userId, fileObj) {
        return true;
    },
    update: function(userId, fileObj) {
        return true;
    },
    remove: function(userId, fileObj) {
        return true;
    },
    download: function(userId, fileObj/*, shareId*/) {
        return true;
    },
    fetch: []
});
 

Meteor.publish('images', function() {
  return Images.find({}, { limit: 0 });
});



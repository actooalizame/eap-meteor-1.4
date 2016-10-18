Schools = new Mongo.Collection('schools');


Schools.initEasySearch(['name', 'slug'], {
    'limit' : 4,
    'use' : 'mongo-db',
    'reactive': false
});
/*
SchoolsIndex = new EasySearch.Index({
  collection: Schools,
  fields: ['name', 'slug'],
  engine: new EasySearch.MongoDB(),
  defaultSearchOptions: {
    limit: 3
  },
});*/

/*
Meteor.startup(function () {
  if (Schools.find({}).count() == 0) {
    var data = JSON.parse(Assets.getText('universidades-new.json'));
   
      data.forEach(function (item, index, array) {
            Schools.insert(item);
        });
  }
});*/

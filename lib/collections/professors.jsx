Professors = new Mongo.Collection('professors');

Professors.initEasySearch(['name', 'slug'], {
    'limit' : 3,
    'use' : 'mongo-db',
    'reactive': false,
     sort: function () {
      return { votes: -1 };
    },
});


EasySearch.createSearchIndex('schoolProfessors', {
  'field' : ['name','slug'],
  'collection' : Professors,
  'use': 'minimongo',
  'reactive': false,
  'limit' : 4,
  sort: function () {
      return { votes: -1 };
    },
  'props' : {
    'schoolProfessor' : true
  },
  'query' : function (searchString, opts) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    if (this.props.schoolProfessor) {
      var selected = Session.get('filterSchool');
      query.schoolName = selected;
    }

    return query;
  }
});
/*
Meteor.startup(function () {
  if (Professors.find({}).count() == 0) {
    var data = JSON.parse(Assets.getText('u-andes-1.json'));
   
      data.forEach(function (item, index, array) {
            Professors.insert(item);
        });
  }
});*/



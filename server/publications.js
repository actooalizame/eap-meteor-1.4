Meteor.publish('singleProfessor', function(professorId){
	return  Professors.find({_id:professorId});
});

Meteor.publish('singleSchool', function(schoolId){
  return Schools.find({_id:schoolId});
});

Meteor.publish('professorSmall', function(){
	return  Professors.find({},{fields:{name:1,slug:1,schoolName:1,department:1}});
});

Meteor.publish('singleProfessorOverall', function(professorId){
	return  Professors.find({_id:professorId}, {fields:{overall:1}});
});

Meteor.publish('professorReviews', function(professorId){
  return Profreviews.find({professorId:professorId});
});

Meteor.publish('schoolReviews', function(schoolId){
  return Schoolreviews.find({schoolId:schoolId});
});

Meteor.publish('professorReviewsAverage', function(professorId){
  return Profreviews.find({professorId:professorId}, {fields:{professorId:1,help:1,clarity:1,easy:1}});
});

Meteor.publish('myProfReview', function(reviewId){
	let userId = this.userId;
  return Profreviews.find({_id:reviewId,userId:userId});
});

Meteor.publish('mySchoolReview', function(reviewId){
  let userId = this.userId;
  return Schoolreviews.find({_id:reviewId,userId:userId});
});

Meteor.publish('myProfReviews', function(){
  return Profreviews.find({userId:this.userId}, {fields:{userId:1,professorId:1,professorName:1,tags:1,professorSchool:1,professorDepartment:1,help:1,clarity:1,easy:1,createdAt:1}});
});



Meteor.publish('mySchoolReviews', function(){
  return Schoolreviews.find({userId:this.userId}, {fields:{userName:0,userUrl:0,graduation:0,comment:0,votes:0,upVoters:0,downVoters:0}}, {sort:{createdAt:-1}});
});

Meteor.publish('votedProfessors', function(){
	return Professors.find({voted:true}, {fields:{schoolId:0,ratedBy:0,slug:0}});
});

Meteor.publish('votedSchools', function(){
  return Schools.find({voted:true}, {fields:{ratedBy:0,address:0,website:0,slug:0}});
});

Meteor.publish('allProfReviews', function(){
  return Profreviews.find({}, {fields:{userId:1,professorId:1,professorName:1,professorSchool:1,professorDepartment:1,help:1,clarity:1,easy:1}});
});


Meteor.publish('filteredProf', function(schoolName){
  return Professors.find({schoolName:schoolName},{fields: {'name': 1,'slug':1,'department':1,'schoolName':1}});
});


Meteor.publish('multipleProfessors', function(profName,profSchool){
  return Professors.find({name:profName,schoolName:profSchool}, {fields: {'schoolName':1, 'name':1, 'department':1, 'overall':1}});
});

Meteor.publish('topProfessorsSchool', function(schoolName){
  return Professors.find({schoolName:schoolName,voted:true}, {fields: {'name':1,'schoolName':1,'department':1,'voted':1,'overall':1}}, {sort:{overall:-1},'limit':5});
});
/*
Meteor.publish("fbData", function () {
    return Meteor.users.find({_id:this.userId}, {fields: {'services.facebook.id': 1}});
});
*/
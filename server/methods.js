Meteor.methods({

	'sendEmail': function (to, from, subject, text) {
    //check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },

	'insertProfReview': function(data){
		var user = Meteor.users.findOne(this.userId),
				fb_id = user.services.facebook.id;
		Profreviews.insert({
			userId: data.userId,
			userName: data.userName,
			professorId: data.professorId,
			professorName: data.professorName,
			professorSchool: data.professorSchool,
			professorDepartment: data.professorDepartment,
			courseCode: data.courseCode,
			semester: data.semester,
			year: data.year,
			help: data.help,
			clarity: data.clarity,
			easy: data.easy,
			tags: data.tags,
			recommend: data.recommend,
			eligible: data.eligible,
			//sexy: data.sexy,
			comment: data.comment,
			assistance: data.assistance,
			interest: data.interest,
			textUse: data.textUse,
			grade: data.grade,
			mayor: data.mayor,
			votes: 0,
			upVoters: [],
			downVoters: [],
			createdAt: new Date(),
			userUrl: fb_id,
		});
	},

	'insertSchoolReview': function(data){
		var user = Meteor.users.findOne(this.userId),
				fb_id = user.services.facebook.id;
		/*var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);
		if (!verifyCaptchaResponse.success) {
      throw new Meteor.Error(422, 'Verifica tu Humanidad!');
    }
    else{*/
      Schoolreviews.insert({
				userId: data.userId,
				userName: data.userName,
				schoolId: data.schoolId,
				schoolName: data.schoolName,
				reputation: data.reputation,
				location: data.location,
				opportunities: data.oportunidades,
				library: data.library,
				infrastructure: data.infrastructure,
				internet: data.internet,
				food: data.food,
				social: data.activities,
				sports: data.sports,
				happiness: data.happiness,
				graduation: data.graduation,
				comment: data.comment,
				votes: 0,
				upVoters: [],
				downVoters: [],
				createdAt: new Date(),
				userUrl: fb_id
			});
    //}
	},

	'updateProfReview': function(data){
		/*var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);
		if (!verifyCaptchaResponse.success) {
      throw new Meteor.Error(422, 'Verifica tu Humanidad!');
    }else{*/
			Profreviews.update(
				{ _id: data.reviewId},
				{$set: {
					courseCode: data.courseCode,
					semester: data.semester,
					year: data.year,
					help: data.help,
					clarity: data.clarity,
					easy: data.easy,
					eligible: data.eligible,
					recommend: data.recommend,
					//sexy: data.sexy,
					tags: data.tags,
					comment: data.comment,
					assistance: data.assistance,
					interest: data.interest,
					textUse: data.textUse,
					grade: data.grade,
					mayor: data.mayor,
					editedAt: new Date()
				}}
			);
		//}
	},

	'updateProfReviewDelete': function(reviewId,professorId){
    var professor = Professors.findOne({_id:professorId}),
     		votes = professor.votes;
    if(votes==1){
    	Professors.update(
     	{ _id: professorId},
     	{$set: {
					voted: false,
					overall: 0,
					help: 0,
					clarity: 0,
					easy: 0,
				}}
     	)
    }
    if(votes>1){
    	var otherReviews = Profreviews.find( { _id: { $ne:reviewId }, professorId:professorId } ),
					othersReviewCount = otherReviews.count(),
					othersHelp = otherReviews.map(function(a) {return a.help;}),
					helpSum = eval(othersHelp.join('+')),
					helpTotal = (helpSum/othersReviewCount),
					helpFixed = Number(helpTotal.toFixed(1)),
					othersClarity = otherReviews.map(function(a) {return a.clarity;}),
					claritySum = eval(othersClarity.join('+')),
					clarityTotal = (claritySum/othersReviewCount),
					clarityFixed = Number(clarityTotal.toFixed(1)),
					othersEasy = otherReviews.map(function(a) {return a.easy;}),
					easySum = eval(othersEasy.join('+')),
					easyTotal = (easySum/othersReviewCount),
					easyFixed = Number(easyTotal.toFixed(1));
			var overall = [];
			overall.push(helpTotal,clarityTotal,easyTotal);
			var overallSum = eval(overall.join('+')),
					overallTotal = Number((overallSum/3).toFixed(1));
			Professors.update(
	     	{ _id: professorId},
	     	{$set: {
						overall: overallTotal,
						help: helpFixed,
						clarity: clarityFixed,
						easy: easyFixed
					}},		
	     	)
    }
  },

  'updateSchoolReviewDelete': function(reviewId,schoolId){
    var school = Schools.findOne({_id:schoolId}),
     		votes = school.votes;
    if(votes==1){
    	Schools.update(
     	{ _id: schoolId},
     	{$set: {
					voted: false,
					overall: 0,
					reputation: 0,
					location: 0,
					opportunities: 0,
					library: 0,
					infrastructure: 0,
					internet: 0,
					food: 0,
					activities: 0,
					sports: 0,
					happiness: 0
				}}
     	)
    }
    if (votes>1){
    	var otherReviews = Schoolreviews.find( { _id: { $ne:reviewId }, schoolId:schoolId } ),
					othersReviewCount = otherReviews.count(),

					othersReputation = otherReviews.map(function(a) {return a.reputation;}),
					reputationSum = eval(othersReputation.join('+')),
					reputationTotal = (reputationSum/othersReviewCount),
					reputationFixed = Number(reputationTotal.toFixed(1)),

					othersLocation = otherReviews.map(function(a) {return a.location;}),
					locationSum = eval(othersLocation.join('+')),
					locationTotal = (locationSum/othersReviewCount),
					locationFixed = Number(locationTotal.toFixed(1));

					othersOpportunities = otherReviews.map(function(a) {return a.opportunities;}),
					opportunitiesSum = eval(othersOpportunities.join('+')),
					opportunitiesTotal = (opportunitiesSum/othersReviewCount),
					opportunitiesFixed = Number(opportunitiesTotal.toFixed(1)),

					othersLibrary = otherReviews.map(function(a) {return a.library;}),
					librarySum = eval(othersLibrary.join('+')),
					libraryTotal = (librarySum/othersReviewCount),
					libraryFixed = Number(libraryTotal.toFixed(1)),

					othersInfrastructure = otherReviews.map(function(a) {return a.infrastructure;}),
					infrastructureSum = eval(othersInfrastructure.join('+')),
					infrastructureTotal = (infrastructureSum/othersReviewCount),
					infrastructureFixed = Number(infrastructureTotal.toFixed(1)),

					othersInternet = otherReviews.map(function(a) {return a.internet;}),
					internetSum = eval(othersInternet.join('+')),
					internetTotal = (internetSum/othersReviewCount),
					internetFixed = Number(internetTotal.toFixed(1)),

					othersFood = otherReviews.map(function(a) {return a.food;}),
					foodSum = eval(othersFood.join('+')),
					foodTotal = (foodSum/othersReviewCount),
					foodFixed = Number(foodTotal.toFixed(1)),

					othersActivities = otherReviews.map(function(a) {return a.social;}),
					activitiesSum = eval(othersActivities.join('+')),
					activitiesTotal = (activitiesSum/othersReviewCount),
					activitiesFixed = Number(activitiesTotal.toFixed(1)),

					othersSports = otherReviews.map(function(a) {return a.sports;}),
					sportsSum = eval(othersSports.join('+')),
					sportsTotal = (sportsSum/othersReviewCount),
					sportsFixed = Number(sportsTotal.toFixed(1)),

					othersHappiness = otherReviews.map(function(a) {return a.happiness;}),
					happinessSum = eval(othersHappiness.join('+')),
					happinessTotal = (happinessSum/othersReviewCount),
					happinessFixed = Number(happinessTotal.toFixed(1));

					

			var overall = [];
			overall.push(reputationTotal,locationTotal,opportunitiesTotal,libraryTotal,infrastructureTotal,internetTotal,foodTotal,activitiesTotal,sportsTotal,happinessTotal);
			var overallSum = eval(overall.join('+')),
					overallTotal = Number((overallSum/10).toFixed(1));
			Schools.update(
	     	{ _id: schoolId},
	     	{$set: {
						overall: overallTotal,
						reputation: reputationFixed,
						location: locationFixed,
						opportunities: opportunitiesFixed,
						library: libraryFixed,
						infrastructure: infrastructureFixed,
						internet: internetFixed,
						food: foodFixed,
						activities: activitiesFixed,
						sports: sportsFixed,
						happiness: happinessFixed
					}},		
	     	)
    }
  },

  deleteProfReview(reviewId){
  	Profreviews.remove(reviewId);
  },

  deleteSchoolReview(reviewId){
  	Schoolreviews.remove(reviewId);
  },

  substractVoteProf(professorId){
  	Professors.update(
  		{_id: professorId},
  		{$inc: {votes: -1}}
  		)
  },

  substractVoteSchool(schoolId){
  	Schools.update(
  		{_id: schoolId},
  		{$inc: {votes: -1}}
  		)
  },

	'updateSchoolReview': function(data){
		/*var user = Meteor.users.findOne(this.userId),
				fb_id = user.services.facebook.id;*/
		/*var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);
		if (!verifyCaptchaResponse.success) {
      throw new Meteor.Error(422, 'Verifica tu Humanidad!');
    }
    else{*/
      Schoolreviews.update(
      	{ _id: data.reviewId},
      	{$set: {
					reputation: data.reputation,
					location: data.location,
					opportunities: data.oportunidades,
					library: data.library,
					infrastructure: data.infrastructure,
					internet: data.internet,
					food: data.food,
					social: data.activities,
					sports: data.sports,
					happiness: data.happiness,
					graduation: data.graduation,
					comment: data.comment,
					
					editedAt: new Date(),
	      	}
	      }
			);
    //}
	},

	'addProfessor': function(data){
		var user = Meteor.users.findOne(this.userId),
				fb_id = user.services.facebook.id;
		if(fb_id==='10207203180704489'||fb_id==='10208316459976460'||fb_id==='10153950394227248'){
			Professors.insert({
				name: data.name,
				slug: data.slug,
				schoolName: data.schoolName,
				department: data.department,
				multiple: data.multiple,
				schoolId: data.schoolId,
				ratedBy: [],
				voted: false,
				overall: 0
			});
		}
		else {
			return;
		}
		
	},

	'addProfRatedBy': function(professorId, userId){
		Professors.update(
			{	_id: professorId },
			{$push: {ratedBy: userId} }
		);
	},

	'addSchoolRatedBy': function(schoolId, userId){
		Schools.update(
			{	_id: schoolId },
			{$push: {ratedBy: userId} }
		);
	},


	'setVotedProfessor': function(professorId){
		Professors.update(
			{_id: professorId },
			{$set: {voted: true} }
		);
	},

	'setVotedSchool': function(schoolId){
		Schools.update(
			{_id: schoolId },
			{$set: {voted: true} }
		);
	},

	'updateProfessorOverall': function(professorId,average){
		Professors.update(
			{_id: professorId },
			{$set: {overall: average} }
		);
	},

	'updateSchoolOverall': function(schoolId,average){
		Schools.update(
			{_id: schoolId },
			{$set: {overall: average} }
		);
	},

	'upvoteProfReview': function(userId, reviewId){
		Profreviews.update(
			{ _id: reviewId },
			{$inc: {votes: 1},$push: {upVoters: userId},$pull: {downVoters: userId}}
		);
	},
	'downvoteProfReview': function(userId, reviewId){
		Profreviews.update(
			{ _id: reviewId },
			{$inc: {votes: -1},$push: {downVoters: userId},$pull: {upVoters: userId}}
		);
	},
	'removeTags': function(reviewId){
		Profreviews.update(
			{	_id: reviewId },
			{$set: {tags: []} }
		);
	},
	'upvoteSchoolReview': function(userId, reviewId){
		Schoolreviews.update(
			{ _id: reviewId },
			{$inc: {votes: 1},$push: {upVoters: userId},$pull: {downVoters: userId}}
		);
	},
	'downvoteSchoolReview': function(userId, reviewId){
		Schoolreviews.update(
			{ _id: reviewId },
			{$inc: {votes: -1},$push: {downVoters: userId},$pull: {upVoters: userId}}
		);
	},
	'clearVotes': function(reviewId){
		Profreviews.update(
			{ _id: reviewId },
			{$set: {
				votes:0,
				upVoters: [],
				downVoters: []
			}}
		);
	},
	'voteOnProfessor': function(professorId){
		Professors.update(
			{ _id: professorId },
			{$inc: {votes: 1}}
		);
	},
	'insertScoresOnProf': function(professorId,help,clarity,easy){
		Professors.update(
			{ _id: professorId },
			{$inc: {
				help: help,
				clarity: clarity,
				easy: easy
			}}
		);
	},
	'insertScoresOnSchool': function(schoolId,dataScores){
		Schools.update(
			{ _id: schoolId },
			{$inc: {
				reputation: dataScores.reputation,
				location: dataScores.location,
				oportunidades: dataScores.oportunidades,
				library: dataScores.library,
				infrastructure: dataScores.infrastructure,
				internet: dataScores.internet,
				food: dataScores.food,
				activities: dataScores.activities,
				sports: dataScores.sports,
				happiness: dataScores.happiness
			}}
		);
	},
	'updateScoresOnProf': function(professorId,help,clarity,easy){
		Professors.update(
			{ _id: professorId },
			{$set: {
				help: help,
				clarity: clarity,
				easy: easy
			}}
		);
	},
	'updateScoresOnSchool': function(schoolId,scores){
		Schools.update(
			{ _id: schoolId },
			{$set: {
				reputation: scores.reputation,
				location: scores.location,
				oportunidades: scores.oportunidades,
				library: scores.library,
				infrastructure: scores.infrastructure,
				internet: scores.internet,
				food: scores.food,
				activities: scores.activities,
				sports: scores.sports,
				happiness: scores.happiness
			}}
		);
	},
	'updateEditedScoresOnSchool': function(schoolId,newScores){
		Schools.update(
			{ _id: schoolId },
			{$set: {
				reputation: newScores.scores.reputation,
				location: newScores.scores.location,
				oportunidades: newScores.scores.opportunities,
				library: newScores.scores.library,
				infrastructure: newScores.scores.infrastructure,
				internet: newScores.scores.internet,
				food: newScores.scores.food,
				activities: newScores.scores.activities,
				sports: newScores.scores.sports,
				happiness: newScores.scores.happiness
			}}
		);
	},
	'voteOnSchool': function(schoolId){
		Schools.update(
			{ _id: schoolId },
			{$inc: {votes: 1}}
		);
	},
});

Meteor.users.deny({
	update(){ return true; }
})
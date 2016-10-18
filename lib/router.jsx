import React from 'react';
import ReactDOM from 'react-dom';

import { mount } from 'react-mounter'

FlowRouter.route('/', {
	name: 'home',
	action(){
		mount(FrontLayout, {content: <FrontStatic  />});
	}
});

FlowRouter.route('/busca-profesores', {
	name: 'buscaProfesores',
	action(){
		mount(AppLayout, {content: <FilteredProfSearch  />});
	}
});

FlowRouter.route('/busca-universidades', {
	name: 'buscaUniversidades',
	action(){
		mount(AppLayout, {content: <SchoolSearch  />});
	}
});

FlowRouter.route('/evaluar', {
	name: 'evaluarContainer',
	action(){
		mount(AppLayout, {content: <RateContainer  />});
	}
});

FlowRouter.route('/evalua-al-profe/:professorId', {
	name: 'evaluaProfesor',
	action(params){
		mount(AppLayout, {content: <RateProfessor {...params} />});
	}
});

FlowRouter.route('/evalua-la-u/:schoolId', {
	name: 'evaluaUniversidad',
	action(params){
		mount(AppLayout, {content: <RateSchool {...params} />});
	}
});

FlowRouter.route('/profesor/:professorId', {
	name: 'infoProfesor',
	action(params){
		mount(AppLayout, {content: <Professor {...params} />});
	}
});

FlowRouter.route('/universidad/:schoolId', {
	name: 'infoUniversidad',
	action(params){
		mount(AppLayout, {content: <School {...params} />});
	}
});

FlowRouter.route('/editar-review/:reviewId/profesor/:professorId', {
	name: 'editarReviewProfesor',
	action(params){
		mount(AppLayout, {content: <EditProfRev {...params} />});
	}
});

FlowRouter.route('/editar-review/:reviewId/universidad/:schoolId', {
	name: 'editarReviewUniversidad',
	action(params){
		mount(AppLayout, {content: <EditSchoolRev {...params} />});
	}
});

FlowRouter.route('/mis-reviews', {
	name: 'misReviews',
	action(){
		mount(AppLayout, {content: <MyReviews/>});
	}
});

FlowRouter.route('/ranking', {
	name: 'ranking',
	action(){
		mount(AppLayout, {content: <Ranking/>});
		//DocHead.setTitle('Evalúa al Profe - Ranking');
		//DocHead.addMeta({name: 'description', content: 'Ranking chileno de profesores y universidades'});
	}
});

FlowRouter.route('/todos-los-reviews', {
	name: 'todosLosReviews',
	action(){
		mount(AppLayout, {content: <VotedProfessors/>});
	}
});

FlowRouter.route('/terminos-y-condiciones', {
	name: 'terminosYCondiciones',
	action(){
		mount(AppLayout, {content: <Terms/>});
	}
});

FlowRouter.route('/admin36913', {
	name: 'agregarProfesor',
	action(){
		mount(AppLayout, {content: <AddProfessor/>});
	}
});

FlowRouter.route('/sugerir-profesor', {
	name: 'sugerirProfesor',
	action(){
		mount(AppLayout, {content: <SuggestProfessor/>});
	}
});
/*
removeDocHeadAddedTags = function() {
  if (Meteor.isClient) {
    const elements = document.querySelectorAll('[dochead="1"]');
    // We use for-of here to loop only over iterable objects
    for (let element of elements) {
      element.parentNode.removeChild(element);
    }
  }
};

FlowRouter.triggers.enter([removeDocHeadAddedTags]);*/
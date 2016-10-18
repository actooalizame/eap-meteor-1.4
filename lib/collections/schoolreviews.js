Schoolreviews = new Mongo.Collection('schoolreviews');

var Schemas = {};

Schemas.Schoolreviews = new SimpleSchema({
    userId: {
        type: String,
        label: 'User Id'
    },
    userName: {
        type: String,
        label: 'User Name'
    },
    userUrl: {
        type: String,
        label: 'User Url'
    },
    schoolId: {
        type: String,
        label: 'School Id'
    },
    schoolName: {
        type: String,
        label: 'Nombre de la Universidad'
    },
    reputation: {
        type: Number,
        label: 'Reputacion',
        min: 1
    },
    location: {
        type: Number,
        label: 'Ubicacion',
        min: 1
    },
    opportunities: {
        type: Number,
        label: 'Oportunidades',
        min: 1
    },
    library: {
        type: Number,
        label: 'Biblioteca',
        min: 1
    },
    infrastructure: {
        type: Number,
        label: 'Infraestructura',
        min: 1
    },
    internet: {
        type: Number,
        label: 'Internet',
        min: 1
    },
    food: {
        type: Number,
        label: 'Comida',
        min: 1
        //optional: true
    },
    social: {
        type: Number,
        label: 'Vida Universitaria',
        min: 1
    },
    sports: {
        type: Number,
        label: 'Incentivo Deportivo',
        min: 1
    },
    happiness: {
        type: Number,
        label: 'Felicidad',
        min: 1
    },
    graduation: {
        type: String,
        label: 'Graduacion',
        min: 1
    },
    comment: {
        type: String,
        label: 'Comentario',
        min: 10,
        max: 450

    },
    upVoters: {
        type: [String],
        label: 'upVoters',
        optional: true
    },
    downVoters: {
        type: [String],
        label: 'downVoters',
        optional: true
    },
    votes: {
        type: Number,
        label: 'votes',
        optional: true
    },
    createdAt: {
        type: Date,
        label: 'Fecha de creacion',
        
    },
    editedAt: {
        type: Date,
        label: 'Fecha de edicion',
        optional: true
        
    }
});

SimpleSchema.messages({
	required: '[label] es un campo obligatorio',
	minNumber: 'El valor de [label] debe ser como minimo de [min]',
  maxNumber: 'El valor de [label] debe ser como máximo de [max]',
	minString: '[label] debe tener como minimo [min] caracteres',
	maxString: '[label] debe tener como máximo [max] caracteres',
  expectedNumber: '[label] debe ser un número'
});
    



Schoolreviews.attachSchema(Schemas.Schoolreviews);
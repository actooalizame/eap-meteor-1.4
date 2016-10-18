Profreviews = new Mongo.Collection('profreviews');

var Schemas = {};

Schemas.Profreviews = new SimpleSchema({
		
    userId: {
        type: String,
        label: 'User Id'
    },
    userName: {
        type: String,
        label: 'User Name'
    },
    
    professorId: {
        type: String,
        label: 'Professor Id'
    },
    professorName: {
        type: String,
        label: 'Nombre del Profesor'
    },
    professorSchool: {
        type: String,
        label: 'Universidad del Profesor'
    },
    professorDepartment: {
        type: String,
        label: 'Facultad del Profesor',
     
    },
    courseCode: {
        type: String,
        label: 'Nombre de la clase dictada',
        min: 4,
        max: 60
    },
    semester: {
        type: String,
        label: 'Semestre',
        optional: true
    },
    year: {
        type: String,
        label: 'Año',
        optional: true
    },
    help: {
        type: Number,
        label: 'Ayuda al Alumno',
        min: 1
    },
    clarity: {
        type: Number,
        label: 'Claridad para Enseñar',
        min: 1
    },
    easy: {
        type: Number,
        label: 'Facilidad',
        min: 1
    },
    tags: {
        type: [String],
        label: 'Tags'
        //optional: true
    },
    recommend: {
        type: String,
        label: 'Recomendarias al profesor',
        optional: false
    },
    eligible: {
        type: String,
        label: 'Pudiste Elegirlo',
        optional: true
    },
    /*sexy: {
        type: String,
        label: 'Sexy',
        optional: true
    },*/
    comment: {
        type: String,
        label: 'Comentario',
        min: 4,
        max: 450

    },
    assistance: {
        type: String,
        label: 'Asistencia'
    },
    interest: {
        type: Number,
        label: 'Interés',
        optional: true,
        //min: 1
    },
    textUse: {
        type: Number,
        label: 'Material de Apoyo',
        //min: 1,
        optional: true
    },
    grade: {
        type: Number,
        label: 'Nota o Calificación',
        decimal: true,
        optional: true,
        min: 1,
        max: 7
    },
    mayor: {
        type: String,
        label: 'Tu Carrera',
        optional: true,
        max: 35
    },
    votes: {
        type: Number,
        label: 'votes',
        optional: true
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
    
    createdAt: {
        type: Date,
        label: 'Fecha de creacion',
        
    },
    userUrl: {
        type: String,
        label: 'User Url'
    },
});

SimpleSchema.messages({
	required: '[label] es un campo obligatorio',
	minNumber: 'El valor de [label] debe ser como minimo de [min]',
    maxNumber: 'El valor de [label] debe ser como máximo de [max]',
	minString: '[label] debe tener como minimo [min] caracteres',
	maxString: '[label] debe tener como máximo [max] caracteres',
    expectedNumber: '[label]: Formato erróneo'
});

Profreviews.attachSchema(Schemas.Profreviews);
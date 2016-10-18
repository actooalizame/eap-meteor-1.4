Tags = React.createClass({

	componentDidMount(){
		var countChecked = function() {
			var n = jQuery('.tags input:checked').length;
			if(n === 3 ){
				jQuery('input:not(:checked)').parent('.checkbox-success').addClass('hidden');
			}
			else if(n < 3){
				jQuery('input:not(:checked)').parent('.checkbox-success').removeClass('hidden');
			}
		};
		countChecked();
		 
		jQuery('input[type=checkbox]').on( 'click', countChecked );
	},

	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="tags"><h3>Selecciona los 3 tags que mejor describen al profesor</h3></label>
		  	</div>
		  	<div className="col-sm-8">
		  		<div id="tags" className="tags">
		    		
		    		<div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Clase difícil" id="checkbox1" />
					    <label htmlFor="checkbox1">
				        <p>Clase difícil</p>
					    </label>
					  </div>
						  
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Buen Feedback" id="checkbox2" />
					    <label htmlFor="checkbox2">
				        <p>Buen Feedback</p>
					    </label>
					  </div>

					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Muchas tareas" id="checkbox3" />
					    <label htmlFor="checkbox3">
					        <p>Muchas tareas</p>
					    </label>
					  </div>

					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Prepárate para leer" id="checkbox4" />
					    <label htmlFor="checkbox4">
					        <p>Prepárate para leer</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Controles sorpresa" id="checkbox5" />
					    <label htmlFor="checkbox5">
					        <p>Controles sorpresa</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Participación obligatoria" id="checkbox6" />
					    <label htmlFor="checkbox6">
					        <p>Participación obligatoria</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Estricto con la asistencia" id="checkbox7" />
					    <label htmlFor="checkbox7">
					        <p>Estricto con la asistencia</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Respetado por los estudiantes" id="checkbox8" />
					    <label htmlFor="checkbox8">
					        <p>Respetado por los estudiantes</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Inspirador" id="checkbox9" />
					    <label htmlFor="checkbox9">
					        <p>Inspirador</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Maletero" id="checkbox10"/>
					    <label htmlFor="checkbox10">
					        <p>Maletero</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Clases intensas" id="checkbox11"/>
					    <label htmlFor="checkbox11">
					        <p>Clases intensas</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Paletiado" id="checkbox12"/>
					    <label htmlFor="checkbox12">
					        <p>Paletiado</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Pocas pruebas" id="checkbox13"/>
					    <label htmlFor="checkbox13">
					        <p>Pocas pruebas</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Buena onda" id="checkbox14"/>
					    <label htmlFor="checkbox14">
					        <p>Buena onda</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Buen evaluador" id="checkbox15"/>
					    <label htmlFor="checkbox15">
					        <p>Buen evaluador</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Profe Motivado" id="checkbox16"/>
					    <label htmlFor="checkbox16">
					        <p>Profe Motivado</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Jote" id="checkbox17"/>
					    <label htmlFor="checkbox17">
					        <p>Jote</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Clases increíbles" id="checkbox18"/>
					    <label htmlFor="checkbox18">
					        <p>Clases increíbles</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Pasta" id="checkbox19"/>
					    <label htmlFor="checkbox19">
					        <p>Pasta</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Pruebas son difíciles" id="checkbox20"/>
					    <label htmlFor="checkbox20">
					        <p>Pruebas son difíciles</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Manda hartos trabajos" id="checkbox21"/>
					    <label htmlFor="checkbox21">
					        <p>Manda hartos trabajos</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Tu mayor esfuerzo será tomar la clase" id="checkbox22"/>
					    <label htmlFor="checkbox22">
					        <p>Tu mayor esfuerzo será tomar la clase</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Min@" id="checkbox23"/>
					    <label htmlFor="checkbox23">
					        <p>Min@</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Esforzado" id="checkbox24"/>
					    <label htmlFor="checkbox24">
					        <p>Esforzado</p>
					    </label>
					  </div>
					  <div className="checkbox checkbox-success checkbox-inline">
					    <input type="checkbox" value="Trabajos en grupo" id="checkbox25"/>
					    <label htmlFor="checkbox25">
					        <p>Trabajos en grupo</p>
					    </label>
					  </div>
					</div>
				</div>
			</div>
			)
	}
});
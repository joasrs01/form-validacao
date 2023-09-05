// document.querySelector('#btnAjuda').addEventListener('click', Teste );
// document.querySelector('#btnEnviar').addEventListener('click', Enviar );
document.querySelector('form').addEventListener('submit', Enviar );
document.querySelector('#centro').addEventListener('click', DesabilitarHabilitarAtividade );
document.querySelector('#sul').addEventListener('click', DesabilitarHabilitarAtividade );
document.querySelector('#sudeste').addEventListener('click', DesabilitarHabilitarAtividade );
document.querySelector('#nordeste').addEventListener('click', DesabilitarHabilitarAtividade );
document.querySelector('#norte').addEventListener('click', DesabilitarHabilitarAtividade );

let txtNome = document.querySelector('#nome');
let txtSobrenome = document.querySelector('#sobrenome');
let txtEmail = document.querySelector('#email');
let txtWebsite = document.querySelector('#website');
let txtDataInicio = document.querySelector('#dataini');
let txtDataFim = document.querySelector('#datafim');

function Enviar(evento){
    evento.preventDefault();

    ValidarNome();
    ValidarTxt(txtSobrenome);
    ValidarEmail();
    ValidarData();
    ValidarRegiao();
    ValidarAtividade();
}

function ValidarTxt(componente){

    if( componente.value == ''){
        componente.style.borderColor = "#FF0000";
        componente.style.backgroundColor = "#e9bcbc";

        return false;
    }
    else{
        componente.style.borderColor = "#315c31f7";
        componente.style.backgroundColor = "";
    }

    return true;
}

function ValidarAtividade(){   
    let atividades = document.querySelectorAll("input[name='atividade']");
    let iQtdSelecionados = 0;

    atividades.forEach( comp =>
    {
        if( comp.checked )
            iQtdSelecionados++;     
    });

    ColorirFieldset( document.querySelector('#fs-atividade'), iQtdSelecionados == 0 || iQtdSelecionados > 3 ? true : false );

    console.log(iQtdSelecionados);
}

function ValidarRegiao(){
    let regiao = document.querySelector("input[name='regiao']:checked");
    ColorirFieldset(document.querySelector('#fs-regiao'), regiao == null ? false : true );
}

function DesabilitarHabilitarAtividade(componente){ 
    document.querySelector('#dba').disabled = 
    document.querySelector('#programador').disabled = componente.target.id == 'centro' ? true : false;
}

function ValidarEmail(){
    if( ValidarTxt(txtEmail)){
        alert('email');
    }
}

function ValidarNome(){
    if( ValidarTxt(txtNome)){
        if( txtNome.value.length < 3 )
        alert('nome menor que 3 caracteres');
    }
}

function ValidarData(){

    let bValido = ValidarTxt(txtDataInicio);

    // teve que ser feito assim pra ele fazer para os dois obrigatoriamente
    // se não, caso o primeiro desse inválido, não entrava no segundo
    if( bValido ) {
        let bValido = ValidarTxt(txtDataFim);
    }
    else{
        ValidarTxt(txtDataFim);
    }

    if( bValido ){
        let dtFim = new Date( txtDataFim.value );
        let dtIni = new Date( txtDataInicio.value );
    
        if( dtFim <= dtIni )
            alert('Data de inicio maior ou igual que data final')
    }
}

function ColorirFieldset( fieldSet ,valido ){
    fieldSet.style.borderColor = valido ? "#315c31f7" : "#FF0000";
}

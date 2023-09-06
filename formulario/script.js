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

    ColorirFieldset( document.querySelector('#fs-atividade'), 
        iQtdSelecionados == 0 || iQtdSelecionados > 3 ? false : true );
}

function ValidarRegiao(){
    let regiao = document.querySelector("input[name='regiao']:checked");
    
    ColorirFieldset(document.querySelector('#fs-regiao'), 
        regiao == null ? false : true );
}

function DesabilitarHabilitarAtividade(componente){ 

    let dba = document.querySelector('#dba');
    let programador = document.querySelector('#programador');

    dba.checked = false;
    programador.checked = false;

    dba.disabled = 
    programador.disabled = componente.target.id == 'centro' ? true : false;
}

function ValidarEmail(){
    if( ValidarTxt(txtEmail)){
        let sEmail = txtEmail.value;
        let iIndexArroba = sEmail.indexOf('@');
        let iIndexPonto = sEmail.lastIndexOf('.');
        let sMensagemInvalidacao = '';
        let sVirgula = '';

        if( iIndexArroba == -1 ){
            sMensagemInvalidacao += 'deve conter @';
            sVirgula = ', ';
        }

        if( iIndexPonto == -1  ){
            sMensagemInvalidacao += sVirgula + 'deve conter .';
        }

        if( sMensagemInvalidacao == '' && iIndexPonto < iIndexArroba ){
            sMensagemInvalidacao += '. deve vir depois do @';
        }
        
        AdicionarInvalidacao('email', sMensagemInvalidacao);
    }
}

function ValidarNome(){
    if( ValidarTxt(txtNome) && txtNome.value.length < 3 ){
        AdicionarInvalidacao('nome', 'nome deve conter ao menos 3 letras');
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
    
        if( dtFim <= dtIni ){
            AdicionarInvalidacao('disponibilidade', 'Data de inicio maior ou igual que data final');
        }
    }
}

function ColorirFieldset( fieldSet ,valido ){
    fieldSet.style.borderColor = valido ? '#315c31f7' : '#FF0000';
}

function AdicionarInvalidacao(nomeCampo, mensagem){

    let validacao = document.querySelector('#validacao-' + nomeCampo);
    let campo = document.querySelector('#' + nomeCampo);

    if( validacao != null )
        validacao.textContent = mensagem != '' ? '* ' + mensagem : '';
    if( campo != null )
        campo.style.borderColor = mensagem != '' ? '#FF0000' : '#315c31f7';
}

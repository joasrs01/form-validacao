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

    ValidarTxt(txtNome);

    if( txtNome.value.length < 3 )
        alert('nome menor que 3 caracteres');

    ValidarTxt(txtSobrenome);
    ValidarTxt(txtEmail);
    ValidarTxt(txtDataInicio);

    if( txtDataFim.value.toDate() > txtDataInicio.value.toDate() ){
        alert('teste')
    }

    ValidarTxt(txtDataFim);
    
    let regiao = document.querySelector("input[name='regiao']:checked");
    if( regiao == null ){
        let fs = document.querySelector('#fs-regiao');
        fs.style.borderColor = "#FF0000";
    }

    ValidarAtividade();

    //console.log(atividades);
    // console.log(document.querySelector('#centro').addEventListener('mouseleave', leave ));
    // console.log(txtEmail.value);
    // console.log(txtWebsite.value);
    // console.log(txtDataInicio.value);
    // console.log(txtDataFim.value);

    //console.log(regiao);
}

function ValidarTxt(componente){
    if( componente.value == ''){
        componente.style.borderColor = "#FF0000";
        componente.style.backgroundColor = "#e9bcbc";
    }  
}

function ValidarAtividade(){   
    let atividades = document.querySelectorAll("input[name='atividade']");
    let iQtdSelecionados = 0;

    atividades.forEach( comp =>
    {
        if( comp.checked )
            iQtdSelecionados++;     
    });

    if( iQtdSelecionados == 0 || iQtdSelecionados > 3 ){
        let fs = document.querySelector('#fs-atividade');
        fs.style.borderColor = "#FF0000";
    }

    console.log(iQtdSelecionados);
}

function DesabilitarHabilitarAtividade(componente){ 
    document.querySelector('#dba').disabled = 
    document.querySelector('#programador').disabled = componente.target.id == 'centro' ? true : false;
}
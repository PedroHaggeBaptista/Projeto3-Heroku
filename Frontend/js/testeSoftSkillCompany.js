let auth;
let idOffer
/* A adição dessa função que "escuta" um evento permite que verifiquemos se a página foi carregada */
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        window.localStorage.setItem('question', 0)
        document.getElementById('questionNumber').innerHTML = 'Questão 1/10'
        document.getElementById('questionMessage').innerHTML = Perguntas[0].pergunta
        auth = window.sessionStorage.getItem('auth')
        idOffer = window.sessionStorage.getItem('idOfferForSK')
        $.ajax({
            url: "http://localhost:3001/Company",
            headers: {"Authorization": `Bearer ${auth}`},
            method: "GET",
            success: function(resul) { 
                console.log(resul)
            }
        }).fail(function(err) {
            console.log(err.responseJSON.message)
            window.location.href = '/view/login.html'
        })
    }
}

const Perguntas = [
    {
        'id': 0,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que quando se depara com um pedido de ajuda para uma tarefa mais complexa, mas pode atrasar a sua e você acaba aceitando.'
    },
    {
        'id': 1,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que decide estudar mais para contestar a sua ideia de resolver um problema.'
    },
    {
        'id': 2,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que costuma ser criativo nas atividades que entrego.'
    },
    {
        'id': 3,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que consegue gerir facilmente os membros de um time a fim de entregar um produto melhor.'
    },
    {
        'id': 4,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que não só lidere a tarefa designada, mas também outro simultâneo para solucionar problemas sociais decorrentes de tal.'
    },
    {
        'id': 5,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que elabora os projetos designados com bastante antecedência para poder entregar o mais inovador possível.'
    },
    {
        'id': 6,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que tem muita paciência para lidar com colegas de trabalho com pouca experiência e ficar até depois do horário padrão do expediente.'
    },{
        'id': 7,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que mesmo depois da ideia dele ser recusada por um superior, procura outros responsáveis para ter outras opiniões para que a ideia seja aceita.'
    },
    {
        'id': 8,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que gosto de se programar antes de qualquer atividade para não deixar nada para última hora.'
    },
    {
        'id': 9,
        'selectedAnswer': '',
        'answer': '',
        'pergunta': 'Você precisa de uma pessoa que goste de pegar projetos que não domino totalmente a área.'
    },
]

//Chamado toda vez que um dos botões é pressionado
function passPage(operationType) {
    let numQuestion = window.localStorage.getItem('question')
        
    if (Number(numQuestion) + 1 == 9 && operationType == 'pass') {
        changeBtns(true)
    } else {
        changeBtns(false)
    }

    if (numQuestion == '0') {
        if (operationType == 'back') {
            operationType = ''
        }
    } else if (numQuestion == '9') {
        console.log('caiu')
        if (operationType == 'pass') {
            operationType = ''
        } 
    }

    if(numQuestion == null || numQuestion == undefined || numQuestion == '') {
        window.localStorage.setItem('question', 0)
        passPage()
    } else if (operationType === 'pass') {
        document.getElementById('divLoadingTeste').style.display = 'flex'
        setTimeout(() => {
            document.getElementById('divLoadingTeste').style.display = 'none'
            window.scroll(0, -5000)
            numQuestion = Number(numQuestion)
            var newNumQuestion = numQuestion + 1;
            window.localStorage.setItem('question', newNumQuestion)
            let answer = verifyAnswer()
            recordAnswer(numQuestion, answer)
            resetAnswers()
            renderQuestion(newNumQuestion)
        }, "1500")
        
    } else if (operationType === 'back') {
        document.getElementById('divLoadingTeste').style.display = 'flex'
        setTimeout(() => {
            document.getElementById('divLoadingTeste').style.display = 'none'
            window.scroll(0, -5000)
            numQuestion = Number(numQuestion)
            var newNumQuestion = numQuestion - 1;
            window.localStorage.setItem('question', newNumQuestion)
            let answer = verifyAnswer()
            recordAnswer(numQuestion, answer)
            resetAnswers()
            renderQuestion(newNumQuestion)
        }, "500")
        
    }
}

function renderQuestion(number) {
    var numForUser = number + 1
    document.getElementById('questionNumber').innerHTML = `Questão ${numForUser}/10`
    document.getElementById('questionMessage').innerHTML = Perguntas[number].pergunta
    if (Perguntas[number].selectedAnswer == '') {
        return
    } else {
        document.getElementById(Perguntas[number].selectedAnswer).checked = true
    }
    
}

function recordAnswer(number, answer) {
    Perguntas[number].selectedAnswer = answer.selectedAnswer
    Perguntas[number].answer = answer.answer
}

function verifyAnswer() {
    if (document.getElementById('concTotal').checked == true) {
        let selectedAnswer = 'concTotal'
        let answer = '4'
        return {selectedAnswer: selectedAnswer,answer: answer}
    } else if (document.getElementById('concParc').checked == true) {
        let selectedAnswer = 'concParc'
        let answer = '3'
        return {selectedAnswer: selectedAnswer, answer: answer}
    } else if (document.getElementById('meio').checked == true) {
        let selectedAnswer = 'meio'
        let answer = '2'
        return {selectedAnswer: selectedAnswer,answer: answer}
    } else if (document.getElementById('disParc').checked == true) {
        let selectedAnswer = 'disParc'
        let answer = '1'
        return {selectedAnswer: selectedAnswer,answer: answer}
    } else if (document.getElementById('disTotal').checked == true) {
        let selectedAnswer = 'disTotal'
        let answer = '0'
        return {selectedAnswer: selectedAnswer,answer: answer}
    } else {
        let selectedAnswer = ''
        let answer = ''
        return {selectedAnswer: selectedAnswer,answer: answer}
    }
}

function resetAnswers() {
    document.getElementById('concTotal').checked = false
    document.getElementById('concParc').checked = false
    document.getElementById('meio').checked = false
    document.getElementById('disParc').checked = false
    document.getElementById('disTotal').checked = false
}

function changeBtns(visible) {

    // let answer = verifyAnswer();
    // recordAnswer(9, answer)

    let forFinalizar
    let forBtns

    if(visible == true) {
        forFinalizar = true
        forBtns = false
    } else {
        forFinalizar = false
        forBtns = true
        document.getElementById('containerModalConfirm').style.display = 'none'
    }

    if(forFinalizar == true) {
        document.getElementById('finalizarBtnSoftSkill').style.display = 'inline';
        document.getElementById('passarBtnSoftSkill').style.display = 'none';
        document.getElementById('voltarBtnSoftSkill').style.display = 'inline';
        document.getElementById('colunaPassarBtn').style.display = 'none';
    } else if (forBtns == true) {
        document.getElementById('colunaPassarBtn').style.display = 'inline';

        document.getElementById('finalizarBtnSoftSkill').style.display = 'none';
        document.getElementById('passarBtnSoftSkill').style.display = 'inline';
        document.getElementById('voltarBtnSoftSkill').style.display = 'inline';
    }
}

function finalizarTeste(type) {
    console.log(auth)
    if(type == '') {
        let answer = verifyAnswer();
        recordAnswer(9, answer)
        document.getElementById('containerModalConfirm').style.display = 'flex'
        window.scroll(0, 300)
    } else if (type == 'sim') {
        let notResponded = []
        Perguntas.map((value) => {
            if (value.selectedAnswer === '' || value.answer === '') {
                console.log('Questões não preenchidas')
                notResponded.push((value.id) + 1)
            }
        })
        notResponded = notResponded.join()
        if (notResponded != '') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Questões não respondida -> ${notResponded}`,
                showConfirmButton: false,
                timer: 5000
            })
            document.getElementById('containerModalConfirm').style.display = 'none'
            changeBtns(false)
            resetAnswers()
            window.localStorage.setItem("question", Number(notResponded[0]) - 1)
            renderQuestion(Number(notResponded[0]) - 1)
        } else {
            console.log('sim')
            var answers = []
            Perguntas.map((element) => {
                answers.push(element.answer)
            })
            console.log(auth)
            $.ajax({
                url: "http://localhost:3001/Offer/Update",
                headers: {"Authorization": `Bearer ${auth}`},
                type: "PUT",
                data: { 
                    id_vaga: idOffer,
                    softSkills: answers
                },
                success: async function(resul) {
                    console.log(resul.message)
                    await Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Teste salvo com sucesso!",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    window.sessionStorage.removeItem('idOfferForSK')
                    window.location.href = '../view/myVagasCompany.html'
                    window.localStorage.removeItem('question')
                },
                error: function(err) {
                    console.log(err.responseJSON.error)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: err.responseJSON.error,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            })
            console.log(answers)
            
        }
    } else if (type == 'nao') {
        console.log(Perguntas)
        document.getElementById('containerModalConfirm').style.display = 'none'
    } else {
        document.getElementById('containerModalConfirm').style.display = 'none'
    }
    
}

function updateSoftSkills() {

}
//Objects

//Toggle loading screen (wait until BOC interest rate is fetched)
var interestRateLoaded = false

//Toggle submit button if form valid
var formValid = false

//Bank of Canada Interest Rate
var BOCIR

//Monthly Payment
var monthlyPayment = 0

//API Ninjas Key
var mykey = MY_KEY


//DOM Elements

//Container for monthly payment form
var monthlyPaymentForm = document.getElementById('monthlyPaymentForm')

//Initial loading screen (shown while fetching BOC Interest Rate)
var loadingScreen = document.getElementById('loadingScreen')

//Monthly payment form submit button
var submitBtn = document.getElementById("formSubmitBtn")

//Text within submit button
var submitBtnText = document.getElementById("btn_text")

//Spinner within submit button
var submitBtnSpinner = document.getElementById("btn_spinner")

//Monthly payment DOM element
var MonthlyPayment = document.getElementById("monthly_payment")

//Bank of Canada interest rate pct DOM element
var BOCIR_PCT = document.getElementById("BOCIR_PCT")

//Interest rate on form DOM element
var Interest = document.getElementById("I")



//LANGUAGE selection
let langs = document.querySelector('.langs'),
    link = document.querySelectorAll("a"),
    title = document.querySelector(".title"),
    description = document.querySelector(".description"),
    debt = document.querySelector(".debt"),
    month = document.querySelector(".month"),
    rate = document.querySelector(".rate"),
    submit = document.querySelector(".submit"),
    bank_rate = document.querySelector(".bank_rate"),
    bank_rate_desc = document.querySelector(".bank_rate_desc"),
    payement = document.querySelector(".payement"),
    payement_desc = document.querySelector(".payement_desc");


link.forEach(el=>{
     el.addEventListener("click", ()=>{
        langs.querySelector(".active").classList.remove("active");
        el.classList.add("active");

        let attr = el.getAttribute("language")

        title.textContent = data[attr].title
        description.textContent = data[attr].description
        debt.textContent = data[attr].debt
        month.textContent = data[attr].month
        rate.textContent = data[attr].rate
        submit.textContent = data[attr].submit
        bank_rate.textContent = data[attr].bank_rate
        bank_rate_desc.textContent = data[attr].bank_rate_desc
        payement.textContent = data[attr].payement
        payement_desc.textContent = data[attr].payement_desc

     })
})

let data = {
    french: {
        title: "Calcul Hypothécaire",
        description: "Cette application permet de calculer le paiement mensuel pour rembourser une dette hypothécaire selon un certain nombre de mois et un taux d'intérêt.",
        debt: "Dette",
        month: "Nombre de mois",
        rate: "Taux d'intérêt",
        submit: "Soumettre",
        bank_rate: "Taux directeur",
        bank_rate_desc: "Banque du Canada",
        payement: "Paiement Mensuel",
        payement_desc: "Calculé selon vos paramètres",

    },
    english: {
        title: "Mortgage Calculator",
        description: "This application calculates the monthly payment to pay off a mortgage debt based on a certain number of months and an interest rate.",
        debt: "Debt",
        month: "Number of months",
        rate: "Interest rate",
        submit: "Submit",
        bank_rate: "Bank rate",
        bank_rate_desc: "Bank of Canada",
        payement: "Monthly payment",
        payement_desc: "Calculated according to your parameters",

    },

}



//functions


//Get BOC Interest Rate from APININJA
async function getInterestRate(){

    const url = 'https://api.api-ninjas.com/v1/interestrate?country=canada&central_bank_only=true'
    const response = await fetch(url, {

        method: 'GET',
        headers: {
            'X-Api-Key': mykey
        }

    })

    return response.json()
    
}



//Validate monthly payment form, submit button is disabled if input does not match a certain criteria
function validateForm(){

    var D = document.getElementById('D').value
    var N = document.getElementById('N').value
    var I = document.getElementById('I').value

    
    if(D > 0 && (N > 0 && Number.isInteger(+N))){

        if(I){

            if(I > 0){

                formValid = true

            }else{

                formValid = false
            }

        
        }else{

            formValid = true

        }

       
        
    }else{


        if(formValid){
            formValid = false
        }
    }

    if(formValid){
        submitBtn.disabled = false
    }else{
        submitBtn.disabled = true
    }

}



//Submit form, Call generateMonthlyPayments function and await results
async function submitForm(){





    var D = document.getElementById('D').value
    var N = document.getElementById('N').value
    var I = document.getElementById('I').value



    //Disable submit button while fetching result
    submitBtn.disabled = true

    //Hide text in submit button
    submitBtnText.style.display = 'none'

    //Show spinner in submit button
    submitBtnSpinner.style.display = 'flex'

    //Call generateMonthlyPayments function and await results
    await generateMonthlyPayments(D,N,I).then(res => {

        console.log(res)
        
        //Round result to whole value
        monthlyPayment = Math.round(res.monthly_payment)

        //Enable button
        submitBtn.disabled = false

        //Hide text while loading
        submitBtnText.style.display = 'block'

        //Show spinner while loading
        submitBtnSpinner.style.display = 'none'

        //Set monthly payment value
        MonthlyPayment.innerHTML = monthlyPayment+"$"

    })


}


//Call API Gateway Function with parameters as input, return response as json
async function generateMonthlyPayments(D=null,N=null,I=null){


    const url = `https://68i65eau8i.execute-api.us-east-1.amazonaws.com/default/calcule_hypothecaire?N=${N}&I=${I}&D=${D}`

    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
        
    })

    return response.json()


}



//Display percentage as decimal
function toDecimal(pct){

    return pct/100
    
}



//Refresh DOM Values, display loading page while fetching BOC Rate, display Form once BOC rate is loaded
function refreshDOM(){

    if(interestRateLoaded){
        loadingScreen.style.display = 'none'
        monthlyPaymentForm.style.display = 'block'
        document.getElementById('langs').style.display = 'block'
    }else{
        loadingScreen.style.display = 'block'
        monthlyPaymentForm.style.display = 'none'
        document.getElementById('langs').style.display = 'none'
    }

    //Set monthly payment value
    MonthlyPayment.innerHTML = monthlyPayment+"$"

    //Set Bank of Canada interest rate
    BOCIR_PCT.innerHTML = BOCIR+"%"

    //Increment interest form value to BOCIR + 1 as decimal and set as default value (disable input ?)
    Interest.value = toDecimal(BOCIR + 1) 

}




//Init
// On window load, fetch BOC rate and display in form. 
window.onload = async function() {

    setTimeout(async () => {


        await getInterestRate().then(res => {
        
            BOCIR = res.central_bank_rates[0].rate_pct

            interestRateLoaded = true
            validateForm()
            refreshDOM()
    
        })

       


    }, 1)
    

}


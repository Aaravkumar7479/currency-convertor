const apiKey ="cur_live_qwzn6cx5bZI7nUsUgzDon6Dn4SL7KKqvCJjoqg1j";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(" form button");
const amount=document.querySelector("form input");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{ // whenever web page loads initial conversion will disaplay.
    updateExchangeRate();
});

for (let select of dropdowns){/*looping through the dropdowns*/
    for (currCode in countryList){/*looping through the country list*/
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        } 
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";//selecting the new option
            
        }
        select.append(newOption); 
        //adding new option to the select dropdown
    }
    select.addEventListener("change",(evt)=>{
        // console.log(evt); //event object
        updateFlag(evt.target);//target is the element that triggered the event
    });
}


const updateFlag=(element)=>{
    // console.log(element);
let currCode=element.value;
let countryCode=countryList[currCode];
// console.log(countryCode);
newImageSource=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newImageSource;//updating the image source

};  
btn.addEventListener("click",(evt)=>{ 
    evt.preventDefault();//preventing the default behavior of the form
    
updateExchangeRate();
    

});

const updateExchangeRate=async ()=>{
  // console.log(amount);
  let amountValue=amount.value;
  if(amountValue=="" || amountValue==null || amountValue<=0 ){
      amountValue=1;
      amount.value=1;
  };
  // console.log(fromCurr.value,toCurr.value)
  const URL=`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
  let response=await fetch(URL);
  // console.log(response);
  let data= await response.json()
  // console.log(data)
  let rate=data.data[toCurr.value].value;
  console.log(rate);
  let finalAmount=amount.value * rate;
  console.log(finalAmount)
  msg.innerText=`${amount.value}  ${fromCurr.value} = ${finalAmount}  ${toCurr.value}`;

};
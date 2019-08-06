var $ = function (id) {
       return document.getElementById(id);
};
function clrscrn (){
    $("form1").reset();
    $("results").innerHTML = "";
    $("StudentNo").focus();
}
window.onload = function (){
    $("btnClr").onclick = clrscrn;
    $("btnCalc").onclick = calculate;
    $("StudentNo").focus();
};
window.onerror = function(a,b,c,d) {
    alert(a + '\n' + b + '\n' + c + '\n' + d);
    return false;
};

function calculate(){      
    var val = document.getElementById('StudentNo').value;
    if (!val.match(/^(a|A)([0-9]{8})$/)){ 
        $("Bad_Student_Id").firstChild.nodeValue = "Bad/Missing Student ID";
    return ;
    }else { $("Bad_Student_Id").firstChild.nodeValue = ""; 
    
}  
    var lnm = $("LastName").value.trim();
    if (lnm === ""){
    $("last_name").firstChild.nodeValue = "Last Name is missing";
    return ;
    }else { $("last_name").firstChild.nodeValue = "";  
}  
    var fnm = $("FirstName").value.trim();
    if (fnm === ""){
        $("first_name").firstChild.nodeValue = "First Name is missing";
    return ;
    }else { $("first_name").firstChild.nodeValue = ""; 
}  
    var q1 = validateScore("Q1");
    if (q1 === -1) {
        return;
    }
    var q2 = validateScore("Q2");
    if (q2 === -1) {
        return;
    }
    var q3 = validateScore("Q3");
    if (q3 === -1) {
        return;
    }
    var q4 = validateScore("Q4");
    if (q4 === -1) {
        return;
    }
    var q5 = validateScore("Q5");
    if (q5 === -1) {
        return;
    }
    var qm = validateScore("QM");
    if (qm === -1) {
        return;
    }
    //calculate quiz average
    var qavg = quizAverage(q1,q2,q3,q4,q5,qm);
    
    var mt = validateScore("MidTerm");
    if (mt === -1) {
        return;
    }
    var pr = validateScore("Problems");
    if (pr === -1) {
        return;
    }
    var fe = validateScore("Final");
    if (fe === -1) {
        return;
    }  
    
    if ((qavg>=89.5)&&(mt>=89.5)&&(pr>=89.5)) {
        var cavg = (qavg+mt+pr)/3;
            }else {
              var cavg = (qavg * .5) + (mt *.15) + (pr *.1) +(fe *.25);  
            }
var lgrade ="";
if (cavg >= 89.5) {
     lgrade ="A";
    }else if(cavg >= 79.5)
    {
        lgrade ="B";
    }else if (cavg >=69.5)
    {
        lgrade ="C";
    }else if (cavg >=59.5){
        lgrade ="D";
    }else{
        lgrade ="F";
    }
    $("results").innerHTML = " Quiz Average = " + qavg.toFixed(1) + 
            " and course average = " +cavg.toFixed(2) + 
            " for a Grade of: " +lgrade; 
}


function validateScore(id){
    var s =  parseFloat( $(id).value );
    if (isNaN(s) || s <0 || s >125) {
        alert(id + " must be a number from 0 to 125");
        $(id).focus();
        s = -1;
    }
    return s;
}
function quizAverage(q1,q2,q3,q4,q5,qm) {
    var qa = [q1,q2,q3,q4,q5,qm];
    qa.sort(function (a,b) {
        return a-b;
            }    
            );
    return (qa[2]+qa[3]+qa[4]+qa[5])/ 4.0;
}

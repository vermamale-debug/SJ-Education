const quiz = [
  {q:"Which planet is known as the Red Planet?", a:["Earth","Mars","Jupiter","Venus"], correct:1},
  {q:"What is 9 × 6?", a:["42","48","54","63"], correct:2},
  {q:"Which gas do plants mainly use for photosynthesis?", a:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], correct:2},
  {q:"Which word is a noun?", a:["Beautiful","Run","School","Quickly"], correct:2},
  {q:"How many days are there in a leap year?", a:["365","366","364","360"], correct:1}
];

let current=0, score=0, answered=false;
const area=document.getElementById("questionArea"), next=document.getElementById("nextBtn");
const bar=document.getElementById("progressBar"), scoreEl=document.getElementById("score"), result=document.getElementById("quizResult");

function renderQuestion(){
  answered=false;
  const item=quiz[current];
  bar.style.width=((current+1)/quiz.length*100)+"%";
  area.innerHTML=`<div class="question-number">Question ${current+1} of ${quiz.length}</div>
    <div class="question">${item.q}</div>
    <div>${item.a.map((x,i)=>`<button class="option" data-index="${i}">${x}</button>`).join("")}</div>`;
  document.querySelectorAll(".option").forEach(btn=>btn.addEventListener("click",()=>choose(btn)));
  next.textContent=current===quiz.length-1?"Finish Quiz →":"Next Question →";
  next.disabled=true;
}
function choose(btn){
  if(answered)return;
  answered=true;
  const picked=Number(btn.dataset.index), correct=quiz[current].correct;
  document.querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===correct)b.classList.add("correct")});
  if(picked===correct){score++;btn.classList.add("correct")}else btn.classList.add("wrong");
  scoreEl.textContent=`${score} / ${quiz.length}`;
  next.disabled=false;
}
next.addEventListener("click",()=>{
  if(!answered)return;
  if(current<quiz.length-1){current++;renderQuestion();}
  else{
    area.innerHTML=`<div class="question">🎉 Quiz complete!</div><p>You scored <strong>${score} out of ${quiz.length}</strong>. Keep learning and try again!</p>`;
    next.style.display="none"; result.hidden=false; result.textContent="Great job — learning never stops!";
  }
});
document.getElementById("resetQuiz").addEventListener("click",()=>{
  current=0;score=0;scoreEl.textContent=`0 / ${quiz.length}`;next.style.display="inline-flex";next.disabled=true;result.hidden=true;renderQuestion();
});
renderQuestion();

document.getElementById("year").textContent=new Date().getFullYear();
const toggle=document.querySelector(".menu-toggle"), links=document.querySelector(".nav-links");
toggle.addEventListener("click",()=>{const open=links.classList.toggle("open");toggle.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("shareBtn").addEventListener("click",async()=>{
  const data={title:"SJ Education",text:"Learn • Explore • Grow with SJ Education!",url:location.href};
  try{
    if(navigator.share) await navigator.share(data);
    else {await navigator.clipboard.writeText(location.href); alert("Website link copied! You can now share it.");}
  }catch(e){}
});

// IMPORTANT: replace "#" in index.html with your real Facebook Page URL.
document.getElementById("facebookBtn").addEventListener("click",(e)=>{
  if(e.currentTarget.getAttribute("href")==="#"){
    e.preventDefault();
    alert("Open index.html and replace the Facebook link with your SJ Education Page URL.");
  }
});

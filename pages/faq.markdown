---
permalink: /faq-schema
---
<style>
  *{box-sizing:border-box}
  hr{margin-top:20px}
  button.right{float:right}
  #HowToStep button, #Schema button{font-size:x-large;border:0;outline:none;background:none}
  #HowToStep{width:49%}
  #HowToStep section{display:inline-block;padding:10px;width:100%;clear:both}
  #Schema{padding:10px;width:49%;height:80%;background-color:#6666;float:right}
  #Markup{width:100%;height:100%;display:block;margin:10px 0px;padding:10px;background:#cccc}
</style>
<script async src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
<script>
  function escapeHtml(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
   }
  function toClip(){
    markify();
    const codeArea = document.querySelector('#Markup');
    const code = document.createRange();
    window.getSelection().empty();
    code.setStartBefore(codeArea);
    code.setEndAfter(codeArea) ;
    window.getSelection().addRange(code);
    document.execCommand("copy");
  }
  // meh!
  function addField(sourceId){
    const inputArea = document.querySelector('#HowToStep');
    const rando = Math.random().toFixed(2);
    const inputWrap = Object.assign(
      document.createElement('section'),
      {
        id: '_'+parseInt(100*rando,10)
      }
    );
    inputWrap.style.backgroundColor = `rgba(128,128,128,${rando})`;
    inputWrap.appendChild(document.createTextNode('FAQ:'));
    inputWrap.appendChild(
      Object.assign(
        document.createElement('button'),
        {
          innerText: '➕',
          className: 'right'
        }
      )
    );
    inputWrap.appendChild(
      Object.assign(
        document.createElement('button'),
        {
          innerText: '➖',
          className: 'right'
        }
      )
    );
    inputWrap.appendChild(document.createElement('hr'));
    ['question', 'answer'].forEach(placeholder=>{
      inputWrap.appendChild(
        Object.assign(
          document.createElement('textarea'), 
          { placeholder }
        )
      );
    });
    if(! sourceId) {
      return inputArea.appendChild(inputWrap);
    } else {
      inputArea.insertBefore(inputWrap, document.querySelector(`#${sourceId}`).nextSibling);
    }

  }
  function removeField(sourceId){
    const inputArea = document.querySelector('#HowToStep');
    if(inputArea.children.length < 2) {
      return
    }
    const toRemove = sourceId ? document.querySelector(`#HowToStep #${sourceId}`) : inputArea.lastChild;
    inputArea.removeChild(toRemove);
  }
  function linearize(acc, inputElem) {
    if(!inputElem.value) return acc;
    return Object.assign(acc, {
      [inputElem.placeholder]: inputElem.value
    });
  }
  function markify(){
    const qa = document.querySelectorAll('#HowToStep textarea');
    const qaData = [...Array(qa.length/2)].map(v=>({"@type":"Question","acceptedAnswer":{"@type":"Answer"}}))
    for(let qai = 0; qai < qa.length; qai++) {
      const qaElement = qa[qai].value;
      const qaDataElement = qaData[parseInt(qai/2)];          
      if(qai%2) {
        //odd - answer
        qaDataElement["acceptedAnswer"]["text"] = qaElement;
      } else {
        //even - question
        qaDataElement["name"] = qaElement
      }
    }
    if(!qaData.length) return;
    const schema = {
      "@context": "http://schema.org",
      "@type": "FAQPage",
      "mainEntity": qaData
    }
    const linearSchema = '<script type="application/ld+json">'+JSON.stringify(schema)+'<\/script>';
    if (typeof PR === 'undefined') {
      document.querySelector('#Markup').innerText = linearSchema; 
    } else {
      document.querySelector('#Markup').innerHTML = PR.prettyPrintOne(escapeHtml(linearSchema))
    }
  }
  function modSections({target: {tagName = '', className = '', innerText, parentElement}}) {
    if(tagName !== 'BUTTON' || !parentElement) return;
    switch(innerText) {
      case '➕':
        addField(parentElement.id);
        break;
      case '➖':
        removeField(parentElement.id);
        break;
    }
    return;
  }
</script>
<h1>FAQ Schema Generator</h1>
<aside id="Schema">
  <center>
    <button onclick="markify()" title="Build Schema">🏗️</button>
    <button onclick="toClip()" title="Copy Schema">📋</button>
    <a href="https://search.google.com/test/rich-results" target="_blank" style="text-decoration: none;" title="Test Schema">🔗</a>
  </center>
  <code id="Markup" class="prettyprint" contenteditable></code>
</aside>
<main id="HowToStep" onclick="modSections(arguments[0])">
  <section style="background-color: #6666">
    FAQ
    <button class="right">➕</button>
    <button class="right">➖</button>
    <hr/>
    <textarea placeholder="question"></textarea>
    <textarea placeholder="answer"></textarea>
  </section>
</main>
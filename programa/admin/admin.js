// CliniZap Admin v2.0 - IA Computers
const ABC='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function rand(n){let s='';for(let i=0;i<n;i++)s+=ABC[Math.floor(Math.random()*ABC.length)];return s}
function checksumOk(k,hwid){k=k.replace(/-/g,'');let s=0;for(const c of k)s+=c.charCodeAt(0);return (s+hwid.length*7)%11===0}
function generar(){const cli=document.getElementById('cli').value.trim()||'Clinica';const hw=document.getElementById('hw').value.trim()||'CZ-XXXX';let key='';
for(let t=0;t<600;t++){const raw=rand(25);if(checksumOk(raw,hw)){key=raw;break}}
if(!key){alert('Intenta de nuevo');return}
const fmt=key.match(/.{1,5}/g).join('-');
document.getElementById('out').innerHTML=`<p>Clave para <b>${cli}</b>:</p><code>${fmt}</code><br><br><button class="btn" onclick="navigator.clipboard.writeText('${fmt}');alert('Copiada')">COPIAR CLAVE</button>`;
let L=JSON.parse(localStorage.getItem('cz_admin')||'[]');L.push({cli:cli,key:fmt,hw:hw,estado:'Activa'});localStorage.setItem('cz_admin',JSON.stringify(L));lista()}
function lista(){const tb=document.getElementById('lc');tb.innerHTML='';JSON.parse(localStorage.getItem('cz_admin')||'[]').forEach((c,i)=>{tb.innerHTML+=`<tr><td>${c.cli}</td><td><code>${c.key}</code></td><td><a href="#" onclick="tog(${i});return false" style="color:#6D28D9;font-weight:bold">${c.estado}</a></td></tr>`})}
function tog(i){let L=JSON.parse(localStorage.getItem('cz_admin')||'[]');L[i].estado=L[i].estado==='Activa'?'Pausada':'Activa';localStorage.setItem('cz_admin',JSON.stringify(L));lista()}
lista();

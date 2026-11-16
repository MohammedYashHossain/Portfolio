const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const p = portfolio;
let selected = 0;
const external = (url, label, cls = '') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
const cover = item => `<img src="${esc(item.image)}" alt="" loading="lazy">`;
const projectCard = item => `<a class="album" href="#project/${item.id}"><div class="album-art">${cover(item)}<span class="album-play" aria-hidden="true">▶</span></div><h3>${esc(item.title)}</h3><p>${esc(item.type)}</p></a>`;
const heading = (title, sub = '', link = '') => `<div class="section-heading"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${link ? `<a href="${link}">Show all</a>` : ''}</div>`;
const projects = items => `<div class="album-grid">${items.map(projectCard).join('')}</div>`;
const platforms = [
 {title:'Holiday Handouts',type:'500+ people fed. More to do.',image:'HHPNG.png',url:'https://www.instagram.com/holidayhandouts/'},
 {title:'YouTube',type:'Life, projects & everything between.',image:'youtube.png',url:'https://www.youtube.com/@mowhossain'},
 {title:'Volleyball TikTok',type:'6M+ views. A lot of volleyball.',image:'TikTok.png',url:'https://www.tiktok.com/@volley.hossain'},
 {title:'LinkedIn',type:'The professional side of me.',image:'Professional Headshot.jpg',url:'https://www.linkedin.com/in/mohammedyhossain/'}
];

function communitySection(standalone = false) {
 const titleTag = standalone ? 'h1' : 'h2';
 return `<section class="life-feature community-feature" aria-labelledby="community-title"><div class="life-photo"><img src="holidayhandoutsfounders.png" alt="The Holiday Handouts founders behind a table of gifts and supplies" loading="lazy"><span>With the Holiday Handouts crew</span></div><div class="life-copy"><p class="eyebrow">FOR THE COMMUNITY · NEWARK, NJ</p><${titleTag} id="community-title">Holiday Handouts</${titleTag}><p>I started Holiday Handouts with my roommates. We feed people, give back to kids, and help out neighbors who could use a hand.</p><div class="impact-stats"><div><strong>500+</strong><span>people fed through our work</span></div></div><p>I handle the tech and marketing, but the best part is getting out there with my friends and making it happen.</p>${external('https://www.instagram.com/holidayhandouts/','See what we’re doing on Instagram','green-button')}<small>@holidayhandouts</small></div></section>`;
}
function volleyballSection(standalone = false) {
 const titleTag = standalone ? 'h1' : 'h2';
 return `<section class="life-feature volleyball-feature" aria-labelledby="volleyball-title"><div class="life-photo"><img src="Ballin.jpg" alt="Mohammed jumping at the net during a volleyball game" loading="lazy"><span>Probably at the court</span></div><div class="life-copy"><p class="eyebrow">VOLLEYBALL · @VOLLEY.HOSSAIN</p><${titleTag} id="volleyball-title">I play. A lot.</${titleTag}><p>Volleyball is a huge part of my life. If I’m not working on something, there’s a good chance I’m playing or posting clips from the court.</p><div class="impact-stats"><div><strong>6M+</strong><span>TikTok views</span></div><div><strong>500+</strong><span>followers</span></div></div><p>The games, the people, the clips. It’s all on my TikTok.</p>${external('https://www.tiktok.com/@volley.hossain','Watch the volleyball clips','green-button')}<small>@volley.hossain</small></div></section>`;
}

function home() {
 return `<section class="welcome"><p class="eyebrow">STOCKTON UNIVERSITY · COMPUTER SCIENCE + ECONOMICS</p><h1>Hey, I’m Mohammed.</h1><p>I build stuff, play a lot of volleyball, and give back with my friends. Take a look around.</p><div class="quick-grid">${p.projects.slice(0,4).map(x=>`<a href="#project/${x.id}">${cover(x)}<strong>${esc(x.title)}</strong><span aria-hidden="true">▶</span></a>`).join('')}</div></section>
 <section class="artist-banner"><div class="artist-copy"><p class="eyebrow">A LITTLE ABOUT ME</p><h2>Mohammed<br>Hossain<span>.</span></h2><p>Building. Balling. Coding.</p><div class="banner-actions"><a class="green-button" href="#about">Meet Mohammed</a><a href="Mohammed_Hossain_Resume.pdf" download>View résumé ↗</a></div></div><img src="New_headshot.png" alt="Mohammed Hossain"></section>
 <section>${heading('Made by Mohammed','A few things I’ve been working on.','#projects')}${projects(p.projects.slice(0,3))}</section>
 ${communitySection()}
 ${volleyballSection()}
 <section>${heading('Jump back in','Find me here.')}<div class="platform-grid">${platforms.map(x=> `<a class="album" href="${x.url}" target="_blank" rel="noopener noreferrer"><div class="album-art platform-art">${cover(x)}<span class="album-play" aria-hidden="true">↗</span></div><h3>${x.title}</h3><p>${x.type}</p></a>`).join('')}</div></section>
 <section>${heading('Off the clock','Good people. Good times.','#about')}<div class="photo-grid">${p.gallery.slice(0,3).map(x=>`<figure>${cover(x)}<figcaption>${esc(x.title)}</figcaption></figure>`).join('')}</div></section>`;
}
function projectDetail(id) {
 const item = p.projects[id];
 if (!item) return `<h1>Project not found</h1><a href="#projects">Back to projects</a>`;
 selectProject(id);
 return `<section class="detail-hero">${cover(item)}<div><p class="eyebrow">PROJECT PLAYLIST</p><h1>${esc(item.title)}</h1><p>${esc(item.type)}</p><strong>Mohammed Hossain</strong> <span> • ${item.tags.length} technologies</span></div></section><section class="detail-body"><div class="detail-actions"><a class="green-button" href="#projects">← All projects</a>${item.links.map(x=>external(x.url,x.label,'outline-button')).join('')}</div><h2>Behind the project</h2><p class="description">${esc(item.description)}</p>${!item.links.length?'<p class="muted">Want to hear more about this work? <a href="mailto:mohossain.swe@gmail.com">Get in touch ↗</a></p>':''}<h2>The technology tracklist</h2><div class="track-header"><span>#</span><span>Technology</span><span>Collection</span></div>${item.tags.map((tag,i)=>`<a class="tech-track" href="#search/${encodeURIComponent(tag)}"><span>${i+1}</span><strong>${esc(tag)}</strong><span>${esc(item.type)}</span></a>`).join('')}</section><section>${heading('Keep exploring')}${projects(p.projects.filter(x=>x.id!==id).slice(0,3))}</section>`;
}
function skillView() {
 return `<section class="page-intro"><p class="eyebrow">MY EVERYDAY ROTATION</p><h1>Coding & skills</h1><p>The languages, tools, and ideas behind the work. Select a skill to find related projects.</p></section><div class="skill-grid">${p.skills.map((x,i)=>`<section class="skill-card tone-${i}"><span class="skill-number">0${i+1}</span><h2>${esc(x.title)}</h2><div>${x.items.map(t=>`<a href="#search/${encodeURIComponent(t)}">${esc(t)} ↗</a>`).join('')}</div></section>`).join('')}</div>`;
}
function experienceView() {
 return `<section class="page-intro"><p class="eyebrow">THE CAREER COLLECTION</p><h1>Work activity</h1><p>Research, engineering, and community leadership.</p></section><div class="experience-list">${p.experience.map((x,i)=>`<article id="role-${i}"><span class="company-icon tone-${i%6}">${esc(x.company[0])}</span><div><p class="eyebrow">${esc(x.date)}</p><h2>${esc(x.title)}</h2><h3>${esc(x.company)}</h3><p>${esc(x.description)}</p></div></article>`).join('')}</div>`;
}
function aboutView() {
 return `<section class="detail-hero about-hero"><img src="New_headshot.png" alt="Mohammed Hossain"><div><p class="eyebrow">ABOUT ME</p><h1>Mohammed<br>Yash Hossain</h1><p>Computer Science + Economics · Stockton University</p></div></section><section class="about-copy"><h2>CS major touches grass?! (Literally)</h2>${p.about.map(x=>`<p>${esc(x)}</p>`).join('')}<div class="detail-actions">${external('https://github.com/MohammedYashHossain','GitHub','outline-button')}${external('https://www.linkedin.com/in/mohammedyhossain/','LinkedIn','outline-button')}<a class="green-button" href="mailto:mohossain.swe@gmail.com">Say hello ↗</a></div></section><section>${heading('Outside of class')}<div class="photo-grid">${p.gallery.map(x=>`<figure>${cover(x)}<figcaption>${esc(x.title)}</figcaption></figure>`).join('')}</div></section><section>${heading('From my feeds')}<div class="feed-links">${p.updates.map(x=>external(x.url,x.label,'outline-button')).join('')}</div></section>`;
}
function searchView(query) {
 const q=query.toLowerCase().trim();
 const matches=p.projects.filter(x=>[x.title,x.type,x.description,...x.tags].join(' ').toLowerCase().includes(q));
 const skills=p.skills.flatMap(x=>x.items).filter(x=>x.toLowerCase().includes(q));
 return `<section class="page-intro"><p class="eyebrow">SEARCH THE COLLECTION</p><h1>Results for “${esc(query)}”</h1><p role="status">${matches.length} projects found</p></section>${matches.length?projects(matches):'<div class="empty-state"><h2>No matching projects yet.</h2><p>Try Python, robotics, React, or explore the full collection.</p><a class="green-button" href="#projects">Browse projects</a></div>'}${skills.length?`<section>${heading('In my toolkit')}<div class="skill-pills">${[...new Set(skills)].map(x=>`<span>${esc(x)}</span>`).join('')}</div></section>`:''}`;
}
function render() {
 const [route,param='']=location.hash.slice(1).split('/');
 const page=route || 'home';
 let query; try { query=decodeURIComponent(param); } catch { query=param; }
 $('#search').value=page==='search'?query:'';
 let html;
 if(page==='project') html=projectDetail(Number(param));
 else if(page==='projects') html=`<section class="page-intro"><p class="eyebrow">THE COMPLETE COLLECTION</p><h1>Projects on repeat</h1><p>Some big projects, some things I made for fun.</p></section>${projects(p.projects)}<section>${heading('The early releases','Smaller projects that show the reps.')}<div class="archive-grid">${p.archive.map(x=>`<a class="archive-item" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${cover(x)}<div><h3>${esc(x.title)}</h3><p>${esc(x.type)}</p></div><span>↗</span></a>`).join('')}</div></section>`;
 else if(page==='skills') html=skillView();
 else if(page==='experience') html=experienceView();
 else if(page==='about') html=aboutView();
 else if(page==='community') html=communitySection(true);
 else if(page==='volleyball') html=volleyballSection(true);
 else if(page==='search') html=searchView(query);
 else if(page==='releases') html=`<section class="page-intro"><p class="eyebrow">IN THE SPOTLIGHT</p><h1>New releases</h1><p>A selection of featured work from my current portfolio.</p></section>${projects(p.projects.slice(0,3))}<section>${heading('Latest work experience')}<a class="release-work" href="#experience"><span class="eyebrow">${esc(p.experience[0].date)}</span><h2>${esc(p.experience[0].title)}</h2><p>${esc(p.experience[0].company)}</p><span>Explore work activity ↗</span></a></section>`;
 else html=home();
 $('#view').innerHTML=html;
 document.querySelectorAll('[data-page]').forEach(a=>{const active=a.dataset.page===page; a.classList.toggle('active',active); if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 $('.main').scrollTop=0;
 document.title=`${page==='project'&&p.projects[Number(param)]?p.projects[Number(param)].title:'Mohammed Hossain'} — The Portfolio`;
}
function selectProject(id) {
 selected=(id+p.projects.length)%p.projects.length;
 const item=p.projects[selected];
 $('#now-project').href=`#project/${selected}`;
 $('#now-project img').src=item.image;
 $('#now-title').textContent=item.title;
 $('#now-type').textContent=item.type;
 $('#track-index').textContent=String(selected+1).padStart(2,'0');
 $('#track-progress').style.width=`${(selected+1)/p.projects.length*100}%`;
 $('#open-project').setAttribute('aria-label',`Open ${item.title}`);
}
$('#library-items').innerHTML=`<a class="library-row" href="#community"><img src="HHPNG.png" alt=""><span><strong>Holiday Handouts</strong><small>Community · 500+ people fed</small></span></a><a class="library-row" href="#volleyball"><img src="Ballin.jpg" alt=""><span><strong>Volleyball</strong><small>TikTok · 6M+ views</small></span></a><a class="library-row collection" href="#projects"><span class="collection-cover">✦</span><span><strong>Made by Mohammed</strong><small>Collection · 6 projects</small></span></a>`+p.projects.map(x=>`<a class="library-row" href="#project/${x.id}">${cover(x)}<span><strong>${esc(x.title)}</strong><small>Project · ${esc(x.tags.slice(0,2).join(', '))}</small></span></a>`).join('')+`<a class="library-row" href="#about"><img src="Ballin.jpg" alt=""><span><strong>Beyond the code</strong><small>Community, content & volleyball</small></span></a>`;
$('#activity-items').innerHTML=p.experience.map((x,i)=>`<a class="activity-item" href="#experience"><span class="company-icon tone-${i%6}">${esc(x.company[0])}</span><div><strong>${esc(x.company.split(' - ')[0])}</strong><p>${esc(x.title)}</p><small>${esc(x.date)}</small></div></a>`).join('');
$('#previous').addEventListener('click',()=>selectProject(selected-1));
$('#next').addEventListener('click',()=>selectProject(selected+1));
$('#open-project').addEventListener('click',()=>{location.hash=`project/${selected}`;});
let searchTimer;
$('#search').addEventListener('input',e=>{clearTimeout(searchTimer);const value=e.target.value;searchTimer=setTimeout(()=>{location.hash=value.trim()?`search/${encodeURIComponent(value)}`:'home';},220);});
window.addEventListener('hashchange',()=>{clearTimeout(searchTimer);render();});
render();

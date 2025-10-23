 // Datos breves por municipio (título, breve, descripción, imagen)
        const municipios = {
            "managua":{
                title:"Managua",
                short:"Centro político y cultural de Nicaragua con historia de reconstrucción.",
                desc:"Managua ha sido un núcleo urbano importante desde finales del periodo colonial. Su historia incluye crecimiento comercial, eventos sísmicos significativos y una vida cultural vibrante que mezcla tradiciones y modernidad.",
                img:"https://source.unsplash.com/800x600/?managua,nicaragua,city",
                imgAlt:"Vista urbana de Managua"
            },
            "ciudad-sandino":{
                title:"Ciudad Sandino",
                short:"Crecido suburbio industrial con fuerte identidad comunal.",
                desc:"Ciudad Sandino surgió como área de crecimiento urbano e industrial. Es conocido por su comunidad activa, mercados locales y celebraciones populares que reflejan la vida social del departamento.",
                img:"https://source.unsplash.com/800x600/?suburb,city",
                imgAlt:"Calles de Ciudad Sandino"
            },
            "mateare":{
                title:"Mateare",
                short:"Municipio cercano al lago con tradición agrícola.",
                desc:"Mateare conserva actividades agrícolas y costumbres rurales vinculadas al Lago Xolotlán. Su historia local está marcada por el trabajo comunitario y festividades tradicionales.",
                img:"https://source.unsplash.com/800x600/?lake,managua",
                imgAlt:"Paisaje en Mateare"
            },
            "tipitapa":{
                title:"Tipitapa",
                short:"Importante por su comercio y cercanía a vías principales.",
                desc:"Tipitapa ha sido históricamente un punto de paso y comercio. Sus conexiones viales y mercados lo han convertido en un lugar estratégico entre Managua y regiones vecinas.",
                img:"https://source.unsplash.com/800x600/?market,central-america",
                imgAlt:"Mercado en Tipitapa"
            },
            "ticuantepe":{
                title:"Ticuantepe",
                short:"Famoso por sus cerros y actividades agrícolas.",
                desc:"Ticuantepe destaca por su geografía de cerros y clima agradable. Es popular para actividades rurales y ecoturísticas, con pequeñas fincas y tradiciones campesinas.",
                img:"https://source.unsplash.com/800x600/?hills,coffee",
                imgAlt:"Colinas en Ticuantepe"
            },
            "san-rafael":{
                title:"San Rafael del Sur",
                short:"Conocido por sus playas y tradiciones costeras.",
                desc:"Con acceso al Pacífico, San Rafael del Sur combina vida costera y tradición campesina. Sus playas y festividades locales atraen visitantes de la región.",
                img:"https://source.unsplash.com/800x600/?beach,nicaragua",
                imgAlt:"Playa en San Rafael del Sur"
            },
            "el-crucero":{
                title:"El Crucero",
                short:"Municipio montañoso con miradores y clima fresco.",
                desc:"El Crucero es famoso por sus vistas panorámicas y clima más fresco. Históricamente ha sido un punto de descanso y turismo local fuera del bullicio capitalino.",
                img:"https://source.unsplash.com/800x600/?mountain,view",
                imgAlt:"Mirador en El Crucero"
            },
            "villa-el-carmen":{
                title:"Villa El Carmen",
                short:"Zona con desarrollo agrícola e industrial local.",
                desc:"Villa El Carmen combina actividad agrícola con sectores industriales emergentes, manteniendo tradiciones culturales y eventos comunitarios que fortalecen su identidad.",
                img:"https://source.unsplash.com/800x600/?factory,agriculture",
                imgAlt:"Zona de Villa El Carmen"
            },
            "san-francisco":{
                title:"San Francisco Libre",
                short:"Pueblo rural con fuerte tradición campesina.",
                desc:"San Francisco Libre conserva raíces rurales profundas y celebraciones religiosas y comunitarias que describen la historia y vida cotidiana del municipio.",
                img:"https://source.unsplash.com/800x600/?village,countryside",
                imgAlt:"Paisaje rural en San Francisco Libre"
            }
        };

        // Elementos
        const tabs = document.querySelectorAll('.tab');
        const titleEl = document.getElementById('title');
        const shortEl = document.getElementById('short');
        const descEl = document.getElementById('desc');
        const imgEl = document.getElementById('mainImage');
        const imgTitle = document.getElementById('imgTitle');
        const imgNote = document.getElementById('imgNote');
        const contentArea = document.getElementById('contentArea');

        function activateTab(id, smooth=true){
            const data = municipios[id];
            if(!data) return;
            // update active button
            tabs.forEach(t=>{
                const is = t.dataset.id === id;
                t.classList.toggle('active', is);
                t.setAttribute('aria-selected', is ? 'true' : 'false');
            });

            // animate content fade
            if(smooth){
                contentArea.style.opacity = 0;
                contentArea.style.transform = "translateY(8px)";
                setTimeout(()=>{
                    titleEl.textContent = data.title;
                    shortEl.textContent = data.short;
                    descEl.textContent = data.desc;
                    imgEl.src = data.img;
                    imgEl.alt = data.imgAlt;
                    imgTitle.textContent = data.title;
                    contentArea.style.opacity = 1;
                    contentArea.style.transform = "translateY(0)";
                },220);
            } else {
                titleEl.textContent = data.title;
                shortEl.textContent = data.short;
                descEl.textContent = data.desc;
                imgEl.src = data.img;
                imgEl.alt = data.imgAlt;
                imgTitle.textContent = data.title;
            }

            // update URL hash for deep linking
            history.replaceState(null, "", "#" + id);
        }

        // click handlers
        tabs.forEach(tab=>{
            tab.addEventListener('click', ()=> activateTab(tab.dataset.id));
            tab.addEventListener('keydown', (e)=>{
                // left/right to navigate tabs
                const idx = Array.from(tabs).indexOf(tab);
                if(e.key === 'ArrowRight'){
                    tabs[(idx+1)%tabs.length].focus();
                } else if(e.key === 'ArrowLeft'){
                    tabs[(idx-1+tabs.length)%tabs.length].focus();
                }
            });
        });

        // load from hash or default
        const initial = location.hash.replace('#','') || 'managua';
        if(municipios[initial]) activateTab(initial, false);
        else activateTab('managua', false);

        // optional: prefetch images for smoothness
        Object.values(municipios).forEach(m=>{
            const i = new Image();
            i.src = m.img;
        });
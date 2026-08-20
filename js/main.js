document.addEventListener('DOMContentLoaded', async function(){
    var moodTracker = document.querySelector('.mood-tracker');
    //mostrar fecha actual
    document.getElementById('today').textContent = formatearFecha(new Date());

    //boton perfil
    var arrowBtn = document.querySelector('.header__arrow');
    var dropdown = document.querySelector('.header__profile--dropdown');
    arrowBtn.addEventListener('click', function(){
      dropdown.classList.toggle('hidden');
    });


    //settings
    var settingsBtn = document.querySelector('.header__option--settings')
    var closeUpdateProfile = document.querySelector('.profile-update__close');
    var profileUpdate = document.querySelector('.profile-update');

    settingsBtn.addEventListener('click', function(){
      var userName = document.getElementById('user-name');
      var userNameUpdate = document.getElementById('update-name');

      userNameUpdate.value = userName.textContent;

      profileUpdate.classList.toggle('hidden');
      moodTracker.classList.add('is-active');
      dropdown.classList.toggle('hidden');
    });

    closeUpdateProfile.addEventListener('click', function(){
      profileUpdate.classList.toggle('hidden');
      moodTracker.classList.remove('is-active');
    });





    // Toggle entre con y sin datos
  document.getElementById('toggle-data-btn').addEventListener('click', () => {
    isEmptyState = !isEmptyState;
    renderChart(isEmptyState ? emptyDataDays : populatedData);
  });

  // Inicializar
  renderChart(populatedData);
});


    const populatedData = [
        { month: 'March', day: '31', hoursLevel: 3, mood: 'sleepy', color: '#B09FFF' },
        { month: 'April', day: '02', hoursLevel: 4, mood: 'happy', color: '#72EC77' },
        { month: 'April', day: '04', hoursLevel: 2, mood: 'sad', color: '#FF8888' },
        { month: 'April', day: '06', hoursLevel: 3, mood: 'neutral', color: '#72C2FF' },
        { month: 'April', day: '07', hoursLevel: 4, mood: 'happy', color: '#72EC77' },
        { month: 'April', day: '09', hoursLevel: 5, mood: 'very-happy', color: '#FFC86B' },
        { month: 'April', day: '10', hoursLevel: 2, mood: 'sleepy', color: '#B09FFF' },
        { month: 'April', day: '12', hoursLevel: 4, mood: 'neutral', color: '#72C2FF' },
        { month: 'April', day: '13', hoursLevel: 4, mood: 'happy', color: '#72EC77' },
        { month: 'April', day: '14', hoursLevel: 2, mood: 'sad', color: '#FF8888' },
        { month: 'April', day: '15', hoursLevel: 5, mood: 'very-happy', color: '#FFC86B' },
    ];

    const emptyDataDays = [
        { month: 'April', day: '06' },
        { month: 'April', day: '07' },
        { month: 'April', day: '08' },
        { month: 'April', day: '09' },
        { month: 'April', day: '10' },
        { month: 'April', day: '11' },
        { month: 'April', day: '12' },
        { month: 'April', day: '13' },
        { month: 'April', day: '14' },
        { month: 'April', day: '15' },
        { month: 'April', day: '16' },
    ];

    const moodIcons = {
        'very-happy': './assets/images/icon-very-happy-white.svg',
        'happy': './assets/images/icon-happy-white.svg',
        'neutral': './assets/images/icon-neutral-white.svg',
        'sad': './assets/images/icon-sad-white.svg',
        'sleepy': './assets/images/icon-very-sad-white.svg' // Mapeado a very-sad según tus assets
    };

  let isEmptyState = false;

 function renderChart(data) {
  const container = document.getElementById('chart-columns');
  container.innerHTML = '';

  data.forEach(item => {
    const column = document.createElement('div');
    column.className = 'chart__column';

    if (item.hoursLevel) {
      const bar = document.createElement('div');
      bar.className = 'chart__bar';
      bar.style.height = `${item.hoursLevel * 20}%`;
      bar.style.backgroundColor = item.color;

      // Wrapper circular para el icono
      const faceContainer = document.createElement('div');
      faceContainer.className = 'chart__face';

      // Etiqueta img con el SVG correspondiente
      const iconImg = document.createElement('img');
      iconImg.src = moodIcons[item.mood] || moodIcons['happy'];
      iconImg.alt = item.mood;
      iconImg.className = 'chart__icon';

      faceContainer.appendChild(iconImg);
      bar.appendChild(faceContainer);
      column.appendChild(bar);
    }

    const label = document.createElement('div');
    label.className = 'chart__label';
    label.innerHTML = `<span>${item.month}</span><strong>${item.day}</strong>`;

    column.appendChild(label);
    container.appendChild(column);
  });
}
//FORMATEAR FECHA ejem. Tuesday, August 4th, 2026
function formatearFecha(fecha) {
      const formateador = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        year: 'numeric'
      });

      const partes = formateador.formatToParts(fecha);
      const diaSemana = partes.find(p => p.type === 'weekday').value;
      const mes = partes.find(p => p.type === 'month').value;
      const anio = partes.find(p => p.type === 'year').value;
      
      const numeroDia = fecha.getDate();
      const sufijo = obtenerSufijoOrdinal(numeroDia);

      return `${diaSemana}, ${mes} ${numeroDia}${sufijo}, ${anio}`;
}

function obtenerSufijoOrdinal(dia) {
    if (dia > 3 && dia < 21) return 'th';
    switch (dia % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
    }
}



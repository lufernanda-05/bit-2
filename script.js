'use strict';

const nom = prompt(" 👋 ¡Hola! ingresa tu nombre: ");
console.log(" Bienvenid@", nom, "a la página de contacto de BIT.");

let dataGlobal = []; // Variable global para los datos

document.getElementById('filterHighScore').addEventListener('click', () => {
  if(dataGlobal.length === 0) {
    alert("Los datos aún no se han cargado. Por favor espera unos segundos y vuelve a intentarlo.");
    return;
  }
  const highScorers = dataGlobal.filter(student => {
    const scores = student.projects.flatMap(p => p.score);
    const avg = scores.reduce((a,b) => a+b, 0) / scores.length;
    return avg >= 4.5;
  });
  console.log("Estudiantes con promedio de notas >= 4.5:", highScorers.map(s => s.student));//mostramos la alerta con el mensaje 
  alert("Revisa la consola para ver los estudiantes con las notas.");
});

fetch('data.json')
  .then(response => response.json()) // Convierte la respuesta en JSON
  .then(data => {
    dataGlobal = data; // Guardar datos globalmente

    // Contenedor de todos los estudiantes
    const container = document.getElementById('student-container');

    // datos de cada estudiante
    data.forEach(student => {
      // Usuario de GitHub
      const githubUsername = student.usernameGithub;

      // Link de GitHub para imagen perfil
     const profileImageUrl = githubUsername 
  ? `https://github.com/${githubUsername}.png?size=100`: './assets/placeholder.jpg';


      // enlace GitHub 
      const githubLinkHTML = githubUsername
          ? `<a href="https://github.com/${githubUsername}" target="_blank" rel="noopener" class="github-link">
                <i class="fa-brands fa-github"></i>GitHub
             </a>`
          : `<span style="color: #bbb; font-style: italic; margin-top: 10px; display: block;">GitHub no disponible</span>`;

      // Cuadro por estudiante
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
          <div class="profile-image">
              <img src="${profileImageUrl}" alt="${student.student}" />
          </div>
          <h2>${student.student}</h2>
          <p><strong>Código:</strong> ${student.code}</p>
          <p><strong>Intensidad:</strong> ${student.intensity}</p><i class="fa-solid fa-laptop-code"></i>
          <p><strong>GitHub:</strong>${githubUsername || 'No disponible'}</p>
          ${githubLinkHTML}
          <div class="project">
              <h3>Proyectos</h3><i class="fa-solid fa-server"></i>

              ${student.projects.map(project => `
                  <p>${project.name} - Puntuación: ${project.score.join(', ')}</p>
              `).join('')}
          </div>`;

      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

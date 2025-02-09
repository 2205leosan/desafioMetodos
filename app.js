

const botonAgregar = document.getElementById("botonAdd")
const inputTarea = document.getElementById("inputTarea")
const list= document.querySelector(".listaTareas")


const tareas = [
    {id:1, tarea: "Estudiar HTML" },
    {id:2, tarea: "Estudiar CSS" },
    {id:3, tarea: "Estudiar Javascript" },
];

botonAgregar.addEventListener('click', ()=>{
    if(inputTarea.value.trim()==='')return;
    tareas.push({id: Date.now().toString().slice(7, 10), tarea : inputTarea.value});
    inputTarea.value= '';
    tareasDom()
    
})

const tareasDom = () => {
    list.innerHTML = tareas.map((task) => 
        ` <li class="lista"><label><input type="checkbox">ID-${task.id}  -  ${task.tarea} </label>
            <button onclick ='eliminar(${task.id})'>X</button>
            </li>
        `

    ).join("");

    updateStats()
    
};

const eliminar = (id) => {
    const index = tareas.findIndex((task) => task.id == id);
    if (index !== -1) {
        tareas.splice(index, 1);
    }
    tareasDom();
    updateStats();
    
};

const updateStats = () => {
    const tareasPendientes = tareas.filter((task) => !task.completada).length;
    const tareasCompletadas = tareas.filter((task) => task.completada).length;
    const statsElement = document.getElementById('tareas-pendientes-completadas');
    statsElement.textContent = `Tareas pendientes: ${tareasPendientes} | Tareas completadas: ${tareasCompletadas}`;
  };

  list.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      const taskId = event.target.parentNode.textContent.split('-')[1].trim();
      const taskIndex = tareas.findIndex((task) => task.id == taskId);
      if (taskIndex !== -1) {
        tareas[taskIndex].completada = event.target.checked;
      }
      updateStats();
    }
  });
  
  



tareasDom();


// Task Class to describe tasks into projects.
class Task {
    constructor(idTask, description, status, limitDate) {
        this.idTask = idTask;
        this.description = description;
        this.status = status;
        this.limitDate = limitDate;
    }
}

// Project Class to instantiate multiple projects.
class Project {
    constructor(idProject, name, startDate, tasks) {
        this.idProject = idProject;
        this.name = name;
        this.startDate = startDate;
        this.tasks = tasks;
    }

    // Function to add new tasks to the project
    addTask(idTask, description, status, limitDate) {

        // Valid status list
        const statusList = ["Pending", "In Progress", "Completed"];

        if (statusList.includes(status)) {
            this.tasks.push(new Task(idTask, description, status, limitDate))
        }
        else {
            console.error("Please add a valid status for the task between: Pending, In Progress or Completed.");
        }
    }

    // Function to generate a summary of the quantity of task by status.
    generateSummary() {

        // Function to calculate the quantity of task by status.
        const checkStatus = this.tasks.reduce((acc, task) => {

            const taskStatus = task.status;
            const taskDescription = task.description;

            if (!acc[taskStatus]) {

                acc[taskStatus] = {
                    "quantity": 0,
                    "reviewTasks": []

                };

            }

            acc[taskStatus]["quantity"] += 1;
            acc[taskStatus]["reviewTasks"].push(taskDescription);

            return acc;
        }, {});

        console.log(`The amount of Pending tasks are ${checkStatus.Pending.quantity}: ${checkStatus.Pending.reviewTasks.map(task => task).join(', ')}`);
        console.log(`The amount of In Progress tasks  are ${checkStatus["In Progress"].quantity}: ${checkStatus["In Progress"].reviewTasks.map(task => task).join(', ')}`);
        console.log(`The amount of Completed tasks are ${checkStatus.Completed.quantity}: ${checkStatus.Completed.reviewTasks.map(task => task).join(', ')}`);

    }

    // Function to sort task by limit date
    sortTasksByLimitDate() {
        // Sort tasks by limit date
        this.tasks.sort((a, b) => a.limitDate - b.limitDate);
        console.table(this.tasks);
    }

    // Function to filter the task by a given condition
    filterProjectTasks(condition) {
        return this.tasks.filter(condition);
    }

    // Function to calculate the remaining time to complete all the stask from a specific status
    calculateRemainingTime(statusToCheck) {

        const notCompletedStatusList = ["Pending", "In Progress"]

        if (notCompletedStatusList.includes(statusToCheck)) {

            // Obtain the current date
            const currentDate = new Date();

            // Filtering the tasks by a given status
            const statusCondition = (task) => task.status == statusToCheck;
            const tasksFiltered = this.filterProjectTasks(statusCondition);

            //
            const remainingTime = tasksFiltered.reduce((acc, task) => {

                const taskLimitDate = task.limitDate;

                // Check if the limit date of the task is greater than the current date.
                if (taskLimitDate >= currentDate) {
                    const diffDays = (taskLimitDate - currentDate) / (1000 * 60 * 60 * 24);
                    acc += diffDays;
                }

                return acc;

            }, 0)

            console.log(`The remaining time in days to complete the task with ${statusToCheck} status is ${remainingTime.toFixed(0)} days.`);
        }
        else if (statusToCheck == 'Completed') {

            console.warn(`The tasks with this status are already Completed (so there is not a remaining time to calculate).`);

        }
        else {
            console.error(`The status received is not valid.`);
        }

    }

    // Function to obtain the critical tasks that are less than a given quantity of days to complete and are not completed
    getCriticalTasks(daysToComplete) {
        const statusCondition = (task) => task.status != "Completed";
        const tasksFiltered = this.filterProjectTasks(statusCondition);

        const taskWithRemainigTime = tasksFiltered.map(task => {

            const currentDate = new Date();
            const taskLimitDate = task.limitDate;
            
            // Calculate the remaining days
            const remainingDays = parseFloat(taskLimitDate >= currentDate ? (taskLimitDate - currentDate) / (1000 * 60 * 60 * 24) : 0).toFixed(0);

            return { ...task, remainingDays };

        });

        const daysCondition = (task) => parseFloat(task.remainingDays) < daysToComplete;
        const criticalTasks = taskWithRemainigTime.filter(daysCondition);

        return criticalTasks;

    }

}

// Function to load project details
async function loadProjectDetails(project) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (project) {
                resolve(console.log(`This are the project details: \n Name: ${project.name} \n Start Date: ${project.startDate} \n Tasks: ${project.tasks.map(task => task.description).join(', ')} \n`));
            }
            else {
                reject(new Error("Could not get details of the project."));
            }
        }, 1000);
    });
}

// Function to update the status of a task
function updateTaskStatus(project, idTask, newStatus, percentageCompleted) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // In this case, the "valid status" depends of the percentage completed.
            const validStatus = (newStatus == 'Completed' && percentageCompleted >= 0.9) || (newStatus == 'In Progress' && percentageCompleted > 0.1);

            if (validStatus) {
                const statusCondition = (task) => task.idTask == idTask;
                project.tasks.filter(statusCondition)[0].status = newStatus;
                resolve(`\n Status of Task "${idTask}" from project "${project.name}" updated to "${newStatus}". \n`);

            } else {
                reject(new Error(`\n The status can't be updated because the percentage completed does not meet the criteria of the new status. \n`));

            }
        }, 1000);
    });
}

async function tryUpdateTaskStatus(project, idTask, newStatus, percentageCompleted) {
    try {
        const message = await updateTaskStatus(project, idTask, newStatus, percentageCompleted);
        console.log(message);
    } catch (error) {
        console.error(error.message);
    }
}


// Task notifications to notify to subscribers about changes in status
class taskNotifications {

    constructor() {
        this.subscribers = [];
    }

    // Method to subscribes to the notificiation
    addSubscriber(subscriber) {
        this.subscribers.push(subscriber);
    }

    // Method to cancel the notification
    removeSubscriber(subscriber) {
        this.subscribers = this.subscribers.filter(sus => sus !== subscriber);
    }

    // Method to notify all subscribers about a change in a task
    notifyAll(project, idTask, newStatus) {
        this.subscribers.forEach(sus => sus(project, idTask, newStatus));
    }
};

// Function to update the status and notify to all subscribers
async function updateNotifyTasks(project, idTask, newStatus, percentageCompleted, notifications) {
    try {
        await updateTaskStatus(project, idTask, newStatus, percentageCompleted);
        notifications.notifyAll(project, idTask, newStatus);
        console.log(project)
    } catch (error) {
        console.error(error.message);
    }
}

// ############### TEST THE PROJECT ####################################

// 1.1 Crea una estructura de datos para representar proyectos y tareas.
console.log("\n ########### Tarea 1.1: Instanciamos un proyecto #############\n ")
const project1 = new Project("p1", "RRHH Software", new Date(2024, 10, 18), []);
console.log(project1)

// 1.2 Implementa una función que permita añadir nuevas tareas a un proyecto.
console.log("\n ########### Tarea 1.2: Añadimos tareas al proyecto ############# \n")
project1.addTask("t1", "Update Jira", "Completed", new Date(2024, 10, 20));
project1.addTask("t2", "Start Sprint", "In Progress", new Date(2024, 10, 20));
project1.addTask("t3", "Team meeting", "Pending", new Date(2024, 10, 23));
project1.addTask("t4", "Prioritization", "In Progress", new Date(2024, 10, 21));
project1.addTask("t5", "Call with Stakeholder", "Pending", new Date(2024, 10, 21));
console.log(project1.tasks)

// 1.3 Desarrolla una función que utilice métodos de array (map, filter, reduce) para
// generar un resumen del proyecto mostrando el número de tareas en cada
// estado.
console.log("\n ########### Tarea 1.3: Generamos un resumen del proyecto ############# \n")
project1.generateSummary();


// 1.4 Crea una función que ordene las tareas de un proyecto por fecha límite
// utilizando el método sort de JavaScript
console.log("\n ########### Tarea 1.4: Ordenamos las tareas del proyecto por fecha limite ############# \n")
project1.sortTasksByLimitDate();

// 2.1 Crea una función de orden superior filtrarTareasProyecto que tome una
// función de filtrado como argumento y la aplique a la lista de tareas de un
// proyecto. 
console.log("\n ########### Tarea 2.1: Filtramos en base a una función de orden superior (en este caso filtramos por pendientes) ############# \n")
const pendingTasks = (task) => task.status == 'Pending';
console.log(project1.filterProjectTasks(pendingTasks));

// 2.2 Implementa una función calcularTiempoRestante que utilice el método
// reduce para calcular el número total de días que faltan para completar todas
// las tareas pendientes de un proyecto.
console.log("\n ########### Tarea 2.2: Calculamos los días restantes de las tareas pendientes (podemos hacerlo también con las tareas en progreso) ############# \n")
project1.calculateRemainingTime("Pending");

// 2.3 Desarrolla una función obtenerTareasCriticas que identifique y retorne las
// tareas que están a menos de 3 días de su fecha límite y aún no están
// completadas.
console.log("\n ########### Tarea 2.3: Obtenemos las tareas con menos de 3 dias de su fecha limite (podemos cambiar la cantidad de dias) ############# \n")
const daysToComplete = 3;
criticalTasks = project1.getCriticalTasks(daysToComplete)
console.log(`Tasks with less than ${daysToComplete} days left.`)
console.table(criticalTasks)


// 3.1 Desarrolla una función cargarDetallesProyecto que simule una llamada
// asíncrona a una API para cargar los detalles de un proyecto.
// Utiliza Promises o async/await.
console.log("\n ########### Tarea 3.1: Simulamos una llamada a una API y cargamos los detalles de un proyecto (se imprimirá después al simular espera) ############# \n")
loadProjectDetails(project1);

// 3.2 Crea una función actualizarEstadoTarea que simule la actualización del
// estado de una tarea en el servidor y maneje tanto el caso de éxito como el de
// error.
console.log("\n ########### Tarea 3.2: Actualizamos el estado de una tarea con una función asincrona (se imprimirá después al simular espera) ############# \n")
tryUpdateTaskStatus(project1, "t2", "Completed", 0.91);

// 3.3 Implementa un sistema simple de notificacionesTareas que permita a
// diferentes partes del código "escuchar" cuando se completa una tarea.
console.log("\n ########### Tarea 3.4: Enviamos notificaciones cuando actualizamos el status de las tareas (en este caso también lo dejé no solo para completados) ############# \n")

function completeListener(project, idTask, newStatus){
    console.log(`The task "${idTask}" status from "${project.name}" succesfully changed to "${newStatus}"`);
}

const notifications = new taskNotifications();
notifications.addSubscriber(completeListener);

// Creamos una tarea de ejemplo y simulamos completarla
updateNotifyTasks(project1, "t3", "In Progress", 0.5, notifications)
updateNotifyTasks(project1, "t4", "Completed", 0.91, notifications)
// Caso en que no cumple el criterio de status
updateNotifyTasks(project1, "t5", "In Progress", 0.05, notifications)

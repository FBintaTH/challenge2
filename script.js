// Sélectionnez les éléments HTML dont vous avez besoin
const taskForm = document.getElementById('task-form');
const btnAjouter = document.getElementById('btnAjouter');
const taskFormDetails = document.getElementById('task-form-details');
const taskFormList = document.getElementById('task-form-list');
const taskDetails = document.getElementById('task-details-hidden');
const taskList = document.getElementById('task-list');

console.log(btnAjouter,taskDetails,taskFormList);

btnAjouter.addEventListener('click', ()=> {
    taskFormList.removeAttribute('hidden');
    taskDetails.removeAttribute('hidden');
})

// Créez une structure de données pour stocker les tâches
const tasks = [];

// Écoutez l'événement de soumission du formulaire pour ajouter une tâche
// Écoutez l'événement de soumission du formulaire pour effectuer la validation
// Écoutez l'événement de soumission du formulaire pour effectuer la validation
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérez les valeurs du formulaire
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;

    // Validez les champs en utilisant les fonctions de validation
    if (!validateTitle(title)) {
        alert("Le titre doit contenir au moins 3 caractères alphabétiques.");
        return;
    }

    if (!validateDescription(description)) {
        alert("La description ne doit pas dépasser 255 caractères.");
        return;
    }

    if (!validateDeadline(deadline)) {
        alert("La date limite doit être au format 'YYYY-MM-DD'.");
        return;
    }

    // Créez un objet tâche
    const task = {
        title,
        description,
        deadline,
        priority,
        completed: false // Par défaut, la tâche n'est pas terminée
    };

    // Ajoutez la tâche à la liste
    tasks.push(task);

    // Actualisez l'affichage de la liste des tâches
    displayTasks();

    // Effacez les champs du formulaire
    taskForm.reset();
});

// Fonction pour afficher les tâches dans la liste
function displayTasks() {
    // Effacez la liste actuelle
    taskList.innerHTML = '';

    // Parcourez les tâches et ajoutez-les à la liste
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Priorité: ${task.priority}</p>
            <button class="complete-btn" data-index="${index}">Terminée</button>
            <button class="details-btn" data-index="${index}">Détails</button>
        `;

        // Écoutez les événements pour marquer une tâche comme terminée et afficher les détails
        const completeButton = taskItem.querySelector('.complete-btn');
        const detailsButton = taskItem.querySelector('.details-btn');

        completeButton.addEventListener('click', () => completeTask(index));
        detailsButton.addEventListener('click', () => showTaskDetails(index));

        taskList.appendChild(taskItem);
    });
}

// Fonction pour marquer une tâche comme terminée
function completeTask(index) {
    tasks[index].completed = true;
    displayTasks();
}

// Fonction pour afficher les détails d'une tâche
function showTaskDetails(index) {
    const task = tasks[index];
    taskDetails.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Deadline: ${task.deadline} </strong> </p>
        <p>Priorité: ${task.priority}</p>
        <p>Terminée: ${task.completed ? 'Oui' : 'Non'}</p>
    `;
}

// Initialisez votre application en appelant displayTasks()
displayTasks();

// Fonction de validation pour le champ "Titre"
function validateTitle(title) {
    // Utilisez une expression régulière pour vérifier si le titre contient au moins 3 caractères alphabétiques
    const regex = /^[a-zA-Z\s']{3,}$/;
    return regex.test(title);
}

// Fonction de validation pour le champ "Description"
function validateDescription(description) {
    // Vérifiez si la longueur de la description est inférieure ou égale à 255 caractères
    return description.length <= 255;
}

// Fonction de validation pour le champ "Date limite"
function validateDeadline(deadline) {
    // Utilisez une expression régulière pour vérifier si la date est au format "YYYY-MM-DD"
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(deadline);
}
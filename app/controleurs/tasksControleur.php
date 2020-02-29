<?php
/*
    ./app/controleurs/pagesControleur.php
    Contrôleur des pages
 */
    namespace App\Controleurs\Tasks;
    use App\Modeles\Task;

    function indexAction(\PDO $connexion, array $params = []){
      include_once '../app/modeles/tasksModele.php';
      $tasks = Task\findAll($connexion, $params);
      $nbreTasks = Task\findFinishedCount($connexion);

      GLOBAL $title, $content1;
      $title = TITRE_DEFAUT;
      ob_start();
        include '../app/vues/tasks/index.php';
      $content1 = ob_get_clean();
    }

    function addAction(\PDO $connexion, string $content){
      // J'ajoute la nouvelle tâche dans la db
      include_once '../app/modeles/tasksModele.php';
      $taskID = Task\insert($connexion, $content);
      // Je charge la vue 'task.php'
      include '../app/vues/tasks/add.php';
    }

    function editAction(\PDO $connexion, array $data){
      // Le modèle modifie la tâche
      include_once '../app/modeles/tasksModele.php';
      // Retourne un booléen vers le JS
      echo Task\updateOneById($connexion, $data);
    }

    function toggleFinishAction(\PDO $connexion, array $data){
      // Le modèle fini la tâche
      include_once '../app/modeles/tasksModele.php';
      // Retourne un booléen vers le JS
      echo Task\updateFinishedOneById($connexion, $data);
    }

    function deleteAction(\PDO $connexion, int $id){
      // Le modèle supprime la tâche
      include_once '../app/modeles/tasksModele.php';
      // Retourne un booléen vers le JS
      echo Task\deleteOneById($connexion, $id);
    }

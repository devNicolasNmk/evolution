
//Declaration des variables 
    //stat clicks
    var totalClick = document.getElementById('nbTotalClic');
    var getClick = document.getElementById('x1y1'); // temporaire pour mes tests
    var scoreClick = 0;
    //stat ressources recoltées
    var ressourcesCumulees = document.getElementById('nbTotalRessources');
    var ressourceUne = 0;
    var ressourceDeux = 0;
    var ressourceTrois = 0;
    var somme = 0;
    //stat outils obtenus
    var nbTotalOutils = document.getElementById('nbTotalOutils');
    //stat batiment obtenus
    var nbTotalBatiment = document.getElementById('nbTotalBatiment');
    var constructions = 1;
    //Tableau des outils des 5 eres => 3 par eres(en attente du nom des outils pour modification)
    var tabOutils = {
        "out1": 0,
        "out2": 0,
        "out3": 0,
        "out4": 0,
        "out5": 0,
        "out6": 0,
        "out7": 0,
        "out8": 0,
        "out9": 0,
        "out10": 0,
        "out11": 0,
        "out12": 0,
        "out13": 0,
        "out14": 0,
        "out15": 0
    };
    var nbOutils = 0;
    //tableau des eres terminées : 0=> non achevée 1=> achevée
    var tabEre = {
        "ere1": 0,
        "ere2": 0,
        "ere3": 0,
        "ere4": 0,
        "ere5": 0
    };
    var nbEres = 0; 
    var nbConstruction = 0;
    // incrementation du nombre de batiments construits et catastrophes rencontrées
    var eventConstruct = false;
    var eventCastastrophes = false;
    
    var viderCache = document.getElementById('viderCache');


// ----------------------- Debut : Statistiques - options ----------------------- //

    //---- Stat total click ----//
        /**
         * 
         * Fonction incremenation de total des clicks + maj de l'affichage
         * 
         */
        function incrTotalClick() {
            scoreClick++;
            totalClick.innerHTML = scoreClick;
        }
        getClick.onclick = incrTotalClick;


        //---- Stat Total ressources recoltées ----//
        /**
         * 
         * Fonction d'addition des ressources cumulées
         * 
         */
        function sommeRessources() {
            somme++;
            nbTotalRessources.innerHTML = somme;
        }
        

    // ---- Outils obtenus ---- //
        /*boucle sur le tableau pour check le nombre de fois que 1 est présent 
        *le for in me permet de boucler sur le tableau associatif
        */
        for (outil in tabOutils) {
            if (tabOutils[outil] === 1) {
                nbOutils++
            }
        }
        nbTotalOutils.innerHTML = nbOutils;


    // ---- eres terminées ---- //
        /*boucle sur le tableau pour check le nombre de fois que 1 est présent 
        *le for in me permet de boucler sur le tableau associatif
        */
        for (ere in tabEre) {
            if (tabEre[ere] === 1) {
                nbEres++;
            }
        }
        nbTotalEre.innerHTML = nbEres;


    // ---- batiments construits ---- //

        function incrConstruction(){
            if(eventConstruct == true){
                constructions++;
                eventConstruct = false;
            }
        }nbTotalBatiment.innerHTML = constructions;


    // ---- castastrophes comptées ---- //
        function incrCatastrophe(){
        //if(eventCastastrophes == true){
        //    castastrophes++;
        //    eventCastastrophes = false;  
        //}
        }



// ----------------------- Fin : Statistiques - options ----------------------- //




// ----------------------- Debut : gestion des cookies || webstorage ----------------------- //

    /**
     * 
     * fonction de sauvegarde local via le webstorage
     * [https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API]
     * 
     */
    function sauvegardeLocal() {
        //sauvegarde bloc statistiques
        localStorage.setItem('nbTotalClic', totalClick.innerHTML);
        localStorage.setItem('nbTotalRessources', nbTotalRessources.innerHTML);
        localStorage.setItem('nbTotalOutils', nbTotalOutils.innerHTML);
        localStorage.setItem('nbTotalEre', nbTotalEre.innerHTML);
        localStorage.setItem('nbTotalBatiment', nbTotalBatiment.innerHTML);
        localStorage.setItem('nbTotalCata', nbTotalCata.innerHTML);
        //sauvegarde bloc ressources
        localStorage.setItem('ressource1', ressource1.innerHTML);
        localStorage.setItem('ressource2', ressource2.innerHTML);
        localStorage.setItem('ressource3', ressource3.innerHTML);
    }

    /**
     * 
     * fonction de sauvegarde auto
     * 
     */
    function sauvegardeAuto(){
        setInterval(sauvegardeLocal, 5000);
    }
    sauvegardeAuto()

    /**
     * 
     * fonction restauration des variables aux rechargements de pages
     * 
     */
    function restauration() {

        if (localStorage.getItem('nbTotalClic') != null) {
            //restauration bloc stats
            totalClick.innerHTML = localStorage.getItem('nbTotalClic');
            //ne pas repartir avec un scoreClick a zero
            scoreClick = totalClick.innerHTML;
            nbTotalRessources.innerHTML = localStorage.getItem('nbTotalRessources');
            somme = nbTotalRessources.innerHTML
            nbTotalOutils.innerHTML = localStorage.getItem('nbTotalOutils');
            nbTotalEre.innerHTML = localStorage.getItem('nbTotalEre');
            nbTotalBatiment.innerHTML = localStorage.getItem('nbTotalBatiment');
            nbTotalCata.innerHTML = localStorage.getItem('nbTotalCata');
            //restauration bloc ressources
            ressource1.innerHTML = localStorage.getItem('ressource1');
            compteurRessourcePlateau1 = parseInt(ressource1.innerHTML);
            ressource2.innerHTML = localStorage.getItem('ressource2');
            compteurRessourcePlateau2 = parseInt(ressource2.innerHTML);
            ressource3.innerHTML = localStorage.getItem('ressource3');
            compteurRessourcePlateau3 = parseInt(ressource3.innerHTML);
        }

    }
    window.onload = restauration;

    viderCache.addEventListener('click', recommencer);
    /**
     * 
     * fonction d'effacement du webstorage
     * 
     */
    function recommencer(){
            localStorage.clear();
            location.reload();

    }

// ----------------------- fin : gestion des cookies || webstorage ----------------------- //




// ----------------------- Debut : ouverture / fermeture du shop ----------------------- //

//Cible le bouton ouvrir le shop
    var boutonOuvrirShop = document.getElementById('bouton-ouvrir-shop');
    var boutonFermerShop = document.getElementById('bouton-fermer-shop');
    var blocShop = document.getElementById('bloc-shop');
//Initilisation Styles boutons    
    boutonOuvrirShop.style.display = "block";
    boutonFermerShop.style.display = "none";
    /*
     * 
     * Fonction d'ouverture et de fermeture du shop
     * 
     */
    function ouvrirShop() {
        boutonOuvrirShop.style.display = "none";
        boutonFermerShop.style.display = "block";
        blocShop.style.display = "block";
    }
    function fermerShop() {
        boutonOuvrirShop.style.display = "block";
        boutonFermerShop.style.display = "none";
        blocShop.style.display = "none";
    }

//Lance la fonction ouvrir au clic sur le bouton
boutonOuvrirShop.onclick = ouvrirShop;
//Lance la fonction fermer au clic sur le bouton
boutonFermerShop.onclick = fermerShop;

// ----------------------- Fin : ouverture / fermeture du shop ----------------------- //

// ----------------------- Debut : ressource et compteur ----------------------- //

var plateau= document.getElementById("jeu");
var bgEre = document.getElementById("bgEre");

//compteur des ressources
var compteurRessourcePlateau1 = 0;
var compteurRessourcePlateau2 = 0;
var compteurRessourcePlateau3 = 0;

//score de div avant incrémentation dans le compteur des ressources
var i = 0;
var j = 0;
var k = 0;

//Valeur d'un clic
var clickRessource1 = 1;
var clickRessource2 = 1;
var clickRessource3 = 1;

//affichage dans le html
ressource1.innerHTML = compteurRessourcePlateau1;
ressource2.innerHTML = compteurRessourcePlateau2;
ressource3.innerHTML = compteurRessourcePlateau3;

//prix achat maison
var maisonPrix1 = 4;
var maisonPrix2 = 5;
var maisonPrix3 = 3;

//affichage prix maison
var prixMaison = document.getElementById("prixMaison");
prixMaison.innerHTML = maisonPrix1+ " : <strong>os</strong> <br>" +maisonPrix2+ " : <strong>bois</strong> <br>" +maisonPrix3+  " : <strong>pierre</strong> <br>" ;

//compteur changement de niveau de la maison
var compteurChangementMaison = 0;

// nombre de maison dernier niveau
var maisonFixe = 0;

//compteur pour déclencher le changement de place des ressource
var declencheurRessource1 = 0;
var declencheurRessource2 = 0;
var declencheurRessource3 = 0;

//décrémenter catastrophe / dommages subi avec la catastrophe
var dommagesRessource1 = 5;
var dommagesRessource2 = 5;
var dommagesRessource3 = 5;

//algo qui permet d'incrémenter 
function clicker(plateau) {
        

        //si tu trouvre une div avec un class qui est os    
        if (plateau.target.getAttribute("class") == "os") {
            if (plateau.target.getAttribute("class", 'os')) {
                //alors tu incrémente le score de la div qui comptien la class os
                i = i + 1;
                //incrementation du total des clics
                incrTotalClick();
                // si la div arrive a un score de 10
                if (i == 10) {
                    //tu remet le score a 0
                    i = 0;
                    // et tu incrémente de x le compteur de ressource
                    compteurRessourcePlateau1 = compteurRessourcePlateau1 + clickRessource1;
                    //tu incrémente aussi le compteur du déclancheur du changement de place des ressources
                    declencheurRessource1++;
                    sommeRessources();

                    //a chaque fois que le compteur du déclencheur atteindra 20, ça appelera le changement des places des ressources
                    if (declencheurRessource1 == 15) {
                        //tu remets le compteur du déclencheur a 0
                        declencheurRessource1 = 0;
                        //tu appel le changements des places des ressources
                        changeDePlaceRessource1();
                    } 

                }   
            }
        }ressource1.innerHTML = compteurRessourcePlateau1;
        activationItemsShop();

        //si tu trouvre une div avec un class qui est bois
        if (plateau.target.getAttribute("class") == "bois") {
            if (plateau.target.getAttribute("class", 'bois')) {
                //alors tu incrémente le score de la div qui comptien la class bois
                j = j + 1;
                //incrementation du total des clics
                incrTotalClick();
                // si la div arrive a un score de 4
                if (j == 4) {
                    //tu remet le score a 0
                    j = 0;
                    // et tu incrémente de x le compteur de ressource
                    compteurRessourcePlateau2 = compteurRessourcePlateau2 + clickRessource2;
                    //tu incrémente aussi le compteur du déclancheur du changement de place des ressources
                    declencheurRessource2++;
                    sommeRessources();

                    //a chaque fois que le compteur du déclencheur atteindra 20, ça appelera le changement des places des ressources
                    if (declencheurRessource2 == 10) {
                        //tu remets le compteur du déclencheur a 0
                        declencheurRessource2 = 0;
                        //tu appel le changements des places des ressources
                        changeDePlaceRessource2();
                    } 
                }  
            } 
        } 
        ressource2.innerHTML = compteurRessourcePlateau2;
        activationItemsShop();


        //si tu trouvre une div avec un class qui est pierre 
        if (plateau.target.getAttribute("class") == "pierre") {
            if (plateau.target.getAttribute("class", 'pierre')) {
                //alors tu incrémente le score de la div qui comptien la class pierre
                k = k + 1;
                //incrementation du total des clics
                incrTotalClick();
                // si la div arrive a un score de 7
                if (k == 7) {
                    //tu remet le score a 0
                    k = 0;
                    // et tu incrémente de x le compteur de ressource
                    compteurRessourcePlateau3 = compteurRessourcePlateau3 + clickRessource3;
                    //tu incrémente aussi le compteur du déclancheur du changement de place des ressources
                    declencheurRessource3++;
                    sommeRessources();

                    //a chaque fois que le compteur du déclencheur atteindra 20, ça appelera le changement des places des ressources
                    if (declencheurRessource3 == 25) {
                        //tu remets le compteur du déclencheur a 0
                        declencheurRessource3 = 0;
                        //tu appel le changements des places des ressources
                        changeDePlaceRessource3();
                    } 
                }
            }
        } 
        ressource3.innerHTML = compteurRessourcePlateau3;
        activationItemsShop();
} plateau.onclick = clicker;


//fonction qui permet d'appeler le changement de niveau
function clickerMaison(bgEre) {
        //si tu trouvre une div avec un class qui est maison    
        if (bgEre.target.getAttribute("class") == "maison") {
            
            if (bgEre.target.getAttribute("class", 'maison') && compteurRessourcePlateau1 >= maisonPrix1 && compteurRessourcePlateau2 >= maisonPrix2 && compteurRessourcePlateau3 >= maisonPrix3 && compteurChangementMaison <= 3 ) {
                    compteurChangementMaison = compteurChangementMaison + 1;
                    changeNiveauMaison ();
            }
        }

        else if (bgEre.target.getAttribute("class") == "maison1") {
            
            if (bgEre.target.getAttribute("class", 'maison1') && compteurRessourcePlateau1 >= maisonPrix1 && compteurRessourcePlateau2 >= maisonPrix2 && compteurRessourcePlateau3 >= maisonPrix3 && compteurChangementMaison <= 3 ) {
                    compteurChangementMaison = compteurChangementMaison + 1;
                    changeNiveauMaison ();
            }
        }
        eventConstruct = true;
        incrConstruction();
        console.log(constructions);
        activationItemsShop();  
} bgEre.onclick = clickerMaison;

//générateur de nombre aléatoire
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var randTab = 0;

//fonction de changement de niveau des habitation
function changeNiveauMaison () {
    for (item of bgEre.children ) {
        if (item.classList.contains("maison") || item.classList.contains("maison1")) {
            if (item.classList.contains("maison") && compteurChangementMaison == 1) {
                
                item.classList.remove("maison");
                item.classList.toggle("maison1");

                compteurRessourcePlateau1 = compteurRessourcePlateau1 - maisonPrix1;
                compteurRessourcePlateau2 = compteurRessourcePlateau2 - maisonPrix2;
                compteurRessourcePlateau3 = compteurRessourcePlateau3 - maisonPrix3;
                maisonPrix1 = maisonPrix1 * 2;
                maisonPrix2 = maisonPrix2 * 2;
                maisonPrix3 = maisonPrix3 * 2;

                maisonFixe = maisonFixe + 1 ; 
            }
            else if (item.classList.contains("maison1") && compteurChangementMaison == 2) {
                
                compteurRessourcePlateau1 = compteurRessourcePlateau1 - maisonPrix1;
                compteurRessourcePlateau2 = compteurRessourcePlateau2 - maisonPrix2;
                compteurRessourcePlateau3 = compteurRessourcePlateau3 - maisonPrix3;
                maisonPrix1 = maisonPrix1 * 2;
                maisonPrix2 = maisonPrix2 * 2;
                maisonPrix3 = maisonPrix3 * 2;
                
                item.classList.remove("maison1");
                item.classList.toggle("maison2");

                randTab = parseInt(getRandomArbitrary(0, 10));

                if (bgEre.children[randTab].classList.contains("vide") && maisonFixe < 5) {
                    bgEre.children[randTab].classList.remove("vide");
                    bgEre.children[randTab].classList.toggle("maison");
                    compteurChangementMaison = 0 ;

                }

                else if (bgEre.children[randTab] != bgEre.children[randTab].classList.contains("vide")&& maisonFixe < 5){
                    randTab = parseInt(getRandomArbitrary(0, 10));
                    bgEre.children[randTab].classList.remove("vide");
                    bgEre.children[randTab].classList.toggle("maison");
                    compteurChangementMaison = 0 ;
                }     
            }
        } 
        prixMaison.innerHTML = maisonPrix1+ " : <strong>os</strong> <br>" +maisonPrix2+ " : <strong>bois</strong> <br>" +maisonPrix3+  " : <strong>pierre</strong> <br>" ;                
    }
    ressource1.innerHTML = compteurRessourcePlateau1;
    ressource2.innerHTML = compteurRessourcePlateau2;
    ressource3.innerHTML = compteurRessourcePlateau3;
    activationItemsShop();
}


//algo de changement des places des ressources
function changeDePlaceRessource1() {
    
    //tu parcours le plateau de jeu
    for (item of plateau.children) {

        //si une des div contient la class os
        if (item.classList.contains("os")){
            //alors la class os est supprimer
            item.classList.remove("os");
            //la class vide est ajouter a la place
            item.classList.add("vide");
            //attribution d'un nombre pour choisir une nouvelle div
            randTab = parseInt(getRandomArbitrary(0, 100));

            // si la div du plateau de la nouvelle position contien la class vide 
            if (plateau.children[randTab].classList.contains("vide")){
                //la div du plateau de la nouvelle position supprime la class vide
                plateau.children[randTab].classList.remove("vide");
                //la div du plateau de la nouvelle position ajoute la class os
                plateau.children[randTab].classList.add("os");
            }
            // sinon si la dive du plateau de la nouvelle position contien la class os ou pierre
            else if (plateau.children[randTab].classList.contains("bois") || plateau.children[randTab].classList.contains("pierre")){
                //alors une nouvelle attribution d'un nombre pour choisir une nouvelle div
                randTab = parseInt(getRandomArbitrary(0, 100));
                //la div du plateau de la nouvelle position supprime la class vide
                plateau.children[randTab].classList.remove("vide");
                //la div du plateau de la nouvelle position ajoute la class ow
                plateau.children[randTab].classList.add("os");
            }
        }      
    }
}

function changeDePlaceRessource2() {

    //tu parcours le plateau de jeu
    for (item of plateau.children) {

        //si une des div contient la class bois
        if (item.classList.contains("bois")){
            //alors la class bois est supprimer
            item.classList.remove("bois");
            //la class vide est ajouter a la place
            item.classList.add("vide");
            //attribution d'un nombre pour choisir une nouvelle div
            randTab = parseInt(getRandomArbitrary(0, 100));

            // si la div du plateau de la nouvelle position contien la class vide 
            if (plateau.children[randTab].classList.contains("vide")){
                //la div du plateau de la nouvelle position supprime la class vide
                plateau.children[randTab].classList.remove("vide");
                //la div du plateau de la nouvelle position ajoute la class bois
                plateau.children[randTab].classList.add("bois");
            }
            // sinon si la dive du plateau de la nouvelle position contien la class os ou pierre
            else if (plateau.children[randTab].classList.contains("os") || plateau.children[randTab].classList.contains("pierre")){
                //alors une nouvelle attribution d'un nombre pour choisir une nouvelle div
                randTab = parseInt(getRandomArbitrary(0, 100));
                //la div du plateau de la nouvelle position supprime la class vide
                plateau.children[randTab].classList.remove("vide");
                //la div du plateau de la nouvelle position ajoute la class bois
                plateau.children[randTab].classList.add("bois");
            }
        } 
    }
}

function changeDePlaceRessource3() {

    //tu parcours le plateau de jeu
    for (item of plateau.children) {

        //si une des div contient la class pierre
        if (item.classList.contains("pierre")){
            //alors la class pierre est supprimer
            item.classList.remove("pierre");
            //la class vide est ajouter a la place
            item.classList.add("vide");
            //attribution d'un nombre pour choisir une nouvelle div
            randTab = parseInt(getRandomArbitrary(0, 100));

            // si la div du plateau de la nouvelle position contien la class vide 
            if (plateau.children[randTab].classList.contains("vide")){
                //la div du plateau de la nouvelle position supprime la class vide
                plateau.children[randTab].classList.remove("vide");
                //la div du plateau de la nouvelle position ajoute la class pierre
                plateau.children[randTab].classList.add("pierre");
            }
            // sinon si la dive du plateau de la nouvelle position contien la class os ou pierre
            else if (plateau.children[randTab].classList.contains("os") || plateau.children[randTab].classList.contains("bois")){
                //alors une nouvelle attribution d'un nombre pour choisir une nouvelle div
                randTab = parseInt(getRandomArbitrary(0, 100));
                //la div du plateau de la nouvelle position supprime la class vide
                plateau.children[randTab].classList.remove("vide");
                //la div du plateau de la nouvelle position ajoute la class pierre
                plateau.children[randTab].classList.add("pierre");
            }
        } 
    }
}
// ----------------------- Fin : ressource et compteur ----------------------- //

// ----------------------- Debut : carte des Connaissances ----------------------- //

function achatCarte1 () {
    if (  //outil 1 niveau 1 &&
        compteurRessourcePlateau1 == 20 && compteurRessourcePlateau2 == 40 && compteurRessourcePlateau3 == 30) { 
        
        compteurRessourcePlateau1 = compteurRessourcePlateau1 - 20;
        compteurRessourcePlateau2 = compteurRessourcePlateau2 - 40;
        compteurRessourcePlateau3 = compteurRessourcePlateau3 - 30;

        //ajoute + 20 % à la bar d'évolution
    }
}

function achatCarte2 () {
    if (  //outil 2 niveau 1 &&
        compteurRessourcePlateau1 == 30 && compteurRessourcePlateau2 == 50 && compteurRessourcePlateau3 == 40) { 
        
        compteurRessourcePlateau1 = compteurRessourcePlateau1 - 30;
        compteurRessourcePlateau2 = compteurRessourcePlateau2 - 50;
        compteurRessourcePlateau3 = compteurRessourcePlateau3 - 40;

        //ajoute + 20 % à la bar d'évolution

    }
}

function achatCarte3 () {
    if ( //outil 3 niveau 1 &&
        compteurRessourcePlateau1 == 40 && compteurRessourcePlateau2 == 60&& compteurRessourcePlateau3 == 50) { 
        
        compteurRessourcePlateau1 = compteurRessourcePlateau1 - 40;
        compteurRessourcePlateau2 = compteurRessourcePlateau2 - 60;
        compteurRessourcePlateau3 = compteurRessourcePlateau3 - 50;

        //ajoute + 20 % à la bar d'évolution

    }
}

// ----------------------- Fin : ressource et compteur --------------------------- //

//------------------------- catastrophe -------------------------//

// function choas (){
//     if ( /* quelque chose */ == 20) {
//         var dino = document.getElementById("catastrophe");
//         dino.classList.contains("none");
//         dino.classList.remove("none");
//         dino.classList.add("visible");
//         compteurRessourcePlateau1 = compteurRessourcePlateau1 - dommagesRessource1;
//         compteurRessourcePlateau2 = compteurRessourcePlateau2 - dommagesRessource2;
//         compteurRessourcePlateau3 = compteurRessourcePlateau3 - dommagesRessource3;
//     }
// }

//------------------------- fin catastrophe -------------------------//
function changePage(pageId, event) {
    // 1. Cacher toutes les pages et retirer les classes actives
    var pages = document.querySelectorAll('.page-content');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    var links = document.querySelectorAll('.nav-link');
    links.forEach(function(link) {
        link.classList.remove('active');
    });

    // 2. Astuce pour "redémarrer" l'animation : cloner la page puis la remplacer
    var targetPage = document.getElementById(pageId);
    var newPage = targetPage.cloneNode(true);
    targetPage.parentNode.replaceChild(newPage, targetPage);
    
    // 3. Afficher la nouvelle page
    newPage.classList.add('active');

    // 4. Ajouter la classe "active" sur le lien cliqué
    if(event) {
        event.target.classList.add('active');
    }
    
    // 5. Remonter en haut de la page en douceur
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fonction pour entrer sur le site (Ferme la pré-accueil)
function enterSite() {
    const landing = document.getElementById('landing-page');
    landing.style.opacity = '0';
    setTimeout(() => {
        landing.style.visibility = 'hidden';
        // Optionnel : Arrêter les braises de l'intro pour économiser des ressources
        const landingEmbers = document.getElementById('landing-embers');
        if(landingEmbers) landingEmbers.innerHTML = ''; 
    }, 1000);
}

// Gestion des Braises (Particules)
document.addEventListener("DOMContentLoaded", function() {
    // 1. Braises INTENSES pour la landing page
    const landingContainer = document.getElementById('landing-embers');
    if(landingContainer) {
        setInterval(() => createEmber(landingContainer), 30); // 30ms = Très intense
    }

    // 2. Braises normales pour le fond du site
    const mainContainer = document.querySelector('.decor-layer .embers-container');
    if(mainContainer) {
        setInterval(() => createEmber(mainContainer), 200); // 200ms = Normal
    }
});

function createEmber(container) {
    const ember = document.createElement('div');
    ember.classList.add('ember');
    
    // Taille aléatoire
    const size = Math.random() * 5 + 2; 
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;
    
    // Position horizontale aléatoire
    ember.style.left = `${Math.random() * 100}%`;
    
    // Durée de vie aléatoire
    const duration = Math.random() * 2 + 3; // Entre 3 et 5 secondes
    ember.style.animationDuration = `${duration}s`;
    
    container.appendChild(ember);
    
    // Nettoyage du DOM
    setTimeout(() => { ember.remove(); }, duration * 1000);
}
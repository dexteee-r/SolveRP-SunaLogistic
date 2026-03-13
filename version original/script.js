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
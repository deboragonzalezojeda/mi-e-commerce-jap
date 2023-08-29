function showAlertWarning() {
    document.getElementById('alert-warning').classList.add('show');
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    if(!sessionStorage.datos) {
        showAlertWarning();
        setTimeout(() => {location.href = "login.html";}, 5000)
    } else {
        document.getElementById('logged-account').innerHTML += `<a class="nav-link" href="my-profile.html">${JSON.parse(sessionStorage.datos).email}</a>`
    }
});


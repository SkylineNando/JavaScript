if(navigator.browserLanguage) {  
	var idioma = navigator.browserLanguage;    
	}
else if(navigator.language) {
	var idioma = navigator.language;
	if(idioma=="pt-BR") {
	location.href="brasil.html";
	}
}

/* 
 * Renvois un tableau de nombres dans l interballe [0-26] representant la clé
 * la clé insensible à la casse et les lettres non ignorées sont ignorées.
 */
function filterKey(key) { 
	var result = [];
	for (var i = 0; i < key.length; i++) {
		var c = key.charCodeAt(i);
		if (isLetter(c))
			result.push((c - 65) % 32);
	}
	return result;
}


// Test du caractere specifié si c est une lettre.
function isLetter(c) {
	return isUppercase(c) || isLowercase(c);
}

// Test si le code du caractere specifié est une lettre majuscule.
function isUppercase(c){
	return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
}

// Test si le code du caractere specifié est une lettre minuscule.
function isLowercase(c) {
	return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
}


/*
* fonction de decryptage
*/

function decrypt(isDecrypt) {
	if (document.getElementById("key").value.length == 0) {				//condition sur la longueur de la clé
		alert("La clé est vide, veuillez entrer une clé !!");
		return;
	}
	var key = filterKey(document.getElementById("key").value); 			// key fonction anonyme qui cree un tableau de valeur 
	if (key.length == 0) 
	{
		alert("la clé doit etre un ensemble de lettres !");
		return;
	}
	if (isDecrypt) {		
		for (var i = 0; i < key.length; i++)		
			key[i] = (26 - key[i]) % 26;								// renvoie pour chaque pas la lettre chiffré (clair + cle)mood 26 
	}
	var textElem = document.getElementById("text");						// attribution du contenu de textarea a textElem
	textElem.value = crypt(textElem.value, key);						// appel de la fonction de cryptage et renvoie de la valeur sur la sortie standard textElem
}


/* 
 * fonction de cryptage
 */

function crypt(input, key) {
	var output = "";
	for (var i = 0, j = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		} else if (isLowercase(c)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		} else {
			output += input.charAt(i);
		}
	}
	return output;
}

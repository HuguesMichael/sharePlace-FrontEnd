const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
//identifiant des différents types de validation
//VALIDATOR_TYPE_REQUIRE est une constante qui va nous permettre de valider si l'input est requis ou pas    
//VALIDATOR_TYPE_MINLENGTH est une constante qui va nous permettre de valider si l'input a une longueur minimale
//VALIDATOR_TYPE_MAXLENGTH est une constante qui va nous permettre de valider si l'input a une longueur maximale
//VALIDATOR_TYPE_MIN est une constante qui va nous permettre de valider si l'input a une valeur minimale
//VALIDATOR_TYPE_MAX est une constante qui va nous permettre de valider si l'input a une valeur maximale
//VALIDATOR_TYPE_EMAIL est une constante qui va nous permettre de valider si l'input est un email
//VALIDATOR_TYPE_FILE est une constante qui va nous permettre de valider si l'input est un fichier

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

// Fonction de validation qui va prendre en paramètre la valeur de l'input et un tableau de validateurs
// La fonction va retourner un booléen qui va nous dire si l'input est valide ou pas    
// La fonction va parcourir le tableau de validateurs et va appliquer la validation sur la valeur de l'input
// La fonction va retourner true si l'input est valide et false si l'input n'est pas valide
export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};

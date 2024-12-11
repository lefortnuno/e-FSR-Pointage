export default function GetUserData() {
  const keys = [
    "token",
    "id",
    "nom",
    "prenom",
    "im",
    "departement",
    "num",
    "email",
    "roleU",
    "validCompte",
    "enConge",
    "nbJour",
    "pic",
    "qrCodeValue",
  ];

  // Récupérer chaque clé de localStorage et la stocker dans un objet u_info
  const u_info = keys.reduce((acc, key) => {
    let value = localStorage.getItem(key);

    // Convertir en booléen si la clé est l'une des clés booléennes
    if (["roleU", "validCompte", "enConge"].includes(key) && value !== null) {
      acc[`u_${key}`] = JSON.parse(value); // Convertit "true"/"false" en booléen
    } else {
      acc[`u_${key}`] = value; // Garde la valeur telle quelle pour les autres clés
    }
    
    return acc;
  }, {});

  // Ajouter les options d'en-tête d'autorisation avec le token récupéré
  const headOpts = {
    opts: {
      headers: {
        Authorization: u_info.u_token,
      },
    },
  };

  // Fusionner u_info et headOpts dans un seul objet u_data
  const u_data = Object.assign({}, u_info, headOpts);

  return u_data;
}

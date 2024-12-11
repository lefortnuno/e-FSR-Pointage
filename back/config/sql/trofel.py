import random
from datetime import datetime, timedelta

# Configuration
start_date = datetime(2024, 11, 1)
end_date = datetime(2024, 11, 30)
jours_feries = [
    datetime(2024, 8, 15),  # Assomption
    datetime(2024, 11, 1),  # Toussaint
]
employes = ["MG6789", "MG3525", "MG9966", "MG4523", "MG3214", "MG0303", "MG4612", "MG1256", "LEFORT", "MALALA"]

# Plages horaires
entree_matin = [(8, 0), (9, 0)]
sortie_apres_midi = [(16, 0), (17, 0)]

# Fonctions utilitaires
def random_time(time_range):
    """Génère une heure aléatoire dans une plage donnée."""
    start_hour, start_minute = time_range[0]
    end_hour, end_minute = time_range[1]
    hour = random.randint(start_hour, end_hour)
    minute = random.randint(0, 59)
    return f"{hour:02d}:{minute:02d}:00"

def is_weekend(date):
    """Vérifie si une date est un week-end."""
    return date.weekday() >= 5

# Génération des dates valides (sans week-ends et jours fériés)
dates_valides = []
current_date = start_date
while current_date <= end_date:
    if not is_weekend(current_date) and current_date not in jours_feries:
        dates_valides.append(current_date)
    current_date += timedelta(days=1)

# Génération des données
insert_values = []
for date in dates_valides:
    # Randomiser les employés présents chaque jour
    nb_absences = random.randint(0, len(employes) - 1)
    present_employes = random.sample(employes, len(employes) - nb_absences)

    for employe in present_employes:
        heure_entree = random_time(entree_matin)
        heure_sortie = random_time(sortie_apres_midi)
        insert_values.append(f"('{employe}', '{heure_entree}', '{heure_sortie}', '{date.date()}')")

# Génération du script SQL
sql = (
    "DELETE FROM pointages; \n\n"
    "INSERT INTO pointages (\"employeIm\", \"heureEntree\", \"heureSortie\", \"dateDuJour\") VALUES\n"
)
sql += ",\n".join(insert_values) + ";"

# Écriture dans un fichier
output_file = "ePointage_Online.sql"
with open(output_file, "w", encoding="utf-8") as file:
    file.write(sql)

print(f"Le script SQL a été sauvegardé dans le fichier '{output_file}'.")

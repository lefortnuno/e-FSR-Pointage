SELECT
    SUM(
        EXTRACT(
            EPOCH
            FROM
                ('08:30:00' :: TIME - "heureEntree")
        ) / 3600
    ) AS total_heures_retard
FROM
    pointages
WHERE
    "employeIm" = 'LEFORT'
    AND TO_CHAR("dateDuJour", 'YYYY-MM') = '2024-11'
    AND EXTRACT(
        DOW
        FROM
            "dateDuJour"
    ) NOT IN (0, 6) -- Exclure dimanche (0) et samedi (6)
    AND "heureEntree" > '08:30:00';

-- Filtrer uniquement les cas de retard
SELECT
    SUM(
        EXTRACT(
            EPOCH
            FROM
                ("heureSortie" - "heureEntree")
        ) / 3600
    ) AS total_heures
FROM
    pointages
WHERE
    "employeIm" = 'LEFORT'
    AND TO_CHAR("dateDuJour", 'YYYY-MM') = '2024-11'
    AND EXTRACT(
        DOW
        FROM
            "dateDuJour"
    ) NOT IN (0, 6);

-- Exclure dimanche (0) et samedi (6)
SELECT
    COUNT(DISTINCT "dateDuJour") AS jours_travailles
FROM
    pointages
WHERE
    "employeIm" = 'LEFORT'
    AND TO_CHAR("dateDuJour", 'YYYY-MM') = '2024-12'
    AND EXTRACT(
        DOW
        FROM
            "dateDuJour"
    ) NOT IN (0, 6) -- Exclure dimanche (0) et samedi (6)
    AND "heureEntree" IS NOT NULL;

-- Considérer uniquement les jours où l'employé est venu
SELECT
    COUNT(*) AS jours_absence
FROM
    (
        SELECT
            "dateDuJour"
        FROM
            generate_series(
                date_trunc('month', TO_DATE('2024-11', 'YYYY-MM')),
                date_trunc('month', TO_DATE('2024-11', 'YYYY-MM')) + interval '1 month' - interval '1 day',
                '1 day'
            ) AS all_dates("dateDuJour")
        WHERE
            EXTRACT(
                DOW
                FROM
                    "dateDuJour"
            ) NOT IN (0, 6) -- Exclure dimanche (0) et samedi (6)
            AND NOT EXISTS (
                SELECT
                    1
                FROM
                    pointages
                WHERE
                    "employeIm" = 'LEFORT'
                    AND pointages."dateDuJour" = all_dates."dateDuJour"
                    AND "heureEntree" IS NOT NULL
            )
    ) AS absence_days;

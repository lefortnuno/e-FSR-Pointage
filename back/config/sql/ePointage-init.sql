DROP TABLE IF EXISTS jours_feries;

DROP TABLE IF EXISTS conges;

DROP TABLE IF EXISTS pointages;

DROP TABLE IF EXISTS utilisateurs;

-- Création de la table utilisateurs
CREATE TABLE utilisateurs (
    im VARCHAR(8) PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(100) DEFAULT NULL,
    departement VARCHAR(50),
    num VARCHAR(15),
    email VARCHAR(75),
    pwd VARCHAR(62) NOT NULL,
    "roleU" BOOLEAN DEFAULT FALSE,
    -- 0 = USAGER, 1 = ADMIN
    "validCompte" BOOLEAN DEFAULT FALSE,
    "enVacance" BOOLEAN DEFAULT FALSE,
    "nbJour" INT DEFAULT 40,
    pic VARCHAR(50) DEFAULT NULL,
    "qrCodeValue" TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table pointages
CREATE TABLE pointages (
    id SERIAL PRIMARY KEY,
    "etudiantIm" VARCHAR(6) NOT NULL,
    "heureEntree" TIME,
    "heureSortie" TIME DEFAULT NULL,
    "dateDuJour" DATE,
    coms VARCHAR(100),
    CONSTRAINT fk_employe FOREIGN KEY ("etudiantIm") REFERENCES utilisateurs(im) ON DELETE CASCADE
);

-- Création de la table congEs
CREATE TABLE conges (
    id SERIAL PRIMARY KEY,
    "cIm" VARCHAR(6) NOT NULL,
    motif VARCHAR(100),
    "dateDeDebut" DATE,
    "dateDeFin" DATE,
    "nbJourC" INT,
    "reqConge" boolean DEFAULT TRUE,
    -- La demande de conges est envoye par defaut
    "etatReqConge" boolean DEFAULT NULL,
    --nuul car je vais les request apres
    CONSTRAINT fk_conge_employe FOREIGN KEY ("cIm") REFERENCES utilisateurs(im) ON DELETE CASCADE
);

-- Création de la table jours_feries
CREATE TABLE jours_feries (
    id SERIAL PRIMARY KEY,
    "dateJF" DATE NOT NULL UNIQUE,
    "descJF" VARCHAR(100)
);

-- Insertion Jours Feries
INSERT INTO
    jours_feries ("dateJF", "descJF")
VALUES
    ('2024-01-01', 'Jour de l''An'),
    ('2024-12-25', 'Jour de Noel'),
    ('2024-05-01', 'Fête du Travail');

DELETE FROM
    utilisateurs;

DELETE FROM
    pointages;

-- DONNEES USERS 
INSERT INTO
    utilisateurs (
        im,
        nom,
        prenom,
        departement,
        num,
        email,
        pwd,
        "roleU",
        "validCompte",
        "enVacance",
        "nbJour",
        pic,
        "qrCodeValue",
        created_at
    )
VALUES
    (
        'TROFEL',
        'LEFORT',
        'N. Nuno',
        'Master 2',
        '0642359184',
        'Trofelnuno@gmail.com',
        '$2b$10$90FIH7CqpbR.RWkQeuG6h.e/tzrznoAqGLXXi7bpWnTaPGobuD2HG',
        't',
        't',
        'f',
        40,
        'uploads/pic-1734419105639-104028912.png',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKmSURBVO3BQW7kQAwEwSxC//9yro88NSBIM14TjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJNKl4ROpUvCicpJEr5J5YlijVKsUYo1ysXLVN6UhCdUTpLQqZyovCkJbyrWKMUapVijXHxYEu5Q+UuScIfKJxVrlGKNUqxRLv44lS4JJyqdyiTFGqVYoxRrlIs/LgknKl0STlT+smKNUqxRijXKxYepfJLKSRI6lTep/E+KNUqxRinWKBcvS8I3JaFTuSMJncpJEv5nxRqlWKMUa5T4g8GS0KlMVqxRijVKsUa5eCgJncpJEn5TEjqVLgmdykkSOpUuCXeoPFGsUYo1SrFGuXhIpUvCHSpdEjqVLgmdyh1J6JJwRxLuUDlJwpuKNUqxRinWKBcvUzlJQpeETqVLwh1J6FTuULlDpUvCbyrWKMUapVijXDyUhBOVTqVLwolKl4QnVLokdEm4IwknKl0SPqlYoxRrlGKNcvEylS4JJyonSehUTlS6JPymJHxTsUYp1ijFGuXiIZUTlSdUTpLQqZyodEm4Q+UkCZ3KSRLeVKxRijVKsUaJP3ggCd+k0iXhCZVJijVKsUYp1igXL1N5UxLuUHlTEjqVJ5LQqbypWKMUa5RijXLxYUm4Q+WJJJyonCThjiScqHQqXRI6lSeKNUqxRinWKBfDqNyRhE9KQqfSqbypWKMUa5RijXLxx6nckYQ7VLok3KHSJeFE5YlijVKsUYo1ysWHqfymJNyhcqJykoQ7VN5UrFGKNUqxRrl4WRK+KQmdSqdykoQuCZ1Kl4QTlS4J31SsUYo1SrFGiT9YYxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGuUftQ797D401PEAAAAASUVORK5CYII=',
        '2024-12-26 19:27:42.196082'
    ),
    (
        'LEFORT',
        'LEFORT',
        'Nomenjanahary Nuno',
        'Master 2',
        '0380994042',
        'lefort@gmail.com',
        '$2b$10$8zSCozIrTJsiAVYxBTAL7OkITjn3XwNnns.0.btbkV6e4PMvz/oqu',
        't',
        't',
        'f',
        28,
        'uploads/pic-1731071655706-942906844.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKoSURBVO3BQW7kQAwEwSxC//9yro88NSBIM/DSjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKSRI6lZMkdCpdEr5J5YlijVKsUYo1ysXLVN6UhE9SuUPlTUl4U7FGKdYoxRrl4sOScIfKHUnoVO5IQqdyRxLuUPmkYo1SrFGKNcrFMEk4UelUJinWKMUapVijXPxxSehU/mfFGqVYoxRrlIsPU/kmlZMkdCpPqPwmxRqlWKMUa5SLlyXhN0lCp9IloVM5ScJvVqxRijVKsUaJP/iPJaFT+cuKNUqxRinWKBcPJaFT6ZLwJpVOpUtCp9IloVM5ScKbVD6pWKMUa5RijXLxZSpPJKFT6VS6JJwk4Q6VkyScJOFE5YlijVKsUYo1SvzBFyWhU+mS8CaVkyR0Kl0STlS6JDyh8kSxRinWKMUa5eKhJDyRhE7lJAknKl0S7kjCicpvVqxRijVKsUa5eJnKSRI6lZMknKjcodIloVM5SUKncqJykoQ3FWuUYo1SrFEuHlK5Q+UOlZMk/GZJ+KZijVKsUYo1SvzBA0n4JpUnktCpdEnoVE6ScKLyTcUapVijFGuUi5epvCkJJ0noVE5UTlROknCi0iXhDpUnijVKsUYp1igXH5aEO1TelIQTlS4JnUqn0iWhS0Kn8k3FGqVYoxRrlIthktCpdEnoknCShBOVLgldEjqVTyrWKMUapVijXPwxKl0SOpUuCU+ofFOxRinWKMUa5eLDVD5J5Y4knCThCZUuCZ1Kl4RO5YlijVKsUYo1ysXLkvBNSThR6VS6JHQqJ0l4k8qbijVKsUYp1ijxB2uMYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVij/APKuATxJwbvOQAAAABJRU5ErkJggg==',
        '2024-12-25 19:17:42.196082'
    ),
    (
        'CHAIM',
        'FAHMI',
        'CHAIMA',
        'Master 2',
        '0698394042',
        'Chaimaa@gmail.com',
        '$2b$10$0s77bYF9wfAscKS3dm7hEeM5QeESo4wi5v3Aot7VscyK/rAaCu4NC',
        't',
        't',
        'f',
        28,
        'uploads/pic-1734016093780-117760722.png',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKxSURBVO3BQW7sWAwEwSxC979yjpdcPUCQur/NYUT8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw8l4ZtUTpJwh8pJEr5J5YlijVKsUYo1ysXLVN6UhDtUuiS8SeVNSXhTsUYp1ijFGuXiw5Jwh8odSThR6ZLwpiTcofJJxRqlWKMUa5SLYVT+z4o1SrFGKdYoF8MkoVM5SUKn8pcVa5RijVKsUS4+TOWbVE5UuiQ8ofKbFGuUYo1SrFEuXpaE3yQJncoTSfjNijVKsUYp1ijxB39YEt6k8pcVa5RijVKsUS4eSkKn0iXhTSqdSpeEE5UuCSdJeJPKJxVrlGKNUqxRLl6WhE6lS8KJyh1J6FS6JDyh0iWhUzlJQpeETuVNxRqlWKMUa5SLXy4JnUqncqLSJaFT6ZLQqXQqXRJOVLokdEnoVJ4o1ijFGqVYo8QfvCgJncpJEk5U7kjCicoTSThRuSMJncoTxRqlWKMUa5T4gy9KQqdykoQTlTuS0Kl0SehUTpLQqfxLxRqlWKMUa5T4gz8sCd+k8qYkdCpPFGuUYo1SrFEuHkrCN6l0KidJ6FS6JHQqXRK6JHQqJ0noVD6pWKMUa5RijXLxMpU3JeEkCZ3KSRJOknCicofKNxVrlGKNUqxRLj4sCXeovEnlJAmdykkSOpUuCZ3KicqbijVKsUYp1igXwyWhU/kklS4JnconFWuUYo1SrFEuhklCp9IloVPpktCpdCpdEjqVf6lYoxRrlGKNcvFhKp+k0iWhS0KncqJykoQ3JaFTeaJYoxRrlGKNcvGyJHxTEk5UuiR0Kl0SOpVOpUvCEypvKtYoxRqlWKPEH6wxijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKN8h9jsxHnLSDG3QAAAABJRU5ErkJggg==',
        '2024-12-24 19:17:42.196082'
    ),
    (
        'MALALA',
        'Malala',
        'Ny Aina',
        'Licence L3',
        '0380994042',
        'malalaNyAina5@gmail.com',
        '$2b$10$gFJVUY7w7FaEtlvJ5lk7a.dsu9GbXA4D4YgQsGQNobFU4oVBs2CR6',
        't',
        't',
        'f',
        31,
        'uploads/pic-1731599219547-341176001.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALASURBVO3BQa7jSAwFwXyE7n/lnL/kqgBBstHmMCL+YY1RrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUi4eS8E0qJ0noVLokdConSfgmlSeKNUqxRinWKBcvU3lTEk6ScIfKEypvSsKbijVKsUYp1igXH5aEO1TuUOmS0CWhU+mS0KnckYQ7VD6pWKMUa5RijXIxjMpJEjqVSYo1SrFGKdYoFz8uCXeodEnoVH5ZsUYp1ijFGuXiw1Q+SaVLQqfySSr/kmKNUqxRijXKxcuS8E1J6FS6JHQqTyThX1asUYo1SrFGiX/4H0nCicovK9YoxRqlWKNcPJSETqVLQqfSJaFT6ZLQqbxJ5YkkdConSehU3lSsUYo1SrFGiX94URI6lU9KwonKE0noVJ5IQqfypmKNUqxRijVK/MOLknCHSpeEE5U7ktCpdEnoVO5IwonKNxVrlGKNUqxR4h8eSEKncpKEE5WTJDyhckcSOpUnknCi8kSxRinWKMUa5eLDktCpdEk4ScIdKnckoVO5IwknKicqbyrWKMUapVijxD/8sCR0KidJ6FS6JHQqXRI6lSeS0Kk8UaxRijVKsUa5eCgJ36TSqXRJ6FSeSMIvKdYoxRqlWKNcvEzlTUm4Q+WOJJyodEnoktCpdEnoVD6pWKMUa5RijXLxYUm4Q+WOJHQqXRJOVLokdEk4UTlR+aZijVKsUYo1ysWPU7lD5USlS8ITSThReVOxRinWKMUa5eLHJeFE5SQJnUqncpKETqVTOUlCp/JEsUYp1ijFGuXiw1Q+SaVLQpeETqVTOUnCicpJEr6pWKMUa5RijXLxsiR8UxKeSEKncqLSJaFTOVHpkvCmYo1SrFGKNUr8wxqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYo/wHJCR7guUhKvgAAAABJRU5ErkJggg==',
        '2024-12-23 19:17:42.196082'
    ),
    (
        'MG1256',
        'Adrien',
        'Norluciot',
        'Caissier',
        '0334514789',
        'adrien@gmail.com',
        '$2b$10$82Uc0WWivyarug33gAiT6.bXXgdn1B2zBCYNHh4YFuNqILmDtGJjq',
        'f',
        't',
        'f',
        40,
        'uploads/pic-1732683321753-835168899.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK1SURBVO3BQW7sWAwEwSxC979yjpdcPUCQuu3PYUT8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw8l4ZtUnkjCiUqXhG9SeaJYoxRrlGKNcvEylTcl4Y4kfJLKm5LwpmKNUqxRijXKxYcl4Q6VO5LQqXRJ6FS6JDyRhDtUPqlYoxRrlGKNcjFMEk6S0KlMUqxRijVKsUa5GEbljiR0Kv+yYo1SrFGKNcrFh6l8UxLuUHlC5S8p1ijFGqVYo1y8LAm/SaVLQqfSJaFTOUnCX1asUYo1SrFGiT/4hyXhDpXJijVKsUYp1igXDyWhU+mS8CaVTqVLQqfSJaFTOUnCm1Q+qVijFGuUYo1y8bIk3KFyRxI6lSeScIfKHUk4SUKn8kSxRinWKMUa5eKXJaFT6ZLwRBI6lS4JnUqXhC4JncodSfikYo1SrFGKNUr8wYuS0Kl0SbhDpUtCp3KShDepnCThRKVLQqfyRLFGKdYoxRrl4qEknCShU+mS0Kl0SehU7lA5SUKncpKETuWOJHxSsUYp1ijFGuXiIZUnVE5UTpLQqXRJ6FS+SaVLwicVa5RijVKsUeIPHkjCN6k8kYROpUtCp3KShE7lNxVrlGKNUqxRLl6m8qYknCThRKVTOVE5ScIdSbhD5YlijVKsUYo1ysWHJeEOlU9KQqfSJaFT6VS6JHRJ6FS+qVijFGuUYo1y8T+XhJMknKj8JcUapVijFGuUi2FUuiR0Kl0SOpUuCXck4UTlk4o1SrFGKdYoFx+m8kkqJypdEk6S8CaVkyR0Kk8Ua5RijVKsUS5eloRvSsIdKl0SOpWTJJyodEnoVDqVNxVrlGKNUqxR4g/WGMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRvkPsgwFA249IvcAAAAASUVORK5CYII=',
        '2024-11-27 04:55:22.844658'
    ),
    (
        'MG4612',
        'Aina',
        'Razafimahatratra',
        'Chargé de clientèle',
        '0345275362',
        'razafimahatratr@gmail.com',
        '$2b$10$1Xf813unINrWXDtUlJ5AJucFYI.deQCWgdzuRz.S99ZY8gW119S6O',
        'f',
        't',
        'f',
        40,
        'uploads/pic-1732683392408-106211020.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKrSURBVO3BQQ7cSAwEwSxC//9yro88NSBImrUJRsQ/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEk/JLKE0noVE6S8EsqTxRrlGKNUqxRLl6m8qYk3JGETqVTeULlTUl4U7FGKdYoxRrl4mNJuEPljiScJKFT6ZLQqdyRhDtUvlSsUYo1SrFGuRhG5SQJncokxRqlWKMUa5SLYZLQqXQqXRI6lX9ZsUYp1ijFGuXiYyq/pHKShE7lCZW/SbFGKdYoxRrl4mVJ+JskoVPpktCpnCThb1asUYo1SrFGuXhI5V+mcqLyLynWKMUapVijXDyUhE6lS8KbVDqVO5LQqZwk4U0qXyrWKMUapVijXDyk0iWhU+mScKJykoQ3JeEOlTuScJKETuWJYo1SrFGKNcrFQ0m4Q+WOJHQqb0pCp9IloUtCp9Il4SQJXyrWKMUapVijXPzPknCickcSnkjCicoTKl0S3lSsUYo1SrFGufhYEk5UTpLQqZyo3JGETuUkCZ3KiUqXhC8Va5RijVKsUS4eUvmSykkSOpUuCZ3KLyXhl4o1SrFGKdYo8Q8eSMIvqTyRhE6lS0KncpKETqVLQqfypWKNUqxRijXKxctU3pSEkyR0KicqJyonSXgiCScqTxRrlGKNUqxRLj6WhDtUvpSETqVLQqfSqXRJuEPlS8UapVijFGuUi+GScJKEkyScqJyo/FKxRinWKMUa5WKYJJyodEnoVLok3JGETuWXijVKsUYp1igXH1P5ksodSThJwi8loVN5olijFGuUYo1y8bIk/FIS7lDpktCpnCThRKVLQqfSqbypWKMUa5RijRL/YI1RrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuU/wCVmPz2lRORmQAAAABJRU5ErkJggg==',
        '2024-11-27 04:56:33.475992'
    ),
    (
        'MG3214',
        'Heriniaina',
        'Narindra',
        'Sécurité',
        '0347899651',
        'narindra@gmail.com',
        '$2b$10$C5YXRQtrgVVfTsQRQ5BRA.V/wgWt5.dnSE7NyLa.C2iGe17uSxA/a',
        'f',
        't',
        'f',
        40,
        'uploads/pic-1732683559931-684280619.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALGSURBVO3BQY7YSAwEwUxC//9y7Rx5akCQNLa5jDA/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4iGV35SEE5UuCZ1Kl4QTld+UhCeKNUqxRinWKBcvS8KbVJ5Q6ZLQqXRJOEnCm1TeVKxRijVKsUa5+JjKHUm4Q+UOlS4JT6jckYQvFWuUYo1SrFEuhklCp3Ki0iXhX1asUYo1SrFGuRguCScqkxRrlGKNUqxRLj6WhN+k0iWhU+mS8EQS/ibFGqVYoxRrlIuXqfxJSehUuiR0Kl0STlT+ZsUapVijFGsU84N/mModSZisWKMUa5RijXLxkEqXhE7lTUnoktCpdEnoVLoknKi8KQlfKtYoxRqlWKNcfCwJncodSehU7lA5UbkjCXeonKh0SXiiWKMUa5RijXLxMZUuCZ3KiUqXhBOVkyR0Kl0SOpVOpUtCp3Ki8qVijVKsUYo1ysXHktCpdEnoVLokdCpdEk6S0KmcqJwk4SQJnUqXhE7lTcUapVijFGuUi5epnCShU+mS0KmcqNyRhE6lS8KJSpeETuVE5UvFGqVYoxRrlIuHkvBEEk6ScKJyotIl4UtJ6FR+U7FGKdYoxRrF/OABld+UhDtUTpLQqXRJOFHpkvAnFWuUYo1SrFEuXpaEN6mcqNyRhJMknKjcoXJHEp4o1ijFGqVYo1x8TOWOJHxJpUtCp9IloUtCp3JHEr5UrFGKNUqxRrkYLgmdSqdyonKShE6lS8JvKtYoxRqlWKNc/M8koVPpktCp3JGETqVLwpeKNUqxRinWKBcfS8KXktCpdCp3qDyhcodKl4QnijVKsUYp1igXL1P5TSp3JKFT6ZJwonKShE7lJAlvKtYoxRqlWKOYH6wxijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKN8h90igcfcpoiPQAAAABJRU5ErkJggg==',
        '2024-11-27 04:59:21.22306'
    ),
    (
        'MG1234',
        'Remy',
        'Niclaudet',
        'Caissier',
        '0345665887',
        'remyniclaudet@gmail.com',
        '$2b$10$AuBy.BEyTL7An1zLz/hZR.AaRKcWi42199Qx9YnRxGwkkkHUc4.5e',
        'f',
        't',
        'f',
        30,
        'uploads/pic-1732683725848-420642356.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKxSURBVO3BQW7kQAwEwSxC//9yro88NSBIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKSRI6lS4JncpJEr5J5YlijVKsUYo1ysXLVN6UhDtUTlSeUHlTEt5UrFGKNUqxRrn4sCTcoXJHEt6kckcS7lD5pGKNUqxRijXKxTAqJ0noVCYp1ijFGqVYo1wMk4ROpVPpktCp/GXFGqVYoxRrlIsPU/kmlS4JJypPqPwmxRqlWKMUa5SLlyXhN1PpktCpnCThNyvWKMUapVijXDyk8pepnKj8JcUapVijFGuU+IMHktCpdEl4k8pJEu5QOUnCm1Q+qVijFGuUYo1y8bIknKicJKFTOUlCp9Il4SQJd6jckYSTJHQqTxRrlGKNUqxRLl6mcpKEO5LQqXQqXRJOVLokdCpdErokdCp3JOGTijVKsUYp1ijxBx+UhBOVLgmdypuS8ITKSRJOVLokdCpPFGuUYo1SrFEuHkrCHSp3JOFE5SQJnUqXhE7lJAmdyh1J+KRijVKsUYo1ysVDKm9SuSMJncpvotIl4ZOKNUqxRinWKPEHDyThm1ROknCHSpeETuUkCZ3K/1SsUYo1SrFGuXiZypuScJKETuUJlZMk3JGEO1SeKNYoxRqlWKNcfFgS7lB5UxJOVLokdCqdSpeEE5VvKtYoxRqlWKNcDJOEO5JwkoQTlZMkdCqfVKxRijVKsUa5GE7lJAmdSpeEJ1S+qVijFGuUYo1y8WEqn6TSJaFLwh1JeCIJncpJEjqVJ4o1SrFGKdYoFy9LwjcloVPpktCpdEnoVE6ScKLSJaFT6VTeVKxRijVKsUaJP1hjFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUa5R8Q8ArxsQdDhQAAAABJRU5ErkJggg==',
        '2024-11-27 04:56:33.475992'
    ),
    (
        'MG0303',
        'Safidy',
        'Julia',
        'Accueil',
        '0384518965',
        'safidyjulia@gmail.com',
        '$2b$10$viZDQthypzlcANGe542rBeYsGYLRG7MSWYvlbZgSAkvoLM71.O2P6',
        'f',
        't',
        'f',
        35,
        'uploads\\pic-1732683456622-511623776.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALFSURBVO3BQY7cQAwEwSxC//9yeo88NSBIs/bQjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEk/CaVO5JwonKShN+k8kSxRinWKMUa5eJlKm9KwkkSTlS6JHRJ6FROVN6UhDcVa5RijVKsUS4+LAl3qNyhcpKET0rCHSqfVKxRijVKsUa5+M+odEmYpFijFGuUYo1y8eWS0Kn8z4o1SrFGKdYoFx+m8kkqf5PKv6RYoxRrlGKNcvGyJPymJHQqn5SEf1mxRinWKMUaJf7gP5KEE5VvVqxRijVKsUa5eCgJnUqXhE6lS0Kn0iWhUzlJwh0qTyShUzlJQqfypmKNUqxRijXKxUMqT6h0SehUTpLQqXRJ6FTuSEKn0ql0SehUTpLQqTxRrFGKNUqxRok/eFESTlTuSEKncpKETuUkCZ3KHUnoVLoknKi8qVijFGuUYo0Sf/AXJaFTOUnCiUqXhE7ljiR0KidJ6FS6JJyoPFGsUYo1SrFGuXgoCU+onCThCZWTJHQqdyShU+mScKLypmKNUqxRijVK/MEXS8KJSpeETqVLQqfSJaFTeSIJncoTxRqlWKMUa5SLh5Lwm1Q6lS4JXRKeSMI3KdYoxRqlWKNcvEzlTUn4pCScqHRJ6JJwovKbijVKsUYp1igXH5aEO1TuSEKn0iXhRKVLQpeEE5WTJHQqn1SsUYo1SrFGufhyKl0SOpU7VLok3JGETqVLQqfypmKNUqxRijXKxZdLwkkSOpUuCZ1Kp3KShE6lS0Kn0iWhU3miWKMUa5RijXLxYSqfpNIl4Q6VkyScqNyRhE8q1ijFGqVYo1y8LAm/KQlPJKFTOVHpktCpnKh0SXhTsUYp1ijFGiX+YI1RrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUP1C/FPxASC7bAAAAAElFTkSuQmCC',
        '2024-11-27 04:57:38.970008'
    ),
    (
        'MG4523',
        'Mirantsoa',
        'Nandrianina',
        'Chargé de clientèle',
        '0334758612',
        'mnandrianina@gmail.com',
        '$2b$10$9h55qXPqmhoPUdjbz7jDHODitzAtQJxK3SqmlQvB36fV/u/zXOWwa',
        'f',
        't',
        'f',
        20,
        'uploads\\pic-1732683648302-62725487.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALISURBVO3BQY7cQAwEwSxC//9yeo88NSBIM/bSjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKHUk4UTlJwjepPFGsUYo1SrFGuXiZypuScJKETuVEpUtCp3Ki8qYkvKlYoxRrlGKNcvFhSbhD5Q6VLgmdSpeENyXhDpVPKtYoxRqlWKNcDJeETqVLwiTFGqVYoxRrlItfLgmdSpeE/0mxRinWKMUa5eLDVD5J5W9S+ZcUa5RijVKsUS5eloRvSkKn8klJ+JcVa5RijVKsUeIPBknCEyq/WbFGKdYoxRrl4qEkdCpdEjqVLgmdSpeETuVEpUvCicoTSehUTpLQqbypWKMUa5RijRJ/8KIk3KHyRBI6lTcloVM5SUKn0iXhROWJYo1SrFGKNcrFy1S6JDyRhE7lTUnoVDqVkyScJOFE5U3FGqVYoxRrlPiDFyXhRKVLQqdykoRO5SQJncodSehUnkjCicoTxRqlWKMUa5SLl6l0SbgjCXck4UTlJAmdyh1JOFE5UXlTsUYp1ijFGuXiw1ROVJ5Iwh1J6FS6JHQqXRI6lS4JJypdEjqVJ4o1SrFGKdYoFw8l4ZtUOpWTJDyRhDtU/qZijVKsUYo1ysXLVN6UhCdUuiR0SThR6ZLQJeFE5ZuKNUqxRinWKBcfloQ7VO5IwonKiUqXhC4JJypdErokdCqfVKxRijVKsUa5+OVUuiScqJyodEm4Q+UkCZ3Km4o1SrFGKdYoF79cEk6S0Kl0SehUOpWTJJyodCpdEjqVJ4o1SrFGKdYoFx+m8kkqT6icJOFE5Y4kfFKxRinWKMUa5eJlSfimJJyonCShUzlR6ZLQqXRJ6FS6JLypWKMUa5RijRJ/sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKH+mQGffcqbL6AAAAAElFTkSuQmCC',
        '2024-11-27 05:00:49.480779'
    ),
    (
        'MG9966',
        'Nii',
        'Rakoto',
        'Stagiaire',
        '0345214896',
        'niirakoto@gmail.com',
        '$2b$10$kF9s7xFt1cZ/wYmbc/TRsOBmlSe6xDmaS775tYF8LRQDMjQAUmj4O',
        'f',
        't',
        'f',
        40,
        'uploads\\pic-1732683781867-173769634.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKySURBVO3BQY7cQAwEwUxC//9yeY88NSBIM7a5jDA/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4iGVb0rCHSp3JKFT+aYkPFGsUYo1SrFGuXhZEt6kcodKl4Q3JeFNKm8q1ijFGqVYo1x8mModSbhDpUvCHSpdEu5QuSMJn1SsUYo1SrFGufhlVLokTFKsUYo1SrFGufhlktCpdEn4nxVrlGKNUqxRLj4sCd+k0iWhU+mS8EQS/iXFGqVYoxRrlIuXqfxNSehUuiR0Kl0STlT+ZcUapVijFGsU84P/mModSZisWKMUa5RijWJ+8IBKl4RO5U1JuEPlJAknKm9KwicVa5RijVKsUcwPvkjlJAknKidJOFF5Igl3qHRJ6FS6JDxRrFGKNUqxRrl4SOUkCV0SOpUTlTtUTpLQqXRJ6FQ6lS4JnUqXhE7lk4o1SrFGKdYoFx+m8kQS7lDpktCpnKicJOEkCZ1Kl4RO5U3FGqVYoxRrlIsvS0KncqJykoQuCSdJ6FS6JJyodEnoVLokdCqfVKxRijVKsUa5eCgJTyThJAknKl0SfrNijVKsUYo1ivnBAyrflIQTlTuS0Kl0SThR6ZLQqXRJ+KRijVKsUYo1ysXLkvAmlROVLglPJOFE5UTlROUkCU8Ua5RijVKsUS4+TOWOJDyh0iWhU+mS0Kl0SeiS0Kl0SehUuiR8UrFGKdYoxRrlYpgk3KFyonKShE7lbyrWKMUapVijXPwySehUuiR0Kv+TYo1SrFGKNcrFhyXhk5JwonKHyhNJ6FROVLokPFGsUYo1SrFGuXiZyjepnCThRKVLwonKm5LwpmKNUqxRijWK+cEao1ijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKH8AOL8F/Jf5lPgAAAAASUVORK5CYII=',
        '2024-11-27 05:03:02.548350'
    ),
    (
        'MG3525',
        'Zo',
        'Harijao',
        'Secretariat',
        '0324578963',
        'zoharijao@gmail.com',
        '$2b$10$y9hEyClJAjmUz3UjPso6TOQIBBfm2iHR6Uo8NbjVPbAgSNMdVfTm6',
        'f',
        't',
        'f',
        11,
        'uploads\\pic-1732683863935-735985396.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKoSURBVO3BQQ7bWAwFwX6E7n/lHi+5+oAg2ZMwrIofrDGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1y8VASfknljiTcodIl4ZdUnijWKMUapVijXLxM5U1JuCMJ36TypiS8qVijFGuUYo1y8WVJuEPljiR0Knck4Ykk3KHyTcUapVijFGuUi2GS0KmcqExSrFGKNUqxRrn4xyWhU/mbFWuUYo1SrFEuvkzll1S6JJyoPKHyJynWKMUapVijXLwsCX8ylS4JncpJEv5kxRqlWKMUa5T4wV8sCZ3Kv6xYoxRrlGKNcvFQEjqVLglvUulUTpJwonKShDepfFOxRinWKMUa5eIhlTtUnkhCp/JEEu5QuSMJJ0noVJ4o1ijFGqVYo8QPXpSETqVLQqdykoRO5U1J6FS6JJyodEl4QuWJYo1SrFGKNcrFj6mcJKFT6ZLQqZwk4Y4knKicqHRJ6FS6JLypWKMUa5RijRI/+KIk3KHSJeFNKl0SOpWTJHQqXRKeUHmiWKMUa5RijXLxZSpPqJwkoVPpkvBLKidJ+KZijVKsUYo1SvzggST8ksoTSehUuiR0KidJ6FS6JHQq31SsUYo1SrFGuXiZypuScJKEO1ROVE6S8EQSTlSeKNYoxRqlWKNcfFkS7lB5k0qXhE6lS0Kn0ql0SeiScKLyTcUapVijFGuUi2FU7kjCSRJOVLok/J+KNUqxRinWKBfDJOFEpUtCp9Il4QmVXyrWKMUapVijXHyZyjepdEk4ScJJEn4pCZ3KE8UapVijFGuUi5cl4ZeS0Kl0SehUuiR0KidJOFHpktCpdCpvKtYoxRqlWKPED9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFG+Q+SmQLzDAQ0hgAAAABJRU5ErkJggg==',
        '2024-11-27 05:04:25.142124'
    ),
    (
        'MG6789',
        'Sombiniaina',
        'Koloina',
        'Caissier',
        '0357896541',
        'sombikool@gmail.com',
        '$2b$10$CfAkXrI7dZ5t7oQ54YLKVeDEOGQs7W8NZqlJdwb20f08APlbseJsG',
        'f',
        't',
        'f',
        40,
        'uploads\\pic-1732684011926-495015494.jpeg',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKhSURBVO3BQW7sWAwEwSxC979yjpdcPUCQuu3PYUT8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw8l4ZtUTpJwotIloVPpkvBNKk8Ua5RijVKsUS5epvKmJNyh0iXhROUOlTcl4U3FGqVYoxRrlIsPS8IdKnck4UTlJAmdyh1JuEPlk4o1SrFGKdYoF8MloVOZrFijFGuUYo1SrFGKNUqxRinWKBcfpvJNKl0SuiR0Kk+o/CXFGqVYoxRrlIuXJeEvU+mS0KmcJOEvK9YoxRqlWKNcPKTyL1M5UfmXFGuUYo1SrFEuHkpCp9Il4U0qnUqXhE6lS0KncpKEN6l8UrFGKdYoxRrl4pepPJGETqVLwkkS7lC5IwknSehUnijWKMUapVijxB+8KAmdyh1J+CSVLgmdSpeEE5U7knCi8kSxRinWKMUa5eLDknCi0qmcJKFT6ZLQqXRJOEnCicodSehUuiS8qVijFGuUYo1y8cuScIfKEypdEjqVkyR0KicqXRI+qVijFGuUYo1y8TKVb0rCSRI6lcmKNUqxRinWKPEHDyThm1SeSEKn0iWhUzlJQqfym4o1SrFGKdYoFy9TeVMSTpJwh8qJykkSTpLwhMoTxRqlWKMUa5SLD0vCHSpPqJwkoVPpktCpdCpdEu5Q+aRijVKsUYo1ysX/XBJOknCi0iWhU/mmYo1SrFGKNcrFcEnoVLokdCpdEu5Q6ZLQqXxSsUYp1ijFGuXiw1Q+SeVEpUvCSRKeSMIdSehUnijWKMUapVijXLwsCd+UhDtUuiR0KidJOFHpknCi8qZijVKsUYo1SvzBGqNYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ij/AQNZ+uo/j03AAAAAAElFTkSuQmCC',
        '2024-11-27 05:06:52.977194'
    );

-- DONNEES POINTAGES   
INSERT INTO
    pointages (
        "etudiantIm",
        "heureEntree",
        "heureSortie",
        "dateDuJour"
    )
VALUES
    ('MG4612', '08:46:00', '16:53:00', '2024-11-04'),
    ('MG1256', '08:24:00', '16:04:00', '2024-11-04'),
    ('MG6789', '08:42:00', '17:01:00', '2024-11-04'),
    ('MG3525', '08:53:00', '16:42:00', '2024-11-05'),
    ('MG4612', '08:52:00', '17:35:00', '2024-11-05'),
    ('MG6789', '09:26:00', '17:44:00', '2024-11-05'),
    ('MG1256', '09:28:00', '16:30:00', '2024-11-05'),
    ('LEFORT', '09:33:00', '17:19:00', '2024-11-05'),
    ('MG0303', '09:54:00', '17:58:00', '2024-11-05'),
    ('MG9966', '09:51:00', '16:26:00', '2024-11-05'),
    ('LEFORT', '08:23:00', '17:33:00', '2024-11-06'),
    ('MG3525', '08:36:00', '16:37:00', '2024-11-06'),
    ('MALALA', '08:24:00', '17:06:00', '2024-11-06'),
    ('MG4523', '08:20:00', '17:28:00', '2024-11-06'),
    ('MG0303', '09:22:00', '17:08:00', '2024-11-06'),
    ('MG3214', '09:15:00', '17:46:00', '2024-11-06'),
    ('MG9966', '08:08:00', '17:23:00', '2024-11-06'),
    ('MG4612', '09:13:00', '17:39:00', '2024-11-06'),
    ('MG1256', '09:00:00', '16:44:00', '2024-11-06'),
    ('MG6789', '08:35:00', '16:15:00', '2024-11-06'),
    ('MG6789', '08:23:00', '17:30:00', '2024-11-07'),
    ('MG9966', '08:00:00', '17:42:00', '2024-11-07'),
    ('MG1256', '09:51:00', '16:14:00', '2024-11-08'),
    ('MG3214', '08:55:00', '17:42:00', '2024-11-08'),
    ('MG0303', '09:55:00', '17:17:00', '2024-11-08'),
    ('MG4612', '09:12:00', '16:08:00', '2024-11-08'),
    ('MALALA', '09:51:00', '17:40:00', '2024-11-08'),
    ('MG6789', '08:31:00', '17:13:00', '2024-11-08'),
    ('MG4612', '08:43:00', '16:51:00', '2024-11-11'),
    ('MG4523', '09:56:00', '16:40:00', '2024-11-11'),
    ('MG9966', '09:30:00', '17:52:00', '2024-11-11'),
    ('MG1256', '09:06:00', '17:07:00', '2024-11-11'),
    ('MG0303', '09:59:00', '17:27:00', '2024-11-11'),
    ('MG6789', '08:13:00', '16:05:00', '2024-11-11'),
    ('MG3525', '09:52:00', '17:43:00', '2024-11-12'),
    ('MALALA', '09:23:00', '16:41:00', '2024-11-12'),
    ('MG3214', '09:39:00', '16:38:00', '2024-11-12'),
    ('LEFORT', '09:41:00', '17:10:00', '2024-11-12'),
    ('MG6789', '09:47:00', '16:42:00', '2024-11-12'),
    ('MG4612', '08:04:00', '17:56:00', '2024-11-12'),
    ('MG9966', '09:15:00', '16:02:00', '2024-11-12'),
    ('MG0303', '08:53:00', '16:00:00', '2024-11-12'),
    ('MG1256', '09:33:00', '17:34:00', '2024-11-12'),
    ('MG0303', '09:47:00', '17:15:00', '2024-11-13'),
    ('LEFORT', '09:05:00', '17:06:00', '2024-11-13'),
    ('MG4523', '09:53:00', '17:41:00', '2024-11-13'),
    ('MG3214', '08:23:00', '16:52:00', '2024-11-13'),
    ('MG4523', '09:17:00', '17:29:00', '2024-11-14'),
    ('MG4612', '09:54:00', '17:20:00', '2024-11-14'),
    ('MALALA', '09:35:00', '16:52:00', '2024-11-14'),
    ('MG1256', '09:37:00', '16:43:00', '2024-11-14'),
    ('MG6789', '09:49:00', '17:44:00', '2024-11-15'),
    ('LEFORT', '09:02:00', '17:17:00', '2024-11-18'),
    ('MG4523', '08:37:00', '16:57:00', '2024-11-18'),
    ('MG6789', '08:02:00', '17:36:00', '2024-11-18'),
    ('MG3525', '09:03:00', '17:38:00', '2024-11-18'),
    ('MG0303', '09:23:00', '16:42:00', '2024-11-18'),
    ('MG9966', '08:20:00', '17:12:00', '2024-11-18'),
    ('MG3214', '09:41:00', '16:08:00', '2024-11-18'),
    ('MG1256', '09:41:00', '17:56:00', '2024-11-19'),
    ('MALALA', '09:04:00', '16:06:00', '2024-11-19'),
    ('MG0303', '09:39:00', '17:43:00', '2024-11-19'),
    ('MG9966', '09:45:00', '17:24:00', '2024-11-19'),
    ('MG4612', '08:38:00', '16:14:00', '2024-11-19'),
    ('MG4523', '09:21:00', '16:36:00', '2024-11-19'),
    ('MG0303', '08:55:00', '16:26:00', '2024-11-20'),
    ('MG4612', '08:24:00', '17:02:00', '2024-11-20'),
    ('MG3214', '09:59:00', '17:58:00', '2024-11-20'),
    ('MG1256', '09:35:00', '17:32:00', '2024-11-20'),
    ('MG6789', '09:49:00', '16:28:00', '2024-11-20'),
    ('LEFORT', '08:00:00', '17:21:00', '2024-11-20'),
    ('MG4523', '08:57:00', '16:39:00', '2024-11-20'),
    ('MG9966', '09:04:00', '16:14:00', '2024-11-20'),
    ('MG3525', '08:28:00', '17:04:00', '2024-11-20'),
    ('MG1256', '08:11:00', '16:35:00', '2024-11-21'),
    ('MG9966', '09:33:00', '17:15:00', '2024-11-21'),
    ('LEFORT', '08:35:00', '17:36:00', '2024-11-21'),
    ('MG3214', '08:02:00', '17:58:00', '2024-11-21'),
    ('MG0303', '08:14:00', '17:59:00', '2024-11-21'),
    ('MG3525', '08:02:00', '16:17:00', '2024-11-21'),
    ('MG6789', '09:55:00', '17:23:00', '2024-11-21'),
    ('MG4523', '09:47:00', '16:10:00', '2024-11-21'),
    ('MALALA', '09:40:00', '17:18:00', '2024-11-21'),
    ('MG4612', '09:39:00', '16:42:00', '2024-11-21'),
    ('MG1256', '09:02:00', '17:56:00', '2024-11-22'),
    ('MG6789', '09:53:00', '17:39:00', '2024-11-22'),
    ('MG4523', '09:22:00', '17:28:00', '2024-11-22'),
    ('LEFORT', '09:01:00', '17:55:00', '2024-11-22'),
    ('MG3214', '08:29:00', '17:55:00', '2024-11-22'),
    ('MG0303', '08:23:00', '16:46:00', '2024-11-22'),
    ('MG4612', '08:13:00', '17:54:00', '2024-11-22'),
    ('MALALA', '08:15:00', '16:33:00', '2024-11-25'),
    ('MG4612', '09:30:00', '17:27:00', '2024-11-25'),
    ('MG0303', '09:06:00', '17:56:00', '2024-11-25'),
    ('MG3214', '09:04:00', '17:21:00', '2024-11-25'),
    ('LEFORT', '09:57:00', '17:26:00', '2024-11-25'),
    ('MG6789', '09:05:00', '16:40:00', '2024-11-25'),
    ('MG1256', '09:39:00', '17:51:00', '2024-11-26'),
    ('MG9966', '08:07:00', '17:33:00', '2024-11-26'),
    ('MG0303', '09:12:00', '17:36:00', '2024-11-26'),
    ('MG4612', '09:01:00', '17:39:00', '2024-11-26'),
    ('MALALA', '09:55:00', '16:28:00', '2024-11-26'),
    ('MG3214', '09:02:00', '17:12:00', '2024-11-26'),
    ('MG3525', '09:13:00', '16:06:00', '2024-11-26'),
    ('LEFORT', '09:40:00', '17:24:00', '2024-11-26'),
    ('MG6789', '08:41:00', '17:49:00', '2024-11-26'),
    ('MALALA', '09:36:00', '16:07:00', '2024-11-27'),
    ('MG4612', '09:45:00', '17:19:00', '2024-11-27'),
    ('LEFORT', '08:52:00', '17:31:00', '2024-11-27'),
    ('MG1256', '09:16:00', '16:10:00', '2024-11-27'),
    ('MG3525', '08:59:00', '17:17:00', '2024-11-27'),
    ('MG9966', '08:05:00', '16:35:00', '2024-11-28'),
    ('MALALA', '08:49:00', '17:05:00', '2024-11-28'),
    ('MG0303', '09:46:00', '17:24:00', '2024-11-28'),
    ('MG4612', '09:06:00', '16:21:00', '2024-11-28'),
    ('MG3525', '08:42:00', '17:03:00', '2024-11-28'),
    ('MG9966', '08:48:00', '16:42:00', '2024-11-29'),
    ('MG4612', '09:37:00', '16:18:00', '2024-11-29'),
    ('MG6789', '08:18:00', '16:03:00', '2024-11-29'),
    ('MG3525', '09:36:00', '17:23:00', '2024-11-29'),
    ('MG1256', '09:07:00', '17:25:00', '2024-11-29'),
    ('LEFORT', '08:28:00', '17:57:00', '2024-11-29'),
    ('MALALA', '08:06:00', '17:28:00', '2024-11-29'),
    ('MG0303', '09:28:00', '16:56:00', '2024-11-29'),
    ('MG4523', '09:10:00', '16:55:00', '2024-11-29'),
    ('MG3214', '09:13:00', '17:01:00', '2024-11-29');

-- Insertion conges
INSERT INTO
    conges (
        id,
        "cIm",
        motif,
        "dateDeDebut",
        "dateDeFin",
        "nbJourC",
        "reqConge",
        "etatReqConge"
    )
VALUES
    (
        1,
        'LEFORT',
        'Convalescence',
        '2024-10-10',
        '2024-10-22',
        12,
        true,
        false
    ),
    (
        2,
        'MALALA',
        'Convalescence',
        '2024-10-11',
        '2024-10-20',
        3,
        true,
        true
    ),
    (
        4,
        'MG3525',
        'Repos après un projet intensif',
        '2024-08-13',
        '2024-09-12',
        29,
        true,
        false
    ),
    (
        5,
        'MG0303',
        'Visite à la famille éloignée',
        '2024-09-17',
        '2024-09-22',
        5,
        true,
        true
    ),
    (
        6,
        'MG4523',
        'Convalescence',
        '2024-10-14',
        '2024-10-21',
        20,
        true,
        true
    );

-- Set the starting value of the sequence to 7
SELECT
    setval(pg_get_serial_sequence('conges', 'id'), 6);

-- Set the starting value of the sequence to 128
SELECT
    setval(pg_get_serial_sequence('pointages', 'id'), 127);
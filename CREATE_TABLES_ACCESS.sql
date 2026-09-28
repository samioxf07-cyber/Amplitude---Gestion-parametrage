-- ========================================
-- CRÉATION DES TABLES POUR GESTION DU TEMPS
-- Base de données MS Access
-- ========================================

-- Table des employés
CREATE TABLE T_Employes (
    ID_Employe COUNTER PRIMARY KEY,
    NomPrenom TEXT(100) NOT NULL,
    DateNaissance DATETIME,
    LieuNaissance TEXT(100),
    CIN TEXT(20) NOT NULL UNIQUE,
    Adresse TEXT(255),
    Telephone TEXT(20),
    Email TEXT(100),
    Nationalite TEXT(50),
    SituationFamiliale TEXT(20),
    NbEnfants INTEGER,
    CNSS TEXT(20),
    CIMR TEXT(20),
    Mutuelle TEXT(20),
    RIB TEXT(50),
    DateCreation DATETIME DEFAULT NOW()
);

-- Table des postes
CREATE TABLE T_Postes (
    ID_Poste COUNTER PRIMARY KEY,
    IntitulePoste TEXT(100) NOT NULL,
    DateEmbauche DATETIME,
    DateDepart DATETIME,
    TypeContrat TEXT(20),
    SalaireBase CURRENCY,
    Indemnites CURRENCY,
    AvantagesNature CURRENCY,
    Autres CURRENCY,
    TotalBrut CURRENCY,
    NetAPayer CURRENCY,
    ModePaiement TEXT(20),
    Banque TEXT(50),
    Agence TEXT(50),
    ID_Employe INTEGER,
    FOREIGN KEY (ID_Employe) REFERENCES T_Employes(ID_Employe)
);

-- Table de localisation
CREATE TABLE T_Localisation (
    ID_Localisation COUNTER PRIMARY KEY,
    Ville TEXT(50),
    Direction TEXT(100),
    Service TEXT(100),
    SpecialiteMetier TEXT(100),
    CycleTravail TEXT(20),
    ID_Poste INTEGER,
    FOREIGN KEY (ID_Poste) REFERENCES T_Postes(ID_Poste)
);

-- Table de couverture médicale
CREATE TABLE T_CouvertureMedicale (
    ID_Couverture COUNTER PRIMARY KEY,
    PriseChargeMaladie YESNO,
    PriseChargeMaternite YESNO,
    PriseChargeAccidentTravail YESNO,
    PriseChargeMaladieProfessionnelle YESNO,
    PriseChargeVisiteMedicale YESNO,
    PriseChargeControleMedical YESNO,
    DateDerniereVisite DATETIME,
    DateProchaineVisite DATETIME,
    ID_Employe INTEGER,
    FOREIGN KEY (ID_Employe) REFERENCES T_Employes(ID_Employe)
);

-- Table de gestion du temps
CREATE TABLE T_Temps (
    ID_Temps COUNTER PRIMARY KEY,
    Mois TEXT(20),
    Semaine INTEGER,
    DateDebut DATETIME,
    DateFin DATETIME,
    Duree TEXT(50),
    Observation1 MEMO,
    Observation2 MEMO,
    Observation3 MEMO,
    Observation4 MEMO,
    ID_Employe INTEGER,
    DateCreation DATETIME DEFAULT NOW(),
    FOREIGN KEY (ID_Employe) REFERENCES T_Employes(ID_Employe)
);

-- ========================================
-- CRÉATION DES INDEX POUR OPTIMISATION
-- ========================================

CREATE INDEX IDX_Employes_CIN ON T_Employes(CIN);
CREATE INDEX IDX_Employes_NomPrenom ON T_Employes(NomPrenom);
CREATE INDEX IDX_Postes_ID_Employe ON T_Postes(ID_Employe);
CREATE INDEX IDX_Postes_IntitulePoste ON T_Postes(IntitulePoste);
CREATE INDEX IDX_Localisation_ID_Poste ON T_Localisation(ID_Poste);
CREATE INDEX IDX_Couverture_ID_Employe ON T_CouvertureMedicale(ID_Employe);
CREATE INDEX IDX_Temps_ID_Employe ON T_Temps(ID_Employe);
CREATE INDEX IDX_Temps_Mois ON T_Temps(Mois);
CREATE INDEX IDX_Temps_Semaine ON T_Temps(Semaine);

-- ========================================
-- INSERTION DE DONNÉES DE TEST
-- ========================================

-- Insertion d'un employé de test
INSERT INTO T_Employes (NomPrenom, DateNaissance, LieuNaissance, CIN, Adresse, Telephone, Email, Nationalite, SituationFamiliale, NbEnfants, CNSS, CIMR, Mutuelle, RIB)
VALUES ('DUPONT Jean', '1985-03-15', 'Casablanca', 'AB123456', '123 Rue Hassan, Rabat', '0612345678', 'jean.dupont@email.com', 'Marocaine', 'Marié', 2, 'CNSS123', 'CIMR456', 'MUT789', 'RIB001234567');

-- Insertion du poste associé
INSERT INTO T_Postes (IntitulePoste, DateEmbauche, TypeContrat, SalaireBase, Indemnites, AvantagesNature, Autres, ModePaiement, Banque, Agence, ID_Employe)
VALUES ('Développeur Senior', '2020-01-15', 'CDI', 15000, 2000, 1000, 500, 'Virement', 'BMCE', 'Agence Centre', 1);

-- Insertion de la localisation
INSERT INTO T_Localisation (Ville, Direction, Service, SpecialiteMetier, CycleTravail, ID_Poste)
VALUES ('Rabat', 'Direction Informatique', 'Service Développement', 'Développement Web', '8h-18h', 1);

-- Insertion de la couverture médicale
INSERT INTO T_CouvertureMedicale (PriseChargeMaladie, PriseChargeMaternite, PriseChargeAccidentTravail, PriseChargeMaladieProfessionnelle, PriseChargeVisiteMedicale, PriseChargeControleMedical, DateDerniereVisite, DateProchaineVisite, ID_Employe)
VALUES (True, True, True, True, True, True, '2024-01-15', '2025-01-15', 1);

-- Insertion des données de temps
INSERT INTO T_Temps (Mois, Semaine, DateDebut, DateFin, Duree, Observation1, Observation2, ID_Employe)
VALUES ('Janvier 2024', 3, '2024-01-15', '2024-01-19', '5 jours', 'Semaine productive', 'Projet terminé', 1);

-- ========================================
-- CRÉATION DES VUES (REQUÊTES)
-- ========================================

-- Vue complète des données
CREATE VIEW V_TempsComplet AS
SELECT 
    T_Temps.ID_Temps,
    T_Temps.Mois,
    T_Temps.Semaine,
    T_Temps.DateDebut,
    T_Temps.DateFin,
    T_Temps.Duree,
    T_Temps.Observation1,
    T_Temps.Observation2,
    T_Temps.Observation3,
    T_Temps.Observation4,
    T_Employes.NomPrenom,
    T_Employes.DateNaissance,
    T_Employes.LieuNaissance,
    T_Employes.CIN,
    T_Employes.Adresse,
    T_Employes.Telephone,
    T_Employes.Email,
    T_Employes.Nationalite,
    T_Employes.SituationFamiliale,
    T_Employes.NbEnfants,
    T_Employes.CNSS,
    T_Employes.CIMR,
    T_Employes.Mutuelle,
    T_Employes.RIB,
    T_Postes.IntitulePoste,
    T_Postes.DateEmbauche,
    T_Postes.DateDepart,
    T_Postes.TypeContrat,
    T_Postes.SalaireBase,
    T_Postes.Indemnites,
    T_Postes.AvantagesNature,
    T_Postes.Autres,
    T_Postes.TotalBrut,
    T_Postes.NetAPayer,
    T_Postes.ModePaiement,
    T_Postes.Banque,
    T_Postes.Agence,
    T_Localisation.Ville,
    T_Localisation.Direction,
    T_Localisation.Service,
    T_Localisation.SpecialiteMetier,
    T_Localisation.CycleTravail,
    T_CouvertureMedicale.PriseChargeMaladie,
    T_CouvertureMedicale.PriseChargeMaternite,
    T_CouvertureMedicale.PriseChargeAccidentTravail,
    T_CouvertureMedicale.PriseChargeMaladieProfessionnelle,
    T_CouvertureMedicale.PriseChargeVisiteMedicale,
    T_CouvertureMedicale.PriseChargeControleMedical,
    T_CouvertureMedicale.DateDerniereVisite,
    T_CouvertureMedicale.DateProchaineVisite
FROM ((T_Temps 
    INNER JOIN T_Employes ON T_Temps.ID_Employe = T_Employes.ID_Employe)
    INNER JOIN T_Postes ON T_Employes.ID_Employe = T_Postes.ID_Employe)
    INNER JOIN T_Localisation ON T_Postes.ID_Poste = T_Localisation.ID_Poste
    INNER JOIN T_CouvertureMedicale ON T_Employes.ID_Employe = T_CouvertureMedicale.ID_Employe;

-- Vue de résumé
CREATE VIEW V_SummaryTemps AS
SELECT 
    COUNT(*) AS TotalLignes,
    SUM(T_Postes.TotalBrut) AS TotalBrutCumule,
    SUM(T_Postes.NetAPayer) AS NetAPayerCumule,
    AVG(T_Postes.TotalBrut) AS MoyenneBrut,
    AVG(T_Postes.NetAPayer) AS MoyenneNet
FROM T_Temps
INNER JOIN T_Employes ON T_Temps.ID_Employe = T_Employes.ID_Employe
INNER JOIN T_Postes ON T_Employes.ID_Employe = T_Postes.ID_Employe;

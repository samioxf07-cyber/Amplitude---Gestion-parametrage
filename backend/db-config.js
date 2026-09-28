// Configuration de la connexion MS Access via ODBC
module.exports = {
    // Chaîne de connexion ODBC pour MS Access
    // Remplacez le chemin par le chemin absolu de votre fichier .accdb ou .mdb
    connectionString: 'Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:\\Users\\ssarhir\\CascadeProjects\\gestion-interim-v2\\CascadeProjects\\windsurf-project\\Amplitude - Gestion paramétrage.accdb;'
    
    // Alternative: Utiliser un DSN système configuré dans ODBC Data Source Administrator
    // dsn: 'gestion_interim_dsn',
    
    // Options de connexion
    connectionOptions: {
        connectionTimeout: 10,
        loginTimeout: 10
    }
};

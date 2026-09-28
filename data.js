// Données en cascade pour l'intranet
// Ce fichier contient toutes les données de régions, supervisions et agences
// Vous pouvez modifier ces données directement ici ou les importer depuis MS Access

// Configuration EmailJS (nécessaire pour intranet-formulaire.html)
const EMAIL_CONFIG = {
    SERVICE_ID: 'service_upuge9d',
    TEMPLATE_ID: 'template_upuge9d',
    PUBLIC_KEY: 'nheWjZ1-MBf7R-96SEY',
    RECIPIENT_EMAIL: 'TWGServiceParametrageMassarcom@Fbpmc.ma'
};

const CASCADE_DATA = {
    regions: [
        { id: 1, nom: 'Région Nord' },
        { id: 2, nom: 'Région Sud' },
        { id: 3, nom: 'Région Oriental' },
        { id: 4, nom: 'Région Casa Nord' },
        { id: 5, nom: 'Région Casa Centre' },
        { id: 6, nom: 'Région Doukkala abda'},
        { id: 7, nom: 'El haouz marrakech'},
        { id: 8, nom: 'Région CASA SUD'},
        { id: 9, nom: 'Tadla Ordigha'},
        { id: 10, nom: 'Fés Méknes'},
        { id: 11, nom: 'Rabat Zemour Zaer'},
        { id: 12, nom: 'Sale Gharb'}
    ],
    supervisions: {
        1: [
            { id: 1, nom: 'Supervision Tanger' },
            { id: 2, nom: 'Supervision Tétouan' },
            { id: 3, nom: 'Supervision Larache' },
            { id: 4, nom: 'Ouazzane'}
        ],
        2: [
            { id: 5, nom: 'Supervision Agadir' },
            { id: 6, nom: 'Supervision Sahara' },
            { id: 7, nom: 'Supervision Ouarzazate' },
            { id: 8, nom: 'Supervision tiznit'},
            { id: 9, nom: 'Supervision ait melloul'},
            { id: 10, nom: 'Supervision Taroudant'}
        ],
        3: [
            { id: 11, nom: 'Supervision Oujda' },
            { id: 12, nom: 'Supervision Nador' },
            { id: 13, nom: 'Supervision Taza'},
            { id: 14, nom: 'Ssupervision Berkane'}
        ],
        4: [
            { id: 15, nom: 'Supervision Zenata Bernoussi' },
            { id: 16, nom: 'Supervision Hay Mohammedi Sidi Moumen' },
            { id: 17, nom: 'Supervision Momamedia Benslimane'},
            { id: 18, nom: 'Supervision Ain Harrouda '}
        ],
        5: [
            { id: 19, nom: 'Supervision Fida Sidi Balyout' },
            { id: 20, nom: 'Supervision Ben Msik Sidi Othmane' },
            { id: 21, nom: 'Supervision Hay Mohamadi'}
        ],
        6: [
            { id: 22, nom: 'Supervision Safi' },
            { id: 23, nom: 'Supervision El Jadida' },
            { id: 24, nom: 'Supervision Sidi Bennour' }
        ],
        7: [
            { id: 25, nom: 'Supervision Marrakech Centre' },
            { id: 26, nom: 'Supervision Al Haouz' },
            { id: 27, nom: 'Supervision Chichaoua' }
        ],
        8: [
            { id: 28, nom: 'Supervision Ouarzazate' },
            { id: 29, nom: 'Supervision Zagora' },
            { id: 30, nom: 'Supervision Tinghir' }
        ],
        9: [
            { id: 31, nom: 'Supervision Beni Mellal' },
            { id: 32, nom: 'Supervision Azilal' },
            { id: 33, nom: 'Supervision Fquih Ben Salah' }
        ],
        10: [
            { id: 34, nom: 'Supervision Fès Ville' },
            { id: 35, nom: 'Supervision Meknès Ville' },
            { id: 36, nom: 'Supervision Sefrou' }
        ],
        11: [
            { id: 37, nom: 'Supervision Rabat Centre' },
            { id: 38, nom: 'Supervision Skhirat Temara' },
            { id: 39, nom: 'Supervision Khemisset' }
        ],
        12: [
            { id: 40, nom: 'Supervision Kénitra' },
            { id: 41, nom: 'Supervision Sidi Kaccem' },
            { id: 42, nom: 'Supervision Sidi Slimane' }
        ]
    },
    agences: {
        1: [
            { id: 1, nom: 'Agence Tanger Beni Makada' },
            { id: 2, nom: 'Agence Tanger Mghougha' },
            { id: 3, nom: 'Agence Tanger Aouama'},
            { id: 4, nom: 'Agence Tanger AIN KTIOUET'},
            { id: 5, nom: 'Agence EL alia'},
            { id: 6, nom: 'Agence Casa Barata'},
            { id: 7, nom: 'Agence Ben Diban'},
            { id: 8, nom: 'Agence Souani'}
        ],
        2: [
            { id: 9, nom: 'Agence Tétouan Hamama' },
            { id: 10, nom: 'Agence Tétouan Romana' },
            { id: 11, nom: 'Agence Tétouan Saniat Rmel'},
            { id: 12, nom: 'Agence Tétouan EL Mandri'}
        
        ],
        3: [
            { id: 13, nom: 'Agence larache El Menzeh' },
            { id: 14, nom: 'Agence Larach Lexus'},
            { id: 15, nom: 'Agence Aouamra'}
        ],
        4: [
            { id: 16, nom: 'Agence Agadir Centre' },
            { id: 17, nom: 'Agence Inezgane El Jihadia' },
            { id: 18, nom: 'Agence Tikiouine'},
            { id: 19, nom: 'Agence BenSergaou'}
        ],
        5: [
            { id: 8, nom: 'Agence Agadir Centre' },
            { id: 9, nom: 'Agence Inezgane El Jihadia' },
            { id: 10, nom: 'Agence Tikiouine' },
            { id: 11, nom: 'Agence Bensergaou'}
        ],
        6: [
            { id: 11, nom: 'Agence Laayoun Boukraa' },
            { id: 12, nom: 'Agence Smara' },
            { id: 13, nom: 'Agence Boujdour' }
        ],
        7: [
            { id: 14, nom: 'Agence Marrakech Centre' },
            { id: 15, nom: 'Agence Guéliz' },
            { id: 16, nom: 'Agence Chichaoua' }
        ],
        8: [
            { id: 17, nom: 'Agence Ouarzazate Centre' },
            { id: 18, nom: 'Agence Zagora' },
            { id: 19, nom: 'Agence Tinghir' }
        ],
        9: [
            { id: 20, nom: 'Agence Beni Mellal Centre' },
            { id: 21, nom: 'Agence Azilal' },
            { id: 22, nom: 'Agence Fquih Ben Salah' }
        ],
        10: [
            { id: 23, nom: 'Agence Fès Ville' },
            { id: 24, nom: 'Agence Meknès Ville' },
            { id: 25, nom: 'Agence Sefrou' }
        ],
        11: [
            { id: 26, nom: 'Agence Rabat Centre' },
            { id: 27, nom: 'Agence Skhirat' },
            { id: 28, nom: 'Agence Khemisset' }
        ],
        12: [
            { id: 29, nom: 'Agence Kénitra Centre' },
            { id: 30, nom: 'Agence Sidi Kaccem' },
            { id: 31, nom: 'Agence Sidi Slimane' }
        ]
    }
};

// Gestionnaires par défaut
const DEFAULT_GESTIONNAIRES = [
    'SARHIR SAMI',
    'EL FERDAOUS MARWA',
    'LAMHNNAD MADIHA',
    'AHMED MOHAMED',
    'FATIMA ZAHRA',
    'ABDELKARIM HASSAN',
    'NADIA BENALI',
    'KARIM TAZI'
];

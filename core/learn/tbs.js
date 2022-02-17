module.exports = {
    clients:[
        '_clients'
        ,[
            ["id","INT",["NOT NULL","AUTO_INCREMENT"]]
            ,["nom","TEXT",["NOT NULL"]]
            ,["prenom","TEXT",["NOT NULL"]]
            ,["username","TEXT",["NOT NULL"]]
            ,["adresse","TEXT",["NOT NULL"]]
            ,["telephone","TEXT",["NOT NULL"]]
            ,["mail","TEXT",["NOT NULL"]]
            ,["password","TEXT"]
        ],[
            'id',[]
        ]
    ],admins:[
        '_admins'
        ,[
            ["id","INT",["NOT NULL","AUTO_INCREMENT"]]
            ,["nom","TEXT",["NOT NULL"]]
            ,["prenom","TEXT",["NOT NULL"]]
            ,["username","TEXT",["NOT NULL"]]
            ,["adresse","TEXT",["NOT NULL"]]
            ,["telephone","TEXT",["NOT NULL"]]
            ,["mail","TEXT",["NOT NULL"]]
            ,["password","TEXT",["NOT NULL"]]
        ]
        ,[
            'id',[]
        ]
    ],commandes:[
        '_commandes'
        ,[
            ["id","INT",["NOT NULL","AUTO_INCREMENT"]]
            ,["userid","INT",["NOT NULL"]]
            ,["date","DATETIME",["DEFAULT NOW()"]]
        ]
        ,[
            'id',[]
        ]
    ],articles_commandes:[
        '_articles_commandes'
        ,[
            ["id","INT",["NOT NULL","AUTO_INCREMENT"]]
            ,["articleid","INT",["NOT NULL"]]
            ,["commandeid","INT",["NOT NULL"]]
            ,["quantite","INT",["DEFAULT 1"]]
        ]
        ,[
            'id',[]
        ]
    ],articles:[
        '_articles'
        ,[
            ["id","INT",["NOT NULL","AUTO_INCREMENT"]]
            ,["nom","TEXT",["NOT NULL"]]
            ,["prix","INT",["NOT NULL"]]
        ]
        ,[
            'id',[]
        ]
    ],categories:[
        '_categories'
        ,[
            ["id","INT",["NOT NULL","AUTO_INCREMENT"]]
            ,["nom","TEXT",["NOT NULL"]]
        ]
        ,[
            'id',[]
        ]
    ],articles_categories:[
        '_articles_categories'
        ,[
            ["id","INT",["NOT NULL","AUTO_INCREMENT"]]
            ,["articleid","INT",["NOT NULL"]]
            ,["categorieid","INT",["NOT NULL"]]
        ]
        ,[
            'id',[]
        ]
    ]
}

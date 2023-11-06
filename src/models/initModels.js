const Users = require('./users.models');
const Categories = require('./categories.models');
const Posts = require('./posts.models');

const initModels = () => {

/*      -> model-1 puede tener un model-2
        has -> model-1.hasOne(model-2) -> model-2 tiene la llave foranea

                -> 1 model-2 pertenece a 1 model-1
        belongs -> model-2.belongsTo(model-1)      -> model-2 tiene la llave foránea
*/

    //* 2 Relaciones 1 a muchos
    //? foreignkey = posts
    //? 1 post -> 1 category -> 1 publicación pertenece a 1 categoria
    Posts.belongsTo(Categories);
    //? 1 category -> Many posts -> 1 categoria tiene muchas publicaciones
    Categories.hasMany(Posts);

    //? foreignkey = posts
    //? Many post -> 1 User -> Muchas publicacioes pertenecen a 1 usuario.
    Posts.belongsTo(Users);
    //? 1 user -> Many post -> 1 Usuario tiene muchas relaciones
    Users.hasMany(Posts);

    // Users - Conversations
    //? FK = Conversations
    //? 1 user -> hasMany conversations -> 1 user tiene MUCHAS conversations
    Users.hasMany(Conversations)
    //? 1 conversation -> 1 User        -> 1 conversation pertenece a 1 user
    Conversations.belongsTo(Users)

    // Users - Messages
    //? FK = Messages
    //? 1 user -> hasMany messages  -> 1 user tiene MUCHOS messages
    Users.hasMany(Messages)
    //? 1 message -> 1 user         -> 1 message petenece a 1 user
    Messages.belongsTo(Users)

    // Users - participants -> tabla pibote entre users - conversations
    //? FK = Participants
    //? 1 user -> hasMany participaciones       -> 1 conversation tiene MUCHAS participaciones
    Users.hasMany(Participants)
    //? 1 participancion -> 1 conversation      -> 1 participación pertenece a 1 conversación
    Participants.belongsTo(Users)

    // Conversations - participants
    //? FK = Participants
    //? 1 conversation -> hasMany participaciones  -> 1 conversation tiene MUCHOS participaciones
    Conversations.hasMany(Participants)
    //? 1 participante -> 1 conversation        -> 1 participacion pertenece a 1 conversation
    Participants.belongsTo(Conversations)

    //Conversations - messages -> tabla pibote entre users - conversations
    //? FK = Messages
    //? 1 conversation -> hasMany messages  -> 1 conversation tiene MUCHOS messages
    Conversations.hasMany(Messages)
    //? 1 messages -> 1 conversation        -> 1 mensaje pertenece a 1 conversation
    Messages.belongsTo(Conversations)

}

module.exports = initModels;

/*
?    1:1
        * belongsTo
        * hasOne

?    1:M
        * belongsTo
        * hasMany

?    M:M
        * Se recomienda: Para cuando NO querramos mostrar datos de la tabla pibote
        * belongsToMany
        * hasMany

        ?- 2 relaciones 1:M
        * Se recomienda: Para cuando SI querramos mostrar los datos de una tabla pibote
        * belongsTo
        * hasMany

*/

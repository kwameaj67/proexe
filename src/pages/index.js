import React from 'react';
const HomePage = React.lazy( ()=> import ('./Homepage/Home'))
const EditUserPage = React.lazy( ()=> import ('./EditPage/Edit'))
const CreateUserPage = React.lazy( ()=> import ('./NewUserPage/NewUser'))

export {
    HomePage,
    EditUserPage,
    CreateUserPage
}
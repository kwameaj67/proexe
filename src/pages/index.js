import React from 'react';
const HomePage = React.lazy( ()=> import ('./Homepage/Home'))
const EditPage = React.lazy( ()=> import ('./EditPage/Edit'))

export {
    HomePage,
    EditPage
}
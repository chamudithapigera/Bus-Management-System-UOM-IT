import React from "react";
import * as icons from 'react-icons/ai';

export const sideBarData =[
    {
        tab_name:'Home',
        redirect_path:'/',
        icon : <icons.AiFillHome/>,
        cName : 'nav-text'
    },{
        tab_name:'Aboutus',
        redirect_path:'/Aboutus',
        icon : <icons.AiFillAliwangwang/>,
        cName : 'nav-text'
    }
]
export default sideBarData;

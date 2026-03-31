
import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const AIAgent = () =>{
     const {backendUrl, token} = useContext(ShopContext) ;
    const [input, setInput] = useState("") ;
    const [message, setMessages] = useState({role:'bot', text:'Hi! I noticed you like our collection. How can I help you today'}) ;

   
    const handleSend = async() =>{

        const userMsg = {role: 'user', text: input} ;
        setMessages(prev => [...prev, userMsg]) ;
        setInput("") ;

    }
}
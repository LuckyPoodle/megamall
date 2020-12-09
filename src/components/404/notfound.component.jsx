import React from 'react';
import {ErrorImageOverlay,ErrorImageText,ErrorImageContainer} from './notfound.styles';
const NotFound =({msg})=>{

    return(
        <ErrorImageOverlay>
                <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png'/>
                <ErrorImageText>{msg}</ErrorImageText>
            </ErrorImageOverlay>
    )
    
}

export default NotFound;
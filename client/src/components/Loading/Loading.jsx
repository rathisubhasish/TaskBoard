import React from 'react';
import ReactLoading from 'react-loading';
import "./Loading.css";

const Loading = ({loadType}) => {
  return (
    <>  
        <div className={
          `${
            loadType === 'screenLoad' 
            ? 
            'screenLoading' 
            : 
            (
              loadType === 'pageLoad' 
              ? 
              'loading-container pageLoad' 
              : 
              (
                loadType === 'blankLoad'
                ?
                'blankLoading'
                :
                (
                  loadType === 'dataLoad'
                  ?
                  'loading-container dataLoad'
                  :
                  '' 
                )  
              )
               
            )
            }`
        }>
        <ReactLoading 
            type={
                loadType === 'screenLoad' 
                ? 
                'spokes' 
                : 
                (
                  loadType === 'pageLoad'
                  ? 
                  'spinningBubbles' 
                  : 
                  (
                    loadType === 'blankLoad'
                    ?
                    ''
                    :
                    (
                      loadType === 'dataLoad'
                      ?
                      'bars'
                      :
                      ''
                    )
                  )
                )
            }
            
            color={loadType === 'screenLoad' ? '#301934' : '#696969'}
            
            width={loadType === 'screenLoad' ? '45px' : '40px'}
            
            height={loadType === 'screenLoad' ? '45px' : '40px'}
        />
        </div>
    </>
  )
}

export default Loading;
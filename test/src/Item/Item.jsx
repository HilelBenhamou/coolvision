import React from 'react';
import styles from './Item.module.scss'

const Item = ({image, title, description, ...props}) => {


    return(
        <div className={styles.container}>
            <div className={styles.title}>{title ? title : 'No title for this item'}</div>
            <img src={image ? image : '#'} className={styles.image} />
            <div className={styles.description}>{description ? description : 'No description for this item'}</div>
        </div>
    )
}

export default React.memo(Item);
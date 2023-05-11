import styles from './Comment.module.css'
import {Trash, ThumbsUp} from 'phosphor-react'
import { Avatar } from "./Avatar";
import {useState} from "react";

export function Comment({content, onDeleteComment}) {
    const [likeCount, setlikeCount] = useState(0);
    
    function handleDeletComment() {
        
        onDeleteComment(content)
    }

    function handleLikeComment() {
        setlikeCount((state) => {
            return state + 1
        });
    }   

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/6643122?v=4" 
            alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndtime}>
                            <strong>Diego Fernades</strong>
                            <time title="05 de Abril ás 9:16h">Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeletComment} title="Deletar comentário">
                            <Trash size={24}/>
                        </button>

                    </header>

                    <p>{content}</p>
                </div>

                <footer >
                   <button onClick={handleLikeComment}>
                    <ThumbsUp />
                    Aplaudir <span>{likeCount}</span>
                   </button>
                </footer>

            </div>
        </div>

    )
}
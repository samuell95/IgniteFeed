import styles from "./Post.module.css";
import {useState, FormEvent, ChangeEvent, InvalidEvent} from "react";

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

interface Author {
    name: string,
    role: string,
    avatarUrl: string,
}

interface PostProps {
    author: Author,
    published: Date,
    content: string,
}

export function Post({author,publishedAt, content}: PosProps){

    const [comments, setComments] = useState([
       'Post muito bacana!!'
    ])

    const [newCommentText, setNewCommentText] = useState(' ')
    
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
        locale:ptBR,
    })
    
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale:ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToDelete) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete;
        }) 

        setComments(commentsWithoutDeleteOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
       <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar 
                    src={author.avatarUrl} 
                    alt="" />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title= {publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}>
                     {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
               {content.map(line =>{
                if (line.type === 'paragraph') {
                    return <p key={line.content}>{line.content}</p>;
                }else if (line.type === 'Link'){
                    return <p key={line.content}><a href="#">{line.content}</a></p>;
                }
               })}
               
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    name="comment"
                    placeholder="Deixe seu comentário"
                    required

                />
                
               <footer>
                 <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
               </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment =>{
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
       </article>
    )
}


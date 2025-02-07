import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { renderStars, getBookEmoji } from "../utils"
import { useBookContext } from "../context/BookContext"
import Loading from "./Loading"
import styles from './BookDetail.module.css'

const BookDetail = ({id}) => {
    const [book, setBook] = useState(null)
    const navigate = useNavigate()
    const { dispatch } = useBookContext()
    
    useEffect(() => {
        const fetchBook = async() => {
            const response = await fetch(`http://localhost:3000/books/${id}`)

            if(!response.ok) {
                throw new Error("데이터 가져오는데 실패했습니다.")
            }

            const data = await response.json()
            setBook(data)
        }

        fetchBook()
    }, [id])

    if (!book) {
        return <Loading />
    }

    const handleEdit = () => {
        navigate(`/edit/${id}`)
    }
    
    const handleDelete = async() => {
        const confirmed = window.confirm("삭제 하시겠습니까?")
        if(!confirmed) return

        try{
            const response = await fetch(`http://localhost:3000/books/${id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error("삭제에 실패했습니다.")
            }

            dispatch({type: 'DELETE_BOOK', payload: id})
            navigate('/')

        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <section className={styles.detail}>
                <div>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author} </p>
                    <p><strong>Genre:</strong> {book.genre} </p>
                    <p><strong>Published Date:</strong> {book.publishedDate} </p>
                    <p><strong>Rating:</strong>
                        <span className={styles.rating}>
                            {renderStars(book.rating)}
                        </span>
                    </p>
                    <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
                </div>
                <div>
                    {getBookEmoji(book.id)}
                </div>
            </section>
            <section className={styles.buttons}>
                <button onClick={handleEdit} className={styles.editButton}>
                    Edit Book
                </button>
                <button onClick={handleDelete} className={styles.deleteButton}>
                    Delete Book
                </button>
            </section>
        </>
    )
}

export default BookDetail

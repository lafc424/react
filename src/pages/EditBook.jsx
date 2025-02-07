import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loading from "../components/Loading"
import BookForm from "../components/BookForm"
import { useBookContext } from "../context/BookContext"

const EditBook = () => {
    const { id } = useParams()
    const [bookData, setBookData] = useState(null)
    const navigate = useNavigate()
    const { dispatch } = useBookContext()

    useEffect(() => {
        const fetchBook = async() => {
            const response = await fetch(`http://localhost:3000/books/${id}`)
            
            if(!response.ok) {
                throw new Error("데이터를 가져오는데 실패했습니다.")
            }

            const data = await response.json()
            setBookData(data)
        }

        fetchBook()
    }, [id])

    const handleUpdateBook = async(updateBook) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateBook)
              })
        
              if (!response.ok) throw new Error('Failed to update book')
        
              const data = await response.json()
              dispatch({ type: 'UPDATE_BOOK', payload: data })
              navigate('/')

        } catch(err) {
            console.log(err.message)
        }
    }

    if(!bookData) {
        return <Loading />
    }

    return (
        <div>
            <h1>Edit Book</h1>
            <BookForm initialData={bookData} onSubmit={handleUpdateBook} />
        </div>
    )
}

export default EditBook
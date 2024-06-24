import { useEffect, useState } from 'react'
import './App.css'
import Collection from './Collection'
import Loader from './Loader'
import useInput from './hooks/useInput'

function App() {
  const [collections, setCollections] = useState([]) // массив с данными от бекенда
  const [isLoading, setIsLoading] = useState(true) // создание Лоадера

  const [page, setPage] = useState(1)  // пагинация

  const input = useInput() // кастомный хук для фильтрации


  const [categoryId, setCategoryId] = useState(0)  // для выбора по категориям

  const categories = [
    {"name": "Все"},
    {"name": "Архитектура"},
    {"name": "Горы"},
    {"name": "Города"}
  ]


  useEffect(() => {
    setIsLoading(true)
    const category = categoryId ? `category=${categoryId}` : ''
    fetch(`https://6676e32a145714a1bd7316c8.mockapi.io/photos_collections?page=${page}&limit=3&${category}`)
    .then(res => res.json())
    .then(data => setCollections(data))
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
  }, [categoryId, page])



  return (
    <>
      <h1>Моя коллекция фотографий</h1>
      <section className='categories'>
        <div className='categories-btn'>
          {categories.map((category, index) => <button onClick={() => setCategoryId(index)} className={index === categoryId ? 'active' : ''} key={category.name}>{category.name}</button>)}
        </div>
        <input {...input} placeholder='Поиск по названию' type="text" />
      </section>


      <section className='main-container'>
        {!isLoading && (
          <div className="card-wrapper">
            {collections.filter(collection => collection.name.toLowerCase().includes(input.value.toLowerCase()))
            .map(collection => <Collection key={collection.name} {...collection} />)}
          </div>
        )}

        {isLoading && (
          <>
          <Loader/>
        </>
        )}
      </section>



      <div className='pagination'>
        {
          [...Array(6)].map((elem, index) => <button key={index} onClick={() => setPage(index + 1)} className={page === index + 1 ? 'active' : ''}>{index + 1}</button>)
        }
      </div>
    </>
  )
}

export default App

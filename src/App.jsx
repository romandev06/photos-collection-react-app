import { useEffect, useState } from 'react'
import './App.css'
import Collection from './Collection'
import Loader from './Loader'
import useInput from './hooks/useInput'

function App() {
  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const input = useInput()


  const [categoryId, setCategoryId] = useState(0)

  const categories = [
    {"name": "Все"},
    {"name": "Архитектура"},
    {"name": "Горы"},
    {"name": "Города"}
  ]


  useEffect(() => {
    setIsLoading(true)
    const category = `category=${categoryId}`
    fetch(`https://6676e32a145714a1bd7316c8.mockapi.io/photos_collections?${categoryId ? category : ''}`)
    .then(res => res.json())
    .then(data => setCollections(data))
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
  }, [categoryId])



  return (
    <>
      <h1>Моя коллекция фотографий</h1>
      <section className='categories'>
        <div className='categories-btn'>
          {categories.map((category, index) => <button onClick={() => setCategoryId(index)} className={index === categoryId ? 'active' : ''} key={category.name}>{category.name}</button>)}
        </div>
        <input {...input} placeholder='Поиск по названию' type="text" />
      </section>


      <section>
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
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </div>
    </>
  )
}

export default App

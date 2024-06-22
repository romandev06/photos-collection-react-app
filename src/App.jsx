import { useEffect, useState } from 'react'
import './App.css'
import Collection from './Collection'
import { Skeleton } from './Skeleton'

function App() {
  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const categories = [
    {"name": "Все"},
    {"name": "Архитектура"},
    {"name": "Горы"},
    {"name": "Города"}
  ]


  useEffect(() => {
    setIsLoading(true)
    fetch('https://6676e32a145714a1bd7316c8.mockapi.io/photos_collections')
    .then(res => res.json())
    .then(data => setCollections(data))
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
  }, [])



  return (
    <>
      <h1>Моя коллекция фотографий</h1>
      <section className='categories'>
        <div className='categories-btn'>
          {categories.map(category => <button key={category.name}>{category.name}</button>)}
        </div>
        <input placeholder='Поиск по названию' type="text" />
      </section>


      {!isLoading && (
        <div className="card-wrapper">
          {collections.map(collection => <Collection key={collection.name} {...collection} />)}
        </div>
      )}

      {isLoading && (
        <>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
      </>
      )}


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

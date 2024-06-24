import React from 'react'

export default function Collection({ name, photos }) {
    return (
        <section className='card-wrapper'>
            <div className="card">
                <img className='first-img' width='320px' src={photos[0]} alt="image" />
                <div className='mini-img-card'>
                    <img className='second-img' height="150px" src={photos[1]} alt="image" />
                    <img className='second-img' height="150px" src={photos[2]} alt="image" />
                </div>
                <p className='card-name'>{name}</p>
            </div>
        </section>
    )
}

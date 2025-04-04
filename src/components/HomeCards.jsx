import data from '../data/homeCardsData'
export function HomeCards() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {data.map((item) => (
                <div className="feature-item" key={item.id}>
                    <img src={item.img} className="feature-icon" />
                    <h3 className="feature-item-title">{item.title}</h3>
                    <p className="card-content">{item.content}</p>
                </div>
            ))}
        </section>
    )
}

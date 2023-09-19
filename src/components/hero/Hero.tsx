import heroImage from '../../assets/hero.png'
import './Hero.css'
import logo from '../../assets/logo.png'

export default function Hero(){
    return (
        <div className='container'>
            <img src={heroImage} className='hero--image' alt="companies"/>

            <div className="hero--main">
                <span className="hero--title">
                    <img 
                        src={logo} 
                        className="hero--icon"
                        alt="star icon"
                    />
                    <h1 className='primary'> Review your experiences</h1>
                </span>
                
                <p className='secondary'>Join the team of expert reviewers and help us find the best spots.</p>

                <button className='hero--button'>All Companies</button>
                </div>
            
        </div>
       
    )
}
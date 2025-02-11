import React, { useState } from "react";
import Header from "./Header";
const Home=({isLoggedIn,setIsLoggedIn})=>{
    const backgroundImage=['/Images/Home/kristina.jpg','/Images/Home/lanvin.jpg','/Images/Home/lunar.jpg','/Images/Home/valeriya.jpg','/Images/Home/vanessa.jpg','/Images/Home/daisy.jpg'];
    const background2Images=['/Images/Home/jadore.jpg','/Images/Home/JeanPaul.jpg','/Images/Home/PoisonFresh.jpg','/Images/Home/Sauvage.jpg','/Images/Home/valentino.jpg'];
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
    console.log('..',userRole);
    return(
        <div>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div>
                <section className="background">
                    <img src="/Images/Home/backgroundG.jpg" alt="background" />
                </section>
                <section className="backgroundList">
                    {
                        backgroundImage.map((item,i)=>(
                            <article key={i} >
                                <img src={item} alt="" />
                            </article>
                        ))
                    }
                </section>
                <section id="slogan">
                    <h1>The Art Of Fragrance</h1>
                    <p>Where everyday smells like a dream</p>
                </section>
            </div>
            <article id="parfumSection">
                <div className="DiorSection">
                    <section id="LongDior">
                        <img src="/Images/Home/MissDior.jpg" alt="" />
                    </section>
                    <section id="horizontalDior">
                        <article id="TextDior" >
                            <h1>Dior</h1>
                            <p>A floral and fruity frangrance with notes of rose, peony, and lily-of-the-valley</p>
                            <input type="button" value="Explore" />
                        </article>
                        <article>
                        <img src="/Images/Home/DiorLogo.jpg" alt="" />
                        </article>
                    </section>
                </div>
                <div className="DiorSection">
                    <section id="LongDior">
                        <img src="/Images/Home/yslMen.jpg" alt="" />
                    </section>
                    <section id="horizontalDior">
                        <article id="TextDior" >
                            <h1>Yves Saint Laurent</h1>
                            <p>A fresh and invigorating frangrance with notes of sage</p>
                            <input type="button" value="Explore" />
                        </article>
                        <article>
                        <img src="/Images/Home/yslLogo.jpg" alt="" />
                        </article>
                    </section>
                </div>
            </article>
            <article id="background2">
                <section id="background2Img">
                    <img src="/Images/Home/background2.jpg" alt="" />
                </section>
                <h1>Quality Scents, Unfogettable Experiences</h1>
            </article>
            <article id="MaleFemaleparfumes">
                {background2Images.map((item,i)=>(
                    <div key={i} className={i%2==0?'female':'male'}>
                        <img src={item} alt=""  />
                    </div>
                ))}
            </article>
        </div>
    )
}
export default Home;
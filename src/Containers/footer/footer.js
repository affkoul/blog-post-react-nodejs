import React from 'react'
import SocialMediaHorizontal from '../SocialMedia.js/SocialMediaHorizontal/SocialMediaHorizontal'
import './footer.css'

function footer() {

    return (
        <>
            <footer className="fadeInUp col-md-12">
                <a href="https://ndolet.com" className="button github"><svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                    </path>
                </svg><span>我们也在这里</span></a>



                <a href="https://geniusandcourage.com" className="button btn-light medium">
                    <span><img className="img-circle" width="20" alt=""
                        src="https://hlwsdtech.com" />欢迎了解我们</span></a>


                <SocialMediaHorizontal />
            </footer>
            <h5 className="text-center copyright"> © 版权所有HLWSDTECH.COM</h5>
        </>
    )
}
export default footer

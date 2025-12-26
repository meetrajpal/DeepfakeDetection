export default function Footer() {
    return (
        <footer id="footer" className="footer dark-background d-flex flex-column flex-lg-row justify-content-center align-items-center">

            <div className="copyright text-center">
                <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">

                    <div className="d-flex flex-column align-items-center align-items-lg-center">
                        <div className="credits">
                            <h5 className='d-flex align-items-center'>
                                Made with <img alt='Neural Network' src="/assets/img/neural-network.png" className='img-fluid mx-2' height={15} width={35}/> by <a href="https://www.linkedin.com/in/meetrajpal/" className='text-decoreation-none ms-2 text-white'>Meet Rajpal <i className="bi bi-linkedin text-white"></i></a>.
                            </h5>
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    );
}
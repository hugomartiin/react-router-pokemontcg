import React from 'react'

function ToastNotification() {
    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToastFav" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <i className="fa-solid fa-star starFavorite me-3 text-warning"></i>
                    <strong className="me-auto">Favorites</strong>
                    <small className="">Just now</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body text-center">
                    <img src="" className="rounded me-2 w-50 toastIcon mx-auto" alt=""/>
                    <p className="mt-3">Card <span className="toastCardName"></span> has been added to favorites.</p>
                </div>
            </div>
        </div>
    )
}

export default ToastNotification

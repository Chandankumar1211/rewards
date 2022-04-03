import React from 'react';

const Header = (props) => (PageComponent) => (moreProps) => {
    const { title } = props;
    return (
        <>
            <header className="hearder">
                <div className="header-bar">
                    {
                        title && <div className="header-title fw-500">{title}</div>
                    }
                </div>
            </header>
            <div className='p-1'>
                <PageComponent />
            </div>
        </>
    )
}

export default Header

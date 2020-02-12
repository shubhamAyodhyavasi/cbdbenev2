const TopAlert = ({children, ...props}) => {
    return <div className="c-top-alert" {...props}>
        <div className="c-top-alert__inner">
            {children}
        </div>
    </div>
}

export default TopAlert

const Notification = ({ message, type }) => {
    
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorMessageStyle = {
        ...notificationStyle,
        color: 'red'
    }

    if (message === null) {
        return null
    }

    var messageStyle = notificationStyle

    if (type === 'error') {
        messageStyle = errorMessageStyle
    }

    return (
        <div className="error" style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification
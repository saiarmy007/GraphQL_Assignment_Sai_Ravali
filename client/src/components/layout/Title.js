const getStyles = () => ({
    title: {
        fontSize: 50,
        padding: '15px',
        marginBottom: '50px',
        color: '#f0f2f5',
    }
})

const Title = () => {
    const styles = getStyles();

    return <h1 style={styles.title}>People and Cars</h1>
}

export default Title;